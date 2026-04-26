import { Pause } from '@phosphor-icons/react'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'

const CYAN = '#06B6D4'
const RADIUS = '36px 18px 36px 36px'

export default function TrainingStopped() {
  return (
    <ScaledFrame>
      <StageBackground variant="dark" glowColor={CYAN}>
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
            padding: 8,
            gap: 36,
            background: 'linear-gradient(192.26deg, rgba(6,182,212,0.6) 0.02%, rgba(6,182,212,0.3) 100%)',
            backdropFilter: 'blur(50px)',
            WebkitBackdropFilter: 'blur(50px)',
            borderRadius: RADIUS,
            boxSizing: 'border-box',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {/* Inner black card */}
          <div
            style={{
              width: 1158,
              height: 436,
              background: '#000000',
              borderRadius: RADIUS,
              padding: 66,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 36,
            }}
          >
            {/* Pause icon — two cyan vertical bars */}
            <div style={{ width: 100, height: 100, position: 'relative' }}>
              <Pause size={100} weight="bold" color={CYAN} />
            </div>

            {/* Title */}
            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 80,
                lineHeight: '66px',
                color: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              Training stopped
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: 40,
                lineHeight: '52px',
                color: '#FFFFFF',
                textAlign: 'center',
                opacity: 0.95,
              }}
            >
              The coach will resume training soon
            </div>
          </div>
        </div>
      </StageBackground>
    </ScaledFrame>
  )
}
