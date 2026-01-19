'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const { t } = useTranslationSafe()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setIsOpen(false)
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  const languages = [
    { code: 'zh', name: 'Taiwan', nativeName: '繁體中文' },
    { code: 'en', name: 'English', nativeName: 'English' }
  ]

  const buttonClasses =
    'flex items-center justify-center gap-1 text-[#1f1d30] hover:text-[var(--color-primary)] transition-all duration-300 px-3 py-2 border border-[var(--color-divider)] bg-white min-h-[44px] uppercase tracking-wide text-xs rounded-[50px]'

  if (!mounted) {
    return (
      <div className="relative">
        <button className={`${buttonClasses} opacity-60`} disabled aria-label={t('navigation.selectLanguage', '選擇語言')}>
          <span className="material-symbols-outlined text-base">language</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
      </div>
    )
  }

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`${buttonClasses} active:scale-95`}
        aria-label={t('navigation.selectLanguage', '選擇語言')}
        aria-expanded={isOpen}
      >
        <span className="material-symbols-outlined text-base">language</span>
        <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div 
          className="absolute bottom-full lg:bottom-auto lg:top-full right-0 mb-2 lg:mt-5 w-52 bg-white border border-[var(--color-divider)] shadow-[0_20px_45px_rgba(15,15,40,0.08)] z-[110] rounded-2xl p-1.5 overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full text-left px-4 py-3 text-sm transition-all duration-300 active:scale-[0.98] rounded-xl mb-1 last:mb-0 ${
                language.code === i18n.language
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[#6b6371] hover:bg-[var(--color-surface-variant)] hover:text-[#1f1d30]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{language.nativeName}</div>
                  <div className={`text-xs mt-0.5 ${language.code === i18n.language ? 'text-white/80' : 'text-[#9b92a4]'}`}>{language.name}</div>
                </div>
                {language.code === i18n.language && (
                  <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor" className="text-white">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
