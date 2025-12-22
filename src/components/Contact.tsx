'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'
import Turnstile from './Turnstile'

export default function Contact() {
  const { t } = useTranslationSafe()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    subject?: string
    message?: string
    turnstile?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileKey, setTurnstileKey] = useState<string>('')
  const [toast, setToast] = useState<{
    show: boolean
    type: 'success' | 'error'
    message: string
  }>({ show: false, type: 'success', message: '' })

  useEffect(() => {
    setTurnstileKey(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '')
  }, [])

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired', '請填寫姓名')
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.validation.emailRequired', '請填寫電子郵件')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.validation.emailInvalid', '請輸入有效的電子郵件地址')
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.validation.subjectRequired', '請填寫主題')
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired', '請填寫訊息內容')
    }
    
    if (!turnstileToken && turnstileKey) {
      newErrors.turnstile = t('contact.validation.turnstileRequired', '請完成驗證')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setToast({
          show: true,
          type: 'success',
          message: t('contact.success', '訊息已發送！')
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTurnstileToken(null)
        setErrors({})
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
            className={`flex items-center space-x-3 px-6 py-4 border border-[var(--color-divider)] shadow-[0_20px_45px_rgba(15,15,40,0.12)] bg-white rounded-xl ${
              toast.type === 'success' ? 'text-[#0c5b3a]' : 'text-[#ef4444]'
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
            className="bg-white border border-[var(--color-divider)] p-6 sm:p-8 shadow-[0_20px_35px_rgba(15,15,40,0.08)] rounded-xl"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#1b1d2c] mb-4 sm:mb-6">
              {t('contact.sendMessage', '留下訊息')}
            </h3>
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-field">
                  <div className="floating-field">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`floating-input peer ${errors.name ? 'border-[#ef4444] focus:border-[#ef4444]' : ''}`}
                      placeholder=" "
                    />
                    <label htmlFor="name" className="floating-label">
                      {t('contact.name', '姓名')} *
                    </label>
                  </div>
                  {errors.name && (
                    <p className="text-sm text-[#ef4444] mt-1.5">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="form-field">
                  <div className="floating-field">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`floating-input peer ${errors.email ? 'border-[#ef4444] focus:border-[#ef4444]' : ''}`}
                      placeholder=" "
                    />
                    <label htmlFor="email" className="floating-label">
                      {t('contact.email', '電子郵件')} *
                    </label>
                  </div>
                  {errors.email && (
                    <p className="text-sm text-[#ef4444] mt-1.5">
                      {errors.email}
                    </p>
                  )}
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
                    className={`floating-input peer ${errors.subject ? 'border-[#ef4444] focus:border-[#ef4444]' : ''}`}
                    placeholder=" "
                  />
                  <label htmlFor="subject" className="floating-label">
                    {t('contact.subject', '主題')} *
                  </label>
                </div>
                {errors.subject && (
                  <p className="text-sm text-[#ef4444] mt-1.5">
                    {errors.subject}
                  </p>
                )}
              </div>
              
              <div className="form-field">
                <div className="floating-field">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`floating-textarea peer resize-none ${errors.message ? 'border-[#ef4444] focus:border-[#ef4444]' : ''}`}
                    placeholder=" "
                  />
                  <label htmlFor="message" className="floating-label">
                    {t('contact.message', '訊息')} *
                  </label>
                </div>
                {errors.message && (
                  <p className="text-sm text-[#ef4444] mt-1.5">
                    {errors.message}
                  </p>
                )}
              </div>
              
              {turnstileKey && (
                <div className="form-field">
                  <Turnstile
                    siteKey={turnstileKey}
                    onVerify={(token) => {
                      setTurnstileToken(token)
                      if (errors.turnstile) {
                        setErrors({ ...errors, turnstile: undefined })
                      }
                    }}
                    onError={() => {
                      setTurnstileToken(null)
                      setErrors((prev) => ({
                        ...prev,
                        turnstile: t('contact.validation.turnstileError', '驗證失敗，請重試')
                      }))
                    }}
                    onExpire={() => {
                      setTurnstileToken(null)
                    }}
                    theme="auto"
                    size="normal"
                    className="flex justify-center"
                  />
                  {errors.turnstile && (
                    <p className="text-sm text-[#ef4444] mt-1.5 text-center">
                      {errors.turnstile}
                    </p>
                  )}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting || (!!turnstileKey && !turnstileToken)}
                className={`w-full btn-primary min-h-[48px] ${
                  isSubmitting || (!!turnstileKey && !turnstileToken) ? 'opacity-50 cursor-not-allowed' : ''
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
