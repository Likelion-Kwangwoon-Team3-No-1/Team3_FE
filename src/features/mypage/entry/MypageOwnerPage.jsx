import './MypagePage.css'
import { Icon } from '../../../components/Icon/Icon'
import BottomNav from '../../../components/BottomNav/BottomNav'
import { useNavigate } from 'react-router-dom'

export function MypageOwnerPage() {
  const handleUpdateClick = () => {
    alert('업데이트 예정입니다.')
  }
  const navigate = useNavigate()

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
              <span className='user-name'>홍길동</span>
              <span className='user-role'>사장님</span>
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
          {/* 가게 정보 관리 */}
          <div className='content-section'>
            <h2>가게 정보 관리</h2>
            <div className='list-item' onClick={handleUpdateClick}>
              <span>푸른스시</span>
              <Icon name='mypage-arrow-right' width={24} height={24} />
            </div>
          </div>

          {/* 내 프로모션 */}
          <div className='content-section'>
            <h2>내 프로모션</h2>
            <div className='list-item' onClick={() => navigate(`/my-promotion/${promotionId}`)}>
              <span>프로모션 리스트</span>
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
