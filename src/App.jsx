import { useState } from 'react'
import SettingsPanel, { PALETTES } from './components/SettingsPanel'
import StudioDashboard from './pages/StudioDashboard'
import DuringExercise from './pages/DuringExercise'
import DuringExerciseAfterTransition from './pages/DuringExerciseAfterTransition'
import LastExercise from './pages/LastExercise'
import Cooldown from './pages/Cooldown'
import TrainingCompleted from './pages/TrainingCompleted'
import EquipmentTransition from './pages/EquipmentTransition'
import HighLevelTraining from './pages/HighLevelTraining'
import WarmUpTraining from './pages/WarmUpTraining'
import GoalNotAchieved from './pages/GoalNotAchieved'

const FLOW = [
  { id: 'high-level',           label: '1. High Level',          component: HighLevelTraining },
  { id: 'warmup',               label: '2. Warm-Up',             component: WarmUpTraining },
  { id: 'rest',                 label: '3. In Rest',             component: StudioDashboard },
  { id: 'exercise',             label: '4. During Exercise',     component: DuringExercise },
  { id: 'equipment-transition', label: '5. Equipment Transition',component: EquipmentTransition },
  { id: 'exercise-after',       label: '6. After Transition',    component: DuringExerciseAfterTransition },
  { id: 'last-exercise',        label: '7. Last Exercise',       component: LastExercise },
  { id: 'cooldown',             label: '8. Cooldown',            component: Cooldown },
  { id: 'training-completed',   label: '9. Goal Achieved',       component: TrainingCompleted },
  { id: 'goal-not-achieved',    label: '10. Goal Not Achieved',  component: GoalNotAchieved },
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

  const hue = PALETTES.find(p => p.id === activePalette)?.hue ?? 0

  const Screen = activeView === 'studio'
    ? (FLOW.find(s => s.id === activeScreen)?.component ?? FLOW[0].component)
    : () => <Placeholder view={activeView === 'trainee' ? 'Trainee' : 'Coach'} />

  return (
    <div style={{ filter: hue !== 0 ? `hue-rotate(${hue}deg)` : undefined }}>
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
        {/* Settings button — far right */}
        <div className="ml-auto flex items-center pb-1">
          <SettingsPanel activePaletteId={activePalette} onPaletteChange={setActivePalette} />
        </div>
      </div>

      {/* Row 2: Screen tabs */}
      <nav className="fixed top-[38px] left-0 right-0 z-50 bg-black/80 flex gap-2 p-2 overflow-x-auto">
        {FLOW.map(s => (
          <button
            key={s.id}
            onClick={() => { setActiveScreen(s.id) }}
            disabled={activeView !== 'studio'}
            className={`px-3 py-1 rounded text-sm font-poppins whitespace-nowrap transition-colors ${
              activeView !== 'studio'
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

      <div className="pt-[76px]">
        <Screen />
      </div>
    </div>
  )
}
