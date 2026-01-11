import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/**
 * 統一郵件模板系統
 */
const getEmailTemplate = (name: string, email: string, subject: string, message: string, isAdmin: boolean) => {
  const brandColor = '#1e40af' // Kevin Blue
  const bgColor = '#f4f7f9'
  
  const title = isAdmin ? '收到來自個人網站的新訊息' : '感謝您的聯繫'
  const subTitle = isAdmin 
    ? `您有一封來自 ${name} 的聯絡訊息。` 
    : `您好 ${name}，感謝您在我的個人網站上留言！這是一封自動確認信，告訴您我已成功收到您的訊息。`

  const contentHeader = isAdmin ? '聯絡人資訊' : '您的聯繫資訊'
  const messageLabel = isAdmin ? '聯繫類型' : '聯繫主題'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: 'PingFang TC', 'Microsoft JhengHei', Arial, sans-serif;
          background-color: ${bgColor};
          margin: 0;
          padding: 0;
          color: #374151;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          padding: 0 20px;
        }
        .card {
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }
        .header {
          background-color: ${brandColor};
          padding: 32px 40px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.025em;
        }
        .body {
          padding: 40px;
        }
        .welcome-text {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 32px;
          color: #4b5563;
        }
        .info-section {
          background-color: #f8fafc;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 0;
        }
        .info-title {
          font-size: 14px;
          font-weight: 700;
          color: ${brandColor};
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
          display: block;
        }
        .info-item {
          margin-bottom: 12px;
          font-size: 15px;
          display: flex;
          align-items: center;
        }
        .info-item strong {
          color: #111827;
          width: 90px;
          flex-shrink: 0;
        }
        .info-item span {
          color: #4b5563;
        }
        .footer {
          padding: 32px 40px;
          text-align: center;
          font-size: 13px;
          color: #9ca3af;
        }
        .footer p {
          margin: 4px 0;
        }
        .brand-logo {
          font-size: 20px;
          font-weight: 800;
          color: ${brandColor};
          text-decoration: none;
          margin-bottom: 16px;
          display: inline-block;
        }
        @media (max-width: 480px) {
          .body { padding: 24px; }
          .header { padding: 24px 20px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>${title}</h1>
          </div>
          <div class="body">
            <p class="welcome-text">${subTitle}</p>
            
            <div class="info-section">
              <span class="info-title">${contentHeader}</span>
              <div class="info-item"><strong>姓名：</strong> <span>${name}</span></div>
              <div class="info-item"><strong>Email：</strong> <span>${email}</span></div>
              <div class="info-item"><strong>${messageLabel}：</strong> <span>${subject}</span></div>
            </div>
            
            ${!isAdmin ? `
            <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 15px; line-height: 1.6; color: #4b5563;">
                ${subject === '面試邀約' 
                  ? '我已收到您的面試邀請，這對我來說非常重要。我會盡快查閱您的職缺資訊，並在 24 小時內與您聯繫討論後續安排。' 
                  : '我非常重視您的來信，目前已收到您的留言。我通常會在 24-48 小時內親自回覆您。'}
                <br><br>
                祝您有美好的一天！
              </p>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <a href="https://kevinoffical.vercel.app" class="brand-logo">Kevin.</a>
            <p>此訊息由個人網站系統自動發送</p>
            <p>發送時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}</p>
            <p>&copy; Kevin. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '所有欄位都是必填的' },
        { status: 400 }
      )
    }

    const gmailUser = process.env.GMAIL_USER?.trim()
    const gmailPassword = process.env.GMAIL_APP_PASSWORD?.trim()

    if (!gmailUser || !gmailPassword) {
      console.error('Gmail 環境變數未設置')
      return NextResponse.json(
        { error: '郵件服務未配置，請聯繫管理員' },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword
      }
    })

    // 1. 發送給開發者 (我) 的通知信
    const adminMailOptions = {
      from: `"Kevin. Website" <${gmailUser}>`,
      to: gmailUser,
      subject: `[個人網站] 來自 ${name} 的新訊息`,
      html: getEmailTemplate(name, email, subject, message, true)
    }

    // 2. 發送給使用者 (對方) 的確認信
    const userMailOptions = {
      from: `"Kevin (陳梓敬)" <${gmailUser}>`,
      to: email, // 發送給填表單的人
      subject: `感謝您的聯繫 !`,
      html: getEmailTemplate(name, email, subject, message, false)
    }

    // 同時發送兩封郵件
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ])

    return NextResponse.json(
      { message: '訊息發送成功！已同步發送確認信至您的信箱。' },
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
