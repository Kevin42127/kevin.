import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import I18nProvider from '../components/I18nProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kevin.',
  description: '現代化個人網站，展示專業技能與創意作品',
  keywords: 'Kevin, 個人網站, 作品集, 開發者',
  authors: [{ name: 'Kevin' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
