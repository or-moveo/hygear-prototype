import { useState, useEffect } from 'react'
import ScaledFrame from '../components/ScaledFrame'
import StudioHeader from '../components/StudioHeader'
import CountdownRing from '../components/CountdownRing'
import { ZONES } from '../data/zones'
import { Barbell } from '@phosphor-icons/react'

const REST_SECONDS = 30
const ZONE = ZONES[3] // Zone 4 — PRIME (#FF6B00)

const GEAR = {
  deviceName: 'Device name',
  deviceLabel: 'Bands+',
  image: 'https://www.figma.com/api/mcp/asset/0dfe2e16-86bd-4710-ba7b-c1f333f1687c',
}

const imgBarbell = '/assets/barbell-transition.svg'

const ORANGE      = ZONE.color
const ORANGE_GRAD = `linear-gradient(192deg, rgba(255,107,0,0.30) 0%, rgba(255,107,0,0.05) 100%)`

export default function EquipmentTransition() {
  const [timer, setTimer] = useState(REST_SECONDS)

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer])

  return (
    <ScaledFrame>
      <div className="bg-white relative size-full">
        <StudioHeader />

        {/* Countdown ring */}
        <div
          className="absolute flex items-center justify-center rounded-[36px]"
          style={{ left: 50, top: 142, width: 450, height: 450, background: ORANGE_GRAD }}
        >
          <CountdownRing
            size={280}
            value={timer}
            max={REST_SECONDS}
            label="REST"
            color={ORANGE}
            trackColor="white"
          />
        </div>

        {/* Zone card */}
        <div
          className="absolute flex flex-col gap-[36px] items-start rounded-[36px]"
          style={{
            left: 50, top: 628,
            width: 450, height: 402,
            padding: 36,
            borderBottom: `8px solid ${ORANGE}`,
            background: `${ORANGE_GRAD}, #fff`,
          }}
        >
          <div className="flex flex-col items-start w-full gap-[36px]">
            <div style={{ borderBottom: `1px solid ${ORANGE}`, paddingBottom: 8, width: '100%' }}>
              <span className="font-poppins font-semibold text-[28px] leading-[38px]" style={{ color: ORANGE }}>
                ZONE {ZONE.id}
              </span>
            </div>
            <span className="font-poppins font-semibold text-[36px] leading-[46px] text-black">
              {ZONE.label}
            </span>
            <span className="font-poppins font-light text-[28px] leading-[38px] text-black">
              {ZONE.desc}
            </span>
          </div>
        </div>

        {/* Next Gear To Use panel */}
        <div
          className="absolute flex flex-col gap-[36px] items-start rounded-[36px]"
          style={{
            left: 536, top: 142,
            width: 1334, height: 888,
            padding: 36,
            background: ORANGE_GRAD,
          }}
        >
          {/* Title */}
          <div className="flex gap-[16px] items-center justify-center shrink-0">
            <Barbell size={46} color={ORANGE} weight="bold" />
            <span className="font-poppins font-semibold text-[56px] leading-[66px] text-black whitespace-nowrap">
              Next Gear To Use
            </span>
          </div>

          {/* Device button + gear image */}
          <div className="flex flex-col gap-[16px] flex-1 items-center justify-end min-h-0 w-full">
            <div
              className="flex flex-col gap-[8px] items-start justify-center rounded-[24px] w-full shrink-0"
              style={{ background: ORANGE, padding: 36 }}
            >
              <span className="font-poppins font-normal text-[28px] leading-[38px] text-white">
                {GEAR.deviceName}
              </span>
              <span className="font-poppins font-semibold text-[36px] leading-[46px] text-white">
                {GEAR.deviceLabel}
              </span>
            </div>

            <div
              className="flex items-center justify-center rounded-[24px] overflow-hidden flex-1 min-h-0 w-full"
              style={{ background: 'white' }}
            >
              <img
                src={GEAR.image}
                alt={GEAR.deviceLabel}
                style={{ maxHeight: 440, maxWidth: '60%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

      </div>
    </ScaledFrame>
  )
}
