import AthleteCard from '../components/AthleteCard'
import ScaledFrame from '../components/ScaledFrame'
import StageBackground from '../components/StageBackground'
import { studioData } from '../data/studio'

export default function DuringExercise2() {
  const { name, progressPercent, athletes } = studioData

  // Split 16 athletes into rows of 4
  const rows = []
  for (let i = 0; i < athletes.length; i += 4) {
    rows.push(athletes.slice(i, i + 4))
  }

  return (
    <ScaledFrame>
    <StageBackground studioName={name}>
    <div className="font-poppins" style={{ position: 'absolute', inset: 0, zIndex: 5, paddingTop: 142 }}>

      {/* Athlete grid */}
      <div className="px-12 pb-12 flex flex-col gap-5">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-4 gap-6">
            {row.map((athlete) => (
              <AthleteCard key={athlete.id} {...athlete} />
            ))}
          </div>
        ))}
      </div>
    </div>
    </StageBackground>
    </ScaledFrame>
  )
}
