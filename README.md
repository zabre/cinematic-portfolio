# Cinematic Portfolio — Phase 2

Ultra-premium interactive portfolio — **Apple visionOS aesthetic**  
Next.js 14 · Framer Motion · Tailwind CSS · TypeScript

## Stack
- **Next.js 14** (App Router, TypeScript)
- **Framer Motion 11** — shared layout animations (`layoutId`), springs, parallax
- **Tailwind CSS** — utility-first styling
- **React Three Fiber** — ready for Phase 3 WebGL (DOF, bloom)

## Features
- 🌗 Ambient glow that follows the mouse
- 🎞️ Mosaic grid with per-tile depth parallax
- ✨ Spring-physics animations everywhere
- 🔲 Idle float animation per tile
- 🔍 Glassmorphism shine on hover
- 🎬 Cinematic card overlay with shared `layoutId` transition
- 🌫️ Dim + blur surrounding tiles on selection
- 📱 Responsive (mobile-first)

## Local Dev

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy on Netlify

1. Connect `zabre/cinematic-portfolio` on [app.netlify.com](https://app.netlify.com)
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Install plugin: `@netlify/plugin-nextjs` (auto-detected via `netlify.toml`)

## Customize Apps

Edit `src/data/apps.ts` — replace `url: 'https://example.com'` with real links.

## Roadmap
- [ ] Phase 3: Three.js `DepthOfField` + `Bloom` post-processing
- [ ] Add real app screenshots as background images
- [ ] Cursor custom (dot + ring)
- [ ] Page transition animations
