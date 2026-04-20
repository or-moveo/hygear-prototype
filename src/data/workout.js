// SHIELD Prime — single source of truth for workout metadata
// and per-block exercise lists used across Studio/Trainee screens.

export const WORKOUT = {
  name: 'SHIELD Prime',
  subtitle: 'האקולייזר על מקסימום יציבות',
  duration: '50 Minutes',
}

// Block Preview "Next Exercises" lists, keyed by the zoneIdx group.
// Studio flow keeps 3 preview screens: warmup (0), holds (3), allout (4).
export const BLOCK_EXERCISES = {
  warmup: [
    { set: 1, name: 'Slow High Knees (on Bosu)',        sets: 1, reps: 20 },
    { set: 1, name: 'Inchworms / Walkouts',             sets: 1, reps: 10 },
    { set: 1, name: 'Slow Mountain Climbers',           sets: 1, reps: 20 },
    { set: 1, name: 'Cat-Cow Rotations (on Bosu)',      sets: 1, reps: 12 },
  ],
  holds: [
    { set: 1, name: 'Decline Chest Press w/ Knee Flex', sets: 3, reps: 12 },
    { set: 1, name: 'Right Decline Chops',              sets: 3, reps: 10 },
    { set: 1, name: 'Left Decline Chops',               sets: 3, reps: 10 },
    { set: 1, name: 'Standing Wide Row w/ Hip Flex',    sets: 3, reps: 12 },
  ],
  allout: [
    { set: 1, name: 'Suspended High Plank Hold',        sets: 2, reps: 60 },
    { set: 1, name: 'Static Row Hold',                  sets: 2, reps: 60 },
    { set: 1, name: 'Assisted Deep Squat Hold',         sets: 2, reps: 60 },
    { set: 1, name: 'Hollow Body Hold',                 sets: 2, reps: 20 },
  ],
}

// Training Structure rows used on Rest screens (longer list w/ statuses).
// Uses names from SHIELD Prime Block 3 (Main Block: Unilateral & Anti-Rotation).
export const SHIELD_STRUCTURE = [
  { id: 1, setNum: 1, name: 'Decline Chest Press',  reps: 12, kg: 40, status: 'past' },
  { id: 2, setNum: 1, name: 'Right Decline Chops',  reps: 10, kg: 30, status: 'past' },
  { id: 3, setNum: 1, name: 'Left Decline Chops',   reps: 10, kg: 30, status: 'past' },
  { id: 4, setNum: 2, name: 'Standing Wide Row',    reps: 12, kg: 35, status: 'active' },
  { id: 5, setNum: 2, name: 'Squat + Heel Touch R', reps: 10, kg: 25, status: 'future' },
  { id: 6, setNum: 2, name: 'Squat + Heel Touch L', reps: 10, kg: 25, status: 'future' },
  { id: 7, setNum: 2, name: 'Crunches (Bosu)',      reps: 15, kg: 0,  status: 'future' },
  { id: 8, name: 'Switch Anchor',  duration: '15s', status: 'transition' },
  { id: 9, name: 'Bosu Reset',     duration: '10s', status: 'transition' },
]

// Map BPM → Zone index (0-based, matches ZONES array in src/data/zones.js)
export function bpmToZoneIdx(bpm) {
  if (bpm < 130) return 0       // Zone 1 — BASE
  if (bpm < 140) return 1       // Zone 2 — FLOW
  if (bpm < 150) return 2       // Zone 3 — BUILD
  if (bpm < 160) return 3       // Zone 4 — PRIME
  return 4                      // Zone 5 — PEAK
}
