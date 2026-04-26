import { Flame, Stack, Barbell, Lightning, Snowflake, ArrowsCounterClockwise } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'

const imgLogo = "/icons/hygear-logo.png"
const imgGear = "/assets/gear-render.png"
const imgSpiderX = "/assets/spider-x.png"
const imgRope = "/assets/rope.png"
const imgHybar = "/assets/hybar.png"
const imgEquipmentIcon = "/assets/equipment-icon.svg"

const BLOCKS = [
  {
    num: 1,
    name: 'Joint Warm-Up',
    minutes: 5,
    zone: 1,
    zoneLabel: 'ZONE 1',
    accent: '#3A86FF',
    bg: 'linear-gradient(180deg, #1E3D7A 0%, #0D1F4A 100%)',
    iconBg: '#3A86FF',
    Icon: Flame,
  },
  {
    num: 2,
    name: 'Demo & Prep',
    minutes: 5,
    zone: 2,
    zoneLabel: 'ZONE 2',
    accent: '#23B870',
    bg: 'linear-gradient(180deg, #1A5530 0%, #0D3018 100%)',
    iconBg: '#23B870',
    Icon: Stack,
  },
  {
    num: 3,
    name: 'Main Block',
    minutes: 26,
    zone: 3,
    zoneLabel: 'ZONE 2',
    accent: '#FFD000',
    bg: 'linear-gradient(180deg, #6B5200 0%, #3D2E00 100%)',
    iconBg: '#FFD000',
    Icon: Barbell,
  },
  {
    num: 4,
    name: 'Iron Wall',
    minutes: 7,
    zone: 4,
    zoneLabel: 'ZONE 4',
    accent: '#FF6B00',
    bg: 'linear-gradient(180deg, #7A2E00 0%, #4A1A00 100%)',
    iconBg: '#FF6B00',
    Icon: Barbell,
  },
  {
    num: 5,
    name: 'Core Finisher',
    minutes: 3,
    zone: 5,
    zoneLabel: 'ZONE 5',
    accent: '#F5365C',
    bg: 'linear-gradient(180deg, #7A0F2A 0%, #4A0818 100%)',
    iconBg: '#F5365C',
    Icon: Lightning,
  },
  {
    num: 6,
    name: 'Deep Release',
    minutes: 4,
    zone: 1,
    zoneLabel: 'ZONE 1',
    accent: '#3A86FF',
    bg: 'linear-gradient(180deg, #1E3D7A 0%, #0D1F4A 100%)',
    iconBg: '#3A86FF',
    Icon: Snowflake,
  },
]

const EQUIPMENT = [
  { src: imgGear, name: 'HyGear' },
  { src: imgSpiderX, name: 'Spider X' },
  { src: imgRope, name: 'Jump Rope' },
  { src: imgHybar, name: 'HyBar', rotate: true },
]

export default function HighLevelTraining() {
  return (
    <ScaledFrame>
      <div style={{
        width: 1920,
        height: 1080,
        background: '#000000',
        fontFamily: 'Poppins, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '20px 48px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          <img src={imgLogo} alt="logo" style={{ height: 40, objectFit: 'contain' }} />
          <span style={{ color: '#fff', fontSize: 32, fontWeight: 600 }}>Studio name</span>
        </div>

        {/* Main content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          padding: '24px 48px 32px',
        }}>

          {/* Top row */}
          <div style={{ display: 'flex', gap: 24, height: 220 }}>

            {/* Workout info card */}
            <div style={{
              flex: '0 0 820px',
              background: 'linear-gradient(135deg, #1a2a4a 0%, #0d1830 100%)',
              border: '1.5px solid rgba(58,134,255,0.35)',
              borderRadius: 20,
              padding: '28px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <span style={{ color: '#fff', fontSize: 52, fontWeight: 800, lineHeight: 1.1 }}>Prime SHIELD</span>
                <div style={{
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: 999,
                  padding: '8px 22px',
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}>50 Minutes</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ color: '#3A86FF', fontSize: 24 }}>🎯</span>
                  <div>
                    <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Training Goal: </span>
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 20 }}>can you keep your heart rate high?</span>
                    <br />
                    <span style={{ color: 'rgba(255,255,255,0.60)', fontSize: 18 }}>Every minute you are in Zone 4-5 adds a point to the group score.</span>
                  </div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: 999,
                  padding: '10px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  marginLeft: 16,
                }}>
                  <ArrowsCounterClockwise size={26} color="#fff" weight="bold" />
                  <span style={{ color: '#fff', fontSize: 22, fontWeight: 600 }}>300 team points</span>
                </div>
              </div>
            </div>

            {/* Equipment card */}
            <div style={{
              flex: 1,
              background: 'linear-gradient(135deg, #1a2a4a 0%, #0d1830 100%)',
              border: '1.5px solid rgba(255,255,255,0.1)',
              borderRadius: 20,
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={imgEquipmentIcon} alt="" style={{ width: 28, height: 28, filter: 'brightness(10)' }} />
                <span style={{ color: '#fff', fontSize: 26, fontWeight: 700 }}>Equipment</span>
              </div>
              <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                {EQUIPMENT.map(item => (
                  <div key={item.name} style={{
                    flex: 1,
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                  }}>
                    <img
                      src={item.src}
                      alt={item.name}
                      style={{
                        maxWidth: '90%',
                        maxHeight: 80,
                        objectFit: 'contain',
                        transform: item.rotate ? 'rotate(-90deg)' : undefined,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Block cards row */}
          <div style={{ display: 'flex', gap: 18, flex: 1 }}>
            {BLOCKS.map(block => (
              <div key={block.num} style={{
                flex: 1,
                background: block.bg,
                borderRadius: 20,
                padding: '24px 20px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Block label */}
                <div style={{ marginBottom: 10 }}>
                  <span style={{
                    color: block.accent,
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    BLOCK {block.num}
                  </span>
                  <div style={{
                    height: 2,
                    background: block.accent,
                    borderRadius: 2,
                    marginTop: 6,
                    opacity: 0.7,
                  }} />
                </div>

                {/* Icon */}
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: 16,
                  background: block.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 20,
                  marginTop: 8,
                  opacity: block.zone === 3 ? 1 : 1,
                }}>
                  <block.Icon
                    size={38}
                    weight="fill"
                    color={block.zone === 3 ? '#3D2E00' : '#fff'}
                  />
                </div>

                {/* Name */}
                <span style={{
                  color: '#fff',
                  fontSize: 32,
                  fontWeight: 800,
                  lineHeight: 1.15,
                  flex: 1,
                }}>
                  {block.name}
                </span>

                {/* Duration */}
                <span style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: 20,
                  fontWeight: 400,
                  marginTop: 8,
                  marginBottom: 16,
                }}>
                  {block.minutes} Minutes
                </span>

                {/* Zone badge */}
                <div style={{
                  background: 'rgba(0,0,0,0.45)',
                  borderRadius: 10,
                  padding: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span style={{
                    color: block.accent,
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>
                    {block.zoneLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </ScaledFrame>
  )
}
