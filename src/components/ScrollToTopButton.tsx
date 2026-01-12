'use client'

import { useState, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function ScrollToTopButton() {
  const { t } = useTranslationSafe()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 text-sm font-bold uppercase tracking-widest text-[#6b6371] hover:text-[var(--color-primary)] transition-colors duration-300"
      aria-label={t('footer.scrollToTop', '返回頂部')}
    >
      {t('footer.scrollToTop', '返回頂部')}
    </button>
  )
}
