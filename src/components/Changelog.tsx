'use client'

import { useState } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

interface ChangelogItem {
  version: string
  date: string
  type: 'major' | 'minor' | 'patch'
  changes: string[]
}

export default function Changelog() {
  const { t } = useTranslationSafe()
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null)

  const changelogData: ChangelogItem[] = [
    {
      version: '3.0.0',
      date: '2026-02-24',
      type: 'major',
      changes: [
        'AI 助理提示泡泡優化：移除關閉按鈕，添加5秒自動消失',
        '移除側邊欄導航項目逐個出現動畫',
        '更新職稱為 AI 工程師',
        '更新 GitHub 連結'
      ]
    },
    {
      version: '2.8.0',
      date: '2026-02-18',
      type: 'minor',
      changes: [
        '統一深色模式顏色系統：將橘色改為藍色系統',
        '提升文字可讀性',
        '更新翻譯系統：完成英文翻譯並修復語言檢測'
      ]
    },
    {
      version: '2.7.0',
      date: '2026-02-10',
      type: 'minor',
      changes: [
        '優化聯繫表單與導航體驗',
        '修正生產環境漸進式動畫閃爍問題',
        '移除 AI 職缺配對功能，恢復原始設計'
      ]
    },
    {
      version: '2.6.0',
      date: '2026-02-07',
      type: 'minor',
      changes: [
        '修復 AIAssistant 組件語法錯誤',
        '更新 PWA 配置：修改標題為 Kevin.',
        '移除安裝提示，使用完整圖標集合'
      ]
    },
    {
      version: '2.5.0',
      date: '2026-02-03',
      type: 'minor',
      changes: [
        '完成 AI 助理聯絡表單與郵件系統多語言支援',
        '在導覽列添加 GitHub 圖示連結',
        'AI 助理：鈴鐺圖示、訊息氣泡常見色'
      ]
    },
    {
      version: '2.4.0',
      date: '2026-01-30',
      type: 'minor',
      changes: [
        '新增歡迎視窗：對話框樣式、入場動畫、翻譯',
        '移除 title 訊息',
        '導覽列背景改為與頁腳統一使用 --color-page'
      ]
    },
    {
      version: '2.3.0',
      date: '2026-01-24',
      type: 'minor',
      changes: [
        '新增 ChatFlow 作品',
        '更新分類篩選功能',
        '優化 AI 助理和導覽列位置',
        '優化移動端導覽列：背景延伸到狀態列'
      ]
    },
    {
      version: '2.2.0',
      date: '2026-01-19',
      type: 'minor',
      changes: [
        '更新頁腳布局與功能',
        '添加域名重定向功能',
        '優化動畫效果',
        '移除提示橫幅組件'
      ]
    },
    {
      version: '2.1.0',
      date: '2026-01-18',
      type: 'minor',
      changes: [
        '新增 TaskMate 桌面應用作品',
        '更新 AI 助理資訊',
        '將分類篩選的 Web 應用改為網站'
      ]
    },
    {
      version: '2.0.0',
      date: '2026-01-11',
      type: 'major',
      changes: [
        '實作 Vercel Edge Functions 保護 AI API',
        '重構 AI API 路由使用官方 groq-sdk',
        '升級模型至 llama-3.3-70b',
        '更新郵件系統：統一現代卡片風格',
        '雙向發送功能與感謝信回覆',
        '優化聯繫表單與AI助理：低摩擦力設計'
      ]
    },
    {
      version: '1.9.0',
      date: '2026-01-07',
      type: 'minor',
      changes: [
        '為 AI 聊天介面添加完整響應式設計',
        '改用自動調整高度的 textarea',
        '優化訊息氣泡樣式',
        '修復域名檢查邏輯'
      ]
    },
    {
      version: '1.8.0',
      date: '2025-12-22',
      type: 'minor',
      changes: [
        '新增 Cloudflare Turnstile 驗證功能到聯繫表單',
        '修復 Contact 組件的 TypeScript 類型錯誤',
        '後續移除 Cloudflare Turnstile 驗證功能'
      ]
    },
    {
      version: '1.7.0',
      date: '2025-11-29',
      type: 'minor',
      changes: [
        '新增 AI 助理功能',
        '支援流式回應與對話歷史',
        '整合 Groq API',
        '新增快捷問題建議'
      ]
    },
    {
      version: '1.6.0',
      date: '2025-11-25',
      type: 'minor',
      changes: [
        '新增進階圖片保護系統',
        '新增 TinyLink 作品',
        '新增 Experience 區塊',
        '優化作品集展示'
      ]
    },
    {
      version: '1.5.0',
      date: '2025-11-16',
      type: 'minor',
      changes: [
        '移除深色模式並添加浮動標籤到聯絡表單',
        '統一卡片樣式和按鈕設計',
        '簡化設計：移除重陰影/漸層效果'
      ]
    },
    {
      version: '1.4.0',
      date: '2025-11-03',
      type: 'minor',
      changes: [
        '優化移動端選單：語言選擇器向上展開',
        '側邊欄支援垂直滾動',
        '語言選擇器和主題切換移至菜單'
      ]
    },
    {
      version: '1.3.0',
      date: '2025-10-30',
      type: 'minor',
      changes: [
        '更新個人網站連結',
        '在 protected-image 中加入白名單',
        '優化代碼：移除所有註釋並優化搜索框UI'
      ]
    },
    {
      version: '1.2.0',
      date: '2025-10-15',
      type: 'minor',
      changes: [
        '新增分享功能',
        '新增履歷下載按鈕',
        '整合 Web Share API',
        '新增社交媒體分享'
      ]
    },
    {
      version: '1.1.0',
      date: '2025-10-08',
      type: 'minor',
      changes: [
        '更新履歷下載功能',
        '語言選擇器優化',
        '表單驗證改進',
        '統一卡片樣式和輸入邊框'
      ]
    },
    {
      version: '1.0.0',
      date: '2025-09-12',
      type: 'major',
      changes: [
        '網站正式上線',
        '基本個人介紹功能',
        '作品集展示',
        '響應式設計',
        '國際化支援',
        'Vercel 部署配置'
      ]
    }
  ]

  const getTypeColor = (type: ChangelogItem['type']) => {
    switch (type) {
      case 'major':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700'
      case 'minor':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700'
      case 'patch':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700'
    }
  }

  const getTypeLabel = (type: ChangelogItem['type']) => {
    switch (type) {
      case 'major':
        return t('changelog.major', '重大更新')
      case 'minor':
        return t('changelog.minor', '功能更新')
      case 'patch':
        return t('changelog.patch', '修復更新')
      default:
        return t('changelog.unknown', '未知')
    }
  }

  const toggleExpanded = (version: string) => {
    setExpandedVersion(expandedVersion === version ? null : version)
  }

  return (
    <section id="changelog" className="py-16 sm:py-20 bg-[var(--color-section-soft)]">
      <div className="w-full max-w-full px-6 sm:px-8 lg:px-12">
        <div className="section-surface w-full">
          <div className="text-center mb-12 sm:mb-14 md:mb-16">
            <div className="mb-6">
              <button
                onClick={() => window.location.href = '/'}
                className="btn-secondary"
              >
                {t('changelog.backToHome', '返回首頁')}
              </button>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[rgb(var(--foreground-rgb))] mb-3 sm:mb-4 px-4">
              {t('changelog.title', '更新日誌')}
            </h2>
            <p className="text-lg sm:text-xl text-[rgb(var(--foreground-rgb))] max-w-3xl mx-auto px-4">
              {t('changelog.subtitle', '查看網站的最新更新與改進')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {changelogData.map((item) => (
                <div
                  key={item.version}
                  className="bg-[var(--color-surface)] border border-[var(--color-divider)] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div
                    className="p-4 sm:p-6 cursor-pointer flex items-center justify-between"
                    onClick={() => toggleExpanded(item.version)}
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="flex flex-col">
                        <span className="text-lg sm:text-xl font-bold text-[rgb(var(--foreground-rgb))]">
                          v{item.version}
                        </span>
                        <span className="text-sm text-[rgb(var(--foreground-rgb),0.7)]">
                          {item.date}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getTypeColor(item.type)}`}
                      >
                        {getTypeLabel(item.type)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-[rgb(var(--foreground-rgb),0.7)]">
                        {item.changes.length} {t('changelog.changes', '項更新')}
                      </span>
                      <svg
                        className={`w-5 h-5 text-[rgb(var(--foreground-rgb),0.7)] transition-transform duration-300 ${
                          expandedVersion === item.version ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {expandedVersion === item.version && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-[var(--color-divider)]">
                      <ul className="space-y-2 mt-4">
                        {item.changes.map((change, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2 text-sm sm:text-base text-[rgb(var(--foreground-rgb))]"
                          >
                            <svg
                              className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-[rgb(var(--foreground-rgb),0.7)]">
                {t('changelog.footer', '持續改進中，敬請期待更多功能')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
