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
        scrollInstanceRef.current = new (LocomotiveScroll as any)({
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

        // 等待下一幀更新
        requestAnimationFrame(() => {
          if (scrollInstanceRef.current) {
            scrollInstanceRef.current.update()
          }
        })

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
          scrollInstanceRef.current.destroy()
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
