'use client'

import { useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'
import { clientConfig } from '../lib/config'

export default function Footer() {
  const { t } = useTranslationSafe()

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
    <footer className="bg-[var(--color-page)] text-[rgb(var(--foreground-rgb))] relative border-t border-[var(--color-divider)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:max-w-none md:px-0 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 md:px-8 md:py-8">
          <div className="text-center md:text-left">
            <p className="font-semibold tracking-wide text-[rgb(var(--foreground-rgb))]">
              ©{' '}
              {t('navigation.kevin', 'Kevin.')}
              {' '}
              <span className="text-xs">
                {t('footer.rightsReserved', 'All Rights Reserved')}
              </span>
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => window.open(clientConfig.site.primaryDomain, '_blank', 'noopener,noreferrer')}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-300 bg-transparent border-0 cursor-pointer p-0 font-inherit"
              >
                正式網域
              </button>
              <span className="text-xs text-[var(--color-text-muted)]">|</span>
              <button
                type="button"
                onClick={() => window.open(clientConfig.site.backupDomain, '_blank', 'noopener,noreferrer')}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-300 bg-transparent border-0 cursor-pointer p-0 font-inherit"
              >
                備用網域
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              title="DMCA.com Protection Status"
              className="dmca-badge opacity-90 hover:opacity-100 transition-opacity duration-300 bg-transparent border-0 cursor-pointer p-0"
              onClick={() => window.open('https://www.dmca.com/r/l1wqqed', '_blank', 'noopener,noreferrer')}
            >
              <img 
                src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=c23022d2-174a-45f3-a198-188a70313323"
                alt="DMCA.com Protection Status"
                className="h-12 w-auto"
              />
            </button>
            <p className="text-xs text-[var(--color-text-muted)] text-center">
              {t('footer.dmcaProtected', '本網站受 DMCA 保護')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
