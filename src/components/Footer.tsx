'use client'

import { ChevronUp } from 'lucide-react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Footer() {
  const { t } = useTranslationSafe()
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="bg-gray-950 text-white relative">
      <button
        onClick={scrollToTop}
        className="absolute bottom-8 right-6 btn-icon bg-white dark:bg-gray-700 text-kevin-blue dark:text-white z-10"
        aria-label="返回頂部"
      >
        <ChevronUp size={20} />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="pt-2 text-center">
          <p className="text-white font-medium">
            ©{' '}
            <span className="font-semibold text-white">
              {t('navigation.kevin', 'Kevin.')}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
