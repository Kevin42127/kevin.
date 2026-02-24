'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void
  children: React.ReactNode
  disabled?: boolean
}

export default function PullToRefresh({ onRefresh, children, disabled = false }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef(0)
  const currentY = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled || isRefreshing) return
    startY.current = e.touches[0].clientY
    setIsPulling(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling || disabled || isRefreshing) return
    
    currentY.current = e.touches[0].clientY
    const distance = currentY.current - startY.current
    
    // 只在向下拉時才響應
    if (distance > 0) {
      setPullDistance(Math.min(distance, 120)) // 最大拉動距離 120px
    } else {
      setPullDistance(0)
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling || disabled) return
    
    setIsPulling(false)
    
    // 如果拉動距離超過 60px，觸發刷新
    if (pullDistance >= 60 && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } catch (error) {
        console.error('Refresh failed:', error)
      } finally {
        setIsRefreshing(false)
      }
    }
    
    setPullDistance(0)
  }

  useEffect(() => {
    const handleGlobalTouchEnd = () => {
      setIsPulling(false)
      setPullDistance(0)
    }

    window.addEventListener('touchend', handleGlobalTouchEnd)
    return () => window.removeEventListener('touchend', handleGlobalTouchEnd)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 下拉刷新指示器 */}
      <AnimatePresence>
        {(isPulling || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: isRefreshing ? 0 : Math.min(pullDistance - 60, 0)
            }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
            style={{ transform: `translateY(${isRefreshing ? 0 : pullDistance - 60}px)` }}
          >
            <div className="bg-[var(--color-surface)] border border-[var(--color-divider)] rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
              {isRefreshing ? (
                <>
                  <div className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-[var(--color-text)]">更新中...</span>
                </>
              ) : (
                <>
                  <svg 
                    className="w-4 h-4 text-[var(--color-primary)]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ transform: `rotate(${Math.min(pullDistance, 120) * 1.5}deg)` }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm text-[var(--color-text)]">
                    {pullDistance >= 60 ? '放開刷新' : '下拉刷新'}
                  </span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 內容區域 */}
      <div 
        className="transition-transform duration-300"
        style={{ transform: `translateY(${isRefreshing ? 60 : Math.min(pullDistance, 0)}px)` }}
      >
        {children}
      </div>
    </div>
  )
}
