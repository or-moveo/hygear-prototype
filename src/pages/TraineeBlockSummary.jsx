import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'

/* Variant brand colours (matches TraineeBuildAlert / PrimeTarget). */
const VARIANTS = {
  BUILD:  { color: '#a855f7', solid: '#A855F7', primeFrom: '#c084fc', primeTo: '#a855f7', cardRgb: '168, 85, 247' },
  BURN:   { color: '#ec4899', solid: '#EC4899', primeFrom: '#f472b6', primeTo: '#ec4899', cardRgb: '234, 72, 152' },
  SHIELD: { color: '#06b6d4', solid: '#06B6D4', primeFrom: '#38C5DD', primeTo: '#06b6d4', cardRgb: '6, 182, 212' },
}
const CARD_RADIUS = '36px 18px 36px 36px'
const ROW_RADIUS  = '16px 8px 16px 16px'
const FRAME_W = 1366
const FRAME_H = 1024  // Same as other Trainee pages — the 1710-tall content overflows
                      // and gets clipped at the bottom, hinting at scrollability.

/* Trainee Hygear wordmark (same asset used in TraineeBuildAlert). */
const HygearLogo = ({ width = 67, height = 40 }) => (
  <svg width={width} height={height} viewBox="0 0 67 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.1781 6.64782C21.8409 6.61919 25.5342 6.52778 25.936 6.73555C26.372 6.96106 27.5728 9.03313 27.9363 9.60008L31.4571 15.0695C32.0091 15.9238 32.5586 16.783 33.1127 17.6329C33.3382 17.9788 33.5144 18.005 33.7314 17.686C34.3548 16.7695 34.9773 15.7808 35.575 14.8543L38.9593 9.60715C39.4832 8.79215 39.9796 7.9177 40.5574 7.14313C40.6761 6.98364 40.8363 6.77661 41.0289 6.70856C41.1824 6.65442 41.3445 6.63497 41.5062 6.62684C41.905 6.60688 45.5246 6.5959 45.7164 6.69868C45.7437 6.71336 45.7742 6.72997 45.7808 6.76168C45.8132 6.92434 45.7039 7.10801 45.6246 7.24333C45.3765 7.66825 45.0757 8.07165 44.8023 8.48129L43.107 11.0215L37.2246 19.855C37.025 20.1407 36.8106 20.493 36.7466 20.8395C36.4167 22.6265 36.223 24.4536 35.9802 26.2523L34.5996 36.1057C34.5117 36.7753 34.4278 37.4454 34.348 38.1159C34.3042 38.4698 34.2739 38.8414 34.1832 39.1852C34.0853 39.5087 33.8969 39.5341 33.619 39.5579C32.4878 39.6552 32.6637 38.9646 32.563 38.1477C32.4618 37.3427 32.3532 36.5388 32.2372 35.7359C31.5911 31.4936 31.0913 27.2276 30.493 22.9785C30.3917 22.2595 30.3046 21.1777 30.0412 20.5252C29.7354 19.7674 28.7825 18.5351 28.2951 17.7981L23.3603 10.3926L21.8973 8.19735C21.6903 7.88559 21.2402 7.23598 21.0957 6.92075C21.0889 6.77762 21.0965 6.76239 21.1781 6.64782Z" fill="white"/>
    <path d="M19.6211 7.57471C19.7774 7.58807 19.7195 7.56533 19.8421 7.65713C19.9175 7.78635 19.957 7.97662 19.9729 8.12408C20.7141 14.9602 22.3589 21.6822 24.9957 28.0413C26.1433 30.8089 27.5893 33.7327 29.289 36.2396C29.6834 36.8276 30.0983 37.4016 30.5329 37.9606C30.7517 38.2389 31.3603 38.8991 31.4729 39.243C31.4798 39.2641 31.4288 39.3051 31.4078 39.327C30.8257 39.5313 28.1482 38.7295 27.5104 38.5122C27.2918 38.4882 26.2699 38.0262 26.0237 37.9191C22.6449 36.4106 19.7828 33.9442 17.7916 30.8255C15.5352 27.3015 14.4954 23.1355 14.8313 18.9646C15.104 15.2649 16.3377 11.8147 18.5372 8.81393C18.812 8.43893 19.2449 7.81486 19.6211 7.57471Z" fill="white"/>
    <path d="M47.0892 7.56299C47.4873 7.60736 47.8939 8.23424 48.1298 8.54354C49.8459 10.7941 50.963 13.2644 51.6037 16.0125C52.6302 20.4447 52.074 25.0964 50.031 29.1615C47.972 33.3287 43.8904 36.9851 39.4814 38.4757C39.2486 38.5708 38.8758 38.6775 38.6363 38.7482C38.1937 38.8788 35.6011 39.6567 35.4102 39.2313C35.4716 38.9734 36.617 37.6185 36.8495 37.2892C42.0634 29.9063 44.8533 20.8666 46.3873 12.0375C46.5068 11.3499 46.8408 7.88857 47.0892 7.56299Z" fill="white"/>
    <path d="M18.3805 0.398264C19.2333 0.360692 20.2034 0.378417 21.063 0.378268L25.4205 0.377802L38.7705 0.377844L45.272 0.378494C45.9731 0.378593 48.072 0.334462 48.672 0.464197L48.7122 0.568709C48.6891 0.821443 46.6087 4.92874 46.3048 5.24371C46.1118 5.16714 45.9192 5.08847 45.7274 5.00769C40.5169 2.50204 34.9707 1.55099 29.2422 2.47968C26.8808 2.86251 24.7656 3.39583 22.5639 4.34273C22.2954 4.4582 20.6215 5.36581 20.4942 5.12886C20.1451 4.4791 18.2129 1.15317 18.1562 0.600197C18.2239 0.451182 18.2102 0.493045 18.3805 0.464197Z" fill="white"/>
  </svg>
)

/* The 5 zone rows are identical across all 3 zone tables (per Figma spec). */
const ZONE_ROWS = [
  { label: 'ZONE 1', time: '2:45', from: 'rgba(58, 134, 255, 0.5)',  to: 'rgba(58, 134, 255, 0)'  },
  { label: 'ZONE 2', time: '1:45', from: 'rgba(35, 184, 112, 0.5)',  to: 'rgba(35, 184, 112, 0)'  },
  { label: 'ZONE 3', time: '2:45', from: 'rgba(255, 208, 0, 0.5)',   to: 'rgba(255, 208, 0, 0)'   },
  { label: 'ZONE 4', time: '4:45', from: 'rgba(255, 107, 0, 0.5)',   to: 'rgba(249, 185, 6, 0)'   },
  { label: 'ZONE 5', time: '7:45', from: 'rgba(245, 54, 92, 0.5)',   to: 'rgba(245, 54, 92, 0)'   },
]

/* Per-variant zone-table order + right-column stat cards. */
const VARIANT_CONTENT = {
  BURN: {
    zoneTables: ['Heart Rate Zone', 'Dynamic Force Zone', 'Stability Zone'],
    midCard:    { kind: 'single', label: 'Max Heart Rate',     value: '189' },
    botCard:    { kind: 'single', label: 'Average Heart Rate', value: '150' },
  },
  BUILD: {
    zoneTables: ['Dynamic Force Zone', 'Heart Rate Zone', 'Stability Zone'],
    midCard:    { kind: 'pair',
      left:  { label: 'Total Weight',   value: '189', width: 181 },
      right: { label: 'Average Weight', value: '189', width: 230 },
    },
    botCard:    { kind: 'single', label: 'Total Reps', value: '150', labelW: 148 },
  },
  SHIELD: {
    zoneTables: ['Stability Zone', 'Heart Rate Zone', 'Dynamic Force Zone'],
    midCard:    { kind: 'pair', gap: 22,
      left:  { label: 'Max Stability Score',     value: '189', width: 280 },
      right: { label: 'Average Stability Score', value: '189', width: 333 },
    },
    botCard:    { kind: 'single', label: 'Total Stability Time', value: '150', labelW: 290 },
  },
}

/* Stat block — used inside the middle/bottom right cards. */
const StatBlock = ({ label, value, width = 217, labelW }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
    width, height: 170,
  }}>
    <span style={{
      width: labelW ?? width, height: 38,
      fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 28, lineHeight: '38px',
      color: '#FFFFFF', textAlign: 'center', whiteSpace: 'nowrap',
    }}>{label}</span>
    <span style={{
      height: 100,
      fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 100, lineHeight: '100px',
      color: '#FFFFFF', textAlign: 'center',
    }}>{value}</span>
  </div>
)

const ZoneRow = ({ label, time, from, to }) => (
  <div style={{
    display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 20px 8px 20px', gap: 80,
    width: 451, height: 74, boxSizing: 'border-box',
    background: `linear-gradient(90deg, ${from} 0%, ${to} 100%)`,
    borderRadius: ROW_RADIUS,
  }}>
    <span style={{
      fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 38, lineHeight: '58px',
      color: '#FFFFFF',
    }}>{label}</span>
    <span style={{
      fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 36, lineHeight: '46px',
      color: '#FFFFFF', textAlign: 'center',
    }}>{time}</span>
  </div>
)

const ZoneTable = ({ title }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
    padding: 0, gap: 12, width: 451,
  }}>
    {/* Section title bar (white-fade gradient) */}
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      padding: '4px 0 4px 20px', gap: 80,
      width: 451, height: 46, boxSizing: 'border-box',
      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
      borderRadius: ROW_RADIUS,
    }}>
      <span style={{
        fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 28, lineHeight: '38px',
        color: '#FFFFFF',
      }}>{title}</span>
    </div>
    {ZONE_ROWS.map(r => <ZoneRow key={r.label} {...r} />)}
  </div>
)

/* Medal — gold/silver/bronze styled SVG with red ribbons (matches Figma art). */
const MEDAL_COLORS = {
  gold:   { ribbon: '#F41943', ribbon2: '#BA0F38', disc1: '#F9B906', disc2: '#E8A615', disc3: '#FFC943' },
  bronze: { ribbon: '#F41943', ribbon2: '#BA0F38', disc1: '#E37F22', disc2: '#BA6017', disc3: '#F79A4D' },
  silver: { ribbon: '#F41943', ribbon2: '#BA0F38', disc1: '#EBF2F2', disc2: '#C3DBDA', disc3: '#FFFFFF' },
}
const Medal = ({ kind = 'gold' }) => {
  const c = MEDAL_COLORS[kind]
  return (
    <svg width={60.5} height={55.56} viewBox="0 0 60.5 55.56" fill="none" aria-hidden="true">
      {/* shadow under the disc */}
      <ellipse cx="30.25" cy="54.4" rx="14.5" ry="1.16" fill="rgba(0,0,0,0.5)" />
      {/* Two crossing ribbons */}
      <polygon points="13.6,0 24.6,0 36.0,38 25.0,38" fill={c.ribbon} />
      <polygon points="35.9,0 46.9,0 35.5,38 24.5,38" fill={c.ribbon} />
      <polygon points="13.6,0 17.0,0 27.5,38 24.5,38" fill={c.ribbon2} />
      <polygon points="43.5,0 46.9,0 36.0,38 33.0,38" fill={c.ribbon2} />
      {/* Disc */}
      <circle cx="30.25" cy="42" r="13.5" fill={c.disc1} />
      <circle cx="30.25" cy="42" r="11.5" fill={c.disc2} />
      <circle cx="30.25" cy="42" r="9"    fill={c.disc3} />
      <circle cx="30.25" cy="42" r="5.5"  fill={c.disc1} />
    </svg>
  )
}

export default function TraineeBlockSummary({ variant = 'BURN' } = {}) {
  const v = VARIANTS[variant] ?? VARIANTS.BURN
  const content = VARIANT_CONTENT[variant] ?? VARIANT_CONTENT.BURN
  const cardBg = `linear-gradient(192.26deg, rgba(${v.cardRgb}, 0.6) 0%, rgba(${v.cardRgb}, 0.3) 99.98%)`

  /* Renders a stat card body — either a single stat centered, or a pair separated
     by a 2px white-25% vertical divider (Vector 3 in the Figma spec). */
  const renderStatCard = (cfg) => {
    if (cfg.kind === 'pair') {
      return (
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start',
          gap: cfg.gap ?? 66, height: 170, margin: '0 auto',
        }}>
          <StatBlock label={cfg.left.label}  value={cfg.left.value}  width={cfg.left.width} />
          <div style={{ width: 0, height: 170, border: '2px solid rgba(255, 255, 255, 0.25)' }} />
          <StatBlock label={cfg.right.label} value={cfg.right.value} width={cfg.right.width} />
        </div>
      )
    }
    return (
      <div style={{ margin: '0 auto' }}>
        <StatBlock label={cfg.label} value={cfg.value} labelW={cfg.labelW} />
      </div>
    )
  }

  return (
    <ScaledFrame frameWidth={FRAME_W} frameHeight={FRAME_H}>
      <StageBackground variant="dark" glowColor={v.color} frameWidth={FRAME_W} frameHeight={FRAME_H} showTopbar={false}>
        {/* Top bar — black bg, hygear logo + trainee name on the left, variant pill on the right. */}
        <div style={{
          position: 'absolute', left: 0, top: 0, width: FRAME_W, height: 105,
          background: '#020202', borderBottom: '1px solid #FFFFFF',
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          padding: '25px 36px', boxSizing: 'border-box', zIndex: 10,
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <HygearLogo width={67} height={40} />
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 36, lineHeight: '46px',
              color: '#FFFFFF',
            }}>Adar Shirasi</span>
          </div>
          <div style={{
            width: 100, height: 54, padding: '10px 20px', borderRadius: 10,
            background: `linear-gradient(180deg, ${v.primeFrom} 0%, ${v.primeTo} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box',
          }}>
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 26, lineHeight: '34px',
              color: '#FFFFFF',
            }}>S1</span>
          </div>
        </div>

        {/* LEFT — "Division by zone" card: 523×1710 at (36, 141). */}
        <div style={{
          position: 'absolute', left: 36, top: 141, width: 523, height: 1710,
          background: cardBg, borderRadius: CARD_RADIUS,
          padding: 36, gap: 30, boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 36, lineHeight: '46px',
            color: '#FFFFFF',
          }}>Division by zone</span>

          {/* ZONES / TOTAL header row */}
          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
            alignItems: 'center', width: 451, height: 46, padding: 0,
          }}>
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 36, lineHeight: '46px',
              color: '#FFFFFF',
            }}>ZONES</span>
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 36, lineHeight: '46px',
              color: '#FFFFFF', paddingRight: 20,
            }}>TOTAL</span>
          </div>

          {/* 3 zone tables stacked, gap 36 between them (order varies per variant). */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 36, width: 451,
          }}>
            {content.zoneTables.map(title => <ZoneTable key={title} title={title} />)}
          </div>
        </div>

        {/* RIGHT — My Medals card: 735×242 at (595, 141).
            Exact Figma layout (Frames 1707480407 / 1707480398 / 1707480410). */}
        <div style={{
          position: 'absolute', left: 595, top: 141, width: 735, height: 242,
          background: cardBg, borderRadius: CARD_RADIUS,
          padding: 24, gap: 24, boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
        }}>
          {/* Frame 1707480407 — column with header row + body pill row, gap 12.01.
              Layout matches the Figma spec exactly:
                Header (Frame 1707480398): 3 children (My Medals | medals-group(383.6) | TOTAL),
                  flex row, justify-content: space-between, gap 60.06.
                Body   (Frame 1707480410): 2 children (#1 Ben(120.02) | numbers-group(400.6)),
                  flex row, justify-content: space-between, gap 60.06,
                  padding 12.0123 0 12.0123 15.0153 (gold-fade pill). */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12.01,
            width: 680.94,
          }}>
            {/* Frame 1707480398 — header row */}
            <div style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
              gap: 60.06, width: 680.94, height: 55.56,
            }}>
              <span style={{
                width: 147, height: 35, flex: 'none',
                fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 27.0276, lineHeight: '35px',
                color: '#FFFFFF', whiteSpace: 'nowrap',
              }}>My Medals</span>
              {/* Frame 1707480401 — 3 medals group, gap 39.04, width 383.6 */}
              <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 39.04,
                width: 383.6, height: 55.56, flex: 'none',
              }}>
                <Medal kind="gold"   />
                <Medal kind="bronze" />
                <Medal kind="silver" />
              </div>
              <span style={{
                width: 85, height: 35, flex: 'none',
                fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 27.0276, lineHeight: '35px',
                color: '#FFFFFF', whiteSpace: 'nowrap',
              }}>TOTAL</span>
            </div>

            {/* Frame 1707480410 — body pill row */}
            <div style={{
              display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
              gap: 60.06, width: 680.94, height: 68.02,
              padding: '12.0123px 0 12.0123px 15.0153px', boxSizing: 'border-box',
              background: 'linear-gradient(90deg, rgba(249, 185, 6, 0.5) 0%, rgba(249, 185, 6, 0) 100%)',
              borderRadius: '12.0123px 6.00613px 12.0123px 12.0123px',
            }}>
              {/* Frame 1707480405 — "#1 Ben" group, width 120.02, gap 12.01 */}
              <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12.01,
                width: 120.02, height: 44, flex: 'none',
              }}>
                <span style={{
                  width: 47, height: 44, flex: 'none',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 36.0368, lineHeight: '44px',
                  color: '#FFFFFF',
                }}>#1</span>
                <span style={{
                  width: 55, height: 44, flex: 'none',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 28.5291, lineHeight: '44px',
                  color: '#FFFFFF',
                }}>Ben</span>
              </div>
              {/* Frame 1707480404 — numbers group: 3×100 (292.8) + gap 39.79 + 300 (68.02), width 400.6 */}
              <div style={{
                display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 39.79,
                width: 400.6, height: 35, flex: 'none',
              }}>
                {/* Frame 1707480403 — 3 × 100 (each 97.6 wide), 292.8 total */}
                <div style={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center',
                  width: 292.8, height: 35,
                }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 97.6, height: 35,
                      fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 27.0276, lineHeight: '35px',
                      color: '#FFFFFF', textAlign: 'center',
                    }}>100</span>
                  ))}
                </div>
                {/* Frame 1707480400 — 300 (53 wide) + 15.0153 right padding */}
                <div style={{
                  display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
                  width: 68.02, height: 35,
                  padding: '0 15.0153px 0 0', boxSizing: 'border-box',
                }}>
                  <span style={{
                    width: 53, height: 35,
                    fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 27.0276, lineHeight: '35px',
                    color: '#FFFFFF', textAlign: 'center',
                  }}>300</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — middle stat card: 735×266 at (595, 419). Variant-driven content. */}
        <div style={{
          position: 'absolute', left: 595, top: 419, width: 735, height: 266,
          background: cardBg, borderRadius: CARD_RADIUS,
          padding: 48, gap: 48, boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {renderStatCard(content.midCard)}
        </div>

        {/* RIGHT — bottom stat card: 735×267 at (595, 721). Variant-driven content. */}
        <div style={{
          position: 'absolute', left: 595, top: 721, width: 735, height: 267,
          background: cardBg, borderRadius: CARD_RADIUS,
          padding: 48, gap: 48, boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {renderStatCard(content.botCard)}
        </div>
      </StageBackground>
    </ScaledFrame>
  )
}
