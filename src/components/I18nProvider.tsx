'use client'

import { useEffect } from 'react'
import '../lib/i18n'

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // i18n 初始化已在 i18n.ts 中處理
  }, [])

  return <>{children}</>
}
