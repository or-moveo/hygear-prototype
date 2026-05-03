// ─── Workout Types ────────────────────────────────────────────────
// Distinct from Zone palette (Zones 1-5) on purpose — these label
// the *kind* of workout, not the intensity. Used in Workouts library,
// Schedule, Live Session header, Add Class wizard, Coach specializations.

export const WORKOUT_TYPES = [
  { id: 'build',  label: 'Prime Build',  short: 'Build',  color: '#A855F7', bg: '#f3e8ff', border: '#d8b4fe' },
  { id: 'shield', label: 'Prime Shield', short: 'Shield', color: '#06B6D4', bg: '#cffafe', border: '#67e8f9' },
  { id: 'burn',   label: 'Prime Burn',   short: 'Burn',   color: '#EC4899', bg: '#fce7f3', border: '#f9a8d4' },
]

const BY_SHORT = Object.fromEntries(WORKOUT_TYPES.map(t => [t.short, t]))
const BY_ID    = Object.fromEntries(WORKOUT_TYPES.map(t => [t.id, t]))

// Accepts either short label ('Build') or id ('build'). Falls back to first.
export function getWorkoutType(key) {
  return BY_SHORT[key] || BY_ID[key] || WORKOUT_TYPES[0]
}

// ─── Workout Templates ────────────────────────────────────────────
// Goals mirror the Prime Target screens (src/pages/PrimeTarget.jsx) — each
// type has its own metric. Blocks include sample exercises used in the
// Schedule class-detail popup.
// TODO(backend): replace with real templates per workout id from API.
export const WORKOUT_TEMPLATES = {
  Build: {
    goalLabel: 'Group Weight',
    goalValue: '20 tons',
    goalDesc:  'Total cumulative weight pulled by the group together.',
    blocks: [
      { name: 'Warm-Up',       exercises: ['Mobility flow', 'Band activation', 'Light squats'] },
      { name: 'Demo & Prep',   exercises: ['Coach demo', 'Tempo practice'] },
      { name: 'Push Strength', exercises: ['Chest Press', 'Shoulder Press', 'Tricep Extension'] },
      { name: 'Pull Strength', exercises: ['Lat Pulldown', 'Bicep Curl', 'Row'] },
      { name: 'Finisher',      exercises: ['Squat ladder', 'Deadlift hold'] },
      { name: 'Cool-down',     exercises: ['Stretch', 'Breathing'] },
    ],
  },
  Shield: {
    goalLabel: 'Group Control Minutes',
    goalValue: '450 min',
    goalDesc:  'Accumulated Total Prime Control Minutes — smooth, perfect movement.',
    blocks: [
      { name: 'Warm-Up',      exercises: ['Cat-Cow', 'Hip openers', 'Shoulder circles'] },
      { name: 'Core Circuit', exercises: ['Dead bug', 'Bird dog', 'Hollow hold'] },
      { name: 'Stability',    exercises: ['Single-leg balance', 'Pallof press'] },
      { name: 'Plank Series', exercises: ['Front plank', 'Side plank', 'Plank shoulder taps'] },
      { name: 'Cool-down',    exercises: ['Stretch', 'Breathing'] },
    ],
  },
  Burn: {
    goalLabel: 'Team Points',
    goalValue: '300 pts',
    goalDesc:  'Every minute the group spends in Zone 4–5 adds a point.',
    blocks: [
      { name: 'Warm-Up',          exercises: ['Jumping jacks', 'High knees', 'Dynamic stretch'] },
      { name: 'Demo & Prep',      exercises: ['Coach demo', 'Pace setup'] },
      { name: 'Dynamic Strength', exercises: ['Thrusters', 'KB swings', 'Burpees'] },
      { name: 'Holds Isometric',  exercises: ['Wall sit', 'Iso lunge', 'Plank'] },
      { name: 'All Out',          exercises: ['Sprint intervals', 'Max-rep finisher'] },
      { name: 'Cool-down',        exercises: ['Stretch', 'Breathing'] },
    ],
  },
}

export function getWorkoutTemplate(key) {
  const t = getWorkoutType(key)
  return WORKOUT_TEMPLATES[t.short] || WORKOUT_TEMPLATES.Burn
}
