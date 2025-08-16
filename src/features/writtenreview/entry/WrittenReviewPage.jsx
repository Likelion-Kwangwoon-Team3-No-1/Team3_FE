import TopBar from '../../../components/TopBar/TopBar'
import { ReviewList } from '../../../components/ReviewList/ReviewList'
import '../ui/WrittenReviewPage.css' // 고정폭 스타일 적용

export const WrittenReviewPage = () => {
  return (
    <div className='page-fixed-393'>
      {/* 상단바 */}
      <TopBar title='작성한 리뷰' />

      {/* 리뷰 리스트 */}
      <ReviewList />
    </div>
  )
}

export default WrittenReviewPage
