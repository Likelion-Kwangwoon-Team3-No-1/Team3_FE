import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from '../../../components/TopBar/TopBar'
import { instance } from '../../../api/client'
import '../ui/ContentPreviewPage.css'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export function ContentPreviewPage() {
  const { state } = useLocation()
  const { promotionId, item } = state || {}
  const [contentData, setContentData] = useState(item || null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!promotionId) return

    const fetchPreview = async () => {
      try {
        setIsLoading(true)
        const res = await instance.get(`/generated-sns/preview`, {
          params: { promotionId },
        })
        setContentData(res)
      } catch (err) {
        if (err.response?.status === 404) {
          setError('해당 정보를 찾을 수 없습니다.')
        } else {
          setError('컨텐츠를 불러올 수 없습니다.')
        }
      } finally {
        setIsLoading(false)
      }
    }

    // item이 없을 때만 서버에서 조회
    if (!item) fetchPreview()
  }, [promotionId, item])

  if (isLoading) {
    return (
      <div className='content-preview'>
        <TopBar title='제작된 게시물' />
        <p>불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='content-preview'>
        <TopBar title='제작된 게시물' />
        <p>{error}</p>
      </div>
    )
  }

  if (!contentData) {
    return (
      <div className='content-preview'>
        <TopBar title='제작된 게시물' />
        <p>게시물이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className='content-preview scrollable'>
      <TopBar title='제작된 게시물' />

      <div className='content-preview__card'>
        {/* 캐러셀 */}
        {contentData.mediaUrls && contentData.mediaUrls.length > 0 && (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            className='content-preview__carousel'
          >
            {contentData.mediaUrls.map((url, idx) => (
              <SwiperSlide key={idx}>
                <img src={url} alt={`preview-${idx}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* 작성된 글 */}
        <div className='content-preview__text'>
          <p>{contentData.content}</p>
        </div>
      </div>
    </div>
  )
}

export default ContentPreviewPage
