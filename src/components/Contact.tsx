'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Send, Linkedin } from 'lucide-react'
import { useState } from 'react'
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
        alert('訊息發送成功！我會盡快回覆您。')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        alert(result.error || '發送失敗，請稍後再試')
      }
    } catch (error) {
      console.error('發送錯誤:', error)
      alert('發送失敗，請檢查網路連線後再試')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'tyouxipindao@gmail.com',
      href: 'mailto:tyouxipindao@gmail.com'
    },
    {
      icon: MapPin,
      title: t('contact.locationLabel', '位置'),
      value: t('contact.location', '彰化縣, 台灣'),
      href: '#'
    }
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/%E6%A2%93%E6%95%AC-%E9%99%B3-5ba547230/',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:tyouxipindao@gmail.com',
      label: 'Email'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
{t('contact.title', '聯繫 我').split(' ')[0]} <span className="text-kevin-blue">{t('contact.title', '聯繫 我').split(' ')[1]}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
{t('contact.description', '有專案想法或合作機會？歡迎與我聯繫')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
{t('contact.subtitle', '讓我們開始對話')}
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
{t('contact.contactInfo', '歡迎隨時聯繫我，討論專案需求或合作機會。')}
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-kevin-blue/10 rounded-xl flex items-center justify-center">
                    <info.icon className="text-kevin-blue" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{info.title}</h4>
                    <a
                      href={info.href}
                      className="text-gray-600 hover:text-kevin-blue transition-colors duration-300"
                    >
                      {info.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">社群媒體</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-kevin-blue/10 rounded-xl flex items-center justify-center hover:bg-kevin-blue hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {t('contact.sendMessage')}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.name', '姓名')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kevin-blue focus:border-transparent transition-all duration-300"
                    placeholder={t('contact.namePlaceholder', '您的姓名')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('contact.email', '電子郵件')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kevin-blue focus:border-transparent transition-all duration-300"
                    placeholder={t('contact.emailPlaceholder', 'your@email.com')}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.subject', '主題')} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kevin-blue focus:border-transparent transition-all duration-300"
                  placeholder={t('contact.subjectPlaceholder', '訊息主題')}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.message', '訊息')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kevin-blue focus:border-transparent transition-all duration-300 resize-none"
                  placeholder={t('contact.messagePlaceholder', '請描述您的需求或想法...')}
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-kevin-blue text-white hover:bg-kevin-blue-dark'
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
