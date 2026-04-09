export default function WorkoutHeaderCard({ name, tags }) {
  return (
    <div className="bg-workout-dark rounded-2xl p-6 flex flex-col justify-between min-h-[180px]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4v16M18 4v16M6 12h12M3 8h3M18 8h3M3 16h3M18 16h3" />
          </svg>
        </div>
      </div>
      <div>
        <h1 className="text-white text-3xl font-bold mb-4 leading-tight">{name}</h1>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-white border border-white/40 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
