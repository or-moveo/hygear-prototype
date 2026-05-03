import { useState } from 'react'
import { X, Warning } from '@phosphor-icons/react'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const ERROR = '#F5365C'

const STATION_TYPES = ['Hybrid', 'Bands', 'Straps']
const STUDIOS = ['Tel Aviv Studio']  // single-studio mode → field hidden

const initial = {
  name: '',
  studio: STUDIOS[0],
  stationCount: '',
  defaultStationType: 'Hybrid',
  maxCapacity: '',
  active: true,
}

export default function AddStudioRoomModal({ open, onClose, onCreate }) {
  const [form, setForm] = useState(initial)
  const [touched, setTouched] = useState({})

  if (!open) return null

  const set = (patch) => setForm(f => ({ ...f, ...patch }))
  const mark = (k) => setTouched(t => ({ ...t, [k]: true }))

  const stationCount = Number(form.stationCount)
  const maxCap = Number(form.maxCapacity)

  const errors = {}
  if (!form.name.trim()) errors.name = 'Room name is required'
  if (!stationCount || stationCount < 1) errors.stationCount = 'At least 1 station'
  if (!maxCap || maxCap < 1) errors.maxCapacity = 'Set a max capacity'
  else if (stationCount && maxCap > stationCount) errors.maxCapacity = `Cannot exceed ${stationCount} stations`

  const isValid = !errors.name && !errors.stationCount && !errors.maxCapacity

  const submit = () => {
    Object.keys(errors).forEach(mark)
    if (!isValid) return
    onCreate?.({ ...form, stationCount, maxCapacity: maxCap })
    setForm(initial); setTouched({}); onClose?.()
  }
  const cancel = () => { setForm(initial); setTouched({}); onClose?.() }

  return (
    <div onClick={cancel} style={{ position: 'fixed', inset: 0, zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.45)', fontFamily: FONT }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520, maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #dcdcdc' }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#333333', margin: 0 }}>Add Studio Room</h3>
          <button onClick={cancel} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} color="#8C8C8C" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          <Field label="Room name" required error={errors.name} touched={touched.name}>
            <input type="text" value={form.name}
              onChange={e => { set({ name: e.target.value }); mark('name') }}
              style={inputStyle()} placeholder="Main Floor" />
          </Field>

          {STUDIOS.length > 1 && (
            <Field label="Studio assignment">
              <select value={form.studio} onChange={e => set({ studio: e.target.value })} style={inputStyle()}>
                {STUDIOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
          )}

          <Field label="Number of stations" required error={errors.stationCount} touched={touched.stationCount}>
            <input type="number" min="1" value={form.stationCount}
              onChange={e => { set({ stationCount: e.target.value }); mark('stationCount') }}
              style={inputStyle()} placeholder="16" />
            <div style={{ fontSize: 11, color: '#8C8C8C', marginTop: 5 }}>
              Stations ST 1…ST {form.stationCount || 'N'} will be auto-generated.
            </div>
          </Field>

          <Field label="Default station type">
            <div style={{ display: 'flex', gap: 6 }}>
              {STATION_TYPES.map(t => {
                const on = form.defaultStationType === t
                return (
                  <button key={t} type="button" onClick={() => set({ defaultStationType: t })}
                    style={{
                      padding: '6px 14px', borderRadius: 8,
                      border: '1px solid', borderColor: on ? PRIMARY : '#dcdcdc',
                      background: on ? PRIMARY : '#fff', color: on ? '#fff' : '#333333',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
                    }}>{t}</button>
                )
              })}
            </div>
            <div style={{ fontSize: 11, color: '#8C8C8C', marginTop: 5 }}>
              Per-station overrides can be set later in the Studio Setup page.
            </div>
          </Field>

          <Field label="Maximum capacity" required error={errors.maxCapacity} touched={touched.maxCapacity}>
            <input type="number" min="1" max={stationCount || undefined}
              value={form.maxCapacity}
              onChange={e => { set({ maxCapacity: e.target.value }); mark('maxCapacity') }}
              style={inputStyle()} placeholder="16" />
          </Field>

          <Field label="Status">
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.active} onChange={e => set({ active: e.target.checked })} />
              <span style={{ fontSize: 13, color: '#333333' }}>Active (default)</span>
            </label>
          </Field>
        </div>

        <div style={{ padding: '14px 24px', borderTop: '1px solid #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={cancel} style={{ background: 'transparent', border: 'none', color: '#8C8C8C', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT }}>
            Cancel
          </button>
          <button onClick={submit} disabled={!isValid}
            style={{ background: isValid ? PRIMARY : '#dcdcdc', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: isValid ? 'pointer' : 'not-allowed', fontFamily: FONT }}>
            Add Studio Room
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
