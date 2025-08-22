import React, { useEffect, useState } from 'react'
import { instance } from '../../../api/client'
import filledStar from '../../../assets/review/review-fill.svg'
import unfilledStar from '../../../assets/review/review-unfilled.svg'
import reportIcon from '../../../assets/review/review-report.svg'
import checkboxDefault from '../../../assets/review/review-checkbox-default.svg'
import checkboxFilled from '../../../assets/review/review-checkbox-filled.svg'
import './ReviewReportList.css'

export function ReviewReportList({ promotionId }) {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [reportedMap, setReportedMap] = useState({})

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true)
        setIsError(false)

        const res = await instance.get('/reviews', {
          params: { promotionId: Number(promotionId) },
        })

        const data = res?.data || res
        setReviews(data.items || [])
      } catch (err) {
        console.error('리뷰 불러오기 실패:', err.response?.data || err.message)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (promotionId) fetchReviews()
  }, [promotionId])

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

  const handleSelect = (id) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }

  const handleReport = (id) => {
    setReportedMap((prev) => ({ ...prev, [id]: true }))
    alert('신고가 접수되었습니다.')
  }

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
                <div className='review-actions'>
                  {/* 신고 버튼 */}
                  <button
                    type='button'
                    onClick={() => handleReport(review.reviewId)}
                    className={`report-btn ${reportedMap[review.reviewId] ? 'is-done' : ''}`}
                  >
                    <img src={reportIcon} alt='신고' />
                  </button>
                  {/* 단일 선택 체크박스 */}
                  <button
                    type='button'
                    onClick={() => handleSelect(review.reviewId)}
                    className='checkbox-btn'
                  >
                    <img
                      src={selectedId === review.reviewId ? checkboxFilled : checkboxDefault}
                      alt='선택'
                    />
                  </button>
                </div>
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

export default ReviewReportList
