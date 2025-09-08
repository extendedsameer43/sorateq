'use client'

export default function ScrollToTop() {
  return (
    <button 
      onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      className="fixed bottom-4 right-4 p-2 bg-white text-black rounded-full shadow-lg hover:bg-gray-200 transition-colors z-50"
      aria-label="Scroll to top"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  )
}
