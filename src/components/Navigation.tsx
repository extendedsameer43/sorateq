'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  return (
    <nav ref={navRef} className="sticky top-0 left-0 right-0 z-[1000]">
      {/* Top navigation bar with events */}
      <div className="w-full bg-black/60 text-gray-300 text-xs uppercase tracking-widest backdrop-blur-sm overflow-hidden">
        <div className="relative">
          <div className="flex animate-scroll whitespace-nowrap">
            <div className="flex items-center space-x-8 px-8">
              <span className="text-gray-300">MEET US AT</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">RAISE SUMMIT</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">FOUNDERS FORUM</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">GTC PARIS</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">VIVATECH</span>
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center space-x-8 px-8">
              <span className="text-gray-300">MEET US AT</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">RAISE SUMMIT</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">FOUNDERS FORUM</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">GTC PARIS</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-300">VIVATECH</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main navigation with logo and buttons */}
      <div className="flex justify-center px-10 py-1">
        <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-1">
          <div className="flex items-center justify-between max-w-4xl mx-auto min-h-[32px]">
            {/* Logo */}
            <div className="flex items-center px-2">
              <Link href="/" className="text-white hover:text-orange-400 transition-colors">
                <span className="text-lg font-extrabold tracking-wide">SORATEQ</span>
              </Link>
            </div>

            {/* Center navigation */}
            <div className="flex-1 flex justify-center px-3">
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-white hover:text-orange-400 text-xs font-light transition-colors flex items-center py-1">
                  Runner H 
                  <span className="px-1.5 py-0.5 ml-1.5 bg-gray-800 text-white text-xs rounded-full">Beta</span>
                </a>
                <a href="#" className="text-white hover:text-orange-400 text-xs font-light transition-colors flex items-center py-1">
                  Surfer H 
                  <span className="px-1.5 py-0.5 ml-1.5 bg-gray-600 text-white text-xs rounded-full">Open-Source</span>
                </a>
                <a href="#" className="text-white hover:text-orange-400 text-xs font-light transition-colors py-1">
                  Tester H
                </a>
                <a href="#" className="text-white hover:text-orange-400 text-xs font-light transition-colors flex items-center py-1">
                  Platform 
                  <span className="px-1.5 py-0.5 ml-1.5 bg-gray-600 text-white text-xs rounded-full">Soon</span>
                </a>
                <a href="#" className="text-white hover:text-orange-400 text-xs font-light transition-colors flex items-center py-1">
                  Careers
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-orange-400 text-xs font-light transition-colors py-1">
                  Blog
                </a>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-2 px-2">
              <a href="#" className="bg-black text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-900 transition-colors">
                Talk to Sales
              </a>
              <a href="#" className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-medium hover:bg-gray-100 transition-colors shadow-md">
                Try Runner H
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-orange-400 transition-colors p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
        
        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-gray-800">
            <div className="px-6 py-4 space-y-4">
              {/* Mobile navigation links */}
              <div className="space-y-4">
                <a href="#" className="block text-white hover:text-orange-400 text-sm font-normal transition-colors">
                  <div className="flex items-center">
                    Runner H 
                    <span className="px-2 py-1 ml-2 bg-gray-800 text-white text-xs rounded-full">Beta</span>
                  </div>
                </a>
                <a href="#" className="block text-white hover:text-orange-400 text-sm font-normal transition-colors">
                  <div className="flex items-center">
                    Surfer H 
                    <span className="px-2 py-1 ml-2 bg-gray-600 text-white text-xs rounded-full">Open-Source</span>
                  </div>
                </a>
                <a href="#" className="block text-white hover:text-orange-400 text-sm font-normal transition-colors">
                  Tester H
                </a>
                <a href="#" className="block text-white hover:text-orange-400 text-sm font-normal transition-colors">
                  <div className="flex items-center">
                    Platform 
                    <span className="px-2 py-1 ml-2 bg-gray-600 text-white text-xs rounded-full">Soon</span>
                  </div>
                </a>
                <a href="#" className="block text-white hover:text-orange-400 text-sm font-normal transition-colors">
                  <div className="flex items-center">
                    Careers
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
                <a href="#" className="block text-white hover:text-orange-400 text-sm font-normal transition-colors">
                  Blog
                </a>
              </div>
              
              {/* Mobile buttons */}
              <div className="pt-4 border-t border-gray-800 space-y-3">
                <a href="#" className="block w-full text-center bg-black text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
                  Talk to Sales
                </a>
                <a href="#" className="block w-full text-center bg-white text-black px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                  Try Runner H
                </a>
              </div>
            </div>
          </div>
        )}
    </nav>
  )
}
