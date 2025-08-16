import { useState } from 'react'
import { instance } from '../../../api/client'

// dataURL -> File 변환
function dataURLToFile(dataUrl, filename = 'image.jpg') {
  const arr = dataUrl.split(',')
  const mimeMatch = arr[0].match(/:(.*?);/)
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) u8arr[n] = bstr.charCodeAt(n)
  return new File([u8arr], filename, { type: mime })
}

export const useCreateReview = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  /**
   * @param {Object} params
   * @param {string} params.title        - 상호명
   * @param {number} params.rating       - 별점
   * @param {string} params.reviewText   - 리뷰 본문
   * @param {string[]} params.photos     - dataURL 배열
   * @param {Function} [params.onSuccess]
   * @param {Function} [params.onUploadProgress] - (progressEvent) => void
   */
  const createReview = async ({
    title,
    rating,
    reviewText,
    photos = [],
    onSuccess,
    onUploadProgress,
  }) => {
    setIsLoading(true)
    setIsError(false)
    setError(null)

    try {
      const form = new FormData()
      form.append('title', title)
      form.append('rating', String(rating))
      form.append('comment', reviewText || '')

      photos.forEach((dataUrl, i) => {
        if (!dataUrl) return
        const file = dataURLToFile(dataUrl, `photo_${i + 1}.jpg`)
        form.append('images', file) // 백엔드에서 images[]로 받도록
      })

      await instance.post('/reviews', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress, // 필요 없으면 안 넘겨도 됨
      })

      onSuccess?.()
    } catch (e) {
      console.error('리뷰 등록 실패:', e)
      setIsError(true)
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return { createReview, isLoading, isError, error }
}
