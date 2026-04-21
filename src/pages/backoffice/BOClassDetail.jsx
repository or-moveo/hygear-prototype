import { Play, X, Bell, Check, QrCode } from '@phosphor-icons/react'
import BOPageLayout from '../../components/backoffice/BOPageLayout'
import { classRoster, todayClasses } from '../../data/backoffice'

const cls = todayClasses[0] // Morning Power

function StationMapPanel() {
  return (
    <div>
      <h2 className="font-bold text-lg text-[#334367] mb-4">Station Map — {cls.room}</h2>
      <div
        className="p-5"
        style={{
          background: 'linear-gradient(252.16deg, rgba(60,141,235,0.1) 0%, rgba(60,141,235,0.3) 100%)',
          borderRadius: 24,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }, (_, i) => {
            const participant = classRoster.find(p => p.station === i + 1)
            const isOccupied = !!participant
            const initials = participant
              ? participant.name.split(' ').map(w => w[0]).join('')
              : ''

            return (
              <div
                key={i}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center border text-xs font-semibold transition-colors ${
                  isOccupied
                    ? 'bg-[#43a77c]/15 border-[#43a77c]/30 text-[#334367]'
                    : 'bg-gray-50 border-gray-200 text-gray-300'
                }`}
              >
                <span className="text-[10px] text-gray-400">#{i + 1}</span>
                {isOccupied && <span className="text-sm font-bold">{initials}</span>}
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#43a77c]/15 border border-[#43a77c]/30" />
            Occupied
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-gray-50 border border-gray-200" />
            Available
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BOClassDetail() {
  return (
    <BOPageLayout title="Class Detail" sidebar={<StationMapPanel />}>
      {/* Class info header bar */}
      <div
        className="px-8 py-5 flex items-center gap-6 flex-wrap"
        style={{
          background: 'linear-gradient(191deg, #3A86FF4D 0%, #3A86FF0D 100%), #fff',
          borderBottom: '6px solid #3A86FF',
          borderRadius: '36px 18px 36px 36px',
        }}
      >
        <p className="font-bold text-lg text-[#334367]">{cls.name}</p>
        <span className="text-[#334367]/60 text-sm">Today {cls.time} – {cls.endTime}</span>
        <span className="text-[#334367]/60 text-sm">Coach: {cls.coach}</span>
        <span className="text-[#334367]/60 text-sm">Room: {cls.room}</span>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1.5 bg-[#43a77c] text-white px-4 py-2 text-sm font-semibold hover:bg-[#3a9670] transition-colors" style={{ borderRadius: 12 }}>
            <Play size={14} weight="fill" /> Start Session
          </button>
          <button className="flex items-center gap-1.5 border border-red-400 text-red-400 px-4 py-2 text-sm font-semibold hover:bg-red-400/10 transition-colors" style={{ borderRadius: 12 }}>
            <X size={14} weight="bold" /> Cancel
          </button>
          <button className="flex items-center gap-1.5 border border-[#334367]/30 text-[#334367]/70 px-4 py-2 text-sm font-semibold hover:bg-[#334367]/10 transition-colors" style={{ borderRadius: 12 }}>
            <Bell size={14} weight="bold" /> Send Reminder
          </button>
        </div>
      </div>

      {/* Roster */}
      <div className="mt-6">
        <h2 className="font-bold text-lg text-[#334367] mb-4">
          Roster ({classRoster.filter(p => p.checkedIn).length}/{classRoster.length} checked in)
        </h2>
        <div className="overflow-hidden" style={{ borderRadius: '36px 18px 36px 36px', background: '#fff' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#334367' }} className="text-left text-white font-semibold">
                <th className="px-4 py-3 w-12">#</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3 w-24 text-center">Station</th>
                <th className="px-4 py-3 w-24 text-center">Check-in</th>
              </tr>
            </thead>
            <tbody>
              {classRoster.map((p, i) => (
                <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="px-4 py-2.5 text-gray-400">{p.id}</td>
                  <td className="px-4 py-2.5 font-medium text-[#334367]">{p.name}</td>
                  <td className="px-4 py-2.5 text-center text-gray-600">#{p.station}</td>
                  <td className="px-4 py-2.5 text-center">
                    {p.checkedIn ? (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <Check size={16} weight="bold" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-gray-300">
                        <QrCode size={16} />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BOPageLayout>
  )
}
