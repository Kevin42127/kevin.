'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslationSafe } from '../../../hooks/useTranslationSafe'

interface AnalysisForm {
  projectType: string
  style: string
  language: string
  targetAudience: string
}

interface FontAnalyzerProps {
  onAnalysisComplete?: (data: AnalysisForm) => void
}

interface DropdownOption {
  value: string
  label: string
}

interface TagSelectorProps {
  value: string
  onChange: (value: string) => void
  options: DropdownOption[]
  label: string
}

const TagSelector: React.FC<TagSelectorProps> = ({ value, onChange, options, label }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[rgb(var(--foreground-rgb))] mb-3">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 text-sm font-medium ${
              value === option.value 
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                : 'bg-[var(--color-page)] text-[rgb(var(--foreground-rgb))] border-[var(--color-divider)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function FontAnalyzer({ onAnalysisComplete }: FontAnalyzerProps) {
  const { t } = useTranslationSafe()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [formData, setFormData] = useState<AnalysisForm>({
    projectType: '',
    style: '',
    language: '',
    targetAudience: ''
  })

  const projectTypes: DropdownOption[] = [
    { value: 'portfolio', label: t('fontRecommendation.analyzer.projectTypes.portfolio', '個人作品集') },
    { value: 'blog', label: t('fontRecommendation.analyzer.projectTypes.blog', '部落格') },
    { value: 'ecommerce', label: t('fontRecommendation.analyzer.projectTypes.ecommerce', '電商網站') },
    { value: 'corporate', label: t('fontRecommendation.analyzer.projectTypes.corporate', '企業官網') },
    { value: 'education', label: t('fontRecommendation.analyzer.projectTypes.education', '教育平台') },
    { value: 'tech', label: t('fontRecommendation.analyzer.projectTypes.tech', '文件') }
  ]

  const styles: DropdownOption[] = [
    { value: 'modern', label: t('fontRecommendation.analyzer.styles.modern', '現代簡約') },
    { value: 'classic', label: t('fontRecommendation.analyzer.styles.classic', '經典優雅') },
    { value: 'playful', label: t('fontRecommendation.analyzer.styles.playful', '活潑創意') },
    { value: 'professional', label: t('fontRecommendation.analyzer.styles.professional', '專業商務') },
    { value: 'minimal', label: t('fontRecommendation.analyzer.styles.minimal', '極簡主義') },
    { value: 'bold', label: t('fontRecommendation.analyzer.styles.bold', '大膽前衛') }
  ]

  const languages: DropdownOption[] = [
    { value: 'zh', label: t('fontRecommendation.analyzer.languages.zh', '中文為主') },
    { value: 'en', label: t('fontRecommendation.analyzer.languages.en', '英文為主') },
    { value: 'mixed', label: t('fontRecommendation.analyzer.languages.mixed', '中英混合') },
    { value: 'international', label: t('fontRecommendation.analyzer.languages.international', '國際化') }
  ]

  const audiences: DropdownOption[] = [
    { value: 'general', label: t('fontRecommendation.analyzer.audiences.general', '一般大眾') },
    { value: 'professional', label: t('fontRecommendation.analyzer.audiences.professional', '專業人士') },
    { value: 'young', label: t('fontRecommendation.analyzer.audiences.young', '年輕族群') },
    { value: 'academic', label: t('fontRecommendation.analyzer.audiences.academic', '學術界') }
  ]

  const handleInputChange = (field: keyof AnalysisForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    // 模擬 AI 分析過程
    setTimeout(() => {
      setIsAnalyzing(false)
      // 傳遞分析數據給父組件
      if (onAnalysisComplete) {
        onAnalysisComplete(formData)
      }
      // 滾動到推薦結果
      document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' })
    }, 2000)
  }

  return (
    <section id="font-analyzer" className="min-h-screen py-20 bg-[var(--color-page)] relative">
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

      {/* Beta 標籤 - 右上角 */}
      <div className="absolute top-8 right-8 z-20">
        <span className="px-3 py-1 text-sm font-semibold text-[var(--color-primary)] border border-[var(--color-primary)] rounded-full">
          Beta
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[rgb(var(--foreground-rgb))]">
            {t('fontRecommendation.hero.title', 'AI 字體推薦系統')}
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {t('fontRecommendation.analyzer.subtitle', '告訴我們您的專案需求，AI 將為您推薦最適合的字體組合')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-[var(--color-card)] rounded-2xl p-8 shadow-lg border border-[var(--color-divider)]"
        >
          <div className="space-y-6">
            <TagSelector
              value={formData.projectType}
              onChange={(value) => handleInputChange('projectType', value)}
              options={projectTypes}
              label={t('fontRecommendation.analyzer.labels.projectType', '專案類型')}
            />

            <TagSelector
              value={formData.style}
              onChange={(value) => handleInputChange('style', value)}
              options={styles}
              label={t('fontRecommendation.analyzer.labels.style', '設計風格')}
            />

            <TagSelector
              value={formData.language}
              onChange={(value) => handleInputChange('language', value)}
              options={languages}
              label={t('fontRecommendation.analyzer.labels.language', '主要語言')}
            />

            <TagSelector
              value={formData.targetAudience}
              onChange={(value) => handleInputChange('targetAudience', value)}
              options={audiences}
              label={t('fontRecommendation.analyzer.labels.targetAudience', '目標受眾')}
            />
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !formData.projectType || !formData.style || !formData.language || !formData.targetAudience}
              className="btn-primary min-h-[54px] px-8 py-4 min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{t('fontRecommendation.analyzer.analyzing', '分析中...')}</span>
                </div>
              ) : (
                <span>{t('fontRecommendation.analyzer.startAnalysis', '開始分析')}</span>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
