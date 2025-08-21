import { ReviewList } from '../../../components/ReviewList/ReviewList'
import TopBar from '../../../components/TopBar/TopBar'

export function WrittenReviewPage() {
  return (
    <div>
      <TopBar title='작성한 리뷰' /> <ReviewList />
    </div>
  )
}
