import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { instance } from '../../../api/client'
import '../ui/MyPromotionPage.css'
import TopBar from '../../../components/TopBar/TopBar'

export function MyPromotionPage() {
  const { hostId } = useParams()
  const [promotions, setPromotions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!hostId) return
    const fetchPromotions = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await instance.get('/promotions/me', {
          params: { hostId: Number(hostId) },
        })
        setPromotions(res.items || [])
      } catch (err) {
        console.error('내 프로모션 불러오기 실패:', err)
        setPromotions([])
        setError('데이터를 불러오지 못했습니다.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchPromotions()
  }, [hostId])

  // 상태 변환 함수
  const getStatusLabel = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return { text: '진행 중', className: 'status-active' }
      case 'PENDING':
        return { text: '리뷰 대기', className: 'status-pending' }
      case 'COMPLETED':
        return { text: '완료', className: 'status-completed' }
      default:
        return { text: '', className: '' }
    }
  }

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
                  {status.text && (
                    <span className={`promotion-status ${status.className}`}>{status.text}</span>
                  )}
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
