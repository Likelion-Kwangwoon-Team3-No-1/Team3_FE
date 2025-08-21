import { useEffect, useRef, useState } from 'react'
import { PostList } from '../components/PostList'
import { Icon } from '../../../components/Icon/Icon'
import { Link, useNavigate } from 'react-router-dom'
import './PostBoardPage.css'
import BottomNav from '../../../components/BottomNav/BottomNav'
import instance, { getUserRole } from '../../../api/client'

export function PostBoardPage() {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const loaderRef = useRef(null)
  const navigate = useNavigate()

  // API 호출 함수를 컴포넌트 내부에 정의
  const getPromotions = async (pageToLoad) => {
    try {
      const response = await instance.get('/promotions', {
        params: {
          page: pageToLoad,
          size: 20,
        },
      })
      // API 응답이 유효한지 확인하고, 데이터가 없으면 빈 객체를 반환
      if (response && response.data) {
        return response.data
      } else {
        // 응답이 유효하지 않으면 빈 데이터와 hasNext: false를 반환
        return { items: [], hasNext: false }
      }
    } catch (error) {
      console.error('Failed to fetch promotions:', error)
      // 오류 발생 시 빈 배열과 hasNext: false를 반환하여 이후 로직이 정상 작동하도록 함
      return { items: [], hasNext: false }
    }
  }

  // 데이터 로딩 함수
  const loadPosts = async () => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    try {
      const { items: newPosts, hasNext: hasNextData } = await getPromotions(page)

      // 로드된 게시물이 없을 경우 (API 응답이 비어있는 경우 포함)
      if (newPosts.length === 0) {
        setHasMore(false)
      } else {
        setPosts((prev) => [...prev, ...newPosts])
        setPage((prev) => prev + 1)
      }

      // API 응답의 hasNext 값으로 hasMore 상태 업데이트
      setHasMore(hasNextData)
    } catch (error) {
      console.error('게시물 로딩 실패:', error)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  // 컴포넌트 마운트 시 초기 데이터 로딩 및 사용자 역할 확인
  useEffect(() => {
    loadPosts()
    // 컴포넌트 마운트 시 사용자 역할을 가져와 상태에 저장
    setUserRole(getUserRole())
  }, [])

  // IntersectionObserver를 사용하여 무한 스크롤 구현
  useEffect(() => {
    if (!hasMore || isLoading) return

    if (posts.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadPosts()
        }
      },
      { threshold: 1.0 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.disconnect()
      }
    }
  }, [hasMore, isLoading, posts.length])

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
          {/* 게시물 목록이 비어있고, 로딩 중이 아닐 때 메시지 표시 */}
          {filteredPosts.length === 0 && !isLoading && (
            <div className='no-promotions'>
              <p>진행중인 프로모션이 없습니다.</p>
            </div>
          )}
          {filteredPosts.map((post) => (
            <PostList key={post.promotionId} {...post} onClick={handlePostClick} />
          ))}
          {hasMore && (
            <div ref={loaderRef} className='scroll-trigger'>
              {isLoading ? '로딩중...' : '로딩'}
            </div>
          )}
          {!hasMore && filteredPosts.length > 0 && (
            <div className='scroll-end'>더 이상 데이터가 없습니다.</div>
          )}
        </div>
      </div>
      {userRole === 'HOST' && (
        <Link to='/postform' className='floating-button-link'>
          <button className='floating-button'>
            <Icon name='post-form' width={24} height={24} />
          </button>
        </Link>
      )}
      <BottomNav />
    </div>
  )
}
