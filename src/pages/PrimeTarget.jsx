import { UsersThree } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import TrainingStructure from '../components/TrainingStructure'

const VARIANTS = {
  BUILD: {
    label: 'BUILD',
    color: '#a855f7',
    accent: '#c084fc',
    light1: '#c084fc',
    light2: '#d8b4fe',
    light3: '#e9d5ff',
    mode: 'scale',
    icon: 'atom',
    goalHeadline: 'Group weight: 20 tons',
    goalBody: 'The total cumulative weight that the entire group pulled in training together.',
  },
  BURN: {
    label: 'BURN',
    color: '#ec4899',
    accent: '#f472b6',
    light1: '#f472b6',
    light2: '#f9a8d4',
    light3: '#fbcfe8',
    mode: 'burn',
    icon: 'atom',
    goalHeadline: '300 team points',
    goalBody: 'can you keep your heart rate high? Every minute you are in Zone 4–5 adds a point to the group score.',
  },
  SHIELD: {
    label: 'SHIELD',
    color: '#06b6d4',
    accent: '#6AD3E5',
    light1: '#38C5DD',
    light2: '#6AD3E5',
    light3: '#9BE2EE',
    mode: 'shield',
    icon: 'arrows',
    goalHeadline: '450 group minutes of control',
    goalBody: 'The accumulated dwell time in "Total Prime Control Minutes". Make a smooth, perfect movement',
  },
}

const CONTRIBUTORS = [
  { rank: 1, name: 'Ben',   reps: 268, kg: 3963, medal: 'gold' },
  { rank: 2, name: 'Mirel', reps: 268, kg: 3963, medal: 'silver' },
  { rank: 3, name: 'Gal',   reps: 268, kg: 3963, medal: 'bronze' },
]

const RADIUS = '36px 18px 36px 36px'

// Convert hex color to rgba with alpha
function rgba(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a})`
}

function panelGradient(hex) {
  return `linear-gradient(192.26deg, ${rgba(hex, 0.6)} 0.02%, ${rgba(hex, 0.3)} 100%)`
}

function Medal({ tier }) {
  const palette = tier === 'gold'
    ? { ring: '#F9B906', inner: '#FFC943', shadow: '#CE9117' }
    : tier === 'silver'
    ? { ring: '#EBF2F2', inner: '#FFFFFF', shadow: '#C3DBDA' }
    : { ring: '#E37F22', inner: '#F79A4D', shadow: '#BA6017' }
  return (
    <svg width="60" height="74" viewBox="0 0 60 74" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Ribbons forming inverted V */}
      <path d="M6 0 L18 0 L26 36 L18 36 Z" fill="#F41943" />
      <path d="M54 0 L42 0 L34 36 L42 36 Z" fill="#F41943" />
      <path d="M18 0 L24 0 L26 14 L20 18 Z" fill="#BA0F38" />
      <path d="M42 0 L36 0 L34 14 L40 18 Z" fill="#BA0F38" />
      {/* Medal circle */}
      <circle cx="30" cy="50" r="22" fill={palette.ring} />
      <circle cx="30" cy="50" r="16" fill={palette.inner} stroke={palette.shadow} strokeWidth="1.5" />
    </svg>
  )
}

function Panel({ x, w, color, children, paddingTop = 36 }) {
  return (
    <div style={{
      position: 'absolute', top: 142, left: x, width: w, height: 888,
      borderRadius: RADIUS,
      background: panelGradient(color),
      border: `2px solid ${color}`,
      padding: 36, paddingTop,
      color: '#fff', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', gap: 30,
      fontFamily: 'Poppins, sans-serif',
    }}>{children}</div>
  )
}

function HeadlineIcon({ cfg }) {
  return (
    <div style={{
      width: 56, height: 56, borderRadius: '50%',
      background: cfg.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <UsersThree size={32} weight="bold" color="#fff" />
    </div>
  )
}

/* ---------- Bottom visual modes ---------- */

function ShieldBalance() {
  // Exact balance-scale SVG export from Figma (Frame 1707480434.svg) — color #06B6D4
  return (
    <svg width="352" height="72" viewBox="0 0 352 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M176.259 0C176.897 0.000606425 177.532 0.258383 178.005 0.772135C179.03 1.88489 180.476 3.07024 182.276 3.56055C183.068 3.77735 183.763 3.90267 184.366 3.9668C185.732 4.11141 186.556 5.54964 186.001 6.80729C185.696 7.49836 185.386 8.24953 185.117 9.01693C184.346 11.1989 185.507 11.0945 187.689 11.862L192.917 13.6986C192.935 13.7839 197.393 34.925 176.26 47.9935V47.9961C176.26 47.9993 176.256 48 176.256 48C155.119 34.9317 159.577 13.7844 159.596 13.6979L164.82 11.8613C167.001 11.0939 168.163 11.1982 167.395 9.01628C167.122 8.24888 166.817 7.49771 166.507 6.80664C165.953 5.54898 166.78 4.11079 168.147 3.96615C168.749 3.90202 169.441 3.7767 170.236 3.5599C172.033 3.06958 173.479 1.88427 174.503 0.771484C174.977 0.257127 175.616 1.35879e-06 176.255 0H176.259ZM176.257 3.42318C176.158 3.42368 176.058 3.46004 175.978 3.53581C174.459 4.98626 172.788 5.96319 171.02 6.44531C170.742 6.52165 170.465 6.58935 170.192 6.64974C170.079 6.67792 169.978 6.75037 169.927 6.85482C169.87 6.95921 169.863 7.07966 169.902 7.18815C170.015 7.47349 170.116 7.75096 170.212 8.02409C170.414 8.59076 171.02 10.3144 170.2 11.9538C169.392 13.5567 167.89 14.0228 166.68 14.4004L166.64 14.4128C166.387 14.4931 166.11 14.5778 165.813 14.6823L162.55 15.8314C162.401 15.8833 162.297 16.0163 162.285 16.1771C162.104 18.3149 162.076 21.6822 162.968 25.5794C164.703 33.1895 169.099 39.4818 176.027 44.2793C176.095 44.3274 176.176 44.3516 176.256 44.3516H176.26C176.339 44.3509 176.415 44.3275 176.482 44.2799C190.232 34.7251 190.678 21.4453 190.232 16.1777C190.216 16.021 190.111 15.8839 189.962 15.832L186.696 14.6829C186.399 14.5784 186.125 14.4938 185.872 14.4134L185.832 14.401C184.623 14.0234 183.116 13.5576 182.312 11.9544C181.488 10.315 182.095 8.59134 182.296 8.02474C182.393 7.75174 182.497 7.47465 182.606 7.18945C182.646 7.08088 182.642 6.95997 182.585 6.85547C182.529 6.75106 182.433 6.67854 182.317 6.65039C182.043 6.59 181.77 6.5223 181.488 6.44596C179.72 5.96382 178.053 4.98687 176.53 3.53646C176.454 3.46435 176.358 3.42326 176.257 3.42318Z" fill="#06B6D4"/>
      <path d="M176.205 5.51042V5.51302C176.878 6.12349 177.584 6.63587 178.317 7.05339C178.468 7.1376 178.622 7.22238 178.777 7.29622C178.995 7.40866 179.213 7.50658 179.434 7.59766C179.624 7.67835 179.817 7.749 180.011 7.81576C180.204 7.8825 180.397 7.94199 180.594 7.99479C180.713 8.02979 180.836 8.06166 180.956 8.08984C180.91 8.21623 180.864 8.33941 180.818 8.46224C180.622 9.02831 180.014 12.083 180.868 13.7832C181.704 15.452 183.307 15.9478 184.364 16.278L184.402 16.2884C184.613 16.3552 184.849 16.4291 185.098 16.5169L187.74 17.444C187.906 19.6335 187.867 23.2633 186.56 27.3281C186.493 27.5319 186.423 27.7395 186.349 27.9466C186.258 28.2172 186.159 28.4879 186.05 28.7585C185.924 29.085 185.79 29.4117 185.646 29.7383C184.244 32.9427 181.985 36.284 178.394 39.3197C178.12 39.5517 177.842 39.7797 177.554 40.0046C177.123 40.3447 176.674 40.6815 176.205 41.0111V41.013C176.204 41.0164 176.201 41.0163 176.201 41.0163C170.407 36.9408 166.728 31.6282 165.266 25.2233C164.539 22.0402 164.528 19.271 164.665 17.444L167.301 16.5169C167.554 16.4291 167.789 16.3551 168 16.2884L168.035 16.2773C169.093 15.9471 170.695 15.452 171.531 13.7832C172.385 12.0826 171.78 9.02777 171.58 8.46224C171.538 8.33912 171.492 8.21623 171.447 8.08984C171.566 8.06167 171.686 8.03007 171.809 7.99479C173.376 7.56966 174.852 6.73328 176.201 5.50716L176.205 5.51042Z" fill="#06B6D4"/>
      <path d="M150.922 30.9517C151.978 30.846 152.941 30.3246 153.599 29.4919C154.257 28.6598 154.555 27.5847 154.429 26.5132C154.304 25.4417 153.765 24.4647 152.932 23.8073C152.1 23.1493 151.042 22.8648 149.991 23.0061C147.513 23.3386 145.034 23.671 142.556 24.0035C97.9496 29.9877 53.343 35.972 8.73636 41.9562C6.25822 42.2886 3.78006 42.6211 1.30192 42.9536C0.914101 43.0057 0.560504 43.2121 0.318471 43.5236C0.0764641 43.8353 -0.0341544 44.2266 0.0113944 44.6151C0.0569433 45.0037 0.255056 45.3588 0.562593 45.606C0.870105 45.8531 1.26185 45.9721 1.65121 45.9332C4.13905 45.6835 6.62691 45.4338 9.11475 45.1841C53.896 40.6897 98.6773 36.1952 143.459 31.7008C145.946 31.4511 148.434 31.2014 150.922 30.9517Z" fill="#06B6D4"/>
      <circle cx="17.3682" cy="42.5803" r="4" transform="rotate(-6.6861 17.3682 42.5803)" fill="#06B6D4"/>
      <path d="M20.1642 66.417C28.2693 65.4668 34.2459 58.615 34.3025 50.6597C34.3103 49.5552 33.3032 48.7672 32.2061 48.8958L4.39655 52.1558C3.2995 52.2844 2.50191 53.284 2.76501 54.3568C4.65992 62.0832 12.0591 67.3671 20.1642 66.417Z" fill="#06B6D4"/>
      <path d="M199.246 17.2329C198.19 17.3386 197.227 17.86 196.569 18.6927C195.911 19.5248 195.613 20.5999 195.739 21.6714C195.864 22.7428 196.403 23.7199 197.236 24.3773C198.068 25.0353 199.126 25.3198 200.177 25.1785C202.655 24.846 205.134 24.5135 207.612 24.1811C252.218 18.1968 296.825 12.2126 341.432 6.22838C343.91 5.89593 346.388 5.56347 348.866 5.23101C349.254 5.17889 349.607 4.97249 349.849 4.661C350.092 4.34929 350.202 3.95801 350.157 3.56945C350.111 3.1809 349.913 2.82581 349.605 2.57852C349.298 2.33145 348.906 2.21243 348.517 2.25141C346.029 2.5011 343.541 2.7508 341.053 3.00049C296.272 7.49492 251.491 11.9894 206.709 16.4838C204.222 16.7335 201.734 16.9832 199.246 17.2329Z" fill="#06B6D4"/>
      <circle cx="333.204" cy="5.5559" r="4" transform="rotate(-6.6861 333.204 5.5559)" fill="#06B6D4"/>
      <path d="M336 29.3935C344.105 28.4434 350.082 21.5915 350.138 13.6363C350.146 12.5317 349.139 11.7437 348.042 11.8723L320.232 15.1324C319.135 15.261 318.338 16.2606 318.601 17.3333C320.496 25.0598 327.895 30.3437 336 29.3935Z" fill="#06B6D4"/>
      <rect x="164.25" y="54" width="24" height="8" rx="2" fill="#06B6D4"/>
      <rect x="158.25" y="64" width="36" height="8" rx="2" fill="#06B6D4"/>
    </svg>
  )
}

function ShieldPanel({ cfg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      {/* Top: balance scale — 349.6 x 72, centered */}
      <div style={{ width: 352, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ShieldBalance />
      </div>
      {/* Bottom: full-width readout box */}
      <div style={{
        width: '100%',
        background: '#000',
        border: `3px solid ${cfg.color}`,
        borderRadius: '24px 12px 24px 24px',
        height: 135,
        boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0px 4px 4px rgba(0,0,0,0.25)',
      }}>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 80,
          lineHeight: '66px', color: '#fff',
        }}>120</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 32,
          lineHeight: '66px', color: '#fff',
          alignSelf: 'flex-end', marginBottom: 12, letterSpacing: '0.05em',
        }}>MIN</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 80,
          lineHeight: '66px', color: '#fff', margin: '0 18px',
        }}>/</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 60,
          lineHeight: '66px', color: cfg.color,
        }}>450</span>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 700, fontSize: 24,
          lineHeight: '66px', color: cfg.color,
          alignSelf: 'flex-end', marginBottom: 14, letterSpacing: '0.05em',
        }}>MIN</span>
      </div>
    </div>
  )
}

function GradientHeart() {
  // Exact heart shape from Figma export (Union.svg)
  return (
    <svg width="113" height="108" viewBox="0 0 113 108" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="burnHeartGrad" x1="49.9067" y1="0" x2="100.194" y2="73.6782" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" stopOpacity="0.9" />
          <stop offset="1" stopColor="#EC4899" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M101.928 0C108.33 10.0861 107.976 23.0382 100.544 32.3398C90.6186 44.7244 107.435 53.7818 112.398 41.3984L112.348 42.0439C112.34 42.1407 112.329 42.2373 112.32 42.334C112.313 42.4189 112.304 42.5039 112.296 42.5889C112.269 42.8626 112.24 43.1364 112.207 43.4102C112.19 43.5511 112.172 43.692 112.154 43.833C112.136 43.972 112.118 44.111 112.099 44.25C112.07 44.459 112.04 44.668 112.008 44.877C111.981 45.0514 111.953 45.2259 111.924 45.4004C109.08 62.5599 95.8146 79.6991 80.673 92.3359C80.5629 92.4279 80.4521 92.5189 80.3419 92.6104C80.1095 92.803 79.8769 92.9951 79.6437 93.1855C79.4992 93.3037 79.3548 93.4218 79.2101 93.5391C79.0555 93.6641 78.9001 93.788 78.7452 93.9121C71.2824 99.9 63.4622 104.772 56.2784 108C53.6686 106.826 51.117 105.55 48.6271 104.178C48.628 104.181 48.6291 104.184 48.63 104.187C31.203 94.5905 16.8593 80.2726 7.25597 62.8604C7.21846 62.7924 7.18103 62.7243 7.14366 62.6562C6.85692 62.1336 6.57418 61.6082 6.29601 61.0801C6.08375 60.6773 5.87334 60.2732 5.66613 59.8672C4.06527 56.7303 2.84553 53.7018 1.92296 50.8086C-8.99555 15.5032 29.0617 -2.22008 53.6095 17.1611C53.7192 17.2474 53.8279 17.3351 53.9366 17.4229C54.0529 17.5167 54.1687 17.6115 54.2843 17.707C54.3702 17.7782 54.4567 17.8488 54.5421 17.9209C54.9808 18.2896 55.4159 18.6701 55.8448 19.0635C63.1951 10.14 73.5288 4.00186 85.4093 2.73047C76.5677 5.86756 79.6045 16.4676 88.0128 15.6562C94.1699 15.0891 101.765 9.11341 101.928 0Z"
        fill="url(#burnHeartGrad)"
      />
    </svg>
  )
}

function BurnWaveform({ color }) {
  // Wave pattern from Figma: peaks (max) at indices 3 and 13. Heights in % of 80px height.
  // Sequence over 21 bars repeats; first 21 colored, next 21 faded.
  const seq = [20, 40, 64, 80, 64, 40, 20, 40, 64, 40, 20, 40, 64, 80, 64, 40, 20, 40, 64, 40, 20]
  const totalLeft = seq.length
  const totalBars = totalLeft * 2
  return (
    <svg width="100%" height="80" viewBox="0 0 521 80" preserveAspectRatio="none">
      {Array.from({ length: totalBars }, (_, i) => {
        const h = seq[i % totalLeft]
        const yTop = 40 - h / 2
        // Spread bars evenly across full width
        const x = 8 + (i * (505 / (totalBars - 1)))
        const c = i < totalLeft ? color : 'rgba(255,255,255,0.5)'
        return (
          <line
            key={i}
            x1={x} y1={yTop}
            x2={x} y2={yTop + h}
            stroke={c}
            strokeWidth={5}
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

function BurnPanel({ cfg }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top row: Heart + 3 black boxes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36, height: 108 }}>
        <div style={{ flexShrink: 0, width: 113, height: 108, display: 'flex', alignItems: 'center' }}>
          <GradientHeart />
        </div>
        {['3', '0', '0'].map((n, i) => (
          <div key={i} style={{
            flex: 1, height: 108,
            borderRadius: '24px 12px 24px 24px',
            background: '#000',
            boxShadow: 'inset 0px 4px 4px rgba(0,0,0,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Poppins', fontSize: 80, fontWeight: 700,
            color: '#fff', lineHeight: '66px',
          }}>{n}</div>
        ))}
      </div>
      {/* Bottom row: 50% + waveform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36, height: 80 }}>
        <span style={{
          fontFamily: 'Poppins', fontWeight: 900, fontSize: 40, lineHeight: '66px',
          background: `linear-gradient(192.26deg, ${cfg.color} 0.02%, ${rgba(cfg.color, 0.8)} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          flexShrink: 0,
          minWidth: 105,
        }}>50%</span>
        <div style={{ flex: 1 }}>
          <BurnWaveform color="#EA4898" />
        </div>
      </div>
    </div>
  )
}

function BuildPanel({ cfg }) {
  // 14 tick heights + center triangle (per Figma, gap 36):
  // 7 left ticks: 24,24,30,24,24,24,24 → triangle → 7 right: 24,24,24,24,30,24,24
  const tickHeights = [24, 24, 30, 24, 24, 24, 24, 24, 24, 24, 24, 30, 24, 24]
  const TRIANGLE_AT = 7  // index where triangle is inserted
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Scale ruler — black box, flex auto layout */}
      <div style={{
        background: '#000',
        borderRadius: '24px 12px 24px 24px',
        width: 661,
        height: 166,
        padding: '20px 48px',
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
      }}>
        {/* Numbers row — flex space-between with "kg" suffix */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'center',
          gap: 26, width: 549, height: 66,
        }}>
          <span style={{
            width: 126, textAlign: 'center',
            fontFamily: 'Poppins', fontSize: 55, fontWeight: 500, lineHeight: '66px', color: '#fff',
          }}>
            100<span style={{ fontSize: 28, fontWeight: 500 }}>kg</span>
          </span>
          <span style={{
            width: 198, textAlign: 'center',
            fontFamily: 'Poppins', fontSize: 80, fontWeight: 700, lineHeight: '66px', color: '#fff',
          }}>
            200<span style={{ fontSize: 36, fontWeight: 500 }}>kg</span>
          </span>
          <span style={{
            width: 139, textAlign: 'center',
            fontFamily: 'Poppins', fontSize: 55, fontWeight: 500, lineHeight: '66px', color: '#fff',
          }}>
            300<span style={{ fontSize: 28, fontWeight: 500 }}>kg</span>
          </span>
        </div>
        {/* Ticks row — flex with central triangle, gap 36 */}
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'center',
          gap: 36, width: 548, height: 44,
        }}>
          {tickHeights.slice(0, TRIANGLE_AT).map((h, i) => (
            <div key={`l-${i}`} style={{ width: 2, height: h, background: '#fff', flexShrink: 0 }} />
          ))}
          {/* Purple triangle marker, 44x44 */}
          <div style={{
            width: 0, height: 0,
            borderLeft: '22px solid transparent',
            borderRight: '22px solid transparent',
            borderBottom: `44px solid ${cfg.color}`,
          }} />
          {tickHeights.slice(TRIANGLE_AT).map((h, i) => (
            <div key={`r-${i}`} style={{ width: 2, height: h, background: '#fff', flexShrink: 0 }} />
          ))}
        </div>
      </div>
      {/* Progress bar — matches Figma: 75% fill, "75%" label near right edge of fill */}
      <div style={{
        position: 'relative',
        height: 40,
        borderRadius: '12px 6px 12px 12px',
        background: 'rgba(255,255,255,0.5)',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '75%', height: '100%',
          background: cfg.color,
          borderRadius: '12px 6px 12px 12px',
        }} />
        <span style={{
          position: 'absolute',
          right: 'calc(25% + 12px)',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'Poppins', fontSize: 24, fontWeight: 700, lineHeight: '34px',
          color: '#fff',
        }}>75%</span>
      </div>
    </div>
  )
}

function GoalPanel({ cfg }) {
  return (
    <Panel x={659} w={805} color={cfg.color}>
      {/* Title — matches Figma: 54px font 800, line-height 60, "Group Target" 36px below */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontSize: 54, fontWeight: 800, lineHeight: '60px', letterSpacing: '0.01em' }}>Prime</span>
          <span style={{ fontSize: 54, fontWeight: 800, lineHeight: '60px', color: cfg.color, letterSpacing: '0.01em' }}>{cfg.label}</span>
        </div>
        <div style={{ fontSize: 36, fontWeight: 500, lineHeight: '46px', color: '#fff' }}>Group Target</div>
      </div>

      {/* Inner goal card — matches Figma Frame 1707480388 */}
      <div style={{
        padding: 36,
        borderRadius: RADIUS,
        background: 'rgba(255,255,255,0.10)',
        border: `3px solid ${cfg.color}`,
        display: 'flex', flexDirection: 'column', gap: 48,
        boxSizing: 'border-box',
      }}>
        {/* Top section: headline + training goal text (gap 16) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Headline with icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <HeadlineIcon cfg={cfg} />
            <span style={{ fontSize: 36, fontWeight: 600, lineHeight: '46px' }}>{cfg.goalHeadline}</span>
          </div>

          {/* Training Goal */}
          <div style={{ fontSize: 24, fontWeight: 600, lineHeight: '34px', color: '#fff' }}>
            <span style={{ fontWeight: 700 }}>Training Goal:</span>{' '}
            {cfg.goalBody}
          </div>
        </div>

        {/* Bottom section: visualization (gap 24 internal) */}
        {cfg.mode === 'shield' && <ShieldPanel cfg={cfg} />}
        {cfg.mode === 'burn'   && <BurnPanel   cfg={cfg} />}
        {cfg.mode === 'scale'  && <BuildPanel  cfg={cfg} />}
      </div>
    </Panel>
  )
}

function ContributorRow({ c, cfg, opacity }) {
  return (
    <div style={{
      borderRadius: RADIUS,
      background: rgba(cfg.color, opacity),
      padding: 24,
      display: 'flex', flexDirection: 'column', gap: 16,
      flex: 1, minHeight: 0,
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: 48, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>#{c.rank}</span>
        <span style={{ fontSize: 32, fontWeight: 600, color: '#fff' }}>{c.name}</span>
        <div style={{ marginLeft: 'auto' }}>
          <Medal tier={c.medal} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        <div style={{
          flex: 1, background: '#fff', borderRadius: 14,
          padding: '8px 18px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          boxShadow: '0px 0px 16px rgba(0,0,0,0.06)',
        }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#000' }}>REPS</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#000', lineHeight: 1.15 }}>{c.reps}</span>
        </div>
        <div style={{
          flex: 1, background: '#fff', borderRadius: 14,
          padding: '8px 18px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          boxShadow: '0px 0px 16px rgba(0,0,0,0.06)',
        }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#000' }}>KG</span>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#000', lineHeight: 1.15 }}>{c.kg}</span>
        </div>
      </div>
    </div>
  )
}

function ContributorsPanel({ cfg }) {
  // Different opacities per rank: #1=1.0, #2=0.75, #3=0.5
  const opacities = [1, 0.75, 0.5]
  return (
    <Panel x={50} w={573} color={cfg.color}>
      <div style={{ fontSize: 36, fontWeight: 600, color: '#fff' }}>Top Contributors</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, flex: 1 }}>
        {CONTRIBUTORS.map((c, i) => (
          <ContributorRow key={c.rank} c={c} cfg={cfg} opacity={opacities[i]} />
        ))}
      </div>
    </Panel>
  )
}

function StructurePanel({ cfg }) {
  return (
    <div style={{ position: 'absolute', top: 142, left: 1500 }}>
      <TrainingStructure color={cfg.color} />
    </div>
  )
}

export default function PrimeTarget({ variant = 'BUILD' } = {}) {
  const cfg = VARIANTS[variant] ?? VARIANTS.BUILD
  return (
    <ScaledFrame>
      <StageBackground variant="dark" glowColor={cfg.color}>
        <ContributorsPanel cfg={cfg} />
        <GoalPanel cfg={cfg} />
        <StructurePanel cfg={cfg} />
      </StageBackground>
    </ScaledFrame>
  )
}
