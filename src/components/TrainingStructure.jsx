import { SquaresFour, ArrowsCounterClockwise, Barbell } from '@phosphor-icons/react'

const DEFAULT_ITEMS = [
  { id: 1, setNum: 4, name: 'Bench Press', reps: 12, kg: 75, status: 'past' },
  { id: 2, setNum: 4, name: 'Bench Press', reps: 12, kg: 75, status: 'past' },
  { id: 3, setNum: 4, name: 'Bench Press', reps: 12, kg: 75, status: 'past' },
  { id: 4, setNum: 3, name: 'Bench Press', reps: 12, kg: 75, status: 'active' },
  { id: 5, setNum: 4, name: 'Bench Press', reps: 12, kg: 75, status: 'future' },
  { id: 6, setNum: 4, name: 'Bench Press', reps: 12, kg: 75, status: 'future' },
  { id: 7, setNum: 4, name: 'Bench Press', reps: 12, kg: 75, status: 'future' },
  { id: 8, name: 'Abdominal', duration: '5s', status: 'transition' },
  { id: 9, name: 'Take The Straps', duration: '15s', status: 'transition' },
]

export default function TrainingStructure({ items = DEFAULT_ITEMS }) {
  return (
    <div className="relative w-[370px] h-[882px]">

      {/* Panel */}
      <div className="bg-white border-2 border-[#dddfe9] rounded-[16px] p-[26px] flex flex-col gap-[16px] h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-[10px] shrink-0">
          <SquaresFour size={28} weight="bold" color="black" />
          <p className="font-poppins font-bold text-[24px] leading-[34px] text-black">Training structure</p>
        </div>

        {/* Scrollable list */}
        <div className="flex flex-col gap-[10px] overflow-y-auto flex-1 pr-1">
          {items.map((item) => {
            if (item.status === 'transition') {
              return (
                <div key={item.id} className="bg-[#f0f0f0] rounded-[10px] px-[14px] py-[14px] flex items-center justify-between shrink-0">
                  <p className="font-poppins font-semibold text-[18px] leading-[28px] text-black">{item.name}</p>
                  <p className="font-poppins font-normal text-[16px] leading-[24px] text-black">{item.duration}</p>
                </div>
              )
            }

            const isPast = item.status === 'past'
            const isActive = item.status === 'active'

            const containerClass = isPast
              ? 'bg-[#f0f0f0]'
              : isActive
              ? 'bg-[#43a77c]'
              : 'bg-white border border-[#e5e7eb]'

            const badgeClass = isPast
              ? 'bg-[#b0b4bf] text-white'
              : isActive
              ? 'bg-white/25 text-white'
              : 'bg-[#201f87] text-white'

            const nameClass = isPast ? 'text-[#9ca3af]' : isActive ? 'text-white' : 'text-black'
            const statsClass = isPast ? 'text-[#9ca3af]' : isActive ? 'text-white/80' : 'text-[#6b7280]'
            const iconColor = isPast ? '#9ca3af' : isActive ? 'rgba(255,255,255,0.8)' : '#6b7280'

            return (
              <div
                key={item.id}
                className={`${containerClass} rounded-[10px] px-[14px] py-[12px] flex flex-col gap-[6px] shrink-0`}
              >
                <div className="flex items-center gap-[8px]">
                  <span className={`${badgeClass} font-poppins font-semibold text-[12px] px-[8px] py-[2px] rounded-full whitespace-nowrap`}>
                    Set {item.setNum}
                  </span>
                  <p className={`font-poppins font-semibold text-[18px] leading-[28px] ${nameClass}`}>{item.name}</p>
                </div>
                <div className={`flex items-center gap-[20px] ${statsClass} font-poppins text-[15px]`}>
                  <div className="flex items-center gap-[5px]">
                    <ArrowsCounterClockwise size={14} color={iconColor} />
                    <span>Reps: <strong>{item.reps}</strong></span>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <Barbell size={14} color={iconColor} />
                    <span>Weight: <strong>{item.kg} kg</strong></span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
