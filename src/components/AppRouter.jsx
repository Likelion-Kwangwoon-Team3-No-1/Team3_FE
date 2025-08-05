import { Route, Routes } from 'react-router-dom'
import { ReviewFormPage } from '../features/reviewform/ReviewFormPage'
import { ReviewPage } from '../features/review/ReviewPage'
import { AiFeedBackPage } from '../features/aifeedback/AiFeedBackPage'

import { HomeOwnerPage } from '../features/home/entry/HomeOwnerPage'
import { HomeStudentPage } from '../features/home/entry/HomeStudentPage'
import { PostBoardPage } from '../features/postboard/entry/PostBoardPage'
import { PostDetailPage } from '../features/postdetail/entry/PostDetailPage'
import { PostFormPage } from '../features/postform/entry/PostFormPage'
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

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/review' element={<ReviewPage />} />

      <Route path='/review-form' element={<ReviewFormPage />} />

      <Route path='/ai-feedback' element={<AiFeedBackPage />} />

      {/* 홈 */}
      <Route path='/home/owner' element={<HomeOwnerPage />} />
      <Route path='/home/student' element={<HomeStudentPage />} />

      {/* 모집 게시판 */}
      <Route path='/postboard' element={<PostBoardPage />} />
      <Route path='/postboard/:id' element={<PostDetailPage />} />

      {/* 모집글 작성 */}
      <Route path='/postform' element={<PostFormPage />} />

      {/* 회원가입 */}
      <Route path='/signup/owner' element={<SignupOwnerPage />} />
      <Route path='/signup/student' element={<SignupStudentPage />} />

      {/* 로그인 */}
      <Route path='/login' element={<LoginPage />} />

      {/* 마이페이지 */}
      <Route path='/mypage/owner/:ownerId' element={<MypageOwnerPage />} />
      <Route path='/mypage/student/:studentId' element={<MypageStudentPage />} />

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
    </Routes>
  )
}
