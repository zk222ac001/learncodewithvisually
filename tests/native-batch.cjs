// Compile the Java/C# corpus once, then run each standalone entry independently.
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const { spawnSync } = require('node:child_process');
const assert = require('node:assert/strict');
const native = require('./native-program.cjs');
function executeBatch(language, entries, version, onOutput) {
  if (!['java', 'csharp'].includes(language)) {
    for (const entry of entries) onOutput(entry, native.execute(language, entry.code, version, { stdin: entry.stdin }));
    return;
  }
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'codeviz-batch-'));
  const env = { ...process.env, DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_NOLOGO: '1' };
  function run(command, args, stdin = '') {
    const result = spawnSync(command, args, { cwd: directory, encoding: 'utf8', env, input: stdin, timeout: 120000 });
    assert.equal(result.status, 0, `${command}: ${result.error || result.stderr || result.stdout}`);
    return result.stdout.replaceAll('\r\n', '\n');
  }
  try {
    if (language === 'java') {
      const files = entries.map((entry, i) => {
        const filename = `Assignment${i}.java`;
        assert.match(entry.code, /public class Main\b/, entry.id);
        const code = entry.code.replace(/public class Main\b/, `public class Assignment${i}`).replace(/\bMain(?=\s*\.)/g, `Assignment${i}`);
        fs.writeFileSync(path.join(directory, filename), code);
        return filename;
      });
      run('javac', files);
      entries.forEach((entry, i) => onOutput(entry, run('java', ['-cp', directory, `Assignment${i}`], entry.stdin)));
    } else {
      const sdk = version.stdout.match(/^(\d+)\.\d+\.\d+/m)[1];
      const calls = [];
      entries.forEach((entry, i) => {
        const main = /(?:public\s+)?static\s+(void|int)\s+Main\s*\(([^)]*)\)/;
        const signature = entry.code.match(main);
        assert.ok(signature, `${entry.id} has an executable Main`);
        const code = entry.code.replace(main, `public static ${signature[1]} Run(${signature[2]})`);
        fs.writeFileSync(path.join(directory, `Assignment${i}.cs`), `namespace Assignment${i} {\n${code}\n}\n`);
        calls.push(`case "${i}": Assignment${i}.Program.Run(${signature[2].trim() ? 'new string[0]' : ''}); break;`);
      });
      fs.writeFileSync(path.join(directory, 'Driver.cs'), `class Driver { static void Main(string[] args) { switch (args[0]) { ${calls.join('\n')} } } }`);
      fs.writeFileSync(path.join(directory, 'Assignments.csproj'), `<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net${sdk}.0</TargetFramework><StartupObject>Driver</StartupObject></PropertyGroup></Project>`);
      run('dotnet', ['build', 'Assignments.csproj', '--nologo', '-v', 'quiet']);
      const dll = path.join(directory, 'bin', 'Debug', `net${sdk}.0`, 'Assignments.dll');
      entries.forEach((entry, i) => onOutput(entry, run('dotnet', [dll, String(i)], entry.stdin)));
    }
  } finally {
    assert.ok(path.resolve(directory).startsWith(path.resolve(os.tmpdir()) + path.sep + 'codeviz-batch-'));
    fs.rmSync(directory, { recursive: true, force: true });
  }
}
module.exports = { executeBatch };
