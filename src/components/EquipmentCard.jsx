const equipmentIcons = {
  "Jump Rope": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d7a55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5c0 4 14 4 14 8s-14 4-14 8" />
      <circle cx="5" cy="5" r="2" fill="#2d7a55" stroke="none" />
      <circle cx="19" cy="21" r="2" fill="#2d7a55" stroke="none" />
    </svg>
  ),
  "Resistance Band": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d7a55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="12" rx="9" ry="5" />
      <ellipse cx="12" cy="12" rx="5" ry="3" />
      <line x1="3" y1="12" x2="7" y2="12" />
      <line x1="17" y1="12" x2="21" y2="12" />
    </svg>
  ),
  "TRX": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d7a55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="8" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="8" x2="6" y2="14" />
      <line x1="16" y1="8" x2="18" y2="14" />
      <circle cx="6" cy="16" r="2" />
      <circle cx="18" cy="16" r="2" />
    </svg>
  ),
  "Cable Machine": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2d7a55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="6" height="14" rx="1" />
      <rect x="14" y="2" width="6" height="14" rx="1" />
      <line x1="7" y1="16" x2="12" y2="22" />
      <line x1="17" y1="16" x2="12" y2="22" />
      <circle cx="12" cy="22" r="1.5" fill="#2d7a55" stroke="none" />
    </svg>
  ),
}

export default function EquipmentCard({ equipment }) {
  return (
    <div className="bg-equipment-bg rounded-2xl p-6 min-h-[180px]">
      <div className="flex items-center gap-2 mb-5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d5a3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 4v16M18 4v16M6 12h12M3 8h3M18 8h3M3 16h3M18 16h3" />
        </svg>
        <span className="font-semibold text-green-900 text-base">Equipment</span>
      </div>
      <div className="flex gap-4 flex-wrap">
        {equipment.map((item) => (
          <div
            key={item}
            className="bg-white/60 rounded-xl p-2.5 flex items-center justify-center"
            title={item}
          >
            {equipmentIcons[item]}
          </div>
        ))}
      </div>
    </div>
  )
}
