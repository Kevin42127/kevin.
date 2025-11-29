import { NextRequest, NextResponse } from 'next/server'
import { buildSystemMessage } from '@/lib/ai-knowledge-base'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

function detectLanguage(messages: ChatMessage[]): 'zh' | 'en' {
  if (messages.length === 0) return 'zh'
  
  const lastMessage = messages[messages.length - 1].content
  const chinesePattern = /[\u4e00-\u9fa5]/
  const hasChinese = chinesePattern.test(lastMessage)
  
  return hasChinese ? 'zh' : 'en'
}

export async function POST(req: NextRequest) {
  try {
    const { messages, lang } = (await req.json()) as { 
      messages: ChatMessage[]
      lang?: 'zh' | 'en'
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: '缺少對話內容' }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      console.error('GROQ_API_KEY is missing from process.env')
      return NextResponse.json({ error: '缺少 GROQ_API_KEY 設定。請確認 .env.local 檔案位置和內容。' }, { status: 500 })
    }

    const detectedLang = lang || detectLanguage(messages)
    const systemMessage = {
      role: 'system',
      content: buildSystemMessage(detectedLang)
    }

    const requestBody = {
      model: 'llama-3.1-8b-instant',
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 600,
      top_p: 0.9,
      stream: false
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API Error:', response.status, errorText)
      
      let errorMessage = `AI 回應失敗 (${response.status})`
      try {
        const errorJson = JSON.parse(errorText)
        errorMessage = errorJson.error?.message || errorJson.error || errorMessage
      } catch {
        errorMessage = errorText || errorMessage
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      )
    }

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? ''

    if (!reply) {
      console.error('Groq API returned empty reply:', data)
      return NextResponse.json({ error: 'AI 回應為空' }, { status: 500 })
    }

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('AI Chat API error:', error)
    const errorMessage = error instanceof Error ? error.message : '未知錯誤'
    return NextResponse.json(
      { error: `伺服器錯誤: ${errorMessage}` },
      { status: 500 }
    )
  }
}


