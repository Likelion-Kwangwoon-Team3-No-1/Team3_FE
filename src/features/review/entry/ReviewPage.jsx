import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { loadReviews } from '../../../utils/storage'
import ReviewReportList from '../components/ReviewReportList'
import '../ui/ReviewPage.css'
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver'
import TopBar from '../../../components/TopBar/TopBar'
import { Button } from '../../../components/Button/Button'
import { instance } from '../../../api/client'

export function ReviewPage() {
  const [reviews, setReviews] = useState([])
  const { promotionId } = useParams()
  const navigate = useNavigate()

  const [selectedPhotoIdxSet, setSelectedPhotoIdxSet] = useState(new Set())

  const PAGE_SIZE = 10
  const [visibleReviews, setVisibleReviews] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasNext, setHasNext] = useState(true)

  const observerRef = useRef(null)

  useEffect(() => {
    const data = loadReviews ? loadReviews() : []
    const arr = Array.isArray(data) ? data : []
    setReviews(arr)
  }, [])

  const allPhotos = useMemo(
    () => reviews.flatMap((r) => r.photos || r.previewUrls || []).filter(Boolean),
    [reviews],
  )

  const handleTogglePhoto = useCallback((idx) => {
    setSelectedPhotoIdxSet((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }, [])

  useEffect(() => {
    const first = reviews.slice(0, PAGE_SIZE)
    setVisibleReviews(first)
    setPage(first.length ? 1 : 0)
    setHasNext(reviews.length > first.length)
  }, [reviews])

  const loadNextPage = useCallback(async () => {
    if (isLoading || !hasNext) return
    setIsLoading(true)
    try {
      const start = page * PAGE_SIZE
      const end = start + PAGE_SIZE
      const nextChunk = reviews.slice(start, end)

      setVisibleReviews((prev) => [...prev, ...nextChunk])
      setPage((p) => p + 1)
      setHasNext(end < reviews.length)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, hasNext, page, reviews])

  useIntersectionObserver(
    observerRef,
    loadNextPage,
    !isLoading && hasNext && visibleReviews.length > 0,
  )

  // 제작 버튼: AI 게시물 생성 후 이동
  const handleGenerate = async () => {
    try {
      const res = await instance.post('/generated-sns', { promotionId: Number(promotionId) })
      console.log('AI 생성 응답:', res)

      const items = res.items || []
      if (!items.length) {
        alert('AI 생성된 게시물이 없습니다.')
        return
      }

      navigate('/ai-feedback', {
        state: {
          promotionId: Number(promotionId),
          items,
        },
      })
    } catch (err) {
      console.error('AI 게시물 생성 실패:', err)
      alert('게시물 생성에 실패했습니다.')
    }
  }

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

      {/* 스크롤 영역 */}
      <div className='reviewPage__scroll'>
        <ReviewReportList promotionId={promotionId} />

        {isLoading && <p className='infoText'>불러오는 중…</p>}
        {!isLoading && visibleReviews.length === 0 && (
          <p className='infoText'>아직 등록된 리뷰가 없습니다.</p>
        )}
        <div ref={observerRef} style={{ height: 1 }} />
      </div>

      {/* 하단 버튼 */}
      <div className='reviewPage__footer'>
        <Button label='제작' onClick={handleGenerate} />
      </div>
    </div>
  )
}

export default ReviewPage
