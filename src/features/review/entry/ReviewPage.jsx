import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadReviews } from '../../../utils/storage'
import ReviewReportList from '../components/ReviewReportList'
import '../ui/ReviewPage.css'
import { Button } from '../../../components/Button/Button'

export function ReviewPage() {
  const navigate = useNavigate()
  const [reviews, setReviews] = useState([])
  const [selectedMap, setSelectedMap] = useState({})
  const [reportedMap, setReportedMap] = useState({})

  useEffect(() => {
    const data = loadReviews ? loadReviews() : []
    setReviews(Array.isArray(data) ? data : [])
  }, [])

  const allPhotos = useMemo(
    () => reviews.flatMap((r) => r.photos || r.previewUrls || []).filter(Boolean),
    [reviews],
  )

  const handleToggleSelect = (id) => {
    setSelectedMap((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleReport = (id) => {
    setReportedMap((prev) => ({ ...prev, [id]: true }))
    alert('신고가 접수되었습니다.')
  }

  return (
    <div className='reviewPage'>
      <div className='reviewPage__header'>
        <h2>리뷰</h2>
      </div>
      {/* 사진 그리드 */}
      <div className='reviewPage__photoGrid'>
        {allPhotos.slice(0, 30).map((src, idx) => (
          <div className='reviewPage__photoItem' key={idx}>
            <img className='reviewPage__photoImg' src={src} alt='' />
          </div>
        ))}
      </div>
      {/* 새로운 컴포넌트 */}
      <div className='reviewPage__scroll'>
        <ReviewReportList
          reviews={reviews}
          selectedMap={selectedMap}
          reportedMap={reportedMap}
          onToggleSelect={handleToggleSelect}
          onReport={handleReport}
        />
      </div>
      <div className='reviewPage__footer'>
        <Button label='제작' />
      </div>
    </div>
  )
}
