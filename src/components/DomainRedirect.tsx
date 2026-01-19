'use client'

import { useEffect, useState } from 'react'
import { clientConfig } from '../lib/config'

const PRIMARY_DOMAIN = clientConfig.site.primaryDomain

export default function DomainRedirect() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const currentHost = window.location.hostname
    const isBackupDomain = currentHost.includes('vercel.app')

    if (!isBackupDomain) {
      return
    }

    const dismissed = localStorage.getItem('domain-redirect-dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10)
      const oneDay = 24 * 60 * 60 * 1000
      if (Date.now() - dismissedTime < oneDay) {
        return
      }
    }

    setShowBanner(true)
  }, [])

  const handleRedirect = () => {
    const currentPath = window.location.pathname + window.location.search
    window.location.href = `${PRIMARY_DOMAIN}${currentPath}`
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem('domain-redirect-dismissed', Date.now().toString())
  }

  if (!showBanner) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-primary)] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <span className="material-symbols-outlined text-xl">info</span>
            <p className="text-sm sm:text-base">
              檢測到您正在使用備用網域，建議使用正式網域以獲得最佳體驗
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRedirect}
              className="px-4 py-2 bg-white text-[var(--color-primary)] rounded-md font-semibold hover:bg-opacity-90 transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
            >
              前往正式網域
            </button>
            <button
              onClick={handleDismiss}
              className="p-2 hover:bg-white/20 rounded-md transition-colors duration-200"
              aria-label="關閉"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
