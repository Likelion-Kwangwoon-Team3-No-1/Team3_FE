import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../components/Icon/Icon'
import { instance } from '../../../api/client'
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

  const handlePostClick = async () => {
    // 요금제에 따라 planId 결정
    const planMapping = {
      plan1: 1,
      plan2: 2,
      plan3: 3,
    }
    const planId = planMapping[selectedPlan]

    // 모든 필수 정보가 입력되었는지 확인
    if (!startDate || !endDate || !selectedPlan || !promotionContent) {
      alert('모든 필수 정보를 입력해 주세요.')
      return
    }

    // API 명세서에 맞는 전송 데이터 준비
    const postData = {
      promotionContext: promotionContent,
      startDate: startDate,
      endDate: endDate,
      planId: planId,
    }

    try {
      const response = await instance.post('/promotions', postData)
      console.log('게시물 등록 성공:', response)

      // 성공 팝업 후 결제 페이지로 이동하거나, 다른 로직 실행
      alert('게시물 등록 완료! 결제 페이지로 이동합니다.')
      // navigate('/payment') // 결제 페이지가 있다면 이렇게 연결할 수 있습니다.
    } catch (error) {
      console.error('게시물 등록 실패:', error)
      alert('게시물 등록에 실패했습니다. 다시 시도해 주세요.')
    }
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
              <input
                type='date'
                className='date-input'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)} // ⭐️ 이 부분을 추가합니다.
              />
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
      <div className='post-button-wrapper'>
        <button className='post-button' onClick={handlePostClick}>
          게시하기
        </button>
      </div>
    </div>
  )
}
