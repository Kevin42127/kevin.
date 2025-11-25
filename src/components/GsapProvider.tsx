'use client'

import { PropsWithChildren, useEffect } from 'react'

export default function GsapProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    let gsapMod: any
    let ScrollTrigger: any
    let ctx: any
    ;(async () => {
      const mod = await import('gsap')
      gsapMod = mod.gsap || (mod as any).default || mod
      const st = await import('gsap/ScrollTrigger')
      ScrollTrigger = st.ScrollTrigger
      gsapMod.registerPlugin(ScrollTrigger)

      // Basic reveal for elements with .card and [data-reveal]
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
    })()

    return () => {
      try {
        if (ctx?.revert) ctx.revert()
        if ((window as any).ScrollTrigger) {
          ;(window as any).ScrollTrigger.getAll().forEach((st: any) => st.kill())
        }
      } catch {}
    }
  }, [])

  return children as any
}


