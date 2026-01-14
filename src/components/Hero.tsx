'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslationSafe } from '../hooks/useTranslationSafe'
import { smoothScrollToElement } from '../lib/smoothScrollUtils'
import SplitText from './SplitText'
export default function Hero() {
  const { t, i18n } = useTranslationSafe()
  const [isDownloading, setIsDownloading] = useState(false)
  
  const currentLanguage = i18n?.language || 'zh'
  const cvFileName = '陳梓敬_履歷.pdf'
  const cvPath = `/${cvFileName}`

  
  const scrollToNext = () => {
    smoothScrollToElement('#about', 0)
  }

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const link = document.createElement('a')
      link.href = cvPath
      link.download = cvFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      setTimeout(() => {
        setIsDownloading(false)
      }, 1000)
    } catch (error) {
      console.error('下載失敗:', error)
      setIsDownloading(false)
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-28 pb-20 bg-[var(--color-page)]">
      <div className="absolute inset-0 pointer-events-none opacity-50 overflow-hidden">
        <div className="w-full h-full mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,77,45,0.08), transparent 45%), radial-gradient(circle at 80% 10%, rgba(29,71,255,0.08), transparent 40%), radial-gradient(circle at 50% 80%, rgba(0,161,154,0.08), transparent 45%)' }} />
      </div>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center w-full relative z-10">
        <motion.div>
          <SplitText
            text={t('hero.title', 'Kevin.')}
            tag="h1"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-[#1b1d2c] leading-tight tracking-tight"
            textAlign="center"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            duration={0.6}
            delay={80}
          />

          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#3e3a4b] mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            dangerouslySetInnerHTML={{ __html: t('hero.description', '畢業於數位科技與媒體設計系，專注於創造以使用者為中心的數位體驗。<br />結合設計美感與技術實作能力，將設計概念轉化為互動式的網頁應用。') }}
          >
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10 sm:mb-12 px-4 sm:px-0"
          >
            <button
              onClick={() => smoothScrollToElement('#contact', 0)}
              className="btn-primary min-h-[54px] w-full sm:w-auto sm:min-w-[180px] px-6 sm:px-8 uppercase tracking-wider"
            >
              {t('hero.getInTouch', '聯繫我')}
            </button>
            
            <button
              onClick={() => smoothScrollToElement('#portfolio', 0)}
              className="btn-secondary min-h-[54px] w-full sm:w-auto sm:min-w-[180px] px-6 sm:px-8 uppercase tracking-wider"
            >
              {t('hero.viewWork', '查看作品')}
            </button>
            
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`btn-primary min-h-[54px] w-full sm:w-auto sm:min-w-[180px] px-6 sm:px-8 uppercase tracking-wider ${
                isDownloading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isDownloading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('hero.downloading', '下載中...')}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>{t('hero.downloadCV', '下載履歷')}</span>
                </div>
              )}
            </button>
          </motion.div>

          

          <div className="text-center mb-12 sm:mb-16 px-4">
            <p className="text-xs sm:text-sm text-[#6b6371] flex items-center justify-center gap-1 mb-2">
              <span className="material-symbols-outlined text-base">info</span>
              {t('hero.cvInfo', '下載：繁體中文版履歷｜English 版本請切換語言')}
            </p>
            <p className="text-xs text-[#6b6371] flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span>
              {t('hero.dmcaProtected', '本網站內容受 DMCA 保護 · 歡迎下載履歷')}
            </p>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center z-20 pointer-events-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center justify-center gap-2 text-[#6b6371] transition-colors duration-300 cursor-pointer"
          aria-label="向下滾動"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl animate-bounce">
              keyboard_arrow_down
            </span>
          </div>
        </button>
      </motion.div>
    </section>
  )
}
