declare global {
  interface Window {
    __lenis?: {
      scrollTo: (target: string | Element | number, options?: { offset?: number }) => void
    }
  }
}

export const locoScrollTo = (target: string | Element | number, options: { offset?: number; duration?: number } = {}) => {
  if (typeof window !== 'undefined' && window.__lenis) {
    window.__lenis.scrollTo(target, { offset: options.offset })
    return
  }
  // Native smooth scroll with optional offset
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  const rect = (el as Element).getBoundingClientRect()
  const top = rect.top + window.pageYOffset - (options.offset ?? 0)
  window.scrollTo({ top, behavior: 'smooth' })
}

export const smoothScrollToElement = (elementId: string, offset: number = 64) => {
  locoScrollTo(elementId, { offset })
}

export const smoothScrollToTop = () => locoScrollTo(0)

export const smoothScrollToBottom = () => locoScrollTo(document.body.scrollHeight)

export const isElementInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

export const getScrollPosition = () => {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  }
}

export const isSmoothScrollSupported = (): boolean => {
  return 'scrollBehavior' in document.documentElement.style
}

export const polyfillSmoothScroll = () => {
  if (isSmoothScrollSupported()) {
    return
  }

  const originalScrollTo = window.scrollTo.bind(window)
  
  window.scrollTo = function(...args: any[]) {
    const options = args[0]
    
    if (typeof options === 'object' && options.behavior === 'smooth') {
      const targetY = options.top || 0
      const startY = window.pageYOffset
      const distance = targetY - startY
      const duration = 500
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const percent = Math.min(progress / duration, 1)
        
        const easing = percent < 0.5
          ? 2 * percent * percent
          : 1 - Math.pow(-2 * percent + 2, 2) / 2

        window.scrollTo(0, startY + distance * easing)

        if (progress < duration) {
          window.requestAnimationFrame(step)
        }
      }

      window.requestAnimationFrame(step)
    } else {
      originalScrollTo(...args)
    }
  }
}
