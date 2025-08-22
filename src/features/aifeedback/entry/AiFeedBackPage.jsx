import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import TopBar from '../../../components/TopBar/TopBar'
import { Button } from '../../../components/Button/Button'
import uncheckedIcon from '../../../assets/review/review-checkbox-default.svg'
import checkedIcon from '../../../assets/review/review-checkbox-filled.svg'
import { instance } from '../../../api/client'
import '../ui/AiFeedBackPage.css'

export function AiFeedBackPage() {
  const nav = useNavigate()
  const { state } = useLocation() // { promotionId, items }
  const drafts = state?.items || []

  const [selectedId, setSelectedId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGoPreview = async () => {
    if (!selectedId) {
      alert('예시를 하나 선택해 주세요.')
      return
    }
    const chosen = drafts.find((d) => d.id === selectedId)

    try {
      setIsLoading(true)
      const res = await instance.post(`/generated-sns/select?promotionId=${state.promotionId}`, {
        style: chosen.style,
      })
      const finalContent = res
      sessionStorage.setItem('finalContent', JSON.stringify(finalContent))
      nav('/content-preview', { state: { promotionId: state.promotionId } })
    } catch (err) {
      console.error('최종 컨텐츠 생성 실패:', err)
      alert('최종 컨텐츠 생성에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='aiPreview'>
      <TopBar title='제작된 게시물' />

      {drafts.map((draft, idx) => (
        <div key={draft.id} className='aiDraftWrapper'>
          <div className='aiHeaderRow'>
            <div className='aiTitle'>예시 {idx + 1}번</div>
            <button type='button' className='aiCheckBtn' onClick={() => setSelectedId(draft.id)}>
              <img src={selectedId === draft.id ? checkedIcon : uncheckedIcon} alt='' />
            </button>
          </div>

          <section className={`aiCard ${selectedId === draft.id ? 'is-active' : ''}`}>
            <pre className='aiContent'>{draft.content}</pre>
            {draft.mediaUrls?.length > 0 && (
              <div className='aiImages'>
                {draft.mediaUrls.map((url, i) => (
                  <img key={i} src={url} alt='미리보기 이미지' className='aiImage' />
                ))}
              </div>
            )}
          </section>
        </div>
      ))}

      <div className='aiBottom'>
        <Button
          label={isLoading ? '생성 중...' : '재생성'}
          onClick={handleGoPreview}
          disabled={isLoading}
        />
      </div>
    </div>
  )
}
