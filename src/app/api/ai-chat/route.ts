import { NextRequest } from 'next/server'

export const runtime = 'edge'
export const maxDuration = 30

export async function POST(request: NextRequest) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY?.trim()

  if (!GROQ_API_KEY) {
    console.error('GROQ_API_KEY 環境變數未設置')
    return new Response(
      JSON.stringify({ error: 'AI 服務未配置，請檢查環境變數' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }

  try {
    const body = await request.json()

    // 轉發請求到 Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Groq API 錯誤回應:', response.status, errorData)
      return new Response(
        JSON.stringify({ error: `AI 服務回傳錯誤: ${response.status}` }),
        { 
          status: response.status, 
          headers: { 'Content-Type': 'application/json' } 
        }
      )
    }

    // 處理流式回應 (Streaming)
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no', // 禁用 Nginx 快取以確保流式傳輸
      },
    })

  } catch (error: any) {
    console.error('AI API 路由錯誤:', error)
    return new Response(
      JSON.stringify({ error: 'AI 服務暫時無法使用', message: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}

// 支援跨域預檢請求
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

