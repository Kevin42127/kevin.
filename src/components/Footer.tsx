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
        className="absolute bottom-8 right-6 text-sm font-bold uppercase tracking-widest text-[#6b6371] hover:text-[var(--color-primary)] transition-colors duration-300"
        aria-label={t('footer.scrollToTop', '返回頂部')}
      >
        {t('footer.scrollToTop', '返回頂部')}
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
