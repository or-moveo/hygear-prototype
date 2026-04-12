import { useState } from 'react'
import { ClockCounterClockwise, CaretDown, CaretRight, ArrowSquareOut } from '@phosphor-icons/react'
import { CHANGELOG, CURRENT_VERSION } from '../data/changelog'

export default function ChangelogPanel({ onViewVersion }) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(CURRENT_VERSION)

  const toggle = (version) =>
    setExpanded(v => (v === version ? null : version))

  return (
    <>
      {/* Icon button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center w-8 h-8 rounded-md bg-white/10 hover:bg-white/25 transition-colors"
        title="Changelog"
      >
        <ClockCounterClockwise size={18} weight="bold" className="text-white" />
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[90]" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div
            className="fixed top-[76px] right-14 z-[100] bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            style={{ width: 300 }}
          >
            {/* Header */}
            <div className="px-4 pt-4 pb-3 border-b border-white/8">
              <p className="text-white/50 text-xs font-poppins font-semibold uppercase tracking-wider">
                Version History
              </p>
              <p className="text-white text-sm font-poppins font-semibold mt-0.5">
                Current: {CURRENT_VERSION}
              </p>
            </div>

            {/* Version list */}
            <div className="overflow-y-auto" style={{ maxHeight: 420 }}>
              {CHANGELOG.map((entry) => {
                const isCurrent = entry.version === CURRENT_VERSION
                const isExpanded = expanded === entry.version

                return (
                  <div key={entry.version} className={`border-b border-white/5 last:border-0 ${isCurrent ? 'bg-white/5' : ''}`}>
                    {/* Version row */}
                    <button
                      onClick={() => toggle(entry.version)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                    >
                      {/* Version badge */}
                      <span
                        className={`text-xs font-poppins font-bold px-2 py-0.5 rounded flex-shrink-0 ${
                          isCurrent
                            ? 'bg-[#43a77c] text-white'
                            : 'bg-white/10 text-white/50'
                        }`}
                      >
                        {entry.version}
                      </span>

                      {/* Info */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className={`text-sm font-poppins leading-tight ${isCurrent ? 'text-white font-semibold' : 'text-white/70'}`}>
                          {entry.label}
                        </span>
                        <span className="text-[11px] font-poppins text-white/35 leading-tight">
                          {entry.date} · {entry.time}
                        </span>
                      </div>

                      {/* Expand caret */}
                      {isExpanded
                        ? <CaretDown size={14} className="text-white/40 flex-shrink-0" />
                        : <CaretRight size={14} className="text-white/25 flex-shrink-0" />
                      }
                    </button>

                    {/* Changes list + View button */}
                    {isExpanded && (
                      <div className="px-4 pb-3">
                        <ul className="flex flex-col gap-1.5 mb-3">
                          {entry.changes.map((change, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-[#43a77c] flex-shrink-0" />
                              <span className="text-[12px] font-poppins text-white/55 leading-snug">
                                {change}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Commit hash */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-white/25">
                            {entry.commit}
                          </span>

                          {/* View button — hidden for current version */}
                          {!isCurrent && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setOpen(false)
                                onViewVersion?.(entry)
                              }}
                              className="flex items-center gap-1 text-[11px] font-poppins font-semibold text-[#43a77c] hover:text-white transition-colors"
                            >
                              View
                              <ArrowSquareOut size={12} weight="bold" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </>
  )
}
