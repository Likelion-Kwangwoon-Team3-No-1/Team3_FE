import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { instance } from '../../../api/client'
import TopBar from '../../../components/TopBar/TopBar'
import { Button } from '../../../components/Button/Button'
import ReviewReportList from '../components/ReviewReportList'
import '../ui/ReviewPage.css'

export function ReviewPage() {
  const { promotionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [reviews, setReviews] = useState([])
  const [allPhotos, setAllPhotos] = useState([])
  const [selectedPhotoIdxSet, setSelectedPhotoIdxSet] = useState(new Set())

  // 리뷰 & 사진 불러오기
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await instance.get('/reviews', {
          params: { promotionId: Number(promotionId) },
        })
        const items = res?.items || []
        setReviews(items)

        // 리뷰의 모든 사진 URL 모으기
        const urls = items.flatMap((r) => r.photoUrls || []).filter(Boolean)
        const newPhotos = location.state?.newReviewPhotos || []
        setAllPhotos([...newPhotos, ...urls])
      } catch (err) {
        console.error('리뷰 불러오기 실패:', err.response?.data || err.message)
      }
    }

    if (promotionId) fetchReviews()
  }, [promotionId, location.state])

  // 사진 선택 토글
  const handleTogglePhoto = useCallback((idx) => {
    setSelectedPhotoIdxSet((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }, [])

  // 제작 버튼 클릭 → 선택 사진만 mediaUrls로 서버에 저장
  const handleGenerate = async () => {
    try {
      const selectedPhotos = allPhotos.filter((_, idx) => selectedPhotoIdxSet.has(idx))

      if (selectedPhotos.length === 0) {
        alert('사진을 최소 1장 이상 선택해주세요.')
        return
      }

      await instance.post('/generated-sns', {
        promotionId: Number(promotionId),
        mediaUrls: selectedPhotos, // 선택한 사진만 저장
      })

      // 이후 AI 피드백 페이지로 이동
      navigate('/ai-feedback', { state: { promotionId: Number(promotionId) } })
    } catch (err) {
      console.error('AI 게시물 생성 실패:', err)
      alert('게시물 생성에 실패했습니다.')
    }
  }

  return (
    <div className='reviewPage'>
      <div className='reviewPage__header'>
        <TopBar title='리뷰 확인' />
      </div>

      {/* 상단 사진 선택 그리드 */}
      <div className='reviewPage__photoGridWrap'>
        <div className='reviewPage__photoGrid'>
          {allPhotos.slice(0, 30).map((url, idx) => {
            const selected = selectedPhotoIdxSet.has(idx)
            return (
              <div
                key={idx}
                className={`reviewPage__photoItem ${selected ? 'is-selected' : ''}`}
                onClick={() => handleTogglePhoto(idx)}
                role='button'
                tabIndex={0}
              >
                <img
                  className='reviewPage__photoImg'
                  src={url}
                  alt={`review-photo-${idx}`}
                  draggable={false}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                {selected && <span className='reviewPage__photoBadge'>선택됨</span>}
              </div>
            )
          })}
        </div>
      </div>

      {/* 리뷰 리스트 */}
      <div className='reviewPage__scroll'>
        <ReviewReportList reviews={reviews} />
      </div>

      {/* 하단 버튼 */}
      <div className='reviewPage__footer'>
        <Button label='제작' onClick={handleGenerate} />
      </div>
    </div>
  )
}

export default ReviewPage
