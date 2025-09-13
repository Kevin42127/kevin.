import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

export function useTranslationSafe() {
  const { t, i18n, ready } = useTranslation()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 在客戶端渲染完成前，使用 fallback 文字
  const safeT = (key: string, fallback?: string) => {
    if (!isClient || !ready) {
      return fallback || key
    }
    return t(key)
  }

  return {
    t: safeT,
    i18n,
    ready: isClient && ready,
    isClient
  }
}
