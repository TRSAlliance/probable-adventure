import { createClient } from '@supabase/supabase-js';
import { simulateGhostDrift } from '../logic/ghostDrift.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function startLiveSentinel() {
  console.log('🛡️ TRS Sentinel starting...');
  
  const { data: newSignals, error } = await supabase
    .from('ghostshifts')
    .select('*')
    .is('trustScore', null)
    .limit(10);

  if (error) {
    console.error('Database error:', error);
    return;
  }

  console.log(`Found ${newSignals.length} unprocessed signals`);

  for (const signal of newSignals) {
    const result = simulateGhostDrift(signal);
    
    await supabase
      .from('ghostshifts')
      .update({ trustScore: result.trustScore })
      .eq('id', signal.id);

    console.log(`Processed ${signal.id}: ${result.trustScore} trust`);
  }

  console.log(`✅ Processed ${newSignals.length} signals`);
}

export async function reprocessAll() {
  console.log('🔄 Reprocessing all signals...');
  
  const { data: allSignals, error } = await supabase
    .from('ghostshifts')
    .select('*');

  if (error) {
    console.error('Database error:', error);
    return;
  }

  let processed = 0;
  for (const signal of allSignals) {
    const result = simulateGhostDrift(signal);
    
    await supabase
      .from('ghostshifts')
      .update({ trustScore: result.trustScore })
      .eq('id', signal.id);

    processed++;
  }

  console.log(`✅ Reprocessed ${processed} signals`);
}

// Handle command line
if (process.argv.includes('--reprocess')) {
  reprocessAll();
} else {
  startLiveSentinel();
}
