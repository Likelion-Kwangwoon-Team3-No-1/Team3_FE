import { useEffect, useState } from 'react'
import { ListItem } from '../../../components/List/ListItem.jsx'
import { loadReviews } from '../../../utils/storage'

export function MyPromotionPage() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const saved = loadReviews()
    setReviews(saved)
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>내 프로모션</h2>
      {reviews.length === 0 ? (
        <p>작성된 리뷰가 없습니다.</p>
      ) : (
        <div>
          {reviews.map((review) => (
            <ListItem key={review.id} title={review.title} createdAt={review.date} />
          ))}
        </div>
      )}
    </div>
  )
}
