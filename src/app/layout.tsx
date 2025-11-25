import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import I18nProvider from '../components/I18nProvider'
import { ThemeProvider } from '../components/ThemeProvider'
import GsapProvider from '../components/GsapProvider'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Kevin.',
  description: '現代化個人網站，展示專業技能與創意作品',
  keywords: 'Kevin, 個人網站, 作品集, 開發者',
  authors: [{ name: 'Kevin' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,700,0,0"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
        >
          <GsapProvider>
            <I18nProvider>
              {children}
            </I18nProvider>
          </GsapProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
