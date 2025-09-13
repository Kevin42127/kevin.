'use client'

import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh'
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 text-gray-700 hover:text-kevin-blue transition-colors duration-200"
      title={i18n.language === 'zh' ? 'Switch to English' : '切換到中文'}
    >
      <Globe size={20} />
      <span className="text-sm font-medium">
        {i18n.language === 'zh' ? 'EN' : '中文'}
      </span>
    </button>
  )
}
