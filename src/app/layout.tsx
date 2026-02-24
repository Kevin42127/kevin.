import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import I18nProvider from '../components/I18nProvider'
import GsapProvider from '../components/GsapProvider'
import SmoothScrollProvider from '../components/SmoothScrollProvider'
import { ThemeProvider } from '../components/ThemeProvider'

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
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kevin Portfolio',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Kevin Portfolio',
    title: 'Kevin 陳梓敬 - 個人網站',
    description: '現代化個人網站，展示專業技能與創意作品',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kevin 陳梓敬 - 個人網站',
    description: '現代化個人網站，展示專業技能與創意作品',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name='dmca-site-verification' content='cUJNbDlnbmtMTWdCYTdUL0hUQUhnYVQ4ditXeC9QQnk1Ym5lY2VjcllnQT01' />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Kevin Portfolio" />
        <meta name="application-name" content="Kevin Portfolio" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-96x96.png" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,700,0,0"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SmoothScrollProvider>
            <GsapProvider>
              <I18nProvider>
                {children}
              </I18nProvider>
            </GsapProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
