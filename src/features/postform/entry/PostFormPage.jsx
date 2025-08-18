import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../components/Icon/Icon'
import './PostFormPage.css'

export function PostFormPage() {
  // 사용자의 가게 정보
  const [storeInfo] = useState({
    name: '푸른스시',
    phoneNumber: '02-943-8791',
    address: '서울특별시 노원구 월계동 402-19',
    category: '식당',
  })

  // 프로모션 기간
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // 요금제 선택
  const [selectedPlan, setSelectedPlan] = useState('')

  // 프로모션 내용
  const [promotionContent, setPromotionContent] = useState('')

  // 시작일 입력 시 종료일 자동 설정
  useEffect(() => {
    if (startDate) {
      const start = new Date(startDate)
      const end = new Date(start)
      end.setMonth(end.getMonth() + 1)
      // 'YYYY-MM-DD' 형식으로 변환
      const formattedEndDate = end.toISOString().split('T')[0]
      setEndDate(formattedEndDate)
    } else {
      setEndDate('')
    }
  }, [startDate])

  const handlePostClick = () => {
    // 게시하기 버튼 클릭 시 임시 팝업
    alert('결제창')
  }

  const navigate = useNavigate()

  return (
    <div className='post-form-container'>
      {/* 상단바 고정 */}
      <div className='header-bar'>
        <button className='back-button' onClick={() => navigate(-1)}>
          <Icon name='detail-arrow-left' width={36} height={36} />
        </button>
        <h1 className='page-title'>게시물 작성</h1>
      </div>

      {/* 스크롤되는 내용 영역 */}
      <div className='scroll-wrapper'>
        <div className='scroll-content'>
          <div className='input-group'>
            <label className='input-label'>상호명</label>
            <input type='text' className='input-field' value={storeInfo.name} disabled />
          </div>
          <div className='input-group'>
            <label className='input-label'>가게 번호</label>
            <input type='text' className='input-field' value={storeInfo.phoneNumber} disabled />
          </div>
          <div className='input-group'>
            <label className='input-label'>가게 주소</label>
            <input type='text' className='input-field' value={storeInfo.address} disabled />
          </div>
          <div className='input-group'>
            <label className='input-label'>가게 카테고리</label>
            <input type='text' className='input-field' value={storeInfo.category} disabled />
          </div>
          <div className='input-group'>
            <label className='input-label'>프로모션 기간</label>
            <div className='date-input-container'>
              <input
                type='date'
                className='date-input'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className='date-separator'>~</span>
              <input type='date' className='date-input' value={endDate} disabled />
            </div>
          </div>
          <div className='input-group'>
            <label className='input-label'>요금제 선택</label>
            <div className='plan-buttons-container'>
              <button
                className={`plan-button ${selectedPlan === 'plan1' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('plan1')}
              >
                1팀 10,900원
              </button>
              <button
                className={`plan-button ${selectedPlan === 'plan2' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('plan2')}
              >
                2팀 20,900원
              </button>
              <button
                className={`plan-button ${selectedPlan === 'plan3' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('plan3')}
              >
                3팀 30,900원
              </button>
            </div>
          </div>
          <div className='input-group'>
            <label className='input-label'>프로모션 내용</label>
            <textarea
              className='textarea-field'
              rows='5'
              placeholder='프로모션 내용을 입력하세요.'
              value={promotionContent}
              onChange={(e) => setPromotionContent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      {/* 게시하기 버튼 고정 */}
      <button className='post-button' onClick={handlePostClick}>
        게시하기
      </button>
    </div>
  )
}
