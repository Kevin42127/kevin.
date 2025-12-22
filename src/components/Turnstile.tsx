'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    turnstile: {
      render: (element: HTMLElement, options: {
        sitekey: string
        callback?: (token: string) => void
        'error-callback'?: () => void
        'expired-callback'?: () => void
        theme?: 'light' | 'dark' | 'auto'
        size?: 'normal' | 'compact'
      }) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
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
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!siteKey || !containerRef.current) return

    const loadTurnstile = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
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
              if (onExpire) onExpire()
            },
            theme,
            size
          })
          widgetIdRef.current = widgetId
          setIsLoaded(true)
        } catch (error) {
          console.error('Turnstile render error:', error)
        }
      }
    }

    if (window.turnstile) {
      loadTurnstile()
    } else {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.onload = () => {
        loadTurnstile()
      }
      script.onerror = () => {
        console.error('Failed to load Turnstile script')
      }
      document.body.appendChild(script)
    }

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

  const reset = () => {
    if (widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current)
      } catch (error) {
        console.error('Turnstile reset error:', error)
      }
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      const turnstileInstance = { reset }
      ;(containerRef.current as any).turnstileInstance = turnstileInstance
    }
  }, [isLoaded])

  if (!siteKey) {
    return null
  }

  return (
    <div className={className}>
      <div ref={containerRef} className="flex justify-center" />
    </div>
  )
}
