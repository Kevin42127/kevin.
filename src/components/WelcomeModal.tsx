'use client'

import { useState, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function WelcomeModal() {
  const { t } = useTranslationSafe()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, 1000)
  }, [])

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

  if (!isVisible) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] animate-fade-in"
        onClick={handleClose}
      />
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.25)] max-w-lg w-full p-8 pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1d2c] mb-4">
              {t('welcome.title', '歡迎來到我的網站！')}
            </h2>
            
            <p className="text-[#473f4d] text-base sm:text-lg leading-relaxed mb-6">
              {t('welcome.description', '嗨！我是 Kevin 的 AI 助理，隨時準備為您解答關於 Kevin 的專業經歷、技能和作品的任何問題。試試看吧！')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={handleTryAI}
                className="flex-1 btn-primary px-6 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t('welcome.tryAI', '體驗 AI 助理')}
              </button>
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 rounded-full font-semibold text-base text-[#6b6371] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)] transition-all duration-300"
              >
                {t('welcome.close', '稍後再說')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

