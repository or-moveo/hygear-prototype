// ─── Backoffice Studio Mock Data ───────────────────────────────────

export const coaches = [
  {
    id: 1, name: 'Maya Levy', initials: 'ML',
    specialties: ['HIIT', 'Strength'], timezone: 'Asia/Jerusalem',
    classesThisWeek: 8, avgAttendance: 87, rating: 4.8,
    availability: {
      sun: ['06:00-12:00'], mon: ['06:00-14:00'], tue: ['07:00-13:00'],
      wed: ['06:00-12:00'], thu: ['06:00-14:00'], fri: ['07:00-11:00'], sat: [],
    },
  },
  {
    id: 2, name: 'Dan Katz', initials: 'DK',
    specialties: ['Core', 'Flexibility'], timezone: 'Asia/Jerusalem',
    classesThisWeek: 6, avgAttendance: 91, rating: 4.9,
    availability: {
      sun: ['08:00-16:00'], mon: ['08:00-16:00'], tue: ['10:00-18:00'],
      wed: ['08:00-16:00'], thu: ['08:00-16:00'], fri: [], sat: [],
    },
  },
  {
    id: 3, name: 'Noa Shapiro', initials: 'NS',
    specialties: ['Endurance', 'HIIT'], timezone: 'Asia/Jerusalem',
    classesThisWeek: 5, avgAttendance: 82, rating: 4.6,
    availability: {
      sun: ['14:00-20:00'], mon: ['14:00-20:00'], tue: ['14:00-20:00'],
      wed: ['14:00-20:00'], thu: ['14:00-20:00'], fri: [], sat: [],
    },
  },
  {
    id: 4, name: 'Tom Baruch', initials: 'TB',
    specialties: ['Strength', 'Power'], timezone: 'Asia/Jerusalem',
    classesThisWeek: 7, avgAttendance: 85, rating: 4.7,
    availability: {
      sun: ['06:00-10:00', '16:00-20:00'], mon: ['06:00-10:00', '16:00-20:00'],
      tue: ['06:00-10:00'], wed: ['06:00-10:00', '16:00-20:00'],
      thu: ['06:00-10:00', '16:00-20:00'], fri: ['06:00-10:00'], sat: [],
    },
  },
  {
    id: 5, name: 'Liora Stein', initials: 'LS',
    specialties: ['Yoga', 'Recovery', 'Flexibility'], timezone: 'Asia/Jerusalem',
    classesThisWeek: 4, avgAttendance: 93, rating: 4.9,
    availability: {
      sun: ['07:00-11:00'], mon: ['07:00-11:00'], tue: ['07:00-11:00'],
      wed: ['07:00-11:00'], thu: ['07:00-11:00'], fri: ['07:00-09:00'], sat: [],
    },
  },
]

export const rooms = [
  {
    id: 1, name: 'Main Floor', dimensions: '12×8m', capacity: 16, stationCount: 16,
    stations: Array.from({ length: 16 }, (_, i) => ({
      id: i + 1, number: i + 1,
      type: i < 8 ? 'hybrid' : i < 12 ? 'bands' : 'straps',
      deviceIds: [`BAND-${String(i + 1).padStart(3, '0')}`, `HR-${String(i + 1).padStart(3, '0')}`],
      status: i === 6 ? 'maintenance' : i === 14 ? 'offline' : 'active',
    })),
  },
  {
    id: 2, name: 'Studio B', dimensions: '8×6m', capacity: 8, stationCount: 8,
    stations: Array.from({ length: 8 }, (_, i) => ({
      id: 100 + i + 1, number: i + 1,
      type: 'bands',
      deviceIds: [`BAND-${String(100 + i + 1).padStart(3, '0')}`],
      status: 'active',
    })),
  },
]

export const todayClasses = [
  { id: 1, time: '07:00', endTime: '07:45', name: 'Morning Power', coach: 'Maya Levy', room: 'Main Floor', enrolled: 14, capacity: 16, type: 'HIIT', color: '#43a77c' },
  { id: 2, time: '09:00', endTime: '09:45', name: 'Core & Stability', coach: 'Dan Katz', room: 'Studio B', enrolled: 7, capacity: 8, type: 'Core', color: '#6685cd' },
  { id: 3, time: '12:00', endTime: '12:45', name: 'Lunchtime Burn', coach: 'Noa Shapiro', room: 'Main Floor', enrolled: 12, capacity: 16, type: 'HIIT', color: '#e07b4c' },
  { id: 4, time: '17:30', endTime: '18:15', name: 'Evening Strength', coach: 'Tom Baruch', room: 'Main Floor', enrolled: 16, capacity: 16, type: 'Strength', color: '#8b5cf6' },
]

export const weeklySchedule = [
  // Sunday
  { day: 0, time: '07:00', endTime: '07:45', name: 'Morning Power', coach: 'Maya Levy', room: 'Main Floor', type: 'HIIT', color: '#43a77c' },
  { day: 0, time: '09:00', endTime: '09:45', name: 'Core & Stability', coach: 'Dan Katz', room: 'Studio B', type: 'Core', color: '#6685cd' },
  { day: 0, time: '12:00', endTime: '12:45', name: 'Lunchtime Burn', coach: 'Noa Shapiro', room: 'Main Floor', type: 'HIIT', color: '#e07b4c' },
  { day: 0, time: '17:30', endTime: '18:15', name: 'Evening Strength', coach: 'Tom Baruch', room: 'Main Floor', type: 'Strength', color: '#8b5cf6' },
  // Monday
  { day: 1, time: '07:00', endTime: '07:45', name: 'Morning Power', coach: 'Maya Levy', room: 'Main Floor', type: 'HIIT', color: '#43a77c' },
  { day: 1, time: '08:00', endTime: '08:45', name: 'Flex & Recover', coach: 'Liora Stein', room: 'Studio B', type: 'Yoga', color: '#ec4899' },
  { day: 1, time: '17:30', endTime: '18:15', name: 'Power Hour', coach: 'Tom Baruch', room: 'Main Floor', type: 'Strength', color: '#8b5cf6' },
  // Tuesday
  { day: 2, time: '07:00', endTime: '07:45', name: 'HIIT Circuit', coach: 'Noa Shapiro', room: 'Main Floor', type: 'HIIT', color: '#e07b4c' },
  { day: 2, time: '10:00', endTime: '10:45', name: 'Core & Stability', coach: 'Dan Katz', room: 'Studio B', type: 'Core', color: '#6685cd' },
  { day: 2, time: '17:30', endTime: '18:15', name: 'Evening Strength', coach: 'Tom Baruch', room: 'Main Floor', type: 'Strength', color: '#8b5cf6' },
  // Wednesday
  { day: 3, time: '07:00', endTime: '07:45', name: 'Morning Power', coach: 'Maya Levy', room: 'Main Floor', type: 'HIIT', color: '#43a77c' },
  { day: 3, time: '09:00', endTime: '09:45', name: 'Endurance Plus', coach: 'Noa Shapiro', room: 'Main Floor', type: 'Endurance', color: '#e07b4c', conflict: true },
  { day: 3, time: '09:00', endTime: '09:45', name: 'Flex & Recover', coach: 'Liora Stein', room: 'Studio B', type: 'Yoga', color: '#ec4899' },
  { day: 3, time: '17:30', endTime: '18:15', name: 'Power Hour', coach: 'Tom Baruch', room: 'Main Floor', type: 'Strength', color: '#8b5cf6' },
  // Thursday
  { day: 4, time: '07:00', endTime: '07:45', name: 'Morning Power', coach: 'Maya Levy', room: 'Main Floor', type: 'HIIT', color: '#43a77c' },
  { day: 4, time: '09:00', endTime: '09:45', name: 'Core & Stability', coach: 'Dan Katz', room: 'Studio B', type: 'Core', color: '#6685cd' },
  { day: 4, time: '17:30', endTime: '18:15', name: 'Evening Strength', coach: 'Tom Baruch', room: 'Main Floor', type: 'Strength', color: '#8b5cf6' },
  // Friday
  { day: 5, time: '07:00', endTime: '07:45', name: 'Morning HIIT', coach: 'Maya Levy', room: 'Main Floor', type: 'HIIT', color: '#43a77c' },
  { day: 5, time: '08:00', endTime: '08:45', name: 'Flex & Recover', coach: 'Liora Stein', room: 'Studio B', type: 'Yoga', color: '#ec4899' },
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

export const liveSessionData = {
  className: 'Morning Power',
  coach: 'Maya Levy',
  room: 'Main Floor',
  elapsedTime: '18:42',
  totalDuration: '45:00',
  overallProgress: 41.6,
  currentPhase: 'Dynamic Strength — Set 2',
  aggregateStats: { avgHR: 142, totalReps: 1847, totalKg: 28450, topPerformer: 'Ben Levi' },
  stations: PARTICIPANT_NAMES.map((name, i) => ({
    id: i + 1,
    name,
    exercise: EXERCISES[i % EXERCISES.length],
    bpm: 115 + Math.round(Math.random() * 60),
    reps: 4 + Math.round(Math.random() * 8),
    kg: 40 + Math.round(Math.random() * 50),
    completionPct: 20 + Math.round(Math.random() * 75),
    status: i < 12 ? 'active' : i < 14 ? 'resting' : 'transitioning',
  })),
}

export const postSessionData = {
  leaderboard: PARTICIPANT_NAMES.slice(0, 14).map((name, i) => ({
    rank: i + 1,
    name,
    score: 940 - i * 38 + Math.round(Math.random() * 20),
    totalReps: 268 - i * 12 + Math.round(Math.random() * 15),
    totalKg: 3963 - i * 180 + Math.round(Math.random() * 100),
    calories: 387 - i * 16 + Math.round(Math.random() * 20),
    completionPct: Math.min(100, 100 - i * 3 + Math.round(Math.random() * 5)),
    uploadStatus: i < 11 ? 'synced' : i < 13 ? 'pending' : 'failed',
  })),
  aggregateStats: { classAvgHR: 139, totalWeightMoved: '47,230 kg', avgCompletion: 89 },
  notifications: { sent: 12, pending: 2 },
  bigqueryStatus: 'ready',
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

export const workouts = [
  { id: 1, name: 'Upper Body Power', duration: 45, difficulty: 'Advanced', exerciseCount: 8, muscleGroups: ['Chest', 'Shoulders', 'Triceps'], org: false },
  { id: 2, name: 'Core Fundamentals', duration: 30, difficulty: 'Beginner', exerciseCount: 6, muscleGroups: ['Core', 'Back'], org: true },
  { id: 3, name: 'Full Body HIIT', duration: 45, difficulty: 'Intermediate', exerciseCount: 10, muscleGroups: ['Full Body'], org: false },
  { id: 4, name: 'Leg Day Extreme', duration: 50, difficulty: 'Advanced', exerciseCount: 9, muscleGroups: ['Quads', 'Hamstrings', 'Glutes'], org: true },
  { id: 5, name: 'Morning Mobility', duration: 20, difficulty: 'Beginner', exerciseCount: 5, muscleGroups: ['Full Body', 'Flexibility'], org: true },
  { id: 6, name: 'Pull Strength', duration: 40, difficulty: 'Intermediate', exerciseCount: 7, muscleGroups: ['Back', 'Biceps'], org: false },
  { id: 7, name: 'Push & Press', duration: 40, difficulty: 'Intermediate', exerciseCount: 7, muscleGroups: ['Chest', 'Shoulders'], org: false },
  { id: 8, name: 'Endurance Circuit', duration: 55, difficulty: 'Advanced', exerciseCount: 12, muscleGroups: ['Full Body', 'Cardio'], org: true },
]

export const programs = [
  { id: 1, name: '8-Week Strength Builder', workoutCount: 24, durationWeeks: 8, difficulty: 'Intermediate → Advanced' },
  { id: 2, name: 'Beginner Foundations', workoutCount: 12, durationWeeks: 4, difficulty: 'Beginner → Intermediate' },
  { id: 3, name: '12-Week Total Transform', workoutCount: 48, durationWeeks: 12, difficulty: 'Beginner → Advanced' },
  { id: 4, name: 'Core Mastery', workoutCount: 16, durationWeeks: 6, difficulty: 'Intermediate' },
]

export const alerts = [
  { id: 1, type: 'equipment', message: 'Station 7 — Bands+ battery low (12%)', severity: 'warning' },
  { id: 2, type: 'schedule', message: 'Wed 09:00 — Room conflict: Endurance Plus & Flex overlap on Main Floor', severity: 'error' },
  { id: 3, type: 'info', message: '3 new trainees registered today', severity: 'info' },
]
