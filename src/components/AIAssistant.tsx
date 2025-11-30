'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STORAGE_KEY = 'ai-assistant-messages'
const DEFAULT_MESSAGE: Message = {
  role: 'assistant',
  content: '您好！我是您的 AI 助理，有什麼可以幫助您的嗎？'
}

const QUICK_QUESTIONS = [
  'Kevin 的技能有哪些？',
  '可以介紹一下作品集嗎？',
  '如何聯繫 Kevin？',
  'Kevin 的專業背景是什麼？',
  '有哪些專案可以查看？'
]

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([DEFAULT_MESSAGE])
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
          setMessages(parsed)
        }
      } catch (error) {
        console.error('載入對話歷史失敗:', error)
      }
    }
  }, [])

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
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          stream: true
        }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) {
        let errorMessage = '請求失敗'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          const errorText = await response.text()
          errorMessage = errorText || errorMessage
        }
        throw new Error(errorMessage)
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
          content: error.message || '抱歉，發生錯誤。請稍後再試。'
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
    setMessages([DEFAULT_MESSAGE])
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-[var(--color-primary)] text-white border-2 border-[var(--color-primary)] shadow-[var(--shadow-md)] transition-all duration-200 hover:bg-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)] hover:shadow-[var(--shadow-lg)] active:scale-95"
          aria-label="開啟 AI 助理"
        >
          <span className="material-symbols-outlined text-2xl">
            smart_toy
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-40 w-[calc(100vw-3rem)] sm:w-[90vw] sm:max-w-md h-[calc(100vh-8rem)] sm:h-[600px] md:h-[700px] max-h-[85vh] flex flex-col bg-[var(--color-surface)] border-2 border-[var(--color-divider)] shadow-[var(--shadow-lg)]">
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-divider)] bg-[var(--color-surface-variant)]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--color-primary)]">
                smart_toy
              </span>
              <h3 className="font-semibold text-lg">AI 助理</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors"
                aria-label="清除對話"
              >
                <span className="material-symbols-outlined text-sm">
                  delete_outline
                </span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors"
                aria-label="關閉"
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
              <div className="text-xs text-[var(--color-text-muted)] mb-2 font-medium">快捷問題：</div>
              <div className="flex flex-wrap gap-2">
                {QUICK_QUESTIONS.map((question, index) => (
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
                placeholder="輸入訊息..."
                disabled={isLoading || isStreaming}
                className="flex-1 px-4 py-2 bg-white border border-[var(--color-divider)] text-[rgb(var(--foreground-rgb))] focus:outline-none focus:border-[var(--color-primary)] disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading || isStreaming || !input.trim()}
                className="px-4 py-2 bg-[var(--color-primary)] text-white border-2 border-[var(--color-primary)] transition-all duration-200 hover:bg-[var(--color-primary-dark)] hover:border-[var(--color-primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="發送"
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


