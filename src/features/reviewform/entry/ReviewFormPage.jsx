import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../ui/ReviewFormPage.css'
import { saveReviews, loadReviews } from '../../../utils/storage'
import { v4 as uuidv4 } from 'uuid'

export function ReviewFormPage() {
  const [previewUrls, setPreviewUrls] = useState([])
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [reviewText, setReviewText] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const newPreviewUrls = []

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviewUrls.push(reader.result)
        if (newPreviewUrls.length === files.length) {
          setPreviewUrls(newPreviewUrls)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleRatingClick = (value) => {
    setRating(value)
  }

  const handleSubmit = () => {
    const newReview = {
      id: uuidv4(),
      title,
      rating,
      reviewText,
      photos: previewUrls,
      date: new Date().toISOString(),
    }

    const existing = loadReviews()
    saveReviews([newReview, ...existing])

    navigate('/home')
  }

  return (
    <div className='review-form-container'>
      {/* 상호명 */}
      <h3>상호명</h3>
      <input
        type='text'
        className='title-input'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 별점 */}
      <div className='rating-section'>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${value <= rating ? 'filled' : ''}`}
            onClick={() => handleRatingClick(value)}
          >
            ★
          </span>
        ))}
        <span className='rating-count'>{rating}/5</span>
      </div>
      <div className='photo-upload-wrapper'>
        <label htmlFor='fileInput' className='photo-upload-button'>
          사진 첨부
        </label>
        <input
          id='fileInput'
          type='file'
          accept='image/*'
          multiple
          onChange={handleFileChange}
          className='hidden-input'
        />
      </div>

      {/* 리뷰 입력 + 글자수 카운터 */}
      <div className='review-content-section'>
        <div className='textarea-wrapper'>
          <h3>리뷰 내용</h3>
          <textarea
            className='review-textarea'
            maxLength={100}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className='char-counter'>{reviewText.length}/100</div>
        </div>
      </div>

      <div className='photo-note'>* 영수증 사진 필수 첨부</div>

      {/* 이미지 미리보기 */}
      {previewUrls.length > 0 && (
        <div className='preview-gallery'>
          {previewUrls.map((url, index) => (
            <img key={index} src={url} alt={`미리보기 ${index + 1}`} className='preview-image' />
          ))}
        </div>
      )}

      {/* 제출 */}
      <div className='submit-container'>
        <button className='submit-button' onClick={handleSubmit}>
          제출하기
        </button>
      </div>
    </div>
  )
}
