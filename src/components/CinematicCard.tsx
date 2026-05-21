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
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 cursor-pointer"
        style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(4,4,14,0.6)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      />

      {/* Floating centered card */}
      <motion.div
        className="fixed z-50 top-1/2 left-1/2 w-[440px] max-w-[92vw] rounded-[28px] overflow-hidden"
        style={{
          // Apple visionOS glass card
          background: 'linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 40%, rgba(0,0,0,0.3) 100%)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow: `
            0 0 0 0.5px rgba(255,255,255,0.08) inset,
            0 32px 100px rgba(0,0,0,0.85),
            0 0 80px ${app.color}44,
            0 0 200px ${app.color}22
          `,
          backdropFilter: 'blur(60px) saturate(180%)',
          WebkitBackdropFilter: 'blur(60px) saturate(180%)',
          x: '-50%',
          y: '-50%',
        }}
        initial={{ opacity: 0, scale: 0.85, y: '-44%' }}
        animate={{ opacity: 1, scale: 1,    y: '-50%' }}
        exit={{    opacity: 0, scale: 0.90,  y: '-47%' }}
        transition={SPRING_EXPAND}
      >
        {/* Shimmer top edge — Apple visionOS highlight */}
        <div className="absolute top-0 left-[15%] right-[15%] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}
        />

        {/* Image header with hex-like glow */}
        <div className="relative h-48 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/${app.id.charCodeAt(0) * 13}/880/384`}
            alt={app.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient fade to card body */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to bottom,
              transparent 30%,
              rgba(255,255,255,0.02) 60%,
              rgba(6,6,18,0.96) 100%
            )`
          }} />
          {/* Accent color bloom */}
          <div className="absolute inset-0 opacity-35" style={{
            background: `radial-gradient(ellipse 70% 70% at 30% 40%, ${app.color}cc, transparent 65%)`
          }} />
          {/* Large emoji floating on image */}
          <div className="absolute bottom-4 left-6">
            <span className="text-5xl" style={{
              filter: `drop-shadow(0 0 20px ${app.accent}) drop-shadow(0 2px 8px rgba(0,0,0,0.8))`
            }}>
              {app.emoji}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 pb-7 pt-5">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.18, duration: 0.4 }}
          >
            <p className="text-[10px] font-[200] tracking-[0.22em] uppercase mb-1.5"
               style={{ color: app.accent }}>
              {app.subtitle}
            </p>

            <h2 className="text-[26px] font-[200] tracking-[-0.025em] leading-tight text-white/95 mb-3">
              {app.title}
            </h2>

            <p className="text-[13px] font-[200] leading-[1.75] text-white/45 mb-5">
              {app.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {app.tags.map(tag => (
                <span key={tag}
                  className="text-[9px] font-[300] tracking-[0.08em] uppercase
                             px-2.5 py-1 rounded-full text-white/50"
                  style={{
                    background: `${app.accent}18`,
                    border: `1px solid ${app.accent}35`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center gap-2.5">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 rounded-full text-[12px] font-[300]
                           tracking-[0.08em] text-white no-underline transition-all
                           hover:opacity-90 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${app.accent} 0%, ${app.color} 100%)`,
                  boxShadow: `0 6px 28px ${app.accent}55`,
                }}
              >
                Open App ↗
              </a>
              <motion.button
                onClick={onClose}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white/55 text-sm"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.13)',
                  backdropFilter: 'blur(10px)',
                }}
                whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.14)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom shimmer */}
        <div className="absolute bottom-0 left-[20%] right-[20%] h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
        />
      </motion.div>
    </>
  )
}
