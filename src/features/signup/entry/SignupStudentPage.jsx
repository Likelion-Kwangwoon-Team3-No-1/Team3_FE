import './SignupStudentPage.css'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../components/Icon/Icon'
import { useState } from 'react'

export function SignupStudentPage() {
  const navigate = useNavigate()
  const [bank, setBank] = useState('') // 은행 정보 상태 관리

  // 은행 목록
  const bankList = [
    '국민은행',
    '신한은행',
    '우리은행',
    '하나은행',
    '기업은행',
    '농협은행',
    '카카오뱅크',
    '케이뱅크',
    '토스뱅크',
  ]

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
            <label htmlFor='studentPhone'>연락처</label>
            <div className='input-with-button'>
              <input type='tel' id='studentPhone' placeholder="('-')제외하고 입력" />
            </div>
          </div>

          <div className='input-group'>
            <label htmlFor='account'>계좌번호</label>
            <input
              type='text'
              inputmode='numeric'
              pattern='[0-9\-]*'
              id='account'
              placeholder="('-')제외하고 입력"
            />
          </div>

          {/* 🏦 은행 선택 드롭다운 추가 */}
          <div className='input-group'>
            <select
              id='bank-select'
              className='bank-select'
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value='' disabled>
                은행 선택
              </option>
              {bankList.map((bankName) => (
                <option key={bankName} value={bankName}>
                  {bankName}
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
