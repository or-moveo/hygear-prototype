import { useState } from 'react'
import { Buildings, Door, Cube, Bluetooth, Plus, CaretDown, CaretRight } from '@phosphor-icons/react'
import BOPageLayout from '../../components/backoffice/BOPageLayout'
import StatusDot from '../../components/backoffice/StatusDot'
import { rooms, equipment } from '../../data/backoffice'

const TYPE_LABELS = { bands: 'Bands', straps: 'Straps', hybrid: 'Hybrid', hr_monitor: 'HR Monitor' }

function BatteryBar({ level }) {
  const color = level > 50 ? '#43a77c' : level > 20 ? '#f59e0b' : '#ef4444'
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${level}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs text-gray-500">{level}%</span>
    </div>
  )
}

export default function BOStudioSetup() {
  const [expandedRoom, setExpandedRoom] = useState(1) // Main Floor expanded by default

  return (
    <BOPageLayout title="Studio Setup" fullWidth>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Buildings size={16} />
        <span className="font-semibold text-[#334367]">HyGear Tel Aviv</span>
        <span className="text-gray-300">/</span>
        <span>Rooms & Stations</span>
      </div>

      {/* CTAs */}
      <div className="flex gap-2 mb-6">
        {['Add Room', 'Add Station', 'Register Device'].map(label => (
          <button key={label} className="flex items-center gap-1.5 border-2 border-[#43a77c] text-[#43a77c] px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#43a77c]/10 transition-colors">
            <Plus size={14} weight="bold" />
            {label}
          </button>
        ))}
      </div>

      {/* Room cards */}
      <div className="flex flex-col gap-4 mb-8">
        {rooms.map(room => {
          const isExpanded = expandedRoom === room.id
          return (
            <div key={room.id}>
              <button
                onClick={() => setExpandedRoom(isExpanded ? null : room.id)}
                className="w-full p-5 flex items-center gap-4 hover:shadow-md transition-shadow text-left"
                style={{
                  borderRadius: '36px 18px 36px 36px',
                  background: isExpanded
                    ? 'linear-gradient(252.16deg, rgba(60,141,235,0.1) 0%, rgba(60,141,235,0.3) 100%)'
                    : '#fff',
                  backdropFilter: isExpanded ? 'blur(12px)' : undefined,
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-[#334367]/10 flex items-center justify-center shrink-0">
                  <Door size={20} weight="bold" className="text-[#334367]" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#334367]">{room.name}</p>
                  <p className="text-sm text-gray-500">{room.dimensions} &middot; {room.capacity} capacity &middot; {room.stationCount} stations</p>
                </div>
                {isExpanded ? <CaretDown size={18} className="text-gray-400" /> : <CaretRight size={18} className="text-gray-400" />}
              </button>

              {isExpanded && (
                <div className="ml-14 mt-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Stations</p>
                  <div className="grid grid-cols-8 gap-3 mb-6">
                    {room.stations.map(st => (
                      <div
                        key={st.id}
                        className={`bg-white border p-3 text-center ${
                          st.status === 'active' ? 'border-gray-200' :
                          st.status === 'maintenance' ? 'border-yellow-300 bg-yellow-50' :
                          'border-red-200 bg-red-50'
                        }`}
                        style={{ borderRadius: '36px 18px 36px 36px' }}
                      >
                        <p className="text-xs text-gray-400 mb-0.5">#{st.number}</p>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Cube size={12} className="text-gray-400" />
                          <span className="text-[10px] font-semibold text-gray-600">{st.type}</span>
                        </div>
                        <StatusDot status={st.status} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Equipment Inventory */}
      <h2 className="font-bold text-lg text-[#334367] mb-3">Equipment Inventory</h2>
      <div className="overflow-hidden" style={{ borderRadius: '36px 18px 36px 36px', background: '#fff' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-white font-semibold" style={{ background: '#334367' }}>
              <th className="px-4 py-3">Device</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Serial</th>
              <th className="px-4 py-3 text-center">Station</th>
              <th className="px-4 py-3">Battery</th>
              <th className="px-4 py-3">Last Seen</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((dev, i) => (
              <tr key={dev.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Bluetooth size={14} className="text-blue-500" />
                    <span className="font-medium text-[#334367]">{dev.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-gray-600">{TYPE_LABELS[dev.type] || dev.type}</td>
                <td className="px-4 py-2.5 text-gray-400 font-mono text-xs">{dev.serial}</td>
                <td className="px-4 py-2.5 text-center text-gray-600">#{dev.assignedStation}</td>
                <td className="px-4 py-2.5"><BatteryBar level={dev.battery} /></td>
                <td className="px-4 py-2.5 text-gray-500">{dev.lastSeen}</td>
                <td className="px-4 py-2.5 text-center"><StatusDot status={dev.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BOPageLayout>
  )
}
