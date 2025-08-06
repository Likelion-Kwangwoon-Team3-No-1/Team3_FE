import { useEffect, useState } from 'react'
import { ListItem } from '../../../components/list/ListItem.jsx'
import { loadReviews } from '../../../utils/storage'

export function ReviewManagePage() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const saved = loadReviews()
    setReviews(saved)
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h2>리뷰 관리</h2>
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
