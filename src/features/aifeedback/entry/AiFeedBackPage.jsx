import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TopBar from '../../../components/TopBar/TopBar'
import { instance } from '../../../api/client'
import { Button } from '../../../components/Button/Button'
import '../ui/AiFeedbackPage.css'

export function AiFeedBackPage() {
  const { state } = useLocation()
  const { promotionId } = state || {}
  const navigate = useNavigate()

  const [items, setItems] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchAiPosts = async () => {
      try {
        setIsLoading(true)
        const res = await instance.post('/generated-sns', { promotionId })
        let aiItems = res.items || []
        setItems(aiItems)
      } catch (err) {
        console.error('AI 생성 실패:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (promotionId) fetchAiPosts()
  }, [promotionId])

  const handleReselect = () => {
    if (!selectedId) {
      alert('게시물 스타일을 선택해주세요.')
      return
    }
    const selectedItem = items.find((i) => i.id === selectedId)
    navigate('/content-preview', {
      state: { promotionId, item: selectedItem },
    })
  }

  if (isLoading) return <p>생성 중...</p>

  return (
    <div className='ai-feedback'>
      <TopBar title='제작된 게시물' />

      <div className='ai-feedback__list'>
        {items.map((item, idx) => (
          <div key={item.id} className='ai-feedback__card'>
            <div className='ai-feedback__header'>
              <h3>예시 {idx + 1}번</h3>
              <label className='ai-feedback__checkbox'>
                <input
                  type='checkbox'
                  checked={selectedId === item.id}
                  onChange={() => setSelectedId(item.id)}
                />
              </label>
            </div>

            <p className='ai-feedback__content'>{item.content}</p>
          </div>
        ))}
      </div>

      <div className='ai-feedback__footer'>
        <Button label='재생성' onClick={handleReselect} />
      </div>
    </div>
  )
}

export default AiFeedBackPage
