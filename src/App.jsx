import { useState, useCallback, useEffect } from 'react'
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
import WarmUpTraining from './pages/WarmUpTraining'
import DemoPrep from './pages/DemoPrep'
import InRest from './pages/InRest'
import GoalNotAchieved from './pages/GoalNotAchieved'
import DuringExercise2 from './pages/DuringExercise2'
import TraineeDuringExercise from './pages/TraineeDuringExercise'

const STUDIO_SCREENS = [
  { id: 'high-level',           label: '1. High Level',          component: HighLevelTraining },
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

const TRAINEE_SCREENS = [
  { id: 'trainee-exercise', label: '6. During Exercise', component: TraineeDuringExercise },
]

const VIEWS = [
  { id: 'studio',  label: 'Studio' },
  { id: 'trainee', label: 'Trainee' },
  { id: 'coach',   label: 'Coach' },
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

  const cssFilter = PALETTES.find(p => p.id === activePalette)?.filter ?? ''

  const FLOW = activeView === 'studio' ? STUDIO_SCREENS
    : activeView === 'trainee' ? TRAINEE_SCREENS
    : []

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
    if (activeView === 'trainee') setActiveScreen('trainee-exercise')
    else if (activeView === 'studio') setActiveScreen('high-level')
  }, [activeView])

  const Screen = FLOW.length > 0
    ? (FLOW.find(s => s.id === activeScreen)?.component ?? FLOW[0].component)
    : () => <Placeholder view={activeView === 'trainee' ? 'Trainee' : 'Coach'} />

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
          <ChangelogPanel />
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
      <div className="pt-[76px]" style={{ filter: cssFilter || undefined }}>
        <Screen />
      </div>
    </div>
  )
}
