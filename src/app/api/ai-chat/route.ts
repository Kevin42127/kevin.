import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'

export const runtime = 'edge'
export const maxDuration = 30

export async function POST(request: NextRequest) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY?.trim()

  if (!GROQ_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'AI 服務未配置，請檢查環境變數' }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }

  const groq = new Groq({ apiKey: GROQ_API_KEY })

  try {
    const body = await request.json()

    // 使用官方 SDK 建立對話請求
    // 注意：openai/gpt-oss-120b 非 Groq 官方型號，為確保穩定運作，改用 Groq 目前最強的 llama-3.3-70b-versatile
    const chatCompletion = await groq.chat.completions.create({
      messages: body.messages,
      model: "llama-3.3-70b-versatile", 
      temperature: 1,
      max_tokens: 8192,
      top_p: 1,
      stream: true,
      stop: null
    })

    // 將 SDK 的 Async Iterable 轉換為 Web ReadableStream 以供前端讀取
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          for await (const chunk of chatCompletion) {
            // 保持 data: JSON 格式以確保與現有前端解析邏輯相容
            const payload = `data: ${JSON.stringify(chunk)}\n\n`
            controller.enqueue(encoder.encode(payload))
          }
          // 發送完成標記
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
      },
    })

  } catch (error: any) {
    console.error('Groq SDK 路由錯誤:', error)
    return new Response(
      JSON.stringify({ error: 'AI 服務暫時無法使用', message: error.message }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  }
}

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
