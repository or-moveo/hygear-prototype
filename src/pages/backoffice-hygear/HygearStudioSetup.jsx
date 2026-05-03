import { useState } from 'react'
import { Gear, WifiHigh, WifiSlash, Warning, Plus, BatteryHigh, BatteryMedium, BatteryLow, BatteryWarning } from '@phosphor-icons/react'
import { rooms } from '../../data/backoffice'
import AddStudioRoomModal from '../../components/backoffice/AddStudioRoomModal'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"

const STATUS_COLORS = { active: '#23B870', maintenance: '#f59e0b', offline: '#ef4444' }
const STATUS_LABELS = { active: 'Active', maintenance: 'Maintenance', offline: 'Offline' }

function batteryIcon(pct) {
  if (pct <= 0)   return BatteryWarning
  if (pct < 30)   return BatteryLow
  if (pct < 70)   return BatteryMedium
  return BatteryHigh
}
function batteryColor(pct, deviceStatus) {
  if (deviceStatus === 'offline')     return '#ef4444'
  if (deviceStatus === 'maintenance') return '#f59e0b'
  return pct < 30 ? '#f59e0b' : '#23B870'
}

export default function HygearStudioSetup() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#333333', margin: 0 }}>Studio Rooms ({rooms.length})</h2>
        <button onClick={() => setModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: PRIMARY, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT }}>
          <Plus size={16} weight="bold" /> Add Studio Room
        </button>
      </div>

      <AddStudioRoomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={(payload) => {
          // TODO(backend): POST new room to /rooms.
          console.log('Studio room created:', payload)
        }}
      />

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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
                  {room.stations.map(station => {
                    const stationColor = STATUS_COLORS[station.status]
                    return (
                      <div key={station.id} style={{
                        background: '#fff',
                        border: `1.5px solid ${stationColor}40`,
                        borderRadius: 10,
                        padding: '10px 12px',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#333333', fontFamily: FONT }}>ST {station.number}</span>
                          <span style={{
                            background: stationColor + '18', color: stationColor,
                            borderRadius: 999, padding: '1px 7px',
                            fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em',
                          }}>{STATUS_LABELS[station.status]}</span>
                        </div>
                        <DeviceRow device={station.devices.straps} />
                        <DeviceRow device={station.devices.bands} />
                        <DeviceRow device={station.devices.spider} last />
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

function DeviceRow({ device, last }) {
  const Battery = batteryIcon(device.battery)
  const batt    = batteryColor(device.battery, device.status)
  const ConnIcon = device.status === 'offline' ? WifiSlash : device.status === 'maintenance' ? Warning : WifiHigh
  const connColor = STATUS_COLORS[device.status]
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '5px 0',
      borderBottom: last ? 'none' : '1px solid #f0f0f0',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <ConnIcon size={12} color={connColor} weight={device.status === 'active' ? 'regular' : 'fill'} />
        <span style={{ fontSize: 12, fontWeight: 500, color: '#333333', fontFamily: FONT }}>{device.name}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Battery size={13} color={batt} weight="fill" />
        <span style={{ fontSize: 11, fontWeight: 700, color: batt, fontFamily: FONT, fontVariantNumeric: 'tabular-nums' }}>
          {device.status === 'offline' ? '—' : `${device.battery}%`}
        </span>
      </div>
    </div>
  )
}
