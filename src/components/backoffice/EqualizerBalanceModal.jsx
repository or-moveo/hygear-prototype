import { useState } from 'react'
import { X, Sparkle, Equals, Info } from '@phosphor-icons/react'
import { equalizerBalance } from '../../data/backoffice'
import { WORKOUT_TYPES, getWorkoutType } from '../../data/workoutTypes'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"

const PERIODS = [
  { id: 'day',     label: 'Day' },
  { id: 'week',    label: 'Week' },
  { id: 'month',   label: 'Month' },
  { id: 'quarter', label: 'Quarter' },
  { id: 'year',    label: 'Year' },
]

const TARGET = 100 / 3   // Even distribution target — 33.3% per type.

// Compute simple AI-style re-balancing tip from the current distribution.
// TODO(backend): replace with the recommendations service.
function buildTip(percents) {
  const entries = Object.entries(percents).map(([k, v]) => ({ key: k, pct: v }))
  const max = entries.reduce((a, b) => b.pct > a.pct ? b : a)
  const min = entries.reduce((a, b) => b.pct < a.pct ? b : a)
  const spread = max.pct - min.pct
  if (spread < 8) {
    return {
      headline: 'Well-balanced mix.',
      body: 'All three workout types are within ~8% of each other. Keep current programming; no rebalance needed.',
    }
  }
  return {
    headline: `${getWorkoutType(max.key).label} is over-represented.`,
    body: `${getWorkoutType(max.key).label} is at ${max.pct}% vs ${getWorkoutType(min.key).label} at ${min.pct}%. Consider trimming one ${max.key} class per week and adding a ${min.key} class — for example, a midday slot with high foot traffic.`,
  }
}

export default function EqualizerBalanceModal({ open, onClose }) {
  const [period, setPeriod] = useState('week')
  if (!open) return null

  const counts = equalizerBalance[period]
  const total  = Object.values(counts).reduce((a, b) => a + b, 0)
  const percents = Object.fromEntries(
    Object.entries(counts).map(([k, v]) => [k, total === 0 ? 0 : Math.round((v / total) * 100)])
  )
  const tip = buildTip(percents)

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 70,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.45)', fontFamily: FONT,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 720,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #dcdcdc', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: PRIMARY + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Equals size={20} color={PRIMARY} weight="bold" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#333333' }}>Equalizer Balance</h3>
              <div style={{ fontSize: 12, color: '#8C8C8C', marginTop: 2 }}>
                Workout-type distribution across your studio · {total} classes
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} color="#8C8C8C" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {/* Period filter */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 22, flexWrap: 'wrap' }}>
            {PERIODS.map(p => {
              const active = p.id === period
              return (
                <button key={p.id} onClick={() => setPeriod(p.id)}
                  style={{
                    padding: '6px 14px', borderRadius: 999,
                    border: '1px solid', borderColor: active ? PRIMARY : '#dcdcdc',
                    background: active ? PRIMARY : '#fff',
                    color: active ? '#fff' : '#333333',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
                  }}>{p.label}</button>
              )
            })}
          </div>

          {/* Donut + legend */}
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, alignItems: 'center', marginBottom: 22 }}>
            <Donut percents={percents} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {WORKOUT_TYPES.map(t => {
                const pct = percents[t.short] || 0
                const count = counts[t.short] || 0
                return (
                  <div key={t.short}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#333333' }}>
                        <span style={{ width: 10, height: 10, borderRadius: 3, background: t.color, display: 'inline-block' }} />
                        {t.label}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: t.color, fontVariantNumeric: 'tabular-nums' }}>
                        {pct}% <span style={{ color: '#8C8C8C', fontWeight: 500, fontSize: 11 }}>({count})</span>
                      </span>
                    </div>
                    <div style={{ height: 6, background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: t.color, borderRadius: 999 }} />
                    </div>
                    {/* Target marker */}
                    <div style={{ position: 'relative', height: 0 }}>
                      <div title={`Even target ${TARGET.toFixed(1)}%`} style={{
                        position: 'absolute', left: `${TARGET}%`, top: -8,
                        width: 1, height: 8, background: '#8C8C8C',
                      }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI recommendation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            <Sparkle size={12} color={PRIMARY} weight="fill" /> System Recommendation
          </div>
          <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#333333', marginBottom: 6 }}>{tip.headline}</div>
            <p style={{ fontSize: 13, lineHeight: 1.55, color: '#444', margin: 0 }}>{tip.body}</p>
          </div>
        </div>

        <div style={{ padding: '12px 24px', borderTop: '1px solid #dcdcdc', background: '#FAFBFD', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Info size={14} color="#8C8C8C" />
          <span style={{ fontSize: 11, color: '#8C8C8C' }}>
            Distribution against an even target of {TARGET.toFixed(1)}% per type. Mock data — TODO(backend).
          </span>
        </div>
      </div>
    </div>
  )
}

// Pure-SVG donut chart with 3 slices.
function Donut({ percents }) {
  const size = 180, cx = size / 2, cy = size / 2, r = 70, stroke = 22
  const order = WORKOUT_TYPES
  const total = order.reduce((a, t) => a + (percents[t.short] || 0), 0) || 100
  let acc = 0
  const arcs = order.map(t => {
    const pct = (percents[t.short] || 0) / total
    const start = acc; const end = acc + pct
    acc = end
    return { color: t.color, start, end, pct }
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={180} height={180}>
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#FAFBFD" strokeWidth={stroke} />
      {arcs.map((a, i) => (
        a.pct > 0 && <Arc key={i} cx={cx} cy={cy} r={r} stroke={stroke} color={a.color} start={a.start} end={a.end} />
      ))}
      {/* Center label — biggest slice's % */}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize={14} fontFamily={FONT} fill="#8C8C8C">Total</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize={22} fontWeight={700} fontFamily={FONT} fill="#333333">{Math.round(total)}%</text>
    </svg>
  )
}

function Arc({ cx, cy, r, stroke, color, start, end }) {
  // Convert proportions to angles. Start at 12 o'clock (270deg), clockwise.
  const a0 = -Math.PI / 2 + start * Math.PI * 2
  const a1 = -Math.PI / 2 + end   * Math.PI * 2
  const x0 = cx + r * Math.cos(a0)
  const y0 = cy + r * Math.sin(a0)
  const x1 = cx + r * Math.cos(a1)
  const y1 = cy + r * Math.sin(a1)
  const largeArc = end - start > 0.5 ? 1 : 0
  const d = `M ${x0} ${y0} A ${r} ${r} 0 ${largeArc} 1 ${x1} ${y1}`
  return <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="butt" />
}
