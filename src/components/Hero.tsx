'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download, Linkedin, Mail } from 'lucide-react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Hero() {
  const { t } = useTranslationSafe()
  
  const scrollToNext = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-kevin-blue/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-blue-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="text-kevin-blue dark:text-blue-400">{t('hero.title', 'Kevin.')}</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-4"
          >
{t('hero.subtitle', '設計師 & 開發者')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('hero.description', '畢業於數位科技與媒體設計系，專注於創造以使用者為中心的數位體驗。<br />結合設計美感與技術實作能力，將設計概念轉化為互動式的網頁應用。') }}
          >
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <button
              onClick={() => {
                const element = document.querySelector('#contact')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-kevin-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-kevin-blue-dark transition-colors duration-300 shadow-lg hover:shadow-xl"
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
              className="border-2 border-kevin-blue dark:border-blue-400 text-kevin-blue dark:text-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-kevin-blue dark:hover:bg-blue-500 hover:text-white dark:hover:text-white transition-all duration-300"
            >
{t('hero.viewWork', '查看作品')}
            </button>
            
            <a
              href="/Kevin_CV.pdf"
              download="Kevin_CV.pdf"
              className="flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300"
            >
              <Download size={18} />
{t('hero.downloadCV', '下載履歷')}
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex justify-center space-x-6 mb-16"
          >
            <a
              href="https://www.linkedin.com/in/%E6%A2%93%E6%95%AC-%E9%99%B3-5ba547230/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-kevin-blue dark:hover:text-blue-400 transition-colors duration-300"
              aria-label={t('socialMedia.linkedin', 'LinkedIn')}
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:tyouxipindao@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-kevin-blue dark:hover:text-blue-400 transition-colors duration-300"
              aria-label={t('socialMedia.email', '電子郵件')}
            >
              <Mail size={24} />
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={scrollToNext}
              className="text-gray-600 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400 transition-colors duration-300 p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            >
              <ArrowDown size={28} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
