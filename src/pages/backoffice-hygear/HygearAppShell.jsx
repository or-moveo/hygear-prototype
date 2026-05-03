import { useState } from 'react'
import { Bell, ChartBar, CalendarBlank, Broadcast, ClipboardText, Users, Barbell, Gear } from '@phosphor-icons/react'
import HygearDashboard from './HygearDashboard'
import HygearSchedule from './HygearSchedule'
import HygearLiveSession from './HygearLiveSession'
import HygearPostSession from './HygearPostSession'
import HygearStudioSetup from './HygearStudioSetup'
import HygearCoaches from './HygearCoaches'
import HygearWorkouts from './HygearWorkouts'

const PRIMARY = '#27bbc1'
const BG = '#FAFBFD'
const FONT = "'Heebo', 'Open Sans', sans-serif"

// HyGear Studio is a sub-system inside an existing parent admin platform.
// The navigation here lives only inside the content area we own — we never
// touch the parent admin's own header / shell.
const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',    icon: ChartBar,      component: HygearDashboard },
  { id: 'schedule',     label: 'Schedule',     icon: CalendarBlank, component: HygearSchedule },
  { id: 'live-session', label: 'Live Session', icon: Broadcast,     component: HygearLiveSession },
  { id: 'post-session', label: 'Post-Session', icon: ClipboardText, component: HygearPostSession },
  { id: 'coaches',      label: 'Coaches',      icon: Users,         component: HygearCoaches },
  { id: 'workouts',     label: 'Workouts',     icon: Barbell,       component: HygearWorkouts },
  { id: 'studio-setup', label: 'Studio Rooms', icon: Gear,          component: HygearStudioSetup },
]

export default function HygearAppShell() {
  const [activeId, setActiveId] = useState('dashboard')
  const activeItem = NAV_ITEMS.find(n => n.id === activeId) || NAV_ITEMS[0]
  const ActiveScreen = activeItem.component

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: BG, fontFamily: FONT, overflow: 'hidden' }}>
      {/* Top bar — admin identity (parent shell stays untouched).
          Uniform 16px vertical / 32px horizontal padding; 56×56 logo (200%
          of the original 28×28), with the bar height set to fit it cleanly. */}
      <header style={{
        background: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px', flexShrink: 0, borderBottom: '1px solid #dcdcdc',
      }}>
        <img src="/hygear-logo.svg" alt="Hygear" style={{ width: 56, height: 56, objectFit: 'contain' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ width: 40, height: 40, borderRadius: '50%', background: '#FAFBFD', border: '1px solid #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Bell size={20} color="#939393" />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: FONT }}>A</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 14, color: '#333333', fontWeight: 600, lineHeight: 1.2, fontFamily: FONT }}>Admin</span>
              <span style={{ fontSize: 12, color: '#939393', lineHeight: 1.3, fontFamily: FONT }}>Studio Manager</span>
            </div>
          </div>
        </div>
      </header>

      {/* Section Header + Pill nav — replaces the previous left icon menu */}
      <div style={{ background: '#fff', padding: '20px 32px 0', flexShrink: 0 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#333333', fontFamily: FONT }}>
          HyGear Studio
        </h1>
        <div style={{ marginTop: 4, fontSize: 13, color: '#8C8C8C', fontFamily: FONT }}>
          Manage classes, coaches, and live sessions
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.id === activeId
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '9px 18px', borderRadius: 999,
                  border: '1.5px solid', borderColor: isActive ? PRIMARY : '#dcdcdc',
                  background: isActive ? PRIMARY : '#fff',
                  color: isActive ? '#fff' : '#333333',
                  fontSize: 13, fontWeight: isActive ? 700 : 600,
                  cursor: 'pointer', fontFamily: FONT,
                  boxShadow: isActive ? '0 4px 12px rgba(39,187,193,0.28)' : 'none',
                  transition: 'all 0.12s ease',
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.color = PRIMARY } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.borderColor = '#dcdcdc'; e.currentTarget.style.color = '#333333' } }}
              >
                <Icon size={15} weight={isActive ? 'fill' : 'regular'} />
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Thin divider marks the navigation boundary */}
        <div style={{ height: 1, background: '#dcdcdc', marginTop: 16 }} />
      </div>

      {/* Content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: 24, background: BG }}>
        <ActiveScreen />
      </main>
    </div>
  )
}
