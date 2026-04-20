import { ArrowsCounterClockwise, Barbell, Heart } from '@phosphor-icons/react'

const CARD_COLORS = ['#F8C74D', '#43A77C', '#F5365C']

export default function AthleteCard({ name, bpm, reps, kg, connected, colorIndex = 0 }) {
  const color = CARD_COLORS[colorIndex % CARD_COLORS.length]
  const bg = `linear-gradient(to bottom, ${color}40, ${color})`
  return (
    <div className="rounded-2xl p-4 flex flex-col justify-between h-full min-h-[200px]" style={{ background: bg }}>
      {/* Header: name left, BPM right */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <img
            src={connected ? '/icons/bluetooth-active.svg' : '/icons/bluetooth-inactive.svg'}
            alt="bluetooth"
            className="w-[34px] h-[34px]"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span className="font-poppins font-bold text-2xl leading-[34px] text-white whitespace-nowrap">
            {name}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Heart size={34} weight="fill" color="#FF0000" className="animate-heartbeat" />
          <span className="font-poppins font-semibold text-2xl leading-[34px] text-white whitespace-nowrap">
            {bpm}
          </span>
        </div>
      </div>

      {/* Stats: REPS + KG */}
      <div className="flex gap-4 mt-3">
        <div className="bg-white flex-1 rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center gap-1 py-4">
          <div className="flex items-center gap-[4px] text-black/60">
            <ArrowsCounterClockwise size={15} />
            <span className="font-poppins font-normal text-base leading-6 text-black">REPS</span>
          </div>
          <span className="font-poppins font-semibold text-4xl leading-[46px] text-black">{reps}</span>
        </div>
        <div className="bg-white flex-1 rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center gap-1 py-4">
          <div className="flex items-center gap-[4px] text-black/60">
            <Barbell size={15} />
            <span className="font-poppins font-normal text-base leading-6 text-black">KG</span>
          </div>
          <span className="font-poppins font-semibold text-4xl leading-[46px] text-black">{kg}</span>
        </div>
      </div>
    </div>
  )
}
