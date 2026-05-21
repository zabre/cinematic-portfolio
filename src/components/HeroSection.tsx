'use client'

import { motion } from 'framer-motion'

const variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export function HeroSection() {
  return (
    <section className="relative z-[2] max-w-[1200px] mx-auto px-10 pt-[160px] pb-16 text-center">
      <motion.p
        custom={0} variants={variants} initial="hidden" animate="visible"
        className="text-[11px] font-[300] tracking-[0.25em] uppercase text-white/40 mb-4"
      >
        Selected Work
      </motion.p>

      <motion.h1
        custom={1} variants={variants} initial="hidden" animate="visible"
        className="text-[clamp(48px,8vw,96px)] font-[100] tracking-[-0.03em] leading-none text-white mb-5"
      >
        Web Applications
      </motion.h1>

      <motion.p
        custom={2} variants={variants} initial="hidden" animate="visible"
        className="text-base font-[200] text-white/40 leading-relaxed"
      >
        Interactive projects in data visualization,<br />
        NLP, and immersive interfaces.
      </motion.p>
    </section>
  )
}
