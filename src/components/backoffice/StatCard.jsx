export default function StatCard({ icon: Icon, label, value, sublabel, color = '#43a77c' }) {
  return (
    <div
      className="flex items-center gap-4"
      style={{
        background: `linear-gradient(205deg, ${color}4D 0%, ${color}0D 100%), #fff`,
        borderBottom: `6px solid ${color}`,
        borderRadius: 36,
        padding: 24,
      }}
    >
      {Icon && (
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: color + '18' }}
        >
          <Icon size={26} weight="bold" color={color} />
        </div>
      )}
      <div>
        <p className="font-poppins font-bold text-4xl text-[#334367] leading-none">{value}</p>
        <p className="font-poppins text-base text-gray-500 mt-1">{label}</p>
        {sublabel && <p className="font-poppins text-sm text-gray-400">{sublabel}</p>}
      </div>
    </div>
  )
}
