'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

type SearchResult = {
  id: string
  title: string
  description: string
  type: 'about' | 'portfolio' | 'skills' | 'experience' | 'contact' | 'project'
  href: string
  icon: string
}

const typeIconMap: Record<SearchResult['type'], string> = {
  about: 'person',
  portfolio: 'work',
  skills: 'terminal',
  experience: 'military_tech',
  contact: 'mail',
  project: 'description'
}

export default function DropdownSearch() {
  const { t } = useTranslationSafe()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const quickLinks = [
    {
      id: 'quick-about',
      name: t('navigation.about', '關於'),
      description: t('search.aboutDescription', '了解我的背景、技能和專業經驗'),
      icon: 'person',
      href: '#about',
      color: 'text-[#ff4d2d]',
      bgColor: 'bg-[var(--color-accent-soft)]'
    },
    {
      id: 'quick-portfolio',
      name: t('navigation.portfolio', '作品'),
      description: t('search.portfolioDescription', '查看我的精選專案和作品集'),
      icon: 'work',
      href: '#portfolio',
      color: 'text-[#1d47ff]',
      bgColor: 'bg-[var(--color-accent-cool)]'
    },
    {
      id: 'quick-skills',
      name: t('navigation.skills', '技能'),
      description: t('search.skillsDescription', '了解我的技術能力和專業技能'),
      icon: 'terminal',
      href: '#skills',
      color: 'text-[#00a19a]',
      bgColor: 'bg-[var(--color-accent-mint)]'
    },
    {
      id: 'quick-contact',
      name: t('navigation.contact', '聯繫'),
      description: t('search.contactDescription', '透過各種方式與我聯繫'),
      icon: 'mail',
      href: '#contact',
      color: 'text-[#ff4d2d]',
      bgColor: 'bg-[var(--color-accent-soft)]'
    }
  ]

  const searchData: SearchResult[] = [
    {
      id: 'about',
      title: t('navigation.about', '關於'),
      description: '陳梓敬 Kevin 吳鳳科技大學 數位科技與媒體設計系 使用者為中心 數位體驗 需求分析 產品設計 使用者體驗優化 品質控制測試 AI協作開發 現代化工具 設計概念 系統性設計思維 AI輔助開發 高品質數位產品',
      type: 'about',
      href: '#about',
      icon: typeIconMap.about
    },
    {
      id: 'about-uiux',
      title: 'UI/UX 設計',
      description: '使用者體驗設計 創造直觀且美觀的介面 UI UX Design',
      type: 'about',
      href: '#about',
      icon: 'palette'
    },
    {
      id: 'about-product',
      title: '產品設計',
      description: '需求分析 產品規劃 將想法轉化為可行的數位解決方案 Product Design',
      type: 'about',
      href: '#about',
      icon: 'track_changes'
    },
    {
      id: 'about-quality',
      title: '品質控制',
      description: '系統性測試 產品穩定性 優化使用者體驗 Quality Control Testing',
      type: 'about',
      href: '#about',
      icon: 'verified'
    },
    {
      id: 'about-ai',
      title: '與AI協作',
      description: '運用AI工具 提升工作效率 AI協作經驗 AI Collaboration',
      type: 'about',
      href: '#about',
      icon: 'diversity_3'
    },
    {
      id: 'portfolio',
      title: t('navigation.portfolio', '作品'),
      description: '精選專案展示 技術實力 創意思維 作品集 Projects Portfolio',
      type: 'portfolio',
      href: '#portfolio',
      icon: typeIconMap.portfolio
    },
    {
      id: 'skills',
      title: t('navigation.skills', '技能'),
      description: '技術技能 持續學習新技術 保持技能與時俱進 Technical Skills',
      type: 'skills',
      href: '#skills',
      icon: typeIconMap.skills
    },
    {
      id: 'skills-frontend',
      title: '前端開發',
      description: 'React 90% Next.js 85% TypeScript 80% JavaScript 95% HTML CSS 95% Tailwind CSS 90% Frontend Development',
      type: 'skills',
      href: '#skills',
      icon: 'terminal'
    },
    {
      id: 'skills-design',
      title: '設計技能',
      description: 'UI/UX Design 80% Responsive Design 90% Prototyping 75% Figma 75% Design Systems 70% User Research 60%',
      type: 'skills',
      href: '#skills',
      icon: 'palette'
    },
    {
      id: 'skills-tools',
      title: '工具與平台',
      description: 'GitHub 85% Vercel 80% VS Code 90% Node.js 75% Express 70% REST API 80% Tools Platforms',
      type: 'skills',
      href: '#skills',
      icon: 'build'
    },
    {
      id: 'skills-soft',
      title: '軟技能',
      description: '團隊協作 85% 問題解決 90% 溝通表達 80% 持續學習 95% 創意思考 85% 時間管理 80% Soft Skills',
      type: 'skills',
      href: '#skills',
      icon: 'groups'
    },
    {
      id: 'experience',
      title: t('navigation.experience', '經驗'),
      description: '語言能力 證照認證 實務經驗 課外活動 Experience',
      type: 'experience',
      href: '#experience',
      icon: typeIconMap.experience
    },
    {
      id: 'experience-language-zh',
      title: '中文（母語）',
      description: '語言能力 中文 母語 Chinese Native',
      type: 'experience',
      href: '#experience',
      icon: 'language'
    },
    {
      id: 'experience-language-en',
      title: '英文（中級）',
      description: '語言能力 英文 中級 English Intermediate',
      type: 'experience',
      href: '#experience',
      icon: 'language'
    },
    {
      id: 'experience-cert-ps',
      title: 'Adobe Photoshop 國際認證',
      description: 'Adobe Photoshop 國際認證 證照 International Certification',
      type: 'experience',
      href: '#experience',
      icon: 'workspace_premium'
    },
    {
      id: 'experience-cert-dw',
      title: 'Adobe Dreamweaver 國際認證',
      description: 'Adobe Dreamweaver 國際認證 證照 International Certification',
      type: 'experience',
      href: '#experience',
      icon: 'workspace_premium'
    },
    {
      id: 'experience-competition',
      title: '校園專題競賽第三名',
      description: '2023年 校園專題競賽 設計思維 技術能力 第三名 專案執行 創意思考 問題解決 技術應用 Competition Award',
      type: 'experience',
      href: '#experience',
      icon: 'flag'
    },
    {
      id: 'experience-student-union',
      title: '學生會資訊職務',
      description: '2022年-2025年 學生會 文書處理 活動規劃 組織協調 專案管理 會議紀錄 園遊會 校園演唱會 團隊協作 現場執行 Student Union',
      type: 'experience',
      href: '#experience',
      icon: 'flag'
    },
    {
      id: 'contact',
      title: t('navigation.contact', '聯繫'),
      description: '聯繫我 面試邀約 合作洽談 技術交流 Contact Interview',
      type: 'contact',
      href: '#contact',
      icon: typeIconMap.contact
    },
    {
      id: 'djkridp',
      title: t('portfolio.djkridp.title', 'DJKridP'),
      description: t('portfolio.djkridp.description', '受國際知名 DJ 委託開發的官方品牌網站，整合多國巡演資訊與社群媒體，展現跨文化協作與前端開發能力'),
      type: 'project',
      href: '#portfolio',
      icon: typeIconMap.project
    },
    {
      id: 'linebot',
      title: t('portfolio.lineBot.title', 'LINE BOT'),
      description: t('portfolio.lineBot.description', '運用 TypeScript 與 Express 打造的 LINE 聊天機器人，整合 AI 協作功能'),
      type: 'project',
      href: '#portfolio',
      icon: typeIconMap.project
    },
    {
      id: 'chefai',
      title: t('portfolio.chefAI.title', 'ChefAI'),
      description: t('portfolio.chefAI.description', '運用 Vue 與 Vite 打造 AI 食譜生成平台'),
      type: 'project',
      href: '#portfolio',
      icon: typeIconMap.project
    },
    {
      id: 'aiteacher',
      title: t('portfolio.aiTeacher.title', 'AI老師'),
      description: t('portfolio.aiTeacher.description', '運用 Vue 與 Vite 打造的 AI 協作專案'),
      type: 'project',
      href: '#portfolio',
      icon: typeIconMap.project
    },
    {
      id: 'sumvid',
      title: t('portfolio.sumVid.title', 'SumVid'),
      description: t('portfolio.sumVid.description', '讓 AI 為您快速提取影片重點'),
      type: 'project',
      href: '#portfolio',
      icon: typeIconMap.project
    },
    {
      id: 'discord-ai-bot',
      title: t('portfolio.discordAIBot.title', 'Discord AI Bot'),
      description: t('portfolio.discordAIBot.description', '運用 Python 打造的 Discord AI 聊天機器人，提供智能對話服務'),
      type: 'project',
      href: '#portfolio',
      icon: typeIconMap.project
    },
    {
      id: 'acadai',
      title: t('portfolio.acadAI.title', 'AcadAI'),
      description: t('portfolio.acadAI.description', 'AI 自動幫你整理商品重點'),
      type: 'project',
      href: '#portfolio',
      icon: typeIconMap.project
    },
    {
      id: 'taiwan-weather-ai',
      title: t('portfolio.taiwanWeatherAI.title', '臺灣氣象AI助手'),
      description: t('portfolio.taiwanWeatherAI.description', '查詢天氣與 AI 問答'),
      type: 'project',
      href: '#portfolio',
      icon: typeIconMap.project
    }
  ]

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      const filteredResults = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setResults(filteredResults)
      setIsLoading(false)
    }, 150)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    performSearch(value)
  }

  const handleResultClick = (result: SearchResult) => {
    if (result.href.startsWith('#')) {
      const element = document.querySelector(result.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.location.href = result.href
    }
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  const handleQuickLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.location.href = href
    }
    setIsOpen(false)
    setQuery('')
  }

  const clearSearch = () => {
    setQuery('')
    setResults([])
    inputRef.current?.focus()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative w-48 lg:w-56">
      <div className="relative">
        <div className="flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-[#6b6371]" aria-hidden="true">
            search
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearch}
            onFocus={() => setIsOpen(true)}
            placeholder={t('search.placeholder', '搜索...')}
            className="w-full pl-10 pr-10 py-2 text-sm bg-white border border-[var(--color-divider)] focus:border-[var(--color-primary)] transition-all duration-300 placeholder-[#a59ca9] text-[#1f1d30] rounded-[50px]"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 text-[#6b6371] hover:text-[var(--color-primary)] transition-colors duration-300"
            >
              <span className="material-symbols-outlined text-base">close</span>
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--color-divider)] shadow-[0_25px_45px_rgba(15,15,40,0.08)] z-[100] max-h-96 overflow-y-auto rounded-2xl p-1.5">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-primary)] mx-auto"></div>
              <p className="text-sm text-[#6b6371] mt-2">
                {t('search.searching', '搜索中...')}
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col gap-1">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 hover:bg-[var(--color-surface-variant)] transition-colors duration-300 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 border border-[var(--color-divider)] flex items-center justify-center text-[var(--color-primary)] rounded-lg">
                      <span className="material-symbols-outlined text-base">{result.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#1f1d30] truncate">{result.title}</h3>
                      <p className="text-sm text-[#6b6371] mt-1 line-clamp-2">{result.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="p-4 text-center">
              <span className="material-symbols-outlined text-[#6b6371] text-2xl mx-auto mb-2 block">
                search
              </span>
              <p className="text-sm text-[#6b6371]">
                {t('search.noResults', '沒有找到相關結果')}
              </p>
              <p className="text-xs text-[#9b92a4] mt-1">
                {t('search.tryDifferent', '試試其他關鍵字')}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="px-4 py-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6b6371] text-base">bolt</span>
                <h3 className="text-xs font-semibold text-[#6b6371] uppercase tracking-wide">
                  {t('search.quickNavigation', '快速導航')}
                </h3>
              </div>
              <div className="flex flex-col gap-1">
                {quickLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleQuickLinkClick(link.href)}
                    className="group w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--color-surface-variant)] transition-colors duration-300 rounded-xl"
                  >
                    <div className={`w-8 h-8 flex items-center justify-center border border-[var(--color-divider)] ${link.bgColor} ${link.color} rounded-lg`}>
                      <span className="material-symbols-outlined text-base">{link.icon}</span>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-medium text-[#1f1d30] text-sm">{link.name}</div>
                      <div className="text-xs text-[#6b6371] truncate">{link.description}</div>
                    </div>
                    <span className="material-symbols-outlined text-[#9b92a4] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 text-sm">
                      chevron_right
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
