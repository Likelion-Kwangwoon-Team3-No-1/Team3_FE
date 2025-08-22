import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TopBar from '../../../components/TopBar/TopBar'
import { instance } from '../../../api/client'
import '../ui/ContentPreviewPage.css'

export function ContentPreviewPage() {
  const { state } = useLocation() // state.promotionId
  const [content, setContent] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!state?.promotionId) return

    const fetchPreview = async () => {
      try {
        setIsLoading(true)
        const data = await instance.get(`/generated-sns/preview?promotionId=${state.promotionId}`)
        setContent(data) // res.id, res.content, res.mediaUrls
      } catch (err) {
        console.error('컨텐츠 조회 실패:', err)
        setError('컨텐츠를 불러올 수 없습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPreview()
  }, [state?.promotionId])

  return (
    <div className='contentPreviewPage'>
      <TopBar title='최종 컨텐츠 미리보기' />

      {isLoading && <p className='infoText'>불러오는 중...</p>}
      {error && <p className='infoText error'>{error}</p>}

      {content && (
        <div className='previewCard'>
          <div className='previewMedia'>
            {content.mediaUrls?.map((url, idx) => (
              <img key={idx} src={url} alt={`preview-${idx}`} className='previewImg' />
            ))}
          </div>
          <div className='previewContent'>
            <p>{content.content}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContentPreviewPage
