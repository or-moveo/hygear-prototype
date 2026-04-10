import { ArrowsCounterClockwise, Barbell } from '@phosphor-icons/react'

export default function AthleteCard({ name, bpm, reps, kg, connected }) {
  return (
    <div className="bg-[#edf3ef] rounded-2xl p-4 flex flex-col justify-between h-full min-h-[200px]">
      {/* Header: name + BPM */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <img
            src={connected ? '/icons/bluetooth-active.svg' : '/icons/bluetooth-inactive.svg'}
            alt="bluetooth"
            className="w-[34px] h-[34px]"
          />
          <span className="font-poppins font-bold text-2xl leading-[34px] text-black whitespace-nowrap">
            {name}
          </span>
        </div>

        <div className="relative w-0 h-[30px] mx-1">
          <img src="/icons/divider.svg" alt="" className="absolute inset-[-1px] h-full" />
        </div>

        <div className="flex items-center gap-1">
          <img src="/icons/heart.svg" alt="heart rate" className="w-[34px] h-[34px]" />
          <span className="font-poppins font-semibold text-2xl leading-[34px] text-[#43a77c] whitespace-nowrap">
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
