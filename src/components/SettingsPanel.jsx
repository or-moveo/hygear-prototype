import { useState } from 'react'

export const PALETTES = [
  { id: 'green',  name: 'HyGear Green',  sub: 'Health & Wellness',  filter: '',                                      swatch: '#43a77c' },
  { id: 'orange', name: 'Strava',        sub: 'Energy & Performance', filter: 'hue-rotate(-130deg) saturate(150%)', swatch: '#c47a2a' },
  { id: 'blue',   name: 'Garmin',        sub: 'Precision & Tech',   filter: 'hue-rotate(55deg) saturate(120%)',      swatch: '#2980c4' },
  { id: 'teal',   name: 'WHOOP',         sub: 'Recovery & Flow',    filter: 'hue-rotate(30deg) saturate(160%)',      swatch: '#17b8b8' },
  { id: 'red',    name: 'Peloton',       sub: 'Intensity & Power',  filter: 'hue-rotate(-150deg) saturate(160%)',    swatch: '#c42a2a' },
]

export default function SettingsPanel({ activePaletteId, onPaletteChange }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Gear button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center w-8 h-8 rounded-md bg-white/10 hover:bg-white/25 transition-colors"
        title="Settings"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-[90]" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="fixed top-[76px] right-3 z-[100] bg-[#1a1a2e] border border-white/10 rounded-xl p-4 w-52 shadow-2xl">
            <p className="text-white/50 text-xs font-poppins font-semibold uppercase tracking-wider mb-3">
              Color Palette
            </p>
            <div className="flex flex-col gap-2">
              {PALETTES.map(p => (
                <button
                  key={p.id}
                  onClick={() => { onPaletteChange(p.id); setOpen(false) }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full text-left ${
                    activePaletteId === p.id
                      ? 'bg-white/15 text-white'
                      : 'hover:bg-white/8 text-white/70 hover:text-white'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full flex-shrink-0 border-2"
                    style={{
                      backgroundColor: p.swatch,
                      borderColor: activePaletteId === p.id ? 'white' : 'transparent',
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-poppins leading-tight">{p.name}</span>
                    <span className="text-[11px] font-poppins text-white/40 leading-tight">{p.sub}</span>
                  </div>
                  {activePaletteId === p.id && (
                    <svg className="ml-auto w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
