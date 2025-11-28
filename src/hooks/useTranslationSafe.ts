import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

export function useTranslationSafe() {
  const { t, i18n, ready } = useTranslation()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const safeT = (key: string, fallback?: string) => {
    if (!isClient || !ready) {
      return fallback || key
    }
    return t(key, { defaultValue: fallback || key })
  }

  return {
    t: safeT,
    i18n,
    ready: isClient && ready,
    isClient
  }
}
