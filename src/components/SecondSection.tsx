'use client'

import { useEffect, useRef, useState } from 'react'

export default function SecondSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(-1) // Start with -1 so no text shows initially
  const [isScrolling, setIsScrolling] = useState(false)

  const textLines = [
    "Agentic AI isn't just another tool.",
    "It's the next generation of",
    "teammates"
  ]

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current || isScrolling) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const isInSection = rect.top <= window.innerHeight * 0.7 && rect.bottom >= window.innerHeight * 0.3
      
      if (!isInSection) return
      
      const direction = e.deltaY > 0 ? 1 : -1
      const newStep = Math.max(-1, Math.min(currentStep + direction, textLines.length - 1))
      
      // Only prevent default scroll if we can still navigate within the text sequence
      // or if we're scrolling forward
      if (direction > 0 || (direction < 0 && currentStep > -1)) {
        e.preventDefault()
      }
      
      if (newStep !== currentStep) {
        setIsScrolling(true)
        setCurrentStep(newStep)
        setTimeout(() => setIsScrolling(false), 800)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentStep, isScrolling])

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          rgba(0, 0, 0, 0.95) 0%, 
          rgba(139, 69, 19, 0.4) 25%, 
          rgba(160, 82, 45, 0.3) 50%, 
          rgba(101, 67, 33, 0.4) 75%, 
          rgba(0, 0, 0, 0.95) 100%)`
      }}
    >
      {/* Enhanced dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      
      {/* Container for text - Mobile responsive */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-3 sm:space-y-4">
          {/* First line - appears on first scroll, disappears on third scroll */}
          {currentStep >= 0 && currentStep < 2 && (
            <h2 
              key="line1"
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light leading-tight animate-fade-in"
            >
              {textLines[0].split(' ').map((word, index) => (
                <span 
                  key={index}
                  className="inline-block animate-slide-in"
                  style={{ 
                    marginRight: index < textLines[0].split(' ').length - 1 ? '0.3rem sm:0.4rem md:0.5rem' : '0',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
          )}
          
          {/* Second line - appears on second scroll, disappears on third scroll */}
          {currentStep >= 1 && currentStep < 2 && (
            <h2 
              key="line2"
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light leading-tight animate-fade-in"
            >
              {textLines[1].split(' ').map((word, index) => (
                <span 
                  key={index}
                  className="inline-block animate-slide-in"
                  style={{ 
                    marginRight: index < textLines[1].split(' ').length - 1 ? '0.25rem' : '0',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
          )}
          
          {/* Third line - appears alone on third scroll (first two lines disappear) */}
          {currentStep >= 2 && (
            <h2 
              key="line3"
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light leading-tight animate-fade-in"
            >
              {textLines[2].split(' ').map((word, index) => (
                <span 
                  key={index}
                  className="inline-block animate-slide-in"
                  style={{ 
                    marginRight: index < textLines[2].split(' ').length - 1 ? '0.25rem' : '0',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
          )}
        </div>
        
        {/* Scroll hint */}
        {currentStep < textLines.length - 1 && (
          <div className="absolute bottom-8 right-8 opacity-60">
            <p className="text-white text-sm font-light mb-2">Scroll to continue</p>
            <div className="animate-bounce">
              <svg className="w-4 h-4 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-in {
          animation: slide-in 0.8s ease-out both;
        }
      `}</style>
    </section>
  )
}