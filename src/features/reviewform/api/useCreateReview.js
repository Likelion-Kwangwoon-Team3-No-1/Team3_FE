import { useState } from 'react'
import { instance } from '../../../api/client'

export const useCreateReview = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const createReview = async ({ promotionId, content, rate, photoUrls = [] }) => {
    setIsLoading(true)
    setError(false)
    try {
      await instance.post('/reviews', {
        promotionId,
        content,
        rate,
        photoUrls: Array.isArray(photoUrls) ? photoUrls : [],
      })
    } catch (error) {
      console.error('리뷰 등록 실패:', error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return { createReview, isLoading, error }
}
