export const smoothScrollToElement = (elementId: string, offset: number = 64) => {
  const element = document.querySelector(elementId)
  
  if (!element) {
    console.warn(`Element not found: ${elementId}`)
    return
  }

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

export const smoothScrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}

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
