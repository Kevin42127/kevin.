import { NextRequest, NextResponse } from 'next/server'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.1-8b-instant'

const ALLOWED_ORIGINS = [
  'https://kevinoffical.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
]

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin') || ''
    const referer = request.headers.get('referer') || ''
    
    console.log('=== 請求來源檢查 ===')
    console.log('Origin:', origin)
    console.log('Referer:', referer)
    console.log('NODE_ENV:', process.env.NODE_ENV)
    
    if (process.env.NODE_ENV === 'production') {
      const isAllowedOrigin = ALLOWED_ORIGINS.some(allowed => 
        origin.includes(allowed) || referer.includes(allowed)
      )
      
      if (!isAllowedOrigin && origin && referer) {
        console.error('❌ 未授權的域名 - Origin:', origin, 'Referer:', referer)
        return NextResponse.json(
          { error: 'AI 服務僅在授權域名下可用' },
          { status: 403 }
        )
      }
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY?.trim()
    
    console.log('=== API Key 檢查 ===')
    console.log('GROQ_API_KEY 存在:', !!process.env.GROQ_API_KEY)
    console.log('GROQ_API_KEY 長度:', GROQ_API_KEY?.length || 0)
    console.log('GROQ_API_KEY 前綴:', GROQ_API_KEY?.substring(0, 4) || 'N/A')
    
    if (!GROQ_API_KEY) {
      console.error('❌ GROQ_API_KEY 環境變數未設置或為空')
      console.error('可用的環境變數:', Object.keys(process.env).filter(k => k.includes('GROQ')))
      return NextResponse.json(
        { error: 'AI 服務未配置，請在 Vercel 設置 GROQ_API_KEY 環境變數' },
        { status: 500 }
      )
    }
    
    if (!GROQ_API_KEY.startsWith('gsk_')) {
      console.error('❌ GROQ_API_KEY 格式不正確，應該以 gsk_ 開頭')
      return NextResponse.json(
        { error: 'AI 服務配置錯誤，API Key 格式不正確' },
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

    const systemPrompt = `您是 Kevin（陳梓敬）個人網站的專屬 AI 助理。您的職責是協助 HR 和招聘方快速了解 Kevin 的專業背景、技能、作品集和職涯相關資訊。

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
1. Kevin AI - 整合 Groq AI 打造智能對話介面，提供即時 AI 對話體驗（技術：React, Vite, AI協作）
2. LINE BOT - 運用 TypeScript 與 Express 打造的 LINE 聊天機器人，整合 AI 協作功能，提供智能對話服務（技術：TypeScript, Express, AI協作）
3. ChefAI - 運用 Vue 與 Vite 打造 AI 食譜生成平台，提供智能食譜推薦與生成功能（技術：Vue, Vite, AI協作）
4. AI老師 - 運用 Vue 與 Vite 打造 AI 教學助手平台，提供智能學習輔助功能（技術：Vue, Vite, AI協作）
5. SumVid - 讓 AI 為您快速提取影片重點（技術：HTML, CSS, JavaScript, Chrome Extension API, AI協作）
6. Discord AI Bot - 運用 Python 打造的 Discord AI 聊天機器人，提供智能對話服務（技術：Python, AI協作）
7. AcadAI - AI 自動幫你整理商品重點（技術：HTML, CSS, JavaScript, Chrome Extension API, AI協作）
8. 臺灣氣象AI助手 - 查詢天氣與 AI 問答（技術：HTML, CSS, JavaScript, Chrome Extension API, AI協作）

【相關經驗】
- 語言能力：中文（母語）、英文（中級）
- 證照認證：Adobe Photoshop 國際認證、Adobe Dreamweaver 國際認證
- 課外活動：
  * 校園專題競賽第三名（2023年）- 運用設計思維與技術能力獲得佳績
  * 學生會資訊職務（2022年-2025年）- 負責文書處理、活動規劃、園遊會攤位規劃、校園演唱會籌備

【網站功能】
- 網站包含：首頁、關於我、作品集、技能、經驗、聯繫我等區塊
- 訪客可以下載履歷（目前提供繁體中文版本）
- 可以通過聯繫表單發送訊息給 Kevin

【特殊互動功能】
當用戶詢問以下內容時，請在回應中包含對應的特殊標記（標記會被自動轉換為互動按鈕）：
- 詢問下載履歷、查看履歷、履歷檔案時：在回應中加入 [DOWNLOAD_RESUME_ZH] 標記
- 詢問查看作品集、專案作品時：在回應中加入 [VIEW_PORTFOLIO] 標記  
- 詢問如何聯繫、聯絡方式時：在回應中加入 [CONTACT_FORM] 標記

範例回應：
- 中文："您可以直接下載 Kevin 的履歷查看完整資訊：[DOWNLOAD_RESUME_ZH]"
- 英文："You can download Kevin's resume here: [DOWNLOAD_RESUME_ZH]"

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
6. 【重要】語言回應規則（最高優先級）：
   - 如果用戶使用英文提問，請用英文回答，禁止使用任何中文
   - 如果用戶使用繁體中文或簡體中文提問，請用繁體中文回答，禁止使用任何英文
   - 自動檢測用戶輸入的語言，並使用相同語言回應
   - 保持專業且自然的語言風格
   - 嚴格遵守：用戶用什麼語言提問，就用什麼語言回答，絕對不要混用語言
   - 這是強制性規則，違反此規則即為錯誤回應

【回答風格】
- 專業但親和：展現 Kevin 的專業能力，同時保持友善的溝通風格
- 具體且詳細：提供具體的技術細節和專案經驗，而非泛泛而談
- 誠實且透明：如實回答 Kevin 的經驗和能力水平
- 導向行動：適時引導 HR 查看作品集、下載履歷或通過聯繫表單聯繫

請根據以上資訊，以專業且友善的態度協助 HR 和招聘方了解 Kevin。`

    const messagesWithSystem = [
      {
        role: 'system',
        content: systemPrompt
      },
      ...messages
    ]

    if (stream) {
      console.log('準備發送流式請求到 Groq API...')
      console.log('API URL:', GROQ_API_URL)
      console.log('Model:', MODEL)
      
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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

      console.log('Groq API 回應狀態:', response.status)
      console.log('Groq API 回應是否成功:', response.ok)
      console.log('Groq API 回應狀態文字:', response.statusText)

      if (!response.ok) {
        const errorData = await response.text()
        console.error('❌ Groq API 錯誤詳情:')
        console.error('Status:', response.status)
        console.error('Status Text:', response.statusText)
        console.error('Error Response:', errorData)
        
        let errorMessage = 'AI 服務暫時無法使用，請稍後再試'
        
        try {
          const parsedError = JSON.parse(errorData)
          console.error('解析後的錯誤:', parsedError)
          
          if (parsedError.error?.message) {
            console.error('錯誤訊息:', parsedError.error.message)
            errorMessage = parsedError.error.message
          }
          
          if (response.status === 401) {
            errorMessage = 'API Key 無效或已過期，請檢查 GROQ_API_KEY 環境變數'
          } else if (response.status === 429) {
            errorMessage = 'API 請求次數已達上限，請稍後再試'
          }
        } catch (e) {
          console.error('無法解析錯誤響應為 JSON')
        }
        
        return NextResponse.json(
          { 
            error: errorMessage,
            status: response.status,
            details: errorData
          },
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

    console.log('準備發送非流式請求到 Groq API...')
    
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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

    console.log('Groq API 回應狀態:', response.status)
    console.log('Groq API 回應是否成功:', response.ok)

    if (!response.ok) {
      const errorData = await response.text()
      console.error('❌ Groq API 錯誤詳情:')
      console.error('Status:', response.status)
      console.error('Error Response:', errorData)
      
      try {
        const parsedError = JSON.parse(errorData)
        console.error('解析後的錯誤:', parsedError)
      } catch (e) {
        console.error('無法解析錯誤響應為 JSON')
      }
      
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

