'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

const MESSAGE_DELAY = 0.6
const MESSAGE_DURATION = 0.45
const messageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export default function WelcomeModal() {
  const { t } = useTranslationSafe()
  const [isVisible, setIsVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [mounted])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleTryAI = () => {
    setIsVisible(false)
    const aiButton = document.querySelector('[aria-label*="AI"]') as HTMLButtonElement
    if (aiButton) {
      aiButton.click()
    }
  }

  if (!mounted) return null

  if (!isVisible) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-[var(--color-surface)] rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.25)] max-w-lg w-full flex flex-col overflow-hidden pointer-events-auto animate-scale-in sm:max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[var(--color-divider)] bg-[var(--color-surface)] shrink-0">
            <span className="text-sm font-semibold text-[var(--color-text)]">
              {t('welcome.chatTitle', '歡迎')}
            </span>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--color-surface-variant)] transition-colors"
              aria-label={t('welcome.close', '稍後再說')}
            >
              <span className="material-symbols-outlined text-lg text-inherit">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            <div className="flex items-end justify-end gap-1.5 sm:gap-2">
              <div className="inline-block max-w-[70%] px-3 py-2.5 bg-[#E4E6EB] text-[#050505] rounded-2xl dark:bg-[#374151] dark:text-[#F9FAFB]" style={{ lineHeight: 1.35, fontSize: '15px' }}>
                <p className="text-sm sm:text-base leading-relaxed">{t('welcome.guestGreeting', '嗨！')}</p>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-full bg-[var(--ai-accent)] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-sm sm:text-base text-inherit">person</span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-full bg-[var(--ai-accent)] text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor"><path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"/></svg>
              </div>
              <div className="bg-[#0084FF] text-white rounded-2xl px-3 py-2.5 max-w-[70%]" style={{ lineHeight: 1.35, fontSize: '15px' }}>
                <p className="text-sm sm:text-base leading-relaxed">{t('welcome.description', '嗨！我是 Kevin 的 AI 助理，隨時準備為您解答關於 Kevin 的專業經歷、技能和作品的任何問題。')}</p>
              </div>
            </div>
            <div className="flex items-end justify-end gap-1.5 sm:gap-2">
              <div className="inline-block max-w-[70%] px-3 py-2.5 bg-[#E4E6EB] text-[#050505] rounded-2xl dark:bg-[#374151] dark:text-[#F9FAFB]" style={{ lineHeight: 1.35, fontSize: '15px' }}>
                <p className="text-sm sm:text-base leading-relaxed">{t('welcome.howToUse', '如何使用')}</p>
              </div>
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-full bg-[var(--ai-accent)] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-sm sm:text-base text-inherit">person</span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 sm:gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 rounded-full bg-[var(--ai-accent)] text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor"><path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"/></svg>
              </div>
              <div className="bg-[#0084FF] text-white rounded-2xl px-3 py-2.5 max-w-[70%]" style={{ lineHeight: 1.35, fontSize: '15px' }}>
                <p className="text-sm sm:text-base leading-relaxed">{t('welcome.cta', '點擊下方「體驗 AI 助理」按鈕即可開始與我對話。')}</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-[var(--color-divider)] bg-[var(--color-surface)] shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleTryAI}
              className="flex-1 px-6 py-3 rounded-full font-semibold text-base bg-[var(--ai-accent)] text-white hover:bg-[var(--ai-accent-dark)] transition-colors duration-300"
            >
              {t('welcome.tryAI', '體驗 AI 助理')}
            </button>
            <button
              onClick={handleClose}
              className="flex-1 px-6 py-3 rounded-full font-semibold text-base text-[var(--ai-accent)] bg-transparent border border-[var(--ai-divider)] hover:bg-[var(--ai-accent)] hover:text-white hover:border-[var(--ai-accent)] hover:opacity-100 transition-colors duration-300"
            >
              {t('welcome.close', '稍後再說')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

