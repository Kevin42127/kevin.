'use client'

import { motion } from 'framer-motion'
import { useTranslationSafe } from '../../../hooks/useTranslationSafe'
import SplitText from '../../../components/SplitText'

export default function FontRecommendationHero() {
  const { t } = useTranslationSafe()

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-28 pb-20 bg-[var(--color-page)]">
      {/* 返回首頁按鈕 - 左上角 */}
      <div className="absolute top-8 left-8 z-20">
        <button
          onClick={() => window.location.href = '/'}
          className="p-2 rounded-lg transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
          </svg>
        </button>
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-50 overflow-hidden">
        <div className="w-full h-full mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,77,45,0.08), transparent 45%), radial-gradient(circle at 80% 10%, rgba(29,71,255,0.08), transparent 40%), radial-gradient(circle at 50% 80%, rgba(0,161,154,0.08), transparent 45%)' }} />
      </div>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 text-center w-full relative z-10">
        <motion.div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <SplitText
              text={t('fontRecommendation.hero.title', 'AI 字體推薦系統')}
              tag="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[rgb(var(--foreground-rgb))] leading-tight tracking-tight"
              textAlign="center"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              duration={0.6}
              delay={80}
            />
            <span className="px-3 py-1 text-sm font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] rounded-full">
              Beta
            </span>
          </div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-[rgb(var(--foreground-rgb))] mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            dangerouslySetInnerHTML={{ __html: t('fontRecommendation.hero.description', '運用人工智慧技術，為您的專案推薦最適合的字體組合。<br />分析網站風格、內容類型與使用者體驗，打造完美的視覺呈現。') }}
          >
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10 sm:mb-12 px-4 sm:px-0"
          >
            <button
              onClick={() => document.getElementById('font-analyzer')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary min-h-[54px] w-full sm:w-auto sm:min-w-[180px] px-6 sm:px-8 uppercase tracking-wider"
            >
              {t('fontRecommendation.hero.startAnalysis', '開始分析')}
            </button>
          </motion.div>

          <div className="text-center mb-12 sm:mb-16 px-4">
            <p className="text-xs text-[var(--color-text-muted)] flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-xs">speed</span>
              {t('fontRecommendation.hero.instantResults', '即時分析 · 智能推薦 · 一鍵套用')}
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
          onClick={() => document.getElementById('font-analyzer')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center justify-center gap-2 text-[var(--color-text-muted)] transition-colors duration-300 cursor-pointer"
          aria-label={t('fontRecommendation.hero.scrollDown', '向下滾動')}
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-inherit animate-bounce">
              keyboard_arrow_down
            </span>
          </div>
        </button>
      </motion.div>
    </section>
  )
}
