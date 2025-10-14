'use client'

import { motion } from 'framer-motion'
import { Heart, Linkedin, Mail, ChevronUp } from 'lucide-react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Footer() {
  const { t } = useTranslationSafe()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/%E6%A2%93%E6%95%AC-%E9%99%B3-5ba547230/',
      label: t('socialMedia.linkedin', 'LinkedIn')
    },
    {
      icon: Mail,
      href: 'mailto:tyouxipindao@gmail.com',
      label: t('socialMedia.email', '電子郵件')
    }
  ]

  const quickLinks = [
    { name: t('navigation.home'), href: '#home' },
    { name: t('navigation.about'), href: '#about' },
    { name: t('navigation.portfolio'), href: '#portfolio' },
    { name: t('navigation.skills'), href: '#skills' },
    { name: t('navigation.experience'), href: '#experience' },
    { name: t('navigation.contact'), href: '#contact' }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="bg-gray-950 text-white relative">
      {/* 返回頂部按鈕 */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-8 right-6 btn-icon bg-white dark:bg-blue-500 text-kevin-blue dark:text-white z-10"
        aria-label="返回頂部"
      >
        <ChevronUp size={20} />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('navigation.kevin', 'Kevin.')}
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t('footer.description', '設計師 & 開發者，專注於創造以使用者為中心的數位體驗。結合設計美感與技術實作，將想法轉化為現實。')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="btn-icon-sm bg-gray-800 dark:bg-gray-700 hover:bg-kevin-blue"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks', '快速連結')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="text-lg font-semibold mb-4">{t('footer.contactInfo', '聯繫資訊')}</h4>
            <div className="space-y-3 text-gray-300">
              <p>📧 tyouxipindao@gmail.com</p>
              <p>📍 {t('footer.location', '彰化縣, 台灣')}</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 relative"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              {t('footer.copyright', '© 2024 Kevin. All rights reserved.').replace('2024', currentYear.toString())}
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-gray-400 flex items-center space-x-1"
            >
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={16} className="text-red-500 fill-current" />
              </motion.span>
              <span>by Kevin</span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
