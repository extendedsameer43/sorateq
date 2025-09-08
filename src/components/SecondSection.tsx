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
      const newStep = Math.max(-1, Math.min(currentStep + direction, 5)) // Allow up to step 5 for horizontal lines closer position
      
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
    >
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Container for text - Mobile responsive */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-6 sm:space-y-8 md:space-y-10">
          {/* First line - appears on first scroll, disappears on third scroll */}
          {currentStep >= 0 && currentStep < 2 && (
            <h2 
              key="line1"
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light leading-relaxed tracking-wide animate-fade-in"
            >
              {textLines[0].split(' ').map((word, index) => (
                <span 
                  key={index}
                  className={`inline-block animate-slide-in ${index < textLines[0].split(' ').length - 1 ? 'mr-2 sm:mr-3 md:mr-4' : ''}`}
                  style={{ 
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
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light leading-relaxed tracking-wide animate-fade-in"
            >
              {textLines[1].split(' ').map((word, index) => (
                <span 
                  key={index}
                  className={`inline-block animate-slide-in ${index < textLines[1].split(' ').length - 1 ? 'mr-2 sm:mr-3 md:mr-4' : ''}`}
                  style={{ 
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
            <div className="relative">
              {/* Animated vertical lines */}
              <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[5]">
                {/* Left vertical line */}
                <div 
                  className={`absolute top-0 w-[1.5px] sm:w-[2px] bg-gray-500 transition-all duration-1000 ease-out ${
                    currentStep === 2 
                      ? 'left-[20%] sm:left-[15%] md:left-[12%] lg:left-[10%] xl:left-[8%] animate-slide-in-left' 
                      : 'left-[35%]'
                  }`}
                  style={{
                    height: '100vh',
                    animationDelay: currentStep === 2 ? '0.5s' : '0s',
                    animationDuration: currentStep === 2 ? '1s' : '0s',
                    animationFillMode: 'both'
                  }}
                />
                
                {/* Right vertical line */}
                <div 
                  className={`absolute top-0 w-[1.5px] sm:w-[2px] bg-gray-500 transition-all duration-1000 ease-out ${
                    currentStep === 2 
                      ? 'right-[20%] sm:right-[15%] md:right-[12%] lg:right-[10%] xl:right-[8%] animate-slide-in-right' 
                      : 'right-[35%]'
                  }`}
                  style={{
                    height: '100vh',
                    animationDelay: currentStep === 2 ? '0.5s' : '0s',
                    animationDuration: currentStep === 2 ? '1s' : '0s',
                    animationFillMode: 'both'
                  }}
                />
              </div>
              
              {/* Horizontal lines - appear on step 4 */}
              {currentStep >= 4 && (
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[6]">
                  {/* Top horizontal line */}
                  <div 
                    className={`absolute left-0 right-0 h-[1.5px] sm:h-[2px] bg-gray-500 transition-all duration-1000 ease-out ${
                      currentStep === 4 
                        ? 'top-[20%] sm:top-[15%] md:top-[12%] lg:top-[10%] xl:top-[8%] animate-slide-in-top' 
                        : 'top-[25%]'
                    }`}
                    style={{
                      animationDelay: currentStep === 4 ? '0.3s' : '0s',
                      animationDuration: currentStep === 4 ? '1s' : '0s',
                      animationFillMode: 'both'
                    }}
                  />
                  
                  {/* Bottom horizontal line */}
                  <div 
                    className={`absolute left-0 right-0 h-[1.5px] sm:h-[2px] bg-gray-500 transition-all duration-1000 ease-out ${
                      currentStep === 4 
                        ? 'bottom-[20%] sm:bottom-[15%] md:bottom-[12%] lg:bottom-[10%] xl:bottom-[8%] animate-slide-in-bottom' 
                        : 'bottom-[25%]'
                    }`}
                    style={{
                      animationDelay: currentStep === 4 ? '0.3s' : '0s',
                      animationDuration: currentStep === 4 ? '1s' : '0s',
                      animationFillMode: 'both'
                    }}
                  />
                </div>
              )}
              
              <h2 
                key="line3"
                className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light leading-relaxed tracking-wide animate-fade-in"
              >
              {textLines[2].split(' ').map((word, index) => (
                <span 
                  key={index}
                  className={`inline-block animate-slide-in ${index < textLines[2].split(' ').length - 1 ? 'mr-2 sm:mr-3 md:mr-4' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>
            </div>
          )}
        </div>
        
        {/* Scroll hint */}
        {currentStep < 5 && (
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