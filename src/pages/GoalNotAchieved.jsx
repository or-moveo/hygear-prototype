import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import TrainingStructure from '../components/TrainingStructure'

const BLUE = '#3A86FF'
const BLUE_GRAD = `linear-gradient(180deg, color-mix(in srgb, ${BLUE} 60%, transparent) 0%, color-mix(in srgb, ${BLUE} 30%, transparent) 100%)`

// Assets
const imgTodayWo3 = "/assets/today-wo3.png"
const imgArrowsReps = "/assets/arrows-reps-blue.svg"
const imgPodiumBaseLeft = "/assets/podium-base-left.svg"
const imgPodiumBaseCenter = "/assets/podium-base-center.svg"
const imgPodiumBaseRight = "/assets/podium-base-right.svg"

function Medal({ emoji, size = 98 }) {
  return (
    <span
      className="shrink-0 leading-none select-none"
      style={{ fontSize: size, lineHeight: 1 }}
      role="img"
    >
      {emoji}
    </span>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white flex-1 rounded-[10px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col gap-[3px] items-center justify-center px-[13px] py-[9px] text-center text-black whitespace-nowrap">
        <p className="font-poppins font-light text-[18px] leading-[28px]">{label}</p>
        <p className="font-poppins font-semibold text-[36px] leading-[46px]">{value}</p>
      </div>
    </div>
  )
}

function PodiumCard({ rank, name, reps, kg, medal, height, gradient }) {
  return (
    <div
      className="relative flex flex-col gap-[18px] items-center p-[27px] rounded-tl-[36px] rounded-tr-[36px] w-[407px] shrink-0"
      style={{ height, background: gradient }}
    >
      <div className="flex items-start justify-between w-[331px]">
        <div className="flex flex-col gap-[3px] items-start justify-center text-white whitespace-nowrap">
          <p className="font-poppins font-semibold text-[36px] leading-[46px]">#{rank}</p>
          <p className="font-poppins font-semibold text-[56px] leading-[66px]">{name}</p>
        </div>
        {medal}
      </div>
      <div className="flex gap-[12px] items-start justify-center w-[331px]">
        <StatCard label="REPS" value={reps} />
        <StatCard label="KG" value={kg} />
      </div>
    </div>
  )
}

export default function GoalNotAchieved({ onOpenGoalPopup }) {
  return (
    <ScaledFrame>
      <StageBackground>
      <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>

        {/* Group Target Section */}
        <div
          className="absolute left-[50px] top-[142px] w-[1414px] h-[295px] p-[36px] flex flex-col items-start justify-between"
          style={{ background: BLUE_GRAD, borderRadius: '36px 18px 36px 36px' }}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-[36px] items-start" style={{ width: 1161 }}>
              <p className="font-poppins text-[28px] leading-[38px] text-black text-center">
                GROUP TARGET
              </p>
              <div className="flex gap-[24px] items-center">
                <img alt="" src={imgArrowsReps} className="w-[66px] h-[66px]" />
                <p className="font-poppins font-semibold text-[66px] leading-[66px] text-black whitespace-nowrap">
                  Reps 540/1800
                </p>
              </div>
              {/* Progress bar */}
              <div className="w-full h-[16px] rounded-[50px] bg-white relative">
                <div className="absolute left-0 top-0 h-[16px] rounded-[50px] bg-[#3a86ff]" style={{ width: 180 }} />
              </div>
            </div>
            {/* Woman image */}
            <div className="relative shrink-0 w-[158px] h-[293px] overflow-hidden">
              <img alt="" src={imgTodayWo3} className="absolute top-0 h-full object-cover" style={{ left: '-27%', width: '148%', maxWidth: 'none' }} />
            </div>
          </div>
        </div>

        {/* Training Structure Sidebar */}
        <div className="absolute left-[1500px] top-[142px]">
          <TrainingStructure color="#3A86FF" />
        </div>

        {/* Goal Complete mini-popup trigger */}
        {onOpenGoalPopup && (
          <button
            onClick={onOpenGoalPopup}
            className="absolute cursor-pointer rounded-[16px] flex flex-col gap-[12px] p-[24px] text-left transition-transform hover:scale-[1.02] active:scale-[0.99]"
            style={{
              left: 50, bottom: 36,
              width: 430,
              background: 'linear-gradient(160deg, #c9dff0 0%, #e8f1f8 60%, #d6e8f5 100%)',
              boxShadow: '0 4px 20px rgba(58,134,255,0.15)',
            }}
          >
            <p className="font-poppins font-semibold text-[#3a86ff] uppercase" style={{ fontSize: 14, letterSpacing: '0.1em' }}>
              CONGRAGELETIONS
            </p>
            <p className="font-poppins font-bold text-[#3a86ff]" style={{ fontSize: 32, lineHeight: '38px' }}>
              GOAL COMPLETE!!!
            </p>
            <p className="font-poppins font-semibold text-black" style={{ fontSize: 18, lineHeight: '24px' }}>
              Perfect! Team completed 100% of training goals
            </p>

            {/* Group Target mini card */}
            <div className="bg-white rounded-[12px] px-[16px] py-[14px] flex flex-col gap-[10px] w-full" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <p className="font-poppins font-semibold text-black uppercase" style={{ fontSize: 12, letterSpacing: '0.08em' }}>GROUP TARGET</p>
              <div className="flex items-center gap-[12px]">
                <img src={imgArrowsReps} alt="" className="w-[28px] h-[28px] shrink-0" />
                <p className="font-poppins font-semibold text-black" style={{ fontSize: 24, lineHeight: '30px' }}>Reps 1800/1800</p>
              </div>
              <div className="w-full h-[6px] rounded-full bg-[#e8f1f8]">
                <div className="h-full w-full rounded-full bg-[#3a86ff]" />
              </div>
            </div>
          </button>
        )}

        {/* Podium Section */}
        {/* #2 David - Left */}
        <div className="absolute left-[79px] top-[573px]">
          <PodiumCard
            rank={2}
            name="David"
            reps="268"
            kg="3963"
            height={446}
            gradient="linear-gradient(to bottom, rgba(58,134,255,0.35), rgba(58,134,255,0.7))"
            medal={<Medal emoji="🥈" />}
          />
        </div>

        {/* #1 Ben - Center */}
        <div className="absolute left-[553px] top-[474px]">
          <PodiumCard
            rank={1}
            name="Ben"
            reps="268"
            kg="3963"
            height={546}
            gradient="linear-gradient(to bottom, rgba(58,134,255,0.5), #3a86ff)"
            medal={<Medal emoji="🥇" />}
          />
        </div>

        {/* #3 Mona - Right */}
        <div className="absolute left-[1028px] top-[674px]">
          <PodiumCard
            rank={3}
            name="Mona"
            reps="268"
            kg="3963"
            height={346}
            gradient="linear-gradient(to bottom, rgba(58,134,255,0.2), rgba(58,134,255,0.4))"
            medal={<Medal emoji="🥉" />}
          />
        </div>

        {/* Podium bases (trapezoid shapes) */}
        <img
          alt=""
          src={imgPodiumBaseLeft}
          className="absolute"
          style={{ left: 50, top: 1019, width: 465, height: 60 }}
        />
        <img
          alt=""
          src={imgPodiumBaseCenter}
          className="absolute"
          style={{ left: 524, top: 1019, width: 465, height: 60 }}
        />
        <img
          alt=""
          src={imgPodiumBaseRight}
          className="absolute"
          style={{ left: 999, top: 1019, width: 465, height: 60 }}
        />
      </div>
      </StageBackground>
    </ScaledFrame>
  )
}
