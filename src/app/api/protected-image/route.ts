import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  const headersList = headers()
  const referer = headersList.get('referer')
  
  const allowedOrigins = [
    'https://kevin-tau.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ]
  
  const isAllowedOrigin = allowedOrigins.some(origin => 
    referer?.startsWith(origin)
  )
  
  if (!isAllowedOrigin) {
    return new NextResponse('Access Denied', { status: 403 })
  }
  
  const userAgent = headersList.get('user-agent') || ''
  const blockedAgents = [
    'curl', 'wget', 'python-requests', 'scrapy', 'bot', 'crawler', 'spider'
  ]
  
  const isBlockedAgent = blockedAgents.some(agent => 
    userAgent.toLowerCase().includes(agent)
  )
  
  if (isBlockedAgent) {
    return new NextResponse('Access Denied', { status: 403 })
  }
  
  try {
    const fs = await import('fs')
    const path = await import('path')
    
    const imagePath = path.join(process.cwd(), 'public', 'profile.jpg')
    const imageBuffer = fs.readFileSync(imagePath)
    
    const response = new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    })
    
    return response
  } catch (error) {
    return new NextResponse('Image not found', { status: 404 })
  }
}
