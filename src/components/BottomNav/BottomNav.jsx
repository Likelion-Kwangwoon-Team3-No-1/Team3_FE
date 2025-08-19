import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../../components/Icon/Icon'
import './BottomNav.css'

const navItems = [
  {
    name: '둘러보기',
    path: '/postboard',
    iconName: 'navi-board',
  },
  {
    name: '홈',
    path: '/home', // 경로를 '/home'으로 통일하고, userType에 따라 최종 경로를 결정
    iconName: 'navi-home',
  },
  {
    name: '마이페이지',
    path: '/mypage',
    iconName: 'navi-mypage',
  },
]

export const BottomNav = () => {
  const location = useLocation()
  const [userType, setUserType] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)

  useEffect(() => {
    // localStorage에서 userType을 가져와 상태에 저장
    const storedUserType = localStorage.getItem('userType')
    setUserType(storedUserType)
  }, [])

  return (
    <nav className='bottom-nav'>
      <ul className='bottom-nav-list'>
        {navItems.map((item) => {
          // userType에 따라 홈 경로를 동적으로 결정
          const rolePath = userType === 'OWNER' ? `${item.path}/owner` : `${item.path}/student`
          const itemPath = item.name === '둘러보기' ? item.path : rolePath

          // 현재 경로가 활성화되었는지 확인
          const isActive = location.pathname.startsWith(itemPath)

          // 호버 상태이거나 활성화 상태일 때 아이콘 이름을 변경
          const currentIconName =
            isActive || hoveredItem === item.name
              ? `${item.iconName}-filled`
              : `${item.iconName}-default`

          return (
            <li
              key={item.name}
              className='bottom-nav-item'
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link to={itemPath} className='bottom-nav-link'>
                <Icon name={currentIconName} width={36} height={36} />
                <span
                  className='bottom-nav-text'
                  style={{ color: isActive || hoveredItem === item.name ? '#1d366f' : '#808993' }}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
export default BottomNav
