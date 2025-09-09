'use client'

import { useEffect, useRef, useState } from 'react'

export default function SecondSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(-1) // Start with -1 so no text shows initially
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollDirection, setScrollDirection] = useState<'forward' | 'backward'>('forward')
  const [verticalLinesExiting, setVerticalLinesExiting] = useState(false)
  const [horizontalLinesExiting, setHorizontalLinesExiting] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)

  const textLines = [
    "Agentic AI isn't just another tool.",
    "It's the next generation of",
    "teammates"
  ]

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current || isScrolling) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const isInSection = rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5
      
      // Update viewport visibility state
      setIsInViewport(rect.top < window.innerHeight && rect.bottom > 0)
      
      const direction = e.deltaY > 0 ? 1 : -1
      const newStep = Math.max(-1, Math.min(currentStep + direction, 5)) // Allow up to step 5 for horizontal lines closer position
      
      // AGGRESSIVE viewport locking during any animation sequence
      if (currentStep > -1) {
        // Completely lock viewport during any animation state
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        
        // Only allow step changes when in section
        if (isInSection && newStep !== currentStep) {
          setIsScrolling(true)
          setCurrentStep(newStep)
          setTimeout(() => setIsScrolling(false), 600)
        }
        return
      }
      
      // Normal scroll behavior only when completely back to initial state (currentStep === -1)
      if (!isInSection) return
      
      // Track scroll direction
      setScrollDirection(direction > 0 ? 'forward' : 'backward')
      
      // Handle exit animations for backward scrolling
      if (direction < 0) {
        // If going from step 2 to 1, trigger vertical lines exit  
        if (currentStep === 2) {
          setVerticalLinesExiting(true)
          setTimeout(() => setVerticalLinesExiting(false), 600)
        }
        // If going from step 4 to 3, trigger horizontal lines exit
        else if (currentStep === 4) {
          setHorizontalLinesExiting(true)
          setTimeout(() => setHorizontalLinesExiting(false), 600)
        }
      }
      
      // Allow step changes when in section
      if (newStep !== currentStep && isInSection) {
        setIsScrolling(true)
        setCurrentStep(newStep)
        setTimeout(() => setIsScrolling(false), 600)
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
                    animationDelay: `${index * 0.05}s`, // Faster word reveals
                    animationDuration: '0.4s' // Smoother individual word animations
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
                    animationDelay: `${index * 0.05}s`, // Faster word reveals
                    animationDuration: '0.4s' // Smoother individual word animations
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
              {/* Animated vertical lines - show from step 2 onwards, hide when going below step 2 */}
              {(currentStep >= 2 || verticalLinesExiting) && isInViewport && (
                <div className="fixed inset-0 pointer-events-none z-[5]">
                  {/* Left vertical line */}
                  <div 
                    className={`absolute h-full w-[1.5px] sm:w-[2px] bg-gray-500 transition-all duration-700 ease-in-out ${
                      verticalLinesExiting 
                        ? 'left-[-200px] animate-slide-out-left'
                        : currentStep === 2 
                        ? 'left-[20%] sm:left-[15%] md:left-[12%] lg:left-[10%] xl:left-[8%] animate-slide-in-left' 
                        : currentStep >= 3
                        ? 'left-[35%]'
                        : 'left-[20%] sm:left-[15%] md:left-[12%] lg:left-[10%] xl:left-[8%]'
                    }`}
                    style={{
                      top: 0,
                      animationDelay: currentStep === 2 ? '0.2s' : '0s', // Reduced delay
                      animationDuration: verticalLinesExiting || currentStep === 2 ? '0.6s' : '0s', // Faster animation
                      animationFillMode: 'both',
                      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' // Smoother easing
                    }}
                  />
                  
                  {/* Right vertical line */}
                  <div 
                    className={`absolute h-full w-[1.5px] sm:w-[2px] bg-gray-500 transition-all duration-700 ease-in-out ${
                      verticalLinesExiting 
                        ? 'right-[-200px] animate-slide-out-right'
                        : currentStep === 2 
                        ? 'right-[20%] sm:right-[15%] md:right-[12%] lg:right-[10%] xl:right-[8%] animate-slide-in-right' 
                        : currentStep >= 3
                        ? 'right-[35%]'
                        : 'right-[20%] sm:right-[15%] md:right-[12%] lg:right-[10%] xl:right-[8%]'
                    }`}
                    style={{
                      top: 0,
                      animationDelay: currentStep === 2 ? '0.2s' : '0s', // Reduced delay
                      animationDuration: verticalLinesExiting || currentStep === 2 ? '0.6s' : '0s', // Faster animation
                      animationFillMode: 'both',
                      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' // Smoother easing
                    }}
                  />
                </div>
              )}
              
              {/* Horizontal lines - show from step 4 onwards, with exit animation */}
              {(currentStep >= 4 || horizontalLinesExiting) && isInViewport && (
                <div className="fixed inset-0 pointer-events-none z-[6]">
                  {/* Top horizontal line */}
                  <div 
                    className={`absolute w-full h-[1.5px] sm:h-[2px] bg-gray-500 transition-all duration-700 ease-in-out ${
                      horizontalLinesExiting 
                        ? 'top-[-200px] animate-slide-out-top'
                        : currentStep === 4 
                        ? 'top-[20%] sm:top-[15%] md:top-[12%] lg:top-[10%] xl:top-[8%] animate-slide-in-top' 
                        : currentStep >= 5
                        ? 'top-[25%]'
                        : 'top-[20%] sm:top-[15%] md:top-[12%] lg:top-[10%] xl:top-[8%]'
                    }`}
                    style={{
                      left: 0,
                      animationDelay: currentStep === 4 ? '0.1s' : '0s',
                      animationDuration: horizontalLinesExiting || currentStep === 4 ? '0.6s' : '0s',
                      animationFillMode: 'both',
                      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                  
                  {/* Bottom horizontal line */}
                  <div 
                    className={`absolute w-full h-[1.5px] sm:h-[2px] bg-gray-500 transition-all duration-700 ease-in-out ${
                      horizontalLinesExiting 
                        ? 'bottom-[-200px] animate-slide-out-bottom'
                        : currentStep === 4 
                        ? 'bottom-[20%] sm:bottom-[15%] md:bottom-[12%] lg:bottom-[10%] xl:bottom-[8%] animate-slide-in-bottom' 
                        : currentStep >= 5
                        ? 'bottom-[25%]'
                        : 'bottom-[20%] sm:bottom-[15%] md:bottom-[12%] lg:bottom-[10%] xl:bottom-[8%]'
                    }`}
                    style={{
                      left: 0,
                      animationDelay: currentStep === 4 ? '0.1s' : '0s',
                      animationDuration: horizontalLinesExiting || currentStep === 4 ? '0.6s' : '0s',
                      animationFillMode: 'both',
                      animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
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
                    animationDelay: `${index * 0.05}s`, // Faster word reveals
                    animationDuration: '0.4s' // Smoother individual word animations
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