// PostContainer.jsx
import { useRef } from 'react'
import { PostList } from './PostList'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useFetchPostList } from '../hooks/useFetchPostList'
import './PostContainer.css'

// 카테고리 변환 매핑
const categoryMap = {
  CAFE: '카페',
  RESTAURANT: '식당',
  OTHER: '기타',
}

export const PostContainer = ({ searchQuery }) => {
  const observerRef = useRef(null)

  const { postList, loadNextPage, enabled, isError, isLoading } = useFetchPostList()

  useIntersectionObserver(observerRef, loadNextPage, enabled)

  if (isLoading && postList.length === 0) return <p>로딩 중</p>
  if (isError) return <p>에러 발생</p>
  if (postList.length === 0 && !isLoading) return <p>빈 데이터</p>

  // 검색 필터링 (한글 카테고리 적용)
  const filteredPosts = postList.filter((post) => {
    if (!searchQuery) return true
    const lower = searchQuery.toLowerCase()
    const categoryKr = categoryMap[post.category] || post.category

    return (
      post.nickname.toLowerCase().includes(lower) ||
      post.address.toLowerCase().includes(lower) ||
      categoryKr.includes(searchQuery) // 한글 검색 가능
    )
  })

  return (
    <div className='list-container'>
      {filteredPosts.map((post, index) => (
        <PostList
          key={index}
          promotionId={post.promotionId}
          nickname={post.nickname}
          category={categoryMap[post.category] || post.category} // 한글 카테고리 표시
          createdAt={post.createdAt}
          address={post.address}
          thumbnail={post.thumbnail}
          start_date={post.start_date}
          end_date={post.end_date}
        />
      ))}
      {enabled && <div ref={observerRef} style={{ height: 1 }} />}
    </div>
  )
}
