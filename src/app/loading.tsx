'use client'

export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
      <div className="dot-spinner" aria-label="載入中">
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="dot-spinner__dot"></div>
        ))}
      </div>
    </div>
  )
}

