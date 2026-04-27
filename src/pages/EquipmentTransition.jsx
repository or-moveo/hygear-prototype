import { useState, useEffect } from 'react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import CountdownRing from '../components/CountdownRing'
import { ZONES } from '../data/zones'
import { Barbell, Thermometer } from '@phosphor-icons/react'

const REST_SECONDS = 30

const GEAR = {
  deviceName: 'Device name',
  deviceLabel: 'Bands+',
  // Local asset — the previous Figma MCP URL was an ephemeral developer-only link that
  // expired, leaving the device image blank in both Studio and Trainee.
  image: '/assets/rope.png',
}

const BLOCK = {
  number: 4,
  name: 'Dynamic Strength',
  duration: '5 Minutes',
}

export default function EquipmentTransition({ zoneIdx = 3 }) {
  const ZONE = ZONES[zoneIdx] ?? ZONES[3]
  const ORANGE = ZONE.color
  const ORANGE_GRAD = `linear-gradient(192.26deg, color-mix(in srgb, ${ORANGE} 60%, transparent) 0%, color-mix(in srgb, ${ORANGE} 30%, transparent) 99.98%)`

  const [timer, setTimer] = useState(REST_SECONDS)

  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => setTimer(t => Math.max(0, t - 1)), 1000)
    return () => clearInterval(id)
  }, [timer])

  return (
    <ScaledFrame>
      <StageBackground variant="light" glowColor={ORANGE}>
      <style>{`
        @keyframes bp-float { 0%,100% { transform:translateY(0) scale(1); } 50% { transform:translateY(-14px) scale(1.05); } }
        @keyframes bp-focusRing {
          0%,100% {
            box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 80%, transparent),
                        0 0 24px color-mix(in srgb, var(--c) 45%, transparent);
          }
          50% {
            box-shadow: 0 0 0 6px color-mix(in srgb, var(--c) 100%, transparent),
                        0 0 60px color-mix(in srgb, var(--c) 75%, transparent);
          }
        }
      `}</style>
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

        {/* Prep next device panel */}
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
          {/* Pulsing focus ring — same outline pulse as the other "Prep next device" cards
              across the app (e.g. BlockPreview / TraineeBlockPreview). Uses bp-focusRing. */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit',
            pointerEvents: 'none', zIndex: 10,
            '--c': ORANGE,
            animation: 'bp-focusRing 2s ease-in-out infinite',
          }} />

          {/* Title */}
          <div className="flex items-center justify-center shrink-0" style={{ gap: 16, height: 66 }}>
            <Barbell size={46} color="#fff" weight="bold" />
            <span className="font-poppins font-semibold text-[56px] leading-[66px] text-white whitespace-nowrap">
              Prep next device
            </span>
          </div>

          {/* Main content — instructions + image */}
          <div
            className="flex flex-col items-center w-full"
            style={{ flex: 1, gap: 16, justifyContent: 'flex-end' }}
          >

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
              className="flex items-center justify-center overflow-hidden relative w-full"
              style={{ height: 534, borderRadius: 24, background: 'white' }}
            >
              <img
                src={GEAR.image}
                alt={GEAR.deviceLabel}
                style={{ width: 338, height: 572, objectFit: 'contain', animation: 'bp-float 3.2s ease-in-out infinite' }}
              />
            </div>
          </div>
        </div>

      </div>
      </StageBackground>
    </ScaledFrame>
  )
}
