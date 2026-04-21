import { SquaresFour } from '@phosphor-icons/react'
import { SHIELD_STRUCTURE } from '../data/workout'

const DEFAULT_ITEMS = SHIELD_STRUCTURE

export default function TrainingStructure({ items = DEFAULT_ITEMS, color = '#3A86FF', dark = false, width = 370 }) {
  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)

  const grad = `linear-gradient(192.26deg, rgba(${r},${g},${b},0.6) 0%, rgba(${r},${g},${b},0.3) 99.98%)`
  const headerColor = 'white'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 0px',
        width,
        height: 888,
        background: grad,
        borderRadius: '36px 18px 36px 36px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Content */}
      <div className="flex flex-col gap-[16px] h-full w-full overflow-hidden" style={{ padding: '0 16px' }}>
        {/* Header */}
        <div className="flex items-center gap-[8px] shrink-0">
          <SquaresFour size={34} weight="bold" color={headerColor} />
          <p className="font-poppins font-bold text-[24px] leading-[34px] whitespace-nowrap" style={{ color: headerColor }}>
            Training structure
          </p>
        </div>

        {/* List */}
        <div className="flex flex-col gap-[8px] overflow-y-auto flex-1 min-h-0 pr-[2px]">
          {items.map((item) => {
            if (item.status === 'transition') {
              return (
                <div
                  key={item.id}
                  className="rounded-[10px] p-[12px] flex items-center justify-between shrink-0"
                  style={{ background: `rgba(${r},${g},${b},0.20)` }}
                >
                  <p className="font-poppins font-semibold text-[18px] leading-[28px]" style={{ color: headerColor }}>{item.name}</p>
                  <p className="font-poppins text-[16px] leading-[24px]" style={{ color: headerColor }}>{item.duration}</p>
                </div>
              )
            }

            const isPast   = item.status === 'past'
            const isActive = item.status === 'active'

            const bg         = isActive ? color : 'white'
            const badgeBg    = isPast ? '#6b7280' : isActive ? 'white' : color
            const badgeText  = isActive ? color : 'white'
            const nameColor  = isPast ? '#6b7280' : isActive ? 'white' : 'black'
            const statsColor = isPast ? '#6b7280' : isActive ? 'white' : 'black'

            return (
              <div
                key={item.id}
                className="rounded-[10px] p-[12px] flex flex-col justify-between shrink-0"
                style={{
                  height: 83,
                  background: bg,
                  border: isPast || isActive ? 'none' : '1px solid #e5e7eb',
                }}
              >
                <div className="flex items-center gap-[10px]">
                  <div
                    className="flex items-center justify-center rounded-[6px] px-[10px]"
                    style={{ height: 26, background: badgeBg, minWidth: 50 }}
                  >
                    <span
                      className="font-poppins font-bold text-[12px] leading-[16px] whitespace-nowrap"
                      style={{ color: badgeText }}
                    >
                      Set {item.setNum}
                    </span>
                  </div>
                  <p
                    className="font-poppins font-semibold text-[18px] leading-[28px] whitespace-nowrap"
                    style={{ color: nameColor }}
                  >
                    {item.name}
                  </p>
                </div>
                <div className="flex gap-[24px]">
                  <div className="flex gap-[8px]" style={{ color: statsColor }}>
                    <span className="font-poppins text-[16px] leading-[24px]">Reps:</span>
                    <span className="font-poppins font-bold text-[16px] leading-[24px]">{item.reps}</span>
                  </div>
                  <div className="flex gap-[8px]" style={{ color: statsColor }}>
                    <span className="font-poppins text-[16px] leading-[24px]">Weight:</span>
                    <span className="font-poppins font-bold text-[16px] leading-[24px]">{item.kg} kg</span>
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
