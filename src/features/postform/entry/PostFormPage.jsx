import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { instance } from '../../../api/client'
import './PostFormPage.css'
import TopBar from '../../../components/TopBar/TopBar'
import { Button } from '../../../components/Button/Button'
import { formatPhoneNumber } from '../../../utils/fomatNumber'

export function PostFormPage() {
  /* 사용자의 가게 정보 더미
  const [storeInfo] = useState({
    name: '푸른스시',
    phoneNumber: '02-943-8791',
    address: '서울특별시 노원구 월계동 402-19',
    category: '식당',
  })
    */
  const [storeInfo, setStoreInfo] = useState(null) // 서버 데이터로 대체
  const [loading, setLoading] = useState(true) // 로딩 상태

  // 프로모션 기간
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // 요금제 선택
  const [selectedPlan, setSelectedPlan] = useState('')

  // 프로모션 내용
  const [promotionContent, setPromotionContent] = useState('')

  const navigate = useNavigate()

  // 서버에서 사용자 가게 정보 가져오기
  useEffect(() => {
    const fetchStoreInfo = async () => {
      try {
        const response = await instance.get('/hosts/info')
        setStoreInfo({
          nickname: response.nickname,
          phone: response.phone,
          address: response.address,
          category: response.category,
        })
      } catch (error) {
        console.error('가게 정보 불러오기 실패:', error)
        alert('가게 정보를 불러오지 못했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchStoreInfo()
  }, [])

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

    if (new Date(startDate) > new Date(endDate)) {
      alert('시작일은 종료일보다 앞서야 합니다.')
      return
    }

    // API 명세서에 맞는 전송 데이터 준비
    const postData = {
      context: promotionContent,
      startDate,
      endDate,
      planId,
    }

    try {
      const response = await instance.post('/promotions', postData)
      console.log('게시물 등록 성공:', response)

      const promotionId = response.promotionId
      navigate('/payments', {
        state: {
          planId,
          promotionId,
        },
      })

      alert('게시물 등록 완료! 결제 페이지로 이동합니다.')
    } catch (error) {
      console.error('게시물 등록 실패:', error.response?.data || error.message)
      alert('게시물 등록에 실패했습니다. 다시 시도해 주세요.')
    }
  }

  if (loading) {
    return <div className='post-form-container'>로딩 중...</div>
  }

  return (
    <div className='post-form-container'>
      {/* 상단바 고정 */}
      <TopBar title='게시물 작성' />
      {/* 스크롤되는 내용 영역 */}
      <div className='scroll-wrapper'>
        <div className='scroll-content'>
          <div className='input-group'>
            <label className='input-label'>상호명</label>
            <input type='text' className='input-field' value={storeInfo.nickname} disabled />
          </div>
          <div className='input-group'>
            <label className='input-label'>가게 번호</label>
            <input
              type='text'
              className='input-field'
              value={formatPhoneNumber(storeInfo.phone)}
              disabled
            />
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
                onChange={(e) => setEndDate(e.target.value)}
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

      <Button
        label='게시하기'
        onClick={handlePostClick}
        disabled={!startDate || !endDate || !selectedPlan || !promotionContent}
      />
    </div>
  )
}
