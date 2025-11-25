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
    { code: 'zh', name: 'Taiwan', nativeName: '繁體中文' },
    { code: 'en', name: 'English', nativeName: 'English' }
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  if (!mounted) {
    return (
      <div className="relative">
        <button
          className="flex items-center justify-center gap-1 text-[#00d9ff] hover:text-[#66e5ff] transition-colors duration-300 px-2.5 py-2 md:px-2 md:py-2 rounded-lg border border-[#00d9ff]/50 bg-[#0f172a]/50 hover:border-[#00d9ff] hover:shadow-[0_0_10px_rgba(0,217,255,0.3)] min-h-[44px] md:min-h-0"
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
        className="flex items-center justify-center gap-1 text-[#00d9ff] hover:text-[#66e5ff] transition-all duration-300 px-2.5 py-2 md:px-2 md:py-2 rounded-lg border border-[#00d9ff]/50 bg-[#0f172a]/50 hover:border-[#00d9ff] hover:shadow-[0_0_10px_rgba(0,217,255,0.3)] min-h-[44px] md:min-h-0 active:scale-95"
        title="選擇語言 / Select Language"
        aria-label="選擇語言 / Select Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-5 h-5 md:w-[18px] md:h-[18px]" />
        <ChevronDown 
          className={`w-3.5 h-3.5 md:w-[14px] md:h-[14px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-full lg:bottom-auto lg:top-full right-0 mb-2 lg:mt-5 w-52 bg-[#0f172a] border border-[#00d9ff] rounded-lg shadow-[0_0_30px_rgba(0,217,255,0.5)] z-[100] animate-fade-in-down">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full text-left px-4 py-3.5 md:py-3 text-sm transition-all duration-300 first:rounded-t-lg last:rounded-b-lg active:scale-[0.98] ${
                language.code === i18n.language
                  ? 'bg-[#00d9ff]/20 text-[#00d9ff] border-l-2 border-[#00d9ff]'
                  : 'text-[#66e5ff]/80 hover:bg-[#00d9ff]/10 hover:text-[#00d9ff]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-xs text-[#66e5ff]/60 mt-0.5">{language.name}</div>
                </div>
                {language.code === i18n.language && (
                  <div className="w-2 h-2 bg-[#00d9ff] rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(0,217,255,0.8)]"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-[99]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
