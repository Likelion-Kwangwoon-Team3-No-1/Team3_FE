import { Link } from 'react-router-dom'
import './BottomNav.css'

const BottomNav = () => {
  return (
    <nav className='bottom-nav'>
      <Link to='/postboard' className='nav-item'>
        둘러보기
      </Link>
      <Link to='/home/owner' className='nav-item'>
        홈
      </Link>
      <Link to='/mypage/owner/1' className='nav-item'>
        마이페이지
      </Link>
    </nav>
  )
}

export default BottomNav
