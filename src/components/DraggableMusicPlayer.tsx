'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function DraggableMusicPlayer() {
  const { t } = useTranslationSafe()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isDragFromBottom, setIsDragFromBottom] = useState(false)
  const dragRef = useRef<HTMLDivElement>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const startPointerPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // 初始化位置到右下角
    const updateInitialPosition = () => {
      if (dragRef.current) {
        const rect = dragRef.current.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        
        // 設定到右下角，留出邊距
        const initialX = viewportWidth - rect.width - 16 // 16px = 1rem
        const initialY = viewportHeight - rect.height - 16
        
        setPosition({ x: initialX, y: initialY })
        setIsDragFromBottom(true)
      }
    }

    updateInitialPosition()
    window.addEventListener('resize', updateInitialPosition)
    
    return () => window.removeEventListener('resize', updateInitialPosition)
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!dragRef.current) return
    
    setIsDragging(true)
    setIsDragFromBottom(false)
    
    const rect = dragRef.current.getBoundingClientRect()
    startPos.current = { x: rect.left, y: rect.top }
    startPointerPos.current = { x: e.clientX, y: e.clientY }
    
    e.preventDefault()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!dragRef.current) return
    
    setIsDragging(true)
    setIsDragFromBottom(false)
    
    const touch = e.touches[0]
    const rect = dragRef.current.getBoundingClientRect()
    startPos.current = { x: rect.left, y: rect.top }
    startPointerPos.current = { x: touch.clientX, y: touch.clientY }
    
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !dragRef.current) return
    
    const deltaX = e.clientX - startPointerPos.current.x
    const deltaY = e.clientY - startPointerPos.current.y
    
    const newX = startPos.current.x + deltaX
    const newY = startPos.current.y + deltaY
    
    // 限制在視窗範圍內
    const rect = dragRef.current.getBoundingClientRect()
    const maxX = window.innerWidth - rect.width
    const maxY = window.innerHeight - rect.height
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !dragRef.current) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - startPointerPos.current.x
    const deltaY = touch.clientY - startPointerPos.current.y
    
    const newX = startPos.current.x + deltaX
    const newY = startPos.current.y + deltaY
    
    // 限制在視窗範圍內
    const rect = dragRef.current.getBoundingClientRect()
    const maxX = window.innerWidth - rect.width
    const maxY = window.innerHeight - rect.height
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    })
    
    e.preventDefault()
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      // 桌面端事件
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      // 移動端事件
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      
      // 防止文字選取和滾動
      document.body.style.userSelect = 'none'
      document.body.style.webkitUserSelect = 'none'
      document.body.style.touchAction = 'none'
      document.body.style.cursor = 'grabbing'
      
      // 移動端防止頁面滾動
      document.body.style.overflow = 'hidden'
    } else {
      // 移除所有事件監聽
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      
      // 恢復樣式
      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''
      document.body.style.touchAction = ''
      document.body.style.cursor = ''
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''
      document.body.style.touchAction = ''
      document.body.style.cursor = ''
      document.body.style.overflow = ''
    }
  }, [isDragging])

  return (
    <div
      ref={dragRef}
      className={`fixed z-50 bg-[var(--color-surface)] border border-[var(--color-divider)] rounded-xl p-3 shadow-[0_25px_45px_rgba(15,15,40,0.12)] transition-shadow ${
        isDragging ? 'cursor-grabbing shadow-[0_35px_65px_rgba(15,15,40,0.18)]' : 'cursor-grab'
      }`}
      style={{
        left: isDragFromBottom ? 'auto' : `${position.x}px`,
        top: isDragFromBottom ? 'auto' : `${position.y}px`,
        right: isDragFromBottom ? '16px' : 'auto',
        bottom: isDragFromBottom ? '16px' : 'auto',
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* 拖動提示 */}
      <div className="flex items-center gap-2 mb-2 text-xs text-[var(--color-text-muted)]">
        <span className="material-symbols-outlined text-sm">drag_indicator</span>
        <span className="hidden sm:inline">{t('musicPlayer.dragToMove', '拖動移動')}</span>
        <span className="sm:hidden">{t('musicPlayer.holdToMove', '按住移動')}</span>
      </div>
      
      {/* 音樂播放器 */}
      <audio 
        controls 
        className="w-56 sm:w-64 h-10 rounded-lg"
        preload="metadata"
      >
        <source src="/Janji, Johnning - Heroes Tonight (feat. Johnning) [NCS Release].mp3" type="audio/mpeg" />
        {t('musicPlayer.browserNotSupported', '您的瀏覽器不支援音樂播放')}
      </audio>
    </div>
  )
}
