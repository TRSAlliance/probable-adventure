import { Command } from 'commander';
import { processSignals } from './logic/processor.js';

const program = new Command();

program
  .name('trs-processor')
  .description('TRS GhostShift Signal Processor')
  .version('1.0.0');

program
  .command('process')
  .description('Process signal data')
  .action(() => {
    const results = processSignals();
    console.log(`Processed ${results.length} signals`);
  });

program.parse();
