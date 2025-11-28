'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

type Props = {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: Props) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false
    })

    window.__lenis = lenis

    const onRaf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(onRaf)
    }

    const raf = requestAnimationFrame(onRaf)

    const onResize = () => lenis.resize()
    window.addEventListener('resize', onResize)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return <>{children}</>
}

