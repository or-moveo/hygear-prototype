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
import TraineeHighLevelTraining from './pages/TraineeHighLevelTraining'
import TraineeBlockPreview from './pages/TraineeBlockPreview'
import TraineeDemoPrep from './pages/TraineeDemoPrep'
import TraineeEquipmentTransition from './pages/TraineeEquipmentTransition'
import TraineeTrainingStopped from './pages/TraineeTrainingStopped'
import TraineeCounting from './pages/TraineeCounting'
import TraineeGoalAchievedDuringTraining from './pages/TraineeGoalAchievedDuringTraining'
import TraineeTypesOfTraining from './pages/TraineeTypesOfTraining'
import TraineeBuildAlert from './pages/TraineeBuildAlert'
import TraineeBlockSummary from './pages/TraineeBlockSummary'
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
import EndOfSession from './pages/EndOfSession'
import TrainingStopped from './pages/TrainingStopped'
import Counting from './pages/Counting'
import GoalAchievedDuringTraining from './pages/GoalAchievedDuringTraining'
import HygearAppShell from './pages/backoffice-hygear/HygearAppShell'

const STUDIO_SCREENS = [
  { id: 'high-level-shield',    label: '1. Prime SHIELD',        component: HighLevelTraining2, props: { variant: 'SHIELD' } },
  { id: 'high-level-burn',      label: '1b. Prime BURN',         component: HighLevelTraining2, props: { variant: 'BURN' } },
  { id: 'high-level-build',     label: '1c. Prime BUILD',        component: HighLevelTraining2, props: { variant: 'BUILD' } },
  { id: 'dp-dashboard',         label: 'Dashboard',              component: DemoPrepDashboard,   group: 'Demo & Prep', groupStart: true },
  { id: 'dp-video',             label: 'Video',                  component: DemoPrepVideo,       group: 'Demo & Prep', groupEnd: true },
  { id: 'block-preview',        label: '2. Block Preview',       component: BlockPreview,           group: 'Warmup Block', groupStart: true, zoneIdx: 0, anchorImage: '/assets/anchor-point.png' },
  { id: 'demo-prep',            label: '3. Before Warmup',       component: DemoPrep,               group: 'Warmup Block',                             zoneIdx: 0 },
  { id: 'warmup',               label: '4. Warmup #1',           component: WarmUpTraining,         group: 'Warmup Block',                             zoneIdx: 0 },
  { id: 'rest-2',               label: '5. Warmup #2',           component: StudioDashboard,        group: 'Warmup Block',   groupEnd: true,            zoneIdx: 0 },
  { id: 'dyn-block-preview',    label: '7. Block Preview',       component: BlockPreview,           group: 'Holds Isometric',  groupStart: true, zoneIdx: 3, anchorImage: '/assets/anchor-point.png' },
  { id: 'dyn-demo-prep',        label: '8. Before Dynamic',      component: DemoPrep,               group: 'Holds Isometric',                             zoneIdx: 3 },
  { id: 'dyn-warmup-1',         label: '9. Dynamic #1',          component: WarmUpTraining,         group: 'Holds Isometric',                             zoneIdx: 3 },
  { id: 'dyn-warmup-2',         label: '10. Dynamic #2',         component: StudioDashboard,        group: 'Holds Isometric',                             zoneIdx: 3 },
  { id: 'prime-build-target',   label: '12. Prime Build Target', component: PrimeTarget,            group: 'Holds Isometric',                             zoneIdx: 3, props: { variant: 'BUILD' } },
  { id: 'prime-burn-target',    label: '13. Prime Burn Target',  component: PrimeTarget,            group: 'Holds Isometric',                             zoneIdx: 3, props: { variant: 'BURN' } },
  { id: 'prime-burn-shield',    label: '14. Prime Shield Target',  component: PrimeTarget,            group: 'Holds Isometric',                             zoneIdx: 3, props: { variant: 'SHIELD' } },
  { id: 'dyn-equip-transition', label: '15. Equipment Transition', component: EquipmentTransition,  group: 'Holds Isometric',                             zoneIdx: 3 },
  { id: 'dyn-during-exercise',  label: '16. During Exercise',    component: StudioDashboard,        group: 'Holds Isometric',  groupEnd: true,             zoneIdx: 3 },
  { id: 'allout-block-preview',    label: '17. Block Preview',      component: BlockPreview,           group: 'All Out', groupStart: true, zoneIdx: 4, anchorImage: '/assets/anchor-point.png' },
  { id: 'allout-demo-prep',        label: '18. Before All Out',     component: DemoPrep,               group: 'All Out',                   zoneIdx: 4 },
  { id: 'allout-1',                label: '19. All Out #1',         component: WarmUpTraining,         group: 'All Out',                   zoneIdx: 4 },
  { id: 'allout-2',                label: '20. All Out #2',         component: StudioDashboard,        group: 'All Out',                   zoneIdx: 4 },
  { id: 'allout-equip-transition', label: '22. Equipment Transition - Inside Block', component: EquipmentTransition,  group: 'All Out',  groupEnd: true,   zoneIdx: 4 },
  { id: 'eos-build',  label: '23a. Build Goal Achieved',  component: EndOfSession, group: 'End of Session', groupStart: true, props: { variant: 'BUILD'  } },
  { id: 'eos-burn',   label: '23b. Burn Goal Achieved',   component: EndOfSession, group: 'End of Session',                   props: { variant: 'BURN'   } },
  { id: 'eos-shield', label: '23c. Shield Goal Achieved', component: EndOfSession, group: 'End of Session', groupEnd: true,   props: { variant: 'SHIELD' } },
  { id: 'training-stopped',     label: '23d. Training Stopped',  component: TrainingStopped, group: 'Training Stopped', groupStart: true },
  { id: 'counting',             label: 'Counting',               component: Counting,        group: 'Training Stopped', groupEnd: true },
  { id: 'goal-during-build',  label: 'Goal Achieved Prime Build',  component: GoalAchievedDuringTraining, group: 'The group goal was achieved - during training', groupStart: true, props: { variant: 'BUILD'  } },
  { id: 'goal-during-burn',   label: 'Goal Achieved Prime Burn',   component: GoalAchievedDuringTraining, group: 'The group goal was achieved - during training',                   props: { variant: 'BURN'   } },
  { id: 'goal-during-shield', label: 'Goal Achieved Prime Shield', component: GoalAchievedDuringTraining, group: 'The group goal was achieved - during training', groupEnd: true,   props: { variant: 'SHIELD' } },
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

  // Build the Trainee FLOW by removing groups + specific screens that aren't shown to trainees.
  // After filtering we re-derive the groupStart/groupEnd markers, since the original ones may
  // sit on screens we just removed (which would break the group-rendering logic in the navbar).
  const TRAINEE_EXCLUDED_GROUPS = new Set(['Demo & Prep', 'End of Session'])
  const TRAINEE_EXCLUDED_IDS = new Set([
    'warmup', 'rest-2',                                            // 4. Warmup #1 / 5. Warmup #2
    'dyn-warmup-1', 'dyn-warmup-2',                                // 9. Dynamic #1 / 10. Dynamic #2
    'prime-build-target', 'prime-burn-target', 'prime-burn-shield', // 12, 13, 14 Prime Targets
    'dyn-during-exercise',                                         // 16. During Exercise
    'allout-1', 'allout-2',                                        // 19. All Out #1 / 20. All Out #2
  ])
  // Rename groups for the Trainee interface only (Studio keeps the original names).
  const TRAINEE_GROUP_RENAMES = { 'Holds Isometric': 'Iron Wall' }
  // Trainee-only screens injected into the flow (not present in STUDIO_SCREENS).
  // "Types of training" is inserted before the "Warmup Block" group; the
  // "PRIME BUILD Alerts" group sits immediately after it.
  const TRAINEE_TYPES_SCREENS = [
    { id: 'types-shield', label: 'PRIME SHIELD Training', component: TraineeTypesOfTraining, group: 'Types of training', props: { variant: 'SHIELD' } },
    { id: 'types-build',  label: 'PRIME BUILD Training',  component: TraineeTypesOfTraining, group: 'Types of training', props: { variant: 'BUILD'  } },
    { id: 'types-burn',   label: 'PRIME BURN Training',   component: TraineeTypesOfTraining, group: 'Types of training', props: { variant: 'BURN'   } },
  ]
  const TRAINEE_BUILD_ALERTS_SCREENS = [
    { id: 'build-alert-1', label: 'PRIME BUILD - Decrease the pace',           component: TraineeBuildAlert, group: 'PRIME BUILD Alerts', props: { kind: 'slow-pace', variant: 'BUILD' } },
    { id: 'build-alert-2', label: 'PRIME BUILD - Increase the pace',           component: TraineeBuildAlert, group: 'PRIME BUILD Alerts', props: { kind: 'speed-up',  variant: 'BUILD' } },
    { id: 'build-alert-3', label: 'PRIME BUILD - Step away from anchor point', component: TraineeBuildAlert, group: 'PRIME BUILD Alerts', props: { kind: 'step-away', variant: 'BUILD' } },
    { id: 'build-alert-4', label: 'PRIME BUILD - Danger Zone: Reduce load',    component: TraineeBuildAlert, group: 'PRIME BUILD Alerts', props: { kind: 'danger',    variant: 'BUILD' } },
  ]
  const TRAINEE_BURN_ALERTS_SCREENS = [
    { id: 'burn-alert-1', label: 'PRIME BURN - Slow down',     component: TraineeBuildAlert, group: 'PRIME BURN Alerts',   props: { kind: 'slow-pace', variant: 'BURN'  } },
    { id: 'burn-alert-2', label: 'PRIME BURN - Increase the pace', component: TraineeBuildAlert, group: 'PRIME BURN Alerts',   props: { kind: 'speed-up',  variant: 'BURN'  } },
    { id: 'burn-alert-3', label: 'PRIME BURN - Stop activity but keep standing', component: TraineeBuildAlert, group: 'PRIME BURN Alerts', props: { kind: 'stop-stand', variant: 'BURN' } },
  ]
  const TRAINEE_SHIELD_ALERTS_SCREENS = [
    { id: 'shield-alert-1', label: 'PRIME SHIELD - Lean back',     component: TraineeBuildAlert, group: 'PRIME SHIELD Alerts', props: { kind: 'slow-pace', variant: 'SHIELD' } },
    { id: 'shield-alert-2', label: 'PRIME SHIELD - Stabilize now', component: TraineeBuildAlert, group: 'PRIME SHIELD Alerts', props: { kind: 'speed-up',  variant: 'SHIELD' } },
  ]
  const TRAINEE_BLOCK_SUMMARY_SCREENS = [
    { id: 'block-summary-burn',   label: 'PRIME BURN Block summary',   component: TraineeBlockSummary, group: 'Block summary', props: { variant: 'BURN'   } },
    { id: 'block-summary-build',  label: 'PRIME BUILD Block summary',  component: TraineeBlockSummary, group: 'Block summary', props: { variant: 'BUILD'  } },
    { id: 'block-summary-shield', label: 'PRIME SHIELD Block summary', component: TraineeBlockSummary, group: 'Block summary', props: { variant: 'SHIELD' } },
  ]
  const TRAINEE_TRAINING_SUMMARY_SCREENS = [
    { id: 'training-summary-burn',   label: 'PRIME BURN Training summary',   component: TraineeBlockSummary, group: 'Training summary', props: { variant: 'BURN'   } },
    { id: 'training-summary-build',  label: 'PRIME BUILD Training summary',  component: TraineeBlockSummary, group: 'Training summary', props: { variant: 'BUILD'  } },
    { id: 'training-summary-shield', label: 'PRIME SHIELD Training summary', component: TraineeBlockSummary, group: 'Training summary', props: { variant: 'SHIELD' } },
  ]
  const buildTraineeFlow = () => {
    const renamed = STUDIO_SCREENS
      .filter(s => !TRAINEE_EXCLUDED_GROUPS.has(s.group) && !TRAINEE_EXCLUDED_IDS.has(s.id))
      .map(s => s.group && TRAINEE_GROUP_RENAMES[s.group]
        ? { ...s, group: TRAINEE_GROUP_RENAMES[s.group] }
        : s
      )
    // Insert the trainee-only "Types of training" group immediately before "Warmup Block",
    // followed by "PRIME BUILD Alerts" → "PRIME BURN Alerts" → "PRIME SHIELD Alerts"
    // (still before "Warmup Block").
    const warmupIdx = renamed.findIndex(s => s.group === 'Warmup Block')
    const traineeOnly = [
      ...TRAINEE_TYPES_SCREENS,
      ...TRAINEE_BUILD_ALERTS_SCREENS,
      ...TRAINEE_BURN_ALERTS_SCREENS,
      ...TRAINEE_SHIELD_ALERTS_SCREENS,
    ]
    const withTraineeOnly = warmupIdx >= 0
      ? [...renamed.slice(0, warmupIdx), ...traineeOnly, ...renamed.slice(warmupIdx)]
      : [...traineeOnly, ...renamed]
    // Inject the "Block summary" group immediately after the "All Out" group.
    const lastAllOutIdx = (() => {
      let idx = -1
      withTraineeOnly.forEach((s, i) => { if (s.group === 'All Out') idx = i })
      return idx
    })()
    const filtered = lastAllOutIdx >= 0
      ? [
          ...withTraineeOnly.slice(0, lastAllOutIdx + 1),
          ...TRAINEE_BLOCK_SUMMARY_SCREENS,
          ...TRAINEE_TRAINING_SUMMARY_SCREENS,
          ...withTraineeOnly.slice(lastAllOutIdx + 1),
        ]
      : [...withTraineeOnly, ...TRAINEE_BLOCK_SUMMARY_SCREENS, ...TRAINEE_TRAINING_SUMMARY_SCREENS]
    // First/last index of each surviving group — used to repair groupStart/groupEnd markers
    // (the original boundary screens may have just been filtered out).
    const bounds = {}
    filtered.forEach((s, i) => {
      if (!s.group) return
      bounds[s.group] = bounds[s.group]
        ? { first: bounds[s.group].first, last: i }
        : { first: i, last: i }
    })
    return filtered.map((s, i) => {
      if (!s.group) return s
      const b = bounds[s.group]
      return { ...s, groupStart: i === b.first, groupEnd: i === b.last }
    })
  }
  const FLOW = isBackoffice
    ? BACKOFFICE_SCREENS
    : activeView === 'trainee'
      ? buildTraineeFlow()
      : STUDIO_SCREENS

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
  const TRAINEE_COMPONENTS = {
    'rest': TraineeInRest,
    'exercise': TraineeDuringExercise,
    'high-level-shield': TraineeHighLevelTraining,
    'high-level-burn':   TraineeHighLevelTraining,
    'high-level-build':  TraineeHighLevelTraining,
    // Block Preview screens — Trainee version uses a 1366×1024 frame with a white top bar.
    // zoneIdx is sourced automatically from the FLOW entry in the renderer below.
    'block-preview':        TraineeBlockPreview,
    'dyn-block-preview':    TraineeBlockPreview,
    'allout-block-preview': TraineeBlockPreview,
    // "Before X" screens (DemoPrep) — Trainee version stretches the Clock, Video, and
    // Training Structure cards vertically to fill the 1366×1024 frame.
    'demo-prep':         TraineeDemoPrep,
    'dyn-demo-prep':     TraineeDemoPrep,
    'allout-demo-prep':  TraineeDemoPrep,
    // Equipment Transition screens — Trainee version stretches the Timer card and the
    // Prep next device panel vertically to fill the 1366×1024 frame.
    'dyn-equip-transition':    TraineeEquipmentTransition,
    'allout-equip-transition': TraineeEquipmentTransition,
    // Training Stopped group — simple full-frame cards; outer card grows 888 → 1190
    // to fill the Trainee frame, inner content stays at native size and is centered.
    'training-stopped': TraineeTrainingStopped,
    'counting':         TraineeCounting,
    // "Group goal was achieved — during training" — outer animated panel grows
    // 888 → 1190 to fill the Trainee frame; the inner trophy card and all entrance/
    // exit/pulse/wobble animations are preserved unchanged.
    'goal-during-build':  TraineeGoalAchievedDuringTraining,
    'goal-during-burn':   TraineeGoalAchievedDuringTraining,
    'goal-during-shield': TraineeGoalAchievedDuringTraining,
  }
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
                <span className="text-[15px] font-poppins font-bold uppercase tracking-[0.15em] text-[#43a77c] text-center whitespace-nowrap">
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
