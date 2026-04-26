import { useState, useEffect } from 'react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'

const CYAN = '#06B6D4'
const RADIUS = '36px 18px 36px 36px'

// Per-digit box widths so each glyph sits with consistent visual padding.
// Heights / styles stay constant; only width adjusts to glyph proportions.
const DIGIT_BOX = {
  1: 245,
  2: 297,
  3: 302,
}

export default function Counting() {
  const [digit, setDigit] = useState(3)

  useEffect(() => {
    // Cycle 3 → 2 → 1 → 3 → 2 → 1 … (1 second per digit)
    const id = setInterval(() => {
      setDigit(d => (d <= 1 ? 3 : d - 1))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <ScaledFrame>
      <StageBackground variant="dark" glowColor={CYAN}>
        <style>{`
          @keyframes count-pop {
            0%   { opacity: 0; transform: scale(0.55); }
            25%  { opacity: 1; transform: scale(1.06); }
            45%  { opacity: 1; transform: scale(1); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}</style>

        {/* Outer cyan glass card with backdrop blur */}
        <div
          style={{
            position: 'absolute',
            width: 1820,
            height: 888,
            left: 50,
            top: 142,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '66px 8px',
            gap: 36,
            background: `linear-gradient(192.26deg, rgba(6,182,212,0.6) 0.02%, rgba(6,182,212,0.3) 100%)`,
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
            borderRadius: RADIUS,
            boxSizing: 'border-box',
            fontFamily: 'Poppins, sans-serif',
            overflow: 'hidden',
          }}
        >
          {/* Inner black box — width adapts per digit */}
          <div
            key={digit}
            style={{
              width: DIGIT_BOX[digit] ?? 245,
              height: 372,
              background: '#000000',
              borderRadius: RADIUS,
              padding: '36px 66px',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'count-pop 1s ease-out forwards',
            }}
          >
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 300,
                lineHeight: '300px',
                color: '#FFFFFF',
                userSelect: 'none',
              }}
            >
              {digit}
            </span>
          </div>
        </div>
      </StageBackground>
    </ScaledFrame>
  )
}
