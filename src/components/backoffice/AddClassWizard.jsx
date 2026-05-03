import { useMemo, useState } from 'react'
import { X, CaretLeft, ArrowRight, PencilSimple, CheckCircle, Warning } from '@phosphor-icons/react'
import { WORKOUT_TYPES, getWorkoutType } from '../../data/workoutTypes'
import { ZONES } from '../../data/zones'
import { workouts as ALL_WORKOUTS, coaches as ALL_COACHES, rooms as ALL_ROOMS, weeklySchedule } from '../../data/backoffice'

const PRIMARY = '#27bbc1'
const FONT = "'Heebo', 'Open Sans', sans-serif"
const ERROR = '#F5365C'

const STEPS = [
  { id: 1, label: 'Details' },
  { id: 2, label: 'When' },
  { id: 3, label: 'Where' },
  { id: 4, label: 'Review' },
]

const DURATION_OPTIONS = [30, 45, 60, 75, 90, 'Custom']
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const DAY_KEYS = [0, 1, 2, 3, 4, 5, 6]

const initialForm = {
  // Step 1
  type: '',
  workoutId: '',
  coachId: '',
  zone: '',
  // Step 2
  date: '',
  time: '',
  duration: 45,
  customDuration: '',
  recurring: false,
  frequency: 'weekly',
  daysOfWeek: [],
  endMode: 'date',     // 'date' | 'count'
  endDate: '',
  endCount: 4,
  // Step 3
  roomId: '',
  minCapacity: 1,
  maxCapacity: '',
}

// Day-of-week index for an ISO date (0..6 with Sunday = 0)
function dayOfWeek(iso) {
  if (!iso) return null
  return new Date(iso + 'T00:00:00').getDay()
}

// Compute end time from start + duration min
function endTimeFor(time, durMin) {
  if (!time || !durMin) return ''
  const [h, m] = time.split(':').map(Number)
  const total = h * 60 + m + Number(durMin)
  return `${String(Math.floor(total / 60) % 24).padStart(2,'0')}:${String(total % 60).padStart(2,'0')}`
}

// Booked-room detection for step 3.
// A room is "booked" if any class on the same weekday + same time slot is in it.
function isRoomBooked(roomName, dateIso, time, durMin) {
  const dow = dayOfWeek(dateIso)
  if (dow == null || !time || !durMin) return false
  const startA = toMin(time)
  const endA = startA + Number(durMin)
  return weeklySchedule.some(c => {
    if (c.day !== dow || c.room !== roomName) return false
    const startB = toMin(c.time)
    const endB = toMin(c.endTime)
    return startA < endB && startB < endA
  })
}
function toMin(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export default function AddClassWizard({ open, onClose, onCreate }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [touched, setTouched] = useState({})
  const [confirmDiscard, setConfirmDiscard] = useState(false)

  const set = (patch) => setForm(f => ({ ...f, ...patch }))
  const mark = (k) => setTouched(t => ({ ...t, [k]: true }))

  const t = form.type ? getWorkoutType(form.type) : null
  const zone = ZONES.find(z => z.id === Number(form.zone))
  const workoutsForType = useMemo(
    () => ALL_WORKOUTS.filter(w => !form.type || w.type === form.type),
    [form.type]
  )
  const coachesForType = useMemo(
    () => ALL_COACHES.filter(c => !form.type || (c.specialties || []).includes(form.type)),
    [form.type]
  )

  if (!open) return null
  const selectedWorkout = ALL_WORKOUTS.find(w => w.id === Number(form.workoutId))
  const selectedCoach   = ALL_COACHES.find(c => c.id === Number(form.coachId))
  const selectedRoom    = ALL_ROOMS.find(r => r.id === Number(form.roomId))

  const durationMin = form.duration === 'Custom' ? Number(form.customDuration) : Number(form.duration)

  // Validation per step
  const errors = {}
  if (step >= 1) {
    if (!form.type)      errors.type = 'Choose a workout type'
    if (!form.workoutId) errors.workoutId = 'Choose a workout'
    if (!form.coachId)   errors.coachId = 'Choose a coach'
    if (!form.zone)      errors.zone = 'Choose a difficulty zone'
  }
  if (step >= 2) {
    if (!form.date) errors.date = 'Pick a date'
    if (!form.time) errors.time = 'Pick a start time'
    if (!durationMin || durationMin <= 0) errors.duration = 'Choose a duration'
    if (form.recurring) {
      if (form.frequency === 'weekly' && form.daysOfWeek.length === 0)
        errors.daysOfWeek = 'Pick at least one day'
      if (form.endMode === 'date' && !form.endDate)
        errors.endDate = 'Pick an end date'
      if (form.endMode === 'count' && (!form.endCount || form.endCount < 1))
        errors.endCount = 'Choose a positive number'
    }
  }
  if (step >= 3) {
    if (!form.roomId) errors.roomId = 'Choose a room'
    if (selectedRoom) {
      if (Number(form.minCapacity) < 1)
        errors.minCapacity = 'Min must be at least 1'
      if (!form.maxCapacity)
        errors.maxCapacity = 'Set a max capacity'
      else if (Number(form.maxCapacity) < Number(form.minCapacity))
        errors.maxCapacity = 'Max must be ≥ Min'
      else if (Number(form.maxCapacity) > selectedRoom.stationCount)
        errors.maxCapacity = `Max can't exceed ${selectedRoom.stationCount} stations`
    }
  }

  // Required fields per step (block "Next" when any are missing)
  const stepKeys = {
    1: ['type', 'workoutId', 'coachId', 'zone'],
    2: ['date', 'time', 'duration'],
    3: ['roomId', 'minCapacity', 'maxCapacity'],
  }
  const stepValid = (stepKeys[step] || []).every(k => !errors[k])

  const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm)
  const tryClose = () => {
    if (isDirty) setConfirmDiscard(true)
    else doClose()
  }
  const doClose = () => {
    setForm(initialForm)
    setTouched({})
    setStep(1)
    setConfirmDiscard(false)
    onClose?.()
  }

  const goto = (n) => {
    // Only allow going back to completed steps
    if (n <= step) setStep(n)
  }

  const next = () => {
    // Mark all current-step keys touched so errors render
    ;(stepKeys[step] || []).forEach(mark)
    if (!stepValid) return
    setStep(s => Math.min(4, s + 1))
  }
  const back = () => setStep(s => Math.max(1, s - 1))

  const submit = () => {
    onCreate?.({
      ...form,
      endTime: endTimeFor(form.time, durationMin),
      type: form.type,
      zone: Number(form.zone),
    })
    doClose()
  }

  return (
    <div onClick={tryClose} style={{
      position: 'fixed', inset: 0, zIndex: 70,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.45)', fontFamily: FONT,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 720,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
      }}>
        {/* Header + stepper */}
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #dcdcdc' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#333333', margin: 0 }}>Add Class</h3>
            <button onClick={tryClose} style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={16} color="#8C8C8C" />
            </button>
          </div>
          <Stepper step={step} onGoto={goto} />
        </div>

        {/* Body — scrollable */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {step === 1 && <Step1 form={form} set={set} errors={errors} touched={touched} mark={mark}
              workoutsForType={workoutsForType} coachesForType={coachesForType} t={t} zone={zone} />}
          {step === 2 && <Step2 form={form} set={set} errors={errors} touched={touched} mark={mark} />}
          {step === 3 && <Step3 form={form} set={set} errors={errors} touched={touched} mark={mark}
              selectedRoom={selectedRoom} durationMin={durationMin} />}
          {step === 4 && <Step4 form={form} setStep={setStep}
              t={t} zone={zone} selectedWorkout={selectedWorkout} selectedCoach={selectedCoach} selectedRoom={selectedRoom}
              durationMin={durationMin} />}
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 24px', borderTop: '1px solid #dcdcdc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={tryClose}
            style={{ background: 'transparent', border: 'none', color: '#8C8C8C', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: FONT }}>
            Cancel
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            {step > 1 && (
              <button onClick={back}
                style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 600, color: '#333333', cursor: 'pointer', fontFamily: FONT, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CaretLeft size={14} weight="bold" /> Back
              </button>
            )}
            {step < 4 ? (
              <button onClick={next} disabled={!stepValid}
                style={{ background: stepValid ? PRIMARY : '#dcdcdc', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: stepValid ? 'pointer' : 'not-allowed', fontFamily: FONT, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Next <ArrowRight size={14} weight="bold" />
              </button>
            ) : (
              <button onClick={submit}
                style={{ background: PRIMARY, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: FONT, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={14} weight="fill" /> Create Class
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Discard confirmation */}
      {confirmDiscard && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 71, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '20px 24px', maxWidth: 360, fontFamily: FONT }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#333333', marginBottom: 8 }}>Discard changes?</div>
            <div style={{ fontSize: 13, color: '#8C8C8C', marginBottom: 18 }}>You have unsaved changes. Closing now will lose them.</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirmDiscard(false)}
                style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT }}>
                Keep editing
              </button>
              <button onClick={doClose}
                style={{ background: ERROR, color: '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT }}>
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Stepper ────────────────────────────────────────────────────
function Stepper({ step, onGoto }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      {STEPS.map((s, i) => {
        const isCurrent  = s.id === step
        const isComplete = s.id < step
        const clickable  = s.id <= step
        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', flex: i === STEPS.length - 1 ? 'unset' : 1, gap: 6 }}>
            <button
              onClick={() => clickable && onGoto(s.id)}
              disabled={!clickable}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'transparent', border: 'none', cursor: clickable ? 'pointer' : 'not-allowed', fontFamily: FONT,
              }}
            >
              <span style={{
                width: 24, height: 24, borderRadius: '50%',
                background: isComplete ? PRIMARY : isCurrent ? '#fff' : '#FAFBFD',
                color:      isComplete ? '#fff'   : isCurrent ? PRIMARY : '#8C8C8C',
                border:     `2px solid ${isCurrent || isComplete ? PRIMARY : '#dcdcdc'}`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
              }}>
                {isComplete ? '✓' : s.id}
              </span>
              <span style={{
                fontSize: 12, fontWeight: 600,
                color: isCurrent ? PRIMARY : isComplete ? '#333333' : '#8C8C8C',
              }}>{s.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, background: isComplete ? PRIMARY : '#dcdcdc' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Steps ──────────────────────────────────────────────────────

function Field({ label, error, touched, children }) {
  const showError = error && touched
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: showError ? ERROR : '#8C8C8C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>{label}</div>
      {children}
      {showError && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, fontSize: 11, color: ERROR }}>
          <Warning size={11} weight="fill" /> {error}
        </div>
      )}
    </div>
  )
}

function Segmented({ options, active, onChange, getColor, getLabel }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {options.map(o => {
        const isActive = active === o
        const color = getColor ? getColor(o) : PRIMARY
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            style={{
              padding: '6px 14px', borderRadius: 8,
              border: '1px solid', borderColor: isActive ? color : '#dcdcdc',
              background: isActive ? color : '#fff',
              color: isActive ? '#fff' : '#333333',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FONT,
            }}
          >
            {getLabel ? getLabel(o) : o}
          </button>
        )
      })}
    </div>
  )
}

function selectStyle() {
  return {
    width: '100%', padding: '8px 12px', border: '1px solid #dcdcdc',
    borderRadius: 8, fontSize: 13, color: '#333333', background: '#fff', fontFamily: FONT,
  }
}
function inputStyle() { return selectStyle() }

// Step 1 — Details
function Step1({ form, set, errors, touched, mark, workoutsForType, coachesForType, t }) {
  return (
    <>
      <Field label="Workout Type" error={errors.type} touched={touched.type}>
        <Segmented
          options={WORKOUT_TYPES.map(t => t.short)}
          active={form.type}
          onChange={(v) => { set({ type: v, workoutId: '', coachId: '' }); mark('type') }}
          getLabel={(s) => getWorkoutType(s).label}
          getColor={(s) => getWorkoutType(s).color}
        />
      </Field>

      <Field label="Workout" error={errors.workoutId} touched={touched.workoutId}>
        <select value={form.workoutId} onChange={e => { set({ workoutId: e.target.value }); mark('workoutId') }}
          disabled={!form.type} style={{ ...selectStyle(), opacity: form.type ? 1 : 0.5 }}>
          <option value="">{form.type ? 'Choose a workout…' : 'Choose a workout type first'}</option>
          {workoutsForType.map(w => (
            <option key={w.id} value={w.id}>{w.name} · {w.duration}min</option>
          ))}
        </select>
      </Field>

      <Field label="Coach" error={errors.coachId} touched={touched.coachId}>
        <select value={form.coachId} onChange={e => { set({ coachId: e.target.value }); mark('coachId') }}
          disabled={!form.type} style={{ ...selectStyle(), opacity: form.type ? 1 : 0.5 }}>
          <option value="">{form.type ? `Choose a ${t?.label} coach…` : 'Choose a workout type first'}</option>
          {coachesForType.map(c => (
            <option key={c.id} value={c.id}>{c.name} · ★ {c.rating}</option>
          ))}
        </select>
        {form.type && coachesForType.length === 0 && (
          <div style={{ fontSize: 11, color: '#8C8C8C', marginTop: 6 }}>No coaches certified for {t?.label} yet.</div>
        )}
      </Field>

      <Field label="Difficulty (Zone)" error={errors.zone} touched={touched.zone}>
        <Segmented
          options={ZONES.map(z => z.id)}
          active={Number(form.zone) || ''}
          onChange={(v) => { set({ zone: v }); mark('zone') }}
          getLabel={(id) => `Z${id} · ${ZONES.find(z => z.id === id).label}`}
          getColor={(id) => ZONES.find(z => z.id === id).color}
        />
      </Field>
    </>
  )
}

// Step 2 — When
function Step2({ form, set, errors, touched, mark }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Date" error={errors.date} touched={touched.date}>
          <input type="date" value={form.date} onChange={e => { set({ date: e.target.value }); mark('date') }} style={inputStyle()} />
        </Field>
        <Field label="Start time" error={errors.time} touched={touched.time}>
          <input type="time" value={form.time} onChange={e => { set({ time: e.target.value }); mark('time') }} style={inputStyle()} />
        </Field>
      </div>

      <Field label="Duration" error={errors.duration} touched={touched.duration}>
        <Segmented
          options={DURATION_OPTIONS}
          active={form.duration}
          onChange={(v) => { set({ duration: v, customDuration: v === 'Custom' ? form.customDuration : '' }); mark('duration') }}
          getLabel={(o) => o === 'Custom' ? 'Custom' : `${o} min`}
        />
        {form.duration === 'Custom' && (
          <input type="number" min="1" placeholder="Minutes"
            value={form.customDuration}
            onChange={e => { set({ customDuration: e.target.value }); mark('duration') }}
            style={{ ...inputStyle(), marginTop: 8, maxWidth: 160 }} />
        )}
      </Field>

      <Field label="Recurring class">
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input type="checkbox" checked={form.recurring} onChange={e => set({ recurring: e.target.checked })} />
          <span style={{ fontSize: 13, color: '#333333' }}>Repeat this class on a schedule</span>
        </label>
      </Field>

      {form.recurring && (
        <div style={{ marginLeft: 8, paddingLeft: 14, borderLeft: `2px solid ${PRIMARY}40` }}>
          <Field label="Frequency">
            <Segmented options={['weekly', 'monthly']} active={form.frequency}
              onChange={(v) => set({ frequency: v })}
              getLabel={(v) => v.charAt(0).toUpperCase() + v.slice(1)} />
          </Field>

          {form.frequency === 'weekly' && (
            <Field label="Days of week" error={errors.daysOfWeek} touched={touched.daysOfWeek || form.daysOfWeek.length > 0}>
              <div style={{ display: 'flex', gap: 6 }}>
                {DAY_KEYS.map((d, i) => {
                  const on = form.daysOfWeek.includes(d)
                  return (
                    <button key={d} onClick={() => {
                      const next = on ? form.daysOfWeek.filter(x => x !== d) : [...form.daysOfWeek, d]
                      set({ daysOfWeek: next })
                      mark('daysOfWeek')
                    }} style={{
                      width: 32, height: 32, borderRadius: 8,
                      border: '1px solid', borderColor: on ? PRIMARY : '#dcdcdc',
                      background: on ? PRIMARY : '#fff', color: on ? '#fff' : '#333333',
                      fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: FONT,
                    }}>{DAY_LABELS[i]}</button>
                  )
                })}
              </div>
            </Field>
          )}

          <Field label="End">
            <Segmented options={['date', 'count']} active={form.endMode}
              onChange={(v) => set({ endMode: v })}
              getLabel={(v) => v === 'date' ? 'By date' : 'After N occurrences'} />
            {form.endMode === 'date' ? (
              <input type="date" value={form.endDate}
                onChange={e => { set({ endDate: e.target.value }); mark('endDate') }}
                style={{ ...inputStyle(), marginTop: 8, maxWidth: 200 }} />
            ) : (
              <input type="number" min="1" value={form.endCount}
                onChange={e => { set({ endCount: e.target.value }); mark('endCount') }}
                style={{ ...inputStyle(), marginTop: 8, maxWidth: 140 }} />
            )}
            {(touched.endDate && errors.endDate) && <InlineErr msg={errors.endDate} />}
            {(touched.endCount && errors.endCount) && <InlineErr msg={errors.endCount} />}
          </Field>
        </div>
      )}
    </>
  )
}

// Step 3 — Where & Capacity
function Step3({ form, set, errors, touched, mark, selectedRoom, durationMin }) {
  return (
    <>
      <Field label="Room" error={errors.roomId} touched={touched.roomId}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ALL_ROOMS.map(r => {
            const booked = isRoomBooked(r.name, form.date, form.time, durationMin)
            const isActive = String(form.roomId) === String(r.id)
            return (
              <button key={r.id}
                onClick={() => { if (!booked) { set({ roomId: r.id, maxCapacity: r.stationCount }); mark('roomId') } }}
                disabled={booked}
                title={booked ? 'Booked at this time' : ''}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', borderRadius: 8,
                  border: '1px solid', borderColor: isActive ? PRIMARY : '#dcdcdc',
                  background: isActive ? PRIMARY + '12' : booked ? '#FAFBFD' : '#fff',
                  cursor: booked ? 'not-allowed' : 'pointer',
                  opacity: booked ? 0.55 : 1,
                  fontFamily: FONT, textAlign: 'left',
                }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#333333' }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: '#8C8C8C' }}>{r.dimensions} · {r.stationCount} stations</div>
                </div>
                {booked && (
                  <span style={{ fontSize: 11, color: ERROR, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Warning size={11} weight="fill" /> Booked
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Min capacity" error={errors.minCapacity} touched={touched.minCapacity}>
          <input type="number" min="1" value={form.minCapacity}
            onChange={e => { set({ minCapacity: e.target.value }); mark('minCapacity') }}
            style={inputStyle()} />
        </Field>
        <Field label="Max capacity" error={errors.maxCapacity} touched={touched.maxCapacity}>
          <input type="number" min="1" max={selectedRoom?.stationCount}
            value={form.maxCapacity}
            onChange={e => { set({ maxCapacity: e.target.value }); mark('maxCapacity') }}
            style={inputStyle()} />
          {selectedRoom && (
            <div style={{ fontSize: 11, color: '#8C8C8C', marginTop: 5 }}>
              Room has {selectedRoom.stationCount} stations.
            </div>
          )}
        </Field>
      </div>
    </>
  )
}

// Step 4 — Review
function Step4({ form, setStep, t, zone, selectedWorkout, selectedCoach, selectedRoom, durationMin }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ReviewGroup title="Details" onEdit={() => setStep(1)}>
        <ReviewRow label="Workout Type">
          <span style={{ background: t.bg, color: t.color, border: `1px solid ${t.border}`, borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>{t.label}</span>
        </ReviewRow>
        <ReviewRow label="Workout" value={selectedWorkout?.name} />
        <ReviewRow label="Coach"   value={selectedCoach?.name} />
        <ReviewRow label="Difficulty">
          {zone && <span style={{ background: zone.bg, color: zone.color, border: `1px solid ${zone.color}40`, borderRadius: 999, padding: '3px 10px', fontSize: 12, fontWeight: 700 }}>Zone {zone.id} · {zone.label}</span>}
        </ReviewRow>
      </ReviewGroup>

      <ReviewGroup title="When" onEdit={() => setStep(2)}>
        <ReviewRow label="Date" value={form.date} />
        <ReviewRow label="Time" value={`${form.time} (${durationMin} min)`} />
        {form.recurring && (
          <ReviewRow label="Recurring" value={
            form.frequency === 'weekly'
              ? `Weekly · ${form.daysOfWeek.map(d => DAY_LABELS[d]).join(' ')} · ${form.endMode === 'date' ? `until ${form.endDate}` : `${form.endCount} times`}`
              : `Monthly · ${form.endMode === 'date' ? `until ${form.endDate}` : `${form.endCount} times`}`
          } />
        )}
      </ReviewGroup>

      <ReviewGroup title="Where & Capacity" onEdit={() => setStep(3)}>
        <ReviewRow label="Room"     value={selectedRoom?.name} />
        <ReviewRow label="Capacity" value={`${form.minCapacity}–${form.maxCapacity} trainees`} />
      </ReviewGroup>
    </div>
  )
}

function ReviewGroup({ title, onEdit, children }) {
  return (
    <div style={{ background: '#FAFBFD', border: '1px solid #dcdcdc', borderRadius: 10, padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#333333' }}>{title}</div>
        <button onClick={onEdit} style={{ background: 'transparent', border: 'none', color: PRIMARY, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: FONT }}>
          <PencilSimple size={12} /> Edit
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{children}</div>
    </div>
  )
}

function ReviewRow({ label, value, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <span style={{ fontSize: 12, color: '#8C8C8C' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#333333' }}>{children ?? value ?? '—'}</span>
    </div>
  )
}

function InlineErr({ msg }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 5, fontSize: 11, color: ERROR }}><Warning size={11} weight="fill" /> {msg}</div>
}
