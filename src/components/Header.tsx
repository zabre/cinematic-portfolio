'use client'

import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-10 py-5
                 backdrop-blur-xl border-b border-white/[0.06]
                 bg-[rgba(4,4,10,0.6)]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <span className="text-[15px] font-[300] tracking-[0.08em] text-white/90">
          Abderrazak
        </span>
        <span className="text-[11px] font-[200] tracking-[0.18em] uppercase text-white/40">
          Full&#8209;Stack · Data · AI
        </span>
      </div>
    </motion.header>
  )
}
