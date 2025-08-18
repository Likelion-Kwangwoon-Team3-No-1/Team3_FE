import { ReviewList } from '../../../components/ReviewList/ReviewList'
import { useMyReviews } from '../../..//features/review/api/useMyReviews'

export function WrittenReviewPage() {
  const { items, hasNext, load, loading, error } = useMyReviews(10)

  // 무한스크롤 센티넬에서 load 호출하면 됨
  return (
    <ReviewList
      reviews={items}
      hasNext={hasNext}
      onLoadMore={load}
      loading={loading}
      error={error}
    />
  )
}
