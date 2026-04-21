import { Plus, Barbell, Clock, Users } from '@phosphor-icons/react'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"

const WORKOUTS = [
  { id: 1, name: 'Prime BURN', type: 'HIIT', duration: 45, blocks: 6, targetZone: '4-5', equipment: ['Bands', 'Straps', 'KB', 'DB'], difficulty: 'High', usageCount: 142 },
  { id: 2, name: 'Core Circuit', type: 'Core', duration: 40, blocks: 5, targetZone: '3-4', equipment: ['Bands', 'Body Weight'], difficulty: 'Medium', usageCount: 89 },
  { id: 3, name: 'Strength Pro', type: 'Strength', duration: 50, blocks: 6, targetZone: '3-5', equipment: ['Bands', 'KB', 'DB'], difficulty: 'High', usageCount: 203 },
  { id: 4, name: 'Morning Power', type: 'HIIT', duration: 45, blocks: 6, targetZone: '4-5', equipment: ['Bands', 'Straps'], difficulty: 'High', usageCount: 178 },
  { id: 5, name: 'Recovery Flow', type: 'Recovery', duration: 30, blocks: 4, targetZone: '1-2', equipment: ['Body Weight'], difficulty: 'Low', usageCount: 45 },
  { id: 6, name: 'Endurance Base', type: 'Endurance', duration: 55, blocks: 5, targetZone: '3-4', equipment: ['Bands', 'Steps'], difficulty: 'Medium', usageCount: 67 },
]

const DIFF_COLORS = { High: '#ef4444', Medium: '#f59e0b', Low: '#23B870' }
const TYPE_COLOR = { HIIT: PRIMARY, Core: '#5389f3', Strength: '#8b5cf6', Recovery: '#23B870', Endurance: '#e07b4c' }

export default function HygearWorkouts() {
  return (
    <div style={{ fontFamily: FONT }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: '#333333', margin: 0 }}>Workout Library ({WORKOUTS.length})</h2>
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
            {WORKOUTS.map((w, i) => {
              const typeColor = TYPE_COLOR[w.type] || PRIMARY
              const diffColor = DIFF_COLORS[w.difficulty] || PRIMARY
              return (
                <tr key={w.id} style={{ background: i % 2 === 0 ? '#fff' : '#FAFBFD', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#e6f7f8'}
                  onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#FAFBFD'}>
                  <td style={{ padding: '12px 16px', borderTop: '1px solid #f0f0f0' }}>
                    <div style={{ fontWeight: 700, color: '#333333' }}>{w.name}</div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                    <span style={{ background: typeColor + '18', color: typeColor, borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{w.type}</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#8C8C8C' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><Clock size={12} />{w.duration} min</div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#333333', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><Barbell size={12} color={PRIMARY} />{w.blocks}</div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                    <span style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 6, padding: '3px 8px', fontSize: 12, color: '#333333', fontWeight: 600 }}>Zone {w.targetZone}</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
                      {w.equipment.slice(0, 2).map(e => (
                        <span key={e} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 4, padding: '2px 6px', fontSize: 10, color: '#8C8C8C' }}>{e}</span>
                      ))}
                      {w.equipment.length > 2 && <span style={{ fontSize: 10, color: '#8C8C8C' }}>+{w.equipment.length - 2}</span>}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0' }}>
                    <span style={{ background: diffColor + '18', color: diffColor, borderRadius: 999, padding: '3px 10px', fontSize: 11, fontWeight: 600 }}>{w.difficulty}</span>
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', borderTop: '1px solid #f0f0f0', color: '#8C8C8C' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}><Users size={12} />{w.usageCount}</div>
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
