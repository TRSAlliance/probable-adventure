// src/logic/ghostDrift.js
export function simulateGhostDrift(signal) {
  const driftFactor = Math.random() * 0.2 - 0.1;
  return {
    ...signal,
    trustValue: Math.max(0, Math.min(1, signal.trustValue + driftFactor)),
    drifted: true
  };
}
