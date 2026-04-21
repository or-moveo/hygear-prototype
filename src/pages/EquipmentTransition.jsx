import { useState, useEffect } from 'react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import CountdownRing from '../components/CountdownRing'
import { ZONES } from '../data/zones'
import { Barbell, Thermometer } from '@phosphor-icons/react'

const REST_SECONDS = 30
const ZONE = ZONES[3] // Zone 4 — PRIME (#FF6B00)

const GEAR = {
  deviceName: 'Device name',
  deviceLabel: 'Bands+',
  image: 'https://www.figma.com/api/mcp/asset/0dfe2e16-86bd-4710-ba7b-c1f333f1687c',
}

const BLOCK = {
  number: 4,
  name: 'Dynamic Strength',
  duration: '5 Minutes',
}

const ORANGE      = ZONE.color
const ORANGE_GRAD = `linear-gradient(192.26deg, color-mix(in srgb, ${ORANGE} 60%, transparent) 0%, color-mix(in srgb, ${ORANGE} 30%, transparent) 99.98%)`

export default function EquipmentTransition() {
  const [timer, setTimer] = useState(REST_SECONDS)

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer])

  return (
    <ScaledFrame>
      <StageBackground variant="light" glowColor={ORANGE}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>

        {/* Countdown ring */}
        <div
          className="absolute flex items-center justify-center"
          style={{ left: 50, top: 142, width: 450, height: 450, background: ORANGE_GRAD, borderRadius: '36px 18px 36px 36px' }}
        >
          <CountdownRing
            size={280}
            value={timer}
            max={REST_SECONDS}
            label="REST"
            color={ORANGE}
            textColor="white"
            trackColor="white"
          />
        </div>

        {/* Zone card */}
        <div
          className="absolute flex flex-col items-start"
          style={{
            left: 50, top: 628,
            width: 450, height: 402,
            padding: 36,
            boxSizing: 'border-box',
            gap: 36,
            borderBottom: `8px solid ${ORANGE}`,
            borderRadius: '36px 18px 36px 36px',
            background: ORANGE_GRAD,
          }}
        >
          {/* Info section */}
          <div className="flex flex-col w-full" style={{ gap: 36, flex: 1 }}>
            {/* Header row: ZONE label */}
            <div style={{ borderBottom: `1px solid ${ORANGE}`, padding: '8px 0' }}>
              <span className="font-poppins font-semibold text-[28px] leading-[38px]" style={{ color: ORANGE }}>
                ZONE {ZONE.id}
              </span>
            </div>
            {/* Zone name */}
            <span className="font-poppins font-semibold text-[36px] leading-[46px] text-black">
              {ZONE.label}
            </span>
            {/* Zone description */}
            <span className="font-poppins font-medium text-[28px] leading-[38px] text-black">
              {ZONE.desc}
            </span>
          </div>

          {/* Glow button */}
          <div style={{ position: 'relative', borderRadius: 10, width: '100%', flexShrink: 0 }}>
            <div style={{
              position: 'absolute', inset: -10,
              background: ORANGE,
              mixBlendMode: 'screen',
              opacity: 0.2,
              filter: 'blur(10px)',
              borderRadius: 10,
              pointerEvents: 'none',
            }} />
            <div className="flex items-center justify-center" style={{
              height: 54,
              padding: '10px 20px',
              background: '#000',
              borderRadius: 8,
              boxShadow: '0px 1px 0px rgba(0,0,0,.05), 0px 4px 4px rgba(0,0,0,.05), 0px 10px 10px rgba(0,0,0,.1)',
              position: 'relative', zIndex: 1,
            }}>
              <span className="font-poppins font-bold text-[24px] leading-[34px]" style={{ color: ORANGE }}>
                ZONE {ZONE.id}
              </span>
            </div>
          </div>
        </div>

        {/* Next Gear To Use panel */}
        <div
          className="absolute flex flex-col items-start"
          style={{
            left: 536, top: 142,
            width: 1334, height: 888,
            padding: 36,
            gap: 36,
            boxSizing: 'border-box',
            borderRadius: '36px 18px 36px 36px',
            background: ORANGE_GRAD,
          }}
        >
          {/* Title */}
          <div className="flex items-center justify-center shrink-0" style={{ gap: 16, height: 66 }}>
            <Barbell size={46} color="#fff" weight="bold" />
            <span className="font-poppins font-semibold text-[56px] leading-[66px] text-white whitespace-nowrap">
              Next Gear To Use
            </span>
          </div>

          {/* Main content — instructions + image */}
          <div className="flex flex-col w-full min-h-0" style={{ flex: 1, gap: 16 }}>

            {/* Instructions card */}
            <div
              className="flex flex-col items-start justify-center shrink-0 w-full"
              style={{
                height: 164,
                padding: 36,
                gap: 8,
                background: ORANGE,
                borderRadius: 24,
                boxSizing: 'border-box',
              }}
            >
              <span className="font-poppins font-light text-[28px] leading-[38px] text-white">
                Getting started
              </span>
              <span className="font-poppins font-medium text-[36px] leading-[46px] text-white">
                Make sure the device is turned on.
              </span>
            </div>

            {/* Gear image card */}
            <div
              className="flex items-center justify-center overflow-hidden relative"
              style={{ flex: 1, borderRadius: 24, background: 'white' }}
            >
              <img
                src={GEAR.image}
                alt={GEAR.deviceLabel}
                style={{ width: 260, height: 440, objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>

      </div>
      </StageBackground>
    </ScaledFrame>
  )
}
