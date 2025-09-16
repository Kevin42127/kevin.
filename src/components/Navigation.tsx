'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslationSafe } from '../hooks/useTranslationSafe'
import LanguageSwitcher from './LanguageSwitcher'
import ShareButton from './ShareButton'
import { ThemeToggle } from './ThemeToggle'
import DropdownSearch from './DropdownSearch'

export default function Navigation() {
  const { t } = useTranslationSafe()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const navItems = [
    { name: t('navigation.home', '首頁'), href: '#home' },
    { name: t('navigation.about', '關於'), href: '#about' },
    { name: t('navigation.portfolio', '作品'), href: '#portfolio' },
    { name: t('navigation.skills', '技能'), href: '#skills' },
    { name: t('navigation.contact', '聯繫'), href: '#contact' },
  ]

  const externalLinks = []

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
    } else {
      scrollToSection(href)
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('#home')}
              className="text-2xl font-bold text-kevin-blue dark:text-blue-400"
            >
{t('navigation.kevin', 'Kevin.')}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-12">
            {/* Navigation Items */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              {externalLinks.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.external)}
                  className="text-gray-700 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              {/* Dropdown Search */}
              <div className="w-64">
                <DropdownSearch />
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <ShareButton 
                  title="Kevin. - 現代化個人網站"
                  description="一個以藍色為品牌色的現代化個人網站，展示專業技能與創意作品。"
                  size="sm"
                />
                <LanguageSwitcher />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400 p-2 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="px-3 py-2 mb-2">
                <DropdownSearch />
              </div>
              
              {/* Navigation Items */}
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors duration-200 rounded-md"
                >
                  {item.name}
                </button>
              ))}
              
              {/* External Links */}
              {externalLinks.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.external)}
                  className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-kevin-blue dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-colors duration-200 rounded-md"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Actions */}
              <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                <div className="flex items-center justify-between">
                  <ThemeToggle />
                  <ShareButton 
                    title="Kevin. - 現代化個人網站"
                    description="一個以藍色為品牌色的現代化個人網站，展示專業技能與創意作品。"
                    size="sm"
                  />
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
