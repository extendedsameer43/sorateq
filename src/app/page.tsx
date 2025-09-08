'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import SecondSection from '@/components/SecondSection'

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

      {/* Second Section - GSAP ScrollTrigger Text Reveal */}
      <div className="second-section relative z-10">
        <SecondSection />
      </div>

      {/* Global Fixed UI Elements */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        {/* Replay Live Runs button - bottom right */}
        <div className="absolute bottom-8 right-8 pointer-events-auto">
          <button className="flex items-center space-x-3 bg-black px-4 py-3 rounded-lg text-white hover:bg-gray-900 transition-colors">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-medium">Replay Live Runs</span>
          </button>
        </div>
        
        {/* Bottom left floating button */}
        <div className="absolute bottom-8 left-8 pointer-events-auto">
          <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
