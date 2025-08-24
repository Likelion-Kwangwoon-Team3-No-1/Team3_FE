import './MypagePage.css'
import { Icon } from '../../../components/Icon/Icon'
import BottomNav from '../../../components/BottomNav/BottomNav'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import instance, { getUserSub } from '../../../api/client' // 기존 client.js의 instance 사용

export function MypageStudentPage() {
  const [promotions, setPromotions] = useState([])
  const navigate = useNavigate()
  const userId = getUserSub()

  // 참여 중인 프로모션 불러오기
  const fetchPromotions = async () => {
    try {
      const res = await instance.get('/promotion-applies/me/promotions', {
        params: { offset: 0, limit: 10 },
      })
      setPromotions(res.promotions || [])
    } catch (error) {
      console.error('참여중인 프로모션 불러오기 실패:', error)
    }
  }

  useEffect(() => {
    fetchPromotions()
  }, [])

  const handleUpdateClick = () => {
    alert('업데이트 예정입니다.')
  }

  return (
    <div className='mypage-container'>
      <div className='mypage-header'>
        <div className='mypage-title'>
          <h1>마이페이지</h1>
        </div>
        <div className='profile-section'>
          <div className='profile-info'>
            <div className='profile-icon-wrapper'>
              <Icon name='mypage-profile' width={82} height={82} className='profile-icon' />
            </div>
            <div className='profile-text'>
              <span className='user-name'>{userId}</span>
              <span className='user-role'>크리에이터님</span>
            </div>
          </div>
          <div className='settings-icon' onClick={handleUpdateClick}>
            <Icon name='mypage-setting' width={36} height={36} />
          </div>
        </div>
      </div>

      {/* 스크롤 가능한 콘텐츠 */}
      <div className='scroll-wrapper'>
        <div className='scroll-body'>
          {/* 참여 중인 프로모션 */}
          <div className='content-section'>
            <h2>참여 중인 프로모션</h2>
            {promotions.length > 0 ? (
              promotions.map((promo) => (
                <div
                  key={promo.promotionId}
                  className='list-item'
                  onClick={() => navigate(`/review-form/${promo.promotionId}`)}
                >
                  <span>{promo.placeName}</span>
                  <Icon name='mypage-arrow-right' width={24} height={24} />
                </div>
              ))
            ) : (
              <p className='empty-text'>참여 중인 프로모션이 없습니다.</p>
            )}
          </div>

          {/* 리뷰 */}
          <div className='content-section'>
            <h2>리뷰</h2>
            <div className='list-item' onClick={() => navigate('/written-review')}>
              <span>작성한 리뷰</span>
              <Icon name='mypage-arrow-right' width={24} height={24} />
            </div>
          </div>

          {/* 서비스 정보 */}
          <div className='content-section'>
            <h2>서비스 정보</h2>
            <div className='list-item' onClick={handleUpdateClick}>
              <span>이용약관</span>
              <Icon name='mypage-arrow-right' width={24} height={24} />
            </div>
            <div className='list-item' onClick={handleUpdateClick}>
              <span>운영정책</span>
              <Icon name='mypage-arrow-right' width={24} height={24} />
            </div>
            <div className='list-item' onClick={handleUpdateClick}>
              <span>도움말</span>
              <Icon name='mypage-arrow-right' width={24} height={24} />
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
