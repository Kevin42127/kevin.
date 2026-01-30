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
          className="bg-white rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.25)] max-w-lg w-full flex flex-col overflow-hidden pointer-events-auto animate-scale-in sm:max-h-[85vh]"
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
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            <motion.div
              className="flex items-start justify-end gap-2 sm:gap-3"
              initial="hidden"
              animate="visible"
              variants={messageVariants}
              transition={{ delay: 0, duration: MESSAGE_DURATION, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex-1 min-w-0 max-w-[85%] flex justify-end">
                <div 
                  className="bg-[var(--color-primary)] text-white rounded-2xl rounded-br-md px-4 py-3 inline-block"
                  style={{ lineHeight: 1.35, fontSize: '15px' }}
                >
                  <p className="text-sm sm:text-base leading-relaxed">
                    {t('welcome.guestGreeting', '嗨！')}
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center bg-[var(--color-primary-dark)] text-white rounded-full shadow-md">
                <span className="material-symbols-outlined text-lg sm:text-xl">person</span>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-2 sm:gap-3"
              initial="hidden"
              animate="visible"
              variants={messageVariants}
              transition={{ delay: MESSAGE_DELAY * 1, duration: MESSAGE_DURATION, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full shadow-md">
                <span className="material-symbols-outlined text-lg sm:text-xl">smart_toy</span>
              </div>
              <div 
                className="bg-[var(--color-surface-variant)] text-[var(--color-text)] border border-[var(--color-divider)] rounded-2xl rounded-bl-md px-4 py-3 shadow-[0_1px_0_rgba(0,0,0,0.04)_inset] flex-1 min-w-0 max-w-[70%]"
                style={{ lineHeight: 1.35, fontSize: '15px' }}
              >
                <p className="text-sm sm:text-base leading-relaxed">
                  {t('welcome.description', '嗨！我是 Kevin 的 AI 助理，隨時準備為您解答關於 Kevin 的專業經歷、技能和作品的任何問題。')}
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start justify-end gap-2 sm:gap-3"
              initial="hidden"
              animate="visible"
              variants={messageVariants}
              transition={{ delay: MESSAGE_DELAY * 2, duration: MESSAGE_DURATION, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex-1 min-w-0 max-w-[85%] flex justify-end">
                <div 
                  className="bg-[var(--color-primary)] text-white rounded-2xl rounded-br-md px-4 py-3 inline-block"
                  style={{ lineHeight: 1.35, fontSize: '15px' }}
                >
                  <p className="text-sm sm:text-base leading-relaxed">
                    {t('welcome.howToUse', '如何使用')}
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center bg-[var(--color-primary-dark)] text-white rounded-full shadow-md">
                <span className="material-symbols-outlined text-lg sm:text-xl">person</span>
              </div>
            </motion.div>
            <motion.div
              className="flex items-start gap-2 sm:gap-3"
              initial="hidden"
              animate="visible"
              variants={messageVariants}
              transition={{ delay: MESSAGE_DELAY * 3, duration: MESSAGE_DURATION, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full shadow-md">
                <span className="material-symbols-outlined text-lg sm:text-xl">smart_toy</span>
              </div>
              <div 
                className="bg-[var(--color-surface-variant)] text-[var(--color-text)] border border-[var(--color-divider)] rounded-2xl rounded-bl-md px-4 py-3 shadow-[0_1px_0_rgba(0,0,0,0.04)_inset] flex-1 min-w-0 max-w-[70%]"
                style={{ lineHeight: 1.35, fontSize: '15px' }}
              >
                <p className="text-sm sm:text-base leading-relaxed">
                  {t('welcome.cta', '點擊下方「體驗 AI 助理」按鈕即可開始與我對話。')}
                </p>
              </div>
            </motion.div>
          </div>
          <div className="p-4 border-t border-[var(--color-divider)] bg-white shrink-0 flex flex-col sm:flex-row gap-3">
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
    </>
  )
}

