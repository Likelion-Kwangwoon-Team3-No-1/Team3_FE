import React, { useEffect, useState } from 'react'
import { loadReviews } from '../../../utils/storage'

// 별점 아이콘
import filledStar from '../../../assets/review/review-fill.svg'
import unfilledStar from '../../../assets/review/review-unfilled.svg'

import './ReportReviewList.css'

/**
 * props:
 * - onApprove?: (review) => void
 * - onReject?: (review) => void
 * - approveLabel?: string (default: '승인')
 * - rejectLabel?: string (default: '반려')
 */
export function ReportReviewList({
  onApprove,
  onReject,
  approveLabel = '승인',
  rejectLabel = '반려',
}) {
  const [reviews, setReviews] = useState([])
  const USER_NICKNAME = '홍길동'

  useEffect(() => {
    const stored = loadReviews()
    setReviews(Array.isArray(stored) ? stored : [])
  }, [])

  const renderStars = (rating = 0) => (
    <div className='star-wrapper'>
      {[1, 2, 3, 4, 5].map((n) => (
        <img
          key={n}
          src={n <= rating ? filledStar : unfilledStar}
          alt={n <= rating ? '별점(채움)' : '별점(빈칸)'}
          className='star-icon'
        />
      ))}
    </div>
  )

  return (
    <div className='report-list-scope written-review-page'>
      {reviews.length === 0 ? (
        <p>아직 작성한 리뷰가 없습니다.</p>
      ) : (
        <ul className='review-list'>
          {reviews.map((review) => (
            <li key={review.id} className='review-item'>
              <h3 className='review-title'>{review.title}</h3>

              <p className='review-nickname'>{USER_NICKNAME} 작성</p>
              {renderStars(review.rating)}
              <p className='review-text'>{review.reviewText}</p>

              {/* ✅ 항상 하단에 큰 버튼 2개 */}
              <div className='review-actions-bottom'>
                <button
                  type='button'
                  className='review-btn review-btn--primary'
                  onClick={() => onApprove?.(review)}
                >
                  {approveLabel}
                </button>
                <button
                  type='button'
                  className='review-btn review-btn--primary'
                  onClick={() => onReject?.(review)}
                >
                  {rejectLabel}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ReportReviewList
