// scaled (default) — used inside ScaledFrame (position absolute, 1920px wide)
// fluid — used in regular flow layouts (full-width, responsive padding)
export default function StudioHeader({ name = 'Studio name', variant = 'scaled' }) {
  const style = variant === 'scaled'
    ? {
        position: 'absolute', left: 0, top: 0, width: 1920,
        background: '#334367',
        padding: '25px 50px',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        display: 'flex', alignItems: 'center',
        zIndex: 10,
      }
    : {
        width: '100%',
        background: '#334367',
        padding: '16px 32px',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        display: 'flex', alignItems: 'center',
      }

  return (
    <div style={style}>
      <img
        src="/icons/hygear-logo.png"
        alt="HyGear"
        style={{ height: 40, width: 'auto', filter: 'brightness(0) invert(1)' }}
      />
      <span
        className="font-poppins font-semibold text-white"
        style={{ fontSize: 36, lineHeight: '46px', marginLeft: 16 }}
      >
        {name}
      </span>
    </div>
  )
}
