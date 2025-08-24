import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../ui/ReviewFormPage.css'
import { Button } from '../../../components/Button/Button'
import { Rating } from '../../../components/Rating/Rating'
import plusIcon from '../../../assets/review/plus.svg'
import { useCreateReview } from '../api/useCreateReview'
import TopBar from '../../../components/TopBar/TopBar'
import { instance } from '../../../api/client'

export function ReviewFormPage() {
  const [previewUrls, setPreviewUrls] = useState([]) // 화면 미리보기용
  const [photoUrls, setPhotoUrls] = useState([]) // 서버에서 내려준 S3 URL 배열
  const [rate, setRate] = useState(0)
  const [shopTitle, setShopTitle] = useState('')
  const [content, setContent] = useState('')
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const { createReview, isLoading } = useCreateReview()

  const { promotionId: paramId } = useParams()
  const promotionId = isNaN(Number(paramId)) ? paramId : Number(paramId)

  const MAX_TEXT = 100
  const MAX_PHOTOS = 8

  // 파일 선택창 열기
  const openFilePicker = () => fileInputRef.current?.click()

  // 파일 업로드 → 서버 응답 urls → photoUrls에 저장
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return

    for (const file of files) {
      if (photoUrls.length >= MAX_PHOTOS) break

      // 미리보기 이미지
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrls((prev) => [...prev, reader.result])
      }
      reader.readAsDataURL(file)

      // 서버 업로드
      const formData = new FormData()
      formData.append('photos', file) // 명세서: key는 photos

      try {
        const res = await instance.post(
          `/uploads/review-photos?promotionId=${promotionId}`, // promotionId는 query string
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
              // Content-Type은 자동 설정 (절대 직접 넣지 말기)
            },
          },
        )

        console.log('업로드 성공 응답:', res)
        const urls = res.urls || []
        if (urls.length > 0) {
          setPhotoUrls((prev) => [...prev, ...urls])
        }
      } catch (err) {
        console.error('파일 업로드 실패:', err.response?.data || err.message)
        alert('사진 업로드에 실패했습니다.')
      }
    }

    e.target.value = ''
  }

  const handleImageDelete = (idx) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== idx))
    setPhotoUrls((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!promotionId) return alert('promotionId가 없습니다.')
    if (rate <= 0) return alert('별점을 선택해주세요.')
    if (!content.trim()) return alert('리뷰 내용을 입력해주세요.')
    if (photoUrls.length === 0) return alert('사진을 최소 1장 업로드해야 합니다.')

    try {
      await createReview({
        promotionId,
        rate,
        content,
        photoUrls, // 서버에서 준 URL 배열 그대로 전송
      })

      setRate(0)
      setContent('')
      setPreviewUrls([])
      setPhotoUrls([])

      navigate('/home/student', { state: { newReviewPhotos: photoUrls } })
    } catch (err) {
      console.error('리뷰 등록 실패', err)
      alert('리뷰 등록에 실패했습니다.')
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

        <p className='photo-note'>* 사진 필수 1장 이상 업로드</p>

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
            type='file'
            accept='image/*'
            multiple
            className='hidden-input'
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
