'use client'

import { motion } from 'framer-motion'
// Use Google Material Symbols via <span className="material-symbols-outlined">...</span>
import { useTranslationSafe } from '../hooks/useTranslationSafe'
import { smoothScrollToElement } from '../lib/smoothScrollUtils'

export default function Hero() {
  const { t, i18n } = useTranslationSafe()
  
  const currentLanguage = i18n?.language || 'zh'
  const cvFileName = currentLanguage === 'en' ? 'Kevin_CV_EN.pdf' : 'Kevin_CV_TC.pdf'
  const cvPath = `/${cvFileName}`
  
  const scrollToNext = () => {
    smoothScrollToElement('#about', 0)
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16 sm:pt-24 sm:pb-20 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center w-full">
        <motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
          >
            <span className="text-[#00d9ff] drop-shadow-[0_0_20px_rgba(0,217,255,0.8)]">{t('hero.title', 'Kevin.')}</span>
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#66e5ff] mb-3 sm:mb-4"
          >
{t('hero.subtitle', '設計師 & 開發者')}
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-[#00d9ff]/80 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            dangerouslySetInnerHTML={{ __html: t('hero.description', '畢業於數位科技與媒體設計系，專注於創造以使用者為中心的數位體驗。<br />結合設計美感與技術實作能力，將設計概念轉化為互動式的網頁應用。') }}
          >
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10 sm:mb-12 px-4 sm:px-0"
          >
            <button
              onClick={() => smoothScrollToElement('#contact', 0)}
              className="btn-primary min-h-[48px] w-full sm:w-auto sm:min-w-[160px] px-6 sm:px-8"
            >
              {t('hero.getInTouch', '聯繫我')}
            </button>
            
            <button
              onClick={() => smoothScrollToElement('#portfolio', 0)}
              className="btn-secondary min-h-[48px] w-full sm:w-auto sm:min-w-[160px] px-6 sm:px-8"
            >
              {t('hero.viewWork', '查看作品')}
            </button>
            
            <a
              href={cvPath}
              download={cvFileName}
              className="btn-tertiary min-h-[48px] w-full sm:w-auto sm:min-w-[160px] px-6 sm:px-8"
            >
              <span className="material-symbols-outlined text-base">download</span>
              {t('hero.downloadCV', '下載履歷')}
            </a>
          </motion.div>

          

          <div
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <p className="text-xs sm:text-sm text-[#00d9ff]/60 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-base">download</span>
              {currentLanguage === 'en' 
                ? 'Downloading: English CV | 繁體中文版請切換語言' 
                : '下載：繁體中文版履歷 | EN version: switch language'}
            </p>
          </div>

          
        </motion.div>
      </div>
    </section>
  )
}
