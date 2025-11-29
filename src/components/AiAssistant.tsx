'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'
import { useTranslation } from 'react-i18next'

type Message = {
  role: 'user' | 'assistant'
  content: string
  isTyping?: boolean
}

const QUICK_QUESTIONS_ZH = [
  '介紹一下 Kevin',
  '有哪些作品？',
  '如何聯絡？',
  '擅長哪些技術？'
]

const QUICK_QUESTIONS_EN = [
  'Tell me about Kevin',
  'What projects do you have?',
  'How to contact?',
  'What technologies are you skilled in?'
]

export default function AiAssistant() {
  const { t } = useTranslationSafe()
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [typingText, setTypingText] = useState('')
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    position: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formToast, setFormToast] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({
    show: false,
    type: 'success',
    message: ''
  })
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const typingRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const toggleVisibility = () => {
      setScrollToTopVisible(window.pageYOffset > 300)
    }
    window.addEventListener('scroll', toggleVisibility)
    toggleVisibility()
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, isOpen, typingText])

  useEffect(() => {
    const saved = localStorage.getItem('ai-assistant-messages')
    if (saved) {
      try {
        setMessages(JSON.parse(saved))
      } catch {
        localStorage.removeItem('ai-assistant-messages')
      }
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('ai-assistant-messages', JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    return () => {
      if (typingRef.current) {
        clearInterval(typingRef.current)
      }
    }
  }, [])

  const typeWriter = (text: string, callback: () => void) => {
    let index = 0
    setTypingText('')
    
    if (typingRef.current) {
      clearInterval(typingRef.current)
    }

    typingRef.current = setInterval(() => {
      if (index < text.length) {
        setTypingText(text.substring(0, index + 1))
        index++
      } else {
        if (typingRef.current) {
          clearInterval(typingRef.current)
          typingRef.current = null
        }
        setTypingText('')
        callback()
      }
    }, 20)
  }

  const handleClear = () => {
    setMessages([])
    setTypingText('')
    if (typingRef.current) {
      clearInterval(typingRef.current)
      typingRef.current = null
    }
    localStorage.removeItem('ai-assistant-messages')
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const nextMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const messagesForAPI = nextMessages.map(({ role, content }) => ({ role, content }))
      
      const currentLang = (i18n.language === 'en' ? 'en' : 'zh') as 'zh' | 'en'
      
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messagesForAPI, lang: currentLang })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData?.error || `HTTP ${res.status}`)
      }

      const data = await res.json()
      if (data?.reply) {
        const assistantMessage: Message = { role: 'assistant', content: data.reply, isTyping: true }
        setMessages([...nextMessages, assistantMessage])
        typeWriter(data.reply, () => {
          setMessages(prev => prev.map((msg, idx) => 
            idx === prev.length - 1 ? { ...msg, isTyping: false } : msg
          ))
        })
      } else if (data?.error) {
        setMessages([
          ...nextMessages,
          {
            role: 'assistant',
            content: `錯誤：${data.error}`
          }
        ])
      } else {
        throw new Error('回應格式錯誤')
      }
    } catch (error) {
      console.error('AI Chat error:', error)
      const errorMessage = error instanceof Error ? error.message : '未知錯誤'
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: `發送失敗：${errorMessage}。請檢查終端機的錯誤訊息。`
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickQuestion = (question: string) => {
    if (question === '快速聯繫' || question === 'Quick Contact') {
      setShowForm(true)
      return
    }
    setInput(question)
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
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
      const submitData = {
        name: formData.company ? `${formData.name} (${formData.company})` : formData.name,
        email: formData.email,
        subject: formData.position ? `[${formData.position}] ${formData.subject}` : formData.subject,
        message: formData.message
      }

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      const result = await response.json()

      if (response.ok) {
        setFormToast({
          show: true,
          type: 'success',
          message: i18n.language === 'en' ? 'Message sent successfully!' : '訊息已發送！'
        })
        setFormData({ company: '', name: '', position: '', email: '', subject: '', message: '' })
        setTimeout(() => {
          setShowForm(false)
          setFormToast({ show: false, type: 'success', message: '' })
        }, 2000)
      } else {
        setFormToast({
          show: true,
          type: 'error',
          message: result.error || (i18n.language === 'en' ? 'Failed to send message' : '發送失敗，請稍後再試')
        })
      }
    } catch (error) {
      console.error('Form submit error:', error)
      setFormToast({
        show: true,
        type: 'error',
        message: i18n.language === 'en' ? 'Failed to send message' : '發送失敗，請檢查網路連線後再試'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-6 z-40 w-14 h-14 flex items-center justify-center bg-[var(--color-primary)] text-white border border-[var(--color-primary)] shadow-[0_10px_25px_rgba(15,15,40,0.3)] transition-all duration-200 hover:-translate-y-1 ${
          scrollToTopVisible ? 'bottom-24' : 'bottom-6'
        }`}
        aria-label="開啟 AI 助理"
      >
        <span className="material-symbols-outlined text-xl">smart_toy</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-[rgba(0,0,0,0.2)]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed bottom-24 right-6 z-40 w-[360px] sm:w-[380px] max-w-[calc(100vw-2rem)] h-[430px] border border-[var(--color-divider)] bg-white shadow-[0_20px_45px_rgba(15,15,40,0.35)] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-divider)] bg-[var(--color-surface-variant)]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[var(--color-primary)]">smart_toy</span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold tracking-wide">Kevin AI 助理</span>
                <span className="text-[10px] text-[#6b6371]">一般回覆時間數秒內</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-[#6b6371] hover:text-[#1f1d30] transition-colors"
                  aria-label="清除對話"
                  title="清除對話"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[#6b6371] hover:text-[#1f1d30] transition-colors"
                aria-label="關閉 AI 助理"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          </div>

          {/* Form or Messages */}
          {showForm ? (
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm bg-[var(--color-page)]">
              {formToast.show && (
                <div className={`px-3 py-2 text-xs border ${
                  formToast.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      {formToast.type === 'success' ? 'check_circle' : 'error'}
                    </span>
                    <span>{formToast.message}</span>
                  </div>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-[#1f1d30]">
                    {i18n.language === 'en' ? 'Quick Contact Form' : '快速聯繫表單'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-[#6b6371] hover:text-[#1f1d30] transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 text-xs border border-[var(--color-divider)] bg-white text-[#1f1d30] outline-none focus:border-[var(--color-primary)]"
                      placeholder={i18n.language === 'en' ? 'Company (Optional)' : '公司名稱（選填）'}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 text-xs border border-[var(--color-divider)] bg-white text-[#1f1d30] outline-none focus:border-[var(--color-primary)]"
                      placeholder={i18n.language === 'en' ? 'Your Name *' : '您的姓名 *'}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 text-xs border border-[var(--color-divider)] bg-white text-[#1f1d30] outline-none focus:border-[var(--color-primary)]"
                      placeholder={i18n.language === 'en' ? 'Position/Role (Optional)' : '職位/角色（選填）'}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 text-xs border border-[var(--color-divider)] bg-white text-[#1f1d30] outline-none focus:border-[var(--color-primary)]"
                      placeholder={i18n.language === 'en' ? 'Email *' : '電子郵件 *'}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 py-2 text-xs border border-[var(--color-divider)] bg-white text-[#1f1d30] outline-none focus:border-[var(--color-primary)]"
                      placeholder={i18n.language === 'en' ? 'Subject *' : '主題 *'}
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 text-xs border border-[var(--color-divider)] bg-white text-[#1f1d30] outline-none focus:border-[var(--color-primary)] resize-none"
                      placeholder={i18n.language === 'en' ? 'Message *' : '訊息內容 *'}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-3 py-2 text-xs bg-[var(--color-primary)] text-white border border-[var(--color-primary)] font-semibold disabled:opacity-60 transition-colors"
                  >
                    {isSubmitting 
                      ? (i18n.language === 'en' ? 'Sending...' : '發送中...')
                      : (i18n.language === 'en' ? 'Send Message' : '發送訊息')
                    }
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm bg-[var(--color-page)]">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-xs text-[#6b6371]">
                  {i18n.language === 'en' 
                    ? 'You can ask about: projects, technologies, personal background, how to contact Kevin, etc.'
                    : '可以詢問：作品技術、個人簡歷、如何聯絡 Kevin 等問題。'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(i18n.language === 'en' ? QUICK_QUESTIONS_EN : QUICK_QUESTIONS_ZH).map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickQuestion(q)}
                      className="px-3 py-1.5 text-xs border border-[var(--color-divider)] bg-white text-[#1f1d30] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="px-3 py-1.5 text-xs border border-[var(--color-primary)] bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors font-semibold"
                  >
                    {i18n.language === 'en' ? 'Quick Contact' : '快速聯繫'}
                  </button>
                </div>
              </div>
            )}
            {messages.map((m, idx) => {
              const isLastAssistant = m.role === 'assistant' && idx === messages.length - 1
              const displayText = isLastAssistant && m.isTyping ? typingText : m.content
              
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[var(--color-primary)] text-white text-xs">
                      <span className="material-symbols-outlined text-sm">smart_toy</span>
                    </div>
                  )}
                  <div className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                    <div
                      className={`px-3 py-2.5 text-xs leading-relaxed break-words ${
                        m.role === 'user'
                          ? 'bg-[var(--color-primary)] text-white'
                          : 'bg-white text-[#1f1d30] border border-[var(--color-divider)]'
                      }`}
                      style={{
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {displayText}
                      {isLastAssistant && m.isTyping && typingText.length < m.content.length && (
                        <span className="inline-block w-1 h-3 ml-1 bg-[var(--color-primary)] animate-pulse" />
                      )}
                    </div>
                  </div>
                  {m.role === 'user' && (
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[var(--color-surface-variant)] text-[#1f1d30] text-xs">
                      <span className="material-symbols-outlined text-sm">person</span>
                    </div>
                  )}
                </div>
              )
            })}
            {isLoading && (
              <div className="flex items-start gap-2 text-xs text-[#6b6371]">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[var(--color-primary)] text-white">
                  <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{i18n.language === 'en' ? 'AI is thinking...' : 'AI 正在思考中...'}</span>
                </div>
              </div>
            )}
            </div>
          )}

          {/* Input */}
          {!showForm && (
            <div className="border-t border-[var(--color-divider)] px-3 py-2 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-3 py-2 text-xs border border-[var(--color-divider)] bg-white text-[#1f1d30] outline-none focus:border-[var(--color-primary)] focus:ring-0 placeholder-[#9b92a4] transition-colors duration-200"
                  placeholder={i18n.language === 'en' ? 'Type a message...' : '輸入訊息...'}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isLoading}
                  className="px-3 py-1 border border-[var(--color-primary)] text-[var(--color-primary)] text-xs font-semibold tracking-wide disabled:opacity-60"
                >
                  {i18n.language === 'en' ? 'Send' : '送出'}
                </button>
              </div>
            </div>
          )}
        </div>
        </>
      )}
    </>
  )
}


