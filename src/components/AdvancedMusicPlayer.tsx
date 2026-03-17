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
  const [isDragFromBottom, setIsDragFromBottom] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  
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
    // 初始化位置到底部中央
    const updateInitialPosition = () => {
      if (dragRef.current) {
        const rect = dragRef.current.getBoundingClientRect()
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        
        // 設定到底部中央，留出邊距
        const initialX = (viewportWidth - rect.width) / 2
        const initialY = viewportHeight - rect.height - 16 // 16px = 1rem
        
        setPosition({ x: initialX, y: initialY })
        setIsDragFromBottom(false)
      }
    }

    updateInitialPosition()
    window.addEventListener('resize', updateInitialPosition)
    
    return () => window.removeEventListener('resize', updateInitialPosition)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      // 播放下一首
      playNextSong()
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentSongIndex])

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

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length
    setCurrentSongIndex(nextIndex)
    setCurrentTime(0)
    
    // 延迟播放新歌曲
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }, 100)
  }

  const playPreviousSong = () => {
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1
    setCurrentSongIndex(prevIndex)
    setCurrentTime(0)
    
    // 延迟播放新歌曲
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }, 100)
  }

  const togglePlayPause = () => {
    if (!audioRef.current) return
    
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div
      ref={dragRef}
      className={`fixed z-50 bg-[var(--color-surface)] border border-[var(--color-divider)] rounded-lg p-4 shadow-[0_25px_45px_rgba(15,15,40,0.12)] transition-shadow ${
        isDragging ? 'cursor-grabbing shadow-[0_35px_65px_rgba(15,15,40,0.18)]' : 'cursor-grab'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
        touchAction: 'none',
        width: '320px'
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

        {/* 進度條 */}
        <div className="mb-2">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-[var(--color-divider)] rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(currentTime / duration) * 100}%, var(--color-divider) ${(currentTime / duration) * 100}%, var(--color-divider) 100%)`
            }}
          />
          <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* 控制按鈕 - 放在時間下方 */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <button
            onClick={playPreviousSong}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--color-surface-variant)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">skip_previous</span>
          </button>
          
          <button
            onClick={togglePlayPause}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <button
            onClick={playNextSong}
            className="w-7 h-7 flex items-center justify-center rounded-full bg-[var(--color-surface-variant)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">skip_next</span>
          </button>
        </div>
      </div>

      {/* 隱藏的 audio 元素 */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        preload="metadata"
      />
    </div>
  )
}
