'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AutomationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main text animation
      gsap.fromTo(".automation-text",
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

      // CTA animation
      gsap.fromTo(ctaRef.current,
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Floating animation for CTA button
      gsap.to(ctaRef.current, {
        y: 10,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="story-section min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-16">
          <h2 className="automation-text text-4xl lg:text-6xl xl:text-7xl font-light leading-tight text-white mb-8">
            Ready to transform your{' '}
            <span className="text-gradient">workflow?</span>
          </h2>
          <p className="automation-text text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12">
            Join thousands of developers and companies already using our platform to build the future of work.
          </p>
        </div>

        <div ref={ctaRef} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
            <button className="border border-white/30 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>
          
          <p className="text-white/60 text-sm">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>

        {/* Bottom navigation hint */}
        <div className="mt-20">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/50 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <p className="text-white/40 text-sm mt-2">Scroll to explore more</p>
        </div>
      </div>
    </section>
  )
}
