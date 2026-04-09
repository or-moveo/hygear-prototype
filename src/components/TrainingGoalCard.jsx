export default function TrainingGoalCard({ description, currentReps, targetReps, onReset }) {
  const progress = Math.min((currentReps / targetReps) * 100, 100)

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col justify-between min-h-[180px]">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
          <span className="font-semibold text-gray-800 text-base">Training Goal</span>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
      </div>

      <div>
        <div className="w-full bg-gray-100 rounded-full h-1 mb-3 mt-4">
          <div
            className="bg-workout-dark h-1 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="border-t border-gray-100 pt-3">
          <button
            onClick={onReset}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Reps {currentReps}/{targetReps}
          </button>
        </div>
      </div>
    </div>
  )
}
