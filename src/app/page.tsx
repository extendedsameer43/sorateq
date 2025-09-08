'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Simple animations for the single hero section
      // No complex scroll triggers needed
      
      // Text reveal animations if any exist
      gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((text) => {
        gsap.fromTo(text, 
          { 
            opacity: 0,
            y: 100
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.5
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <Navigation />
      
      {/* Main Hero Section - Full page */}
      <div className="main-hero h-screen relative z-10">
        <HeroSection />
      </div>
    </div>
  )
}
