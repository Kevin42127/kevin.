'use client'

import { smoothScrollToTop } from '../lib/smoothScrollUtils'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Footer() {
  const { t } = useTranslationSafe()
  const scrollToTop = () => {
    smoothScrollToTop()
  }

  return (
    <footer className="bg-[var(--color-page)] text-[#1f1d30] relative border-t border-[var(--color-divider)]">
      <button
        onClick={scrollToTop}
        className="absolute bottom-8 right-6 btn-icon"
        aria-label="返回頂部"
      >
        <span className="material-symbols-outlined text-base">arrow_upward</span>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="pt-2 text-center">
          <p className="font-semibold tracking-wide text-[#1f1d30]">
            ©{' '}
            <span className="text-[#ff4d2d] font-extrabold">
              {t('navigation.kevin', 'Kevin.')}
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
