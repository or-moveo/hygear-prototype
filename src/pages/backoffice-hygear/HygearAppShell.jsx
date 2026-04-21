import { useState } from 'react'
import { ChartBar, CalendarBlank, Broadcast, ClipboardText, Gear, Users, Barbell, Bell } from '@phosphor-icons/react'
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

const NAV_ITEMS = [
  { id: 'dashboard',    icon: ChartBar,       label: 'Dashboard',    component: HygearDashboard },
  { id: 'schedule',     icon: CalendarBlank,  label: 'Schedule',     component: HygearSchedule },
  { id: 'live-session', icon: Broadcast,      label: 'Live Session', component: HygearLiveSession },
  { id: 'post-session', icon: ClipboardText,  label: 'Post-Session', component: HygearPostSession },
  { id: 'coaches',      icon: Users,          label: 'Coaches',      component: HygearCoaches },
  { id: 'workouts',     icon: Barbell,        label: 'Workouts',     component: HygearWorkouts },
  { id: 'studio-setup', icon: Gear,           label: 'Studio Setup', component: HygearStudioSetup },
]

export default function HygearAppShell() {
  const [activeId, setActiveId] = useState('dashboard')
  const activeItem = NAV_ITEMS.find(n => n.id === activeId) || NAV_ITEMS[0]
  const ActiveScreen = activeItem.component

  return (
    <div style={{ display: 'flex', height: '100%', background: BG, fontFamily: FONT, overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: 72, background: '#fff', borderRight: '1px solid #dcdcdc',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '12px 0 16px', gap: 4, flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 16, padding: '4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/hygear-logo.svg" alt="Hygear" style={{ width: 36, height: 36, objectFit: 'contain' }} />
        </div>

        {NAV_ITEMS.map(item => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              title={item.label}
              style={{
                width: 48, height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 8, border: 'none', cursor: 'pointer',
                background: isActive ? PRIMARY : 'transparent',
                color: isActive ? '#fff' : '#939393',
                transition: 'all 0.15s ease',
              }}
            >
              <item.icon size={22} weight={isActive ? 'fill' : 'regular'} />
            </button>
          )
        })}
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          height: 64, background: '#fff',
          boxShadow: '0 10px 10px -10px #5181fd',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', flexShrink: 0, zIndex: 10,
        }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: '#333333', fontFamily: FONT }}>
            {activeItem.label}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ width: 36, height: 36, borderRadius: '50%', background: '#FAFBFD', border: '1px solid #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Bell size={18} color="#939393" />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: PRIMARY, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, fontFamily: FONT }}>
                A
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 13, color: '#333333', fontWeight: 600, lineHeight: 1.2, fontFamily: FONT }}>Admin</span>
                <span style={{ fontSize: 11, color: '#939393', lineHeight: 1.2, fontFamily: FONT }}>Studio Manager</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: 24, background: BG }}>
          <ActiveScreen />
        </main>
      </div>
    </div>
  )
}
