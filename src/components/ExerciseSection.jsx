const themeConfig = {
  warmup: {
    bg: 'bg-warmup',
    badge: 'bg-red-600',
    iconBg: 'bg-red-400',
    icon: (
      // Thermometer
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
    rowDone: 'line-through text-red-900/40',
  },
  mainpart: {
    bg: 'bg-mainpart',
    badge: 'bg-green-700',
    iconBg: 'bg-green-600',
    icon: (
      // Dumbbell / barbell
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4v16M18 4v16M6 12h12M3 8h3M18 8h3M3 16h3M18 16h3" />
      </svg>
    ),
    rowDone: 'line-through text-green-900/40',
  },
  cooldown: {
    bg: 'bg-cooldown',
    badge: 'bg-blue-700',
    iconBg: 'bg-blue-400',
    icon: (
      // Snowflake
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="m17 7-5-5-5 5" />
        <path d="m17 17-5 5-5-5" />
        <path d="m2 12 5-5 5 5-5 5z" />
        <path d="m22 12-5-5-5 5 5 5z" />
      </svg>
    ),
    rowDone: 'line-through text-blue-900/40',
  },
}

export default function ExerciseSection({ section, completedIds, onToggle }) {
  const theme = themeConfig[section.theme]
  const allDone = section.exercises.every((e) => completedIds.has(e.id))

  return (
    <div className={`${theme.bg} rounded-2xl p-5 flex flex-col gap-3`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className={`w-8 h-8 rounded-full ${theme.iconBg} flex items-center justify-center`}>
          {theme.icon}
        </div>
        <span className="text-xs font-medium text-white bg-white/25 rounded-full px-3 py-1">
          {section.duration}
        </span>
      </div>

      <h2 className="text-white font-bold text-xl">{section.name}</h2>

      {/* Exercise rows */}
      <div className="flex flex-col gap-2">
        {section.exercises.map((exercise) => {
          const done = completedIds.has(exercise.id)
          return (
            <button
              key={exercise.id}
              onClick={() => onToggle(exercise.id, exercise.reps)}
              className={`w-full bg-white rounded-xl px-3 py-2.5 flex items-center gap-2 text-left transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${done ? 'opacity-60' : 'opacity-100'}`}
            >
              {/* Set badge */}
              <span className={`${theme.badge} text-white text-[10px] font-semibold rounded px-1.5 py-0.5 whitespace-nowrap flex-shrink-0`}>
                Set {exercise.set}
              </span>

              {/* Exercise name */}
              <span className={`text-sm font-medium text-gray-800 flex-1 ${done ? theme.rowDone : ''}`}>
                {exercise.name}
              </span>

              {/* Detail */}
              <span className="text-xs text-gray-400 flex-shrink-0">{exercise.detail}</span>

              {/* Check circle */}
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${done ? 'bg-gray-400 border-gray-400' : 'border-gray-300'}`}>
                {done && (
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2,6 5,9 10,3" />
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Section complete badge */}
      {allDone && (
        <div className="flex items-center justify-center gap-1.5 bg-white/25 rounded-xl py-2 text-white text-sm font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
          Section complete!
        </div>
      )}
    </div>
  )
}
