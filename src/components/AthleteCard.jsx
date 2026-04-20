import { ArrowsCounterClockwise, Barbell, Heart } from '@phosphor-icons/react'
import { ZONES } from '../data/zones'
import { bpmToZoneIdx } from '../data/workout'

export default function AthleteCard({ name, bpm, reps, kg, connected }) {
  const zoneIdx = bpmToZoneIdx(bpm)
  const zone = ZONES[zoneIdx]
  const color = zone.color
  const bg = `linear-gradient(to bottom, ${color}40, ${color})`
  return (
    <div className="rounded-2xl p-4 flex flex-col justify-between h-full min-h-[200px]" style={{ background: bg }}>
      {/* Header: [Name+BT] left · [Zone pill] center · [Heart+BPM] right */}
      <div className="flex items-center">
        <div className="flex-1 flex items-center gap-1 min-w-0">
          <img
            src={connected ? '/icons/bluetooth-active.svg' : '/icons/bluetooth-inactive.svg'}
            alt="bluetooth"
            className="w-[34px] h-[34px] shrink-0"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span className="font-poppins font-bold text-2xl leading-[34px] text-white whitespace-nowrap">
            {name}
          </span>
        </div>

        <div
          className="shrink-0 rounded-md font-poppins font-bold"
          style={{ background: 'rgba(0,0,0,0.35)', color: '#fff', letterSpacing: '0.08em', padding: '3px 11px', fontSize: 14, lineHeight: '20px' }}
        >
          ZONE {zone.id}
        </div>

        <div className="flex-1 flex items-center justify-end gap-1">
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
