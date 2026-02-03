import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

/**
 * 自動轉換文字中的連結為超連結
 */
const convertLinksToHTML = (text: string): string => {
  const urlPattern = /(https?:\/\/[^\s<>"']+)/g
  return text.replace(urlPattern, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #1e40af; text-decoration: underline;">$1</a>')
}

/**
 * 統一郵件模板系統
 */
const getEmailTemplate = (name: string, email: string, subject: string, message: string, isAdmin: boolean, language: string = 'zh') => {
  const brandColor = '#1e40af' // Kevin Blue
  const bgColor = '#f4f7f9'
  
  // 根據語言設定內容
  const isEnglish = language === 'en'
  
  const title = isAdmin 
    ? (isEnglish ? 'New Message from Personal Website' : '收到來自個人網站的新訊息')
    : (isEnglish ? 'Thank You for Your Contact' : '感謝您的聯繫')
  
  const subTitle = isAdmin 
    ? (isEnglish ? `You have a new message from ${name}.` : `您有一封來自 ${name} 的聯絡訊息。`)
    : (isEnglish ? `Hello ${name}, thank you for leaving a message on my personal website! This is an automated confirmation email to let you know that I have successfully received your message.` 
       : `您好 ${name}，感謝您在我的個人網站上留言！這是一封自動確認信，告訴您我已成功收到您的訊息。`)

  const contentHeader = isAdmin 
    ? (isEnglish ? 'Contact Information' : '聯絡人資訊') 
    : (isEnglish ? 'Your Contact Information' : '您的聯繫資訊')
  
  const messageLabel = isAdmin 
    ? (isEnglish ? 'Contact Type' : '聯繫類型') 
    : (isEnglish ? 'Contact Subject' : '聯繫主題')
  
  const detailedMessageLabel = isEnglish ? 'Detailed Message' : '詳細訊息'
  
  const interviewReply = subject === '面試邀約' || subject === 'Interview Request'
    ? (isEnglish 
      ? 'I have received your interview request, which is very important to me. I will review your job information as soon as possible and contact you within 24 hours to discuss further arrangements.'
      : '我已收到您的面試邀請，這對我來說非常重要。我會盡快查閱您的職缺資訊，並在 24 小時內與您聯繫討論後續安排。')
    : (isEnglish 
      ? 'I truly value your message and have received your inquiry. I usually respond personally within 24-48 hours.'
      : '我非常重視您的來信，目前已收到您的留言。我通常會在 24-48 小時內親自回覆您。')
  
  const closing = isEnglish ? 'Have a great day!' : '祝您有美好的一天！'
  const signature = isEnglish ? 'This message was automatically sent by the personal website system' : '此訊息由個人網站系統自動發送'
  const sentTime = isEnglish ? 'Sent time:' : '發送時間：'
  const copyright = isEnglish ? '&copy; Kevin. All rights reserved.' : '&copy; Kevin. All rights reserved.'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: ${isEnglish ? 'Arial, sans-serif' : "'PingFang TC', 'Microsoft JhengHei', Arial, sans-serif"};
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
              <div class="info-item"><strong>${isEnglish ? 'Name:' : '姓名：'}</strong> <span>${name}</span></div>
              <div class="info-item"><strong>Email：</strong> <span>${email}</span></div>
              <div class="info-item"><strong>${messageLabel}：</strong> <span>${subject}</span></div>
              ${isAdmin && message && message !== subject ? `
              <div style="margin-top: 16px; text-align: left; direction: ltr;">
                <div style="font-size: 14px; font-weight: 700; color: ${brandColor}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; display: block; text-align: left; direction: ltr;">
                  ${detailedMessageLabel}
                </div>
                <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px;">
                  <div style="font-size: 14px; line-height: 1.5; color: #374151; margin: 0; text-align: left; white-space: pre-wrap;">${convertLinksToHTML(message)}</div>
                </div>
              </div>
              ` : ''}
            </div>
            
            ${!isAdmin ? `
            <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #e5e7eb;">
              <p style="font-size: 15px; line-height: 1.6; color: #4b5563;">
                ${interviewReply}
                <br><br>
                ${closing}
              </p>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <a href="https://kevinoffical.vercel.app" class="brand-logo">Kevin.</a>
            <p>${signature}</p>
            <p>${sentTime} ${new Date().toLocaleString(isEnglish ? 'en-US' : 'zh-TW', { timeZone: 'Asia/Taipei' })}</p>
            <p>${copyright}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  let language = 'zh'
  
  try {
    const { name, email, subject, message, lang = 'zh' } = await request.json()
    language = lang

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: language === 'en' ? 'All fields are required' : '所有欄位都是必填的' },
        { status: 400 }
      )
    }

    const gmailUser = process.env.GMAIL_USER?.trim()
    const gmailPassword = process.env.GMAIL_APP_PASSWORD?.trim()

    if (!gmailUser || !gmailPassword) {
      console.error('Gmail 環境變數未設置')
      return NextResponse.json(
        { error: language === 'en' ? 'Email service not configured, please contact administrator' : '郵件服務未配置，請聯繫管理員' },
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
      subject: language === 'en' ? `[Personal Website] New Message from ${name}` : `[個人網站] 來自 ${name} 的新訊息`,
      html: getEmailTemplate(name, email, subject, message, true, language)
    }

    // 2. 發送給使用者 (對方) 的確認信
    const userMailOptions = {
      from: `"Kevin (陳梓敬)" <${gmailUser}>`,
      to: email, // 發送給填表單的人
      subject: language === 'en' ? 'Thank You for Your Contact!' : '感謝您的聯繫 !',
      html: getEmailTemplate(name, email, subject, message, false, language)
    }

    // 同時發送兩封郵件
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ])

    return NextResponse.json(
      { 
        message: language === 'en' 
          ? 'Message sent successfully! Confirmation email has been sent to your inbox.' 
          : '訊息發送成功！已同步發送確認信至您的信箱。' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('發送郵件時發生錯誤:', error)
    return NextResponse.json(
      { error: language === 'en' ? 'An error occurred while sending the message. Please try again later.' : '發送訊息時發生錯誤，請稍後再試' },
      { status: 500 }
    )
  }
}
