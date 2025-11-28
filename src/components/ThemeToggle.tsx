'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const triggerThemeTransition = () => {
    const root = document.documentElement
    root.classList.add('theme-transition')
    window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 220)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => {
        triggerThemeTransition()
        requestAnimationFrame(() => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
        })
      }}
      className="btn-icon"
      aria-label="切換深淺模式"
    >
      <span className="material-symbols-outlined text-base">
        {theme === 'dark' ? 'sunny' : 'dark_mode'}
      </span>
    </button>
  )
}
