'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, useRef } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function SidebarThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme()
  const { t } = useTranslationSafe()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const triggerThemeTransition = () => {
    const root = document.documentElement
    root.classList.add('theme-transition')
    window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 220)
  }

  const handleThemeSelect = (selectedTheme: 'light' | 'dark' | 'system') => {
    triggerThemeTransition()
    requestAnimationFrame(() => {
      setTheme(selectedTheme)
    })
    setIsOpen(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const getThemeIcon = () => {
    if (theme === 'system') {
      return systemTheme === 'dark' ? 'dark_mode' : 'light_mode'
    }
    return theme === 'dark' ? 'light_mode' : 'dark_mode'
  }

  const getThemeLabel = () => {
    if (theme === 'system') {
      return t('theme.system', '跟隨系統')
    }
    return theme === 'dark' ? t('theme.dark', '深色模式') : t('theme.light', '淺色模式')
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 text-[rgb(var(--foreground-rgb))] hover:text-[var(--color-primary)] transition-colors duration-200 flex items-center justify-center"
        aria-label={getThemeLabel()}
        title={getThemeLabel()}
      >
        <span className="material-symbols-outlined text-base">
          {getThemeIcon()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-[var(--color-surface)] border border-[var(--color-divider)] shadow-[0_20px_45px_rgba(15,15,40,0.12)] rounded-xl z-[100] min-w-[140px] overflow-hidden">
          <div className="py-1">
            <button
              onClick={() => handleThemeSelect('light')}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-surface-variant)] transition-colors duration-200 flex items-center gap-2 ${
                theme === 'light' ? 'bg-[var(--color-surface-variant)] text-[var(--color-primary)]' : 'text-[rgb(var(--foreground-rgb))]'
              }`}
            >
              <span className="material-symbols-outlined text-base">light_mode</span>
              <span>{t('theme.light', '淺色模式')}</span>
            </button>
            <button
              onClick={() => handleThemeSelect('dark')}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-surface-variant)] transition-colors duration-200 flex items-center gap-2 ${
                theme === 'dark' ? 'bg-[var(--color-surface-variant)] text-[var(--color-primary)]' : 'text-[rgb(var(--foreground-rgb))]'
              }`}
            >
              <span className="material-symbols-outlined text-base">dark_mode</span>
              <span>{t('theme.dark', '深色模式')}</span>
            </button>
            <button
              onClick={() => handleThemeSelect('system')}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-surface-variant)] transition-colors duration-200 flex items-center gap-2 ${
                theme === 'system' ? 'bg-[var(--color-surface-variant)] text-[var(--color-primary)]' : 'text-[rgb(var(--foreground-rgb))]'
              }`}
            >
              <span className="material-symbols-outlined text-base">computer</span>
              <span>{t('theme.system', '跟隨系統')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
