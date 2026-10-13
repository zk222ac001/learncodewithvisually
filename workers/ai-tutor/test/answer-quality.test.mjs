import test from 'node:test';
import assert from 'node:assert/strict';
import {extractCompleteAnswer,GENERAL_MAX_TOKENS} from '../src/answer-quality.mjs';
test('returns full fenced code',()=>assert.match(extractCompleteAnswer({response:'Here is code:\n```cpp\nint main() {}\n```'},true),/int main/));
test('rejects dangling code fences and overly long output',()=>{
 assert.equal(extractCompleteAnswer({response:'```cpp\nint main() {'},true),'');
 assert.equal(extractCompleteAnswer({response:'x'.repeat(4001)},true),'');
});
test('rejects known model length termination and accepts normal concise prose',()=>{
 assert.equal(extractCompleteAnswer({response:'partial',finish_reason:'length'},true),'');
 assert.equal(extractCompleteAnswer({choices:[{message:{content:'partial'},finish_reason:'length'}]},true),'');
 assert.equal(extractCompleteAnswer({response:'A complete short explanation.'},true),'A complete short explanation.');
 assert.ok(GENERAL_MAX_TOKENS>480);
});
