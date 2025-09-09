"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export function IsThisYou() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [visibleQuestions, setVisibleQuestions] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const questions = [
    {
      text: "Do you want to build a website for your company?",
      icon: "🌐",
    },
    {
      text: "Do you need AI but don't know where to start?",
      icon: "🤖",
    },
    {
      text: "Scaling is hard without automation?",
      icon: "📈",
    },
    {
      text: "High operational costs reduce profits?",
      icon: "💰",
    },
    {
      text: "Repetitive tasks slow you down?",
      icon: "⏰",
    },
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (progress > 0.1 && progress < 0.25) {
        setIsInView(true);
        setVisibleQuestions(0); // Only title visible
      } else if (progress >= 0.25 && progress < 0.4) {
        setIsInView(true);
        setVisibleQuestions(1); // First question appears
      } else if (progress >= 0.4 && progress < 0.6) {
        setIsInView(true);
        setVisibleQuestions(2); // Second question appears, first disappears
      } else if (progress >= 0.6 && progress < 0.75) {
        setIsInView(true);
        setVisibleQuestions(3); // Third question appears, second disappears (longer transition)
      } else if (progress >= 0.75 && progress < 0.85) {
        setIsInView(true);
        setVisibleQuestions(4); // Fourth question appears, third disappears
      } else if (progress >= 0.85 && progress < 0.95) {
        setIsInView(true);
        setVisibleQuestions(5); // Fifth question appears, fourth disappears
      } else {
        setIsInView(false);
        setVisibleQuestions(0);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div 
      ref={containerRef}
      className="h-[500vh] relative" // Increased height for more scroll space
    >
      <div className="sticky top-0 h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6 relative">
          
          {/* Main Title - Center */}
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isInView ? 1 : 0, 
              scale: isInView ? 1 : 0.8 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Is This You?
          </motion.h2>

          {/* Questions positioned close to the center text - Only one visible at a time */}
          <div className="relative w-full h-screen">
            
            {/* Question 1 - Top Left of "Is This You?" - Text only */}
            {visibleQuestions >= 1 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: visibleQuestions === 1 ? 1 : 0,
                  x: 0 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-1/4 left-1/6 max-w-xs z-20"
              >
                <div className="relative p-4">
                  <span className="absolute top-0 left-0 text-2xl text-gray-400 font-light">┌</span>
                  <span className="absolute bottom-0 right-0 text-2xl text-gray-400 font-light">┘</span>
                  <p className="text-lg text-gray-700 font-medium mx-4 my-3">
                    {questions[0].text}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Question 2 - Bottom Right */}
            {visibleQuestions >= 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: visibleQuestions === 2 ? 1 : 0,
                  x: 0 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-1/4 right-1/6 max-w-xs z-20"
              >
                <div className="relative p-4">
                  <span className="absolute top-0 left-0 text-2xl text-gray-400 font-light">┌</span>
                  <span className="absolute bottom-0 right-0 text-2xl text-gray-400 font-light">┘</span>
                  <p className="text-lg text-gray-700 font-medium mx-4 my-3">
                    {questions[1].text}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Question 3 - Bottom Left */}
            {visibleQuestions >= 3 && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: visibleQuestions === 3 ? 1 : 0,
                  x: 0 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-1/4 left-1/6 max-w-xs z-20"
              >
                <div className="relative p-4">
                  <span className="absolute top-0 left-0 text-2xl text-gray-400 font-light">┌</span>
                  <span className="absolute bottom-0 right-0 text-2xl text-gray-400 font-light">┘</span>
                  <p className="text-lg text-gray-700 font-medium mx-4 my-3">
                    {questions[2].text}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Question 4 - Top Right */}
            {visibleQuestions >= 4 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ 
                  opacity: visibleQuestions === 4 ? 1 : 0,
                  x: 0 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-1/4 right-1/6 max-w-xs z-20"
              >
                <div className="relative p-4">
                  <span className="absolute top-0 left-0 text-2xl text-gray-400 font-light">┌</span>
                  <span className="absolute bottom-0 right-0 text-2xl text-gray-400 font-light">┘</span>
                  <p className="text-lg text-gray-700 font-medium mx-4 my-3">
                    {questions[3].text}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Question 5 - Bottom */}
            {visibleQuestions >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: visibleQuestions === 5 ? 1 : 0,
                  y: 0 
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-1/6 left-1/2 transform -translate-x-1/2 max-w-sm z-20"
              >
                <div className="relative p-4">
                  <span className="absolute top-0 left-0 text-2xl text-gray-400 font-light">┌</span>
                  <span className="absolute bottom-0 right-0 text-2xl text-gray-400 font-light">┘</span>
                  <p className="text-lg text-gray-700 font-medium mx-4 my-3">
                    {questions[4].text}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Final CTA - Appears when all questions are visible */}
          {visibleQuestions >= questions.length && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            >
              <motion.p 
                className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                We can help! 🚀
              </motion.p>
              
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                Get Started Today
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
