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

    const rawApiKey = process.env.GROQ_API_KEY
    const apiKey = rawApiKey?.trim()

    console.log('=== Environment Check ===')
    console.log('hasApiKey:', !!apiKey)
    console.log('rawApiKeyLength:', rawApiKey?.length || 0)
    console.log('apiKeyLength:', apiKey?.length || 0)
    console.log('apiKeyPrefix:', apiKey?.substring(0, 7) || 'N/A')
    console.log('apiKeyFirst10:', apiKey?.substring(0, 10) || 'N/A')
    console.log('apiKeyLast10:', apiKey ? apiKey.substring(apiKey.length - 10) : 'N/A')
    console.log('hasWhitespace:', rawApiKey !== apiKey)
    console.log('nodeEnv:', process.env.NODE_ENV)
    console.log('vercelEnv:', process.env.VERCEL_ENV)
    console.log('allEnvKeys:', Object.keys(process.env).filter(k => k.includes('GROQ')))
    console.log('========================')

    if (!apiKey) {
      console.error('GROQ_API_KEY is missing from process.env')
      return NextResponse.json({ 
        error: '缺少 GROQ_API_KEY 設定。請在 Vercel 環境變數中設定 GROQ_API_KEY。' 
      }, { status: 500 })
    }

    if (!apiKey.startsWith('gsk_')) {
      console.error('GROQ_API_KEY format is invalid. Should start with "gsk_"')
      console.error('Actual prefix:', apiKey.substring(0, 10))
      return NextResponse.json({ 
        error: 'GROQ_API_KEY 格式錯誤。API Key 應以 "gsk_" 開頭。' 
      }, { status: 500 })
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

    console.log('=== Groq API Request ===')
    console.log('Model:', requestBody.model)
    console.log('Messages count:', requestBody.messages.length)
    console.log('Request URL:', 'https://api.groq.com/openai/v1/chat/completions')
    console.log('========================')

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    })

    console.log('=== Groq API Response ===')
    console.log('Status:', response.status)
    console.log('Status Text:', response.statusText)
    console.log('Headers:', Object.fromEntries(response.headers.entries()))
    console.log('========================')

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

      if (response.status === 403) {
        errorMessage = 'API Key 無效或權限不足。請前往 Groq Console (https://console.groq.com/) 檢查 API Key 狀態，或重新生成新的 API Key。'
        console.error('403 Forbidden - Possible causes:')
        console.error('1. API Key is invalid or expired - 請檢查 Groq Console')
        console.error('2. API Key format is incorrect (should start with "gsk_")')
        console.error('3. API Key has no access to the model - 確認模型名稱是否正確')
        console.error('4. Environment variable not properly set in Vercel')
        console.error('5. API Key used:', apiKey ? `${apiKey.substring(0, 10)}...${apiKey.substring(apiKey.length - 5)}` : 'N/A')
        console.error('6. Request URL:', 'https://api.groq.com/openai/v1/chat/completions')
        console.error('7. Request Model:', requestBody.model)
        console.error('8. 建議：前往 https://console.groq.com/ 重新生成 API Key 並更新 Vercel 環境變數')
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


