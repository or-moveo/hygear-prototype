import { useState } from 'react'
import { MagnifyingGlass, FunnelSimple, Barbell, Timer, Lightning, Plus, Folder } from '@phosphor-icons/react'
import BOPageLayout from '../../components/backoffice/BOPageLayout'
import { workouts, programs } from '../../data/backoffice'

const DIFF_COLORS = {
  Beginner: { bg: 'bg-green-100', text: 'text-green-700', hex: '#43a77c' },
  Intermediate: { bg: 'bg-yellow-100', text: 'text-yellow-700', hex: '#f59e0b' },
  Advanced: { bg: 'bg-red-100', text: 'text-red-700', hex: '#ef4444' },
}

export default function BOWorkouts() {
  const [activeTab, setActiveTab] = useState('mine')

  const filteredWorkouts = activeTab === 'mine' ? workouts.filter(w => !w.org) : workouts.filter(w => w.org)

  return (
    <BOPageLayout title="Workouts & Programs" fullWidth>
      <div className="px-6 py-6">
        {/* Tabs + CTA */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 bg-white rounded-full p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('mine')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === 'mine' ? 'bg-[#334367] text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              My Workouts
            </button>
            <button
              onClick={() => setActiveTab('org')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === 'org' ? 'bg-[#334367] text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Organization
            </button>
          </div>
          <button className="flex items-center gap-2 bg-[#43a77c] text-white font-semibold px-5 py-2.5 rounded-full hover:bg-[#3a9670] transition-colors">
            <Plus size={18} weight="bold" />
            Create Workout
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search workouts..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white shadow-sm text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#43a77c]/30"
              readOnly
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Strength', 'HIIT', 'Core', 'Flexibility'].map(f => (
              <button
                key={f}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  f === 'All' ? 'bg-[#334367] text-white' : 'bg-[#edf3ef] text-[#334367] hover:bg-[#d9e7e0]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Workout Cards */}
        <h3 className="font-bold text-lg text-[#334367] mb-3">Workouts</h3>
        <div className="grid grid-cols-3 gap-6 mb-8">
          {filteredWorkouts.map(w => {
            const diff = DIFF_COLORS[w.difficulty] || DIFF_COLORS.Intermediate
            const color = diff.hex || '#f59e0b'
            return (
              <div
                key={w.id}
                className="flex flex-col gap-3"
                style={{
                  background: `linear-gradient(205deg, ${color}4D 0%, ${color}0D 100%), #fff`,
                  borderBottom: `6px solid ${color}`,
                  borderRadius: 36,
                  padding: 24,
                }}
              >
                <div className="flex items-start justify-between">
                  <p className="font-semibold text-[#334367]">{w.name}</p>
                  <span className={`${diff.bg} ${diff.text} text-[11px] font-semibold px-2 py-0.5 rounded-full`}>
                    {w.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1"><Timer size={14} />{w.duration} min</div>
                  <div className="flex items-center gap-1"><Lightning size={14} />{w.exerciseCount} exercises</div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {w.muscleGroups.map(mg => (
                    <span key={mg} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/60 text-gray-600">
                      {mg}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Programs */}
        <h3 className="font-bold text-lg text-[#334367] mb-3">Programs</h3>
        <div className="grid grid-cols-2 gap-6">
          {programs.map(p => (
            <div
              key={p.id}
              className="flex items-center gap-4"
              style={{
                background: 'linear-gradient(252.16deg, rgba(60,141,235,0.1) 0%, rgba(60,141,235,0.3) 100%)',
                borderRadius: 36,
                padding: 24,
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/40 flex items-center justify-center shrink-0">
                <Folder size={24} weight="bold" className="text-[#334367]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#334367]">{p.name}</p>
                <p className="text-sm text-gray-500">
                  {p.workoutCount} workouts &middot; {p.durationWeeks} weeks &middot; {p.difficulty}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BOPageLayout>
  )
}
