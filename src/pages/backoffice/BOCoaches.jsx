import { UserPlus, Star, CalendarBlank, Clock, Globe } from '@phosphor-icons/react'
import StudioHeader from '../../components/StudioHeader'
import StatusDot from '../../components/backoffice/StatusDot'
import { coaches } from '../../data/backoffice'

const AVATAR_COLORS = ['#43a77c', '#6685cd', '#e07b4c', '#8b5cf6', '#ec4899']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export default function BOCoaches() {
  return (
    <div className="min-h-screen bg-[#f2f2f5] font-poppins">
      <StudioHeader name="Coaches" variant="fluid" />

      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl text-[#334367]">Team ({coaches.length})</h2>
          <button className="flex items-center gap-2 bg-[#43a77c] text-white font-semibold px-5 py-2.5 rounded-full hover:bg-[#3a9670] transition-colors">
            <UserPlus size={18} weight="bold" />
            Invite Coach
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {coaches.map((coach, idx) => {
            const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length]
            return (
            <div
              key={coach.id}
              className="flex flex-col gap-4"
              style={{
                background: `linear-gradient(205deg, ${avatarColor}4D 0%, ${avatarColor}0D 100%), #fff`,
                borderBottom: `6px solid ${avatarColor}`,
                borderRadius: 24,
                padding: 24,
              }}
            >
              {/* Avatar + Name */}
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: avatarColor }}
                >
                  {coach.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-[#334367] truncate">{coach.name}</p>
                    <StatusDot status={coach.classesThisWeek > 0 ? 'active' : 'offline'} />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <Globe size={12} />
                    <span>{coach.timezone.replace('Asia/', '')}</span>
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1.5">
                {coach.specialties.map(s => (
                  <span key={s} className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#edf3ef] text-[#334367]">{s}</span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <CalendarBlank size={14} />
                  <span className="font-semibold">{coach.classesThisWeek}</span> cls/wk
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span className="font-semibold">{coach.avgAttendance}%</span> att
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} weight="fill" className="text-yellow-400" />
                  <span className="font-semibold">{coach.rating}</span>
                </div>
              </div>

              {/* Weekly availability (expanded for first coach) */}
              {idx === 0 && (
                <div className="border-t pt-3 mt-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Weekly Availability</p>
                  <div className="grid grid-cols-7 gap-1 rounded-2xl bg-white/50 p-3">
                    {DAY_KEYS.map((day, di) => {
                      const slots = coach.availability[day] || []
                      return (
                        <div key={day} className="text-center">
                          <p className="text-[10px] text-gray-400 mb-1">{DAY_LABELS[di]}</p>
                          {slots.length > 0 ? (
                            slots.map(slot => (
                              <div key={slot} className="bg-[#43a77c]/15 text-[#43a77c] text-[9px] font-semibold rounded-full px-0.5 py-0.5 mb-0.5">
                                {slot.split('-')[0]}
                              </div>
                            ))
                          ) : (
                            <div className="bg-gray-100 text-gray-300 text-[9px] rounded-full px-0.5 py-0.5">—</div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
