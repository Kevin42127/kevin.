// 服務端配置（不會暴露給客戶端）
export const serverConfig = {
  gmail: {
    user: process.env.GMAIL_USER,
    password: process.env.GMAIL_APP_PASSWORD,
  }
}

// 客戶端配置（可以安全暴露）
export const clientConfig = {
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'Kevin.',
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'tyouxipindao@gmail.com',
  }
}

// 驗證服務端配置
export function validateServerConfig() {
  const missing = []
  
  if (!serverConfig.gmail.user) missing.push('GMAIL_USER')
  if (!serverConfig.gmail.password) missing.push('GMAIL_APP_PASSWORD')
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
  
  return true
}

// 安全地獲取 Gmail 配置
export function getGmailConfig() {
  validateServerConfig()
  return {
    user: serverConfig.gmail.user!,
    password: serverConfig.gmail.password!
  }
}
