'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useTranslationSafe } from '../hooks/useTranslationSafe'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'ai-assistant-messages'

const DEFAULT_MESSAGES = {
  zh: {
    role: 'assistant' as const,
    content: '[SUGGESTION_BUTTONS]'
  },
  en: {
    role: 'assistant' as const,
    content: '[SUGGESTION_BUTTONS]'
  }
}

const QUICK_QUESTIONS = {
  zh: [
    'Kevin 的核心技能是什麼？',
    '可以介紹一下作品集嗎？',
    'Kevin 有哪些專案經驗？',
    '如何與 Kevin 安排面試？'
  ],
  en: [
    'What are Kevin\'s core skills?',
    'Can you introduce the portfolio?',
    'What project experience does Kevin have?',
    'How to schedule an interview with Kevin?'
  ]
}

const SYSTEM_PROMPT = `您是 Kevin（陳梓敬）個人網站的專屬 AI 招募助理。您的核心使命是協助 HR 和招聘方快速評估 Kevin 是否符合職缺需求，並引導他們透過「低摩擦力聯繫表單」直接發送面試邀約。

以下是 Kevin 的個人資訊：

【基本資訊】
- 姓名：陳梓敬 (Kevin)
- 畢業學校：吳鳳科技大學
- 專業領域：以使用者為中心的數位體驗設計
- 求職狀態：積極尋找全職機會，可快速到職

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
1. LINE BOT - 運用 TypeScript 與 Express 打造的 LINE 聊天機器人，整合 AI 協作功能，提供智能對話服務（技術：TypeScript, Express, AI協作）
2. ChefAI - 運用 Vue 與 Vite 打造 AI 食譜生成平台，提供智能食譜推薦與生成功能（技術：Vue, Vite, AI協作）
3. AI老師 - 運用 Vue 與 Vite 打造 AI 教學助手平台，提供智能學習輔助功能（技術：Vue, Vite, AI協作）
4. SumVid - 讓 AI 為您快速提取影片重點（技術：HTML, CSS, JavaScript, Chrome Extension API, AI協作）
5. Discord AI Bot - 運用 Python 打造的 Discord AI 聊天機器人，提供智能對話服務（技術：Python, AI協作）
6. AcadAI - AI 自動幫你整理商品重點（技術：HTML, CSS, JavaScript, Chrome Extension API, AI協作）
7. 臺灣氣象AI助手 - 查詢天氣與 AI 問答（技術：HTML, CSS, JavaScript, Chrome Extension API, AI協作）
8. DJKridP - 受國際知名 DJ 委託開發的官方品牌網站，整合多國巡演資訊與社群媒體，展現跨文化協作與前端開發能力（技術：HTML, CSS, JavaScript, Express, AI協作）

【相關經驗】
- 語言能力：中文（母語）、英文（中級）
- 證照認證：Adobe Photoshop 國際認證、Adobe Dreamweaver 國際認證
- 課外活動：
  * 校園專題競賽第三名（2023年）- 運用設計思維與技術能力獲得佳績
  * 學生會資訊職務（2022年-2025年）- 負責文書處理、活動規劃、園遊會攤位規劃、校園演唱會籌備

【網站功能】
- 網站包含：首頁、關於我、作品集、技能、經驗、聯繫我等區塊
- 訪客可以下載履歷（目前提供繁體中文版本）
- 可以通過「低摩擦力聯繫表單」快速發送面試邀約或其他諮詢

【版權保護與專業細節】
Kevin 的作品集網站採用 **DMCA.com 國際版權保護服務**，展現對智慧財產權的重視：

- **保護狀態**：Active（已啟動並完成網域驗證）
- **保護證書**：https://www.dmca.com/r/l1wqqed
- **徽章位置**：網站 Footer 顯示綠色 DMCA Protection 徽章
- **意義與價值**：
  * DMCA（Digital Millennium Copyright Act，數位千禧年著作權法）是國際認可的版權保護標準
  * 保護範圍包括網站設計、代碼、專案截圖和所有原創內容
  * 在台灣前端工程師中並不常見（前 5-10%），是差異化優勢
  * 體現 Kevin 的細節處理能力、專業態度和國際視野

如果訪客詢問 DMCA 或版權相關問題：
- 說明這是國際認可的版權保護標準，展現專業度
- 引導他們點擊 Footer 的綠色徽章查看完整保護證書
- 強調這是差異化優勢（大多數台灣工程師沒有此保護）
- 可說明保護內容包括網站內容、專案截圖、代碼等原創作品

【特殊互動功能】
當用戶詢問以下內容時，請在回應中包含對應的特殊標記（標記會被自動轉換為互動按鈕）：
- 詢問下載履歷、查看履歷、履歷檔案時：在回應中加入 [DOWNLOAD_RESUME_ZH] 標記
- 詢問查看作品集、專案作品時：在回應中加入 [VIEW_PORTFOLIO] 標記  
- 詢問如何聯繫、聯絡方式、發送面試邀約時：在回應中加入 [CONTACT_FORM] 標記

範例回應：
- 中文："您可以直接下載 Kevin 的履歷查看完整資訊：[DOWNLOAD_RESUME_ZH]"
- 英文："You can download Kevin's resume here: [DOWNLOAD_RESUME_ZH]"

【常見 HR 問題回答指南】
- 專業背景：強調 UI/UX 設計和前端開發的雙重技能，以及以使用者為中心的設計思維
- 技術能力：重點說明 React、Next.js、TypeScript 等核心技術的熟練程度
- 作品集：可以詳細介紹相關專案，說明技術應用和設計理念
- 工作經驗：目前為應屆畢業生，具備完整的學術背景和實務專案經驗
- 軟技能：強調團隊協作、問題解決、持續學習等能力
- 可到職時間：Kevin 目前可快速到職，具體時間建議透過聯繫表單與 Kevin 確認
- 語言能力：中文母語，英文中級，可進行基本的英文溝通
- 薪資期望：建議 HR 透過聯繫表單直接與 Kevin 討論

【回答原則】
1. 以專業、友善且親切的語氣回答，展現 Kevin 的良好溝通能力
2. 優先回答與 Kevin 專業背景、技能、作品、經驗相關的招聘問題
3. 針對 HR 常見問題（如技能匹配、專案經驗、團隊協作能力等）提供詳細且具體的回答
4. 如果問題超出 Kevin 的個人資訊範圍，禮貌地引導詢問者通過聯繫表單直接聯繫 Kevin
5. 強調 Kevin 的優勢：UI/UX 設計與前端開發的結合、與 AI 協作的經驗、持續學習的能力
6. 【重要】語言回應規則（最高優先級）：
   - 如果用戶使用英文提問，請用英文回答，禁止使用任何中文
   - 如果用戶使用繁體中文或簡體中文提問，請用繁體中文回答，禁止使用任何英文
   - 自動檢測用戶輸入的語言，並使用相同語言回應
   - 保持專業且自然的語言風格
   - 嚴格遵守：用戶用什麼語言提問，就用什麼語言回答，絕對不要混用語言
   - 這是強制性規則，違反此規則即為錯誤回應

【低摩擦力聯繫表單推廣策略】
- 當 HR 表達面試意願或詢問聯繫方式時，請主動告知：「Kevin 的網站採用了極簡聯繫設計，您只需要點擊下方的【聯繫表單】按鈕，選擇【面試邀約】標籤並留下您的 Email，Kevin 就會在 24 小時內主動與您聯繫！」
- 強調便利性：「不需要填寫長篇訊息，只要選擇標籤即可！」
- 如果 HR 詢問「如何快速聯繫 Kevin」，請直接推薦使用 [CONTACT_FORM] 標記，並說明這是最快速的方式

【回答風格】
- 專業但親和：展現 Kevin 的專業能力，同時保持友善的溝通風格
- 具體且詳細：提供具體的技術細節和專案經驗，而非泛泛而談
- 誠實且透明：如實回答 Kevin 的經驗和能力水平
- 導向行動：適時引導 HR 查看作品集、下載履歷或通過聯繫表單聯繫
- 主動推銷：當 HR 顯示出興趣時，主動提及「Kevin 目前正在積極尋找機會」，並鼓勵他們使用低摩擦力聯繫表單

【回答格式要求】
請使用以下 Markdown 格式來美化回應，提升可讀性：

1. 使用**粗體**來強調重點關鍵字
2. 列表：使用「- 項目」或「1. 項目」來呈現技能、經驗、作品等列表，多個項目時務必使用列表格式
3. 程式碼與技術：提到技術名稱時使用反引號包裹（例如 React、TypeScript）
4. 引用與重點：使用「> 引用」格式來標示重要提醒或建議
5. 段落與換行：使用空行來分隔不同主題的段落，保持回應結構清晰
6. 互動按鈕：在適當位置加入特殊標記 [DOWNLOAD_RESUME_ZH]、[VIEW_PORTFOLIO]、[CONTACT_FORM]
7. 禁止使用【標題】格式，直接用自然段落和粗體來組織內容

範例回應格式：

Kevin 是一位結合 **UI/UX 設計** 與 **前端開發** 的全方位人才，具備以下特色：

- 精通 React、Next.js、TypeScript 等現代前端技術（使用反引號包裹技術名稱）
- 擅長與 AI 協作，提升開發效率
- 注重使用者體驗，創造直觀美觀的介面

> Kevin 目前正在積極尋找全職機會，可快速到職

如果您想進一步了解 Kevin 的作品，歡迎查看他的作品集：[VIEW_PORTFOLIO]

請嚴格遵守以上格式要求，讓每個回應都具備良好的視覺層次與可讀性。

請根據以上資訊，以專業且友善的態度協助 HR 和招聘方了解 Kevin，並積極引導他們透過聯繫表單發送面試邀約。`

export default function AIAssistant() {
  const { i18n } = useTranslationSafe()
  const currentLanguage = (i18n?.language || 'zh') as 'zh' | 'en'
  
  const getDefaultMessage = (): Message => DEFAULT_MESSAGES[currentLanguage] || DEFAULT_MESSAGES.zh
  const getQuickQuestions = (): string[] => QUICK_QUESTIONS[currentLanguage] || QUICK_QUESTIONS.zh
  
  const [isOpen, setIsOpen] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [messages, setMessages] = useState<Message[]>([getDefaultMessage()])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const parentRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const messageRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  const handleOpen = () => {
    setIsOpen(true)
    setShowBubble(false)
    window.history.pushState(null, '', '#ai-chat')
  }

  const handleClose = () => {
    setIsOpen(false)
    if (window.location.hash === '#ai-chat') {
      window.history.pushState(null, '', window.location.pathname)
    }
  }

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      const message = messages[index]
      if (!message) return 120
      const ref = messageRefs.current.get(index)
      if (ref) {
        return Math.max(ref.offsetHeight + 24, 100)
      }
      const contentLength = message.content.length
      const estimatedLines = Math.ceil(contentLength / 50)
      return Math.max(100, estimatedLines * 24 + 104)
    },
    overscan: 3,
    measureElement: (element) => element?.getBoundingClientRect().height ?? 100,
  })

  const scrollToBottom = () => {
    try {
      if (messages.length > 0) {
        virtualizer.scrollToIndex(messages.length - 1, {
          align: 'end',
          behavior: 'smooth',
        })
      }
    } catch (error) {
      console.error('Error scrolling to bottom:', error)
    }
  }

  const detectLanguage = (text: string): 'zh' | 'en' => {
    const englishPattern = /[a-zA-Z]/g
    const chinesePattern = /[\u4e00-\u9fa5]/g
    const englishMatches = (text.match(englishPattern) || []).length
    const chineseMatches = (text.match(chinesePattern) || []).length
    
    if (englishMatches > 0 && englishMatches >= chineseMatches * 2) {
      return 'en'
    }
    if (chineseMatches > 0) {
      return 'zh'
    }
    return englishMatches > 0 ? 'en' : 'zh'
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowBubble(true)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#ai-chat') {
        setIsOpen(true)
      } else if (isOpen) {
        setIsOpen(false)
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
    if (window.location.hash === '#ai-chat') {
      setIsOpen(true)
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [isOpen])

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
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        try {
          virtualizer.measure()
          scrollToBottom()
          inputRef.current?.focus()
        } catch (error) {
          console.error('Error in AI Assistant initialization:', error)
        }
      }, 200)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isStreaming && messages.length > 0) {
      try {
        virtualizer.measure()
        const timer = setInterval(() => {
          try {
            virtualizer.measure()
            scrollToBottom()
          } catch (error) {
            console.error('Error in streaming update:', error)
          }
        }, 200)
        return () => clearInterval(timer)
      } catch (error) {
        console.error('Error setting up streaming:', error)
      }
    }
  }, [isStreaming, messages.length])

  useEffect(() => {
    if (messages.length > 0) {
      try {
        virtualizer.measure()
      } catch (error) {
        console.error('Error measuring messages:', error)
      }
    }
  }, [messages])

  const handleSend = async (question?: string) => {
    const messageContent = question || input.trim()
    if (!messageContent || isLoading || isStreaming) return

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
      const userLanguage = detectLanguage(messageContent)
      const languageInstruction = userLanguage === 'en'
        ? '\n\n【CRITICAL LANGUAGE RULE - HIGHEST PRIORITY】You MUST respond in English ONLY. The user asked in English, so you must respond in English. Do not use Chinese or any other language. Respond in clear, professional English. If you use any Chinese characters, you have violated this rule.'
        : '\n\n【重要語言規則 - 最高優先級】您必須且只能使用繁體中文回答。用戶使用中文提問，請絕對只用繁體中文回答。禁止使用英文、簡體中文或其他語言。使用清晰、專業的繁體中文回答。如果您使用任何英文單詞或簡體中文，即違反此規則。這是強制性要求，必須嚴格遵守。'
      
      const dynamicSystemPrompt = SYSTEM_PROMPT + languageInstruction
      
      const messagesWithSystem = [
        {
          role: 'system' as const,
          content: dynamicSystemPrompt
        },
        ...updatedMessages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ]

      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: messagesWithSystem,
          temperature: 1,
          max_tokens: 8192,
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
          try {
            const errorText = await response.text()
            errorMessage = errorText || errorMessage
          } catch (textError) {
            // 忽略讀取文本錯誤
          }
        }
        
        console.error('AI API 錯誤:', {
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
                // 忽略解析錯誤
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


  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const autoResizeTextarea = (el: HTMLTextAreaElement | null) => {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }

  useEffect(() => {
    autoResizeTextarea(inputRef.current)
  }, [input])

  const handleQuickQuestion = (question: string) => {
    handleSend(question)
  }

  const handleClear = () => {
    setMessages([getDefaultMessage()])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[100px] sm:bottom-[120px] right-4 sm:right-6 z-50"
          >
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 20, x: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20, x: 20 }}
                  className="absolute bottom-full right-0 mb-4 cursor-pointer"
                  onClick={handleOpen}
                >
                  <div className="relative bg-white text-[var(--color-text)] px-4 py-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-[var(--color-divider)] whitespace-nowrap group">
                    <div className="flex items-center gap-2">
                      <span className="text-base">👋</span>
                      <p className="text-sm font-bold tracking-tight">
                        {currentLanguage === 'en' 
                          ? "Hi! I'm Kevin's AI" 
                          : "嗨！我是 Kevin 的 AI"}
                      </p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowBubble(false)
                        }}
                        className="ml-1 p-0.5 hover:bg-gray-100 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                        aria-label="Close tooltip"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                    <div className="absolute top-full right-6 w-3 h-3 bg-white border-r border-b border-[var(--color-divider)] transform rotate-45 -translate-y-1.5" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-[var(--color-primary)] text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] hover:bg-[var(--color-primary-dark)] transition-all duration-300 rounded-full"
              aria-label={currentLanguage === 'en' ? 'Open AI Assistant' : '開啟 AI 助理'}
            >
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-[var(--color-primary)] rounded-full -z-10"
              />
              <span className="material-symbols-outlined text-2xl sm:text-3xl">
                smart_toy
              </span>
              <span className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full animate-pulse"></span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 sm:inset-auto sm:bottom-[120px] sm:right-6 z-[60] w-full h-full sm:w-[380px] md:w-[420px] sm:h-[550px] md:h-[650px] sm:max-h-[85vh] flex flex-col bg-white border-0 sm:border border-[var(--color-divider)] shadow-none sm:shadow-[0_20px_60px_rgba(0,0,0,0.12)] rounded-none sm:rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
          <div className="relative flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-[var(--color-divider)] bg-[var(--color-primary)]">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/20 rounded-xl">
                  <span className="material-symbols-outlined text-white text-xl sm:text-2xl">
                    smart_toy
                  </span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-bold text-white text-base sm:text-lg tracking-tight">
                  {currentLanguage === 'en' ? 'AI Assistant' : 'AI 助理'}
                </h3>
                <span className="text-[10px] sm:text-xs text-white/80">
                  {currentLanguage === 'en' ? 'Always here to help' : '隨時為您服務'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={handleClear}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-white/20 transition-all duration-200 rounded-xl"
                aria-label={currentLanguage === 'en' ? 'Clear conversation' : '清除對話'}
              >
                <span className="material-symbols-outlined text-white text-lg sm:text-xl">
                  delete_outline
                </span>
              </button>
              <button
                onClick={handleClose}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-white/20 transition-all duration-200 rounded-xl"
                aria-label={currentLanguage === 'en' ? 'Close' : '關閉'}
              >
                <span className="material-symbols-outlined text-white text-lg sm:text-xl">
                  close
                </span>
              </button>
            </div>
          </div>

          <div 
            ref={parentRef}
            className="flex-1 overflow-y-auto scroll-smooth"
            style={{ 
              contain: 'strict',
              overscrollBehavior: 'contain',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
            onWheel={(e) => {
              const element = e.currentTarget
              const { scrollTop, scrollHeight, clientHeight } = element
              const isAtTop = scrollTop === 0
              const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
              
              if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                e.stopPropagation()
              }
            }}
            onTouchMove={(e) => {
              const element = e.currentTarget
              const { scrollTop, scrollHeight, clientHeight } = element
              const isAtTop = scrollTop === 0
              const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
              
              if (isAtTop || isAtBottom) {
                e.stopPropagation()
              }
            }}
          >
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
              }}
            >
              {(virtualizer.getVirtualItems() || []).map((virtualItem) => {
                const message = messages[virtualItem.index]
                if (!message) return null

                return (
                  <div
                    key={virtualItem.key}
                    ref={(el) => {
                      if (el) {
                        messageRefs.current.set(virtualItem.index, el)
                        virtualizer.measureElement(el)
                      } else {
                        messageRefs.current.delete(virtualItem.index)
                      }
                    }}
                    data-index={virtualItem.index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualItem.start}px)`,
                    }}
                  >
                    <div
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-1.5 sm:gap-2`}
                      style={{ marginBottom: '12px' }}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full shadow-md">
                          <span className="material-symbols-outlined text-sm sm:text-base">
                            smart_toy
                          </span>
                        </div>
                      )}
                      <div
                        className={`inline-block ${
                          message.role === 'user'
                            ? 'bg-[var(--color-primary)] text-white rounded-2xl rounded-br-md'
                            : 'bg-[var(--color-surface-variant)] text-[var(--color-text)] border border-[var(--color-divider)] rounded-2xl rounded-bl-md'
                        }`}
                        style={{
                          padding: '10px 12px',
                          maxWidth: '70%',
                          lineHeight: '1.35',
                          fontSize: '15px',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                          boxShadow: message.role === 'assistant' ? '0 1px 0 rgba(0,0,0,0.04) inset' : 'none',
                        }}
                      >
                      <div 
                        style={{
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          overflow: 'visible',
                        }}
                      >
                    {message.role === 'assistant' && message.content === '[SUGGESTION_BUTTONS]' ? (
                      <div className="space-y-2">
                        {(getQuickQuestions() || []).map((question, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickQuestion(question)}
                            disabled={isLoading || isStreaming}
                            className="w-full px-4 py-3 text-sm text-left bg-white border border-[var(--color-divider)] text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:border-[var(--color-primary)] hover:shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] rounded-xl font-medium"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    ) : message.role === 'assistant' ? (() => {
                      const formatText = (text: string) => {
                        let formatted = text
                        
                        formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                        formatted = formatted.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, '<em>$1</em>')
                        formatted = formatted.replace(/`([^`\n]+?)`/g, '<strong>$1</strong>')
                        formatted = formatted.replace(/(https?:\/\/[^\s<>"']+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-link">$1</a>')
                        
                        formatted = formatted.replace(/\[DOWNLOAD_RESUME_ZH\]/g, 
                          '<a href="/陳梓敬_履歷.pdf" download="陳梓敬_履歷.pdf" style="color: var(--color-primary); text-decoration: underline; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';">' + (currentLanguage === 'en' ? 'Download Resume' : '下載履歷') + '</a>')
                        
                        formatted = formatted.replace(/\[VIEW_PORTFOLIO\]/g, 
                          '<a onclick="document.getElementById(\'portfolio\')?.scrollIntoView({behavior: \'smooth\'})" style="color: var(--color-primary); text-decoration: underline; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';">' + (currentLanguage === 'en' ? 'View Portfolio' : '查看作品集') + '</a>')
                        
                        formatted = formatted.replace(/\[CONTACT_FORM\]/g, 
                          '<a onclick="document.getElementById(\'contact\')?.scrollIntoView({behavior: \'smooth\'})" style="color: var(--color-primary); text-decoration: underline; transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.opacity=\'0.7\';" onmouseout="this.style.opacity=\'1\';">' + (currentLanguage === 'en' ? 'Contact Form' : '聯繫表單') + '</a>')
                        
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
                        <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center bg-[var(--color-primary-dark)] text-white rounded-full shadow-md">
                          <span className="material-symbols-outlined text-sm sm:text-base">
                            person
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            {(isLoading || isStreaming) && (
              <div className="flex justify-start items-end gap-1.5 sm:gap-2 mb-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 flex items-center justify-center bg-[var(--color-primary)] text-white rounded-full shadow-md">
                  <span className="material-symbols-outlined text-sm sm:text-base">
                    smart_toy
                  </span>
                </div>
                <div className="bg-[var(--color-surface-variant)] border border-[var(--color-divider)] px-4 sm:px-5 py-2.5 sm:py-3 rounded-[18px] sm:rounded-[20px] rounded-bl-md shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--color-primary)] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 sm:p-4 border-t border-[var(--color-divider)] bg-white">
            <div className="flex gap-2 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={currentLanguage === 'en' ? 'Type your message... (Shift+Enter for new line)' : '輸入訊息...（Shift+Enter 換行）'}
                disabled={isLoading || isStreaming}
                rows={1}
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 text-[15px] bg-[var(--color-surface-variant)] border border-[var(--color-divider)] text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[var(--color-primary)] disabled:opacity-50 rounded-xl resize-none overflow-auto transition-all duration-200"
                style={{
                  minHeight: '38px',
                  maxHeight: '180px',
                  lineHeight: '1.35',
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || isStreaming || !input.trim()}
                className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center font-semibold"
                aria-label={currentLanguage === 'en' ? 'Send' : '發送'}
              >
                <span className="material-symbols-outlined text-xl">
                  send
                </span>
              </button>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


