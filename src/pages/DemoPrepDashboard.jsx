import { useState, useEffect } from 'react'
import { ArrowClockwise, ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Stack } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import VideoPlayer from '../components/VideoPlayer'

const EXERCISE_VIDEO = 'https://res.cloudinary.com/hyhear/video/upload/sp_auto/v1720461319/hyfit-prod/video/exercises/35_Narrow_grip_chest_press_while_standing_with_your_back_to_a_middle_anchor.m3u8'

// Snake order layout per Figma:
//   Row 1 (left→right): 1 → 2 → 3 → 4 ↓
//   Row 2 (right→left): 8 ↑   7 ←  6 ←  5 ←
// Arrow per card ID indicates where next card is.
const ARROW_BY_ID = {
  1: ArrowRight, 2: ArrowRight, 3: ArrowRight, 4: ArrowDown,
  5: ArrowLeft,  6: ArrowLeft,  7: ArrowLeft,  8: ArrowUp,
}

// Visual grid order: row 1 = [1,2,3,4], row 2 = [8,7,6,5]
const GRID_ORDER = [1, 2, 3, 4, 8, 7, 6, 5]

const EXERCISES = GRID_ORDER.map(id => ({
  id,
  name: 'JUMPING JACKS',
  reps: 10,
  ArrowIcon: ARROW_BY_ID[id],
}))

const GREEN_SOLID = '#23B870'
// Match figma: 192.3deg, 60% → 30% transparent
const GREEN_GRAD = `linear-gradient(192.3deg, rgba(35, 184, 112, 0.6) -0.02%, rgba(35, 184, 112, 0.3) 100.02%)`

// Hygear logo as inline SVG (4 paths matching the figma design)
const HygearLogoLarge = ({ width = 147, height = 88 }) => (
  <svg width={width} height={height} viewBox="0 0 67 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1781 6.64782C21.8409 6.61919 25.5342 6.52778 25.936 6.73555C26.372 6.96106 27.5728 9.03313 27.9363 9.60008L31.4571 15.0695C32.0091 15.9238 32.5586 16.783 33.1127 17.6329C33.3382 17.9788 33.5144 18.005 33.7314 17.686C34.3548 16.7695 34.9773 15.7808 35.575 14.8543L38.9593 9.60715C39.4832 8.79215 39.9796 7.9177 40.5574 7.14313C40.6761 6.98364 40.8363 6.77661 41.0289 6.70856C41.1824 6.65442 41.3445 6.63497 41.5062 6.62684C41.905 6.60688 45.5246 6.5959 45.7164 6.69868C45.7437 6.71336 45.7742 6.72997 45.7808 6.76168C45.8132 6.92434 45.7039 7.10801 45.6246 7.24333C45.3765 7.66825 45.0757 8.07165 44.8023 8.48129L43.107 11.0215L37.2246 19.855C37.025 20.1407 36.8106 20.493 36.7466 20.8395C36.4167 22.6265 36.223 24.4536 35.9802 26.2523L34.5996 36.1057C34.5117 36.7753 34.4278 37.4454 34.348 38.1159C34.3042 38.4698 34.2739 38.8414 34.1832 39.1852C34.0853 39.5087 33.8969 39.5341 33.619 39.5579C32.4878 39.6552 32.6637 38.9646 32.563 38.1477C32.4618 37.3427 32.3532 36.5388 32.2372 35.7359C31.5911 31.4936 31.0913 27.2276 30.493 22.9785C30.3917 22.2595 30.3046 21.1777 30.0412 20.5252C29.7354 19.7674 28.7825 18.5351 28.2951 17.7981L23.3603 10.3926L21.8973 8.19735C21.6903 7.88559 21.2402 7.23598 21.0957 6.92075C21.0889 6.77762 21.0965 6.76239 21.1781 6.64782Z" fill="white"/>
    <path d="M19.6211 7.57471C19.7774 7.58807 19.7195 7.56533 19.8421 7.65713C19.9175 7.78635 19.957 7.97662 19.9729 8.12408C20.7141 14.9602 22.3589 21.6822 24.9957 28.0413C26.1433 30.8089 27.5893 33.7327 29.289 36.2396C29.6834 36.8276 30.0983 37.4016 30.5329 37.9606C30.7517 38.2389 31.3603 38.8991 31.4729 39.243C31.4798 39.2641 31.4288 39.3051 31.4078 39.327C30.8257 39.5313 28.1482 38.7295 27.5104 38.5122C27.2918 38.4882 26.2699 38.0262 26.0237 37.9191C22.6449 36.4106 19.7828 33.9442 17.7916 30.8255C15.5352 27.3015 14.4954 23.1355 14.8313 18.9646C15.104 15.2649 16.3377 11.8147 18.5372 8.81393C18.812 8.43893 19.2449 7.81486 19.6211 7.57471Z" fill="white"/>
    <path d="M47.0892 7.56299C47.4873 7.60736 47.8939 8.23424 48.1298 8.54354C49.8459 10.7941 50.963 13.2644 51.6037 16.0125C52.6302 20.4447 52.074 25.0964 50.031 29.1615C47.972 33.3287 43.8904 36.9851 39.4814 38.4757C39.2486 38.5708 38.8758 38.6775 38.6363 38.7482C38.1937 38.8788 35.6011 39.6567 35.4102 39.2313C35.4716 38.9734 36.617 37.6185 36.8495 37.2892C42.0634 29.9063 44.8533 20.8666 46.3873 12.0375C46.5068 11.3499 46.8408 7.88857 47.0892 7.56299Z" fill="white"/>
    <path d="M18.3805 0.398264C19.2333 0.360692 20.2034 0.378417 21.063 0.378268L25.4205 0.377802L38.7705 0.377844L45.272 0.378494C45.9731 0.378593 48.072 0.334462 48.672 0.464197L48.7122 0.568709C48.6891 0.821443 46.6087 4.92874 46.3048 5.24371C46.1118 5.16714 45.9192 5.08847 45.7274 5.00769C40.5169 2.50204 34.9707 1.55099 29.2422 2.47968C26.8808 2.86251 24.7656 3.39583 22.5639 4.34273C22.2954 4.4582 20.6215 5.36581 20.4942 5.12886C20.1451 4.4791 18.2129 1.15317 18.1562 0.600197C18.2239 0.451182 18.2102 0.493045 18.3805 0.398264Z" fill="white"/>
  </svg>
)

export default function DemoPrepDashboard() {
  const [timer, setTimer] = useState(2)
  useEffect(() => {
    const id = setInterval(() => setTimer(t => (t <= 0 ? 2 : t - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const mm = String(Math.floor(timer / 60)).padStart(2, '0')
  const ss = String(timer % 60).padStart(2, '0')

  return (
    <ScaledFrame>
      <StageBackground variant="dark" showTopbar>
        {/* Main frame: 1820x888 at left:50, top:142 */}
        <div style={{ position: 'absolute', left: 50, top: 142, width: 1820, height: 888, zIndex: 5 }}>

          {/* Header: Logo box (317x180) + Title bar (1479x180) at top:0 */}
          {/* Logo box */}
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: 317, height: 180,
            background: GREEN_GRAD,
            borderRadius: '36px 18px 36px 36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxSizing: 'border-box',
          }}>
            <HygearLogoLarge width={147} height={88} />
          </div>

          {/* Title bar */}
          <div style={{
            position: 'absolute', left: 341, top: 0,
            width: 1479, height: 180,
            background: GREEN_SOLID,
            borderRadius: '36px 18px 36px 36px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 36px',
            boxSizing: 'border-box',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{
                width: 120, height: 120,
                background: '#000',
                borderRadius: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {/* Stack icon: 3 horizontal lines, green */}
                <Stack size={64} color={GREEN_SOLID} weight="bold" />
              </div>
              <span style={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 56, lineHeight: '66px',
                color: '#fff',
              }}>
                Demo &amp; Prep
              </span>
            </div>
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 80, lineHeight: '66px',
              color: '#fff', fontVariantNumeric: 'tabular-nums',
            }}>
              {mm}:{ss}
            </span>
          </div>

          {/* Sidebar: 317x684 at left:0, top:204, green gradient */}
          <div style={{
            position: 'absolute', left: 0, top: 204,
            width: 317, height: 684,
            background: GREEN_GRAD,
            borderRadius: '36px 18px 36px 36px',
            padding: 24, gap: 16,
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            boxSizing: 'border-box',
          }}>
            {/* Block title */}
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, lineHeight: '34px',
              color: '#fff',
            }}>
              Dynamic Strength
            </span>

            {/* Set cards container: column, gap 12px */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              gap: 12, width: 269,
            }}>
              {[1,2,3,4,5,6].map(n => <SetCard key={n} setNum={n} />)}
            </div>
          </div>

          {/* Cards grid: 1479x684 at left:341, top:204 — 2 rows × 4 cols of 360x334 */}
          <div style={{
            position: 'absolute', left: 341, top: 204, width: 1479, height: 684,
            display: 'flex', flexDirection: 'column', gap: 16,
          }}>
            <div style={{ display: 'flex', gap: 13, height: 334 }}>
              {EXERCISES.slice(0, 4).map(ex => <ExerciseCard key={ex.id} ex={ex} />)}
            </div>
            <div style={{ display: 'flex', gap: 13, height: 334 }}>
              {EXERCISES.slice(4, 8).map(ex => <ExerciseCard key={ex.id} ex={ex} />)}
            </div>
          </div>
        </div>
      </StageBackground>
    </ScaledFrame>
  )
}

function ExerciseCard({ ex }) {
  return (
    <div style={{ width: 360, height: 334, position: 'relative' }}>
      {/* Image/video area: 360x230 with radius 24/12/0/0 */}
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: 360, height: 230,
        background: '#fff',
        borderRadius: '24px 12px 0 0',
        overflow: 'hidden',
      }}>
        {/* Video (object-contain to avoid cropping) */}
        <VideoPlayer src={EXERCISE_VIDEO} className="!object-contain" />

        {/* Number badge: 48x48, green, top-left, radius 12px 0 */}
        <div style={{
          position: 'absolute', left: 0, top: 0,
          width: 48, height: 48,
          background: GREEN_SOLID,
          borderRadius: '12px 0 12px 0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 24, lineHeight: '34px',
          color: '#000',
          zIndex: 2,
        }}>{ex.id}</div>

        {/* Reps pill: 156x42 at left:16, top:172 */}
        <div style={{
          position: 'absolute', left: 16, top: 172,
          width: 156, height: 42,
          padding: '4px 16px',
          gap: 12,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          borderRadius: '8px 4px 8px 8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
          zIndex: 2,
        }}>
          <ArrowClockwise size={28} color="#fff" weight="bold" />
          <span style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 24, lineHeight: '34px',
            color: '#fff',
          }}>{ex.reps} reps</span>
        </div>

        {/* Arrow icon button: 42x42 at left:302, top:172 */}
        <div style={{
          position: 'absolute', left: 302, top: 172,
          width: 42, height: 42,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          borderRadius: '8px 4px 8px 8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2,
        }}>
          <ex.ArrowIcon size={28} color="#fff" weight="bold" />
        </div>
      </div>

      {/* Bottom bar: 360x104 at top:230, gradient green, radius 0/0/24/24 */}
      <div style={{
        position: 'absolute', left: 0, top: 230,
        width: 360, height: 104,
        background: GREEN_GRAD,
        borderRadius: '0 0 24px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
        padding: '0 36px',
        boxSizing: 'border-box',
      }}>
        <span style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 24, lineHeight: '34px',
          color: '#fff',
        }}>
          {ex.name}
        </span>
      </div>
    </div>
  )
}

function SetCard({ setNum }) {
  return (
    <div style={{
      width: 269, height: 83,
      background: '#000',
      borderRadius: 10,
      padding: 12, gap: 8,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start',
      boxSizing: 'border-box',
      flexShrink: 0,
    }}>
      {/* Top row: yellow Set pill + jUMPING jACKS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', height: 28 }}>
        <div style={{
          background: '#FFD000',
          borderRadius: 6,
          padding: '5px 10px 0',
          height: 26,
          display: 'flex', alignItems: 'flex-start',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 12, lineHeight: '16px',
            color: '#000',
          }}>Set {setNum}</span>
        </div>
        <span style={{
          fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 18, lineHeight: '28px',
          color: '#fff',
        }}>jUMPING jACKS</span>
      </div>

      {/* Bottom row: Reps + Weight */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, height: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#fff' }}>Reps:</span>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#fff' }}>12</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '24px', color: '#fff' }}>Weight:</span>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 16, lineHeight: '24px', color: '#fff' }}>75 kg</span>
        </div>
      </div>
    </div>
  )
}
