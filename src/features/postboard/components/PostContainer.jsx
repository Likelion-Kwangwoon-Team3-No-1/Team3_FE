import { useRef } from 'react'

import { PostList } from './PostList'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

import { useFetchPostList } from '../hooks/useFetchPostList'
import './PostContainer.css'

export const PostContainer = ({ searchQuery }) => {
  const observerRef = useRef(null)

  const { postList, loadNextPage, enabled, isError, isLoading } = useFetchPostList()

  useIntersectionObserver(observerRef, loadNextPage, enabled)

  // 👈 렌더링 로직 수정
  if (isLoading && postList.length === 0) {
    return <p>로딩 중</p>
  }

  if (isError) {
    return <p>에러 발생</p>
  }

  if (postList.length === 0 && !isLoading) {
    return <p>빈 데이터</p>
  }

  const filteredPosts = postList.filter((post) => {
    if (!searchQuery) return true
    const lower = searchQuery.toLowerCase()
    return (
      post.nickname.toLowerCase().includes(lower) ||
      post.address.toLowerCase().includes(lower) ||
      post.category.toLowerCase().includes(lower)
    )
  })

  return (
    <div className='list-container'>
      {filteredPosts.map((post, index) => (
        <PostList
          key={index}
          promotionId={post.promotionId}
          nickname={post.nickname}
          category={post.category}
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
