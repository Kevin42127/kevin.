const { Groq } = require('groq-sdk');

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  console.error('錯誤: GROQ_API_KEY 環境變數未設置');
}

const KEVIN_INFO = `Kevin（陳梓敬）個人網站資訊：

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
1. Kevin AI - 整合 Groq AI 打造智能對話介面
2. LINE BOT - TypeScript 與 Express 打造的 LINE 聊天機器人
3. ChefAI - Vue 與 Vite 打造 AI 食譜生成平台
4. AI老師 - Vue 與 Vite 打造 AI 教學助手平台
5. SumVid - AI 快速提取影片重點
6. Discord AI Bot - Python 打造的 Discord AI 聊天機器人
7. AcadAI - AI 自動整理商品重點
8. 臺灣氣象AI助手 - 查詢天氣與 AI 問答

【聯繫方式】
網站：https://kevinoffical.vercel.app
可透過網站聯繫表單發送訊息`;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY 環境變數未設置' });
  }

  const groq = new Groq({
    apiKey: GROQ_API_KEY
  });

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    const { messages = [] } = body || {};

    if (!messages || messages.length === 0) {
      res.write(`data: ${JSON.stringify({ error: '訊息不能為空' })}\n\n`);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      return res.end();
    }

    const lastUserMessage = messages[messages.length - 1];
    if (!lastUserMessage || lastUserMessage.role !== 'user') {
      res.write(`data: ${JSON.stringify({ error: '最後一條訊息必須是用戶訊息' })}\n\n`);
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      return res.end();
    }

    const systemPrompt = `您是 Kevin（陳梓敬）個人網站的專屬 AI 助理。您的職責是協助 HR 和招聘方快速了解 Kevin 的專業背景、技能、作品集和職涯相關資訊。

以下是 Kevin 的個人資訊：
${KEVIN_INFO}

【特殊互動功能】
當用戶詢問以下內容時，請在回應中包含對應的特殊標記：
- 詢問下載履歷時：在回應中加入 [DOWNLOAD_RESUME_ZH] 標記
- 詢問查看作品集時：在回應中加入 [VIEW_PORTFOLIO] 標記  
- 詢問如何聯繫時：在回應中加入 [CONTACT_FORM] 標記

【回答原則】
1. 以專業、友善且親切的語氣回答
2. 優先回答與 Kevin 專業背景、技能、作品、經驗相關的招聘問題
3. 如果問題超出範圍，禮貌地引導詢問者通過聯繫表單直接聯繫 Kevin
4. 【重要】語言回應規則：
   - 如果用戶使用英文提問，請用英文回答
   - 如果用戶使用中文提問，請用繁體中文回答
   - 自動檢測用戶輸入的語言，並使用相同語言回應

請根據以上資訊，以專業且友善的態度協助 HR 和招聘方了解 Kevin。`;

    const apiMessages = [
      {
        role: 'system',
        content: systemPrompt
      }
    ];

    if (messages && messages.length > 0) {
      const recentHistory = messages.slice(-10);
      recentHistory.forEach(msg => {
        if (msg.content && msg.content.trim()) {
          apiMessages.push({
            role: msg.role,
            content: msg.content
          });
        }
      });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: apiMessages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.2,
      max_tokens: 1024,
      top_p: 0.8,
      stream: true,
      stop: null
    });

    let hasContent = false;
    for await (const chunk of chatCompletion) {
      let content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        hasContent = true;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    if (!hasContent) {
      res.write(`data: ${JSON.stringify({ error: '沒有收到 AI 回應' })}\n\n`);
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Groq API 錯誤:', error);
    const errorMessage = error.message || 'AI 服務發生錯誤';
    console.error('錯誤詳情:', errorMessage);
    res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  }
};

