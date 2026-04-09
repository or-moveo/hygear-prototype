/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'workout-dark': '#1e1b5e',
        'warmup': '#f87171',
        'mainpart': '#34c47c',
        'cooldown': '#8aafd4',
        'equipment-bg': '#d4f0e2',
      },
    },
  },
  plugins: [],
}
