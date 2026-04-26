import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import TrainingStructure from '../components/TrainingStructure'

const VARIANTS = {
  BUILD: {
    label: 'BUILD',
    color: '#a855f7',
    mode: 'scale',
    goalHeadline: 'Group weight: 20 tons',
    goalBody: 'The total cumulative weight that the entire group pulled in training together.',
  },
  BURN: {
    label: 'BURN',
    color: '#ec4899',
    mode: 'counter',
    goalHeadline: '300 team points',
    goalBody: 'can you keep your heart rate high? Every minute you are in Zone 4–5 adds a point to the group score.',
  },
  SHIELD: {
    label: 'SHIELD',
    color: '#06b6d4',
    mode: 'counter',
    goalHeadline: '450 group minutes of control',
    goalBody: 'The accumulated dwell time in "Total Prime Control Minutes". Make a smooth, perfect movement',
  },
}

const CONTRIBUTORS = [
  { rank: 1, name: 'Ben',   reps: 268, kg: 3963, medal: '#F5C542' },
  { rank: 2, name: 'Mirel', reps: 268, kg: 3963, medal: '#D9D9D9' },
  { rank: 3, name: 'Gal',   reps: 268, kg: 3963, medal: '#CD7F32' },
]

const RADIUS = '36px 18px 36px 36px'

function GroupIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 11a3 3 0 100-6 3 3 0 000 6zm0 2c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm7.5-2a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm1.5 2c-.29 0-.62.02-.97.05A4.5 4.5 0 0118 15.5V18h5v-2.5c0-1.83-3.67-2.5-5-2.5z"/>
    </svg>
  )
}

function Medal({ color }) {
  return (
    <svg width="70" height="88" viewBox="0 0 70 88" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Ribbons — red, forming an inverted V */}
      <path d="M12 2 L24 2 L34 40 L26 40 Z" fill="#E53935"/>
      <path d="M58 2 L46 2 L36 40 L44 40 Z" fill="#C62828"/>
      <path d="M24 2 L30 2 L34 16 L28 20 Z" fill="#B71C1C" opacity="0.9"/>
      <path d="M46 2 L40 2 L36 16 L42 20 Z" fill="#8B0000" opacity="0.9"/>
      {/* Medal circle */}
      <circle cx="35" cy="56" r="24" fill={color} stroke="#fff" strokeWidth="2"/>
      <circle cx="35" cy="56" r="17" fill={color} stroke="rgba(0,0,0,0.25)" strokeWidth="1"/>
    </svg>
  )
}

function Panel({ x, w, color, children }) {
  return (
    <div style={{
      position: 'absolute', top: 142, left: x, width: w, height: 888,
      borderRadius: RADIUS,
      background: `linear-gradient(192.26deg, color-mix(in srgb, ${color} 55%, #0a0a14) 0%, color-mix(in srgb, ${color} 18%, #0a0a14) 100%)`,
      padding: 36, color: '#fff', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Poppins, sans-serif',
    }}>{children}</div>
  )
}

function GoalPanel({ cfg }) {
  return (
    <Panel x={50} w={805} color={cfg.color}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
        <span style={{ fontSize: 60, fontWeight: 800, letterSpacing: '0.01em' }}>{cfg.label}</span>
        <span style={{ fontSize: 60, fontWeight: 700, color: cfg.color, letterSpacing: '0.01em' }}>Prime</span>
      </div>
      <div style={{ fontSize: 32, fontWeight: 500, marginTop: 4, marginBottom: 22 }}>Group Target</div>

      {/* Inner goal card */}
      <div style={{
        padding: 32,
        borderRadius: RADIUS,
        background: `color-mix(in srgb, ${cfg.color} 22%, #0a0a14)`,
        border: `2px solid color-mix(in srgb, ${cfg.color} 65%, transparent)`,
        display: 'flex', flexDirection: 'column', gap: 22, flex: 1,
      }}>
        {/* Headline with icon */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: cfg.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <GroupIcon />
          </div>
          <span style={{ fontSize: 30, fontWeight: 700 }}>{cfg.goalHeadline}</span>
        </div>

        {/* Training Goal */}
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Training Goal:</div>
          <div style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.35 }}>
            {cfg.goalBody}
          </div>
        </div>

        {/* Counter / Scale */}
        <div style={{ marginTop: 'auto' }}>
          {cfg.mode === 'scale' ? (
            <div style={{
              background: '#000',
              borderRadius: RADIUS,
              padding: '28px 48px 24px',
              display: 'flex', flexDirection: 'column', gap: 8,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 60, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>100</span>
                <span style={{ fontSize: 88, fontWeight: 800, color: '#fff' }}>200</span>
                <span style={{ fontSize: 60, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>300</span>
              </div>
              <div style={{ position: 'relative', height: 26 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', height: 18 }}>
                  {Array.from({ length: 21 }, (_, i) => (
                    <div key={i} style={{
                      width: 2,
                      height: i % 5 === 0 ? 18 : 10,
                      background: 'rgba(255,255,255,0.6)',
                    }} />
                  ))}
                </div>
                <div style={{
                  position: 'absolute', left: '50%', top: 18,
                  transform: 'translateX(-50%)',
                  width: 0, height: 0,
                  borderLeft: '12px solid transparent',
                  borderRight: '12px solid transparent',
                  borderBottom: `16px solid ${cfg.color}`,
                }} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 14 }}>
              {['3', '0', '0'].map((n, i) => (
                <div key={i} style={{
                  flex: 1, height: 170,
                  borderRadius: RADIUS,
                  background: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 108, fontWeight: 800, color: '#fff', lineHeight: 1,
                }}>{n}</div>
              ))}
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={{
          height: 28, borderRadius: 999,
          background: 'rgba(255,255,255,0.2)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            width: '75%', height: '100%',
            background: cfg.color,
            borderRadius: 999,
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
            paddingRight: 14,
            fontSize: 14, fontWeight: 700, color: '#fff',
          }}>75%</div>
        </div>
      </div>
    </Panel>
  )
}

function ContributorsPanel({ cfg }) {
  return (
    <Panel x={891} w={573} color={cfg.color}>
      <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 18 }}>Top Contributors</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flex: 1 }}>
        {CONTRIBUTORS.map((c) => (
          <div key={c.rank} style={{
            borderRadius: RADIUS,
            background: cfg.color,
            padding: '18px 22px',
            display: 'flex', flexDirection: 'column', gap: 12,
            position: 'relative', flex: 1,
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 42, fontWeight: 800, color: '#fff', lineHeight: 1 }}>#{c.rank}</span>
              <span style={{ fontSize: 30, fontWeight: 500, color: '#fff' }}>{c.name}</span>
              <div style={{ marginLeft: 'auto', marginTop: -8 }}>
                <Medal color={c.medal} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                flex: 1, background: '#fff', borderRadius: 14,
                padding: '8px 18px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#555' }}>REPS</span>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#000', lineHeight: 1.1 }}>{c.reps}</span>
              </div>
              <div style={{
                flex: 1, background: '#fff', borderRadius: 14,
                padding: '8px 18px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: '#555' }}>KG</span>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#000', lineHeight: 1.1 }}>{c.kg}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function StructurePanel({ cfg }) {
  return (
    <div style={{ position: 'absolute', top: 142, left: 1500 }}>
      <TrainingStructure color={cfg.color} />
    </div>
  )
}

export default function PrimeTarget({ variant = 'BUILD' } = {}) {
  const cfg = VARIANTS[variant] ?? VARIANTS.BUILD
  return (
    <ScaledFrame>
      <StageBackground variant="dark" glowColor={cfg.color}>
        <GoalPanel cfg={cfg} />
        <ContributorsPanel cfg={cfg} />
        <StructurePanel cfg={cfg} />
      </StageBackground>
    </ScaledFrame>
  )
}
