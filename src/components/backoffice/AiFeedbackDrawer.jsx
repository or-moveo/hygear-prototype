import { X, Sparkle, ListChecks, Info } from '@phosphor-icons/react'
import TrendBadge from './TrendBadge'
import { aiFeedbackTemplates } from '../../data/backoffice'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"

// Pick a stable feedback template for a given trainee based on trend bucket.
// TODO(backend): replace with real AI recommendation lookup keyed by trainee + session.
function pickFeedback(name, delta) {
  const bucket = delta >= 5 ? 'improving' : delta <= -5 ? 'declining' : 'steady'
  const list = aiFeedbackTemplates[bucket]
  // Stable pseudo-hash from name so the same trainee always gets the same sample.
  const hash = [...name].reduce((a, c) => a + c.charCodeAt(0), 0)
  return { ...list[hash % list.length], bucket }
}

// Centered popup with read-only AI coaching feedback. The coach cannot edit
// or send it — it's a recommendation surface to help the coach decide what
// to say in person. Opening for trainee B closes the popup for trainee A
// automatically (the parent controls a single `selected` state).
export default function AiFeedbackDrawer({ trainee, onClose }) {
  if (!trainee) return null
  const fb = pickFeedback(trainee.name, trainee.trendDelta ?? 0)

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 70,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.45)', fontFamily: FONT,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #dcdcdc', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              <Sparkle size={12} color={PRIMARY} weight="fill" />
              System Recommendation
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#333333' }}>{trainee.name}</div>
              <TrendBadge delta={trainee.trendDelta ?? 0} size="lg" />
            </div>
          </div>
          <button onClick={onClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} color="#8C8C8C" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#333333', marginBottom: 8 }}>
            {fb.summary}
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.55, color: '#444', margin: '0 0 22px' }}>
            {fb.body}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            <ListChecks size={12} />
            Suggested focus
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {fb.focus.map(item => (
              <li key={item} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: '#333333' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Read-only notice */}
        <div style={{ padding: '12px 24px', borderTop: '1px solid #dcdcdc', background: '#FAFBFD', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Info size={14} color="#8C8C8C" />
          <span style={{ fontSize: 11, color: '#8C8C8C' }}>
            Read-only recommendation. Use it to inform what you say in person.
          </span>
        </div>
      </div>
    </div>
  )
}
