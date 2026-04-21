import { useState } from 'react'
import { CalendarBlank, Users, Warning, Plus, UserPlus, Gear, ChartBar, Info, X, Target, ArrowsClockwise } from '@phosphor-icons/react'
import BOPageLayout from '../../components/backoffice/BOPageLayout'
import StatCard from '../../components/backoffice/StatCard'
import { todayClasses, alerts } from '../../data/backoffice'

const SEVERITY_COLORS = {
  warning: { border: '#FF6B00', bg: '#fff7ed' },
  error:   { border: '#F5365C', bg: '#fef2f2' },
  info:    { border: '#3A86FF', bg: '#eff6ff' },
}
const SEVERITY_ICONS = { warning: Warning, error: Warning, info: Info }

// Workout blocks per class type
const WORKOUT_TEMPLATES = {
  HIIT: {
    goal: { reps: 1800, label: 'Total Reps Goal' },
    blocks: [
      { step: 1, label: 'Warm-Up',          color: '#f5365c', icon: '/assets/thermo-warmup.svg',        duration: '5 Min'  },
      { step: 2, label: 'Demo &\nPrep',      color: '#fb6340', icon: '/assets/thermo-strength.svg',      duration: '5 Min'  },
      { step: 3, label: 'Dynamic\nStrength', color: '#319f70', icon: '/assets/thermo-cooldown2.svg',     duration: '15 Min' },
      { step: 4, label: 'Holds\nIsometric',  color: '#319f70', icon: '/assets/thermo-cooldown2.svg',     duration: '10 Min' },
      { step: 5, label: 'All Out',           color: '#8c67df', icon: '/assets/thermo-purple.svg',        duration: '10 Min' },
      { step: 6, label: 'Cool-down',         color: '#6685cd', icon: '/assets/thermo-cooldown-blue.svg', duration: '5 Min'  },
    ],
  },
  Core: {
    goal: { reps: 900, label: 'Total Reps Goal' },
    blocks: [
      { step: 1, label: 'Warm-Up',        color: '#f5365c', icon: '/assets/thermo-warmup.svg',        duration: '5 Min'  },
      { step: 2, label: 'Core\nCircuit',  color: '#fb6340', icon: '/assets/thermo-strength.svg',      duration: '10 Min' },
      { step: 3, label: 'Stability',      color: '#319f70', icon: '/assets/thermo-cooldown2.svg',     duration: '10 Min' },
      { step: 4, label: 'Plank\nSeries',  color: '#8c67df', icon: '/assets/thermo-purple.svg',        duration: '8 Min'  },
      { step: 5, label: 'Cool-down',      color: '#6685cd', icon: '/assets/thermo-cooldown-blue.svg', duration: '5 Min'  },
    ],
  },
  Strength: {
    goal: { reps: 2400, label: 'Total Reps Goal' },
    blocks: [
      { step: 1, label: 'Warm-Up',          color: '#f5365c', icon: '/assets/thermo-warmup.svg',        duration: '5 Min'  },
      { step: 2, label: 'Demo &\nPrep',      color: '#fb6340', icon: '/assets/thermo-strength.svg',      duration: '5 Min'  },
      { step: 3, label: 'Push\nStrength',    color: '#319f70', icon: '/assets/thermo-cooldown2.svg',     duration: '15 Min' },
      { step: 4, label: 'Pull\nStrength',    color: '#319f70', icon: '/assets/thermo-cooldown2.svg',     duration: '15 Min' },
      { step: 5, label: 'Finisher',          color: '#8c67df', icon: '/assets/thermo-purple.svg',        duration: '5 Min'  },
      { step: 6, label: 'Cool-down',         color: '#6685cd', icon: '/assets/thermo-cooldown-blue.svg', duration: '5 Min'  },
    ],
  },
}

function stepRadius(i, total) {
  const bl = i === 0 ? 30 : 6
  const br = i === total - 1 ? 30 : 6
  return `30px 30px ${br}px ${bl}px`
}

function WorkoutModal({ cls, onClose }) {
  const template = WORKOUT_TEMPLATES[cls.type] || WORKOUT_TEMPLATES.HIIT
  const { goal, blocks } = template

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6" style={{ background: 'rgba(0,0,0,0.55)' }}>
      <div style={{ background: '#fff', borderRadius: '36px 18px 36px 36px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', width: '100%', maxWidth: 1100, maxHeight: '90vh', overflowY: 'auto' }}>

        {/* Modal header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 font-poppins font-bold text-white text-sm" style={{ backgroundColor: cls.color, borderRadius: 999 }}>
              {cls.time}
            </div>
            <div>
              <p className="font-poppins font-bold text-xl text-[#334367]">{cls.name}</p>
              <p className="text-sm text-gray-500">{cls.coach} · {cls.room}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 transition-colors" style={{ borderRadius: 12 }}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="px-8 py-6 flex flex-col gap-6">
          {/* Goal row */}
          <div
            className="flex items-center justify-between px-8 py-5"
            style={{ background: '#334367', borderRadius: 36 }}
          >
            <div className="flex flex-col gap-1">
              <p className="font-poppins font-normal text-sm text-white/60 uppercase tracking-widest">Workout Goal</p>
              <p className="font-poppins font-bold text-3xl text-white">{cls.name}</p>
              <p className="font-poppins font-normal text-sm text-white/60">
                {cls.time} – {cls.endTime} · {cls.enrolled}/{cls.capacity} participants
              </p>
            </div>
            <div className="flex items-center gap-6 shrink-0">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <ArrowsClockwise size={20} color="white" />
                  <p className="font-poppins font-bold text-3xl text-white">{goal.reps.toLocaleString()}</p>
                </div>
                <p className="font-poppins text-xs text-white/60 uppercase tracking-wider">{goal.label}</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Target size={20} color="white" />
                  <p className="font-poppins font-bold text-3xl text-white">{cls.enrolled}</p>
                </div>
                <p className="font-poppins text-xs text-white/60 uppercase tracking-wider">Participants</p>
              </div>
            </div>
          </div>

          {/* Blocks row */}
          <div>
            <p className="font-poppins font-bold text-base text-[#334367] mb-3 uppercase tracking-wider text-sm">Training Blocks</p>
            <div className="flex gap-0" style={{ height: 280 }}>
              {blocks.map((block, i) => (
                <div
                  key={block.step}
                  style={{
                    flex: i === 0 ? '0 0 180px' : '1 0 0',
                    padding: 24,
                    borderRadius: stepRadius(i, blocks.length),
                    borderBottom: `6px solid ${block.color}`,
                    background: `linear-gradient(205deg, ${block.color}4D 0%, ${block.color}0D 100%), #fff`,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ borderBottom: `1px solid ${block.color}`, paddingBottom: 6 }}>
                      <span className="font-poppins text-sm font-semibold" style={{ color: block.color }}>
                        BLOCK {block.step}
                      </span>
                    </div>
                    <img src={block.icon} alt="" style={{ width: 40, height: 40, flexShrink: 0 }} />
                    <span className="font-poppins font-semibold text-black text-base leading-snug" style={{ whiteSpace: 'pre-line' }}>
                      {block.label}
                    </span>
                  </div>
                  <div
                    style={{
                      background: block.color, borderRadius: 999,
                      padding: '5px 14px', alignSelf: 'flex-start',
                    }}
                  >
                    <span className="font-poppins font-medium text-white text-xs">{block.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BODashboard() {
  const [selectedClass, setSelectedClass] = useState(null)

  const sidebarContent = (
    <div className="flex flex-col gap-4">
      <StatCard icon={Users} label="Today's Check-ins" value="49" sublabel="+12 from yesterday" color="#43a77c" />

      <div className="p-6" style={{ borderRadius: '36px 18px 36px 36px', background: '#fff' }}>
        <h3 className="font-poppins font-semibold text-[#334367] text-base mb-3">Active Alerts</h3>
        <div className="flex flex-col gap-2">
          {alerts.map(alert => {
            const sev = SEVERITY_COLORS[alert.severity]
            const Icon = SEVERITY_ICONS[alert.severity]
            return (
              <div
                key={alert.id}
                className="flex items-start gap-2.5 p-3 text-sm"
                style={{ backgroundColor: sev.bg, borderLeft: `3px solid ${sev.border}`, borderRadius: 12 }}
              >
                <Icon size={16} weight="bold" color={sev.border} className="shrink-0 mt-0.5" />
                <span className="text-gray-700">{alert.message}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-6" style={{ borderRadius: '36px 18px 36px 36px', background: '#fff' }}>
        <h3 className="font-poppins font-semibold text-[#334367] text-base mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Plus, label: 'New Class' },
            { icon: UserPlus, label: 'Add Coach' },
            { icon: Gear, label: 'Manage Rooms' },
            { icon: ChartBar, label: 'View Reports' },
          ].map(action => (
            <button
              key={action.label}
              className="flex items-center gap-2 px-3 py-2.5 rounded-full bg-[#edf3ef] text-[#334367] text-sm font-semibold hover:bg-[#d9e7e0] transition-colors"
            >
              <action.icon size={16} weight="bold" />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <BOPageLayout title="Backoffice Studio" sidebar={sidebarContent}>
      {/* Hero summary banner */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-6 py-5"
        style={{
          background: 'linear-gradient(191deg, #3A86FF4D 0%, #3A86FF0D 100%), #fff',
          borderBottom: '6px solid #3A86FF',
          borderRadius: 24,
        }}
      >
        <div className="flex flex-col gap-1">
          <p className="font-poppins font-normal text-sm text-[#334367]/60 uppercase tracking-widest">Today's Schedule</p>
          <p className="font-poppins font-bold text-3xl text-[#334367]">{todayClasses.length} Classes</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-poppins font-medium text-sm text-[#334367]/80 px-4 py-2 rounded-full" style={{ background: 'rgba(58,134,255,0.10)', border: '1.5px solid rgba(58,134,255,0.25)' }}>
            {todayClasses.reduce((a, c) => a + c.enrolled, 0)} Enrolled
          </span>
          <span className="font-poppins font-medium text-sm text-[#334367]/80 px-4 py-2 rounded-full" style={{ background: 'rgba(58,134,255,0.10)', border: '1.5px solid rgba(58,134,255,0.25)' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Today's Classes */}
      <h2 className="font-poppins font-bold text-2xl text-[#334367] mt-6 mb-4">Today's Classes</h2>
      <div className="flex flex-col gap-4">
        {todayClasses.map(cls => (
          <div
            key={cls.id}
            onClick={() => setSelectedClass(cls)}
            className="flex items-center gap-3 sm:gap-4 cursor-pointer hover:-translate-y-0.5 transition-all duration-200"
            style={{
              background: `linear-gradient(205deg, ${cls.color}4D 0%, ${cls.color}0D 100%), #fff`,
              borderBottom: `6px solid ${cls.color}`,
              borderRadius: 20,
              padding: '16px 20px',
            }}
          >
            <div
              className="shrink-0 px-3 py-1.5 font-poppins font-bold text-white text-sm"
              style={{ backgroundColor: cls.color, borderRadius: 999, minWidth: 68, textAlign: 'center' }}
            >
              {cls.time}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-poppins font-semibold text-base sm:text-lg text-[#334367] truncate">{cls.name}</p>
              <p className="text-sm sm:text-base text-gray-500 truncate">{cls.coach} &middot; {cls.room}</p>
            </div>
            <div className="shrink-0 flex items-center gap-1.5 text-sm sm:text-base text-gray-600">
              <Users size={16} />
              <span className="font-semibold">{cls.enrolled}</span>
              <span className="text-gray-400">/ {cls.capacity}</span>
            </div>
            <span className="shrink-0 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#edf3ef] text-[#334367]">
              {cls.type}
            </span>
          </div>
        ))}
      </div>

      {/* Workout preview modal */}
      {selectedClass && (
        <WorkoutModal cls={selectedClass} onClose={() => setSelectedClass(null)} />
      )}
    </BOPageLayout>
  )
}
