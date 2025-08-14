import React, { useEffect, useState } from 'react'
import { loadReviews } from '../../../utils/storage'

// 별점 아이콘
import filledStar from '../../../assets/review/review-fill.svg'
import unfilledStar from '../../../assets/review/review-unfilled.svg'

// 신고 / 체크박스 아이콘
import reportIcon from '../../../assets/review/review-report.svg'
import checkboxDefault from '../../../assets/review/review-checkbox-default.svg'
import checkboxFilled from '../../../assets/review/review-checkbox-filled.svg'

import './ReviewReportList.css'

export function ReviewReportList() {
  const [reviews, setReviews] = useState([])
  const [selectedMap, setSelectedMap] = useState({})
  const [reportedMap, setReportedMap] = useState({})
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

  const handleToggleSelect = (id) => {
    setSelectedMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleReport = (id) => {
    setReportedMap((prev) => ({ ...prev, [id]: true }))
    alert('신고가 접수되었습니다.')
  }

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
                <div className='review-actions'>
                  {/* 신고 버튼 */}
                  <button
                    type='button'
                    onClick={() => handleReport(review.id)}
                    className={`report-btn ${reportedMap[review.id] ? 'is-done' : ''}`}
                  >
                    <img src={reportIcon} alt='신고' />
                  </button>
                  {/* 체크박스 버튼 */}
                  <button
                    type='button'
                    onClick={() => handleToggleSelect(review.id)}
                    className='checkbox-btn'
                  >
                    <img
                      src={selectedMap[review.id] ? checkboxFilled : checkboxDefault}
                      alt='선택'
                    />
                  </button>
                </div>
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

export default ReviewReportList
