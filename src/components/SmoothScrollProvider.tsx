'use client'

import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: Props) {
  // 完全禁用 Lenis，使用原生滾動
  return <>{children}</>
}

