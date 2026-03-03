'use client'

import { PropsWithChildren, useEffect, useState } from 'react'

const MotionProvider = ({ children }: PropsWithChildren) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadMotion = async () => {
      try {
        // 動態載入 framer-motion
        await import('framer-motion')
        setIsLoaded(true)
      } catch (error) {
        console.warn('Framer Motion loading failed:', error)
      }
    }

    // 延遲載入，避免阻塞初始渲染
    const timer = setTimeout(loadMotion, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return <>{children}</>
}

export default MotionProvider
