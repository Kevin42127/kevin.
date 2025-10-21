import { useState, useEffect } from 'react'

export const useProtectedImage = () => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProtectedImage = async () => {
      try {
        setIsLoading(true)
        
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
        setImageUrl('/profile.jpg')
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    loadProtectedImage()

    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl)
      }
    }
  }, [])

  return { imageUrl, isLoading, error }
}
