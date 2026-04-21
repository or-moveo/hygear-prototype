import { Gear, WifiHigh, WifiSlash, Warning, Plus } from '@phosphor-icons/react'
import { rooms } from '../../data/backoffice'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"

const STATUS_COLORS = { active: '#23B870', maintenance: '#f59e0b', offline: '#ef4444' }
const STATUS_LABELS = { active: 'Active', maintenance: 'Maintenance', offline: 'Offline' }

export default function HygearStudioSetup() {
  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#333333', margin: 0 }}>Studio Rooms ({rooms.length})</h2>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: PRIMARY, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT }}>
          <Plus size={16} weight="bold" /> Add Room
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {rooms.map(room => {
          const statusCounts = room.stations.reduce((acc, s) => { acc[s.status] = (acc[s.status] || 0) + 1; return acc }, {})
          return (
            <div key={room.id} style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, overflow: 'hidden' }}>
              {/* Room header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #dcdcdc', background: '#FAFBFD' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: PRIMARY + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Gear size={18} color={PRIMARY} weight="fill" />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#333333', fontFamily: FONT }}>{room.name}</div>
                    <div style={{ fontSize: 12, color: '#8C8C8C', fontFamily: FONT }}>{room.dimensions} · {room.stationCount} stations · capacity {room.capacity}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {Object.entries(statusCounts).map(([status, count]) => (
                    <span key={status} style={{ background: STATUS_COLORS[status] + '18', color: STATUS_COLORS[status], border: `1px solid ${STATUS_COLORS[status]}40`, borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 600, fontFamily: FONT }}>
                      {count} {STATUS_LABELS[status]}
                    </span>
                  ))}
                </div>
              </div>

              {/* Station grid */}
              <div style={{ padding: '16px 20px' }}>
                <div style={{ fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, fontFamily: FONT }}>Stations</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 8 }}>
                  {room.stations.map(station => {
                    const color = STATUS_COLORS[station.status]
                    const Icon = station.status === 'offline' ? WifiSlash : station.status === 'maintenance' ? Warning : WifiHigh
                    return (
                      <div key={station.id} style={{ background: '#FAFBFD', border: `1.5px solid ${color}40`, borderRadius: 8, padding: '10px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, color: '#8C8C8C', fontFamily: FONT }}>ST {station.number}</span>
                          <Icon size={13} color={color} weight={station.status === 'active' ? 'regular' : 'fill'} />
                        </div>
                        <div style={{ fontSize: 11, color: '#333333', fontWeight: 500, fontFamily: FONT, textTransform: 'capitalize' }}>{station.type}</div>
                        <div style={{ marginTop: 4, height: 3, borderRadius: 999, background: color, opacity: 0.4 }} />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
