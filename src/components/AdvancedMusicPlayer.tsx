'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

interface Song {
  src: string
  title: string
  artist: string
}

export default function AdvancedMusicPlayer() {
  const { t } = useTranslationSafe()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const dragRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const startPos = useRef({ x: 0, y: 0 })
  const startPointerPos = useRef({ x: 0, y: 0 })

  // 歌曲列表
  const songs: Song[] = [
    {
      src: '/Janji, Johnning - Heroes Tonight (feat. Johnning) [NCS Release].mp3',
      title: 'Heroes Tonight',
      artist: 'Janji, Johnning'
    },
    {
      src: '/Rival, Cadmium, Harley Bird - Seasons (feat. Harley Bird) [NCS Release].mp3',
      title: 'Seasons',
      artist: 'Rival, Cadmium, Harley Bird'
    }
  ]

  const currentSong = songs[currentSongIndex]

  useEffect(() => {
    // 初始化位置到右下角
    const updateInitialPosition = () => {
      if (dragRef.current) {
        const rect = dragRef.current.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        
        // 設定到右下角，留出邊距
        const playerWidth = Math.min(280, viewportWidth * 0.9) // 響應式寬度
        const initialX = viewportWidth - playerWidth - 16 // 16px = 1rem
        const initialY = viewportHeight - rect.height - 16 // 16px = 1rem
        
        setPosition({ x: Math.max(8, initialX), y: Math.max(8, initialY) }) // 確保不會超出邊界
      }
    }

    updateInitialPosition()
    
    return () => {
      // 清理函數
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      // 播放下一首
      playNextSong()
    }

    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentSongIndex])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!dragRef.current) return
    
    setIsDragging(true)
    
    const rect = dragRef.current.getBoundingClientRect()
    startPos.current = { x: rect.left, y: rect.top }
    startPointerPos.current = { x: e.clientX, y: e.clientY }
    
    e.preventDefault()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!dragRef.current) return
    
    setIsDragging(true)
    
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
    
    // 獲取播放器尺寸
    const rect = dragRef.current.getBoundingClientRect()
    const playerWidth = rect.width
    const playerHeight = rect.height
    
    // 嚴格限制在視窗範圍內，留出安全邊距
    const maxX = window.innerWidth - playerWidth - 8 // 右邊留 8px 邊距
    const maxY = window.innerHeight - playerHeight - 8 // 底部留 8px 邊距
    const minX = 8 // 左邊留 8px 邊距
    const minY = 8 // 頂部留 8px 邊距
    
    setPosition({
      x: Math.max(minX, Math.min(newX, maxX)),
      y: Math.max(minY, Math.min(newY, maxY))
    })
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !dragRef.current) return
    
    const touch = e.touches[0]
    const deltaX = touch.clientX - startPointerPos.current.x
    const deltaY = touch.clientY - startPointerPos.current.y
    
    const newX = startPos.current.x + deltaX
    const newY = startPos.current.y + deltaY
    
    // 獲取播放器尺寸
    const rect = dragRef.current.getBoundingClientRect()
    const playerWidth = rect.width
    const playerHeight = rect.height
    
    // 嚴格限制在視窗範圍內，留出安全邊距
    const maxX = window.innerWidth - playerWidth - 8 // 右邊留 8px 邊距
    const maxY = window.innerHeight - playerHeight - 8 // 底部留 8px 邊距
    const minX = 8 // 左邊留 8px 邊距
    const minY = 8 // 頂部留 8px 邊距
    
    setPosition({
      x: Math.max(minX, Math.min(newX, maxX)),
      y: Math.max(minY, Math.min(newY, maxY))
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

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length
    setCurrentSongIndex(nextIndex)
    
    // 延迟播放新歌曲
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
      }
    }, 100)
  }

  const playPreviousSong = () => {
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1
    setCurrentSongIndex(prevIndex)
    
    // 延迟播放新歌曲
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
      }
    }, 100)
  }

  return (
    <div
      ref={dragRef}
      className={`fixed z-50 bg-[var(--color-surface)] border border-[var(--color-divider)] rounded-lg p-3 sm:p-4 shadow-[0_25px_45px_rgba(15,15,40,0.12)] transition-shadow ${
        isDragging ? 'cursor-grabbing shadow-[0_35px_65px_rgba(15,15,40,0.18)]' : 'cursor-grab'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
        touchAction: 'none',
        width: '280px',
        maxWidth: '90vw'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* 內容採用垂直佈局 */}
      <div className="flex flex-col">
        {/* 拖動提示 */}
        <div className="flex items-center gap-1 mb-2 text-xs text-[var(--color-text-muted)]">
          <span className="material-symbols-outlined text-sm">drag_indicator</span>
          <span className="hidden sm:inline">{t('musicPlayer.dragToMove', '拖動移動')}</span>
          <span className="sm:hidden">{t('musicPlayer.holdToMove', '按住移動')}</span>
          <span className="ml-auto inline-flex items-center px-2 py-0.5 text-xs font-medium bg-[var(--color-primary)] text-white rounded-full">
            NEW
          </span>
        </div>

        {/* 歌曲資訊 */}
        <div className="mb-2">
          <div className="text-sm font-medium text-[rgb(var(--foreground-rgb))] truncate">
            {currentSong.title}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] truncate">
            {currentSong.artist}
          </div>
        </div>

        {/* 原生音樂播放器 */}
        <div className="mb-2">
          <audio
            ref={audioRef}
            src={currentSong.src}
            controls
            className="w-full h-8 sm:h-10 rounded-lg"
            preload="metadata"
          >
            {t('musicPlayer.browserNotSupported', '您的瀏覽器不支援音樂播放')}
          </audio>
        </div>

        {/* 控制按鈕 */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={playPreviousSong}
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-[var(--color-surface-variant)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-xs sm:text-sm">skip_previous</span>
          </button>
          
          <button
            onClick={playNextSong}
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-[var(--color-surface-variant)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-xs sm:text-sm">skip_next</span>
          </button>
        </div>
      </div>
    </div>
  )
}
