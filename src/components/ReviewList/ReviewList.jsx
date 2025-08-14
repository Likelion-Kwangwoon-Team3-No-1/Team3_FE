import React, { useEffect, useState } from 'react'
import { loadReviews } from '../../utils/storage'
import filledStar from '../../assets/review/review-fill.svg'
import unfilledStar from '../../assets/review/review-unfilled.svg'
import './ReviewList.css'

export function ReviewList() {
  const [reviews, setReviews] = useState([])
  const USER_NICKNAME = '홍길동'

  useEffect(() => {
    const storedReviews = loadReviews()
    setReviews(storedReviews)
  }, [])

  const renderStars = (rating) => (
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
    <div className='written-review-page'>
      {reviews.length === 0 ? (
        <p>아직 작성한 리뷰가 없습니다.</p>
      ) : (
        <ul className='review-list'>
          {reviews.map((review) => (
            <li key={review.id} className='review-item'>
              <div className='review-title-row'>
                <h3 className='review-title'>{review.title}</h3>
              </div>
              <p className='review-nickname'>{USER_NICKNAME} 작성</p>
              {renderStars(review.rating)}
              <p className='review-text'>{review.reviewText}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
