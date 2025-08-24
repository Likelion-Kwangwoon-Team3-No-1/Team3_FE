import { useState } from 'react'
import { instance } from '../../../api/client'

export const useCreateReview = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const createReview = async ({ promotionId, content, rate, photoUrls = [] }) => {
    setIsLoading(true)
    setError(null)
    try {
      await instance.post('/reviews', {
        promotionId,
        content,
        rate,
        photoUrls, // 단순 문자열 배열 그대로 전송
      })
    } catch (err) {
      console.error('리뷰 등록 실패:', err)
      setError(err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { createReview, isLoading, error }
}
