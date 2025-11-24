// src/index.js
// One job: start the sentinel and keep it alive
import { startLiveSentinel } from './sentinel/simulator.js';

console.log('Node 001 booting...');
await startLiveSentinel();
console.log('Sentinel running. Processing all new shifts in real time.');
