import { useEffect, useRef, useState } from 'react'
import { PostList } from '../components/PostList'
import { Icon } from '../../../components/Icon/Icon'
import { Link, useNavigate } from 'react-router-dom'
import './PostBoardPage.css'
import { createDummyData } from '../hooks/CreateDummyData'
import BottomNav from '../../../components/BottomNav/BottomNav'

export function PostBoardPage() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const loaderRef = useRef(null)
  const navigate = useNavigate()

  // 컴포넌트 마운트 시 초기 데이터 로딩
  useEffect(() => {
    const initialPosts = createDummyData(1)
    setPosts(initialPosts)
  }, [])

  // IntersectionObserver를 사용하여 무한 스크롤 구현
  useEffect(() => {
    // hasMore이 false이면 더 이상 데이터를 불러올 필요가 없으므로 옵저버를 설정하지 않음
    if (!hasMore) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // loaderRef가 화면에 보일 때
        if (entries[0].isIntersecting) {
          const newPosts = createDummyData(page + 1)
          if (newPosts.length === 0) {
            setHasMore(false)
          } else {
            setPosts((prev) => [...prev, ...newPosts])
            setPage((prev) => prev + 1)
          }
        }
      },
      { threshold: 1.0 },
    )

    // loaderRef.current가 존재할 때만 관찰 시작
    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    // 컴포넌트 언마운트 시 옵저버 해제
    return () => {
      if (loaderRef.current) {
        observer.disconnect()
      }
    }
  }, [page, hasMore])

  const filteredPosts = posts.filter(
    (post) =>
      post.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handlePostClick = (id) => {
    navigate(`/postboard/${id}`)
  }

  return (
    <div className='promotion-board'>
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
        <div className='post-list'>
          {filteredPosts.map((post) => (
            <PostList key={post.promotionId} {...post} onClick={handlePostClick} />
          ))}
          {/* 무한 스크롤 트리거 */}
          {hasMore && (
            <div ref={loaderRef} className='scroll-trigger'>
              로딩중...
            </div>
          )}
          {!hasMore && filteredPosts.length > 0 && (
            <div className='scroll-end'>더 이상 데이터가 없습니다.</div>
          )}
        </div>
      </div>
      <Link to='/postform'>
        <button className='floating-button'>
          <Icon name='post-form' width={24} height={24} />
        </button>
      </Link>
      <BottomNav />
    </div>
  )
}
