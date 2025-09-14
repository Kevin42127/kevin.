import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import I18nProvider from '../components/I18nProvider'
import { ThemeProvider } from '../components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kevin.',
  description: '現代化個人網站，展示專業技能與創意作品',
  keywords: 'Kevin, 個人網站, 作品集, 開發者',
  authors: [{ name: 'Kevin' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
