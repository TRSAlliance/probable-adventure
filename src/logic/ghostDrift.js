// src/logic/ghostDrift.js
export function simulateGhostDrift(signal) {
  let score = 100;

  if (signal.company) score -= 15;          // naming company = small risk
  if (signal.quote?.length > 140) score -= 20; // long quote = possible vent
  if (signal.displacement.includes('ai-replace')) score += 10; // pattern match
  if (signal.landed === 'still-looking' && signal.when_period === 'last-week') score -= 25;
  return { trustScore: Math.max(0, score) };
}
