'use client'

import { useEffect } from 'react'
import { smoothScrollToTop } from '../lib/smoothScrollUtils'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Footer() {
  const { t } = useTranslationSafe()
  const scrollToTop = () => {
    smoothScrollToTop()
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://images.dmca.com/Badges/DMCABadgeHelper.min.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

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
        <div className="flex flex-col items-center gap-4 pt-2">
          <a 
            href="https://www.dmca.com/Protection/Status.aspx?ID=c23022d2-174a-45f3-a198-188a70313323" 
            title="DMCA.com Protection Status" 
            className="dmca-badge opacity-70 hover:opacity-100 transition-opacity duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img 
              src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=c23022d2-174a-45f3-a198-188a70313323"
              alt="DMCA.com Protection Status"
              className="h-10 w-auto"
            />
          </a>

          <div className="text-center">
            <p className="font-semibold tracking-wide text-[#1f1d30]">
              ©{' '}
              <span className="text-[#ff4d2d] font-extrabold">
                {t('navigation.kevin', 'Kevin.')}
              </span>
            </p>
            <p className="text-xs text-[#6b6371] mt-1">
              {t('footer.rightsReserved', 'All Rights Reserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
