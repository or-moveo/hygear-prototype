// ─── Backoffice Studio Mock Data ───────────────────────────────────

// Coach specialties now refer to Workout Types (Build/Shield/Burn).
// See src/data/workoutTypes.js
export const coaches = [
  {
    id: 1, name: 'Maya Levy', initials: 'ML',
    specialties: ['Burn', 'Build'], timezone: 'Asia/Jerusalem',
    classesThisWeek: 8, avgAttendance: 87, rating: 4.8,
    // Split-window example: Tuesdays and Thursdays have a morning + afternoon
    // shift with a midday break; the popup should render two windows.
    availability: {
      sun: ['06:00-12:00'],
      mon: ['06:00-14:00'],
      tue: ['07:00-11:00', '15:00-18:00'],
      wed: ['06:00-12:00'],
      thu: ['06:00-10:00', '12:00-14:00', '17:00-20:00'],
      fri: ['07:00-11:00'],
      sat: [],
    },
  },
  {
    id: 2, name: 'Dan Katz', initials: 'DK',
    specialties: ['Shield'], timezone: 'Asia/Jerusalem',
    classesThisWeek: 6, avgAttendance: 91, rating: 4.9,
    availability: {
      sun: ['08:00-16:00'], mon: ['08:00-16:00'], tue: ['10:00-18:00'],
      wed: ['08:00-16:00'], thu: ['08:00-16:00'], fri: [], sat: [],
    },
  },
  {
    id: 3, name: 'Noa Shapiro', initials: 'NS',
    specialties: ['Burn'], timezone: 'Asia/Jerusalem',
    classesThisWeek: 5, avgAttendance: 82, rating: 4.6,
    // Split lunch + evening windows on weekdays.
    availability: {
      sun: ['10:00-13:00', '17:00-20:00'],
      mon: ['10:00-13:00', '17:00-20:00'],
      tue: ['14:00-20:00'],
      wed: ['10:00-13:00', '17:00-20:00'],
      thu: ['14:00-20:00'],
      fri: [], sat: [],
    },
  },
  {
    id: 4, name: 'Tom Baruch', initials: 'TB',
    specialties: ['Build'], timezone: 'Asia/Jerusalem',
    classesThisWeek: 7, avgAttendance: 85, rating: 4.7,
    availability: {
      sun: ['06:00-10:00', '16:00-20:00'], mon: ['06:00-10:00', '16:00-20:00'],
      tue: ['06:00-10:00'], wed: ['06:00-10:00', '16:00-20:00'],
      thu: ['06:00-10:00', '16:00-20:00'], fri: ['06:00-10:00'], sat: [],
    },
  },
  {
    id: 5, name: 'Liora Stein', initials: 'LS',
    specialties: ['Shield'], timezone: 'Asia/Jerusalem',
    classesThisWeek: 4, avgAttendance: 93, rating: 4.9,
    availability: {
      sun: ['07:00-11:00'], mon: ['07:00-11:00'], tue: ['07:00-11:00'],
      wed: ['07:00-11:00'], thu: ['07:00-11:00'], fri: ['07:00-09:00'], sat: [],
    },
  },
]

// Each station carries three devices — Straps, Bands, Spider — each with its
// own battery level and connection status. Station-level `status` is the
// worst of the three (offline > maintenance > active).
// TODO(backend): replace with live device telemetry from the gateway.
function makeDevice(seed, kind, broken = false) {
  // Deterministic mock based on seed so reloads stay stable.
  const battery = broken ? 0 : 30 + ((seed * (kind.length + 7)) % 70)
  const status  = broken ? 'offline' : (battery < 20 ? 'maintenance' : 'active')
  return { name: kind, battery, status }
}

function makeStation(seed, brokenDevice = null) {
  const devices = {
    straps: makeDevice(seed,     'Straps', brokenDevice === 'straps'),
    bands:  makeDevice(seed + 1, 'Bands',  brokenDevice === 'bands'),
    spider: makeDevice(seed + 2, 'Spider', brokenDevice === 'spider'),
  }
  // Roll up a station-level status from the worst device.
  const order = { active: 0, maintenance: 1, offline: 2 }
  const worst = Object.values(devices).reduce(
    (a, d) => order[d.status] > order[a] ? d.status : a,
    'active'
  )
  return { devices, status: worst }
}

export const rooms = [
  {
    id: 1, name: 'Main Floor', dimensions: '12×8m', capacity: 16, stationCount: 16,
    stations: Array.from({ length: 16 }, (_, i) => {
      // Station 7 has a low-battery (maintenance) Bands device; ST 15 has an
      // offline Straps device — preserves the original demo "broken" stations.
      const broken = i === 6 ? 'bands' : i === 14 ? 'straps' : null
      return { id: i + 1, number: i + 1, type: i < 8 ? 'hybrid' : i < 12 ? 'bands' : 'straps', ...makeStation(i + 1, broken) }
    }),
  },
  {
    id: 2, name: 'Studio B', dimensions: '8×6m', capacity: 8, stationCount: 8,
    stations: Array.from({ length: 8 }, (_, i) => ({
      id: 100 + i + 1, number: i + 1, type: 'bands',
      ...makeStation(100 + i + 1),
    })),
  },
]

// type uses Workout Types (Build/Shield/Burn) — colors derived via getWorkoutType().
// `zone` is the difficulty (1-5, see src/data/zones.js).
// `done: true` marks a class that already finished by demo "now". Used by
// the Today's Classes KPI card to show "X of Y completed".
export const todayClasses = [
  { id: 1, time: '07:00', endTime: '07:45', name: 'Morning Power',    coach: 'Maya Levy',   room: 'Main Floor', enrolled: 14, capacity: 16, type: 'Burn',   zone: 4, done: true  },
  { id: 2, time: '09:00', endTime: '09:45', name: 'Core & Stability', coach: 'Dan Katz',    room: 'Studio B',   enrolled: 7,  capacity: 8,  type: 'Shield', zone: 2, done: true  },
  { id: 3, time: '10:30', endTime: '11:15', name: 'Flex & Recover',   coach: 'Liora Stein', room: 'Studio B',   enrolled: 6,  capacity: 8,  type: 'Shield', zone: 1, done: false },
  { id: 4, time: '12:00', endTime: '12:45', name: 'Lunchtime Burn',   coach: 'Noa Shapiro', room: 'Main Floor', enrolled: 12, capacity: 16, type: 'Burn',   zone: 5, done: false },
  { id: 5, time: '15:00', endTime: '15:45', name: 'Power Hour',       coach: 'Tom Baruch',  room: 'Main Floor', enrolled: 11, capacity: 16, type: 'Build',  zone: 5, done: false },
  { id: 6, time: '17:30', endTime: '18:15', name: 'Evening Strength', coach: 'Tom Baruch',  room: 'Main Floor', enrolled: 16, capacity: 16, type: 'Build',  zone: 4, done: false },
]

// Yesterday's classes — `attended` is the actual show-up count, used to
// derive the capacity % column in the Yesterday Classes popup.
export const yesterdayClasses = [
  { id: 11, time: '07:00', endTime: '07:45', name: 'Morning Power',    coach: 'Maya Levy',   room: 'Main Floor', enrolled: 14, capacity: 16, attended: 13, type: 'Burn',   zone: 4 },
  { id: 12, time: '09:00', endTime: '09:45', name: 'Core & Stability', coach: 'Dan Katz',    room: 'Studio B',   enrolled: 8,  capacity: 8,  attended: 7,  type: 'Shield', zone: 2 },
  { id: 13, time: '12:00', endTime: '12:45', name: 'Lunchtime Burn',   coach: 'Noa Shapiro', room: 'Main Floor', enrolled: 12, capacity: 16, attended: 10, type: 'Burn',   zone: 5 },
  { id: 14, time: '17:30', endTime: '18:15', name: 'Evening Strength', coach: 'Tom Baruch',  room: 'Main Floor', enrolled: 16, capacity: 16, attended: 16, type: 'Build',  zone: 4 },
  { id: 15, time: '19:00', endTime: '19:45', name: 'Power Hour',       coach: 'Tom Baruch',  room: 'Main Floor', enrolled: 11, capacity: 16, attended: 9,  type: 'Build',  zone: 5 },
]

// Workout type counts for the Equalizer Balance card / popup, broken down
// by period. Used to compute distribution % and AI re-balancing tips.
// TODO(backend): replace with /reports/workout-type-distribution.
export const equalizerBalance = {
  day:     { Build: 2,   Shield: 1,   Burn: 3   },
  week:    { Build: 8,   Shield: 5,   Burn: 12  },
  month:   { Build: 32,  Shield: 24,  Burn: 44  },
  quarter: { Build: 96,  Shield: 70,  Burn: 130 },
  year:    { Build: 380, Shield: 290, Burn: 520 },
}

export const weeklySchedule = [
  // Sunday
  { day: 0, time: '07:00', endTime: '07:45', name: 'Morning Power',    coach: 'Maya Levy',   room: 'Main Floor', type: 'Burn',   zone: 4 },
  { day: 0, time: '09:00', endTime: '09:45', name: 'Core & Stability', coach: 'Dan Katz',    room: 'Studio B',   type: 'Shield', zone: 2 },
  { day: 0, time: '12:00', endTime: '12:45', name: 'Lunchtime Burn',   coach: 'Noa Shapiro', room: 'Main Floor', type: 'Burn',   zone: 5 },
  { day: 0, time: '17:30', endTime: '18:15', name: 'Evening Strength', coach: 'Tom Baruch',  room: 'Main Floor', type: 'Build',  zone: 4 },
  // Monday
  { day: 1, time: '07:00', endTime: '07:45', name: 'Morning Power',    coach: 'Maya Levy',   room: 'Main Floor', type: 'Burn',   zone: 4 },
  { day: 1, time: '08:00', endTime: '08:45', name: 'Flex & Recover',   coach: 'Liora Stein', room: 'Studio B',   type: 'Shield', zone: 1 },
  { day: 1, time: '17:30', endTime: '18:15', name: 'Power Hour',       coach: 'Tom Baruch',  room: 'Main Floor', type: 'Build',  zone: 5 },
  // Tuesday
  { day: 2, time: '07:00', endTime: '07:45', name: 'HIIT Circuit',     coach: 'Noa Shapiro', room: 'Main Floor', type: 'Burn',   zone: 5 },
  { day: 2, time: '10:00', endTime: '10:45', name: 'Core & Stability', coach: 'Dan Katz',    room: 'Studio B',   type: 'Shield', zone: 3 },
  { day: 2, time: '17:30', endTime: '18:15', name: 'Evening Strength', coach: 'Tom Baruch',  room: 'Main Floor', type: 'Build',  zone: 4 },
  // Wednesday
  { day: 3, time: '07:00', endTime: '07:45', name: 'Morning Power',    coach: 'Maya Levy',   room: 'Main Floor', type: 'Burn',   zone: 4 },
  { day: 3, time: '09:00', endTime: '09:45', name: 'Endurance Plus',   coach: 'Noa Shapiro', room: 'Main Floor', type: 'Burn',   zone: 3, conflict: true },
  { day: 3, time: '09:00', endTime: '09:45', name: 'Flex & Recover',   coach: 'Liora Stein', room: 'Studio B',   type: 'Shield', zone: 1 },
  { day: 3, time: '17:30', endTime: '18:15', name: 'Power Hour',       coach: 'Tom Baruch',  room: 'Main Floor', type: 'Build',  zone: 5 },
  // Thursday
  { day: 4, time: '07:00', endTime: '07:45', name: 'Morning Power',    coach: 'Maya Levy',   room: 'Main Floor', type: 'Burn',   zone: 4 },
  { day: 4, time: '09:00', endTime: '09:45', name: 'Core & Stability', coach: 'Dan Katz',    room: 'Studio B',   type: 'Shield', zone: 2 },
  { day: 4, time: '17:30', endTime: '18:15', name: 'Evening Strength', coach: 'Tom Baruch',  room: 'Main Floor', type: 'Build',  zone: 4 },
  // Friday
  { day: 5, time: '07:00', endTime: '07:45', name: 'Morning HIIT',     coach: 'Maya Levy',   room: 'Main Floor', type: 'Burn',   zone: 5 },
  { day: 5, time: '08:00', endTime: '08:45', name: 'Flex & Recover',   coach: 'Liora Stein', room: 'Studio B',   type: 'Shield', zone: 1 },
]

const PARTICIPANT_NAMES = [
  'Dan Cohen', 'Ben Levi', 'Yael Mizrahi', 'Ori Goldberg', 'Shira Dahan',
  'Amit Peretz', 'Nir Avraham', 'Tomer Fischer', 'Roni Berkowitz', 'Maya Rosenberg',
  'Eyal Shapira', 'Adi Kaplan', 'Tal Friedman', 'Noam Weiss', 'Lior Golan', 'Gal Harari',
]

export const classRoster = PARTICIPANT_NAMES.slice(0, 14).map((name, i) => ({
  id: i + 1,
  name,
  station: i + 1,
  checkedIn: i < 11, // first 11 checked in
}))

const EXERCISES = ['Chest Press', 'Squat', 'Deadlift', 'Shoulder Press', 'Bicep Curl', 'Lat Pulldown', 'Lunges', 'Tricep Extension']

// Live Session is split by STUDIO ROOM — multiple sessions can run in parallel
// in different rooms. Each studio entry is a self-contained live session with
// its own header, aggregate stats and station grid.
//
// Station status values:
//   active   — trainee is on the station and working
//   inactive — station was assigned to a trainee who didn't show up
//   empty    — no trainee assigned to this station
// (Renamed from `resting` → `inactive` per product brief.)
//
// TODO(backend): replace with the live-sessions stream from the gateway.
const STUDIO_B_NAMES = ['Itai Bar-On', 'Shir Cohen', 'Yonatan Hadad', 'Avia Reich', 'Mor Saban', 'Dor Levin', 'Ariel Tal']

export const liveSessionData = {
  studios: [
    {
      id: 'main', name: 'Main Floor',
      className: 'Morning Power', type: 'Burn', coach: 'Maya Levy',
      elapsedTime: '18:42', totalDuration: '45:00',
      currentPhase: 'Dynamic Strength — Set 2',
      aggregateStats: { avgHR: 142, totalReps: 1847, totalKg: 28450, topPerformer: 'Ben Levi' },
      stations: PARTICIPANT_NAMES.map((name, i) => {
        // ST 14 is INACTIVE — assigned trainee Noam Weiss didn't show up.
        // ST 15 & 16 are EMPTY — no trainee assigned at all.
        if (i >= 14) return { id: i + 1, status: 'empty' }
        if (i === 13) {
          return { id: i + 1, name, status: 'inactive' }
        }
        return {
          id: i + 1, name,
          exercise: EXERCISES[i % EXERCISES.length],
          bpm: 115 + Math.round(Math.random() * 60),
          reps: 4 + Math.round(Math.random() * 8),
          kg: 40 + Math.round(Math.random() * 50),
          completionPct: 20 + Math.round(Math.random() * 75),
          status: 'active',
        }
      }),
    },
    {
      id: 'studioB', name: 'Studio B',
      className: 'Core & Stability', type: 'Shield', coach: 'Dan Katz',
      elapsedTime: '09:18', totalDuration: '30:00',
      currentPhase: 'Core Block — Round 1',
      aggregateStats: { avgHR: 128, totalReps: 642, totalKg: 4870, topPerformer: 'Itai Bar-On' },
      stations: Array.from({ length: 8 }, (_, i) => {
        // ST 8 is empty in Studio B.
        if (i === 7) return { id: 100 + i + 1, status: 'empty' }
        return {
          id: 100 + i + 1,
          name: STUDIO_B_NAMES[i],
          exercise: EXERCISES[i % EXERCISES.length],
          bpm: 110 + Math.round(Math.random() * 40),
          reps: 4 + Math.round(Math.random() * 8),
          kg: 20 + Math.round(Math.random() * 30),
          completionPct: 20 + Math.round(Math.random() * 70),
          status: 'active',
        }
      }),
    },
  ],
}

// Deterministic mock trend deltas (% change vs previous session) — varied so
// some rows trigger the ≥±5% trend badge and some don't.
// TODO(backend): replace with real per-trainee performance trend from API.
const MOCK_TREND_DELTAS = [12, -7, 3, 8, -2, 0, -11, 6, 14, -4, 1, -8, 5, -15]

// Helper used by the post-session mock — produces a leaderboard for `names`
// with deterministic-ish stats so each session looks distinct but plausible.
function makeBoard(names, opts = {}) {
  const { baseScore = 940, scoreDecay = 38, baseKg = 3963, kgDecay = 180,
          baseReps = 268, repsDecay = 12, baseCal = 387, calDecay = 16 } = opts
  return names.map((name, i) => ({
    rank: i + 1,
    name,
    score:        Math.max(60,  baseScore - i * scoreDecay + Math.round(Math.random() * 20)),
    totalReps:    Math.max(40,  baseReps  - i * repsDecay  + Math.round(Math.random() * 15)),
    totalKg:      Math.max(200, baseKg    - i * kgDecay    + Math.round(Math.random() * 100)),
    calories:     Math.max(80,  baseCal   - i * calDecay   + Math.round(Math.random() * 20)),
    completionPct: Math.min(100, 100 - i * 3 + Math.round(Math.random() * 5)),
    uploadStatus: i < names.length - 3 ? 'synced' : i < names.length - 1 ? 'pending' : 'failed',
    trendDelta:   MOCK_TREND_DELTAS[i] ?? 0,
  }))
}

const ENDURANCE_NAMES = ['Maya Rosenberg', 'Eyal Shapira', 'Adi Kaplan', 'Tal Friedman', 'Lior Golan', 'Gal Harari', 'Dan Cohen', 'Ben Levi', 'Yael Mizrahi', 'Ori Goldberg', 'Shira Dahan', 'Amit Peretz']
const CORE_STABILITY_NAMES = ['Itai Bar-On', 'Shir Cohen', 'Yonatan Hadad', 'Avia Reich', 'Mor Saban', 'Dor Levin', 'Ariel Tal']

// Post-session is now a LIST of completed sessions filtered on the page
// by studio + time. A coach lands on the page and picks "which class".
//
// Each entry is a self-contained snapshot: leaderboard, aggregate stats and
// notification counts. `bigqueryStatus` is kept on every entry to satisfy
// the legacy BOPostSession view.
//
// TODO(backend): replace with /sessions?status=completed&date=today.
export const postSessionData = {
  sessions: [
    {
      id: 'main-0700',
      studio: 'Main Floor', time: '07:00', endTime: '07:45',
      className: 'Morning Power', type: 'Burn', coach: 'Maya Levy',
      leaderboard: makeBoard(PARTICIPANT_NAMES.slice(0, 14)),
      aggregateStats: { classAvgHR: 139, totalWeightMoved: '47,230 kg', avgCompletion: 89 },
      notifications:  { sent: 12, pending: 2 },
      bigqueryStatus: 'ready',
    },
    {
      id: 'main-0900',
      studio: 'Main Floor', time: '09:00', endTime: '09:45',
      className: 'Endurance Plus', type: 'Burn', coach: 'Noa Shapiro',
      leaderboard: makeBoard(ENDURANCE_NAMES, { baseScore: 880, scoreDecay: 32, baseKg: 3420, kgDecay: 150 }),
      aggregateStats: { classAvgHR: 144, totalWeightMoved: '38,910 kg', avgCompletion: 84 },
      notifications:  { sent: 10, pending: 2 },
      bigqueryStatus: 'ready',
    },
    {
      id: 'studioB-0900',
      studio: 'Studio B', time: '09:00', endTime: '09:45',
      className: 'Core & Stability', type: 'Shield', coach: 'Dan Katz',
      leaderboard: makeBoard(CORE_STABILITY_NAMES, { baseScore: 760, scoreDecay: 28, baseKg: 1820, kgDecay: 110, baseReps: 220, repsDecay: 10 }),
      aggregateStats: { classAvgHR: 124, totalWeightMoved: '11,640 kg', avgCompletion: 92 },
      notifications:  { sent: 7, pending: 0 },
      bigqueryStatus: 'ready',
    },
  ],
}

// Mock AI coaching feedback per trend bucket. The coach reads, the coach decides
// what to say in person — this is a read-only recommendation surface only.
// TODO(backend): replace with real AI-generated feedback from the recommendations service.
export const aiFeedbackTemplates = {
  improving: [
    {
      summary: 'Strong upward trend — keep momentum.',
      body: 'Performance is up notably vs last session. Pace control and rep quality both improved. Consider gently raising the load next time, especially on push movements where the trainee finished with reps in the tank.',
      focus: ['Push Strength progression', 'Maintain Zone 4 dwell time'],
    },
    {
      summary: 'Best session in 4 weeks.',
      body: 'New personal high on total reps and group score contribution. The trainee handled the All-Out block without form breakdown. Reinforce verbally; pair them with someone who could use the example.',
      focus: ['Mentor pairing', 'Hold Build difficulty'],
    },
  ],
  declining: [
    {
      summary: 'Drop vs previous session — check load + recovery.',
      body: 'Output is down meaningfully. Heart rate stayed in target but rep count fell during Pull blocks. Could be sleep, soreness, or a too-aggressive jump in load last session. Suggest dialing intensity back one zone for the next session.',
      focus: ['Reduce zone target by 1', 'Check recovery / sleep'],
    },
    {
      summary: 'Form breakdown in last block.',
      body: 'Reps stayed up but completion percentage fell sharply in the Finisher. Likely fatigue management — the trainee may be pacing too hard early. A short conversation about pacing strategy is recommended.',
      focus: ['Pacing strategy', 'Earlier rest cues'],
    },
  ],
  steady: [
    {
      summary: 'Consistent baseline — opportunity to push.',
      body: 'Three sessions of similar output. The trainee is comfortable at this load and may benefit from a small progressive overload — either a heavier band or one extra rep per set on key lifts.',
      focus: ['Progressive overload', 'Variety in finisher block'],
    },
  ],
}

export const equipment = [
  { id: 'BAND-001', name: 'Bands+ Alpha', type: 'bands', serial: 'HG-B-2024-001', assignedStation: 1, battery: 94, lastSeen: '2 min ago', status: 'active' },
  { id: 'BAND-002', name: 'Bands+ Alpha', type: 'bands', serial: 'HG-B-2024-002', assignedStation: 2, battery: 88, lastSeen: '2 min ago', status: 'active' },
  { id: 'BAND-003', name: 'Bands+ Alpha', type: 'bands', serial: 'HG-B-2024-003', assignedStation: 3, battery: 76, lastSeen: '2 min ago', status: 'active' },
  { id: 'BAND-004', name: 'Bands+ Alpha', type: 'bands', serial: 'HG-B-2024-004', assignedStation: 4, battery: 91, lastSeen: '2 min ago', status: 'active' },
  { id: 'BAND-005', name: 'Bands+ Alpha', type: 'bands', serial: 'HG-B-2024-005', assignedStation: 5, battery: 65, lastSeen: '5 min ago', status: 'active' },
  { id: 'BAND-006', name: 'Bands+ Alpha', type: 'bands', serial: 'HG-B-2024-006', assignedStation: 6, battery: 52, lastSeen: '5 min ago', status: 'active' },
  { id: 'BAND-007', name: 'Bands+ Beta', type: 'bands', serial: 'HG-B-2024-007', assignedStation: 7, battery: 12, lastSeen: '1 hr ago', status: 'maintenance' },
  { id: 'BAND-008', name: 'Bands+ Alpha', type: 'bands', serial: 'HG-B-2024-008', assignedStation: 8, battery: 83, lastSeen: '2 min ago', status: 'active' },
  { id: 'HR-001', name: 'HR Strap Pro', type: 'hr_monitor', serial: 'HG-H-2024-001', assignedStation: 1, battery: 97, lastSeen: '1 min ago', status: 'active' },
  { id: 'HR-002', name: 'HR Strap Pro', type: 'hr_monitor', serial: 'HG-H-2024-002', assignedStation: 2, battery: 91, lastSeen: '1 min ago', status: 'active' },
  { id: 'HR-003', name: 'HR Strap Pro', type: 'hr_monitor', serial: 'HG-H-2024-003', assignedStation: 3, battery: 85, lastSeen: '1 min ago', status: 'active' },
  { id: 'HR-004', name: 'HR Strap Pro', type: 'hr_monitor', serial: 'HG-H-2024-004', assignedStation: 4, battery: 78, lastSeen: '3 min ago', status: 'active' },
  { id: 'HR-005', name: 'HR Strap Pro', type: 'hr_monitor', serial: 'HG-H-2024-005', assignedStation: 5, battery: 44, lastSeen: '3 min ago', status: 'warning' },
  { id: 'HR-006', name: 'HR Strap Pro', type: 'hr_monitor', serial: 'HG-H-2024-006', assignedStation: 6, battery: 67, lastSeen: '2 min ago', status: 'active' },
  { id: 'STRAP-001', name: 'Straps Elite', type: 'straps', serial: 'HG-S-2024-001', assignedStation: 13, battery: 90, lastSeen: '2 min ago', status: 'active' },
  { id: 'STRAP-002', name: 'Straps Elite', type: 'straps', serial: 'HG-S-2024-002', assignedStation: 14, battery: 33, lastSeen: '2 min ago', status: 'warning' },
  { id: 'STRAP-003', name: 'Straps Elite', type: 'straps', serial: 'HG-S-2024-003', assignedStation: 15, battery: 0, lastSeen: '3 hrs ago', status: 'offline' },
  { id: 'STRAP-004', name: 'Straps Elite', type: 'straps', serial: 'HG-S-2024-004', assignedStation: 16, battery: 81, lastSeen: '2 min ago', status: 'active' },
]

// `type` uses Workout Types (Build/Shield/Burn). `zone` is difficulty (1-5).
export const workouts = [
  { id: 1, name: 'Upper Body Power',  type: 'Build',  duration: 45, zone: 4, exerciseCount: 8,  muscleGroups: ['Chest', 'Shoulders', 'Triceps'],  org: false },
  { id: 2, name: 'Core Fundamentals', type: 'Shield', duration: 30, zone: 2, exerciseCount: 6,  muscleGroups: ['Core', 'Back'],                    org: true  },
  { id: 3, name: 'Full Body HIIT',    type: 'Burn',   duration: 45, zone: 4, exerciseCount: 10, muscleGroups: ['Full Body'],                       org: false },
  { id: 4, name: 'Leg Day Extreme',   type: 'Build',  duration: 50, zone: 5, exerciseCount: 9,  muscleGroups: ['Quads', 'Hamstrings', 'Glutes'],   org: true  },
  { id: 5, name: 'Morning Mobility',  type: 'Shield', duration: 20, zone: 1, exerciseCount: 5,  muscleGroups: ['Full Body', 'Flexibility'],        org: true  },
  { id: 6, name: 'Pull Strength',     type: 'Build',  duration: 40, zone: 3, exerciseCount: 7,  muscleGroups: ['Back', 'Biceps'],                  org: false },
  { id: 7, name: 'Push & Press',      type: 'Build',  duration: 40, zone: 3, exerciseCount: 7,  muscleGroups: ['Chest', 'Shoulders'],              org: false },
  { id: 8, name: 'Endurance Circuit', type: 'Burn',   duration: 55, zone: 5, exerciseCount: 12, muscleGroups: ['Full Body', 'Cardio'],             org: true  },
]

export const programs = [
  { id: 1, name: '8-Week Strength Builder', workoutCount: 24, durationWeeks: 8, difficulty: 'Intermediate → Advanced' },
  { id: 2, name: 'Beginner Foundations', workoutCount: 12, durationWeeks: 4, difficulty: 'Beginner → Intermediate' },
  { id: 3, name: '12-Week Total Transform', workoutCount: 48, durationWeeks: 12, difficulty: 'Beginner → Advanced' },
  { id: 4, name: 'Core Mastery', workoutCount: 16, durationWeeks: 6, difficulty: 'Intermediate' },
]

// ─── Coach scheduling helpers ─────────────────────────────────────
// The "Coaches" page derives a per-coach monthly class list from the
// recurring weeklySchedule above, so the calendar popup has realistic data
// for the current month (May 2026 in the demo).
//
// TODO(backend): replace with /coaches/:id/schedule?month=YYYY-MM.
const TODAY_ISO  = '2026-05-03'
const MONTH_YEAR = 2026
const MONTH_IDX  = 4   // May (0-based)

export function getCoachMonthSchedule(coachName) {
  const out = []
  const recurring = weeklySchedule.filter(e => e.coach === coachName)
  if (recurring.length === 0) return out
  const daysInMonth = new Date(MONTH_YEAR, MONTH_IDX + 1, 0).getDate()
  for (let day = 1; day <= daysInMonth; day++) {
    const dow = new Date(MONTH_YEAR, MONTH_IDX, day).getDay()
    recurring.filter(e => e.day === dow).forEach(e => {
      const dateISO = `${MONTH_YEAR}-${String(MONTH_IDX + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      out.push({
        date: dateISO,
        time: e.time, endTime: e.endTime,
        className: e.name, room: e.room, type: e.type, zone: e.zone,
        // Anything before today is "done"; today and later are "upcoming".
        status: dateISO < TODAY_ISO ? 'done' : 'upcoming',
      })
    })
  }
  return out
}

export function getCoachMonthlyStats(coachName) {
  const list = getCoachMonthSchedule(coachName)
  return {
    total: list.length,
    done:  list.filter(c => c.status === 'done').length,
  }
}

export const TODAY = TODAY_ISO

export const alerts = [
  { id: 1, type: 'equipment', message: 'Station 7 — Bands+ battery low (12%)', severity: 'warning' },
  { id: 2, type: 'schedule', message: 'Wed 09:00 — Room conflict: Endurance Plus & Flex overlap on Main Floor', severity: 'error' },
  { id: 3, type: 'info', message: '3 new trainees registered today', severity: 'info' },
]

// ─── Trainees Needing Attention ───────────────────────────────────
// Four categories shown on the Dashboard, ABOVE Today's Classes.
// Detection logic is backend-driven; the mock below populates the UI.
// TODO(backend): replace with real lists from the trainee-trends endpoint.
export const traineesNeedingAttention = {
  improving: [
    { id: 101, name: 'Dan Cohen',      trendDelta: 12, lastSession: '2026-04-29' },
    { id: 102, name: 'Roni Berkowitz', trendDelta: 14, lastSession: '2026-04-28' },
    { id: 103, name: 'Ori Goldberg',   trendDelta: 8,  lastSession: '2026-04-27' },
    { id: 104, name: 'Tomer Fischer',  trendDelta: 6,  lastSession: '2026-04-29' },
    { id: 105, name: 'Tal Friedman',   trendDelta: 5,  lastSession: '2026-04-26' },
    { id: 106, name: 'Lior Golan',     trendDelta: 9,  lastSession: '2026-04-25' },
  ],
  declining: [
    { id: 201, name: 'Nir Avraham',    trendDelta: -11, lastSession: '2026-04-29' },
    { id: 202, name: 'Noam Weiss',     trendDelta: -15, lastSession: '2026-04-28' },
    { id: 203, name: 'Adi Kaplan',     trendDelta: -8,  lastSession: '2026-04-27' },
    { id: 204, name: 'Ben Levi',       trendDelta: -7,  lastSession: '2026-04-29' },
  ],
  missing: [
    {
      id: 301, name: 'Gal Harari',
      lastAttended: '2026-04-15', sessionsMissed: 4,
      memberSince: '2024-09-12', attendanceRate30d: 38, attendanceRateLifetime: 72,
      primaryClass: 'Evening Strength', contact: 'gal.h@hygear.com',
      missedSessions: [
        { date: '2026-04-29', class: 'Evening Strength' },
        { date: '2026-04-27', class: 'Power Hour' },
        { date: '2026-04-22', class: 'Evening Strength' },
        { date: '2026-04-20', class: 'Power Hour' },
      ],
      reengagementTip: 'Was a 3×/week regular until 2 weeks ago. A short check-in call before the next session may bring them back.',
    },
    {
      id: 302, name: 'Eyal Shapira',
      lastAttended: '2026-04-20', sessionsMissed: 3,
      memberSince: '2025-01-05', attendanceRate30d: 52, attendanceRateLifetime: 68,
      primaryClass: 'Morning Power', contact: 'eyal.shapira@hygear.com',
      missedSessions: [
        { date: '2026-04-29', class: 'Morning Power' },
        { date: '2026-04-27', class: 'Morning Power' },
        { date: '2026-04-25', class: 'HIIT Circuit' },
      ],
      reengagementTip: 'Mid-week mornings have been their pattern; a "we missed you" SMS for tomorrow 07:00 is likely to convert.',
    },
    {
      id: 303, name: 'Maya Rosenberg',
      lastAttended: '2026-04-22', sessionsMissed: 2,
      memberSince: '2025-06-18', attendanceRate30d: 60, attendanceRateLifetime: 81,
      primaryClass: 'Core & Stability', contact: 'maya.r@hygear.com',
      missedSessions: [
        { date: '2026-04-29', class: 'Core & Stability' },
        { date: '2026-04-27', class: 'Flex & Recover' },
      ],
      reengagementTip: 'Only 2 missed; offer a Flex & Recover slot — historically her bridge back after gaps.',
    },
  ],
  // Trainees coming in for their FIRST session at the studio today.
  // Profile data here is used by the Trainee Profile popup so the coach can
  // give personalized attention from the first moment.
  newToday: [
    {
      id: 401, name: 'Itai Bar-On',
      firstSessionTime: '07:00', firstSessionClass: 'Morning Power', joinedDate: '2026-04-30',
      age: 32, gender: 'M', fitnessLevel: 'Intermediate',
      goals: ['Build muscle', 'Improve endurance'],
      preferredTime: 'Mornings',
      experience: '3+ years general training, no Hygear experience',
      medicalNotes: 'Old right shoulder injury — avoid heavy overhead presses.',
      contact: 'itai.b@hygear.com',
    },
    {
      id: 402, name: 'Shir Cohen',
      firstSessionTime: '09:00', firstSessionClass: 'Core & Stability', joinedDate: '2026-05-01',
      age: 28, gender: 'F', fitnessLevel: 'Beginner',
      goals: ['Core strength', 'Better posture'],
      preferredTime: 'Mornings',
      experience: 'New to strength training; 2 years yoga.',
      medicalNotes: 'No restrictions.',
      contact: 'shir.cohen@hygear.com',
    },
    {
      id: 403, name: 'Yonatan Hadad',
      firstSessionTime: '17:30', firstSessionClass: 'Evening Strength', joinedDate: '2026-05-02',
      age: 41, gender: 'M', fitnessLevel: 'Advanced',
      goals: ['Maintain strength', 'Lose 4kg'],
      preferredTime: 'Evenings',
      experience: '10+ years lifting, returning after a break.',
      medicalNotes: 'Mild lower-back stiffness — start conservative on deadlifts.',
      contact: 'y.hadad@hygear.com',
    },
  ],
}
