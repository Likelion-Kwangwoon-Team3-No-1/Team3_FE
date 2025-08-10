import { useEffect, useState } from 'react'
import '../ui/WrittenReviewPage.css'

// 테스트용 상수
const TEST_MATE_ID = 'student_123' // 대학생 아이디
const TEST_PROMO_ID = 'promo_001' // 프로모션 ID

export function WrittenReviewPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true)
        setError(null)

        const url = `/reviews?mateId=${encodeURIComponent(
          TEST_MATE_ID,
        )}&promotionId=${encodeURIComponent(TEST_PROMO_ID)}`

        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        })

        if (!res.ok) throw new Error(`서버 오류: ${res.status}`)

        const data = await res.json()
        setReviews(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) return <div className='loading'>리뷰 불러오는 중...</div>
  if (error) return <div className='error'>에러: {error}</div>
  if (!reviews.length) return <div className='empty'>작성된 리뷰가 없습니다.</div>

  return (
    <div className='written-review-container'>
      <h2 className='page-title'>리뷰 목록</h2>
      <ul className='review-list'>
        {reviews.map((r) => (
          <li key={r.id} className='review-card'>
            <div className='review-title'>{r.title}</div>
            <div className='review-meta'>
              대학생 아이디: {r.mateId} · 별점: {r.rating}/5
            </div>
            <p className='review-text'>{r.reviewText}</p>

            {!!(r.photos && r.photos.length) && (
              <div className='review-photos'>
                {r.photos.map((url, i) => (
                  <img key={`${r.id}-${i}`} src={url} alt={`photo-${i}`} className='review-photo' />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
