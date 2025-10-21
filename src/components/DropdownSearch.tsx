'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, X, FileText, Briefcase, Code, User, Mail, Award, Zap, ChevronRight } from 'lucide-react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'about' | 'portfolio' | 'skills' | 'experience' | 'contact' | 'project'
  href: string
  icon: any
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
      icon: User,
      href: '#about',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      id: 'quick-portfolio',
      name: t('navigation.portfolio', '作品'),
      description: t('search.portfolioDescription', '查看我的精選專案和作品集'),
      icon: Briefcase,
      href: '#portfolio',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      id: 'quick-skills',
      name: t('navigation.skills', '技能'),
      description: t('search.skillsDescription', '了解我的技術能力和專業技能'),
      icon: Code,
      href: '#skills',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      id: 'quick-contact',
      name: t('navigation.contact', '聯繫'),
      description: t('search.contactDescription', '透過各種方式與我聯繫'),
      icon: Mail,
      href: '#contact',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ]

  const searchData: SearchResult[] = [
    {
      id: 'about',
      title: t('navigation.about', '關於'),
      description: t('search.aboutDescription', '了解我的背景、技能和專業經驗'),
      type: 'about',
      href: '#about',
      icon: User
    },
    {
      id: 'portfolio',
      title: t('navigation.portfolio', '作品'),
      description: t('search.portfolioDescription', '查看我的精選專案和作品集'),
      type: 'portfolio',
      href: '#portfolio',
      icon: Briefcase
    },
    {
      id: 'skills',
      title: t('navigation.skills', '技能'),
      description: t('search.skillsDescription', '了解我的技術能力和專業技能'),
      type: 'skills',
      href: '#skills',
      icon: Code
    },
    {
      id: 'experience',
      title: t('navigation.experience', '經驗'),
      description: t('search.experienceDescription', '查看我的語言能力、證照認證與實務經驗'),
      type: 'experience',
      href: '#experience',
      icon: Award
    },
    {
      id: 'contact',
      title: t('navigation.contact', '聯繫'),
      description: t('search.contactDescription', '透過各種方式與我聯繫'),
      type: 'contact',
      href: '#contact',
      icon: Mail
    },
    {
      id: 'simple-notes',
      title: t('portfolio.simpleNotes.title', 'AuthPrototype'),
      description: t('portfolio.simpleNotes.description', '我的第一個完整前端專案，學習 Angular/Tailwindcss 基礎，建立登入/註冊的原型設計'),
      type: 'project',
      href: '#portfolio',
      icon: FileText
    },
    {
      id: 'resumecraft',
      title: t('portfolio.resumecraft.title', 'ResumeCraft'),
      description: t('portfolio.resumecraft.description', '專業履歷生成器，幫助求職者快速建立精美履歷'),
      type: 'project',
      href: '#portfolio',
      icon: FileText
    },
    {
      id: 'personal-website',
      title: t('portfolio.personalWebsite.title', 'Kevin. - 個人網站'),
      description: t('portfolio.personalWebsite.description', '綜合技能展示專案，整合所學技術打造個人品牌網站'),
      type: 'project',
      href: '#portfolio',
      icon: FileText
    },
    {
      id: 'weather-app',
      title: t('portfolio.weatherApp.title', '天氣儀表板'),
      description: t('portfolio.weatherApp.description', '學習 API 整合的專案，掌握外部數據獲取和現代化 UI 設計'),
      type: 'project',
      href: '#portfolio',
      icon: FileText
    },
    {
      id: 'taskblue',
      title: t('portfolio.taskblue.title', 'TaskBlue'),
      description: t('portfolio.taskblue.description', 'React 狀態管理練習專案，學習複雜組件間的數據流管理'),
      type: 'project',
      href: '#portfolio',
      icon: FileText
    },
    {
      id: 'tinylink',
      title: t('portfolio.tinylink.title', 'TinyLink'),
      description: t('portfolio.tinylink.description', '後端概念學習專案，理解數據庫設計、API 開發和部署流程'),
      type: 'project',
      href: '#portfolio',
      icon: FileText
    }
  ]

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    setTimeout(() => {
      const filteredResults = searchData.filter(item =>
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'about': return User
      case 'portfolio': return Briefcase
      case 'skills': return Code
      case 'experience': return Award
      case 'contact': return Mail
      case 'project': return FileText
      default: return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'about': return 'text-blue-500'
      case 'portfolio': return 'text-purple-500'
      case 'skills': return 'text-green-500'
      case 'experience': return 'text-yellow-500'
      case 'contact': return 'text-orange-500'
      case 'project': return 'text-indigo-500'
      default: return 'text-gray-500'
    }
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
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearch}
            onFocus={() => setIsOpen(true)}
            placeholder={t('search.placeholder', '搜索...')}
            className="w-full pl-10 pr-10 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:border-kevin-blue dark:focus:border-blue-400 transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-kevin-blue mx-auto"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {t('search.searching', '搜索中...')}
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="py-2">
                {results.map((result, index) => {
                  const IconComponent = getTypeIcon(result.type)
                  const typeColor = getTypeColor(result.type)
                  
                  return (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${typeColor}`}>
                          <IconComponent size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                            {result.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : query ? (
              <div className="p-4 text-center">
                <Search className="text-gray-400 mx-auto mb-2" size={24} />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('search.noResults', '沒有找到相關結果')}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {t('search.tryDifferent', '試試其他關鍵字')}
                </p>
              </div>
            ) : (
              <div className="py-3">
                <div>
                  <div className="px-4 py-2 flex items-center gap-2">
                    <Zap size={14} className="text-gray-400" />
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      {t('search.quickNavigation', '快速導航')}
                    </h3>
                  </div>
                  <div>
                    {quickLinks.map((link) => {
                      const IconComponent = link.icon
                      return (
                        <button
                          key={link.id}
                          onClick={() => handleQuickLinkClick(link.href)}
                          className="group w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                        >
                          <div className={`w-8 h-8 rounded-lg ${link.bgColor} flex items-center justify-center ${link.color}`}>
                            <IconComponent size={16} />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {link.name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {link.description}
                            </div>
                          </div>
                          <ChevronRight className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" size={16} />
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  )
}
