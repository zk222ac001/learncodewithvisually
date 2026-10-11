'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');

const content = { querySelector: () => null, addEventListener() {} };
const sandbox = {
  window: {},
  document: {
    getElementById: id => id === 'content' ? content : null,
    querySelector: () => null,
    querySelectorAll: () => []
  },
  MutationObserver: class { observe() {} }
};
vm.runInNewContext(fs.readFileSync('data-structures-assignments.js', 'utf8'), sandbox);
const solutions = sandbox.window.DATA_STRUCTURE_ASSIGNMENT_SOLUTIONS;
const environment = { ...process.env, DOTNET_CLI_TELEMETRY_OPTOUT: '1', DOTNET_NOLOGO: '1' };

function command(executable, args, cwd) {
  const result = spawnSync(executable, args, { cwd, encoding: 'utf8', timeout: 120000, env: environment });
  assert.equal(result.status, 0, `${executable}: ${result.error || result.stderr || result.stdout}`);
  return result.stdout.replaceAll('\r\n', '\n');
}

const configurations = {
  c: {
    executable: 'gcc',
    version: ['--version'],
    file: 'main.c',
    run(directory) {
      const binary = path.join(directory, process.platform === 'win32' ? 'main.exe' : 'main');
      command('gcc', ['-std=c11', '-Wall', '-Wextra', '-Werror', '-pedantic', 'main.c', '-o', binary], directory);
      return command(binary, [], directory);
    }
  },
  cpp: {
    executable: 'g++',
    version: ['--version'],
    file: 'main.cpp',
    run(directory) {
      const binary = path.join(directory, process.platform === 'win32' ? 'main.exe' : 'main');
      command('g++', ['-std=c++17', '-Wall', '-Wextra', '-Werror', 'main.cpp', '-o', binary], directory);
      return command(binary, [], directory);
    }
  },
  python: {
    executable: 'python',
    version: ['--version'],
    file: 'main.py',
    run: directory => command('python', ['main.py'], directory)
  },
  java: {
    executable: 'javac',
    version: ['-version'],
    file: 'Main.java',
    run(directory) {
      command('javac', ['Main.java'], directory);
      return command('java', ['-cp', directory, 'Main'], directory);
    }
  },
  javascript: {
    executable: process.execPath,
    version: ['--version'],
    file: 'main.js',
    run: directory => command(process.execPath, ['main.js'], directory)
  },
  csharp: {
    executable: 'dotnet',
    version: ['--list-sdks'],
    file: 'Program.cs',
    run(directory, available) {
      const sdk = available.stdout.match(/^(\d+)\.\d+\.\d+/m);
      fs.writeFileSync(path.join(directory, 'Program.csproj'), `<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net${sdk[1]}.0</TargetFramework></PropertyGroup></Project>`);
      command('dotnet', ['build', 'Program.csproj', '--nologo', '-v', 'quiet'], directory);
      return command('dotnet', [path.join(directory, 'bin', 'Debug', `net${sdk[1]}.0`, 'Program.dll')], directory);
    }
  }
};

function verifyOutputs(outputs) {
  assert.match(outputs[0], /5.*10.*20.*30.*40/s);
  assert.match(outputs[0], /Sum:\s*105/);
  assert.equal(outputs[1].trim(), '10\n40\n20\n30');
  assert.equal(outputs[2].trim(), '50\n40');
  assert.equal(outputs[3].trim(), 'Removed: 10\nRemaining: 20, 30, 40');
  const tree = outputs[4].trim().split('\n');
  assert.deepEqual(tree.slice(0, 2), ['root', 'Python']);
  assert.ok(tree.indexOf('exercise.py') < tree.indexOf('Algorithms'));
  assert.match(outputs[5], /Visited: A B C D E/);
  assert.match(outputs[5], /Shortest route: A -> [BC] -> E/);
  assert.equal(outputs[6].trim(), 'Bo: 10\nAda: 20');
}

for (const [language, configuration] of Object.entries(configurations)) {
  test(`Data Structures ${language} assignment solutions run with expected results`, { timeout: 900000 }, t => {
    const available = spawnSync(configuration.executable, configuration.version, { encoding: 'utf8', env: environment, timeout: 10000 });
    if (available.status !== 0 || (language === 'csharp' && !/^\d+\.\d+\.\d+/m.test(available.stdout))) {
      return t.skip(`${configuration.executable} toolchain is unavailable`);
    }
    const outputs = [];
    for (const solution of solutions[language]) {
      const directory = fs.mkdtempSync(path.join(os.tmpdir(), `codeviz-structures-${language}-`));
      try {
        fs.writeFileSync(path.join(directory, configuration.file), solution);
        outputs.push(configuration.run(directory, available));
      } finally {
        fs.rmSync(directory, { recursive: true, force: true });
      }
    }
    verifyOutputs(outputs);
  });
}
