import { useState } from 'react'
import { X, Warning, Plus, Trash, Sun } from '@phosphor-icons/react'
import { WORKOUT_TYPES } from '../../data/workoutTypes'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const ERROR = '#F5365C'

const CERT_LEVELS = ['Junior', 'Mid', 'Senior', 'Lead']
const STUDIOS = ['Tel Aviv Studio']  // only one studio for now; field hidden when ≤ 1
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const DAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DEFAULT_SLOT = { from: '06:00', to: '14:00' }

// Specializations include existing options + Build/Shield/Burn (per Section 8 brief).
const EXISTING_SPECS = ['HIIT', 'Core', 'Strength', 'Recovery', 'Endurance', 'Yoga', 'Flexibility', 'Power']
const ALL_SPECS = [...WORKOUT_TYPES.map(t => t.short), ...EXISTING_SPECS]

// `availability` shape:
//   { [dayKey]: { allDay: boolean, slots: [{ from: 'HH:MM', to: 'HH:MM' }] } }
// A day key is present iff the coach is available on that day. When
// `allDay` is true we ignore `slots`.
const initial = {
  name: '',
  email: '',
  phone: '',
  specialties: [],
  certLevel: '',
  studio: STUDIOS[0],
  availability: {},
  active: true,
}

export default function AddCoachModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState(initial)
  const [touched, setTouched] = useState({})

  if (!open) return null

  const set = (patch) => setForm(f => ({ ...f, ...patch }))
  const mark = (k) => setTouched(t => ({ ...t, [k]: true }))

  const errors = {}
  if (!form.name.trim()) errors.name = 'Full name is required'
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = 'Invalid email'

  const isValid = !errors.name && !errors.email

  const submit = () => {
    mark('name'); mark('email')
    if (!isValid) return
    onCreate?.({ ...form })
    setForm(initial)
    setTouched({})
    onClose?.()
  }

  const cancel = () => {
    setForm(initial)
    setTouched({})
    onClose?.()
  }

  return (
    <div onClick={cancel} style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', fontFamily: FONT }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 560, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #dcdcdc' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#333333', margin: 0 }}>Add Coach</h3>
          <button onClick={cancel} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} color="#8C8C8C" />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <Field label="Full name" required error={errors.name} touched={touched.name}>
            <input type="text" value={form.name}
              onChange={e => { set({ name: e.target.value }); mark('name') }}
              style={inputStyle()} placeholder="Maya Levy" />
          </Field>

          <Field label="Email" required error={errors.email} touched={touched.email}>
            <input type="email" value={form.email}
              onChange={e => { set({ email: e.target.value }); mark('email') }}
              style={inputStyle()} placeholder="maya@hygear.com" />
          </Field>

          <Field label="Phone (optional)">
            <input type="tel" value={form.phone}
              onChange={e => set({ phone: e.target.value })}
              style={inputStyle()} placeholder="+972 50-000-0000" />
          </Field>

          <Field label="Specializations">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {ALL_SPECS.map(s => {
                const selected = form.specialties.includes(s)
                const t = WORKOUT_TYPES.find(t => t.short === s)
                const color = t?.color
                return (
                  <button key={s} type="button" onClick={() => {
                    const next = selected ? form.specialties.filter(x => x !== s) : [...form.specialties, s]
                    set({ specialties: next })
                  }} style={{
                    padding: '5px 12px', borderRadius: 999,
                    border: '1px solid', borderColor: selected ? (color ?? PRIMARY) : '#dcdcdc',
                    background: selected ? (color ?? PRIMARY) : '#fff',
                    color: selected ? '#fff' : '#333333',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
                  }}>
                    {t ? t.label : s}
                  </button>
                )
              })}
            </div>
          </Field>

          <Field label="Certification level">
            <select value={form.certLevel} onChange={e => set({ certLevel: e.target.value })} style={inputStyle()}>
              <option value="">Choose a level…</option>
              {CERT_LEVELS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          {STUDIOS.length > 1 && (
            <Field label="Studio assignment">
              <select value={form.studio} onChange={e => set({ studio: e.target.value })} style={inputStyle()}>
                {STUDIOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          )}

          <Field label="Available days (optional — can be set later)">
            <div style={{ display: 'flex', gap: 6 }}>
              {DAY_KEYS.map((d, i) => {
                const on = form.availability[d] != null
                return (
                  <button key={d} type="button" onClick={() => {
                    const next = { ...form.availability }
                    if (on) delete next[d]
                    else next[d] = { allDay: false, slots: [{ ...DEFAULT_SLOT }] }
                    set({ availability: next })
                  }} style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: '1px solid', borderColor: on ? PRIMARY : '#dcdcdc',
                    background: on ? PRIMARY : '#fff', color: on ? '#fff' : '#333333',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: FONT,
                  }}>{DAY_LABELS[i]}</button>
                )
              })}
            </div>
          </Field>

          {/* Per-day hours — only renders for days the coach picked above.
              Each day has an "All day" shortcut and a list of HH:MM windows. */}
          {Object.keys(form.availability).length > 0 && (
            <Field label="Hours per day">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {DAY_KEYS.map((d, i) => {
                  const cfg = form.availability[d]
                  if (!cfg) return null
                  const updateDay = (patch) => {
                    set({ availability: { ...form.availability, [d]: { ...cfg, ...patch } } })
                  }
                  const updateSlot = (idx, patch) => {
                    const slots = cfg.slots.map((s, j) => j === idx ? { ...s, ...patch } : s)
                    updateDay({ slots })
                  }
                  const addSlot = () => updateDay({ slots: [...cfg.slots, { ...DEFAULT_SLOT }] })
                  const removeSlot = (idx) => updateDay({ slots: cfg.slots.filter((_, j) => j !== idx) })

                  return (
                    <div key={d} style={{
                      background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10,
                      padding: '10px 12px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: cfg.allDay ? 0 : 8, gap: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#333333' }}>{DAY_FULL[i]}</span>
                        <button
                          type="button"
                          onClick={() => updateDay({ allDay: !cfg.allDay })}
                          aria-pressed={cfg.allDay}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '5px 12px', borderRadius: 999,
                            border: `1.5px solid ${cfg.allDay ? '#f59e0b' : '#dcdcdc'}`,
                            background: cfg.allDay ? '#f59e0b' : '#fff',
                            color: cfg.allDay ? '#fff' : '#8C8C8C',
                            fontFamily: FONT, fontSize: 12, fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: cfg.allDay ? '0 1px 4px rgba(245,158,11,0.3)' : 'none',
                            transition: 'background 0.12s, color 0.12s, border-color 0.12s',
                          }}
                        >
                          <Sun size={14} weight="fill" color={cfg.allDay ? '#fff' : '#f59e0b'} />
                          All day
                        </button>
                      </div>

                      {!cfg.allDay && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {cfg.slots.map((slot, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <input
                                type="time"
                                value={slot.from}
                                onChange={e => updateSlot(idx, { from: e.target.value })}
                                style={timeInputStyle()}
                              />
                              <span style={{ fontSize: 12, color: '#8C8C8C' }}>to</span>
                              <input
                                type="time"
                                value={slot.to}
                                onChange={e => updateSlot(idx, { to: e.target.value })}
                                style={timeInputStyle()}
                              />
                              {cfg.slots.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeSlot(idx)}
                                  title="Remove slot"
                                  style={{
                                    width: 28, height: 28, borderRadius: 6,
                                    background: '#fff', border: '1px solid #dcdcdc',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer',
                                  }}
                                >
                                  <Trash size={12} color="#8C8C8C" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={addSlot}
                            style={{
                              alignSelf: 'flex-start',
                              display: 'inline-flex', alignItems: 'center', gap: 4,
                              background: 'transparent', border: 'none', color: PRIMARY,
                              fontSize: 12, fontWeight: 700, cursor: 'pointer',
                              padding: 0, fontFamily: FONT,
                            }}
                          >
                            <Plus size={12} weight="bold" /> Add another window
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </Field>
          )}

          <Field label="Status">
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.active} onChange={e => set({ active: e.target.checked })} />
              <span style={{ fontSize: 13, color: '#333333' }}>Active (default)</span>
            </label>
          </Field>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={cancel} style={{ background: 'transparent', border: 'none', color: '#8C8C8C', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT }}>
            Cancel
          </button>
          <button onClick={submit} disabled={!isValid}
            style={{ background: isValid ? PRIMARY : '#dcdcdc', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: isValid ? 'pointer' : 'not-allowed', fontFamily: FONT }}>
            Add Coach
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, required, error, touched, children }) {
  const showError = error && touched
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: showError ? ERROR : '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
        {label}{required && <span style={{ color: ERROR }}> *</span>}
      </div>
      {children}
      {showError && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, fontSize: 11, color: ERROR }}>
          <Warning size={11} weight="fill" /> {error}
        </div>
      )}
    </div>
  )
}

function inputStyle() {
  return {
    width: '100%', padding: '8px 12px', border: '1px solid #dcdcdc',
    borderRadius: 8, fontSize: 13, color: '#333333', background: '#fff', fontFamily: FONT, boxSizing: 'border-box',
  }
}

function timeInputStyle() {
  return {
    padding: '6px 10px', border: '1px solid #dcdcdc', borderRadius: 6,
    fontSize: 12, color: '#333333', background: '#fff', fontFamily: FONT,
    fontVariantNumeric: 'tabular-nums',
  }
}
