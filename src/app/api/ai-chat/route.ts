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

    // 嘗試多個模型，按優先順序（已移除停用的模型）
    // 如果模型被停用，會自動跳過並嘗試下一個
    const modelsToTry = [
      'llama-3.3-70b-versatile',  // 替代已停用的 llama-3.1-70b-versatile
      'llama-3.1-8b-versatile',
      'mixtral-8x7b-32768',
      'llama-3.1-8b-instant',
      'gemma-7b-it'
    ]

    const baseRequestBody = {
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 600,
      top_p: 0.9,
      stream: false
    }

    // 嘗試所有模型
    for (const model of modelsToTry) {
      console.log(`=== 嘗試模型: ${model} ===`)
      
      const requestBody = {
        ...baseRequestBody,
        model
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      })

      console.log(`模型 ${model} 回應狀態:`, response.status)

      if (response.ok) {
        const data = await response.json()
        const reply = data.choices?.[0]?.message?.content ?? ''
        
        if (reply) {
          console.log(`✓ 成功使用模型: ${model}`)
          return NextResponse.json({ reply })
        } else {
          console.error(`模型 ${model} 回應為空`)
        }
      } else {
        const errorText = await response.text()
        console.error(`模型 ${model} 失敗 (${response.status}):`, errorText)
        
        // 檢查是否為停用模型或 403 錯誤，繼續嘗試下一個模型
        const isDeprecated = errorText.includes('decommissioned') || 
                            errorText.includes('no longer supported') ||
                            errorText.includes('deprecated')
        
        if (response.status === 403 || isDeprecated) {
          if (isDeprecated) {
            console.log(`模型 ${model} 已停用，跳過並嘗試下一個模型`)
          }
          continue
        }
        
        // 其他錯誤，返回錯誤訊息
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
    }

    // 所有模型都失敗
    console.error('所有模型都失敗')
    return NextResponse.json(
      { 
        error: `API Key 無效或權限不足。已嘗試模型: ${modelsToTry.join(', ')}。請前往 Groq Console (https://console.groq.com/) 檢查 API Key 狀態。` 
      },
      { status: 500 }
    )
  } catch (error) {
    console.error('AI Chat API error:', error)
    const errorMessage = error instanceof Error ? error.message : '未知錯誤'
    return NextResponse.json(
      { error: `伺服器錯誤: ${errorMessage}` },
      { status: 500 }
    )
  }
}


