import { useState, useEffect } from 'react'
import { Icon } from '../../../components/Icon/Icon'
import BottomNav from '../../../components/BottomNav/BottomNav'

import { PostContainer } from '../components/PostContainer'

import { useNavigate } from 'react-router-dom'
import './PostBoardPage.css'

import { getUserRole } from '../../../api/client'

export function PostBoardPage() {
  /* 플로팅버튼 표시 */
  const [userRole, setUserRole] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // 컴포넌트 마운트 시 사용자 역할을 가져와 상태에 저장
    setUserRole(getUserRole())
  }, [])

  const handleFormClick = () => {
    navigate(`/postform`)
  }

  return (
    <div className='container'>
      <header className='promotion-header'>
        <h2>프로모션 게시판</h2>
        <div className='search-bar-container'>
          <input
            type='text'
            placeholder='검색'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Icon name='post-search' width={24} height={24} className='search-bar-icon' />
        </div>
      </header>
      <div className='post-list-container'>
        <PostContainer searchQuery={searchQuery} />
      </div>
      {userRole === 'ROLE_HOST' && (
        <div className='floating-button-link' onClick={handleFormClick}>
          <button className='floating-button'>
            <Icon name='post-form' width={24} height={24} />
          </button>
        </div>
      )}
      <BottomNav />
    </div>
  )
}
