export const workoutData = {
  name: "Upper Body Power",
  tags: ["Strength Training", "Push Focus", "30 Minutes"],
  goal: {
    description:
      "Full Body work that combines dynamic strength, static stability, and aerobics.",
    targetReps: 1800,
  },
  equipment: ["Jump Rope", "Resistance Band", "TRX", "Cable Machine"],
  sections: [
    {
      id: "warmup",
      name: "Warm-up",
      duration: "5 Minutes",
      theme: "warmup",
      exercises: [
        { id: "w1", set: 1, name: "Arm Circles", detail: "Time: 30s", reps: 30 },
        { id: "w2", set: 2, name: "Band Pull Aparts", detail: "Time: 30s", reps: 30 },
        { id: "w3", set: 3, name: "Shoulder Rotations", detail: "Time: 30s", reps: 30 },
      ],
    },
    {
      id: "main",
      name: "Main Part",
      duration: "22 Minutes",
      theme: "mainpart",
      exercises: [
        { id: "m1", set: 1, name: "Chest Press", detail: "Sets/Reps: 3x12", reps: 36 },
        { id: "m2", set: 2, name: "Shoulder Press", detail: "Weight: 3x12", reps: 36 },
        { id: "m3", set: 3, name: "Incline Press", detail: "Weight: 3x10", reps: 30 },
        { id: "m4", set: 4, name: "Triceps Ext", detail: "Weight: 3x15", reps: 45 },
        { id: "m5", set: 5, name: "Push-ups", detail: "Weight: 2x10", reps: 20 },
      ],
    },
    {
      id: "cooldown",
      name: "Cool-down",
      duration: "3 Minutes",
      theme: "cooldown",
      exercises: [
        { id: "c1", set: 1, name: "Chest Stretch", detail: "Time: 30s", reps: 30 },
        { id: "c2", set: 2, name: "Shoulder Stretch", detail: "Time: 30s", reps: 30 },
      ],
    },
  ],
}
