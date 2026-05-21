'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'
import { ThumbnailTile } from './ThumbnailTile'
import type { App } from '@/data/apps'

interface Props {
  apps: App[]
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  selectedId: string | null
  onSelect: (app: App) => void
}

export function MosaicGallery({ apps, mouseX, mouseY, selectedId, onSelect }: Props) {
  // Macro parallax on the whole gallery
  const galleryX = useTransform(mouseX, [-1, 1], [-18, 18])
  const galleryY = useTransform(mouseY, [-1, 1], [-10, 10])

  const isAnySelected = selectedId !== null

  return (
    <motion.div
      style={{ x: galleryX, y: galleryY }}
      transition={{ type: 'spring', stiffness: 45, damping: 18 }}
      className="relative z-[2] max-w-[1240px] mx-auto px-10 pb-28
                 grid grid-cols-12 gap-3.5 will-change-transform"
    >
      {apps.map((app, i) => (
        <ThumbnailTile
          key={app.id}
          app={app}
          index={i}
          mouseX={mouseX}
          mouseY={mouseY}
          isSelected={selectedId === app.id}
          isAnySelected={isAnySelected}
          onSelect={() => onSelect(app)}
        />
      ))}
    </motion.div>
  )
}
