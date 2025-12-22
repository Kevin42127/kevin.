'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile: {
      render: (
        element: HTMLElement | string,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
          'timeout-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
          size?: 'normal' | 'compact' | 'invisible'
          language?: string
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
      getResponse: (widgetId?: string) => string | undefined
    }
  }
}

interface TurnstileProps {
  siteKey: string
  onVerify: (token: string) => void
  onError?: () => void
  onExpire?: () => void
  theme?: 'light' | 'dark' | 'auto'
  size?: 'normal' | 'compact'
  className?: string
}

export default function Turnstile({
  siteKey,
  onVerify,
  onError,
  onExpire,
  theme = 'auto',
  size = 'normal',
  className = ''
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const scriptLoadedRef = useRef<boolean>(false)

  useEffect(() => {
    if (!siteKey || !containerRef.current) return

    const loadScript = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (window.turnstile) {
          resolve()
          return
        }

        if (scriptLoadedRef.current) {
          const checkInterval = setInterval(() => {
            if (window.turnstile) {
              clearInterval(checkInterval)
              resolve()
            }
          }, 100)
          return
        }

        scriptLoadedRef.current = true
        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
        script.async = true
        script.defer = true
        script.onload = () => resolve()
        script.onerror = () => {
          scriptLoadedRef.current = false
          reject(new Error('Failed to load Turnstile script'))
        }
        document.head.appendChild(script)
      })
    }

    const renderWidget = () => {
      if (!window.turnstile || !containerRef.current || widgetIdRef.current) return

      try {
        const widgetId = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerify(token)
          },
          'error-callback': () => {
            if (onError) onError()
          },
          'expired-callback': () => {
            if (onExpire) {
              onExpire()
            }
            if (widgetIdRef.current && window.turnstile) {
              window.turnstile.reset(widgetIdRef.current)
            }
          },
          theme,
          size
        })
        widgetIdRef.current = widgetId
      } catch (error) {
        console.error('Turnstile render error:', error)
        if (onError) onError()
      }
    }

    loadScript()
      .then(() => {
        renderWidget()
      })
      .catch((error) => {
        console.error('Turnstile script load error:', error)
        if (onError) onError()
      })

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch (error) {
          console.error('Turnstile remove error:', error)
        }
        widgetIdRef.current = null
      }
    }
  }, [siteKey, onVerify, onError, onExpire, theme, size])

  if (!siteKey) {
    return null
  }

  return (
    <div className={className}>
      <div ref={containerRef} className="cf-turnstile" />
    </div>
  )
}
