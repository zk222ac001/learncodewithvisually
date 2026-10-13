// Reject likely incomplete model output instead of presenting broken code to learners.
export const GENERAL_MAX_TOKENS=720;
export const GENERAL_MAX_CHARACTERS=4000;
export function extractCompleteAnswer(output, general=false) {
  const candidate=typeof output?.response==='string'?output.response:output?.choices?.[0]?.message?.content;
  if(typeof candidate!=='string')return '';
  const text=candidate.trim();
  const finish=output?.usage?.finish_reason??output?.finish_reason??output?.choices?.[0]?.finish_reason;
  if(['length','max_tokens','MAX_TOKENS'].includes(finish))return '';
  const cap=general?GENERAL_MAX_CHARACTERS:2000;
  if(!text||text.length>cap)return '';
  // Any unmatched fenced code section is not safe to show as a complete example.
  const fences=text.split('\n').filter(line=>/^\s*```/.test(line)).length;
  if(fences%2)return '';
  return text;
}
