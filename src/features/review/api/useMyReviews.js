import { useEffect, useState } from 'react'
import { instance } from '../../../api/client'

export const useMyReviews = () => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchMyReviews = async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      const response = await instance.get('/reviews/me')
      setReviews(response.data.items || [])
    } catch (err) {
      console.error('내 리뷰 조회 실패:', err.response?.data || err.message)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMyReviews()
  }, [])

  return { reviews, isLoading, isError, refetch: fetchMyReviews }
}
