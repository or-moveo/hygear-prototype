import { useState, useCallback, useEffect, useRef } from 'react'
import { X, ArrowsOut, ArrowsIn } from '@phosphor-icons/react'
import SettingsPanel, { PALETTES } from './components/SettingsPanel'
import ChangelogPanel from './components/ChangelogPanel'
import StudioDashboard from './pages/StudioDashboard'
import DuringExercise from './pages/DuringExercise'
import DuringExerciseAfterTransition from './pages/DuringExerciseAfterTransition'
import LastExercise from './pages/LastExercise'
import Cooldown from './pages/Cooldown'
import TrainingCompleted from './pages/TrainingCompleted'
import EquipmentTransition from './pages/EquipmentTransition'
import HighLevelTraining from './pages/HighLevelTraining'
import HighLevelTraining2 from './pages/HighLevelTraining2'
import WarmUpTraining from './pages/WarmUpTraining'
import DemoPrep from './pages/DemoPrep'
import InRest from './pages/InRest'
import GoalNotAchieved from './pages/GoalNotAchieved'
import DuringExercise2 from './pages/DuringExercise2'
import TraineeDuringExercise from './pages/TraineeDuringExercise'
import TraineeInRest from './pages/TraineeInRest'

const STUDIO_SCREENS = [
  { id: 'high-level',           label: '1. High Level',          component: HighLevelTraining2 },
  { id: 'warmup',               label: '2. Warm-Up',             component: WarmUpTraining },
  { id: 'demo-prep',            label: '3. Demo & Prep',         component: DemoPrep },
  { id: 'rest',                 label: '4. In Rest',             component: StudioDashboard },
  { id: 'rest-2',               label: '5. In Rest 2',           component: InRest },
  { id: 'exercise',             label: '6. During Exercise',     component: DuringExercise },
  { id: 'exercise-2',           label: '6b. During Exercise 2',  component: DuringExercise2 },
  { id: 'equipment-transition', label: '7. Equipment Transition',component: EquipmentTransition },
  { id: 'exercise-after',       label: '8. After Transition',    component: DuringExerciseAfterTransition },
  { id: 'last-exercise',        label: '9. Last Exercise',       component: LastExercise },
  { id: 'cooldown',             label: '10. Cooldown',           component: Cooldown },
  { id: 'training-completed',   label: '11. Goal Achieved',      component: TrainingCompleted },
  { id: 'goal-not-achieved',    label: '12. Goal Not Achieved',  component: GoalNotAchieved },
]

const VIEWS = [
  { id: 'studio',     label: 'Studio' },
  { id: 'trainee',    label: 'Trainee' },
  { id: 'coach',      label: 'Coach' },
  { id: 'backoffice', label: 'Backoffice Studio' },
]

const Placeholder = ({ view }) => (
  <div className="min-h-screen bg-[#f2f2f5] flex items-center justify-center">
    <div className="text-center font-poppins">
      <p className="text-5xl font-bold text-[#334367] mb-4">{view}</p>
      <p className="text-xl text-gray-500">Screens coming soon</p>
    </div>
  </div>
)

export default function App() {
  const [activeView, setActiveView] = useState('studio')
  const [activeScreen, setActiveScreen] = useState('high-level')
  const [activePalette, setActivePalette] = useState('green')
  const [viewingVersion, setViewingVersion] = useState(null) // { version, label, commit, ... }
  const [overlayExpanded, setOverlayExpanded] = useState(false)

  const cssFilter = PALETTES.find(p => p.id === activePalette)?.filter ?? ''

  const FLOW = STUDIO_SCREENS

  // Keyboard navigation
  const navigate = useCallback((dir) => {
    const currentIdx = FLOW.findIndex(s => s.id === activeScreen)
    const nextIdx = currentIdx + dir
    if (nextIdx >= 0 && nextIdx < FLOW.length) setActiveScreen(FLOW[nextIdx].id)
  }, [FLOW, activeScreen])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate])

  // Set default screen when switching views
  useEffect(() => {
    setActiveScreen('high-level')
  }, [activeView])

  const viewLabel = activeView === 'trainee' ? 'Trainee' : activeView === 'coach' ? 'Coach' : activeView === 'backoffice' ? 'Backoffice Studio' : ''
  const TRAINEE_COMPONENTS = { 'rest': TraineeInRest }
  const Screen = activeView === 'studio'
    ? (FLOW.find(s => s.id === activeScreen)?.component ?? FLOW[0].component)
    : activeView === 'trainee' && TRAINEE_COMPONENTS[activeScreen]
      ? TRAINEE_COMPONENTS[activeScreen]
      : () => <Placeholder view={viewLabel} />

  return (
    <div>
      {/* Row 1: View selector */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a2e] flex gap-1 px-2 pt-2 pb-0">
        {VIEWS.map(v => (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id)}
            className={`px-5 py-1.5 rounded-t text-sm font-poppins font-semibold whitespace-nowrap transition-colors ${
              activeView === v.id
                ? 'bg-black/80 text-white'
                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
            }`}
          >
            {v.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1 pb-1">
          <ChangelogPanel onViewVersion={(entry) => { setViewingVersion(entry); setOverlayExpanded(false) }} />
          <SettingsPanel activePaletteId={activePalette} onPaletteChange={setActivePalette} />
        </div>
      </div>

      {/* Row 2: Screen tabs */}
      <nav
        className="fixed top-[38px] left-0 right-0 z-50 bg-black/80 flex gap-2 p-2 overflow-x-auto"
        style={{ filter: cssFilter || undefined }}
      >
        {FLOW.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveScreen(s.id)}
            disabled={FLOW.length === 0}
            className={`px-3 py-1 rounded text-sm font-poppins whitespace-nowrap transition-colors ${
              FLOW.length === 0
                ? 'bg-white/10 text-white/30 cursor-default'
                : activeScreen === s.id
                  ? 'bg-[#43a77c] text-white'
                  : 'bg-white/20 text-white hover:bg-white/40'
            }`}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="flex items-center justify-center" style={{ filter: cssFilter || undefined, padding: '120px 0 48px' }}>
        <div style={{ width: '100%' }}>
          <Screen />
        </div>
      </div>

      {/* Version overlay — rendered at root level to avoid CSS filter stacking context issues */}
      {viewingVersion && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-[#0d0d1a]">
          {/* Overlay header */}
          <div className="flex items-center gap-3 px-4 h-11 bg-[#1a1a2e] border-b border-white/10 flex-shrink-0">
            <span className="text-xs font-poppins font-bold px-2 py-0.5 rounded bg-white/15 text-white/60">
              {viewingVersion.version}
            </span>
            <span className="text-sm font-poppins font-semibold text-white">
              {viewingVersion.label}
            </span>
            <span className="text-[11px] font-mono text-white/30 ml-1">
              {viewingVersion.commit}
            </span>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setOverlayExpanded(e => !e)}
                className="flex items-center justify-center w-7 h-7 rounded bg-white/10 hover:bg-white/20 transition-colors"
                title={overlayExpanded ? 'Restore' : 'Expand'}
              >
                {overlayExpanded
                  ? <ArrowsIn size={14} className="text-white/60" />
                  : <ArrowsOut size={14} className="text-white/60" />
                }
              </button>
              <button
                onClick={() => setViewingVersion(null)}
                className="flex items-center justify-center w-7 h-7 rounded bg-white/10 hover:bg-white/20 transition-colors"
                title="Close"
              >
                <X size={14} className="text-white/60" />
              </button>
            </div>
          </div>

          {/* iframe */}
          <div className="flex-1 relative">
            {overlayExpanded ? (
              <iframe
                key={viewingVersion.version}
                src={`/versions/${viewingVersion.version}/`}
                className="absolute inset-0 w-full h-full border-0"
                title={`${viewingVersion.version} — ${viewingVersion.label}`}
              />
            ) : (
              <div className="absolute inset-0 flex">
                {/* iframe at 75% width */}
                <iframe
                  key={viewingVersion.version}
                  src={`/versions/${viewingVersion.version}/`}
                  className="flex-1 h-full border-0"
                  title={`${viewingVersion.version} — ${viewingVersion.label}`}
                />
              </div>
            )}

            {/* Not-built notice — shown when iframe fails to load */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: -1 }}
            >
              <div className="text-center">
                <p className="text-white/30 text-sm font-poppins mb-2">
                  Version not built yet
                </p>
                <p className="text-white/20 text-xs font-mono">
                  Run: npm run build:versions
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
