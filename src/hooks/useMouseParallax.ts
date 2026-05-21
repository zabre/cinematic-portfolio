'use client'

import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

const SPRING_CONFIG = { stiffness: 45, damping: 18, mass: 1.5 }

export function useMouseParallax() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const mouseX = useSpring(rawX, SPRING_CONFIG)
  const mouseY = useSpring(rawY, SPRING_CONFIG)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 2)  // -1 → +1
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [rawX, rawY])

  return { mouseX, mouseY }
}
