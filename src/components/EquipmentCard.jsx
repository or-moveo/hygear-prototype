const equipmentIcons = {
  "Jump Rope": (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.6"/>
      <path d="M12 10c0 5 16 5 16 10s-16 5-16 10" stroke="#2d7a55" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="10" r="2.5" fill="#2d7a55"/>
      <circle cx="28" cy="30" r="2.5" fill="#2d7a55"/>
    </svg>
  ),
  "Resistance Band": (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.6"/>
      <rect x="10" y="14" width="4" height="12" rx="2" fill="#2d7a55"/>
      <rect x="26" y="14" width="4" height="12" rx="2" fill="#2d7a55"/>
      <path d="M14 17c4 0 8 2 12 0" stroke="#2d7a55" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 23c4 0 8-2 12 0" stroke="#2d7a55" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  "TRX": (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.6"/>
      <line x1="20" y1="8" x2="20" y2="15" stroke="#2d7a55" strokeWidth="2"/>
      <line x1="14" y1="15" x2="26" y2="15" stroke="#2d7a55" strokeWidth="2"/>
      <line x1="14" y1="15" x2="11" y2="25" stroke="#2d7a55" strokeWidth="2"/>
      <line x1="26" y1="15" x2="29" y2="25" stroke="#2d7a55" strokeWidth="2"/>
      <ellipse cx="11" cy="27" rx="3" ry="2" fill="#2d7a55"/>
      <ellipse cx="29" cy="27" rx="3" ry="2" fill="#2d7a55"/>
    </svg>
  ),
  "Cable Machine": (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.6"/>
      <ellipse cx="20" cy="14" rx="8" ry="4" stroke="#2d7a55" strokeWidth="2"/>
      <line x1="12" y1="14" x2="12" y2="26" stroke="#2d7a55" strokeWidth="2"/>
      <line x1="28" y1="14" x2="28" y2="26" stroke="#2d7a55" strokeWidth="2"/>
      <line x1="20" y1="18" x2="20" y2="30" stroke="#2d7a55" strokeWidth="2"/>
      <circle cx="20" cy="31" r="2" fill="#2d7a55"/>
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
      <div className="flex gap-3">
        {equipment.map((item) => (
          <div key={item} title={item}>
            {equipmentIcons[item]}
          </div>
        ))}
      </div>
    </div>
  )
}
