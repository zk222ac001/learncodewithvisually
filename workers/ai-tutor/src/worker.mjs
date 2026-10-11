import { DurableObject } from 'cloudflare:workers';
import tutor from './index.mjs';
export default tutor;
export class AiDailyBudget extends DurableObject {
  async reserve(day, limit) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || !Number.isInteger(limit) || limit < 1 || limit > 100)
      throw new Error('Invalid budget parameters');
    return this.ctx.storage.transaction(async (txn) => {
      const state = await txn.get('day-count');
      const count = state?.day === day ? state.count : 0;
      if (!Number.isSafeInteger(count) || count < 0) throw new Error('Corrupt budget');
      if (count >= limit) return { granted: false };
      await txn.put('day-count', {day, count: count + 1});
      return {granted: true};
    });
  }
}
