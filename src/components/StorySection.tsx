'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the large circle
      gsap.fromTo(circleRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: -180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Animate scattered dots around the circle
      gsap.fromTo(".scatter-dot",
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Text reveal animation
      gsap.fromTo(".reveal-text",
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Input field animation
      gsap.fromTo(inputRef.current,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="story-section min-h-screen relative red-gradient flex items-center justify-center px-8 lg:px-16 overflow-hidden">
      {/* Scattered dots */}
      <div className="absolute inset-0">
        {/* Top area dots */}
        <div className="scatter-dot absolute top-32 left-1/4 w-2 h-2 bg-white rounded-full"></div>
        <div className="scatter-dot absolute top-40 left-1/3 w-1 h-1 bg-white/80 rounded-full"></div>
        <div className="scatter-dot absolute top-28 left-2/5 w-1.5 h-1.5 bg-white/90 rounded-full"></div>
        <div className="scatter-dot absolute top-36 left-1/2 w-1 h-1 bg-white/70 rounded-full"></div>
        <div className="scatter-dot absolute top-44 left-3/5 w-2 h-2 bg-white rounded-full"></div>
        
        {/* Left side dots */}
        <div className="scatter-dot absolute top-1/2 left-20 w-1.5 h-1.5 bg-white/80 rounded-full"></div>
        <div className="scatter-dot absolute top-2/3 left-32 w-1 h-1 bg-white/60 rounded-full"></div>
        <div className="scatter-dot absolute top-1/3 left-24 w-2 h-2 bg-white rounded-full"></div>
        
        {/* Right side dots */}
        <div className="scatter-dot absolute top-1/2 right-20 w-1 h-1 bg-white/70 rounded-full"></div>
        <div className="scatter-dot absolute top-2/5 right-32 w-1.5 h-1.5 bg-white/90 rounded-full"></div>
        <div className="scatter-dot absolute top-3/5 right-24 w-2 h-2 bg-white rounded-full"></div>
        <div className="scatter-dot absolute top-1/4 right-40 w-1 h-1 bg-white/60 rounded-full"></div>
        <div className="scatter-dot absolute top-3/4 right-36 w-1.5 h-1.5 bg-white/80 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Heading */}
        <div ref={textRef} className="mb-16">
          <h1 className="reveal-text text-5xl lg:text-7xl xl:text-8xl font-light leading-tight text-white">
            H is an AI Research Lab and Product Company
          </h1>
        </div>

        {/* Large Circle */}
        <div className="relative mb-16">
          <div
            ref={circleRef}
            className="w-80 h-80 lg:w-96 lg:h-96 xl:w-[450px] xl:h-[450px] bg-gradient-to-br from-orange-400 via-red-500 to-red-600 rounded-full mx-auto shadow-2xl"
            style={{
              boxShadow: '0 0 100px rgba(255, 69, 0, 0.8), inset 0 0 50px rgba(255, 255, 255, 0.2)'
            }}
          />
        </div>

        {/* Input Field */}
        <div ref={inputRef} className="max-w-md mx-auto">
          <div className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg p-6">
            <label className="block text-white/80 text-sm font-medium mb-3">
              What do you want to automate?
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 text-lg"
                placeholder="Type your automation idea..."
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Replay Button */}
      <div className="absolute bottom-8 right-8">
        <button className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-lg text-white hover:bg-black/60 transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">Replay Live Runs</span>
        </button>
      </div>
    </section>
  )
}
