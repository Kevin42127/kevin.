'use client'

import { useEffect, useRef } from 'react'

const FigmaCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const cursor = cursorRef.current
    
    if (!cursor) return

    // 滑鼠移動處理
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    // 滑鼠進入/離開視窗
    const handleMouseEnter = () => {
      cursor.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    // 滑鼠按下/放開
    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)'
    }

    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    // 懸停狀態處理
    const handleHoverStart = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)'
    }

    const handleHoverEnd = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    // 平滑動畫
    const animate = () => {
      // 使用 lerp 平滑插值
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
      }

      positionRef.current.x = lerp(positionRef.current.x, targetRef.current.x, 0.15)
      positionRef.current.y = lerp(positionRef.current.y, targetRef.current.y, 0.15)

      cursor.style.left = positionRef.current.x + 'px'
      cursor.style.top = positionRef.current.y + 'px'

      animationRef.current = requestAnimationFrame(animate)
    }

    // 添加事件監聽器
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    // 為可交互元素添加懸停效果
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"]')
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleHoverStart)
      element.addEventListener('mouseleave', handleHoverEnd)
    })

    // 隱藏原生游標
    document.body.style.cursor = 'none'
    
    // 禁止所有元素的原生游標
    const allElements = document.querySelectorAll('*')
    allElements.forEach(element => {
      const htmlElement = element as HTMLElement
      htmlElement.style.cursor = 'none'
    })

    // 監聽 DOM 變化，確保新元素也沒有游標
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement
            element.style.cursor = 'none'
            
            // 也處理子元素
            const childElements = element.querySelectorAll('*')
            childElements.forEach((child) => {
              (child as HTMLElement).style.cursor = 'none'
            })
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // 開始動畫
    animate()

    // 清理函數
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)

      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleHoverStart)
        element.removeEventListener('mouseleave', handleHoverEnd)
      })

      // 恢復原生游標
      document.body.style.cursor = 'auto'
      const allElements = document.querySelectorAll('*')
      allElements.forEach(element => {
        const htmlElement = element as HTMLElement
        htmlElement.style.cursor = 'auto'
      })

      // 斷開 observer
      observer.disconnect()

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    /* 外圈 */
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        width: '40px',
        height: '40px',
        border: '2px solid rgb(var(--foreground-rgb))',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease, opacity 0.3s ease',
        opacity: 0,
      }}
    />
  )
}

export default FigmaCursor
