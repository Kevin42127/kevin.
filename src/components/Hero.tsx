'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download, Linkedin, Mail } from 'lucide-react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Hero() {
  const { t, i18n } = useTranslationSafe()
  
  const currentLanguage = i18n?.language || 'zh'
  const cvFileName = currentLanguage === 'en' ? 'Kevin_CV_EN.pdf' : 'Kevin_CV_TC.pdf'
  const cvPath = `/${cvFileName}`
  
  const scrollToNext = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
          >
            <span className="text-kevin-blue dark:text-blue-400">{t('hero.title', 'Kevin.')}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4"
          >
{t('hero.subtitle', '設計師 & 開發者')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            dangerouslySetInnerHTML={{ __html: t('hero.description', '畢業於數位科技與媒體設計系，專注於創造以使用者為中心的數位體驗。<br />結合設計美感與技術實作能力，將設計概念轉化為互動式的網頁應用。') }}
          >
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10 sm:mb-12 px-4 sm:px-0"
          >
            <button
              onClick={() => {
                const element = document.querySelector('#contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="btn-primary min-h-[48px] w-full sm:w-auto sm:min-w-[160px] px-6 sm:px-8"
            >
              {t('hero.getInTouch', '聯繫我')}
            </button>
            
            <button
              onClick={() => {
                const element = document.querySelector('#portfolio')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="btn-secondary min-h-[48px] w-full sm:w-auto sm:min-w-[160px] px-6 sm:px-8"
            >
              {t('hero.viewWork', '查看作品')}
            </button>
            
            <a
              href={cvPath}
              download={cvFileName}
              className="btn-tertiary min-h-[48px] w-full sm:w-auto sm:min-w-[160px] px-6 sm:px-8"
            >
              <Download size={20} />
              {t('hero.downloadCV', '下載履歷')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center space-x-4 mb-4"
          >
            <a
              href="https://www.linkedin.com/in/%E6%A2%93%E6%95%AC-%E9%99%B3-5ba547230/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-icon-sm bg-gray-100 dark:bg-gray-800 hover:bg-kevin-blue dark:hover:bg-blue-500 text-gray-600 dark:text-gray-400 hover:text-white"
              aria-label={t('socialMedia.linkedin', 'LinkedIn')}
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:tyouxipindao@gmail.com"
              className="btn-icon-sm bg-gray-100 dark:bg-gray-800 hover:bg-kevin-blue dark:hover:bg-blue-500 text-gray-600 dark:text-gray-400 hover:text-white"
              aria-label={t('socialMedia.email', '電子郵件')}
            >
              <Mail size={20} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 px-4"
          >
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {currentLanguage === 'en' 
                ? '⬇️ Downloading: English CV | 繁體中文版請切換語言' 
                : '⬇️ 下載：繁體中文版履歷 | EN version: switch language'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={scrollToNext}
              className="btn-icon bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400"
            >
              <ArrowDown size={24} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
