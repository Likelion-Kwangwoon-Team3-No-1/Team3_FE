import './SignupPage.css'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../components/Icon/Icon'
import { useState } from 'react'

export function SignupOwnerPage() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('') // 은행 정보 상태 관리

  // 은행 목록
  const categoryList = ['식당', '카페', '기타']

  const handleSignup = () => (alert('가입되었습니다.'), navigate('/login'))

  return (
    <div className='signup-page'>
      <header className='signup-header'>
        <button className='back-button' onClick={() => navigate(-1)}>
          <Icon name='detail-arrow-left' width={36} height={36} />
        </button>
        <h1 className='header-title'>회원가입</h1>
      </header>

      <main className='signup-form-container'>
        <form className='signup-form'>
          <div className='input-group'>
            <label htmlFor='shopName'>상호명</label>
            <div className='input-with-button'>
              <input type='text' id='shopName' />
            </div>
          </div>

          <div className='input-group'>
            <label htmlFor='studentPhone'>가게 번호</label>
            <div className='input-with-button'>
              <input type='tel' id='shopPhone' placeholder="('-')제외하고 입력" />
            </div>
          </div>

          {/* 상세 주소 입력 필드 추가 */}
          <div className='input-group'>
            <label htmlFor='detailed-address'>상세 주소</label>
            <div className='address-input-group'>
              <input type='text' className='fixed-address' value='서울특별시 노원구' disabled />
              <input type='text' id='detailed-address' placeholder='' />
            </div>
          </div>

          {/* 카테고리 선택 드롭다운 추가 */}
          <div className='input-group'>
            <label htmlFor='category-select'>가게 카테고리</label>
            <select
              id='category-select'
              className='category-select'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='' disabled>
                전체
              </option>
              {categoryList.map((Category) => (
                <option key={Category} value={Category}>
                  {Category}
                </option>
              ))}
            </select>
          </div>

          <button type='submit' className='signup-button' onClick={handleSignup}>
            가입하기
          </button>
        </form>
      </main>
    </div>
  )
}
