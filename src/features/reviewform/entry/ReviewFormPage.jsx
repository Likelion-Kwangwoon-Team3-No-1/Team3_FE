import { useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../ui/ReviewFormPage.css'
import { saveReviews, loadReviews } from '../../../utils/storage'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../../../components/Button/Button'
import { Rating } from '../../../components/Rating/Rating'
import plusIcon from '../../../assets/review/plus.svg'
import { useCreateReview } from '../api/useCreateReview'
import TopBar from '../../../components/TopBar/TopBar'

export function ReviewFormPage() {
  const [previewUrls, setPreviewUrls] = useState([])
  const [rate, setRate] = useState(0)
  const [shopTitle, setShopTitle] = useState('') // 화면 표시용
  const [content, setContent] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const { createReview, isLoading } = useCreateReview()

  // URL 파라미터에서 읽음
  const { promotionId: paramId } = useParams()
  const promotionId = isNaN(Number(paramId)) ? paramId : Number(paramId)

  const MAX_TEXT = 100
  const MAX_PHOTOS = 8

  const openFilePicker = () => fileInputRef.current?.click()
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const next = [...previewUrls]
    files.forEach((file) => {
      if (next.length >= MAX_PHOTOS) return
      const reader = new FileReader()
      reader.onloadend = () => {
        if (next.length < MAX_PHOTOS) {
          next.push(reader.result) // dataURL
          setPreviewUrls([...next])
        }
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }
  const handleImageDelete = (idx) => setPreviewUrls((prev) => prev.filter((_, i) => i !== idx))

  const handleSubmit = async () => {
    if (promotionId === undefined || promotionId === null || promotionId === '') {
      alert('promotionId가 없습니다. 경로/호출부를 확인해주세요.')
      return
    }
    if (rate <= 0) return alert('별점을 선택해주세요.')
    if (!content.trim()) return alert('리뷰 내용을 입력해주세요.')
    if (previewUrls.length === 0) return alert('영수증 사진을 최소 1장 첨부해주세요.')

    try {
      await createReview({
        promotionId,
        content,
        rate,
        photoUrls: previewUrls, // 현재 dataURL 배열을 그대로 보냄
        onSuccess: () => {
          const newReview = {
            id: uuidv4(),
            title: shopTitle.trim(),
            rating: rate,
            reviewText: content,
            photos: previewUrls,
            date: new Date().toISOString(),
            promotionId,
          }
          const existing = loadReviews()
          saveReviews([newReview, ...(Array.isArray(existing) ? existing : [])])
          navigate('/home')
        },
      })
    } catch (e) {
      alert(e?.message || '등록에 실패했습니다.')
    }
  }

  return (
    <div className='page-fixed-393'>
      <TopBar title='리뷰 작성' />

      <div className='review-form-container'>
        <label htmlFor='shopName' className='field-label'>
          상호명
        </label>
        <input
          id='shopName'
          type='text'
          className='title-input'
          placeholder='상호명을 입력하세요'
          value={shopTitle}
          onChange={(e) => setShopTitle(e.target.value)}
        />

        <div className='rating-section'>
          <Rating rating={rate} onRate={setRate} iconSize={32} />
          <span className='rating-count'>{rate}/5</span>
        </div>

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
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <span className='char-counter'>
              {content.length}/{MAX_TEXT}
            </span>
          </div>
        </div>

        <p className='photo-note'>* 영수증 사진 필수 첨부</p>

        <div className='preview-gallery'>
          {previewUrls.map((url, idx) => (
            <div key={idx} className='image-wrapper'>
              <img src={url} alt={`preview-${idx}`} className='preview-image' />
              <button
                type='button'
                className='delete-button'
                onClick={() => handleImageDelete(idx)}
              >
                ×
              </button>
            </div>
          ))}

          {previewUrls.length < MAX_PHOTOS && (
            <button type='button' className='plus-button' onClick={openFilePicker}>
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

        <div className='submit-container'>
          <Button
            label={isLoading ? '제출 중...' : '제출하기'}
            onClick={handleSubmit}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
