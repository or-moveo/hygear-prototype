import ScaledFrame from '../components/ScaledFrame'
const imgHabeastsByHygearLogo21 = "/icons/hygear-logo.png";
const imgIcon1 = "https://www.figma.com/api/mcp/asset/c1f2a8f9-92b5-42cc-b5a7-1642e367ee4e";
const imgBarbell = "https://www.figma.com/api/mcp/asset/840ab127-ae9f-4022-a358-f03eabdd2720";
const imgArrowsClockwise = "https://www.figma.com/api/mcp/asset/64343c0b-d7b9-4580-adc4-c7410067353d";
const imgPerson = "https://www.figma.com/api/mcp/asset/b233fd04-f23b-460a-bae7-1ec111097762";
const imgBluetooth = "/icons/bluetooth-active.svg";
const imgBluetooth1 = "/icons/bluetooth-inactive.svg";
const imgVector2 = "/icons/divider.svg";
const imgHeart = "/icons/heart.svg";

const NEXT_EXERCISES = [
  { name: 'Chest Press',      detail: '3x12', active: true },
  { name: 'Shoulder Press',   detail: '3x12' },
  { name: 'Incline Press',    detail: '3x10' },
  { name: 'Triceps Ext',      detail: '3x15' },
  { name: 'Push-ups',         detail: '2x10' },
]

const ATHLETES = [
  { name: 'Dan',   hr: 141, reps: 159,  kg: 1897, bluetooth: imgBluetooth },
  { name: 'Ben',   hr: 152, reps: 268,  kg: 3963, bluetooth: imgBluetooth },
  { name: 'Maya',  hr: 138, reps: 201,  kg: 2540, bluetooth: imgBluetooth },
  { name: 'Tom',   hr: null, reps: null, kg: null, bluetooth: imgBluetooth1 },
]

export default function InRest() {
  return (
    <ScaledFrame>
    <div className="bg-white relative size-full" data-name="Studio Dashboard — In Rest">

      {/* Header */}
      <div className="absolute content-stretch flex items-center justify-between left-0 p-[50px] top-0 w-[1920px]">
        <div className="h-[42px] relative shrink-0">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] h-full items-center relative">
            <div className="h-[40px] relative shrink-0 w-[67px]">
              <div className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-[124.03%] left-[12.55%] max-w-none top-[-12.01%] w-[74.9%]" src={imgHabeastsByHygearLogo21} />
              </div>
            </div>
            <p className="font-poppins font-semibold leading-[46px] not-italic relative shrink-0 text-[36px] text-black whitespace-nowrap">
              Studio name
            </p>
          </div>
        </div>
      </div>

      {/* Right sidebar — training structure */}
      <div className="absolute bg-white border-2 border-[#dddfe9] border-solid content-stretch flex flex-col gap-[16px] h-[882px] items-center justify-center left-[1500px] overflow-clip p-[26px] rounded-[16px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)] top-[142px] w-[370px]">
        <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black w-[328px]">
          Training structure
        </p>
        <div className="flex-[828_0_0] min-h-px min-w-px relative w-[328px]">
          <div className="content-stretch flex flex-col gap-[10px] items-start overflow-clip relative rounded-[inherit] size-full">
            {/* Completed — Warm-up */}
            {['Arm Circles','Band Pull Aparts','Shoulder Rotations'].map((ex, i) => (
              <div key={ex} className="bg-[#f8f7f7] content-stretch flex flex-col items-start p-[12px] relative rounded-[10px] shrink-0 w-[328px]">
                <div className="content-stretch flex items-center justify-between not-italic relative shrink-0 text-[#aaa] w-full whitespace-nowrap">
                  <p className="font-poppins font-semibold leading-[28px] relative shrink-0 text-[18px] line-through">{ex}</p>
                  <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]">30s</p>
                </div>
              </div>
            ))}
            {/* REST divider */}
            <div className="bg-[#758db2] content-stretch flex flex-col items-start p-[12px] relative rounded-[10px] shrink-0 w-[328px]">
              <div className="content-stretch flex items-center justify-between not-italic relative shrink-0 text-white w-full whitespace-nowrap">
                <p className="font-poppins font-semibold leading-[28px] relative shrink-0 text-[18px]">REST</p>
                <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]">0:15</p>
              </div>
            </div>
            {/* Upcoming — Block 1 */}
            {NEXT_EXERCISES.map((ex) => (
              <div key={ex.name} className={`content-stretch flex flex-col items-start p-[12px] relative rounded-[10px] shrink-0 w-[328px] ${ex.active ? 'bg-[#43a77c]' : 'bg-[#edf3ef]'}`}>
                <div className={`content-stretch flex items-center justify-between not-italic relative shrink-0 w-full whitespace-nowrap ${ex.active ? 'text-white' : 'text-black'}`}>
                  <p className="font-poppins font-semibold leading-[28px] relative shrink-0 text-[18px]">{ex.name}</p>
                  <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]">{ex.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-[51px] top-[142px] w-[1400px]">

        {/* Row 1: REST timer + Next Up */}
        <div className="content-stretch flex gap-[36px] items-stretch relative shrink-0 w-full" style={{ height: '440px' }}>

          {/* REST timer card */}
          <div className="bg-[#f8f7f7] content-stretch flex items-center justify-center p-[36px] relative rounded-[16px] shrink-0 w-[500px]">
            <div className="flex flex-col items-center gap-[16px]">
              <p className="font-poppins font-bold text-[28px] text-[#758db2] tracking-widest uppercase">Rest</p>
              <div className="relative flex items-center justify-center size-[280px]">
                <div className="absolute flex items-center justify-center left-0 size-[280px] top-0">
                  <div className="-rotate-90 flex-none">
                    <div className="relative size-[280px]">
                      <img alt="" className="absolute block max-w-none size-full" src={imgIcon1} />
                    </div>
                  </div>
                </div>
                <div className="relative flex flex-col items-center justify-center">
                  <p className="font-poppins font-semibold text-[72px] leading-[1] text-black">0:15</p>
                  <p className="font-poppins font-normal text-[20px] text-[#758db2] mt-[8px]">REST</p>
                </div>
              </div>
              <p className="font-poppins font-normal text-[18px] text-[#888]">After: Warm-up</p>
            </div>
          </div>

          {/* Next Up card */}
          <div className="flex-[1_0_0] flex flex-col gap-[24px] min-w-px">

            {/* Heading */}
            <div className="bg-[#334367] content-stretch flex items-center justify-between p-[28px] relative rounded-[16px] shrink-0">
              <div className="flex items-center gap-[12px]">
                <p className="font-poppins font-bold leading-[46px] text-[36px] text-white whitespace-nowrap">Next Up — Block 1</p>
              </div>
              <div className="bg-white/20 flex items-center justify-center px-[20px] py-[8px] rounded-full">
                <p className="font-poppins font-semibold text-[18px] text-white">18 Min</p>
              </div>
            </div>

            {/* Exercise list */}
            <div className="flex flex-col gap-[12px]">
              {NEXT_EXERCISES.map((ex) => (
                <div
                  key={ex.name}
                  className={`flex items-center justify-between p-[16px] rounded-[12px] ${ex.active ? 'bg-[#43a77c]' : 'bg-[#f8f7f7]'}`}
                >
                  <div className="flex items-center gap-[12px]">
                    {ex.active && (
                      <div className="bg-white/30 flex items-center justify-center h-[26px] px-[10px] rounded-[6px]">
                        <p className="font-poppins font-bold text-[12px] text-white whitespace-nowrap">NEXT</p>
                      </div>
                    )}
                    <p className={`font-poppins font-semibold text-[18px] ${ex.active ? 'text-white' : 'text-black'}`}>{ex.name}</p>
                  </div>
                  <p className={`font-poppins font-semibold text-[18px] ${ex.active ? 'text-white' : 'text-[#555]'}`}>{ex.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats from last set */}
          <div className="bg-[#f8f7f7] content-stretch flex flex-col gap-[24px] items-start justify-center p-[36px] relative rounded-[16px] shrink-0 w-[300px]">
            <p className="font-poppins font-bold text-[22px] text-black">Warm-up stats</p>
            {[
              { icon: imgBarbell,        dot: '#4c735e', label: 'Reps',  value: '1530' },
              { icon: imgArrowsClockwise, dot: '#659a7e', label: 'KG',    value: '140'  },
              { icon: imgPerson,          dot: '#8db49f', label: 'BW%',   value: '62'   },
            ].map((s) => (
              <div key={s.label} className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <div className="flex gap-[8px] items-center">
                  <div className="relative shrink-0 size-[40px]">
                    <img alt="" className="absolute block max-w-none size-full" src={s.icon} />
                  </div>
                  <div className="rounded-full shrink-0 size-[10px]" style={{ background: s.dot }} />
                  <p className="font-poppins font-medium leading-[46px] text-[28px] text-black whitespace-nowrap">{s.label}</p>
                </div>
                <p className="font-poppins font-semibold leading-[46px] text-[28px] text-black whitespace-nowrap">{s.value}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Row 2: Athlete cards */}
        <div className="content-stretch flex gap-[25px] items-center relative shrink-0 w-full">
          {ATHLETES.map((a) => (
            <div key={a.name} className="bg-[#edf3ef] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] flex-[1_0_0]">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[34px]">
                    <img alt="" className="absolute block max-w-none size-full" src={a.bluetooth} />
                  </div>
                  <p className="font-poppins font-bold leading-[34px] not-italic relative shrink-0 text-[24px] text-black whitespace-nowrap">{a.name}</p>
                </div>
                <div className="h-[30px] relative shrink-0 w-0">
                  <div className="absolute inset-[0_-1px]">
                    <img alt="" className="block max-w-none size-full" src={imgVector2} />
                  </div>
                </div>
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[34px]">
                    <img alt="" className="absolute block max-w-none size-full" src={imgHeart} />
                  </div>
                  <div className="flex flex-col font-poppins font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#43a77c] text-[24px] whitespace-nowrap">
                    <p className="leading-[34px]">{a.hr ?? '—'}</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-[16px] h-[108px] items-start justify-center relative shrink-0 w-full">
                <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]">
                  <div className="content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                    <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]">REPS</p>
                    <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]">{a.reps ?? '—'}</p>
                  </div>
                </div>
                <div className="bg-white flex-[1_0_0] h-[108px] min-h-px min-w-px relative rounded-[14px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.06)]">
                  <div className="content-stretch flex flex-col gap-[4px] items-center justify-center not-italic p-[18px] relative size-full text-black text-center whitespace-nowrap">
                    <p className="font-poppins font-normal leading-[24px] relative shrink-0 text-[16px]">KG</p>
                    <p className="font-poppins font-semibold leading-[46px] relative shrink-0 text-[36px]">{a.kg ?? '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
    </ScaledFrame>
  );
}
