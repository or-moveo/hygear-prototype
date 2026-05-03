import { Plus, Barbell, Clock, Users } from '@phosphor-icons/react'
import { workouts as ALL_WORKOUTS } from '../../data/backoffice'
import { getWorkoutType } from '../../data/workoutTypes'
import { ZONES } from '../../data/zones'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"

// Local extension: workouts may declare additional fields the data file
// doesn't yet carry (target zone range, equipment, usage). Keep visual
// columns stable while backend is mocked.
const EXTRA = {
  1: { targetZone: '3-4', equipment: ['Bands', 'KB', 'DB'],          usageCount: 142 },
  2: { targetZone: '1-2', equipment: ['Bands', 'Body Weight'],       usageCount: 89  },
  3: { targetZone: '4-5', equipment: ['Bands', 'Straps', 'KB', 'DB'], usageCount: 178 },
  4: { targetZone: '4-5', equipment: ['Bands', 'KB', 'DB'],          usageCount: 203 },
  5: { targetZone: '1-2', equipment: ['Body Weight'],                usageCount: 45  },
  6: { targetZone: '3',   equipment: ['Bands', 'Steps'],             usageCount: 67  },
  7: { targetZone: '3',   equipment: ['Bands', 'DB'],                usageCount: 71  },
  8: { targetZone: '4-5', equipment: ['Bands', 'Steps'],             usageCount: 110 },
}

const ZONE_BY_ID = Object.fromEntries(ZONES.map(z => [z.id, z]))

export default function HygearWorkouts() {
  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#333333', margin: 0 }}>Workout Library ({ALL_WORKOUTS.length})</h2>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: PRIMARY, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT }}>
          <Plus size={16} weight="bold" /> New Workout
        </button>
      </div>

      <div style={{ background: '#fff', border: '1px solid #dcdcdc', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: FONT }}>
          <thead>
            <tr style={{ background: PRIMARY }}>
              {['Workout', 'Type', 'Duration', 'Blocks', 'Target Zone', 'Equipment', 'Difficulty', 'Usage'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: h === 'Workout' ? 'left' : 'center', fontWeight: 600, color: '#fff' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_WORKOUTS.map((w, i) => {
              const t = getWorkoutType(w.type)
              const zone = ZONE_BY_ID[w.zone]
              const extra = EXTRA[w.id] || { targetZone: String(w.zone), equipment: [], usageCount: 0 }
              return (
                <tr key={w.id} style={{ background: i % 2 === 0 ? '#fff' : '#FAFBFD', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e6f7f8'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#FAFBFD'}>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0' }}>
                    <div style={{ fontWeight: 700, color: '#333333' }}>{w.name}</div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                    <span style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}`, borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{t.label}</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#8C8C8C' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><Clock size={12} />{w.duration} min</div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#333333', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><Barbell size={12} color={PRIMARY} />{w.exerciseCount}</div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                    <span style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 6, padding: '3px 8px', fontSize: 12, color: '#333333', fontWeight: 600 }}>Zone {extra.targetZone}</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                      {extra.equipment.slice(0, 2).map(e => (
                        <span key={e} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 4, padding: '2px 6px', fontSize: 10, color: '#8C8C8C' }}>{e}</span>
                      ))}
                      {extra.equipment.length > 2 && <span style={{ fontSize: 10, color: '#8C8C8C' }}>+{extra.equipment.length - 2}</span>}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                    {zone && (
                      <span style={{ background: zone.bg, color: zone.color, border: `1px solid ${zone.color}40`, borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
                        Zone {zone.id} · {zone.label}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#8C8C8C' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><Users size={12} />{extra.usageCount}</div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
