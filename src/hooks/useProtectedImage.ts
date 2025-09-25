import { useState, useEffect } from 'react'

export const useProtectedImage = () => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProtectedImage = async () => {
      try {
        setIsLoading(true)
        
        // 嘗試從保護的 API 端點載入圖片
        const response = await fetch('/api/protected-image', {
          method: 'GET',
          headers: {
            'Referer': window.location.origin,
          }
        })

        if (!response.ok) {
          throw new Error('Failed to load protected image')
        }

        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        
        setImageUrl(url)
        setError(null)
      } catch (err) {
        console.warn('Protected image failed, falling back to static image')
        // 如果保護圖片失敗，回退到靜態圖片
        setImageUrl('/profile.jpg')
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    loadProtectedImage()

    // 清理函數
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [])

  return { imageUrl, isLoading, error }
}
