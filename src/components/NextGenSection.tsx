'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function NextGenSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards with stagger
      gsap.fromTo(".feature-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Text reveal
      gsap.fromTo(".section-title",
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="story-section min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl lg:text-6xl font-light leading-tight text-white mb-8">
            Next Generation AI Platform
          </h2>
          <p className="section-title text-xl text-white/80 max-w-3xl mx-auto">
            Empowering developers and businesses with cutting-edge AI tools and infrastructure
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="feature-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-orange-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Lightning Fast</h3>
            <p className="text-white/70 leading-relaxed">
              Deploy and scale AI agents with unprecedented speed and efficiency across any infrastructure.
            </p>
          </div>

          <div className="feature-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-orange-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Smart Automation</h3>
            <p className="text-white/70 leading-relaxed">
              Intelligent agents that learn, adapt, and optimize workflows automatically without manual intervention.
            </p>
          </div>

          <div className="feature-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-orange-500/30 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Enterprise Security</h3>
            <p className="text-white/70 leading-relaxed">
              Built-in security features and compliance standards to protect your data and maintain trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
