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

  const MAX_TEXT = 100
  const MAX_PHOTOS = 9 // 최대 사진 첨부 수

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    const next = [...previewUrls]
    files.forEach((file) => {
      if (next.length >= MAX_PHOTOS) return
      const reader = new FileReader()
      reader.onloadend = () => {
        if (next.length < MAX_PHOTOS) {
          next.push(reader.result)
          setPreviewUrls([...next])
        }
      }
      reader.readAsDataURL(file)
    })
    // 같은 파일 다시 선택 가능
    e.target.value = ''
  }

  const handleImageDelete = (indexToRemove) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== indexToRemove))
  }

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('상호명을 입력해주세요.')
      return
    }
    if (previewUrls.length === 0) {
      alert('영수증 사진을 최소 1장 첨부해주세요.')
      return
    }

    const newReview = {
      id: uuidv4(),
      title: title.trim(),
      rating,
      reviewText,
      photos: previewUrls,
      date: new Date().toISOString(),
    }

    const existing = loadReviews()
    saveReviews([newReview, ...existing])
    navigate('/home') // 제출하기 버튼 누른 후 이동 경로
  }

  const openFilePicker = () => fileInputRef.current?.click()

  return (
    <div className='review-page-wrapper'>
      {/* 좌측 뒤로가기, 중앙 타이틀 */}
      {/* <TopBar title='리뷰 작성' /> */}

      <div className='review-form-container'>
        {/* 상호명 */}
        <label htmlFor='shopName' className='field-label'>
          상호명
        </label>
        <input
          id='shopName'
          type='text'
          className='title-input'
          placeholder='상호명을 입력하세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* 별점 + 0/5 */}
        <div className='rating-section'>
          <Rating rating={rating} onRate={setRating} iconSize={32} />
          <span className='rating-count'>{rating}/5</span>
        </div>

        {/* 리뷰 내용 */}
        <label htmlFor='reviewText' className='field-label'>
          리뷰 내용
        </label>
        <div className='review-content-section'>
          <div className='textarea-wrapper'>
            <textarea
              id='reviewText'
              className='review-textarea'
              placeholder='리뷰를 작성해주세요'
              maxLength={MAX_TEXT}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <span className='char-counter'>
              {reviewText.length}/{MAX_TEXT}
            </span>
          </div>
        </div>

        {/* 안내문 */}
        <p className='photo-note'>* 영수증 사진 필수 첨부</p>

        {/* 사진 썸네일 3열 + 플러스 버튼 */}
        <div className='preview-gallery'>
          {previewUrls.map((url, idx) => (
            <div key={idx} className='image-wrapper'>
              <img src={url} alt={`preview-${idx}`} className='preview-image' />
              <button
                type='button'
                className='delete-button'
                aria-label='이미지 삭제'
                onClick={() => handleImageDelete(idx)}
              >
                ×
              </button>
            </div>
          ))}

          {previewUrls.length < MAX_PHOTOS && (
            <button
              type='button'
              className='plus-button'
              onClick={openFilePicker}
              aria-label='사진 추가'
            >
              <div className='plus-inner-circle'>
                <img src={plusIcon} alt='' className='plus-icon' />
              </div>
            </button>
          )}

          <input
            ref={fileInputRef}
            className='hidden-input'
            type='file'
            accept='image/*'
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/* 제출 버튼 */}
        <div className='submit-container'>
          <Button label='제출하기' onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
