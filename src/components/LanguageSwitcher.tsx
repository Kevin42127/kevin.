'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setIsOpen(false)
  }

  const languages = [
    { code: 'zh', name: 'Taiwan', nativeName: '繁體中文' },
    { code: 'en', name: 'English', nativeName: 'English' }
  ]

  const buttonClasses =
    'flex items-center justify-center gap-1 text-[#1f1d30] hover:text-[var(--color-primary)] transition-all duration-300 px-3 py-2 border border-[var(--color-divider)] bg-white min-h-[44px] uppercase tracking-wide text-xs rounded-lg'

  if (!mounted) {
    return (
      <div className="relative">
        <button className={`${buttonClasses} opacity-60`} disabled aria-label="選擇語言 / Select Language">
          <span className="material-symbols-outlined text-base">language</span>
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonClasses} active:scale-95`}
        title="選擇語言 / Select Language"
        aria-label="選擇語言 / Select Language"
        aria-expanded={isOpen}
      >
        <span className="material-symbols-outlined text-base">language</span>
        <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full lg:bottom-auto lg:top-full right-0 mb-2 lg:mt-5 w-52 bg-white border border-[var(--color-divider)] shadow-[0_20px_45px_rgba(15,15,40,0.08)] z-[100] rounded-xl">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full text-left px-4 py-3 text-sm transition-all duration-300 active:scale-[0.98] border-b border-[var(--color-divider)] last:border-b-0 ${
                language.code === i18n.language
                  ? 'bg-[var(--color-surface-variant)] text-[#1f1d30] border-l-2 border-[var(--color-primary)]'
                  : 'text-[#6b6371] hover:bg-[var(--color-surface-variant)] hover:text-[#1f1d30]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-xs text-[#9b92a4] mt-0.5">{language.name}</div>
                </div>
                {language.code === i18n.language && (
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-base">check_circle</span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-[99]" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
