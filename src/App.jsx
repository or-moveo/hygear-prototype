import { useState, useCallback, useEffect, useRef } from 'react'
import { X, ArrowsOut, ArrowsIn, CheckFat } from '@phosphor-icons/react'
import GoalCompletePopup from './components/GoalCompletePopup'
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
import BlockPreview from './pages/BlockPreview'
import WarmUpTraining from './pages/WarmUpTraining'
import DemoPrep from './pages/DemoPrep'
import DemoPrepDashboard from './pages/DemoPrepDashboard'
import DemoPrepVideo from './pages/DemoPrepVideo'
import InRest from './pages/InRest'
import GoalNotAchieved from './pages/GoalNotAchieved'
import DuringExercise2 from './pages/DuringExercise2'
import TraineeDuringExercise from './pages/TraineeDuringExercise'
import TraineeInRest from './pages/TraineeInRest'
import BODashboard from './pages/backoffice/BODashboard'
import BOSchedule from './pages/backoffice/BOSchedule'
import BOClassDetail from './pages/backoffice/BOClassDetail'
import BOLiveSession from './pages/backoffice/BOLiveSession'
import BOPostSession from './pages/backoffice/BOPostSession'
import BOStudioSetup from './pages/backoffice/BOStudioSetup'
import BOCoaches from './pages/backoffice/BOCoaches'
import BOWorkouts from './pages/backoffice/BOWorkouts'
import WarmupTopContributors from './pages/WarmupTopContributors'
import PrimeTarget from './pages/PrimeTarget'
import HygearAppShell from './pages/backoffice-hygear/HygearAppShell'

const STUDIO_SCREENS = [
  { id: 'dp-dashboard',         label: 'Dashboard',              component: DemoPrepDashboard,   group: 'Demo & Prep', groupStart: true },
  { id: 'dp-video',             label: 'Video',                  component: DemoPrepVideo,       group: 'Demo & Prep', groupEnd: true },
  { id: 'high-level-shield',    label: '1. SHIELD Prime',        component: HighLevelTraining2, props: { variant: 'SHIELD' } },
  { id: 'high-level-burn',      label: '1b. BURN Prime',         component: HighLevelTraining2, props: { variant: 'BURN' } },
  { id: 'high-level-build',     label: '1c. BUILD Prime',        component: HighLevelTraining2, props: { variant: 'BUILD' } },
  { id: 'block-preview',        label: '2. Block Preview',       component: BlockPreview,           group: 'Warmup Block', groupStart: true, zoneIdx: 0, anchorImage: '/assets/anchor-point.png' },
  { id: 'demo-prep',            label: '3. Before Warmup',       component: DemoPrep,               group: 'Warmup Block',                             zoneIdx: 0 },
  { id: 'warmup',               label: '4. Warmup #1',           component: WarmUpTraining,         group: 'Warmup Block',                             zoneIdx: 0 },
  { id: 'rest-2',               label: '5. Warmup #2',           component: StudioDashboard,        group: 'Warmup Block',                             zoneIdx: 0 },
  { id: 'warmup-top',           label: '6. Warmup #3',           component: WarmupTopContributors,  group: 'Warmup Block',   groupEnd: true,            zoneIdx: 0 },
  { id: 'dyn-block-preview',    label: '7. Block Preview',       component: BlockPreview,           group: 'Holds Isometric',  groupStart: true, zoneIdx: 3, anchorImage: '/assets/anchor-point.png' },
  { id: 'dyn-demo-prep',        label: '8. Before Dynamic',      component: DemoPrep,               group: 'Holds Isometric',                             zoneIdx: 3 },
  { id: 'dyn-warmup-1',         label: '9. Dynamic #1',          component: WarmUpTraining,         group: 'Holds Isometric',                             zoneIdx: 3 },
  { id: 'dyn-warmup-2',         label: '10. Dynamic #2',         component: StudioDashboard,        group: 'Holds Isometric',                             zoneIdx: 3 },
  { id: 'dyn-warmup-3',         label: '11. Dynamic #3',         component: WarmupTopContributors,  group: 'Holds Isometric',                             zoneIdx: 3 },
  { id: 'prime-build-target',   label: '12. Prime Build Target', component: PrimeTarget,            group: 'Holds Isometric',                             zoneIdx: 3, props: { variant: 'BUILD' } },
  { id: 'prime-burn-target',    label: '13. Prime Burn Target',  component: PrimeTarget,            group: 'Holds Isometric',                             zoneIdx: 3, props: { variant: 'BURN' } },
  { id: 'prime-burn-shield',    label: '14. Prime Burn Shield',  component: PrimeTarget,            group: 'Holds Isometric',                             zoneIdx: 3, props: { variant: 'SHIELD' } },
  { id: 'dyn-equip-transition', label: '15. Equipment Transition', component: EquipmentTransition,  group: 'Holds Isometric',                             zoneIdx: 3 },
  { id: 'dyn-during-exercise',  label: '16. During Exercise',    component: StudioDashboard,        group: 'Holds Isometric',  groupEnd: true,             zoneIdx: 3 },
  { id: 'allout-block-preview',    label: '17. Block Preview',      component: BlockPreview,           group: 'All Out', groupStart: true, zoneIdx: 4, anchorImage: '/assets/anchor-point.png' },
  { id: 'allout-demo-prep',        label: '18. Before All Out',     component: DemoPrep,               group: 'All Out',                   zoneIdx: 4 },
  { id: 'allout-1',                label: '19. All Out #1',         component: WarmUpTraining,         group: 'All Out',                   zoneIdx: 4 },
  { id: 'allout-2',                label: '20. All Out #2',         component: StudioDashboard,        group: 'All Out',                   zoneIdx: 4 },
  { id: 'allout-3',                label: '21. All Out #3',         component: WarmupTopContributors,  group: 'All Out',                   zoneIdx: 4 },
  { id: 'allout-equip-transition', label: '22. Equipment Transition', component: EquipmentTransition,  group: 'All Out',                   zoneIdx: 4 },
  { id: 'allout-during-exercise',  label: '23. During Exercise',    component: DuringExercise,         group: 'All Out',  groupEnd: true,   zoneIdx: 4 },
  { id: 'rest',                 label: '24. In Rest',            component: StudioDashboard },
  { id: 'block',                label: '24b. Block',             component: () => null },
  { id: 'exercise',             label: '25. During Exercise',    component: DuringExercise },
  { id: 'exercise-2',           label: '25b. During Exercise 2', component: DuringExercise2 },
  { id: 'equipment-transition', label: '26. Equipment Transition',component: EquipmentTransition },
  { id: 'exercise-after',       label: '27. After Transition',   component: DuringExerciseAfterTransition },
  { id: 'last-exercise',        label: '28. Last Exercise',      component: LastExercise },
  { id: 'cooldown',             label: '29. Cooldown',           component: Cooldown },
  { id: 'training-completed',   label: '30. Goal Achieved',      component: TrainingCompleted },
  { id: 'goal-not-achieved',    label: '31. Goal Not Achieved',  component: GoalNotAchieved },
]

const BACKOFFICE_SCREENS = [
  { id: 'bo-dashboard',     label: '1. Dashboard',      component: BODashboard },
  { id: 'bo-schedule',      label: '2. Schedule',       component: BOSchedule },
  { id: 'bo-class-detail',  label: '3. Class Detail',   component: BOClassDetail },
  { id: 'bo-live-session',  label: '4. Live Session',   component: BOLiveSession },
  { id: 'bo-post-session',  label: '5. Post-Session',   component: BOPostSession },
  { id: 'bo-studio-setup',  label: '6. Studio Setup',   component: BOStudioSetup },
  { id: 'bo-coaches',       label: '7. Coaches',        component: BOCoaches },
  { id: 'bo-workouts',      label: '8. Workouts',       component: BOWorkouts },
]

const VIEWS = [
  { id: 'studio',            label: 'Studio' },
  { id: 'trainee',           label: 'Trainee' },
  { id: 'coach',             label: 'Coach' },
  { id: 'backoffice',        label: 'Backoffice Studio' },
  { id: 'backoffice-hygear', label: 'Backoffice Studio (Hygear UI)' },
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
  const [activeScreen, setActiveScreen] = useState('high-level-shield')
  const [activePalette, setActivePalette] = useState('green')
  const [viewingVersion, setViewingVersion] = useState(null) // { version, label, commit, ... }
  const [overlayExpanded, setOverlayExpanded] = useState(false)
  const [goalPopupOpen, setGoalPopupOpen] = useState(false)

  const cssFilter = PALETTES.find(p => p.id === activePalette)?.filter ?? ''

  const isBackoffice = activeView === 'backoffice'
  const FLOW = isBackoffice ? BACKOFFICE_SCREENS : STUDIO_SCREENS

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
    if (activeView === 'backoffice-hygear') return
    setActiveScreen(activeView === 'backoffice' ? 'bo-dashboard' : 'high-level-shield')
  }, [activeView])

  const viewLabel = activeView === 'trainee' ? 'Trainee' : activeView === 'coach' ? 'Coach' : isBackoffice ? (activeView === 'backoffice-hygear' ? 'Backoffice Studio (Hygear UI)' : 'Backoffice Studio') : ''
  const TRAINEE_COMPONENTS = { 'rest': TraineeInRest, 'exercise': TraineeDuringExercise }
  const Screen = activeView === 'backoffice-hygear'
    ? HygearAppShell
    : activeView === 'coach'
      ? () => <Placeholder view={viewLabel} />
      : activeView === 'trainee' && TRAINEE_COMPONENTS[activeScreen]
        ? TRAINEE_COMPONENTS[activeScreen]
        : (FLOW.find(s => s.id === activeScreen)?.component ?? FLOW[0].component)

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
          <button
            onClick={() => setGoalPopupOpen(true)}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-white/10 hover:bg-white/25 transition-colors"
            title="Finish session"
          >
            <CheckFat size={18} weight="bold" className="text-white" />
          </button>
          <ChangelogPanel onViewVersion={(entry) => { setViewingVersion(entry); setOverlayExpanded(false) }} />
          <SettingsPanel activePaletteId={activePalette} onPaletteChange={setActivePalette} />
        </div>
      </div>

      {/* Row 2: Screen tabs */}
      {(activeView === 'studio' || isBackoffice || activeView === 'trainee') && <nav
        className="fixed top-[38px] left-0 right-0 z-50 bg-black/80 flex items-end gap-2 p-2 overflow-x-auto min-h-[100px]"
        style={{ filter: cssFilter || undefined }}
      >
        {(() => {
          const elements = []
          let groupBuffer = []

          const flushGroup = (groupName) => {
            if (!groupBuffer.length) return
            elements.push(
              <div key={`group-${groupName}`} className="flex flex-col gap-[4px]">
                <span className="text-[15px] font-poppins font-bold uppercase tracking-[0.15em] text-[#43a77c] text-center">
                  ── {groupName} ──
                </span>
                <div className="flex gap-2 px-2 py-[5px] rounded-lg" style={{ background: 'rgba(67,167,124,0.18)', border: '2px solid rgba(67,167,124,0.45)' }}>
                  {groupBuffer.splice(0)}
                </div>
              </div>
            )
          }

          FLOW.forEach(s => {
            const btn = (
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
            )

            if (s.group) {
              groupBuffer.push(btn)
              if (s.groupEnd) flushGroup(s.group)
            } else {
              elements.push(btn)
            }
          })

          return elements
        })()}
      </nav>}

      {/* Content */}
      <div style={{ filter: cssFilter || undefined, paddingTop: activeView === 'backoffice-hygear' ? 38 : 140, paddingBottom: activeView === 'backoffice-hygear' ? 0 : 48, height: '100vh', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%' }}>
          {(() => {
            const entry = FLOW.find(s => s.id === activeScreen)
            return (
              <Screen
                onComplete={() => navigate(1)}
                zoneIdx={entry?.zoneIdx}
                anchorImage={entry?.anchorImage}
                onOpenGoalPopup={() => setGoalPopupOpen(true)}
                {...(entry?.props ?? {})}
              />
            )
          })()}
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
      {/* Goal Complete Popup */}
      {goalPopupOpen && <GoalCompletePopup onClose={() => setGoalPopupOpen(false)} />}
    </div>
  )
}
