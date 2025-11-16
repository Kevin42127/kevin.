'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Send, Linkedin, CheckCircle, XCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Contact() {
  const { t, i18n } = useTranslationSafe()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{
    show: boolean
    type: 'success' | 'error'
    message: string
  }>({ show: false, type: 'success', message: '' })

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const nameInput = document.getElementById('name') as HTMLInputElement
    const emailInput = document.getElementById('email') as HTMLInputElement
    const subjectInput = document.getElementById('subject') as HTMLInputElement
    const messageInput = document.getElementById('message') as HTMLTextAreaElement

    if (nameInput) {
      nameInput.oninvalid = () => {
        if (!nameInput.value) {
          nameInput.setCustomValidity(t('contact.validation.nameRequired', '請填寫姓名'))
        }
      }
      nameInput.oninput = () => {
        nameInput.setCustomValidity('')
      }
    }

    if (emailInput) {
      emailInput.oninvalid = () => {
        if (!emailInput.value) {
          emailInput.setCustomValidity(t('contact.validation.emailRequired', '請填寫電子郵件'))
        } else if (emailInput.validity.typeMismatch) {
          emailInput.setCustomValidity(t('contact.validation.emailInvalid', '請輸入有效的電子郵件地址'))
        }
      }
      emailInput.oninput = () => {
        emailInput.setCustomValidity('')
      }
    }

    if (subjectInput) {
      subjectInput.oninvalid = () => {
        if (!subjectInput.value) {
          subjectInput.setCustomValidity(t('contact.validation.subjectRequired', '請填寫主題'))
        }
      }
      subjectInput.oninput = () => {
        subjectInput.setCustomValidity('')
      }
    }

    if (messageInput) {
      messageInput.oninvalid = () => {
        if (!messageInput.value) {
          messageInput.setCustomValidity(t('contact.validation.messageRequired', '請填寫訊息內容'))
        }
      }
      messageInput.oninput = () => {
        messageInput.setCustomValidity('')
      }
    }
  }, [t, i18n.language])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const form = e.currentTarget as HTMLFormElement
    
    if (!form.checkValidity()) {
      const inputs = form.querySelectorAll('input[required], textarea[required]')
      for (const input of Array.from(inputs)) {
        if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
          if (!input.validity.valid) {
            input.reportValidity()
            break
          }
        }
      }
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setToast({
          show: true,
          type: 'success',
          message: t('contact.success', '訊息已發送！')
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setToast({
          show: true,
          type: 'error',
          message: result.error || t('contact.error', '發送失敗，請稍後再試')
        })
      }
    } catch (error) {
      console.error('發送錯誤:', error)
      setToast({
        show: true,
        type: 'error',
        message: t('contact.error', '發送失敗，請檢查網路連線後再試')
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: t('socialMedia.email', '電子郵件'),
      value: 'tyouxipindao@gmail.com'
    },
    {
      icon: MapPin,
      title: t('contact.locationLabel', '位置'),
      value: t('contact.location', '彰化縣, 台灣')
    }
  ]

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

  return (
  <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white dark:bg-black">
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 sm:top-24 sm:right-6"
            style={{ zIndex: 10001 }}
          >
            <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg ${
              toast.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {toast.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <XCircle size={20} />
              )}
              <span className="font-medium">{toast.message}</span>
              <button
                onClick={() => setToast({ ...toast, show: false })}
                className="ml-2 hover:opacity-70 transition-opacity"
              >
                <XCircle size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4 px-4">
{t('contact.title', '聯繫我')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4">
{t('contact.description', '歡迎與我聯繫')}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 sm:mb-6">
              {t('contact.sendMessage')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.name', '姓名')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-base"
                    placeholder={t('contact.namePlaceholder', '您的姓名')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.email', '電子郵件')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-base"
                    placeholder={t('contact.emailPlaceholder', 'your@email.com')}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.subject', '主題')} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-base"
                  placeholder={t('contact.subjectPlaceholder', '訊息主題')}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t('contact.message', '訊息')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="textarea-base"
                  placeholder={t('contact.messagePlaceholder', '請描述您的需求或想法...')}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary min-h-[48px] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Send size={20} />
                <span>{isSubmitting ? t('contact.sending') : t('contact.sendMessage')}</span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
