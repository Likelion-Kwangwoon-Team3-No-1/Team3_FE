import { Route, Routes } from 'react-router-dom'
import { ReviewFormPage } from '../features/reviewform/entry/ReviewFormPage'
import { ReviewPage } from '../features/review/entry/ReviewPage'
import { AiFeedBackPage } from '../features/aifeedback/entry/AiFeedBackPage'
import { CreatedPostPage } from '../features/createdpost/entry/CreatedPostPage'
import { ContentPreviewPage } from '../features/preview/entry/ContentPreviewPage'
import { ReportPage } from '../features/report/entry/ReportPage'
import { MyPromotionPage } from '../features/listmanage/entry/MyPromotionPage'
import { WrittenReviewPage } from '../features/writtenreview/entry/WrittenReviewPage'

import { HomeOwnerPage } from '../features/home/entry/HomeOwnerPage'
import { HomeStudentPage } from '../features/home/entry/HomeStudentPage'
import { PostBoardPage } from '../features/postboard/entry/PostBoardPage'
import { PostDetailPage } from '../features/postdetail/entry/PostDetailPage'
import { PostFormPage } from '../features/postform/entry/PostFormPage'
import { SignupPage } from '../features/signup/entry/SignupPage'
import { SignupOwnerPage } from '../features/signup/entry/SignupOwnerPage'
import { SignupStudentPage } from '../features/signup/entry/SignupStudentPage'
import { LoginPage } from '../features/login/entry/LoginPage'
import { MypageOwnerPage } from '../features/mypage/entry/MypageOwnerPage'
import { MypageStudentPage } from '../features/mypage/entry/MypageStudentPage'
import { InfoProfileOwnerPage } from '../features/infoprofile/entry/InfoProfileOwnerPage'
import { InfoProfileStudentPage } from '../features/infoprofile/entry/InfoProfileStudentPage'
import { HelpPage } from '../features/help/entry/HelpPage'
import { ServicePage } from '../features/service/entry/ServicePage'
import { OnGoingPromoPage } from '../features/ongoingpromo/entry/OnGoingPromoPage'
import { EndedPromoPage } from '../features/endedpromo/entry/EndedPromoPage'
import { SplashPage } from '../features/splash/entry/SplashPage'
import { OnBoardingOwnerPage } from '../features/onboarding/entry/OnBoardingOwnerPage'
import { OnBoardingStudentPage } from '../features/onboarding/entry/OnBoardingStudentPage'
import AdminPage from '../features/admin/entry/AdminPage'
import { CheckoutPage } from '../features/payments/entry/CheckoutPage'

export const AppRouter = () => {
  return (
    <Routes>
      {/* 첫 화면. 배포 시 LoginPage => SplashPage로 변경하기*/}
      <Route path='/' element={<LoginPage />} />

      {/* 리뷰 확인 */}
      <Route path='/review/:promotionId' element={<ReviewPage />} />

      {/* 리뷰 작성 */}
      <Route path='/review-form/:promotionId' element={<ReviewFormPage />} />

      {/* AI 피드백 페이지 */}
      <Route path='/ai-feedback' element={<AiFeedBackPage />} />

      {/* 제작한 게시물 페이지 */}
      <Route path='/created-post' element={<CreatedPostPage />} />

      {/* 내 프로모션 페이지 */}
      <Route path='/my-promotion/:hostId' element={<MyPromotionPage />} />

      {/* 작성한 리뷰 페이지 */}
      <Route path='/written-review' element={<WrittenReviewPage />} />

      {/* 생성된 컨텐츠 미리보기 */}
      <Route path='/content-preview' element={<ContentPreviewPage />} />

      {/* 신고된 리뷰 페이지 */}
      <Route path='/report' element={<ReportPage />} />

      {/* 홈 */}
      <Route path='/home/owner' element={<HomeOwnerPage />} />
      <Route path='/home/student' element={<HomeStudentPage />} />

      {/* 모집 게시판 */}
      <Route path='/postboard' element={<PostBoardPage />} />
      {/* 모집글 상세 */}
      <Route path='/postboard/:promotionId' element={<PostDetailPage />} />

      {/* 모집글 작성 */}
      <Route path='/postform' element={<PostFormPage />} />

      {/* 회원가입 */}
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/signup/owner' element={<SignupOwnerPage />} />
      <Route path='/signup/student' element={<SignupStudentPage />} />

      {/* 로그인 */}
      <Route path='/login' element={<LoginPage />} />

      {/* 마이페이지 */}
      <Route path='/mypage/owner/' element={<MypageOwnerPage />} />
      <Route path='/mypage/student/' element={<MypageStudentPage />} />

      {/* 프로필 정보 */}
      <Route path='mypage/owner/:ownerId/infoProfile' element={<InfoProfileOwnerPage />} />
      <Route path='mypage/student/:studentId/infoProfile' element={<InfoProfileStudentPage />} />

      {/* 도움말 */}
      <Route path='/mypage/help' element={<HelpPage />} />
      {/* 서비스 */}
      <Route path='/mypage/sevice' element={<ServicePage />} />

      {/* 진행중인 프로모션 */}
      <Route path='/ongoingpromo' element={<OnGoingPromoPage />} />

      {/* 마감한 프로모션 */}
      <Route path='/endedpromo' element={<EndedPromoPage />} />

      {/* 스플래쉬 */}
      <Route path='/splash' element={<SplashPage />} />

      {/* 온보딩 */}
      <Route path='/onboarding/owner' element={<OnBoardingOwnerPage />} />
      <Route path='/onboarding/student' element={<OnBoardingStudentPage />} />

      {/* 관리자 */}
      <Route path='/admin' element={<AdminPage />} />

      {/* 결제 */}
      <Route path='/payments' element={<CheckoutPage />} />
    </Routes>
  )
}
