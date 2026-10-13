import { DurableObject } from 'cloudflare:workers';
import tutor from './index.mjs';
export default tutor;

const HISTORY_PREFIX = 'usage-v2:';
const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const OUTCOMES = Object.freeze({success:'answered', model_error:'failed', incomplete:'incomplete'});
const VALID_DAYS = 7;

function daysThrough(day, count = VALID_DAYS) {
  const at = new Date(day + 'T00:00:00.000Z');
  if (!DAY_PATTERN.test(day) || !Number.isFinite(at.valueOf()) || at.toISOString().slice(0,10) !== day)
    throw new Error('Invalid day');
  return Array.from({length: count}, (_, i) => new Date(at.getTime() - (count - 1 - i) * 86400000).toISOString().slice(0,10));
}
function validCount(value) { return Number.isSafeInteger(value) && value >= 0; }
function validHistory(value) {
  return value && ['reserved','answered','failed','incomplete'].every(k => validCount(value[k]));
}
export class AiDailyBudget extends DurableObject {
  async stats(day) {
    const days=daysThrough(day);
    const [state,...records]=await Promise.all([
      this.ctx.storage.get('day-count'),
      ...days.map(d => this.ctx.storage.get(HISTORY_PREFIX + d)),
    ]);
    const current=state?.day===day ? state.count : 0;
    if(!validCount(current))throw new Error('Corrupt budget');
    const history=days.map((d,i)=>{
      const saved=records[i];
      if(saved!==undefined && !validHistory(saved))throw new Error('Corrupt analytics');
      if(saved) return {day:d,...saved};
      // For pre-v2 dates there are no historical records; never invent zeros.
      if(d===day && state?.day===day) return {
        day:d,reserved:current,answered:null,failed:null,incomplete:null,
      };
      return {day:d,reserved:null,answered:null,failed:null,incomplete:null};
    });
    return {reserved:current,history};
  }
  async reserve(day, limit) {
    daysThrough(day);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) throw new Error('Invalid budget parameters');
    return this.ctx.storage.transaction(async txn => {
      const state=await txn.get('day-count');
      const count=state?.day===day ? state.count : 0;
      if(!validCount(count))throw new Error('Corrupt budget');
      if(count>=limit)return {granted:false};
      const key=HISTORY_PREFIX+day;
      const previous=await txn.get(key);
      if(previous!==undefined && !validHistory(previous))throw new Error('Corrupt analytics');
      const metrics=previous || {reserved:count,answered:0,failed:0,incomplete:0};
      const next={...metrics,reserved:count+1};
      await txn.put('day-count',{day,count:count+1});
      await txn.put(key,next);
      // Prune expired summaries; never retain open-ended per-day records.
      const earliest=daysThrough(day)[0];
      const old=await txn.list({prefix:HISTORY_PREFIX});
      for(const name of old.keys()){
        if(name.slice(HISTORY_PREFIX.length)<earliest) await txn.delete(name);
      }
      return {granted:true};
    });
  }
  async recordOutcome(day, outcome) {
    daysThrough(day);
    const field=OUTCOMES[outcome];
    if(!field)throw new Error('Invalid outcome');
    await this.ctx.storage.transaction(async txn=>{
      const key=HISTORY_PREFIX+day;
      const existing=await txn.get(key);
      if(existing===undefined)return; // Do not resurrect pruned historical records.
      if(!validHistory(existing))throw new Error('Corrupt analytics');
      await txn.put(key,{...existing,[field]:existing[field]+1});
    });
  }
}
