/**
 * 平滑滚动工具函数
 * 使用原生 scroll-behavior: smooth
 */

/**
 * 平滑滚动到指定元素
 * @param elementId - 元素ID（带#）或元素选择器
 * @param offset - 偏移量（默认64px，导航栏高度）
 */
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

/**
 * 平滑滚动到页面顶部
 */
export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/**
 * 平滑滚动到页面底部
 */
export const smoothScrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}

/**
 * 检查元素是否在视口中
 * @param element - DOM元素
 * @returns boolean
 */
export const isElementInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 获取当前滚动位置
 * @returns { x: number, y: number }
 */
export const getScrollPosition = () => {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  }
}

/**
 * 检查是否支持平滑滚动
 * @returns boolean
 */
export const isSmoothScrollSupported = (): boolean => {
  return 'scrollBehavior' in document.documentElement.style
}

/**
 * Polyfill 平滑滚动（如果浏览器不支持）
 * 注意：现代浏览器都支持，这个函数主要用于旧浏览器
 */
export const polyfillSmoothScroll = () => {
  if (isSmoothScrollSupported()) {
    return // 浏览器已支持，无需 polyfill
  }

  // 简单的 polyfill 实现
  const originalScrollTo = window.scrollTo.bind(window)
  
  window.scrollTo = function(...args: any[]) {
    const options = args[0]
    
    if (typeof options === 'object' && options.behavior === 'smooth') {
      const targetY = options.top || 0
      const startY = window.pageYOffset
      const distance = targetY - startY
      const duration = 500 // 毫秒
      let start: number | null = null

      const step = (timestamp: number) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const percent = Math.min(progress / duration, 1)
        
        // 缓动函数（ease-in-out）
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

