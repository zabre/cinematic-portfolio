'use client'

import { useState } from 'react'
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { MosaicWall } from '@/components/MosaicWall'
import { CinematicCard } from '@/components/CinematicCard'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { APPS } from '@/data/apps'
import type { App } from '@/data/apps'

export default function Home() {
  const [selectedApp, setSelectedApp] = useState<App | null>(null)
  const { mouseX, mouseY } = useMouseParallax()

  return (
    <LazyMotion features={domAnimation}>
      <main className="relative w-screen h-screen overflow-hidden bg-[#080810]">

        {/* The full-screen mosaic wall */}
        <MosaicWall
          apps={APPS}
          mouseX={mouseX}
          mouseY={mouseY}
          selectedId={selectedApp?.id ?? null}
          onSelect={setSelectedApp}
        />

        {/* Floating title — bottom left like Motion ref */}
        <div className="absolute bottom-10 left-10 z-20 pointer-events-none">
          <p className="text-[10px] font-[200] tracking-[0.22em] uppercase text-white/30 mb-2">
            Selected Work
          </p>
          <h1 className="text-[clamp(28px,4vw,52px)] font-[100] tracking-[-0.03em] leading-none text-white/90">
            Web Applications
          </h1>
          <p className="text-[12px] font-[200] text-white/35 mt-2 tracking-wide">
            Full&#8209;Stack &middot; Data &middot; AI
          </p>
        </div>

        {/* Cinematic floating card overlay */}
        <AnimatePresence>
          {selectedApp && (
            <CinematicCard
              key={selectedApp.id}
              app={selectedApp}
              onClose={() => setSelectedApp(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </LazyMotion>
  )
}
