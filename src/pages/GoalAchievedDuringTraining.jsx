import { useEffect, useState, useMemo } from 'react'
import { Trophy } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'

// Radii x1.5 — outer panel + inner card share the same scaled values
const RADIUS = '54px 27px 54px 54px'

const VARIANTS = {
  BUILD: {
    label: 'BUILD',
    color: '#A855F7',
    primeFrom: '#c084fc',
    primeTo: '#a855f7',
    rgba6: 'rgba(168,85,247,0.6)',
    rgba3: 'rgba(168,85,247,0.3)',
    rgba9: 'rgba(168,85,247,0.9)',
    headline: 'Group Goal Achieved!',
    subline: '20 tons lifted — the team smashed the BUILD target.',
  },
  BURN: {
    label: 'BURN',
    color: '#EC4899',
    primeFrom: '#f472b6',
    primeTo: '#ec4899',
    rgba6: 'rgba(236,72,153,0.6)',
    rgba3: 'rgba(236,72,153,0.3)',
    rgba9: 'rgba(236,72,153,0.9)',
    headline: 'Group Goal Achieved!',
    subline: '300 team points reached — the BURN target is yours.',
  },
  SHIELD: {
    label: 'SHIELD',
    color: '#06B6D4',
    primeFrom: '#22d3ee',
    primeTo: '#06b6d4',
    rgba6: 'rgba(6,182,212,0.6)',
    rgba3: 'rgba(6,182,212,0.3)',
    rgba9: 'rgba(6,182,212,0.9)',
    headline: 'Group Goal Achieved!',
    subline: '450 group control minutes — the SHIELD target is locked in.',
  },
}

// Cycle: 0–500ms enter | 500–9500ms visible | 9500–10000ms exit
const CYCLE_MS = 10000

export default function GoalAchievedDuringTraining({ variant = 'BUILD' } = {}) {
  const cfg = VARIANTS[variant] ?? VARIANTS.BUILD
  const [tick, setTick] = useState(0)  // increments to restart animation each cycle

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  // Generate sparkle positions once per cycle (slightly different each time for variety)
  const sparkles = useMemo(() => {
    const list = []
    const count = 18
    for (let i = 0; i < count; i++) {
      list.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 6 + Math.random() * 14,
        delay: Math.random() * 1.2,
        duration: 1.6 + Math.random() * 1.8,
      })
    }
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick])

  return (
    <ScaledFrame>
      <StageBackground variant="dark" glowColor={cfg.color}>
        <style>{`
          /* Outer panel: rich, large, multi-stop gradient that flows in 2D — much more visible */
          @keyframes goal-grad-shift {
            0%   { background-position:   0% 50%, 100%  0%, 50% 100%; }
            33%  { background-position:  60% 30%,  20% 90%, 80%  40%; }
            66%  { background-position:  30% 90%,  80% 30%, 10%  60%; }
            100% { background-position:   0% 50%, 100%  0%, 50% 100%; }
          }
          /* Soft pulse that brightens/dims the panel rhythmically */
          @keyframes goal-panel-pulse {
            0%, 100% { filter: brightness(1) saturate(1); }
            50%      { filter: brightness(1.18) saturate(1.25); }
          }
          /* Inner card: bouncy entrance + tiny breathing while visible + scale-out exit */
          @keyframes goal-card-in {
            0%   { transform: scale(0.55) rotate(-3deg); opacity: 0; }
            55%  { transform: scale(1.06) rotate(1.5deg); opacity: 1; }
            75%  { transform: scale(0.98) rotate(-0.5deg); }
            100% { transform: scale(1) rotate(0); opacity: 1; }
          }
          @keyframes goal-card-out {
            0%   { transform: scale(1) rotate(0); opacity: 1; }
            100% { transform: scale(0.85) rotate(2deg); opacity: 0; }
          }
          /* Trophy: spin in, then continuous wobble */
          @keyframes goal-trophy-in {
            0%   { transform: scale(0) rotate(-180deg); }
            60%  { transform: scale(1.2) rotate(15deg); }
            100% { transform: scale(1) rotate(0); }
          }
          @keyframes goal-trophy-wobble {
            0%, 100% { transform: rotate(-6deg); }
            50%      { transform: rotate(6deg); }
          }
          /* Stagger fade-up for text */
          @keyframes goal-text-up {
            0%   { transform: translateY(24px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          /* Sparkles burst */
          @keyframes goal-sparkle {
            0%   { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            20%  { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(0.4); opacity: 0; }
          }
          /* Subtle breathing once entered */
          @keyframes goal-breathe {
            0%, 100% { transform: scale(1); }
            50%      { transform: scale(1.012); }
          }
          /* Pulsating outline ring — uses CSS variable so each variant gets its own color */
          @keyframes goal-ring-pulse {
            0%, 100% {
              box-shadow:
                0 0 0 0 var(--ring-strong),
                0 0 0 0 var(--ring-soft),
                0 0 60px var(--ring-soft),
                0 0 160px var(--ring-faint);
              border-color: var(--ring-strong);
            }
            50% {
              box-shadow:
                0 0 0 6px var(--ring-soft),
                0 0 0 14px var(--ring-faint),
                0 0 100px var(--ring-strong),
                0 0 240px var(--ring-soft);
              border-color: var(--ring-glow);
            }
          }
        `}</style>

        {/* Outer animated-gradient glass panel */}
        <div
          key={tick}
          style={{
            position: 'absolute',
            width: 1820,
            height: 888,
            left: 50,
            top: 142,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 8,
            gap: 36,
            // Three layered radial gradients shifting independently → rich, organic motion
            background: `
              radial-gradient(ellipse 60% 80% at 30% 30%, ${cfg.rgba9} 0%, transparent 55%),
              radial-gradient(ellipse 70% 60% at 80% 70%, ${cfg.rgba6} 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 50% 50%, ${cfg.rgba3} 0%, transparent 70%),
              linear-gradient(135deg, ${cfg.rgba9} 0%, ${cfg.rgba3} 100%)
            `,
            backgroundSize: '180% 180%, 200% 200%, 160% 160%, 100% 100%',
            animation: `
              goal-grad-shift 6s ease-in-out infinite,
              goal-panel-pulse 4s ease-in-out infinite
            `,
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
            borderRadius: RADIUS,
            boxSizing: 'border-box',
            fontFamily: 'Poppins, sans-serif',
            overflow: 'hidden',
          }}
        >
          {/* Decorative sparkles */}
          {sparkles.map(s => (
            <div
              key={s.id}
              style={{
                position: 'absolute',
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                background: '#fff',
                borderRadius: '50%',
                boxShadow: `0 0 ${s.size * 2}px ${cfg.color}`,
                animation: `goal-sparkle ${s.duration}s ease-out ${s.delay}s infinite`,
                pointerEvents: 'none',
                opacity: 0,
              }}
            />
          ))}

          {/* Inner black card — entrance + steady-state breathing + exit + pulsating outline */}
          <div
            style={{
              minWidth: 1158,
              maxWidth: 1700,
              minHeight: 436,
              background: '#000000',
              borderRadius: RADIUS,
              padding: 66,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 36,
              position: 'relative',
              zIndex: 2,
              // Pulsing outline — uses CSS vars so the keyframe can animate variant-aware colors
              border: `3px solid ${cfg.color}`,
              '--ring-strong': cfg.color,
              '--ring-glow':   cfg.primeFrom,
              '--ring-soft':   cfg.rgba6,
              '--ring-faint':  cfg.rgba3,
              // Composite animation: enter (0.7s) → breathe + ring pulse loop → exit (0.5s at 9.5s)
              animation: `
                goal-card-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                goal-breathe 4s ease-in-out 0.7s infinite,
                goal-ring-pulse 1.8s ease-in-out 0.7s infinite,
                goal-card-out 0.5s ease-in 9.5s forwards
              `,
            }}
          >
            {/* Trophy — entrance spin then continuous wobble */}
            <div
              style={{
                width: 120, height: 120, display: 'grid', placeItems: 'center',
                animation: `
                  goal-trophy-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards,
                  goal-trophy-wobble 1.6s ease-in-out 0.8s infinite
                `,
              }}
            >
              <Trophy
                size={120} weight="fill" color={cfg.color}
                style={{ filter: `drop-shadow(0 0 24px ${cfg.color})` }}
              />
            </div>

            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 800,
                fontSize: 56,
                lineHeight: '66px',
                letterSpacing: '0.04em',
                textAlign: 'center',
                animation: 'goal-text-up 0.5s ease-out 0.4s both',
              }}
            >
              <span style={{ color: '#fff' }}>Prime </span>
              <span style={{
                backgroundImage: `linear-gradient(180deg, ${cfg.primeFrom} 0%, ${cfg.primeTo} 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}>{cfg.label}</span>
            </div>

            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 80,
                lineHeight: '88px',
                color: '#FFFFFF',
                textAlign: 'center',
                animation: 'goal-text-up 0.5s ease-out 0.55s both',
              }}
            >
              {cfg.headline}
            </div>

            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: 36,
                lineHeight: '48px',
                color: '#FFFFFF',
                textAlign: 'center',
                opacity: 0.95,
                whiteSpace: 'nowrap',
                maxWidth: '100%',
                animation: 'goal-text-up 0.5s ease-out 0.7s both',
              }}
            >
              {cfg.subline}
            </div>
          </div>
        </div>
      </StageBackground>
    </ScaledFrame>
  )
}
