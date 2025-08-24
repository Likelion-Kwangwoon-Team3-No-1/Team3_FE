import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { instance } from '../../../api/client'
import '../ui/MyPromotionPage.css'
import TopBar from '../../../components/TopBar/TopBar'

export function MyPromotionPage() {
  const { hostId } = useParams() // 로그인 사용자 hostId
  const [promotions, setPromotions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // 상태 변환 함수
  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { text: '모집 중', className: 'status-active' }
      case 'pending':
        return { text: '리뷰 작성 대기 중', className: 'status-pending' }
      case 'completed':
        return { text: '모든 리뷰 작성 완료', className: 'status-completed' }
      default:
        return { text: '알 수 없음', className: '' }
    }
  }

  useEffect(() => {
    if (!hostId) return
    const fetchPromotions = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await instance.get('/promotions', { params: { hostId } })
        setPromotions(res.items || [])
      } catch (err) {
        console.error('내 프로모션 불러오기 실패:', err)
        setPromotions([])
        //setError('데이터를 불러오지 못했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPromotions()
  }, [hostId])

  if (isLoading) return <p className='loading'>불러오는 중...</p>
  if (error) return <p className='error'>{error}</p>

  return (
    <div className='promotion-page'>
      <TopBar title='내 프로모션' />
      <div className='promotion-list'>
        {promotions.length === 0 ? (
          <p className='empty'>등록된 프로모션이 없습니다.</p>
        ) : (
          promotions.map((item) => {
            const status = getStatusLabel(item.promotionStatus)
            return (
              <div key={item.promotionId} className='promotion-item'>
                <div className='promotion-info'>
                  <span className='promotion-name'>{item.nickname}</span>
                  <span className={`promotion-status ${status.className}`}>{status.text}</span>
                </div>
                <div className='promotion-time'>{item.createdAt}</div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
