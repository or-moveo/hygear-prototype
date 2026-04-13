import ScaledFrame from '../components/ScaledFrame'
import StudioHeader from '../components/StudioHeader'
import TrainingStructure from '../components/TrainingStructure'
import { studioData } from '../data/studio'
import { ArrowsCounterClockwise, Barbell } from '@phosphor-icons/react'

const GROUP_REPS = { current: 0, total: 1800 }

const MEDALS = ['🥇', '🥈', '🥉']
const CARD_COLORS = [
  { bg: '#162e20' },
  { bg: '#1e4a30' },
  { bg: '#2d6644' },
]

export default function WarmupTopContributors() {
  const top3 = [...studioData.athletes]
    .sort((a, b) => b.reps - a.reps)
    .slice(0, 3)

  return (
    <ScaledFrame>
      <div className="bg-white relative size-full">
        <StudioHeader />

        <div className="absolute right-[51px] top-[142px]">
          <TrainingStructure />
        </div>

        <div className="absolute flex flex-col gap-[28px] left-[51px] top-[142px] w-[1425px] h-[882px]">

          {/* Group Target */}
          <div
            className="flex items-center justify-between px-[48px] py-[40px] rounded-[20px] shrink-0"
            style={{ background: '#f0f5f2', border: '1px solid rgba(67,167,124,0.2)' }}
          >
            <p className="font-poppins font-semibold text-[20px] text-black/40 uppercase tracking-widest">
              Group Target
            </p>
            <div className="flex items-baseline gap-[12px]">
              <span className="font-poppins font-bold text-[64px] leading-none text-black">
                {GROUP_REPS.current} / {GROUP_REPS.total}
              </span>
              <span className="font-poppins text-[20px] text-black/40 uppercase tracking-widest">Reps</span>
            </div>
          </div>

          {/* Top Contributors */}
          <div className="flex flex-col gap-[20px] flex-1 min-h-0">
            <p className="font-poppins font-bold text-[28px] text-black shrink-0">Top Contributors</p>

            <div className="flex gap-[28px] flex-1 min-h-0">
              {top3.map((athlete, i) => (
                <div
                  key={athlete.id}
                  className="flex-1 flex flex-col justify-between p-[44px] rounded-[24px]"
                  style={{ background: CARD_COLORS[i].bg }}
                >
                  {/* Top: rank + name + medal */}
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-[6px]">
                      <p
                        className="font-poppins font-bold leading-none"
                        style={{ fontSize: 96, color: 'rgba(255,255,255,0.9)' }}
                      >
                        #{i + 1}
                      </p>
                      <p
                        className="font-poppins font-semibold"
                        style={{ fontSize: 40, color: 'rgba(255,255,255,0.85)' }}
                      >
                        {athlete.name}
                      </p>
                    </div>
                    <span style={{ fontSize: 72, lineHeight: 1 }}>{MEDALS[i]}</span>
                  </div>

                  {/* Bottom: stats */}
                  <div className="flex gap-[16px]">
                    <div
                      className="flex-1 flex flex-col items-center gap-[10px] py-[28px] rounded-[16px]"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      <div className="flex items-center gap-[6px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <ArrowsCounterClockwise size={16} />
                        <span className="font-poppins text-[15px] uppercase tracking-widest">REPS</span>
                      </div>
                      <span className="font-poppins font-bold text-white" style={{ fontSize: 56, lineHeight: 1 }}>
                        {athlete.reps}
                      </span>
                    </div>
                    <div
                      className="flex-1 flex flex-col items-center gap-[10px] py-[28px] rounded-[16px]"
                      style={{
                        background: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      <div className="flex items-center gap-[6px]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        <Barbell size={16} />
                        <span className="font-poppins text-[15px] uppercase tracking-widest">KG</span>
                      </div>
                      <span className="font-poppins font-bold text-white" style={{ fontSize: 56, lineHeight: 1 }}>
                        {athlete.kg}
                      </span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </ScaledFrame>
  )
}
