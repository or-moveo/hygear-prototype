# HyGear Studio — AI Agent Prototype

Interactive UI prototype for the **HyGear Studio** AI-powered training platform. Built for design exploration and client demos — simulates the full studio screen flow from high-level training overview through cooldown.

---

## Stack

- **React + Vite** — component-based UI
- **Tailwind CSS** — utility-first styling
- **Phosphor Icons** — icon library
- **HLS video playback** — exercise demonstration videos via Cloudinary

---

## Screens

| # | Screen | Description |
|---|--------|-------------|
| 1 | High Level | Training overview — workout name, goal, equipment, section breakdown |
| 1b | High Level 2 | Alt layout — colorful section cards with gradient banner |
| 2 | Warm-Up | Exercise video + countdown timer + next exercise |
| 2b | Warm-Up 2 | Alt layout — training structure left, video center, timer right |
| 3 | Demo & Prep | Demonstration preparation screen |
| 4 | In Rest | Rest period between sets |
| 5 | In Rest 2 | Alternative rest view |
| 6 | During Exercise | Live exercise tracking with athlete cards |
| 6b | During Exercise 2 | Grid layout for athlete monitoring |
| 7 | Equipment Transition | Transition between equipment |
| 8 | After Transition | Post-transition exercise screen |
| 9 | Last Exercise | Final exercise of the session |
| 10 | Cooldown | Cooldown phase |
| 11 | Goal Achieved | Session complete — goal met |
| 12 | Goal Not Achieved | Session complete — goal not met |

> Views: **Studio** (coach-facing) · **Trainee** · **Coach/Admin**

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (port 5174)
bash start-dev.sh

# Or use npm
npm run dev
```

Then open [http://localhost:5174](http://localhost:5174)

---

## Navigation

- **Top tabs** — switch between Studio / Trainee / Coach views
- **Screen tabs** — navigate between screens
- **Arrow keys** — move between screens sequentially
- **Settings (⚙)** — toggle color palette
- **Changelog (🕐)** — browse previous versions

---

## Project Structure

```
src/
├── pages/          # One file per screen
├── components/     # Shared components (ScaledFrame, VideoPlayer, CountdownRing, ...)
├── data/           # Static data (studio, changelog)
public/
├── assets/         # SVG/PNG icons and exercise assets
├── icons/          # Logo and UI icons
└── logos/          # Equipment and brand logos
```

---

## Repos

| Org | URL |
|-----|-----|
| or-moveo | https://github.com/or-moveo/hygear-prototype |
| m.ai by Moveo | https://github.com/m-AI-by-moveo/hygear-prototype |

> Both remotes are kept in sync — `git push origin main` pushes to both.
