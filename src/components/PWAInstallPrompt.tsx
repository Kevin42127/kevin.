'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export default function PWAInstallPrompt() {
  const { t } = useTranslationSafe()
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // 檢查是否已安裝
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isInWebAppiOS = (window.navigator as any).standalone === true
      setIsInstalled(isStandalone || isInWebAppiOS)
    }

    // 監聽 beforeinstallprompt 事件
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // 延遲顯示安裝提示
      setTimeout(() => {
        if (!isInstalled) {
          setShowInstallPrompt(true)
        }
      }, 3000)
    }

    // 監聽 appinstalled 事件
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setDeferredPrompt(null)
    }

    checkInstalled()
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [isInstalled])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        setIsInstalled(true)
      }
      
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    } catch (error) {
      console.error('安裝失敗:', error)
    }
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    // 24小時後再次顯示
    localStorage.setItem('pwa-install-dismissed', Date.now().toString())
  }

  // 檢查是否應該顯示提示
  useEffect(() => {
    const dismissedTime = localStorage.getItem('pwa-install-dismissed')
    if (dismissedTime) {
      const timeDiff = Date.now() - parseInt(dismissedTime)
      const hoursDiff = timeDiff / (1000 * 60 * 60)
      
      if (hoursDiff < 24) {
        setShowInstallPrompt(false)
      }
    }
  }, [])

  if (isInstalled || !showInstallPrompt || !deferredPrompt) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 bg-[var(--color-surface)] border border-[var(--ai-divider)] rounded-2xl p-4 shadow-lg"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-[var(--ai-accent)] rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">
                download
              </span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[var(--color-text)] text-sm mb-1">
              {t('pwa.installTitle', '安裝應用程式')}
            </h3>
            <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed mb-3">
              {t('pwa.installDescription', '將 Kevin 的個人網站安裝到您的裝置，享受更快速的體驗！')}
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-[var(--ai-accent)] text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-[var(--ai-accent-dark)] transition-colors"
              >
                {t('pwa.install', '安裝')}
              </button>
              <button
                onClick={handleDismiss}
                className="flex-1 bg-[var(--color-secondary)] text-[var(--color-text)] px-3 py-2 rounded-lg text-xs font-medium hover:bg-[var(--color-secondary-hover)] transition-colors"
              >
                {t('pwa.notNow', '暫不安裝')}
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 rounded-full hover:bg-[var(--color-secondary)] transition-colors"
          >
            <span className="material-symbols-outlined text-[var(--color-text-secondary)] text-sm">
              close
            </span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
