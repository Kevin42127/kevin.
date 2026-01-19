export const serverConfig = {
  gmail: {
    user: process.env.GMAIL_USER,
    password: process.env.GMAIL_APP_PASSWORD,
  },
  groq: {
    apiKey: process.env.GROQ_API_KEY,
  }
}

export const clientConfig = {
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'Kevin.',
    primaryDomain: process.env.NEXT_PUBLIC_PRIMARY_DOMAIN || 'https://www.kevinoffical.com',
    backupDomain: process.env.NEXT_PUBLIC_BACKUP_DOMAIN || 'https://kevinoffical.vercel.app',
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'tyouxipindao@gmail.com',
  }
}

export function validateServerConfig() {
  const missing = []
  
  if (!serverConfig.gmail.user) missing.push('GMAIL_USER')
  if (!serverConfig.gmail.password) missing.push('GMAIL_APP_PASSWORD')
  if (!serverConfig.groq.apiKey) missing.push('GROQ_API_KEY')
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
  
  return true
}

export function getGmailConfig() {
  validateServerConfig()
  return {
    user: serverConfig.gmail.user!,
    password: serverConfig.gmail.password!
  }
}
