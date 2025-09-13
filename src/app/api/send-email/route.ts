import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // 驗證必要欄位
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '所有欄位都是必填的' },
        { status: 400 }
      )
    }

    // 建立 Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'tyouxipindao@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'ecaouqoalpxxsswi'
      }
    })

    // 郵件內容
    const mailOptions = {
      from: process.env.GMAIL_USER || 'tyouxipindao@gmail.com',
      to: process.env.GMAIL_USER || 'tyouxipindao@gmail.com',
      subject: `[個人網站] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            來自個人網站的新訊息
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">聯絡資訊</h3>
            <p><strong>姓名:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>主題:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">訊息內容</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 8px; font-size: 14px; color: #6b7280;">
            <p>此訊息來自 Kevin 的個人網站聯繫表單</p>
            <p>發送時間: ${new Date().toLocaleString('zh-TW')}</p>
          </div>
        </div>
      `
    }

    // 發送郵件
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: '訊息發送成功！' },
      { status: 200 }
    )

  } catch (error) {
    console.error('發送郵件時發生錯誤:', error)
    return NextResponse.json(
      { error: '發送訊息時發生錯誤，請稍後再試' },
      { status: 500 }
    )
  }
}
