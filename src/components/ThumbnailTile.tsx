'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { App } from '@/data/apps'

const SIZE_CLASSES: Record<App['size'], string> = {
  large:  'col-span-7 min-h-[320px]',
  medium: 'col-span-5 min-h-[280px]',
  small:  'col-span-4 min-h-[220px]',
}

const SPRING_HOVER = { type: 'spring', stiffness: 280, damping: 22, mass: 0.8 } as const
const SPRING_DIM   = { type: 'spring', stiffness: 60,  damping: 20, mass: 1.2 } as const
const SPRING_FLOAT = { duration: 3.5, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' }

interface Props {
  app: App
  index: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  isSelected: boolean
  isAnySelected: boolean
  onSelect: () => void
}

export function ThumbnailTile({ app, index, mouseX, mouseY, isSelected, isAnySelected, onSelect }: Props) {
  const isDimmed = isAnySelected && !isSelected

  const tileX = useTransform(mouseX, [-1, 1], [-app.depth * 22, app.depth * 22])
  const tileY = useTransform(mouseY, [-1, 1], [-app.depth * 14, app.depth * 14])

  return (
    <motion.div
      layoutId={app.id}
      className={`
        relative overflow-hidden rounded-[20px] cursor-pointer
        bg-white/[0.04] border border-white/[0.08]
        will-change-transform
        ${SIZE_CLASSES[app.size]}
        max-sm:col-span-12
      `}
      style={{
        x: tileX,
        y: tileY,
        '--accent': app.accent,
        '--color': app.color,
      } as React.CSSProperties}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: isDimmed ? 0.22 : 1,
        scale:   isDimmed ? 0.96 : 1,
        filter:  isDimmed ? 'blur(4px) brightness(0.4)' : 'blur(0px) brightness(1)',
        y:       isDimmed ? 0 : [0, -6 * app.depth, 0],
      }}
      transition={isDimmed ? SPRING_DIM : {
        opacity: SPRING_HOVER,
        scale:   SPRING_HOVER,
        filter:  SPRING_HOVER,
        y: SPRING_FLOAT,
      }}
      whileHover={isDimmed ? {} : {
        scale: 1.05,
        zIndex: 20,
        filter: 'brightness(1.15) saturate(1.2)',
        transition: SPRING_HOVER,
      }}
      onClick={onSelect}
    >
      {/* Colored glow background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 80% 80% at 30% 30%, ${app.color}, transparent 70%)` }}
      />

      {/* Content */}
      <div className="relative z-10 h-full p-7 flex flex-col gap-3">
        <motion.span
          className="text-3xl leading-none"
          animate={{ filter: [
            `drop-shadow(0 0 8px ${app.accent}66)`,
            `drop-shadow(0 0 20px ${app.accent}cc)`,
            `drop-shadow(0 0 8px ${app.accent}66)`,
          ]}}
          transition={{ duration: 2.5 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
        >
          {app.emoji}
        </motion.span>

        <div className="flex-1">
          <h2 className="text-[22px] font-[300] tracking-[-0.02em] text-white/90 mb-1">
            {app.title}
          </h2>
          <p className="text-[11px] font-[200] tracking-[0.1em] uppercase text-white/40">
            {app.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {app.tags.map(tag => (
            <span
              key={tag}
              className="text-[10px] font-[300] tracking-[0.06em] uppercase px-2.5 py-1
                         rounded-full border border-white/10 bg-white/[0.05] text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.button
          className="self-start text-[12px] font-[300] tracking-[0.08em] px-4 py-2
                     rounded-full border bg-transparent cursor-pointer"
          style={{ borderColor: `${app.accent}66`, color: app.accent }}
          whileHover={{ scale: 1.06, backgroundColor: `${app.accent}14` }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={e => { e.stopPropagation(); window.open(app.url, '_blank', 'noopener') }}
        >
          Open App ↗
        </motion.button>
      </div>

      {/* Glassmorphism shine on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[20px]"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
          border: '1px solid rgba(255,255,255,0.12)',
          backdropFilter: 'blur(2px)',
        }}
      />
    </motion.div>
  )
}
