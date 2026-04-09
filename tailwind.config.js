/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // HyGear Studio tokens — nested so Tailwind resolves shades correctly
        hg: {
          green: {
            DEFAULT: '#43a77c',
            50:      '#edf3ef',
            subtle:  '#d9e7e0',
          },
        },
        // Legacy workout tokens
        'workout-dark': '#1e1b5e',
        'warmup': '#f87171',
        'mainpart': '#34c47c',
        'cooldown': '#8aafd4',
        'equipment-bg': '#d4f0e2',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
