'use client'

import { PropsWithChildren, useEffect, useState } from 'react'

export default function GsapProvider({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let gsapMod: any
    let ScrollTrigger: any
    let ctx: any
    
    const loadGsap = async () => {
      try {
        const [{ gsap }, { ScrollTrigger: ST }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger')
        ])
        
        gsapMod = gsap
        ScrollTrigger = ST
        gsapMod.registerPlugin(ScrollTrigger)

        ctx = gsapMod.context(() => {
          const reveal = (targets: Element[] | NodeListOf<Element>, vars: any) => {
            if (!targets || (targets as any).length === 0) return
            gsapMod.set(targets, { autoAlpha: 0, y: 24 })
            gsapMod.utils.toArray(targets).forEach((el: any) => {
              gsapMod.to(el, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse'
                },
                ...vars
              })
            })
          }

          reveal(document.querySelectorAll('.card'), {})
          reveal(document.querySelectorAll('[data-reveal]'), {})
        })
        
        setIsLoaded(true)
      } catch (error) {
        console.warn('GSAP loading failed:', error)
      }
    }

    // 使用 Intersection Observer 延遲載入
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadGsap()
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(document.body)

    return () => {
      try {
        if (ctx?.revert) ctx.revert()
        if ((window as any).ScrollTrigger) {
          ;(window as any).ScrollTrigger.getAll().forEach((st: any) => st.kill())
        }
        observer.disconnect()
      } catch {}
    }
  }, [])

  return <>{children}</>
}


