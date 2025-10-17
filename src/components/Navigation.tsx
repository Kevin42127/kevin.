'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslationSafe } from '../hooks/useTranslationSafe'
import LanguageSwitcher from './LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'
import DropdownSearch from './DropdownSearch'

export default function Navigation() {
  const { t } = useTranslationSafe()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const navItems: Array<{ name: string; href: string }> = [
    { name: t('navigation.home', '首頁'), href: '#home' },
    { name: t('navigation.about', '關於'), href: '#about' },
    { name: t('navigation.portfolio', '作品'), href: '#portfolio' },
    { name: t('navigation.skills', '技能'), href: '#skills' },
    { name: t('navigation.experience', '經驗'), href: '#experience' },
    { name: t('navigation.contact', '聯繫'), href: '#contact' },
  ]

  const externalLinks: Array<{ name: string; href: string; external: boolean }> = []

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    
    if (element) {
      // 立即關閉選單
      setIsMenuOpen(false)
      
      // 使用 requestAnimationFrame 確保 DOM 更新完成
      requestAnimationFrame(() => {
        // 計算導航欄高度（64px = h-16）
        const navHeight = 64
        const elementRect = element.getBoundingClientRect()
        const elementTop = elementRect.top + window.scrollY
        const offsetPosition = Math.max(0, elementTop - navHeight)

        // 使用 scrollIntoView 作為備用方案
        if (offsetPosition <= 0) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        } else {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      })
    } else {
      setIsMenuOpen(false)
    }
  }

  const handleNavigation = (href: string, external: boolean = false) => {
    if (external) {
      window.location.href = href
    } else if (href.startsWith('/')) {
      // Handle route navigation
      window.location.href = href
    } else if (href.startsWith('#')) {
      // Handle section navigation
      const element = document.querySelector(href)
      if (element) {
        scrollToSection(href)
      } else {
        // If element not found on current page, navigate to home page with hash
        window.location.href = `/${href}`
      }
    } else {
      scrollToSection(href)
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-gray-900 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo + Navigation */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('#home')}
              className="text-2xl font-bold text-kevin-blue dark:text-blue-400"
            >
              {t('navigation.kevin', 'Kevin.')}
            </button>
            
            {/* Desktop Navigation - Traditional Top Navigation */}
            <div className="hidden lg:flex items-center space-x-4 ml-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="text-gray-700 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400 font-medium transition-colors duration-300 btn-nav"
                >
                  {item.name}
                </button>
              ))}
              {externalLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.external)}
                  className="text-gray-700 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400 font-medium transition-colors duration-300 btn-nav"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Center - Mobile Search */}
          <div className="lg:hidden flex-1 flex justify-center mx-4">
            <DropdownSearch />
          </div>

          {/* Right Side - Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <DropdownSearch />
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-kevin-blue dark:hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0"
              aria-label="打开菜单"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu - Hamburger Menu */}
      {isClient && (
        <AnimatePresence>
          {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              duration: 0.1
            }}
            className="fixed top-0 right-0 h-screen w-80 bg-white dark:bg-gray-900 shadow-2xl border-l-2 border-gray-200 dark:border-gray-700 flex flex-col"
            style={{ zIndex: 9999 }}
          >
            {/* Close Button - Fixed Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{t('navigation.menu', '選單')}</h2>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-kevin-blue dark:hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                aria-label="关闭菜单"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Navigation Items */}
              <nav className="p-6 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-kevin-blue dark:hover:bg-blue-500 hover:text-white rounded-full transition-all duration-300"
                  >
                    {item.name}
                  </button>
                ))}
                {externalLinks.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href, item.external)}
                    className="block w-full text-left px-4 py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-kevin-blue dark:hover:bg-blue-500 hover:text-white rounded-full transition-all duration-300"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              {/* Settings Section */}
              <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-4 mb-3">
                  {t('navigation.settings', '設定')}
                </h3>
                
                {/* Language Switcher */}
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {t('navigation.language', '語言')}
                  </span>
                  <LanguageSwitcher />
                </div>

                {/* Theme Toggle */}
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {t('navigation.theme', '主題')}
                  </span>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.nav>
  )
}
