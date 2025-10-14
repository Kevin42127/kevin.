'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, ChevronDown } from 'lucide-react'

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
    { code: 'zh', name: '中文', nativeName: '繁體中文' },
    { code: 'en', name: 'English', nativeName: 'English' }
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="relative">
        <button
          className="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400 transition-colors duration-300 px-2.5 py-2 md:px-2 md:py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 min-h-[44px] md:min-h-0"
          disabled
          aria-label="選擇語言 / Select Language"
        >
          <Globe className="w-5 h-5 md:w-[18px] md:h-[18px]" />
          <ChevronDown className="w-3.5 h-3.5 md:w-[14px] md:h-[14px]" />
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1 text-gray-700 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400 transition-all duration-300 px-2.5 py-2 md:px-2 md:py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-kevin-blue dark:hover:border-blue-400 min-h-[44px] md:min-h-0 active:scale-95"
        title="選擇語言 / Select Language"
        aria-label="選擇語言 / Select Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-5 h-5 md:w-[18px] md:h-[18px]" />
        <ChevronDown 
          className={`w-3.5 h-3.5 md:w-[14px] md:h-[14px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 animate-fade-in-down">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full text-left px-4 py-3.5 md:py-3 text-sm transition-all duration-300 first:rounded-t-lg last:rounded-b-lg active:scale-[0.98] ${
                language.code === i18n.language
                  ? 'bg-kevin-blue/10 text-kevin-blue dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{language.name}</div>
                </div>
                {language.code === i18n.language && (
                  <div className="w-2 h-2 bg-kevin-blue dark:bg-blue-400 rounded-full flex-shrink-0"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
