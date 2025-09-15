'use client'

import { motion } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0 
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50 px-4 py-2 border-2 border-kevin-blue dark:border-blue-400 text-kevin-blue dark:text-blue-400 bg-white dark:bg-gray-900 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center text-sm font-medium"
      aria-label="返回頂部"
    >
      <ChevronUp size={16} className="mr-1" />
      <span>TOP</span>
    </motion.button>
  )
}
