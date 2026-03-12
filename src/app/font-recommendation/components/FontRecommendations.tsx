'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useTranslationSafe } from '../../../hooks/useTranslationSafe'

interface FontRecommendation {
  id: string
  name: string
  category: string
  description: string
  reason: string
  googleUrl?: string
  weights?: number[]
  languages?: string[]
}

interface FontRecommendationsProps {
  analysisData?: {
    projectType: string
    style: string
    language: string
    targetAudience: string
  }
}

export default function FontRecommendations({ analysisData }: FontRecommendationsProps) {
  const { t } = useTranslationSafe()

  // Google Fonts 載入函數
  const loadGoogleFont = (fontUrl: string) => {
    if (typeof window === 'undefined') return
    
    // 檢查是否已經載入該字體
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`)
    if (existingLink) return
    
    const link = document.createElement('link')
    link.href = fontUrl
    link.rel = 'stylesheet'
    link.type = 'text/css'
    document.head.appendChild(link)
  }

  // 載入所有推薦字體
  useEffect(() => {
    const recommendations = getRecommendations(analysisData)
    recommendations.forEach(font => {
      if (font.googleUrl) {
        loadGoogleFont(font.googleUrl)
      }
    })
  }, [analysisData])

  const getRecommendations = (data?: FontRecommendationsProps['analysisData']): FontRecommendation[] => {
    // 如果沒有分析數據，返回空陣列
    if (!data || !data.projectType || !data.style || !data.language || !data.targetAudience) {
      return []
    }

    // 根據分析數據返回不同的推薦
    const baseRecommendations: FontRecommendation[] = [
      {
        id: 'inter',
        name: 'Inter',
        category: t('fontRecommendation.recommendations.categories.sansSerif', '無襯線字體'),
        description: t('fontRecommendation.recommendations.inter.description', '現代化的無襯線字體，專為數位螢幕設計'),
        reason: t('fontRecommendation.recommendations.inter.reason', '極佳的可讀性與現代感，適合各種數位產品'),
        googleUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        weights: [400, 500, 600, 700],
        languages: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese']
      },
      {
        id: 'noto-sans',
        name: 'Noto Sans TC',
        category: t('fontRecommendation.recommendations.categories.chinese', '中文字體'),
        description: t('fontRecommendation.recommendations.notoSans.description', 'Google 開發的開源中文字體，支援完整字集'),
        reason: t('fontRecommendation.recommendations.notoSans.reason', '完整的中文字元支援，與 Inter 搭配使用效果絕佳'),
        googleUrl: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap',
        weights: [400, 500, 700],
        languages: ['chinese-traditional', 'latin']
      },
      {
        id: 'jetbrains-mono',
        name: 'JetBrains Mono',
        category: t('fontRecommendation.recommendations.categories.mono', '等寬字體'),
        description: t('fontRecommendation.recommendations.jetbrains.description', '專為程式碼設計的等寬字體'),
        reason: t('fontRecommendation.recommendations.jetbrains.reason', '清晰的字元區分，適合程式碼與技術文件展示'),
        googleUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap',
        weights: [400, 500, 600],
        languages: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext']
      },
      {
        id: 'roboto',
        name: 'Roboto',
        category: t('fontRecommendation.recommendations.categories.sansSerif', '無襯線字體'),
        description: t('fontRecommendation.recommendations.roboto.description', 'Google 開發的現代化無襯線字體，廣泛用於 Android 系統'),
        reason: t('fontRecommendation.recommendations.roboto.reason', '友善的設計和優秀的可讀性，適合各種數位介面'),
        googleUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
        weights: [400, 500, 700],
        languages: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese']
      },
      {
        id: 'open-sans',
        name: 'Open Sans',
        category: t('fontRecommendation.recommendations.categories.sansSerif', '無襯線字體'),
        description: t('fontRecommendation.recommendations.openSans.description', '人機化設計的無襯線字體，專為網頁和行動裝置優化'),
        reason: t('fontRecommendation.recommendations.openSans.reason', '極佳的螢幕可讀性，適合長文本閱讀'),
        googleUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap',
        weights: [400, 600, 700],
        languages: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext', 'greek', 'greek-ext', 'vietnamese']
      },
      {
        id: 'source-han-sans',
        name: 'Source Han Sans',
        category: t('fontRecommendation.recommendations.categories.chinese', '中文字體'),
        description: t('fontRecommendation.recommendations.sourceHanSans.description', 'Adobe 開發的開源中文字體，現代化設計風格'),
        reason: t('fontRecommendation.recommendations.sourceHanSans.reason', '與西文字體搭配和諧，支援多種字重'),
        googleUrl: 'https://fonts.googleapis.com/css2?family=Source+Han+Sans+TC:wght@400;500;700&display=swap',
        weights: [400, 500, 700],
        languages: ['chinese-traditional', 'latin', 'latin-ext', 'cyrillic', 'cyrillic-ext']
      },
      {
        id: 'fira-code',
        name: 'Fira Code',
        category: t('fontRecommendation.recommendations.categories.mono', '等寬字體'),
        description: t('fontRecommendation.recommendations.firaCode.description', '專為程式設計師設計的等寬字體，包含程式碼連字功能'),
        reason: t('fontRecommendation.recommendations.firaCode.reason', '連字功能提升程式碼可讀性，適合開發者使用'),
        googleUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap',
        weights: [400, 500, 600],
        languages: ['latin', 'latin-ext']
      },
      {
        id: 'source-code-pro',
        name: 'Source Code Pro',
        category: t('fontRecommendation.recommendations.categories.mono', '等寬字體'),
        description: t('fontRecommendation.recommendations.sourceCodePro.description', 'Adobe 開發的等寬字體，專為程式碼顯示優化'),
        reason: t('fontRecommendation.recommendations.sourceCodePro.reason', '清晰的字元區分和舒適的閱讀體驗'),
        googleUrl: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap',
        weights: [400, 500, 600],
        languages: ['latin', 'latin-ext']
      },
      {
        id: 'lato',
        name: 'Lato',
        category: t('fontRecommendation.recommendations.categories.sansSerif', '無襯線字體'),
        description: t('fontRecommendation.recommendations.lato.description', '優雅而友好的無襯線字體，適合商務和專業場合'),
        reason: t('fontRecommendation.recommendations.lato.reason', '專業的視覺形象，適合企業和商務網站'),
        googleUrl: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap',
        weights: [400, 700, 900],
        languages: ['latin', 'latin-ext']
      }
    ]

    // 根據專案類型和風格調整推薦
    if (data.projectType === 'tech' || data.style === 'professional') {
      return [
        baseRecommendations[0], // Inter
        baseRecommendations[3], // Roboto
        baseRecommendations[4], // Open Sans
        baseRecommendations[6], // Source Han Sans
        baseRecommendations[7], // Fira Code
        baseRecommendations[8]  // Source Code Pro
      ]
    }

    if (data.style === 'playful' || data.style === 'bold') {
      return [
        baseRecommendations[0], // Inter
        baseRecommendations[9], // Lato
        baseRecommendations[6], // Source Han Sans
        baseRecommendations[7], // Fira Code
      ]
    }

    if (data.language === 'en' && !data.language.includes('zh')) {
      return [
        baseRecommendations[0], // Inter
        baseRecommendations[3], // Roboto
        baseRecommendations[4], // Open Sans
        baseRecommendations[7], // Fira Code
        baseRecommendations[8], // Source Code Pro
      ]
    }

    if (data.projectType === 'corporate' || data.style === 'classic') {
      return [
        baseRecommendations[3], // Roboto
        baseRecommendations[9], // Lato
        baseRecommendations[5], // Source Han Sans
      ]
    }

    if (data.style === 'minimal') {
      return [
        baseRecommendations[0], // Inter
        baseRecommendations[4], // Open Sans
        baseRecommendations[5], // Source Han Sans
      ]
    }

    // 預設情況：返回前6個最常用的字體
    return baseRecommendations.slice(0, 6)
  }

  const recommendations = getRecommendations(analysisData)

  return (
    <section id="recommendations" className="py-20 bg-[var(--color-page)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-[rgb(var(--foreground-rgb))]">
            {t('fontRecommendation.recommendations.title', 'AI 推薦字體')}
          </h2>
          <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
            {recommendations.length > 0 
              ? t('fontRecommendation.recommendations.subtitle', '基於您的需求分析，我們為您推薦以下字體組合')
              : t('fontRecommendation.recommendations.noAnalysis', '請先完成上方分析表單，獲取專屬字體推薦')
            }
          </p>
        </motion.div>

        {recommendations.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommendations.map((font, index) => (
                <motion.div
                  key={font.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-[var(--color-card)] rounded-xl p-6 shadow-lg border border-[var(--color-divider)]"
                >
                  <div className="mb-4">
                    <h3 
                      className="text-xl font-bold text-[rgb(var(--foreground-rgb))] mb-1"
                      style={{ fontFamily: font.name.includes(' ') ? `"${font.name}"` : font.name }}
                    >
                      {font.name}
                    </h3>
                    <span className="text-sm text-[var(--color-text-muted)]">
                      {font.category}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-[rgb(var(--foreground-rgb))] mb-1">
                        {t('fontRecommendation.recommendations.description', '描述')}
                      </h4>
                      <p 
                        className="text-sm text-[var(--color-text-muted)]"
                        style={{ fontFamily: font.name.includes(' ') ? `"${font.name}"` : font.name }}
                      >
                        {font.description}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-[rgb(var(--foreground-rgb))] mb-1">
                        {t('fontRecommendation.recommendations.reason', '推薦理由')}
                      </h4>
                      <p 
                        className="text-sm text-[var(--color-text-muted)]"
                        style={{ fontFamily: font.name.includes(' ') ? `"${font.name}"` : font.name }}
                      >
                        {font.reason}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <div className="bg-[var(--color-card)] rounded-xl p-12 border border-[var(--color-divider)] max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <span className="material-symbols-outlined text-6xl text-[var(--color-text-muted)]">
                  search
                </span>
              </div>
              <h3 className="text-xl font-bold text-[rgb(var(--foreground-rgb))] mb-4">
                {t('fontRecommendation.recommendations.emptyTitle', '等待分析結果')}
              </h3>
              <p className="text-[var(--color-text-muted)] mb-6">
                {t('fontRecommendation.recommendations.emptyDescription', '請先完成上方的需求分析表單，AI 將為您推薦最適合的字體組合')}
              </p>
              <button
                onClick={() => document.getElementById('font-analyzer')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">arrow_upward</span>
                  {t('fontRecommendation.recommendations.goToAnalysis', '前往分析')}
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
