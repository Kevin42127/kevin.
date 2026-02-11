'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { smoothScrollToElement } from '../lib/smoothScrollUtils'
import { useTranslationSafe } from '../hooks/useTranslationSafe'
import LanguageSwitcher from './LanguageSwitcher'
import DropdownSearch from './DropdownSearch'
import { ThemeToggle } from './ThemeToggle'

export default function Navigation() {
  const { t, i18n } = useTranslationSafe()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isMenuReady, setIsMenuReady] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuReady(true)
    } else {
      const timer = setTimeout(() => setIsMenuReady(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isMenuOpen])

  const navItems: Array<{ name: string; href: string }> = useMemo(() => [
    { name: t('navigation.home', '首頁'), href: '#home' },
    { name: t('navigation.about', '關於'), href: '#about' },
    { name: t('navigation.portfolio', '作品'), href: '#portfolio' },
    { name: t('navigation.skills', '技能'), href: '#skills' },
    { name: t('navigation.experience', '經驗'), href: '#experience' },
    { name: t('navigation.contact', '聯繫'), href: '#contact' },
  ], [t, i18n.language])

  const externalLinks: Array<{ name: string; href: string; external: boolean }> = useMemo(() => [], [])

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
      <nav 
        className="fixed w-full top-0 left-0 right-0 z-[105] bg-[var(--color-page)] border-b border-[var(--color-divider)] shadow-[0_10px_25px_rgba(15,15,40,0.06)]" 
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => handleNavigation('#home')}
                className="navigation-brand text-2xl font-extrabold tracking-tight text-[rgb(var(--foreground-rgb))] hover:text-[var(--color-primary)] transition-colors"
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
              <ThemeToggle />
              <LanguageSwitcher />
              <a
                href="https://github.com/Kevin42127/kevin."
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 text-[rgb(var(--foreground-rgb))] hover:text-[var(--color-primary)] transition-colors flex items-center justify-center"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>

            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 text-[rgb(var(--foreground-rgb))] hover:text-[var(--color-primary)] transition-all duration-200 ease-out flex items-center justify-center"
                aria-label={t('navigation.openMenu', '打開選單')}
              >
                <motion.span 
                  className="material-symbols-outlined text-2xl block"
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {isMenuOpen ? 'close' : 'menu'}
                </motion.span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isClient && (
        <AnimatePresence mode="wait">
          {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed inset-0 bg-black/40"
              style={{ zIndex: 9998 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 h-screen w-80 bg-[var(--color-page)] flex flex-col shadow-2xl border-l border-[var(--color-divider)]"
              style={{ zIndex: 9999 }}
              role="dialog"
              aria-modal="true"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 flex-shrink-0 border-b border-[var(--color-divider)]">
                <h2 className="text-xl font-bold text-[rgb(var(--foreground-rgb))]">{t('navigation.menu', '選單')}</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 text-[rgb(var(--foreground-rgb))] hover:text-[var(--color-primary)] transition-colors flex items-center justify-center"
                  aria-label={t('navigation.closeMenu', '關閉選單')}
                >
                  <span className="material-symbols-outlined text-2xl">close</span>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <nav className="p-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={false}
                      animate={{ 
                        opacity: isMenuReady ? 1 : 0,
                        x: isMenuReady ? 0 : 20
                      }}
                      transition={{ 
                        duration: 0.2, 
                        delay: isMenuReady ? index * 0.05 : 0,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      onClick={() => handleNavigation(item.href)}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-[rgb(var(--foreground-rgb))] hover:text-white hover:bg-[var(--color-primary)] transition-all duration-200 ease-out border border-transparent rounded-lg"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  {externalLinks.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={false}
                      animate={{ 
                        opacity: isMenuReady ? 1 : 0,
                        x: isMenuReady ? 0 : 20
                      }}
                      transition={{ 
                        duration: 0.2, 
                        delay: isMenuReady ? (navItems.length + index) * 0.05 : 0,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      onClick={() => handleNavigation(item.href, item.external)}
                      className="block w-full text-left px-4 py-3 text-base font-medium text-[rgb(var(--foreground-rgb))] hover:text-white hover:bg-[var(--color-primary)] transition-all duration-200 ease-out border border-transparent rounded-lg"
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </nav>

                <div className="px-6 pb-6 border-t border-[var(--color-divider)] pt-4 space-y-3">
                    <h3 className="text-sm font-semibold text-[var(--color-text-muted)] px-4 mb-3">
                      {t('navigation.settings', '設定')}
                    </h3>
                    
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-[rgb(var(--foreground-rgb))] font-medium">
                        {t('navigation.language', '語言')}
                      </span>
                      <LanguageSwitcher />
                    </div>

                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-[rgb(var(--foreground-rgb))] font-medium">
                        {t('navigation.theme', '主題')}
                      </span>
                      <ThemeToggle />
                    </div>

                    <div className="flex items-center justify-between px-4 py-2">
                      <span className="text-[rgb(var(--foreground-rgb))] font-medium">
                        GitHub
                      </span>
                      <a
                        href="https://github.com/Kevin42127/kevin."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 text-[rgb(var(--foreground-rgb))] hover:text-[var(--color-primary)] transition-colors flex items-center justify-center"
                        aria-label="GitHub"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
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
