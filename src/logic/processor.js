import fs from 'fs';

export function processSignals() {
  const signals = JSON.parse(fs.readFileSync('./data/signals.json', 'utf8'));
  
  return signals.map(signal => {
    const trustScore = calculateTrust(signal);
    return { ...signal, trustScore };
  });
}

function calculateTrust(signal) {
  let score = 100;
  if (signal.company) score -= 15;
  if (signal.quote?.length > 140) score -= 20;
  if (signal.displacement.includes('ai-replace')) score += 10;
  if (signal.landed === 'still-looking' && signal.when === 'last-week') score -= 25;
  return Math.max(0, score);
}
