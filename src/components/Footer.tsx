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
    <footer className="bg-[var(--color-page)] text-[#1f1d30] relative border-t border-[var(--color-divider)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:max-w-none md:px-0 md:py-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 md:px-8 md:py-8">
          <div className="text-center md:text-left">
            <p className="font-semibold tracking-wide text-[#1f1d30]">
              ©{' '}
              {t('navigation.kevin', 'Kevin.')}
              {' '}
              <span className="text-xs">
                {t('footer.rightsReserved', 'All Rights Reserved')}
              </span>
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <a
                href={clientConfig.site.primaryDomain}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#6b6371] hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                正式網域
              </a>
              <span className="text-xs text-[#6b6371]">|</span>
              <a
                href={clientConfig.site.backupDomain}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#6b6371] hover:text-[var(--color-primary)] transition-colors duration-300"
              >
                備用網域
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <a 
              href="https://www.dmca.com/r/l1wqqed" 
              title="DMCA.com Protection Status" 
              className="dmca-badge opacity-90 hover:opacity-100 transition-opacity duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=c23022d2-174a-45f3-a198-188a70313323"
                alt="DMCA.com Protection Status"
                className="h-12 w-auto"
              />
            </a>
            <p className="text-xs text-[#6b6371] text-center">
              {t('footer.dmcaProtected', '本網站受 DMCA 保護')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
