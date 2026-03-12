import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kevin.',
  description: '智能字體推薦系統，為您的專案找到完美字體搭配',
  keywords: '字體推薦, AI, 設計, 字體搭配, Kevin',
  authors: [{ name: 'Kevin' }],
  openGraph: {
    type: 'website',
    siteName: 'Kevin Portfolio',
    title: 'AI 字體推薦系統 - Kevin 陳梓敬',
    description: '運用 AI 技術為您推薦最適合的字體組合',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI 字體推薦系統 - Kevin 陳梓敬',
    description: '運用 AI 技術為您推薦最適合的字體組合',
  },
}

export default function FontRecommendationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
