'use client'

import { motion } from 'framer-motion'
import type { App } from '@/data/apps'

const SPRING_EXPAND = { type: 'spring', stiffness: 50, damping: 18, mass: 1.4 } as const

interface Props {
  app: App
  onClose: () => void
}

export function CinematicCard({ app, onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 cursor-pointer"
        style={{ backdropFilter: 'blur(14px)', backgroundColor: 'rgba(0,0,0,0.65)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />

      {/* Card — shared layoutId with the tile */}
      <motion.div
        layoutId={app.id}
        className="fixed z-50 inset-x-[8%] top-[6%] bottom-[6%] rounded-[28px] overflow-hidden"
        style={{
          background: 'rgba(8,8,18,0.88)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: `0 40px 120px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 80px ${app.color}33`,
          backdropFilter: 'blur(40px)',
        }}
        transition={SPRING_EXPAND}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 25% 35%, ${app.color}44, transparent 65%)`,
          }}
        />

        {/* Close button */}
        <motion.button
          className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full
                     flex items-center justify-center text-white/60 text-base"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
          whileHover={{ scale: 1.12, backgroundColor: 'rgba(255,255,255,0.16)' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={onClose}
        >
          ✕
        </motion.button>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-14 max-sm:p-8">
          <motion.span
            className="text-[64px] leading-none mb-6 block"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 16 }}
            style={{ filter: `drop-shadow(0 0 30px ${app.accent})` }}
          >
            {app.emoji}
          </motion.span>

          <motion.p
            className="text-[11px] font-[200] tracking-[0.22em] uppercase mb-3"
            style={{ color: app.accent }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {app.subtitle}
          </motion.p>

          <motion.h2
            className="text-[clamp(36px,5vw,56px)] font-[100] tracking-[-0.03em] leading-none text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {app.title}
          </motion.h2>

          <motion.p
            className="text-[15px] font-[200] leading-[1.8] text-white/50 max-w-[520px] mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {app.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-2 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.35 }}
          >
            {app.tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] font-[300] tracking-[0.06em] uppercase px-3 py-1.5
                           rounded-full border border-white/12 bg-white/[0.06] text-white/55"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2.5 px-7 py-3.5
                       rounded-full text-[13px] font-[300] tracking-[0.06em] text-white
                       no-underline transition-all"
            style={{
              background: app.accent,
              boxShadow: `0 8px 30px ${app.accent}66`,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 16 }}
            whileHover={{ scale: 1.04, boxShadow: `0 12px 40px ${app.accent}99` }}
          >
            Open Application ↗
          </motion.a>
        </div>
      </motion.div>
    </>
  )
}
