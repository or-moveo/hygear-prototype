import { useEffect } from 'react'
import { X } from '@phosphor-icons/react'
import Confetti from './ui/confetti'

const imgArrowsReps = '/assets/arrows-reps-blue.svg'

export default function GoalCompletePopup({ onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])


  return (
    /* Backdrop */
    <>
    <Confetti isActive={true} duration={6000} zIndex={400} />
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
    >
      {/* Popup card — slightly smaller than screen */}
      <div
        className="relative flex flex-col rounded-[28px] overflow-y-auto"
        style={{
          width: '88vw',
          maxWidth: 860,
          maxHeight: '82vh',
          background: 'linear-gradient(160deg, #c9dff0 0%, #e8f1f8 50%, #d6e8f5 100%)',
          padding: '44px 52px',
          boxShadow: '0 24px 80px rgba(0,0,0,0.3)',
          gap: 24,
        }}
        onClick={e => e.stopPropagation()}
      >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 flex items-center justify-center w-12 h-12 rounded-full bg-white/40 hover:bg-white/60 transition-colors"
      >
        <X size={22} className="text-[#3a86ff]" weight="bold" />
      </button>

      {/* Content */}
      <div className="flex flex-col gap-[28px] w-full">
        {/* Header text */}
        <div className="flex flex-col gap-[12px]">
          <p
            className="font-poppins font-semibold text-[#3a86ff] uppercase"
            style={{ fontSize: 18, letterSpacing: '0.14em', lineHeight: '26px' }}
          >
            CONGRAGELETIONS
          </p>
          <p
            className="font-poppins font-bold text-[#3a86ff] whitespace-nowrap"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          >
            GOAL COMPLETE!!!
          </p>
          <p
            className="font-poppins font-semibold text-black"
            style={{ fontSize: 18, lineHeight: '28px' }}
          >
            Perfect! Team completed 100% of training goals
          </p>
        </div>

        {/* Group Target card */}
        <div
          className="bg-white rounded-[20px] p-[32px] flex flex-col gap-[20px]"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
        >
          <p
            className="font-poppins font-semibold text-black uppercase"
            style={{ fontSize: 20, lineHeight: '28px', letterSpacing: '0.06em' }}
          >
            GROUP TARGET
          </p>

          <div className="flex items-center gap-[20px]">
            <img src={imgArrowsReps} alt="" className="w-[52px] h-[52px] shrink-0" />
            <p
              className="font-poppins font-semibold text-black whitespace-nowrap"
              style={{ fontSize: 40, lineHeight: '48px' }}
            >
              Reps 1800/1800
            </p>
          </div>

          {/* Progress bar — 100% */}
          <div className="w-full h-[14px] rounded-full bg-[#e8f1f8]">
            <div className="h-full w-full rounded-full bg-[#3a86ff]" />
          </div>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}
