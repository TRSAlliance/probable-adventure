// src/sentinel/simulator.js
import { simulateGhostDrift } from '../logic/ghostDrift.js';
import mockSignals from '../signals/mockSignals.json' assert { type: 'json' };

export function runSignalSimulation() {
  const processed = mockSignals.map(signal => simulateGhostDrift(signal));
  console.table(processed);
}
