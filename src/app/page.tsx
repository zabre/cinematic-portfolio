'use client'

import { useState } from 'react'
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { MosaicGallery } from '@/components/MosaicGallery'
import { CinematicCard } from '@/components/CinematicCard'
import { AmbientGlow } from '@/components/AmbientGlow'
import { NoiseOverlay } from '@/components/NoiseOverlay'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { APPS } from '@/data/apps'
import type { App } from '@/data/apps'

export default function Home() {
  const [selectedApp, setSelectedApp] = useState<App | null>(null)
  const { mouseX, mouseY } = useMouseParallax()

  return (
    <LazyMotion features={domAnimation}>
      <main className="relative min-h-screen">
        {/* Layers */}
        <AmbientGlow mouseX={mouseX} mouseY={mouseY} />
        <NoiseOverlay />

        {/* UI */}
        <Header />
        <HeroSection />

        <MosaicGallery
          apps={APPS}
          mouseX={mouseX}
          mouseY={mouseY}
          selectedId={selectedApp?.id ?? null}
          onSelect={setSelectedApp}
        />

        {/* Cinematic overlay */}
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
