// src/sentinel/simulator.js
// LIVE VERSION – this is no longer a mock. This is Node 001’s brain.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { simulateGhostDrift } from '../logic/ghostDrift.js';

// Live Supabase – use your real anon key (read/write allowed via RLS)
const supabase = createClient(
  'https://your-project.supabase.co',           // ← put real URL
  'public-anon-key-here'                        // ← anon key is fine
);

let isRunning = false;

export async function startLiveSentinel() {
  if (isRunning) return;
  isRunning = true;

  console.log('Sentinel LIVE – listening for new shifts...');

  const channel = supabase
    .channel('ghostshifts')
    .on('postgres_changes', 
      { event: 'INSERT', schema: 'public', table: 'ghostshifts' },
      async (payload) => {
        const newShift = payload.new;
        console.log('New shift detected:', newShift.id);

        // THIS is where Truth meets Respect meets System
        const driftResult = simulateGhostDrift(newShift);

        // Auto-verify based on ghostDrift confidence
        const verified = driftResult.trustScore >= 82;   // tunable threshold
        const verificationNote = verified 
          ? 'Sentinel auto-verified' 
          : `Flagged for review (score: ${driftResult.trustScore})`;

        // Write verdict back – this instantly updates the live map
        const { error } = await supabase
          .from('ghostshifts')
          .update({
            verified: verified ? 1 : -1,
            trust_score: driftResult.trustScore,
            sentinel_note: verificationNote,
            processed_at: new Date().toISOString()
          })
          .eq('id', newShift.id);

        if (error) console.error('Sentinel update failed:', error);
        else console.log(`Shift ${newShift.id} → ${verified ? 'VERIFIED' : 'FLAGGED'}`);
      }
    )
    .subscribe();

  console.log('Sentinel is now LIVE on all new submissions.');
}

// Optional: one-off run on historical data
export async function reprocessAll() {
  const { data } = await supabase.from('ghostshifts').select('*').eq('verified', 0);
  for (const shift of data) {
    // force re-run ghostDrift logic
    const result = simulateGhostDrift(shift);
    await supabase
      .from('ghostshifts')
      .update({ verified: result.trustScore >= 82 ? 1 : -1, trust_score: result.trustScore })
      .eq('id', shift.id);
  }
  console.log('Historical reprocessing complete.');
}
