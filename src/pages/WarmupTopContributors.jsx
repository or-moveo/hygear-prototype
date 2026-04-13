import ScaledFrame from '../components/ScaledFrame'
import StudioHeader from '../components/StudioHeader'
import TrainingStructure from '../components/TrainingStructure'
import { studioData } from '../data/studio'
import { ArrowsClockwise } from '@phosphor-icons/react'
import { ZONES } from '../data/zones'

const GROUP_REPS = { current: 540, total: 1800 }
const PERSON_IMG = 'https://www.figma.com/api/mcp/asset/df59c616-53a1-4c84-95be-349ad609678e'
const MEDALS = ['🥇', '🥈', '🥉']

export default function WarmupTopContributors({ zoneIdx }) {
  const zone = ZONES[zoneIdx ?? 0]
  const COLOR = zone.color
  const r = parseInt(COLOR.slice(1,3),16), g = parseInt(COLOR.slice(3,5),16), b = parseInt(COLOR.slice(5,7),16)

  const PODIUM_LAYOUT = [
    { rank: 1, left: 553, top: 474, width: 407, gradFrom: `rgba(${r},${g},${b},0.5)`,  gradTo: COLOR },
    { rank: 2, left: 79,  top: 573, width: 407, gradFrom: `rgba(${r},${g},${b},0.35)`, gradTo: `rgba(${r},${g},${b},0.70)` },
    { rank: 3, left: 1028,top: 674, width: 407, gradFrom: `rgba(${r},${g},${b},0.2)`,  gradTo: `rgba(${r},${g},${b},0.40)` },
  ]

  const top3 = [...studioData.athletes]
    .sort((a, b) => b.reps - a.reps)
    .slice(0, 3)

  return (
    <ScaledFrame>
      <div className="bg-white relative size-full">
        <StudioHeader />

        {/* Training Structure — right */}
        <div className="absolute" style={{ left: 1500, top: 142 }}>
          <TrainingStructure color={COLOR} />
        </div>

        {/* Group Target panel */}
        <div
          className="absolute rounded-[24px] overflow-visible"
          style={{
            left: 50, top: 142, width: 1414, height: 295,
            background: `linear-gradient(183deg, rgba(${r},${g},${b},0.30) 0%, rgba(${r},${g},${b},0.05) 100%)`,
          }}
        >
          {/* Text content */}
          <div className="flex flex-col gap-[20px] h-full justify-center" style={{ padding: 36, paddingRight: 310 }}>
            <p className="font-poppins text-[28px] leading-[38px] text-black">GROUP TARGET</p>
            <div className="flex items-center gap-[24px]">
              <ArrowsClockwise size={66} color="black" weight="bold" />
              <span className="font-poppins font-semibold text-black" style={{ fontSize: 66, lineHeight: '66px' }}>
                Reps {GROUP_REPS.current}/{GROUP_REPS.total}
              </span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: 16, background: 'white' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.round((GROUP_REPS.current / GROUP_REPS.total) * 100)}%`,
                  background: COLOR,
                }}
              />
            </div>
          </div>

          {/* Person image — full body, matched to card height */}
          <div className="absolute" style={{ right: 0, top: 0, bottom: 0, width: 295, overflow: 'hidden', borderRadius: '0 24px 24px 0' }}>
            <img
              src={PERSON_IMG}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </div>

        {/* Podium cards */}
        {PODIUM_LAYOUT.map((pos, i) => {
          const athlete = top3[i]
          if (!athlete) return null
          return (
            <div
              key={pos.rank}
              className="absolute flex flex-col overflow-visible"
              style={{
                left: pos.left,
                top: pos.top,
                width: pos.width,
                bottom: 0,
                padding: 26,
                borderRadius: '26px 26px 0 0',
                background: `linear-gradient(to bottom, ${pos.gradFrom}, ${pos.gradTo})`,
              }}
            >
              {/* Medal — top center, overlapping card edge */}
              <div className="absolute flex justify-center" style={{ top: -44, left: 0, right: 0 }}>
                <span style={{ fontSize: 72, lineHeight: 1 }}>{MEDALS[i]}</span>
              </div>

              {/* Rank + name */}
              <div className="flex flex-col gap-[3px]">
                <p className="font-poppins font-semibold text-white" style={{ fontSize: 36, lineHeight: '46px' }}>
                  #{pos.rank}
                </p>
                <p className="font-poppins font-semibold text-white" style={{ fontSize: 56, lineHeight: '66px' }}>
                  {athlete.name}
                </p>
              </div>

              {/* Stats — directly below name */}
              <div className="flex gap-[12px]" style={{ marginTop: 20 }}>
                {[['REPS', athlete.reps], ['KG', athlete.kg]].map(([label, val]) => (
                  <div
                    key={label}
                    className="flex-1 flex flex-col items-center justify-center gap-[3px] bg-white rounded-[10px]"
                    style={{ padding: '9px 13px', boxShadow: '0 0 12px rgba(0,0,0,0.06)' }}
                  >
                    <p className="font-poppins font-light text-black text-center" style={{ fontSize: 18, lineHeight: '28px' }}>
                      {label}
                    </p>
                    <p className="font-poppins font-semibold text-black text-center" style={{ fontSize: 36, lineHeight: '46px' }}>
                      {val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

      </div>
    </ScaledFrame>
  )
}
