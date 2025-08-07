import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../ui/ReviewFormPage.css'
import { saveReviews, loadReviews } from '../../../utils/storage'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../../../components/Button/Button'
import { Rating } from '../../../components/Rating/Rating'
import plusIcon from '../../../assets/review/plus.svg'

export function ReviewFormPage() {
  const [previewUrls, setPreviewUrls] = useState([])
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [reviewText, setReviewText] = useState('')
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const newPreviewUrls = [...previewUrls]

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviewUrls.push(reader.result)
        if (newPreviewUrls.length <= 9) {
          setPreviewUrls([...newPreviewUrls])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const handleImageDelete = (indexToRemove) => {
    const updated = previewUrls.filter((_, i) => i !== indexToRemove)
    setPreviewUrls(updated)
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
      <h3>상호명</h3>
      <input
        type='text'
        className='title-input'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className='rating-section'>
        <Rating rating={rating} onRate={setRating} iconSize={32} />
        <span className='rating-count'>{rating}/5</span>
      </div>

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

      <div className='preview-gallery'>
        {previewUrls.map((url, index) => (
          <div key={index} className='image-wrapper'>
            <img src={url} alt={`preview-${index}`} className='preview-image' />
            <button
              type='button'
              className='delete-button'
              onClick={() => handleImageDelete(index)}
            >
              ×
            </button>
          </div>
        ))}

        {previewUrls.length < 9 && (
          <div className='plus-button' onClick={() => fileInputRef.current.click()}>
            <div className='plus-inner-circle'>
              <img src={plusIcon} alt='plus icon' className='plus-icon' />
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          id='fileInput'
          type='file'
          accept='image/*'
          multiple
          onChange={handleFileChange}
          className='hidden-input'
        />
      </div>

      <div className='submit-container'>
        <Button label='제출하기' onClick={handleSubmit} />
      </div>
    </div>
  )
}
