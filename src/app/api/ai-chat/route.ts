import { NextRequest, NextResponse } from 'next/server'
import { serverConfig } from '@/lib/config'

const GROQ_API_KEY = serverConfig.groq.apiKey
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

if (!GROQ_API_KEY) {
  console.error('GROQ_API_KEY 環境變數未設置')
}

export async function POST(request: NextRequest) {
  try {
    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'AI 服務未配置，請聯繫管理員' },
        { status: 500 }
      )
    }

    const { messages, stream } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: '訊息格式錯誤' },
        { status: 400 }
      )
    }

    const systemPrompt = `您是 Kevin（陳梓敬）個人網站的專屬 AI 助理。您的職責是回答訪客關於 Kevin 及其個人網站的問題。

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

【回答原則】
1. 友善、專業且親切的語氣
2. 只回答與 Kevin 個人網站相關的問題
3. 如果問題與網站無關，禮貌地引導訪客詢問網站相關問題
4. 可以介紹 Kevin 的技能、作品、經驗等資訊
5. 可以協助訪客了解網站功能和使用方式
6. 使用繁體中文回答

請根據以上資訊回答訪客的問題。`

    const messagesWithSystem = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...messages
    ]

    if (stream) {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
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
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('Groq API 錯誤:', errorData)
        return NextResponse.json(
          { error: 'AI 服務暫時無法使用，請稍後再試' },
          { status: response.status }
        )
      }

      const stream = new ReadableStream({
        async start(controller) {
          const reader = response.body?.getReader()
          const decoder = new TextDecoder()

          if (!reader) {
            controller.close()
            return
          }

          try {
            while (true) {
              const { done, value } = await reader.read()
              
              if (done) {
                controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
                controller.close()
                break
              }

              const chunk = decoder.decode(value, { stream: true })
              const lines = chunk.split('\n')

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  const data = line.slice(6)
                  if (data === '[DONE]') {
                    controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
                    controller.close()
                    return
                  }

                  try {
                    const parsed = JSON.parse(data)
                    if (parsed.choices?.[0]?.delta?.content) {
                      controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(parsed)}\n\n`))
                    }
                  } catch (e) {
                    // 忽略解析錯誤
                  }
                }
              }
            }
          } catch (error) {
            console.error('Stream 錯誤:', error)
            controller.error(error)
          }
        }
      })

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      })
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messagesWithSystem,
        temperature: 0.9,
        max_tokens: 4096,
        top_p: 1,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Groq API 錯誤:', errorData)
      return NextResponse.json(
        { error: 'AI 服務暫時無法使用，請稍後再試' },
        { status: response.status }
      )
    }

    const data = await response.json()

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: 'AI 回應格式錯誤' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: data.choices[0].message.content,
      usage: data.usage,
    })

  } catch (error) {
    console.error('AI 聊天錯誤:', error)
    return NextResponse.json(
      { error: '處理請求時發生錯誤，請稍後再試' },
      { status: 500 }
    )
  }
}

