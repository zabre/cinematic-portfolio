# Cinematic Portfolio

Ultra-premium interactive web gallery — **Apple visionOS aesthetic** — presenting my web applications.

## Stack
- Vanilla HTML / CSS / JS (zero build step)
- Inter font (Google Fonts)
- Pure CSS glassmorphism + backdrop-filter
- Spring easing animations
- Mouse-reactive ambient glow
- 3D tilt parallax on cards
- Cinematic overlay on click

## Deploy on Netlify

**Option A — Drag & Drop:**
1. Zip this folder
2. Go to [netlify.com/drop](https://netlify.com/drop)
3. Drag the zip → live in 10 seconds

**Option B — Git:**
1. Connect your GitHub repo on [app.netlify.com](https://app.netlify.com)
2. Base directory: `/`
3. Publish directory: `.`
4. Deploy

## Customize

Edit `data.js` to add/update your applications:
```js
{
  id: 'my-app',
  title: 'My App',
  subtitle: 'Tech stack description',
  description: 'Long description...',
  url: 'https://your-app.netlify.app',  // ← real URL here
  color: '#1A56DB',
  accent: '#3B82F6',
  emoji: '🚀',
  tags: ['React', 'Python'],
  size: 'large'  // large | medium | small
}
```

## Next Steps (Phase 2)
- Migrate to Next.js + Framer Motion
- Add Three.js depth-of-field
- Shared layout animations (layoutId)
- WebGL ambient particles
