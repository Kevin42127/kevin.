'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'ai-assistant-messages'

const DEFAULT_MESSAGES = {
  zh: {
    role: 'assistant' as const,
    content: '您好！我是 Kevin 的 AI 助理，可以協助您快速了解 Kevin 的專業背景、技能、作品集和職涯資訊。請問有什麼想了解的嗎？'
  },
  en: {
    role: 'assistant' as const,
    content: 'Hello! I am Kevin\'s AI assistant. I can help you quickly understand Kevin\'s professional background, skills, portfolio, and career information. What would you like to know?'
  }
}

const QUICK_QUESTIONS = {
  zh: [
    'Kevin 的核心技能是什麼？',
    'Kevin 有哪些前端開發經驗？',
    '可以介紹一下 Kevin 的作品集嗎？',
    'Kevin 的專業背景和學歷？',
    'Kevin 有哪些專案經驗？'
  ],
  en: [
    'What are Kevin\'s core skills?',
    'What frontend development experience does Kevin have?',
    'Can you introduce Kevin\'s portfolio?',
    'What is Kevin\'s professional background and education?',
    'What project experience does Kevin have?'
  ]
}

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

const SYSTEM_PROMPT = `您是 Kevin（陳梓敬）個人網站的專屬 AI 助理。您的職責是協助 HR 和招聘方快速了解 Kevin 的專業背景、技能、作品集和職涯相關資訊。

以下是 Kevin 的個人資訊：

【基本資訊】
- 姓名：陳梓敬 (Kevin)
- 畢業學校：吳鳳科技大學數位科技與媒體設計系
- 專業領域：以使用者為中心的數位體驗設計

【核心技能】
- UI/UX 設計：專注於使用者體驗設計，創造直觀且美觀的介面
- 產品設計：專注於需求分析與產品規劃，將想法轉化為可行的數位解決方案
- 品質控制：透過系統性測試確保產品穩定性，優化使用者體驗
- 與AI協作：善於運用AI工具提升工作效率，具備良好的AI協作經驗

【技術技能】
前端開發：React (90%), Next.js (85%), TypeScript (80%), JavaScript (95%), HTML/CSS (95%), Tailwind CSS (90%)
設計技能：UI/UX Design (80%), Responsive Design (90%), Prototyping (75%), Figma (75%), Design Systems (70%), User Research (60%)
工具與平台：GitHub (85%), Vercel (80%), VS Code (90%), Node.js (75%), Express (70%), REST API (80%)
軟技能：團隊協作 (85%), 問題解決 (90%), 溝通表達 (80%), 持續學習 (95%), 創意思考 (85%), 時間管理 (80%)

【作品集】
1. AuthPrototype - 第一個完整前端專案，學習 Angular/Tailwindcss 基礎，建立登入/註冊的原型設計
2. 天氣儀表板 - 學習 API 整合的專案，掌握外部數據獲取和現代化 UI 設計
3. TaskBlue - React 狀態管理練習專案，學習複雜組件間的數據流管理
4. ResumeCraft - 履歷生成器
5. TinyLink - 後端概念學習專案，理解數據庫設計、API 開發和部署流程
6. Kevin. - 個人網站 - 綜合技能展示專案，整合所學技術打造個人品牌網站
7. DevKit - 開發者工具大全 - 精選 100+ 開發者工具的一站式網站
8. Virid - CSS 網格佈局 - 以 CSS Grid 佈局實作的單頁網站
9. AI ToolLaboratory - AI 工具集合 - 蒐集實用 AI 工具與連結的索引站

【相關經驗】
- 語言能力：中文（母語）、英文（中級）
- 證照認證：Adobe Photoshop 國際認證、Adobe Dreamweaver 國際認證
- 課外活動：
  * 校園專題競賽第三名（2023年）- 運用設計思維與技術能力獲得佳績
  * 學生會資訊職務（2022年-2025年）- 負責文書處理、活動規劃、園遊會攤位規劃、校園演唱會籌備

【網站功能】
- 網站包含：首頁、關於我、作品集、技能、經驗、聯繫我等區塊
- 訪客可以下載履歷（支援繁體中文和英文版本）
- 可以通過聯繫表單發送訊息給 Kevin

【常見 HR 問題回答指南】
- 專業背景：強調 UI/UX 設計和前端開發的雙重技能，以及以使用者為中心的設計思維
- 技術能力：重點說明 React、Next.js、TypeScript 等核心技術的熟練程度
- 作品集：可以詳細介紹相關專案，說明技術應用和設計理念
- 工作經驗：目前為應屆畢業生，具備完整的學術背景和實務專案經驗
- 軟技能：強調團隊協作、問題解決、持續學習等能力
- 可到職時間：建議詢問者直接透過聯繫表單與 Kevin 確認
- 語言能力：中文母語，英文中級，可進行基本的英文溝通

【回答原則】
1. 以專業、友善且親切的語氣回答，展現 Kevin 的良好溝通能力
2. 優先回答與 Kevin 專業背景、技能、作品、經驗相關的招聘問題
3. 針對 HR 常見問題（如技能匹配、專案經驗、團隊協作能力等）提供詳細且具體的回答
4. 如果問題超出 Kevin 的個人資訊範圍，禮貌地引導詢問者通過聯繫表單直接聯繫 Kevin
5. 強調 Kevin 的優勢：UI/UX 設計與前端開發的結合、與 AI 協作的經驗、持續學習的能力
6. 【重要】語言回應規則：
   - 如果用戶使用英文提問，請用英文回答
   - 如果用戶使用繁體中文或簡體中文提問，請用繁體中文回答
   - 自動檢測用戶輸入的語言，並使用相同語言回應
   - 保持專業且自然的語言風格

【回答風格】
- 專業但親和：展現 Kevin 的專業能力，同時保持友善的溝通風格
- 具體且詳細：提供具體的技術細節和專案經驗，而非泛泛而談
- 誠實且透明：如實回答 Kevin 的經驗和能力水平
- 導向行動：適時引導 HR 查看作品集、下載履歷或通過聯繫表單聯繫

請根據以上資訊，以專業且友善的態度協助 HR 和招聘方了解 Kevin。`

export default function AIAssistant() {
  const { i18n } = useTranslationSafe()
  const currentLanguage = (i18n?.language || 'zh') as 'zh' | 'en'
  
  const getDefaultMessage = (): Message => DEFAULT_MESSAGES[currentLanguage]
  const getQuickQuestions = (): string[] => QUICK_QUESTIONS[currentLanguage]
  
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([getDefaultMessage()])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY)
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages)
        if (Array.isArray(parsed) && parsed.length > 0) {
          const firstMessage = parsed[0]
          const isDefaultMessage = 
            firstMessage.role === 'assistant' && 
            (firstMessage.content === DEFAULT_MESSAGES.zh.content || 
             firstMessage.content === DEFAULT_MESSAGES.en.content)
          
          if (isDefaultMessage) {
            parsed[0] = DEFAULT_MESSAGES[currentLanguage]
            setMessages(parsed)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
          } else {
            setMessages(parsed)
          }
        } else {
          setMessages([DEFAULT_MESSAGES[currentLanguage]])
        }
      } catch (error) {
        console.error('載入對話歷史失敗:', error)
        setMessages([DEFAULT_MESSAGES[currentLanguage]])
      }
    } else {
      setMessages([DEFAULT_MESSAGES[currentLanguage]])
    }
  }, [currentLanguage])

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [messages, isOpen, isStreaming])

  const handleSend = async (question?: string) => {
    const messageContent = question || input.trim()
    if (!messageContent || isLoading || isStreaming) return

    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY
    if (!apiKey) {
      console.error('NEXT_PUBLIC_GROQ_API_KEY 環境變數未設置')
      const errorMessage: Message = {
        role: 'assistant',
        content: currentLanguage === 'en' 
          ? 'AI service is not configured. Please contact the administrator.'
          : 'AI 服務未配置，請聯繫管理員'
      }
      setMessages(prev => [...prev, errorMessage])
      return
    }

    const userMessage: Message = {
      role: 'user',
      content: messageContent
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    setIsStreaming(true)

    abortControllerRef.current = new AbortController()

    try {
      // 組合消息，包含 system prompt
      const messagesWithSystem = [
        {
          role: 'system' as const,
          content: SYSTEM_PROMPT
        },
        ...updatedMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ]

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: messagesWithSystem,
          temperature: 0.9,
          max_tokens: 4096,
          top_p: 1,
          stream: true,
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        let errorMessage = '請求失敗'
        try {
          const errorData = await response.json()
          if (errorData.error?.message) {
            errorMessage = errorData.error.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
        } catch (e) {
          const errorText = await response.text()
          errorMessage = errorText || errorMessage
        }
        
        console.error('Groq API 錯誤:', {
          status: response.status,
          statusText: response.statusText,
          error: errorMessage
        })
        
        throw new Error(errorMessage || 'AI 服務暫時無法使用，請稍後再試')
      }

      const reader = response.body?.getReader()
      
      if (!reader) {
        throw new Error('無法讀取 AI 回應流')
      }

      const decoder = new TextDecoder()
      let accumulatedContent = ''

      const assistantMessage: Message = {
        role: 'assistant',
        content: ''
      }

      setMessages(prev => [...prev, assistantMessage])

      try {
        while (true) {
          const { done, value } = await reader.read()
          
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (!line.trim()) continue
            
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim()
              if (data === '[DONE]') {
                setIsStreaming(false)
                setIsLoading(false)
                return
              }

              try {
                const parsed = JSON.parse(data)
                if (parsed.choices?.[0]?.delta?.content) {
                  accumulatedContent += parsed.choices[0].delta.content
                  setMessages(prev => {
                    const newMessages = [...prev]
                    newMessages[newMessages.length - 1] = {
                      role: 'assistant',
                      content: accumulatedContent
                    }
                    return newMessages
                  })
                }
              } catch (e) {
                // 忽略解析錯誤，可能是空行或其他格式
              }
            }
          }
        }
      } catch (streamError: any) {
        console.error('讀取流式數據錯誤:', streamError)
        throw new Error(`讀取 AI 回應時發生錯誤: ${streamError.message || '未知錯誤'}`)
      }

      // 如果沒有收到任何內容
      if (!accumulatedContent.trim()) {
        throw new Error('AI 沒有返回任何內容')
      }

      setIsStreaming(false)
      setIsLoading(false)
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return
      }
      console.error('發送訊息錯誤:', error)
      
      // 檢查最後一條訊息是否為空的助手訊息，如果是則替換它
      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        const errorMessage: Message = {
          role: 'assistant',
          content: error.message || (currentLanguage === 'en' 
            ? 'Sorry, an error occurred. Please try again later.'
            : '抱歉，發生錯誤。請稍後再試。')
        }
        
        if (lastMessage && lastMessage.role === 'assistant' && lastMessage.content === '') {
          newMessages[newMessages.length - 1] = errorMessage
        } else {
          newMessages.push(errorMessage)
        }
        return newMessages
      })
      
      setIsStreaming(false)
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  const handleQuickQuestion = (question: string) => {
    handleSend(question)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClear = () => {
    setMessages([getDefaultMessage()])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-[120px] right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-[var(--color-primary)] text-white border-2 border-[var(--color-primary)] shadow-[var(--shadow-md)] transition-all duration-200 hover:bg-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)] hover:shadow-[var(--shadow-lg)] active:scale-95 rounded-full"
          aria-label={currentLanguage === 'en' ? 'Open AI Assistant' : '開啟 AI 助理'}
        >
          <span className="material-symbols-outlined text-2xl">
            smart_toy
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-[120px] right-6 z-40 w-[calc(100vw-3rem)] sm:w-[90vw] sm:max-w-md h-[calc(100vh-8rem)] sm:h-[600px] md:h-[700px] max-h-[85vh] flex flex-col bg-[var(--color-surface)] border-2 border-[var(--color-divider)] shadow-[var(--shadow-lg)]">
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-divider)] bg-[var(--color-surface-variant)]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--color-primary)]">
                smart_toy
              </span>
              <h3 className="font-semibold text-lg">
                {currentLanguage === 'en' ? 'AI Assistant' : 'AI 助理'}
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {currentLanguage === 'en' ? 'Online' : '在線中'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors"
                aria-label={currentLanguage === 'en' ? 'Clear conversation' : '清除對話'}
              >
                <span className="material-symbols-outlined text-sm">
                  delete_outline
                </span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors"
                aria-label={currentLanguage === 'en' ? 'Close' : '關閉'}
              >
                <span className="material-symbols-outlined text-sm">
                  close
                </span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-4 space-y-4 scroll-smooth">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-start gap-2`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[var(--color-primary)] text-white">
                    <span className="material-symbols-outlined text-base">
                      smart_toy
                    </span>
                  </div>
                )}
                <div
                  className={`max-w-[85%] ${
                    message.role === 'user'
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-surface-variant)] text-[rgb(var(--foreground-rgb))] border border-[var(--color-divider)]'
                  }`}
                  style={{
                    padding: message.role === 'user' ? '0.75rem 1rem' : '1rem 1.25rem',
                    boxShadow: message.role === 'assistant' ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none',
                  }}
                >
                  <div 
                    className="text-sm leading-relaxed"
                    style={{
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      lineHeight: '1.75',
                    }}
                  >
                    {message.role === 'assistant' ? (() => {
                      const formatText = (text: string) => {
                        let formatted = text
                        
                        formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        formatted = formatted.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>')
                        formatted = formatted.replace(/`([^`\n]+?)`/g, '<code class="inline-code">$1</code>')
                        formatted = formatted.replace(/(https?:\/\/[^\s<>"']+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-link">$1</a>')
                        
                        return formatted
                      }
                      
                      const lines = message.content.split('\n')
                      const processedLines: JSX.Element[] = []
                      let inCodeBlock = false
                      let codeBlockContent: string[] = []
                      let codeBlockLanguage = ''
                      
                      for (let i = 0; i < lines.length; i++) {
                        const line = lines[i]
                        const trimmedLine = line.trim()
                        
                        if (trimmedLine.startsWith('```')) {
                          if (!inCodeBlock) {
                            inCodeBlock = true
                            codeBlockContent = []
                            codeBlockLanguage = trimmedLine.replace('```', '').trim()
                          } else {
                            inCodeBlock = false
                            processedLines.push(
                              <div key={`code-${i}`} className="my-3">
                                <div className="bg-[#1b1d2c] text-[#e5e7eb] p-3 overflow-x-auto">
                                  {codeBlockLanguage && (
                                    <div className="text-xs text-[#9ca3af] mb-2 uppercase tracking-wide">
                                      {codeBlockLanguage}
                                    </div>
                                  )}
                                  <pre className="text-xs leading-relaxed whitespace-pre-wrap break-words font-mono">
                                    <code>{codeBlockContent.join('\n')}</code>
                                  </pre>
                                </div>
                              </div>
                            )
                            codeBlockContent = []
                            codeBlockLanguage = ''
                          }
                          continue
                        }
                        
                        if (inCodeBlock) {
                          codeBlockContent.push(line)
                          continue
                        }
                        
                        if (trimmedLine === '') {
                          processedLines.push(<div key={i} className="h-2" />)
                          continue
                        }
                        
                        if (trimmedLine.startsWith('> ')) {
                          processedLines.push(
                            <div key={i} className="border-l-4 border-[var(--color-primary)] pl-3 py-1.5 my-2 bg-[var(--color-surface)] italic text-[#4a4455]">
                              <span dangerouslySetInnerHTML={{ __html: formatText(trimmedLine.replace(/^>\s*/, '')) }} />
                            </div>
                          )
                          continue
                        }
                        
                        if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ') || trimmedLine.startsWith('* ')) {
                          const content = trimmedLine.replace(/^[-•*]\s*/, '')
                          processedLines.push(
                            <div key={i} className="flex items-start gap-2.5 pl-1">
                              <span className="text-[var(--color-primary)] mt-1.5 font-bold flex-shrink-0">•</span>
                              <span className="flex-1" dangerouslySetInnerHTML={{ __html: formatText(content) }} />
                            </div>
                          )
                          continue
                        }
                        
                        if (trimmedLine.match(/^\d+[\.\)]\s/)) {
                          const match = trimmedLine.match(/^(\d+[\.\)])\s*(.+)/)
                          processedLines.push(
                            <div key={i} className="flex items-start gap-2.5 pl-1">
                              <span className="text-[var(--color-primary)] font-semibold mt-1.5 min-w-[1.75rem] flex-shrink-0">
                                {match?.[1]}
                              </span>
                              <span className="flex-1" dangerouslySetInnerHTML={{ __html: formatText(match?.[2] || trimmedLine.replace(/^\d+[\.\)]\s*/, '')) }} />
                            </div>
                          )
                          continue
                        }
                        
                        if (trimmedLine.startsWith('【') && trimmedLine.endsWith('】')) {
                          processedLines.push(
                            <div key={i} className="font-semibold text-base mt-4 mb-2.5 text-[var(--color-primary)]">
                              {trimmedLine}
                            </div>
                          )
                          continue
                        }
                        
                        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**') && trimmedLine.split('**').length === 3) {
                          processedLines.push(
                            <div key={i} className="font-semibold text-base mt-3 mb-2">
                              {trimmedLine.replace(/\*\*/g, '')}
                            </div>
                          )
                          continue
                        }
                        
                        processedLines.push(
                          <p key={i} className="mb-2 last:mb-0">
                            <span dangerouslySetInnerHTML={{ __html: formatText(line) }} />
                          </p>
                        )
                      }
                      
                      if (inCodeBlock && codeBlockContent.length > 0) {
                        processedLines.push(
                          <div key="code-end" className="my-3">
                            <div className="bg-[#1b1d2c] text-[#e5e7eb] p-3 overflow-x-auto">
                              {codeBlockLanguage && (
                                <div className="text-xs text-[#9ca3af] mb-2 uppercase tracking-wide">
                                  {codeBlockLanguage}
                                </div>
                              )}
                              <pre className="text-xs leading-relaxed whitespace-pre-wrap break-words font-mono">
                                <code>{codeBlockContent.join('\n')}</code>
                              </pre>
                            </div>
                          </div>
                        )
                      }
                      
                      return <div className="space-y-2">{processedLines}</div>
                    })() : (
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    )}
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[var(--color-primary)] text-white">
                    <span className="material-symbols-outlined text-base">
                      person
                    </span>
                  </div>
                )}
              </div>
            ))}
            {(isLoading || isStreaming) && (
              <div className="flex justify-start">
                <div className="bg-[var(--color-surface-variant)] border border-[var(--color-divider)] p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[var(--color-primary)] opacity-60 animate-bounce"></div>
                    <div className="w-2 h-2 bg-[var(--color-primary)] opacity-60 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[var(--color-primary)] opacity-60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 py-3 border-t border-[var(--color-divider)] bg-[var(--color-surface-variant)] max-h-[120px] sm:max-h-none overflow-y-auto">
              <div className="text-xs text-[var(--color-text-muted)] mb-2 font-medium">
                {currentLanguage === 'en' ? 'Quick Questions:' : '快捷問題：'}
              </div>
              <div className="flex flex-wrap gap-2">
                {getQuickQuestions().map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    disabled={isLoading || isStreaming}
                    className="px-3 py-1.5 text-xs bg-white border border-[var(--color-divider)] text-[rgb(var(--foreground-rgb))] hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 whitespace-nowrap"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t border-[var(--color-divider)] bg-[var(--color-surface-variant)]">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={currentLanguage === 'en' ? 'Type a message...' : '輸入訊息...'}
                disabled={isLoading || isStreaming}
                className="flex-1 px-4 py-2 bg-white border border-[var(--color-divider)] text-[rgb(var(--foreground-rgb))] focus:outline-none focus:border-[var(--color-primary)] disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || isStreaming || !input.trim()}
                className="px-4 py-2 bg-[var(--color-primary)] text-white border-2 border-[var(--color-primary)] transition-all duration-200 hover:bg-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label={currentLanguage === 'en' ? 'Send' : '發送'}
              >
                <span className="material-symbols-outlined">
                  send
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


