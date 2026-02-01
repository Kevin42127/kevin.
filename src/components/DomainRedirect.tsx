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

  const getCurrentPath = () => {
    if (typeof window === 'undefined') return ''
    return window.location.pathname + window.location.search
  }

  const handleRedirect = () => {
    const currentPath = getCurrentPath()
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
    <div className="fixed top-0 left-0 right-0 z-[110] bg-[#FF4533] text-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-center">
          <p className="text-sm sm:text-base text-center whitespace-nowrap">
            {bannerType === 'backup' ? (
              <>
                {t('domainRedirect.backupMessage', '檢測到您正在使用備用網域，建議')}{' '}
                <button
                  type="button"
                  onClick={handleRedirect}
                  className="text-white underline hover:opacity-80 transition-opacity duration-200 bg-transparent border-0 cursor-pointer p-0 font-inherit"
                >
                  {t('domainRedirect.backupLink', '前往正式網域')}
                </button>
              </>
            ) : (
              <>
                {t('domainRedirect.primaryMessage', '檢測到正式網域可能出現問題，建議')}{' '}
                <button
                  type="button"
                  onClick={handleRedirect}
                  className="text-white underline hover:opacity-80 transition-opacity duration-200 bg-transparent border-0 cursor-pointer p-0 font-inherit"
                >
                  {t('domainRedirect.primaryLink', '前往備用網域')}
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
