'use client'

import { motion, useTransform, type MotionValue, type MotionStyle } from 'framer-motion'
import { useMemo } from 'react'
import type { App } from '@/data/apps'

interface Tile {
  id: string
  app: App
  depth: number
  seed: number
  col: number
  row: number
}

// Hexagonal grid math
// flat-top hex: width = size*2, height = size*sqrt(3)
// offset cols stagger every other row
const HEX_SIZE = 72   // px — circumradius
const HEX_W    = HEX_SIZE * 2
const HEX_H    = Math.round(HEX_SIZE * Math.sqrt(3))
const HEX_COLS = 16
const HEX_ROWS = 10

function buildTiles(apps: App[]): Tile[] {
  const tiles: Tile[] = []
  let idx = 0
  for (let row = 0; row < HEX_ROWS; row++) {
    for (let col = 0; col < HEX_COLS; col++) {
      tiles.push({
        id: `hex-${row}-${col}`,
        app: apps[idx % apps.length],
        depth: 0.15 + ((row * HEX_COLS + col) % 9) * 0.09,
        seed: (row * 17 + col * 31 + 7) % 1000,
        col,
        row,
      })
      idx++
    }
  }
  return tiles
}

function hexPosition(col: number, row: number) {
  // flat-top hexagonal offset grid
  const x = col * HEX_W * 0.75
  const y = row * HEX_H + (col % 2 === 1 ? HEX_H / 2 : 0)
  return { x, y }
}

interface Props {
  apps: App[]
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  selectedId: string | null
  onSelect: (app: App) => void
}

export function MosaicWall({ apps, mouseX, mouseY, selectedId, onSelect }: Props) {
  const tiles = useMemo(() => buildTiles(apps), [apps])
  const isAnySelected = selectedId !== null

  const wallX = useTransform(mouseX, [-1, 1], [-28, 28])
  const wallY = useTransform(mouseY, [-1, 1], [-16, 16])

  const totalW = HEX_COLS * HEX_W * 0.75 + HEX_W * 0.25
  const totalH = HEX_ROWS * HEX_H + HEX_H / 2

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Ambient halo — colorful glow surrounding the wall */}
      <div className="absolute inset-[-10%] z-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 28% 65% at -3%  50%, rgba(20,210,180,0.6)  0%, transparent 55%),
          radial-gradient(ellipse 28% 65% at 103% 50%, rgba(255,80,60,0.5)   0%, transparent 55%),
          radial-gradient(ellipse 65% 28% at 50%  103%,rgba(255,130,50,0.4)  0%, transparent 55%),
          radial-gradient(ellipse 65% 28% at 50%  -3%, rgba(70,110,255,0.3)  0%, transparent 55%)
        `
      }} />

      {/* Wall — slightly oversized so parallax never reveals edges */}
      <motion.div
        style={{ x: wallX, y: wallY } as MotionStyle}
        className="absolute will-change-transform"
        style={{
          x: wallX,
          y: wallY,
          left: '50%',
          top: '50%',
          width: totalW,
          height: totalH,
          marginLeft: -totalW / 2 - 40,
          marginTop:  -totalH / 2 - 40,
        } as MotionStyle}
      >
        {tiles.map((tile, i) => {
          const { x, y } = hexPosition(tile.col, tile.row)
          return (
            <HexTile
              key={tile.id}
              tile={tile}
              index={i}
              posX={x}
              posY={y}
              mouseX={mouseX}
              mouseY={mouseY}
              isSelected={selectedId === tile.app.id}
              isAnySelected={isAnySelected}
              onSelect={() => onSelect(tile.app)}
            />
          )
        })}
      </motion.div>

      {/* Radial vignette edges */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{
        background: `radial-gradient(ellipse 80% 80% at 50% 50%,
          transparent 50%, rgba(8,8,16,0.75) 100%)`
      }} />
    </div>
  )
}

// ─── Hex clip path (flat-top) ──────────────────────────────────────────────
const HEX_CLIP = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'

const SPRING_HOVER = { type: 'spring', stiffness: 300, damping: 22, mass: 0.7 } as const
const SPRING_DIM   = { type: 'spring', stiffness: 60,  damping: 20, mass: 1.2 } as const

function HexTile({
  tile, index, posX, posY,
  mouseX, mouseY,
  isSelected, isAnySelected, onSelect
}: {
  tile: Tile, index: number,
  posX: number, posY: number,
  mouseX: MotionValue<number>, mouseY: MotionValue<number>,
  isSelected: boolean, isAnySelected: boolean,
  onSelect: () => void
}) {
  const isDimmed = isAnySelected && !isSelected

  const tileX = useTransform(mouseX, [-1, 1], [-tile.depth * 20, tile.depth * 20])
  const tileY = useTransform(mouseY, [-1, 1], [-tile.depth * 12, tile.depth * 12])

  const imgSrc = `https://picsum.photos/seed/${tile.seed}/200/200`

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: posX,
        top:  posY,
        width:  HEX_W,
        height: HEX_H,
        x: tileX,
        y: tileY,
      } as MotionStyle}
      className="cursor-pointer will-change-transform"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{
        opacity: isDimmed ? 0.15 : 1,
        scale:   isDimmed ? 0.95 : 1,
        filter:  isDimmed
          ? 'blur(3px) brightness(0.25) saturate(0.4)'
          : 'blur(0px) brightness(1) saturate(1)',
        y: isDimmed ? 0 : [0, -5 * tile.depth, 0],
      }}
      transition={isDimmed ? SPRING_DIM : {
        opacity: { duration: 0.5, delay: (index % 20) * 0.025 },
        scale:   { duration: 0.5, delay: (index % 20) * 0.025 },
        filter:  SPRING_HOVER,
        y: {
          duration: 2.8 + (index % 7) * 0.5,
          delay:    (index % 11) * 0.18,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      }}
      whileHover={isDimmed ? {} : {
        scale: 1.15,
        zIndex: 40,
        filter: 'brightness(1.25) saturate(1.4)',
        transition: SPRING_HOVER,
      }}
      onClick={onSelect}
    >
      {/* Hex image */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: HEX_CLIP }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={tile.app.title}
          className="w-full h-full object-cover"
          loading={index < 32 ? 'eager' : 'lazy'}
        />
        {/* Accent color tint */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-color"
          style={{ background: tile.app.accent }}
        />
      </div>

      {/* Glassmorphism border ring */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: HEX_CLIP,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          maskImage: `polygon-clip`,
        }}
      />

      {/* Hover overlay — glassmorphism + label */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ clipPath: HEX_CLIP }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg,
              rgba(255,255,255,0.15) 0%,
              rgba(255,255,255,0.05) 50%,
              rgba(0,0,0,0.3) 100%
            )`,
            backdropFilter: 'blur(6px)',
          }}
        />
        <div className="relative z-10 text-center px-2">
          <span className="text-base block mb-0.5">{tile.app.emoji}</span>
          <span className="text-[8px] font-[300] tracking-[0.1em] uppercase text-white/90 leading-tight block">
            {tile.app.title}
          </span>
        </div>
      </motion.div>

      {/* Soft glow bloom on the hex */}
      <motion.div
        className="absolute inset-[-15%] pointer-events-none"
        style={{ clipPath: 'none' }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${tile.app.accent}55 0%, transparent 70%)`,
          filter: 'blur(12px)',
        }} />
      </motion.div>
    </motion.div>
  )
}
