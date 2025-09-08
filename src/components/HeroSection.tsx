'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const orbRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Orb subtle pulsing animation
      gsap.to(orbRef.current, {
        scale: 1.06,
        opacity: 0.98,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      // Initial state for dots
      gsap.set(".dot", {
        scale: 1,
        opacity: 0.4
      })

      // Continuous subtle movement for dots
      gsap.to(".dot", {
        y: "random(-2, 2)",
        x: "random(-2, 2)",
        opacity: "random(0.3, 0.6)",
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: "random"
        }
      })

      // All elements are visible immediately - no reveal animations
      gsap.set([".hero-text", ".input-container", ".replay-button"], {
        opacity: 1,
        y: 0
      })

    }, heroRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section 
      ref={heroRef} 
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Single screen content - no scrolling */}
      <div className="relative h-screen flex items-center justify-center">
          
          {/* Background elements - non-sticky */}
          <div className="absolute inset-0 z-[0]">
          
          {/* Enhanced grain/noise overlay */}
          <div className="absolute inset-0 z-[0] pointer-events-none">
            <div className="noise-texture w-full h-full opacity-40 mix-blend-multiply"></div>
            <div 
              className="absolute inset-0 w-full h-full opacity-25"
              style={{
                background: `
                  radial-gradient(circle at 20% 50%, transparent 1px, rgba(255,255,255,0.01) 1px),
                  radial-gradient(circle at 80% 20%, transparent 1px, rgba(255,255,255,0.01) 1px),
                  radial-gradient(circle at 40% 80%, transparent 1px, rgba(255,255,255,0.01) 1px)
                `,
                backgroundSize: '100px 100px, 150px 150px, 200px 200px'
              }}
            ></div>
          </div>
          
          {/* Abstract geometric shapes */}
          {/* Large H-shaped overlay on the left */}
          <div className="absolute left-[8%] sm:left-[6%] top-1/2 -translate-y-1/2 z-[1]">
            <div className="relative">
              {/* Vertical rectangle */}
              <div className="w-24 h-80 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg" style={{ opacity: 0.14 }}></div>
              {/* Horizontal cross */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-32 h-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg" style={{ opacity: 0.14 }}></div>
            </div>
          </div>
          
          {/* Tall rectangle on the right */}
          <div className="absolute right-[12%] sm:right-[6%] top-1/2 -translate-y-1/2 z-[1]">
            <div className="w-20 h-96 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg" style={{ opacity: 0.14 }}></div>
          </div>
          
          {/* Main orange circle - perfectly centered behind text */}
          <div 
            ref={orbRef} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[350px] md:h-[350px] sm:w-[230px] sm:h-[230px] rounded-full z-[2]"
            style={{
              background: 'radial-gradient(circle, #ff4500 0%, #ff5722 25%, #e64100 50%, #cc3300 75%, rgba(180, 40, 0, 0.8) 90%, transparent 100%)',
              opacity: 0.98
            }}
          />
          
          {/* Orb-specific noise overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[350px] md:h-[350px] sm:w-[230px] sm:h-[230px] rounded-full pointer-events-none z-[3]">
            <div className="noise-texture w-full h-full opacity-20 mix-blend-overlay rounded-full"></div>
          </div>
          
          {/* Dot patterns overlay - subtle groups scattered around orb */}
          <div ref={dotsRef} className="absolute inset-0 z-[3]">
            {/* Upper left small cluster */}
            <div className="absolute top-[20%] left-[20%]">
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="dot w-1.5 h-1.5 bg-white rounded-full opacity-25"></div>
                ))}
              </div>
            </div>
            
            {/* Upper right small cluster */}
            <div className="absolute top-[18%] right-[18%]">
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="dot w-1.5 h-1.5 bg-white rounded-full opacity-25"></div>
                ))}
              </div>
            </div>
            
            {/* Mid left cluster */}
            <div className="absolute top-[40%] left-[12%]">
              <div className="grid grid-cols-2 gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="dot w-1 h-1 bg-white rounded-full opacity-20"></div>
                ))}
              </div>
            </div>
            
            {/* Mid right cluster */}
            <div className="absolute top-[35%] right-[8%]">
              <div className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="dot w-1 h-1 bg-white rounded-full opacity-20"></div>
                ))}
              </div>
            </div>
            
            {/* Lower right cluster */}
            <div className="absolute bottom-[25%] right-[20%]">
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="dot w-1.5 h-1.5 bg-white rounded-full opacity-25"></div>
                ))}
              </div>
            </div>
            
            {/* Lower left cluster */}
            <div className="absolute bottom-[30%] left-[15%]">
              <div className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="dot w-1.5 h-1.5 bg-white rounded-full opacity-25"></div>
                ))}
              </div>
            </div>
            
            {/* Additional scattered small clusters */}
            <div className="absolute top-[60%] left-[25%]">
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="dot w-1 h-1 bg-white rounded-full opacity-15"></div>
                ))}
              </div>
            </div>
            
            <div className="absolute top-[15%] left-[45%]">
              <div className="grid grid-cols-2 gap-1.5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="dot w-1 h-1 bg-white rounded-full opacity-15"></div>
                ))}
              </div>
            </div>
          </div>
          </div>
          
          {/* First screen UI elements - only visible on first screen */}
          <div className="relative z-[20]">
            {/* Main headline text - perfectly centered over orb */}
            <div className="absolute inset-0 flex items-center justify-center text-center w-full px-6 pointer-events-auto">
              <h1 ref={textRef} className="hero-text text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-white leading-none whitespace-nowrap">
                SORATEQ is a Service based company
              </h1>
            </div>
          </div>
            
          {/* Input container - positioned at bottom of hero section, outside text container */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full pointer-events-auto z-[25]">
            <div className="w-full max-w-md sm:max-w-xs md:max-w-lg mx-auto px-6 input-container">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What do you want to automate?"
                  className="w-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-base border-none"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.55)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black w-8 h-8 flex items-center justify-center rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* UI Buttons container */}
          <div className="absolute inset-0 z-[20] pointer-events-none">
            {/* Replay Live Runs button - bottom right */}
            <div className="absolute bottom-8 right-8 replay-button pointer-events-auto">
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
    </section>
  )
}
