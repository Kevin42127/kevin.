'use client'

import { useEffect, useState } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

const PRIMARY_DOMAIN = 'https://www.kevinoffical.com'
const BACKUP_DOMAIN = 'https://kevinoffical.vercel.app'

export default function DomainRedirect() {
  const { t } = useTranslationSafe()
  const [showBanner, setShowBanner] = useState(false)
  const [bannerType, setBannerType] = useState<'backup' | 'primary'>('backup')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    const currentHost = window.location.hostname
    const isBackupDomain = currentHost.includes('vercel.app')

    const dismissed = localStorage.getItem('domain-redirect-dismissed')
    if (dismissed) {
      const dismissedTime = parseInt(dismissed, 10)
      const oneDay = 24 * 60 * 60 * 1000
      if (Date.now() - dismissedTime < oneDay) {
        return
      }
    }

    if (isBackupDomain) {
      setBannerType('backup')
      setShowBanner(true)
      return
    }

    const checkPrimaryDomainHealth = async () => {
      let errorCount = 0
      const maxErrors = 3

      const handleError = () => {
        errorCount++
        if (errorCount >= maxErrors) {
          setBannerType('primary')
          setShowBanner(true)
          window.removeEventListener('error', handleError)
          window.removeEventListener('unhandledrejection', handleError)
        }
      }

      window.addEventListener('error', handleError)
      window.addEventListener('unhandledrejection', handleError)

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)

        const response = await fetch('/favicon.ico', {
          method: 'HEAD',
          signal: controller.signal,
          cache: 'no-store'
        })

        clearTimeout(timeoutId)

        if (!response.ok && response.status >= 500) {
          setBannerType('primary')
          setShowBanner(true)
        }
      } catch (error) {
        handleError()
      }

      setTimeout(() => {
        window.removeEventListener('error', handleError)
        window.removeEventListener('unhandledrejection', handleError)
      }, 10000)
    }

    const timer = setTimeout(() => {
      checkPrimaryDomainHealth()
    }, 2000)

    return () => clearTimeout(timer)
  }, [mounted])

  if (!mounted) return null

  const handleRedirect = () => {
    const currentPath = window.location.pathname + window.location.search
    if (bannerType === 'backup') {
      window.location.href = `${PRIMARY_DOMAIN}${currentPath}`
    } else {
      window.location.href = `${BACKUP_DOMAIN}${currentPath}`
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem('domain-redirect-dismissed', Date.now().toString())
  }

  if (!showBanner) return null

  return (
    <div className="fixed top-[64px] left-0 right-0 z-[100] bg-[var(--color-primary)] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:max-w-none md:px-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 md:px-8">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <span className="material-symbols-outlined text-lg sm:text-xl flex-shrink-0">
              {bannerType === 'backup' ? 'info' : 'warning'}
            </span>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed break-words">
              {bannerType === 'backup'
                ? t('domainRedirect.backupMessage', '檢測到您正在使用備用網域，建議使用正式網域以獲得最佳體驗')
                : t('domainRedirect.primaryMessage', '檢測到正式網域可能出現問題，建議使用備用網域')}
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start">
            <button
              onClick={handleRedirect}
              className="text-white font-semibold hover:opacity-80 underline transition-opacity duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              {bannerType === 'backup' 
                ? t('domainRedirect.goToPrimary', '前往正式網域')
                : t('domainRedirect.goToBackup', '前往備用網域')}
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 sm:p-2 hover:bg-white/20 rounded-md transition-colors duration-200 flex-shrink-0"
              aria-label={t('domainRedirect.close', '關閉')}
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
