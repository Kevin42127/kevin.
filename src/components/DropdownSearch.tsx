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
      description: t('search.aboutDescription', '了解我的背景、技能和專業經驗'),
      type: 'about',
      href: '#about',
      icon: typeIconMap.about
    },
    {
      id: 'portfolio',
      title: t('navigation.portfolio', '作品'),
      description: t('search.portfolioDescription', '查看我的精選專案和作品集'),
      type: 'portfolio',
      href: '#portfolio',
      icon: typeIconMap.portfolio
    },
    {
      id: 'skills',
      title: t('navigation.skills', '技能'),
      description: t('search.skillsDescription', '了解我的技術能力和專業技能'),
      type: 'skills',
      href: '#skills',
      icon: typeIconMap.skills
    },
    {
      id: 'experience',
      title: t('navigation.experience', '經驗'),
      description: t('search.experienceDescription', '查看我的語言能力、證照認證與實務經驗'),
      type: 'experience',
      href: '#experience',
      icon: typeIconMap.experience
    },
    {
      id: 'contact',
      title: t('navigation.contact', '聯繫'),
      description: t('search.contactDescription', '透過各種方式與我聯繫'),
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
