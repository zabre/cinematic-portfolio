'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'

interface Props {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

export function AmbientGlow({ mouseX, mouseY }: Props) {
  const bgX1 = useTransform(mouseX, [-1, 1], [35, 65])
  const bgY1 = useTransform(mouseY, [-1, 1], [35, 65])
  const bgX2 = useTransform(mouseX, [-1, 1], [65, 35])
  const bgY2 = useTransform(mouseY, [-1, 1], [65, 35])

  return (
    <motion.div
      aria-hidden
      className="fixed inset-[-20%] z-0 pointer-events-none"
      style={{
        background: useTransform(
          [bgX1, bgY1, bgX2, bgY2],
          ([x1, y1, x2, y2]) => `
            radial-gradient(ellipse 55% 45% at ${x1}% ${y1}%,
              rgba(123,47,255,0.22) 0%,
              rgba(59,130,246,0.12) 45%,
              transparent 70%
            ),
            radial-gradient(ellipse 40% 55% at ${x2}% ${y2}%,
              rgba(236,72,153,0.10) 0%,
              transparent 60%
            )
          `
        ),
      }}
    />
  )
}
