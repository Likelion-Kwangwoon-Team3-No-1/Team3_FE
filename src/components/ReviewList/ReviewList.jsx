import React, { useEffect, useState } from 'react'
import { instance } from '../../api/client'
import filledStar from '../../assets/review/review-fill.svg'
import unfilledStar from '../../assets/review/review-unfilled.svg'
import './ReviewList.css'

export function ReviewList() {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // 서버에서 내 리뷰 가져오기
  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      const res = await instance.get('/reviews/me') // 내 리뷰 조회 API
      setReviews(res.items || []) // 서버 응답 { items: [...], hasNext: ..., nextOffset: ... }
    } catch (err) {
      console.error('리뷰 불러오기 실패:', err.response?.data || err.message)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  // 별점 렌더링
  const renderStars = (rate) => (
    <div className='star-wrapper'>
      {[1, 2, 3, 4, 5].map((n) => (
        <img
          key={n}
          src={n <= rate ? filledStar : unfilledStar}
          alt={n <= rate ? '별점(채움)' : '별점(빈칸)'}
          className='star-icon'
        />
      ))}
    </div>
  )

  if (isLoading) return <p>로딩 중...</p>
  if (isError) return <p>리뷰를 불러오는 중 오류가 발생했습니다.</p>

  return (
    <div className='written-review-page'>
      {reviews.length === 0 ? (
        <p>아직 작성한 리뷰가 없습니다.</p>
      ) : (
        <ul className='review-list'>
          {reviews.map((review) => (
            <li key={review.reviewId} className='review-item'>
              <div className='review-title-row'>
                <h3 className='review-title'>{review.hostNickname}</h3>
              </div>
              <p className='review-nickname'>{review.nickname} 작성</p>
              {renderStars(review.rate)}
              <p className='review-text'>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
