import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadReviews } from '../../../utils/storage'
import ReviewReportList from '../components/ReviewReportList'
import '../ui/ReviewPage.css'
import { Button } from '../../../components/Button/Button'
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver'
import TopBar from '../../../components/TopBar/TopBar'

/* =======================
   인스타 프리뷰 변환 유틸
   ======================= */
function sanitize(s = '') {
  return String(s).replace(/\s+/g, ' ').trim()
}
function pickTitle(r) {
  return r?.title || r?.storeName || r?.placeName || r?.shopName || '가게'
}
function makePreviewDraft(review, { photosCount = 0 } = {}) {
  // 예시 이미지 톤 & 섹션 구성
  const store = pickTitle(review)
  const rating = review?.rating ?? 0
  const text = sanitize(review?.reviewText || review?.content || '')
  const stars = '⭐'.repeat(Math.round(rating))

  return {
    title: '예시 1번',
    intro: `📍 ${store}에서 이런 스시 퀄리티가 가능하다고…? 🍣`,
    lead: text
      ? text.slice(0, 60) + (text.length > 60 ? '…' : '')
      : '방문 소감 한 줄 요약을 여기에.',
    points: [
      '🤤 특히 사장님이 직접 손질한 숙성 생선은 신선함 그 자체.',
      '샐러드부터 초밥, 우동까지 하나하나 퀄리티 좋고 정성도 가득.',
      stars ? `${stars} (${rating}/5)` : '친구에게 추천하고 싶은 집',
    ],
    menu: [
      '연어/광어/참치 혼합 초밥 세트 🍣',
      '냉우동 or 따뜻한 미소국 사이드 선택 가능',
      '계절 샐러드도 개운하고 맛있음 🥗',
    ],
    subtext: [
      '무엇보다 혼밥하기도 부담 없고, 내부가 조용해서 공부하다 들르기 좋아!',
      '학생증 보여주면 음료 서비스까지?! 🥤 꼭 가봐야 해…',
      photosCount ? `📷 사진 ${photosCount}장` : '',
    ].filter(Boolean),
    location: '📍 위치: 역 기준 도보 2분',
    hours: '🕒 영업시간: 오전 11:30 ~ 오후 9:00 (브레이크 3~5시)',
    hashtags: `#${store.replace(/\s/g, '')} #스시맛집 #가성비스시 #혼밥환영 #연어맛집`,
  }
}

export function ReviewPage() {
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])

  // 사진 선택 상태 (index 기반)
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

  // 사진 선택 토글
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

  // 선택/신고
  const [selectedMap, setSelectedMap] = useState({})
  const [reportedMap, setReportedMap] = useState({})
  const handleToggleSelect = (id) => setSelectedMap((prev) => ({ ...prev, [id]: !prev[id] }))
  const handleReport = (id) => {
    setReportedMap((prev) => ({ ...prev, [id]: true }))
    alert('신고가 접수되었습니다.')
  }

  /* ========================
     제작 버튼 → 프리뷰 이동
     ======================== */
  const handleMakePost = () => {
    // 우선순위: 체크된 리뷰 중 첫 번째 → 없으면 첫 리뷰
    const selectedIds = Object.keys(selectedMap).filter((id) => selectedMap[id])
    const target =
      selectedIds.length > 0
        ? reviews.find((r) => String(r.id) === String(selectedIds[0]))
        : reviews[0]

    if (!target) {
      alert('작성된 리뷰가 없습니다.')
      return
    }

    const draft = makePreviewDraft(target, {
      photosCount: target?.photos?.length || target?.previewUrls?.length || 0,
    })

    // 새로고침 대비 임시 저장
    sessionStorage.setItem('contentPreviewDraft', JSON.stringify(draft))

    // 페이지 이동 (state로도 전달)
    navigate('/ai-feedback', { state: { draft } })
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
        <ReviewReportList
          reviews={visibleReviews}
          selectedMap={selectedMap}
          reportedMap={reportedMap}
          onToggleSelect={handleToggleSelect}
          onReport={handleReport}
        />

        {isLoading && <p className='infoText'>불러오는 중…</p>}
        {!isLoading && visibleReviews.length === 0 && (
          <p className='infoText'>아직 등록된 리뷰가 없습니다.</p>
        )}
        <div ref={observerRef} style={{ height: 1 }} />
      </div>

      {/* 하단 버튼 */}
      <div className='reviewPage__footer'>
        <Button label='제작' onClick={handleMakePost} />
      </div>
    </div>
  )
}

export default ReviewPage
