'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Contact() {
  const { t } = useTranslationSafe()
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

  return (
  <section id="contact" className="py-16 sm:py-20 bg-[var(--color-section-alt)]">
      {toast.show && (
        <div className="fixed top-20 right-4 sm:top-24 sm:right-6 z-[10001]">
          <div
            className={`flex items-center space-x-3 px-6 py-4 border border-[var(--color-divider)] shadow-[0_20px_45px_rgba(15,15,40,0.12)] bg-white ${
              toast.type === 'success' ? 'text-[#0c5b3a]' : 'text-[#7f1d1d]'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-2 text-[#6b6371] hover:text-[#1f1d30] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="section-surface">
        <motion.div
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1b1d2c] mb-3 sm:mb-4 px-4">
{t('contact.title', '聯繫我')}
          </h2>
          <p className="text-lg sm:text-xl text-[#4a4455] max-w-3xl mx-auto px-4">
{t('contact.description', '歡迎與我聯繫')}
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            transition={{ duration: 0.8 }}
            className="bg-white border border-[var(--color-divider)] p-6 sm:p-8 shadow-[0_20px_35px_rgba(15,15,40,0.08)]"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#1b1d2c] mb-4 sm:mb-6">
              {t('contact.sendMessage', '留下訊息')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-field">
                  <div className="floating-field">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="floating-input peer"
                      placeholder=" "
                    />
                    <label htmlFor="name" className="floating-label">
                      {t('contact.name', '姓名')} *
                    </label>
                  </div>
                </div>
                <div className="form-field">
                  <div className="floating-field">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="floating-input peer"
                      placeholder=" "
                    />
                    <label htmlFor="email" className="floating-label">
                      {t('contact.email', '電子郵件')} *
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="form-field">
                <div className="floating-field">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="floating-input peer"
                    placeholder=" "
                  />
                  <label htmlFor="subject" className="floating-label">
                    {t('contact.subject', '主題')} *
                  </label>
                </div>
              </div>
              
              <div className="form-field">
                <div className="floating-field">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="floating-textarea peer resize-none"
                    placeholder=" "
                  />
                  <label htmlFor="message" className="floating-label">
                    {t('contact.message', '訊息')} *
                  </label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary min-h-[48px] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="material-symbols-outlined text-base">send</span>
                <span>{isSubmitting ? t('contact.sending', '傳送中...') : t('contact.sendMessage', '留下訊息')}</span>
              </button>
            </form>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
