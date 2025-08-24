import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from '../../../components/TopBar/TopBar'
import { instance } from '../../../api/client'
import '../ui/ContentPreviewPage.css'

export function ContentPreviewPage() {
  const { state } = useLocation()
  // 넘어온 state 안에 promotionId, items, selectedPhotos 있음
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!state?.promotionId) return

    const fetchPreview = async () => {
      try {
        setIsLoading(true)
        const res = await instance.get(`/generated-sns/preview?promotionId=${state.promotionId}`)
        setContent(res.data) // 서버에서 내려준 미리보기 데이터
      } catch (err) {
        console.error('컨텐츠 조회 실패:', err)
        setError('컨텐츠를 불러올 수 없습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPreview()
  }, [state?.promotionId])

  if (isLoading) return <p>불러오는 중…</p>
  if (error) return <p>{error}</p>

  return (
    <div className='contentPreviewPage'>
      <TopBar title='제작된 게시물' />

      {/* 선택한 사진 미리보기 */}
      {state?.selectedPhotos?.length > 0 && (
        <div className='selectedPhotos'>
          <h3>선택한 사진</h3>
          <div className='photoGrid'>
            {state.selectedPhotos.map((url, idx) => (
              <img key={idx} src={url} alt={`선택된사진-${idx}`} className='previewPhoto' />
            ))}
          </div>
        </div>
      )}

      {/* 서버에서 내려준 AI 생성 컨텐츠 */}
      {content && (
        <div className='aiContent'>
          <h3>AI 생성 컨텐츠</h3>
          <p>{content.content}</p>
          {content.mediaUrls?.map((url, idx) => (
            <img key={idx} src={url} alt={`AI생성-${idx}`} className='previewPhoto' />
          ))}
        </div>
      )}
    </div>
  )
}

export default ContentPreviewPage
