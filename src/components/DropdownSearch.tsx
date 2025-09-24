'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Search, X, FileText, Briefcase, Code, User, Mail } from 'lucide-react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'about' | 'portfolio' | 'skills' | 'contact' | 'project'
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

  // 搜索資料
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
      id: 'contact',
      title: t('navigation.contact', '聯繫'),
      description: t('search.contactDescription', '透過各種方式與我聯繫'),
      type: 'contact',
      href: '#contact',
      icon: Mail
    },
    {
      id: 'simple-notes',
      title: t('portfolio.simpleNotes.title', 'Simple Notes'),
      description: t('portfolio.simpleNotes.description', '簡潔的筆記應用，專注於內容創作'),
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
      description: t('portfolio.personalWebsite.description', '響應式個人作品集網站，展示設計與開發能力'),
      type: 'project',
      href: '#portfolio',
      icon: FileText
    }
  ]

  // 搜索功能
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // 模擬搜索延遲
    setTimeout(() => {
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setResults(filteredResults)
      setIsLoading(false)
    }, 150)
  }

  // 處理搜索輸入
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    performSearch(value)
  }

  // 處理結果點擊
  const handleResultClick = (result: SearchResult) => {
    if (result.href.startsWith('#')) {
      // 內部錨點連結
      const element = document.querySelector(result.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // 外部連結
      window.location.href = result.href
    }
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  // 清除搜索
  const clearSearch = () => {
    setQuery('')
    setResults([])
    inputRef.current?.focus()
  }

  // 獲取類型圖示
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'about': return User
      case 'portfolio': return Briefcase
      case 'skills': return Code
      case 'contact': return Mail
      case 'project': return FileText
      default: return FileText
    }
  }

  // 獲取類型顏色
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'about': return 'text-blue-500'
      case 'portfolio': return 'text-purple-500'
      case 'skills': return 'text-green-500'
      case 'contact': return 'text-orange-500'
      case 'project': return 'text-indigo-500'
      default: return 'text-gray-500'
    }
  }

  // 點擊外部關閉
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
    <div ref={containerRef} className="relative">
      {/* 搜索輸入框 */}
      <div className="relative">
        <div className="flex items-center">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearch}
            onFocus={() => setIsOpen(true)}
            placeholder={t('search.placeholder', '搜索網站內容...')}
            className="w-full pl-10 pr-10 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* 下拉搜索結果 */}
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
                      className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
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
              <div className="p-4 text-center">
                <Search className="text-gray-400 mx-auto mb-2" size={24} />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('search.startTyping', '開始輸入以搜索內容')}
                </p>
              </div>
            )}
        </div>
      )}
    </div>
  )
}
