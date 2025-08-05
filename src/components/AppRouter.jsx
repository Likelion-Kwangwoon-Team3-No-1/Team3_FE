import { Route, Routes } from 'react-router-dom'
import { ReviewFormPage } from '../features/reviewform/ReviewFormPage'
import { ReviewPage } from '../features/review/ReviewPage'
import { AiFeedBackPage } from '../features/aifeedback/AiFeedBackPage'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path='/review' element={<ReviewPage />} />

      <Route path='/review-form' element={<ReviewFormPage />} />

      <Route path='/ai-feedback' element={<AiFeedBackPage />} />
    </Routes>
  )
}
