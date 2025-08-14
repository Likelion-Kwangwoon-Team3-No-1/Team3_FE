import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadReviews } from '../../../utils/storage'
import ReviewReportList from '../components/ReviewReportList'
import '../ui/ReviewPage.css'
import { Button } from '../../../components/Button/Button'
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver'

export function ReviewPage() {
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])

  // ✅ 사진 선택 상태 (index 기반)
  const [selectedPhotoIdxSet, setSelectedPhotoIdxSet] = useState(new Set())

  // 무한스크롤용 상태
  const PAGE_SIZE = 10
  const [visibleReviews, setVisibleReviews] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasNext, setHasNext] = useState(true)

  // 센티넬 ref (관찰 대상)
  const observerRef = useRef(null)

  useEffect(() => {
    const data = loadReviews ? loadReviews() : []
    const arr = Array.isArray(data) ? data : []
    setReviews(arr)
  }, [])

  // 상단 사진
  const allPhotos = useMemo(
    () => reviews.flatMap((r) => r.photos || r.previewUrls || []).filter(Boolean),
    [reviews],
  )

  // ✅ 사진 선택 토글
  const handleTogglePhoto = useCallback((idx) => {
    setSelectedPhotoIdxSet((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }, [])

  // 리뷰가 준비되면 첫 페이지로 초기화
  useEffect(() => {
    const first = reviews.slice(0, PAGE_SIZE)
    setVisibleReviews(first)
    setPage(first.length ? 1 : 0)
    setHasNext(reviews.length > first.length)
  }, [reviews])

  // 다음 페이지 로더 (onIntersect용)
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

  // 선택/신고 (기존 그대로)
  const [selectedMap, setSelectedMap] = useState({})
  const [reportedMap, setReportedMap] = useState({})
  const handleToggleSelect = (id) => setSelectedMap((prev) => ({ ...prev, [id]: !prev[id] }))
  const handleReport = (id) => {
    setReportedMap((prev) => ({ ...prev, [id]: true }))
    alert('신고가 접수되었습니다.')
  }

  return (
    <div className='reviewPage'>
      <div className='reviewPage__header'>
        <h2>리뷰</h2>
      </div>

      {/* 사진 그리드 (탭/클릭으로 선택) */}
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
              {/* 체크 아이콘/배지 (선택 시 표시) */}
              {selected && <span className='reviewPage__photoBadge'>선택됨</span>}
            </div>
          )
        })}
      </div>

      {/* 스크롤 영역 */}
      <div className='reviewPage__scroll'>
        <ReviewReportList
          reviews={visibleReviews}
          selectedMap={selectedMap}
          reportedMap={reportedMap}
          onToggleSelect={handleToggleSelect}
          onReport={handleReport}
        />

        {/* 상태 안내 */}
        {isLoading && <p className='infoText'>불러오는 중…</p>}
        {!hasNext && visibleReviews.length > 0}
        {!isLoading && visibleReviews.length === 0 && (
          <p className='infoText'>아직 등록된 리뷰가 없습니다.</p>
        )}

        {/*  센티넬: 관찰 대상 */}
        <div ref={observerRef} style={{ height: 1 }} />
      </div>

      <div className='reviewPage__footer'>
        <Button label='제작' />
      </div>
    </div>
  )
}
