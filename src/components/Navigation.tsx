'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { smoothScrollToElement } from '../lib/smoothScrollUtils'
import { useTranslationSafe } from '../hooks/useTranslationSafe'
import LanguageSwitcher from './LanguageSwitcher'
import DropdownSearch from './DropdownSearch'

export default function Navigation() {
  const { t } = useTranslationSafe()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
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
    smoothScrollToElement(href, 64)
    setIsMenuOpen(false)
  }

  const handleNavigation = (href: string, external: boolean = false) => {
    if (external) {
      window.location.href = href
    } else if (href.startsWith('/')) {
      window.location.href = href
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        scrollToSection(href)
      } else {
        window.location.href = `/${href}`
      }
    } else {
      scrollToSection(href)
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="w-full bg-white/95 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-divider)] shadow-[0_10px_25px_rgba(15,15,40,0.06)]">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => handleNavigation('#home')}
                className="navigation-brand text-2xl font-extrabold tracking-tight text-[#1c1c28] hover:text-[var(--color-primary)] transition-colors"
              >
                {t('navigation.kevin', 'Kevin.')}
              </button>
              
              <div className="hidden lg:flex items-center space-x-3 ml-10">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className="btn-nav-pill"
                  >
                    {item.name}
                  </button>
                ))}
                {externalLinks.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href, item.external)}
                    className="btn-nav-pill"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:hidden flex-1 flex justify-center mx-4">
              <DropdownSearch />
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <DropdownSearch />
              <LanguageSwitcher />
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 text-[#1c1c28] hover:text-[var(--color-primary)] transition-colors flex items-center justify-center"
                aria-label="打开菜单"
              >
                <span className="material-symbols-outlined text-2xl">
                  {isMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isClient && (
        <AnimatePresence>
          {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/40"
              style={{ zIndex: 9998 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.15 }}
              className="fixed top-0 right-0 h-screen w-80 bg-white flex flex-col shadow-2xl border-l border-[var(--color-divider)]"
              style={{ zIndex: 9999 }}
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 flex-shrink-0 border-b border-[var(--color-divider)]">
                <h2 className="text-xl font-bold text-[#1c1c28]">{t('navigation.menu', '選單')}</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 text-[#1c1c28] hover:text-[var(--color-primary)] transition-colors flex items-center justify-center"
                  aria-label="关闭菜单"
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <nav className="p-4">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href)}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-[#1f1d30] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)] transition-colors border border-transparent"
                    >
                      {item.name}
                    </button>
                  ))}
                  {externalLinks.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href, item.external)}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-[#1f1d30] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-variant)] transition-colors border border-transparent"
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>

                <div className="px-6 pb-6 border-t border-[var(--color-divider)] pt-4 space-y-3">
                    <h3 className="text-sm font-semibold text-[#6b6371] px-4 mb-3">
                      {t('navigation.settings', '設定')}
                    </h3>
                    
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-[#1f1d30] font-medium">
                        {t('navigation.language', '語言')}
                      </span>
                      <LanguageSwitcher />
                    </div>
                </div>
              </div>
            </motion.div>
          </>
          )}
        </AnimatePresence>
      )}
    </>
  )
}
