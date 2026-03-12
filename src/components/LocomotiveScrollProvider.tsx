'use client'

import { useEffect, useRef, type ReactNode } from 'react'

type LocomotiveScrollProviderProps = {
  children: ReactNode
}

declare global {
  interface Window {
    locomotiveScroll?: any
  }
}

const LocomotiveScrollProvider = ({ children }: LocomotiveScrollProviderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !scrollRef.current) return

    const initScroll = async () => {
      try {
        // 動態導入 LocomotiveScroll
        const LocomotiveScrollModule = await import('locomotive-scroll')
        const LocomotiveScroll = LocomotiveScrollModule.default

        // 初始化 LocomotiveScroll
        scrollInstanceRef.current = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 0.8,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
          },
          reloadOnContextChange: false,
          touchMultiplier: 2,
          resetNativeScroll: true,
          lerp: 0.1,
        })

        window.locomotiveScroll = scrollInstanceRef.current

        // 等待初始化完成後再更新
        setTimeout(() => {
          if (scrollInstanceRef.current && typeof scrollInstanceRef.current.update === 'function') {
            scrollInstanceRef.current.update()
          }
        }, 100)

      } catch (error) {
        console.error('Failed to initialize LocomotiveScroll:', error)
      }
    }

    // 延遲初始化
    const timer = setTimeout(initScroll, 100)

    // 清理函數
    return () => {
      clearTimeout(timer)
      
      if (scrollInstanceRef.current) {
        try {
          if (typeof scrollInstanceRef.current.destroy === 'function') {
            scrollInstanceRef.current.destroy()
          }
        } catch (error) {
          console.error('Error destroying LocomotiveScroll:', error)
        }
        scrollInstanceRef.current = null
        window.locomotiveScroll = undefined
      }
    }
  }, [])

  return (
    <div 
      ref={scrollRef} 
      data-scroll-container
    >
      {children}
    </div>
  )
}

export default LocomotiveScrollProvider
