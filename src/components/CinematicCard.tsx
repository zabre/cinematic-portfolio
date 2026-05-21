'use client'

import { motion } from 'framer-motion'
import type { App } from '@/data/apps'

const SPRING_EXPAND = { type: 'spring', stiffness: 55, damping: 18, mass: 1.3 } as const

interface Props {
  app: App
  onClose: () => void
}

export function CinematicCard({ app, onClose }: Props) {
  return (
    <>
      {/* Backdrop — does NOT cover 100%, mur stays visible */}
      <motion.div
        className="fixed inset-0 z-40 cursor-pointer"
        style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(4,4,10,0.55)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Floating card — centered, NOT fullscreen */}
      <motion.div
        className="fixed z-50 top-1/2 left-1/2 w-[420px] max-w-[90vw]
                   rounded-[24px] overflow-hidden cursor-default"
        style={{
          background: 'rgba(6,6,16,0.92)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: `
            0 32px 100px rgba(0,0,0,0.85),
            inset 0 1px 0 rgba(255,255,255,0.07),
            0 0 60px ${app.color}44
          `,
          backdropFilter: 'blur(40px)',
          x: '-50%',
          y: '-50%',
        }}
        initial={{ opacity: 0, scale: 0.88, y: '-44%' }}
        animate={{ opacity: 1, scale: 1,    y: '-50%' }}
        exit={{    opacity: 0, scale: 0.92,  y: '-46%' }}
        transition={SPRING_EXPAND}
      >
        {/* Image header */}
        <div className="relative h-52 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/${app.id.length * 17}/840/416`}
            alt={app.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, transparent 40%, rgba(6,6,16,0.95) 100%)` }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{ background: `radial-gradient(ellipse 80% 80% at 30% 30%, ${app.color}, transparent 65%)` }}
          />
        </div>

        {/* Content */}
        <div className="px-8 pb-8 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            <span className="text-4xl block mb-4" style={{ filter: `drop-shadow(0 0 16px ${app.accent})` }}>
              {app.emoji}
            </span>

            <p className="text-[10px] font-[200] tracking-[0.22em] uppercase mb-1.5" style={{ color: app.accent }}>
              {app.subtitle}
            </p>

            <h2 className="text-[28px] font-[200] tracking-[-0.025em] leading-tight text-white mb-4">
              {app.title}
            </h2>

            <p className="text-[13px] font-[200] leading-[1.75] text-white/50 mb-6">
              {app.description}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {app.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[10px] font-[300] tracking-[0.06em] uppercase px-2.5 py-1
                             rounded-full border border-white/10 bg-white/[0.05] text-white/45"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 rounded-full text-[12px] font-[300]
                           tracking-[0.08em] text-white no-underline"
                style={{ background: app.accent, boxShadow: `0 6px 24px ${app.accent}66` }}
              >
                Open App ↗
              </a>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center
                           text-white/50 text-sm"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                ✕
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
