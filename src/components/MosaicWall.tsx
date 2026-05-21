'use client'

import { motion, useTransform, type MotionValue, type MotionStyle } from 'framer-motion'
import { useMemo } from 'react'
import type { App } from '@/data/apps'

interface Tile {
  id: string
  app: App
  colSpan: number
  rowSpan: number
  depth: number
  seed: number
}

function buildTiles(apps: App[], total = 84): Tile[] {
  // Weighted random: 65% 1x1, 20% 2x1, 10% 1x2, 5% 2x2
  const spans: Array<[number, number]> = [[1,1],[1,1],[1,1],[1,1],[2,1],[2,1],[1,2],[2,2]]
  return Array.from({ length: total }, (_, i) => {
    const app = apps[i % apps.length]
    const [colSpan, rowSpan] = spans[i % spans.length]
    return {
      id: `tile-${i}`,
      app,
      colSpan,
      rowSpan,
      depth: 0.2 + (i % 9) * 0.09,  // 0.2 → 0.92 cycling
      seed: i * 7 + 13,
    }
  })
}

interface Props {
  apps: App[]
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  selectedId: string | null
  onSelect: (app: App) => void
}

export function MosaicWall({ apps, mouseX, mouseY, selectedId, onSelect }: Props) {
  const tiles = useMemo(() => buildTiles(apps, 84), [apps])
  const isAnySelected = selectedId !== null

  // Macro parallax on the whole wall
  const wallX = useTransform(mouseX, [-1, 1], [-24, 24])
  const wallY = useTransform(mouseY, [-1, 1], [-14, 14])

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Ambient halo — surrounds the wall like in the ref */}
      <div
        className="absolute inset-[-8%] z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 30% 60% at -2% 50%,  rgba(20,210,180,0.55) 0%, transparent 55%),
            radial-gradient(ellipse 30% 60% at 102% 50%, rgba(255,90,70,0.45)  0%, transparent 55%),
            radial-gradient(ellipse 60% 30% at 50% 102%, rgba(255,140,60,0.35) 0%, transparent 55%),
            radial-gradient(ellipse 60% 30% at 50% -2%,  rgba(80,120,255,0.25) 0%, transparent 55%)
          `
        }}
      />

      {/* Wall container */}
      <motion.div
        style={{ x: wallX, y: wallY } as MotionStyle}
        className="absolute inset-[-6%] will-change-transform"
      >
        <div
          className="w-full h-full"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(14, 1fr)',
            gridAutoRows: '90px',
            gap: '3px',
          }}
        >
          {tiles.map((tile, i) => (
            <TileItem
              key={tile.id}
              tile={tile}
              index={i}
              mouseX={mouseX}
              mouseY={mouseY}
              isSelected={selectedId === tile.app.id}
              isAnySelected={isAnySelected}
              onSelect={() => onSelect(tile.app)}
            />
          ))}
        </div>
      </motion.div>

      {/* Dark vignette edges */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 85% 85% at 50% 50%,
            transparent 60%,
            rgba(8,8,16,0.7) 100%
          )
        `
      }} />
    </div>
  )
}

// ─── Individual tile ──────────────────────────────────────────────
const SPRING_HOVER = { type: 'spring', stiffness: 300, damping: 22, mass: 0.7 } as const
const SPRING_DIM   = { type: 'spring', stiffness: 60,  damping: 20, mass: 1.2 } as const
const SPRING_FLOAT = { duration: 3.5, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' }

function TileItem({
  tile, index, mouseX, mouseY, isSelected, isAnySelected, onSelect
}: {
  tile: Tile, index: number,
  mouseX: MotionValue<number>, mouseY: MotionValue<number>,
  isSelected: boolean, isAnySelected: boolean,
  onSelect: () => void
}) {
  const isDimmed = isAnySelected && !isSelected

  const tileX = useTransform(mouseX, [-1, 1], [-tile.depth * 18, tile.depth * 18])
  const tileY = useTransform(mouseY, [-1, 1], [-tile.depth * 11, tile.depth * 11])

  const motionStyle: MotionStyle = { x: tileX, y: tileY }

  // Use picsum for placeholder images — deterministic by seed
  const w = tile.colSpan === 2 ? 600 : 300
  const h = tile.rowSpan === 2 ? 400 : 200
  const imgSrc = `https://picsum.photos/seed/${tile.seed}/${w}/${h}`

  return (
    <motion.div
      style={{
        ...motionStyle,
        gridColumn: `span ${tile.colSpan}`,
        gridRow: `span ${tile.rowSpan}`,
      } as MotionStyle}
      className="relative overflow-hidden cursor-pointer will-change-transform"
      initial={{ opacity: 0 }}
      animate={{
        opacity:  isDimmed ? 0.18 : 1,
        scale:    isDimmed ? 0.98 : 1,
        filter:   isDimmed
          ? 'blur(2px) brightness(0.3) saturate(0.5)'
          : 'blur(0px) brightness(1) saturate(1)',
        y: isDimmed ? 0 : [0, -4 * tile.depth, 0],
      }}
      transition={isDimmed ? SPRING_DIM : {
        opacity: { duration: 0.4 },
        scale:   SPRING_HOVER,
        filter:  SPRING_HOVER,
        y: { ...SPRING_FLOAT, duration: 3 + (index % 5) * 0.6, delay: (index % 7) * 0.2 },
      }}
      whileHover={isDimmed ? {} : {
        scale: 1.06,
        zIndex: 30,
        filter: 'brightness(1.2) saturate(1.3)',
        transition: SPRING_HOVER,
      }}
      onClick={onSelect}
    >
      {/* Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={tile.app.title}
        className="w-full h-full object-cover"
        loading={index < 28 ? 'eager' : 'lazy'}
      />

      {/* Subtle color tint matching app accent */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300 mix-blend-color"
        style={{ background: tile.app.accent }}
      />

      {/* App name on hover */}
      <motion.div
        className="absolute inset-0 flex items-end p-2 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          background: `linear-gradient(to top, ${tile.app.color}cc 0%, transparent 60%)`,
        }}
      >
        <span className="text-[9px] font-[300] tracking-[0.08em] uppercase text-white/90 leading-none">
          {tile.app.title}
        </span>
      </motion.div>
    </motion.div>
  )
}
