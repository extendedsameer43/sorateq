'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AgenticSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".reveal-text",
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
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
    <section ref={sectionRef} className="story-section min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="reveal-text text-4xl lg:text-6xl xl:text-7xl font-light leading-tight text-white mb-8">
          Building the future of{' '}
          <span className="text-gradient">agentic computing</span>
        </h2>
        <p className="reveal-text text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
          Where intelligent agents work alongside humans to automate complex workflows, 
          understand context, and deliver results that exceed expectations.
        </p>
      </div>
    </section>
  )
}
