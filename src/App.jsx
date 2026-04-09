import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import WorkoutHeaderCard from './components/WorkoutHeaderCard'
import TrainingGoalCard from './components/TrainingGoalCard'
import EquipmentCard from './components/EquipmentCard'
import ExerciseSection from './components/ExerciseSection'
import { workoutData } from './data/workout'

export default function App() {
  const [completedIds, setCompletedIds] = useState(new Set())
  const [currentReps, setCurrentReps] = useState(0)

  const handleToggle = (id, reps) => {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        setCurrentReps((r) => Math.max(0, r - reps))
      } else {
        next.add(id)
        setCurrentReps((r) => r + reps)
      }
      return next
    })
  }

  const handleReset = () => {
    setCompletedIds(new Set())
    setCurrentReps(0)
  }

  return (
    <div className="min-h-screen bg-[#f2f2f5] p-6">
      <div className="max-w-5xl mx-auto">
        <Header />

        {/* Top row */}
        <div className="grid grid-cols-[5fr_4fr_4fr] gap-4 mb-4">
          <WorkoutHeaderCard name={workoutData.name} tags={workoutData.tags} />
          <TrainingGoalCard
            description={workoutData.goal.description}
            currentReps={currentReps}
            targetReps={workoutData.goal.targetReps}
            onReset={handleReset}
          />
          <EquipmentCard equipment={workoutData.equipment} />
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-3 gap-4 items-start">
          {workoutData.sections.map((section) => (
            <ExerciseSection
              key={section.id}
              section={section}
              completedIds={completedIds}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
