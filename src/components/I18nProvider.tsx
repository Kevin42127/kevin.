'use client'

import { useEffect } from 'react'
import i18n from '../lib/i18n'

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const updateLangAttributes = (lng: string) => {
      const language = lng === 'en' ? 'en' : 'zh-TW'
      document.documentElement.setAttribute('data-lang', lng)
      document.documentElement.setAttribute('lang', language)
    }

    updateLangAttributes(i18n.language || 'zh')

    const handleLanguageChange = (lng: string) => {
      updateLangAttributes(lng)
    }

    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [])

  return <>{children}</>
}
