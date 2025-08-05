import { Route, Routes } from 'react-router-dom'
import { ReviewFormPage } from '../features/reviewform/entry/ReviewFormPage'
import { ReviewPage } from '../features/review/entry/ReviewPage'
import { AiFeedBackPage } from '../features/aifeedback/entry/AiFeedBackPage'
import { CreatedPostPage } from '../features/createdpost/entry/CreatedPostPage'
import { ReviewManagePage } from '../features/listmanage/entry/ReviewManagePage'
import { BringContentPage } from '../features/listmanage/entry/BringContentPage'
import { WrittenReviewPage } from '../features/listmanage/entry/WrittenReviewPage'
import { ContentPreviewPage } from '../features/preview/entry/ContentPreviewPage'
import { ReportPage } from '../features/report/entry/ReportPage'

export const AppRouter = () => {
  return (
    <Routes>
      {/* 리뷰 확인 */}
      <Route path='/review' element={<ReviewPage />} />

      {/* 리뷰 작성 */}
      <Route path='/review-form' element={<ReviewFormPage />} />

      {/* AI 피드백 페이지 */}
      <Route path='/ai-feedback' element={<AiFeedBackPage />} />

      {/* 제작한 게시물 페이지 */}
      <Route path='/created-post' element={<CreatedPostPage />} />

      {/* 확정 콘텐츠 불러오기 */}
      <Route path='/bring-content' element={<BringContentPage />} />

      {/* 리뷰 관리 페이지 */}
      <Route path='/review-manage' element={<ReviewManagePage />} />

      {/* 작성한 리뷰 페이지 */}
      <Route path='/written-review' element={<WrittenReviewPage />} />

      {/* 생성된 컨텐츠 미리보기 */}
      <Route path='/content-preview' element={<ContentPreviewPage />} />

      {/* 신고된 리뷰 페이지 */}
      <Route path='/report' element={<ReportPage />} />
    </Routes>
  )
}
