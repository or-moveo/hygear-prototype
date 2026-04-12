import ScaledFrame from '../components/ScaledFrame'

const imgLogo              = "/icons/hygear-logo.png"
const imgGear              = "/assets/gear-render.png"
const imgSpider            = "/assets/spider-x.png"
const imgRope              = "/assets/rope.png"
const imgHybar             = "/assets/hybar.png"
const imgBarbellGoal       = "/assets/barbell-hl.svg"
const imgRepsIcon          = "/assets/arrows-hl.svg"
const imgEquipmentIcon     = "/assets/equipment-icon.svg"
const imgThermoWarmup      = "/assets/thermo-warmup.svg"    // red   #AA0929
const imgThermoDemo        = "/assets/thermo-strength.svg"  // orange #FB6340 (file mislabelled)
const imgThermoStrength    = "/assets/thermo-cooldown2.svg" // green  #43A77C (file mislabelled)
const imgThermoAllout      = "/assets/thermo-allout.svg"    // lime   #CDE301
const imgThermoCooldown    = "/assets/thermo-blue.svg"      // blue   #758DB2

// Section cards data
const LEFT_CARDS = [
  {
    label: 'Warm-up',
    duration: '5 Minutes',
    color: '#f5365c',
    gradient: 'rgba(245,54,92,0)',
    gradientFull: 'rgba(245,54,92,0.25)',
    icon: imgThermoWarmup,
  },
  {
    label: 'Demo & Prep',
    duration: '5 Minutes',
    color: '#fb6340',
    gradient: 'rgba(251,99,64,0)',
    gradientFull: 'rgba(251,99,64,0.25)',
    icon: imgThermoDemo,
  },
]

const CENTER_CARDS = [
  {
    label: 'Dynamic Strength',
    duration: '15 Minutes',
    color: '#43a77c',
    gradient: 'rgba(67,167,124,0)',
    gradientFull: 'rgba(67,167,124,0.25)',
    icon: imgThermoStrength,
    fullHeight: true,
  },
  {
    label: 'Isometric Holds',
    duration: '15 Minutes',
    color: '#43a77c',
    gradient: 'rgba(67,167,124,0)',
    gradientFull: 'rgba(67,167,124,0.25)',
    icon: imgThermoStrength,
    fullHeight: true,
  },
]

const RIGHT_CARDS = [
  {
    label: 'All Out',
    duration: '5 Minutes',
    color: '#cde301',
    gradient: 'rgba(205,227,1,0)',
    gradientFull: 'rgba(205,227,1,0.25)',
    icon: imgThermoAllout,
  },
  {
    label: 'Cool-down',
    duration: '5 Minutes',
    color: '#758db2',
    gradient: 'rgba(117,141,178,0)',
    gradientFull: 'rgba(117,141,178,0.25)',
    icon: imgThermoCooldown,
  },
]

function SectionCard({ label, duration, color, gradient, gradientFull, icon, fullHeight }) {
  return (
    <div
      className={`flex flex-col items-start p-[36px] rounded-[36px] border-b-8 w-full ${fullHeight ? 'h-full' : 'flex-1 min-h-0'}`}
      style={{
        borderColor: color,
        backgroundImage: `linear-gradient(180deg, ${gradient} 35%, ${gradientFull} 100%), linear-gradient(90deg, #fff 0%, #fff 100%)`,
      }}
    >
      <div className="flex flex-col gap-[16px] items-start w-full">
        <div className="flex items-center justify-between w-full">
          <div className="relative shrink-0 size-[66px]">
            <img alt="" className="absolute block inset-0 size-full max-w-none" src={icon} />
          </div>
          <div
            className="flex items-center justify-center px-[24px] py-[8px] rounded-full shrink-0"
            style={{ backgroundColor: color }}
          >
            <p className="font-poppins font-semibold text-[16px] leading-[24px] text-white whitespace-nowrap">
              {duration}
            </p>
          </div>
        </div>
        <p className="font-poppins font-semibold text-[36px] leading-[46px] text-black whitespace-nowrap">
          {label}
        </p>
      </div>
    </div>
  )
}

export default function HighLevelTraining2() {
  return (
    <ScaledFrame>
      <div className="bg-white relative size-full" data-name="Studio Dashboard — high level training 2" data-node-id="457:5621">

        {/* Header — white bar with rounded bottom */}
        <div className="absolute left-0 top-0 w-[1920px] bg-white flex items-center px-[50px] py-[25px] rounded-bl-[25px] rounded-br-[25px]">
          <div className="flex items-center gap-[16px]">
            <div className="h-[40px] relative shrink-0 w-[67px]">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[124.03%] left-[12.55%] max-w-none top-[-12.01%] w-[74.9%]" src={imgLogo} />
              </div>
            </div>
            <p className="font-poppins font-semibold text-[36px] leading-[46px] text-black whitespace-nowrap">
              Studio name
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="absolute left-[50px] top-[142px] w-[1820px] flex flex-col gap-[36px]">

          {/* Top row: workout banner + equipment */}
          <div className="flex gap-[36px] items-start w-full">

            {/* Gradient workout banner */}
            <div
              className="flex flex-col justify-between p-[36px] rounded-[36px] shrink-0 w-[1286px] h-[230px]"
              style={{ backgroundImage: 'linear-gradient(80deg, #334367 0%, #6685cd 100%)' }}
            >
              <div className="flex items-center justify-between w-full">
                <p className="font-poppins font-bold text-[60px] leading-[66px] text-white whitespace-nowrap">
                  Upper Body Power
                </p>
                <div className="bg-white flex items-center justify-center px-[28px] py-[7px] rounded-full shrink-0">
                  <p className="font-poppins font-medium text-[22px] leading-[34px] text-[#334367] whitespace-nowrap">
                    30 Minutes
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[12px]">
                  <div className="relative shrink-0 size-[36px]">
                    <img alt="" className="absolute block inset-0 size-full max-w-none" src={imgBarbellGoal} />
                  </div>
                  <p className="font-poppins text-white text-[24px] leading-[34px] w-[654px]">
                    <span className="font-bold">Training Goal:</span>
                    {' Full Body work that combines dynamic strength, static stability, and aerobics.'}
                  </p>
                </div>
                <div className="bg-white flex items-center gap-[14px] pl-0 pr-[18px] rounded-full shrink-0">
                  <div className="relative shrink-0 size-[56px]">
                    <img alt="" className="absolute block inset-0 size-full max-w-none" src={imgRepsIcon} />
                  </div>
                  <p className="font-poppins font-semibold text-[28px] leading-[38px] text-[#334367] whitespace-nowrap">
                    Reps 0/1800
                  </p>
                </div>
              </div>
            </div>

            {/* Equipment card */}
            <div className="bg-white flex flex-col gap-[24px] flex-1 min-w-0 h-[230px] p-[36px] rounded-[36px]">
              <div className="flex items-center gap-[10px] shrink-0">
                <img alt="" className="w-[36px] h-[36px] object-contain" src={imgEquipmentIcon} />
                <p className="font-poppins font-semibold text-[30px] text-black whitespace-nowrap">Equipment</p>
              </div>
              <div className="flex gap-[12px] w-full flex-1 min-h-0">
                {[
                  { src: imgGear,   h: 'h-[70px] w-[41px]' },
                  { src: imgSpider, h: 'h-[70px] w-[38px]' },
                  { src: imgRope,   h: 'h-[72px] w-[60px]' },
                  { src: imgHybar,  h: 'h-[37px] w-[70px]', rotate: true },
                ].map((item, i) => (
                  <div key={i} className="bg-[rgba(221,223,233,0.5)] flex flex-1 h-full items-center justify-center rounded-[16px]">
                    <img
                      alt=""
                      src={item.src}
                      className={`block max-w-none object-contain ${item.h}${item.rotate ? ' -rotate-90' : ''}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row: section cards */}
          <div className="flex gap-[36px] h-[586px] w-full">

            {/* Left column: Warm-up + Demo&Prep (stacked) */}
            <div className="flex flex-col gap-[36px] w-[428px] shrink-0">
              {LEFT_CARDS.map(card => (
                <SectionCard key={card.label} {...card} />
              ))}
            </div>

            {/* Center: Dynamic Strength */}
            <div className="flex flex-1 min-w-0">
              <SectionCard {...CENTER_CARDS[0]} fullHeight />
            </div>

            {/* Center: Isometric Holds */}
            <div className="flex flex-1 min-w-0">
              <SectionCard {...CENTER_CARDS[1]} fullHeight />
            </div>

            {/* Right column: All Out + Cool-down (stacked) */}
            <div className="flex flex-col gap-[36px] w-[428px] shrink-0">
              {RIGHT_CARDS.map(card => (
                <SectionCard key={card.label} {...card} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </ScaledFrame>
  )
}
