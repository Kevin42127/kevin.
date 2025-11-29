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

    // 統一使用 GROQ_API_KEY，同時支援 VITE_GROQ_API_KEY 以保持向後兼容
    const rawApiKey = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY
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

    // 使用單一可靠的模型
    const model = 'llama-3.1-8b-instant'

    const requestBody = {
      model,
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 600,
      top_p: 0.9,
      stream: false
    }

    console.log('=== Groq API Request ===')
    console.log('Method: POST')
    console.log('URL: https://api.groq.com/openai/v1/chat/completions')
    console.log('Model:', model)
    console.log('Messages count:', requestBody.messages.length)
    console.log('Request Body:', JSON.stringify(requestBody, null, 2))
    console.log('Headers:', {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.substring(0, 10)}...`,
      'User-Agent': 'Mozilla/5.0'
    })
    console.log('========================')

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'Mozilla/5.0'
      },
      body: JSON.stringify(requestBody)
    })

    console.log('=== Groq API Response ===')
    console.log('Status:', response.status)
    console.log('Status Text:', response.statusText)
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()))
    
    const responseText = await response.text()
    console.log('Response Body (first 500 chars):', responseText.substring(0, 500))
    console.log('========================')

    if (!response.ok) {
      console.error('Groq API Error:', response.status, responseText)
      
      let errorMessage = `AI 回應失敗 (${response.status})`
      let errorDetails = ''
      
      try {
        const errorJson = JSON.parse(responseText)
        errorMessage = errorJson.error?.message || errorJson.error || errorMessage
        errorDetails = JSON.stringify(errorJson, null, 2)
        console.error('Parsed Error:', errorDetails)
      } catch {
        errorMessage = responseText || errorMessage
        errorDetails = responseText
      }

      // 詳細的錯誤診斷
      if (response.status === 403) {
        console.error('403 Forbidden - 詳細診斷:')
        console.error('1. API Key 前綴:', apiKey?.substring(0, 10))
        console.error('2. API Key 長度:', apiKey?.length)
        console.error('3. 模型名稱:', model)
        console.error('4. 環境:', process.env.VERCEL_ENV || 'local')
        console.error('5. 錯誤詳情:', errorDetails)
        errorMessage = `API Key 無效或權限不足 (403)。模型: ${model}。請檢查 Vercel 環境變數中的 GROQ_API_KEY 是否正確設定，並確認 API Key 有權限使用此模型。`
      } else if (response.status === 404) {
        console.error('404 Not Found - 模型可能不存在或名稱錯誤')
        errorMessage = `模型不存在 (404)。模型: ${model}。請確認模型名稱是否正確。`
      } else if (response.status === 400) {
        console.error('400 Bad Request - 請求格式可能有問題')
        errorMessage = `請求格式錯誤 (400)。錯誤: ${errorMessage}`
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Failed to parse response:', parseError)
      console.error('Response text:', responseText)
      return NextResponse.json(
        { error: '無法解析 API 回應' },
        { status: 500 }
      )
    }

    const reply = data.choices?.[0]?.message?.content ?? ''

    if (!reply) {
      console.error('Groq API returned empty reply:', JSON.stringify(data, null, 2))
      return NextResponse.json({ error: 'AI 回應為空' }, { status: 500 })
    }

    console.log('✓ 成功取得 AI 回應，長度:', reply.length)
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


