'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

export default function Contact() {
  const { t } = useTranslationSafe()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: ''
  })
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    subject?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{
    show: boolean
    type: 'success' | 'error'
    message: string
  }>({ show: false, type: 'success', message: '' })

  const tags = [
    { id: 'interview', label: t('contact.tags.interview', '面試邀約') }
  ]

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isSubmitting) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  const handleTagClick = (tagLabel: string) => {
    setFormData({
      ...formData,
      subject: tagLabel
    })
    if (errors.subject) {
      setErrors({
        ...errors,
        subject: undefined
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
      newErrors.subject = t('contact.validation.subjectRequired', '請選擇一個主題')
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
        // 發送給 API 時，將 subject 同時作為 message 發送（因為 API 驗證需要 message）
        body: JSON.stringify({
          ...formData,
          message: `${t('contact.sendMessage', '來自聯繫表單的訊息')}：${formData.subject}`
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setToast({
          show: true,
          type: 'success',
          message: t('contact.success', '訊息已發送！')
        })
        setFormData({ name: '', email: '', subject: '' })
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
    <section id="contact" className="min-h-screen flex items-center bg-[var(--color-section-alt)] py-12 sm:py-16 md:py-20">
      {toast.show && (
        <div className="fixed top-20 right-4 sm:top-24 sm:right-6 z-[10001]">
          <div
            className={`flex items-center space-x-3 px-6 py-4 border border-[var(--color-divider)] shadow-[0_20px_45px_rgba(15,15,40,0.12)] bg-[var(--color-surface)] rounded-xl ${
              toast.type === 'success' ? 'text-[#0c5b3a]' : 'text-[#ef4444]'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {toast.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span className="font-medium">{toast.message}</span>
            <button
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-2 text-[var(--color-text-muted)] hover:text-[rgb(var(--foreground-rgb))] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="section-surface p-6 sm:p-10 md:p-16 lg:p-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[rgb(var(--foreground-rgb))] mb-4 sm:mb-6">
              {t('contact.title', '聯繫我')}
            </h2>
            <p className="text-base sm:text-lg text-[rgb(var(--foreground-rgb))] mb-6 sm:mb-8 leading-relaxed">
              {t('contact.lowFrictionNote', '懶得打字？選一個標籤直接聯繫我。')}
            </p>

            {/* AI 助理引導 */}
            <div className="bg-[var(--ai-accent)]/10 border border-[var(--ai-accent)]/20 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--ai-accent)] flex items-center justify-center text-white flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20" fill="currentColor"><path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"/></svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--color-text)] font-medium mb-2">
                    {t('contact.aiAssistantGuide', '更快速的方式：使用 AI 助理')}
                  </p>
                  <p className="text-xs text-[rgb(var(--foreground-rgb))]">
                    {t('contact.aiAssistantDesc', '點擊右下角的 AI 助理圖示，直接在對話中填寫表單')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagClick(tag.label)}
                  className={`px-4 py-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
                    formData.subject === tag.label
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] scale-105'
                      : 'bg-[var(--color-surface)] text-[rgb(var(--foreground-rgb))] border-[var(--color-divider)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-medium">{tag.label}</span>
                </button>
              ))}
            </div>

            {errors.subject && (
              <p className="text-sm text-[#ef4444] mb-6 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">error</span>
                {errors.subject}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[var(--color-section-alt)] p-6 sm:p-8 rounded-2xl border border-[var(--color-divider)]"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-10">
              <div className="form-field">
                <div className="floating-field">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={`floating-input ${errors.name ? 'error' : ''}`}
                    required
                  />
                  <label htmlFor="name" className="floating-label">
                    {t('contact.name', '姓名')} *
                  </label>
                  <span className="floating-underline"></span>
                </div>
                {errors.name && (
                  <p className="text-sm text-[#ef4444] mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>
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
                    onKeyDown={handleKeyDown}
                    className={`floating-input ${errors.email ? 'error' : ''}`}
                    required
                  />
                  <label htmlFor="email" className="floating-label">
                    {t('contact.email', '電子郵件')} *
                  </label>
                  <span className="floating-underline"></span>
                </div>
                {errors.email && (
                  <p className="text-sm text-[#ef4444] mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {errors.email}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary min-h-[56px] text-lg rounded-xl active:scale-[0.98] transition-all ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{t('contact.sending', '傳送中...')}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">send</span>
                    <span>{t('contact.sendMessage', '傳送訊息')}</span>
                  </div>
                )}
              </button>
            </form>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}
