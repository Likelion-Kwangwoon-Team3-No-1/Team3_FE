import { useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReviewReportList from '../components/ReviewReportList'
import '../ui/ReviewPage.css'
import TopBar from '../../../components/TopBar/TopBar'
import { Button } from '../../../components/Button/Button'
import { instance } from '../../../api/client'

export function ReviewPage() {
  const { promotionId } = useParams()
  const navigate = useNavigate()

  const [reviews, setReviews] = useState([])
  const [selectedPhotoIdxSet, setSelectedPhotoIdxSet] = useState(new Set())

  // 사진 선택 toggle
  const handleTogglePhoto = useCallback((idx) => {
    setSelectedPhotoIdxSet((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }, [])

  // AI 게시물 생성 버튼
  // 제작 버튼: AI 게시물 생성 후 이동
  const handleGenerate = async () => {
    try {
      // ✅ 선택된 사진 뽑기
      const selectedPhotos = allPhotos.filter((_, idx) => selectedPhotoIdxSet.has(idx))

      const res = await instance.post('/generated-sns', { promotionId: Number(promotionId) })
      console.log('AI 생성 응답:', res)

      const items = res.data?.items || []
      if (!items.length) {
        alert('AI 생성된 게시물이 없습니다.')
        return
      }

      // ContentPreviewPage로 이동하면서 selectedPhotos도 같이 전달
      navigate('/ai-preview', {
        state: {
          promotionId: Number(promotionId),
          items,
          selectedPhotos,
        },
      })
    } catch (err) {
      console.error('AI 게시물 생성 실패:', err)
      alert('게시물 생성에 실패했습니다.')
    }
  }

  // 상단 그리드에 표시할 모든 사진
  const allPhotos = reviews.flatMap((r) => r.photoUrls || []).filter(Boolean)

  return (
    <div className='reviewPage'>
      <div className='reviewPage__header'>
        <TopBar title='리뷰' />
      </div>

      {/* 상단 사진 그리드 */}
      <div className='reviewPage__photoGrid'>
        {allPhotos.slice(0, 30).map((src, idx) => {
          const selected = selectedPhotoIdxSet.has(idx)
          return (
            <div key={idx} className={`reviewPage__photoItem ${selected ? 'is-selected' : ''}`}>
              <img
                className='reviewPage__photoImg'
                src={src}
                alt=''
                role='button'
                tabIndex={0}
                onClick={() => handleTogglePhoto(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleTogglePhoto(idx)
                  }
                }}
                draggable={false}
              />
              {selected && <span className='reviewPage__photoBadge'>선택됨</span>}
            </div>
          )
        })}
      </div>

      {/* 리뷰 리스트 (API 호출 담당) */}
      <div className='reviewPage__scroll'>
        <ReviewReportList promotionId={promotionId} onLoad={setReviews} />
      </div>

      {/* 하단 버튼 */}
      <div className='reviewPage__footer'>
        <Button label='제작' onClick={handleGenerate} />
      </div>
    </div>
  )
}

export default ReviewPage
