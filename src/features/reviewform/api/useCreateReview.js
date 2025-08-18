import { useState } from 'react'
import { createReviewApi } from '../../../features/review/api/reviewApi'

export const useCreateReview = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  /**
   * createReview({
   *   promotionId,   // 필수
   *   content,       // 필수 (리뷰 본문)
   *   rate,          // 필수 (숫자)
   *   photoUrls = [],// 필수 (문자열 배열)
   *   onSuccess
   * })
   */
  const createReview = async ({ promotionId, content, rate, photoUrls = [], onSuccess }) => {
    setIsLoading(true)
    setIsError(false)
    setError(null)
    try {
      if (!promotionId && promotionId !== 0) throw new Error('promotionId가 필요합니다.')
      if (!content || !content.trim()) throw new Error('content(리뷰 내용)를 입력해주세요.')
      if (rate === undefined || rate === null || Number(rate) <= 0) {
        throw new Error('rate(별점)을 선택해주세요.')
      }
      if (!Array.isArray(photoUrls) || photoUrls.length === 0) {
        throw new Error('photoUrls가 비어있습니다. 최소 1장 이상 첨부해주세요.')
      }

      await createReviewApi({ promotionId, content: content.trim(), rate: Number(rate), photoUrls })
      onSuccess?.()
    } catch (e) {
      setIsError(true)
      setError(e)
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  return { createReview, isLoading, isError, error }
}
