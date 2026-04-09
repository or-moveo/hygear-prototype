import AthleteCard from '../components/AthleteCard'
import { studioData } from '../data/studio'

export default function StudioDashboard() {
  const { name, progressPercent, athletes } = studioData

  // Split 16 athletes into rows of 4
  const rows = []
  for (let i = 0; i < athletes.length; i += 4) {
    rows.push(athletes.slice(i, i + 4))
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between px-12 py-8">
        <div className="flex items-center gap-4">
          <img
            src="/icons/hygear-logo.png"
            alt="HyGear logo"
            className="h-10 w-auto object-contain"
          />
          <span className="font-poppins font-semibold text-[36px] leading-[46px] text-black">
            {name}
          </span>
        </div>
      </div>

      {/* Athlete grid */}
      <div className="px-12 pb-12 flex flex-col gap-5">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-4 gap-6">
            {row.map((athlete) => (
              <AthleteCard key={athlete.id} {...athlete} />
            ))}
          </div>
        ))}

        {/* Progress bar */}
        <div className="relative h-2 w-full rounded-full bg-[#d9e7e0] mt-2">
          <div
            className="absolute left-0 top-0 h-2 rounded-full bg-[#43a77c] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
