"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Build Something
            <br />
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Amazing
            </motion.span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Create beautiful, modern applications with cutting-edge technology 
            and elegant design principles.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.button 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 min-w-[200px]"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button 
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 min-w-[200px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
          
          {/* Decorative Elements */}
          <motion.div 
            className="mt-16 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl opacity-30 blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center justify-center space-x-8 text-gray-500">
                <div className="text-sm font-medium">Trusted by</div>
                <div className="flex space-x-6">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      key={i}
                      className="w-8 h-8 bg-gray-200 rounded"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1 + (i * 0.1),
                        ease: "backOut"
                      }}
                      whileHover={{ scale: 1.1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}