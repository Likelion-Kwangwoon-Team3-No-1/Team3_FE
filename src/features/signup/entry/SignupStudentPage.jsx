import './SignupPage.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '../../../components/Icon/Icon'
import { useState } from 'react'
import instance from '../../../api/client'

export function SignupStudentPage() {
  const navigate = useNavigate()

  const location = useLocation()
  const { userId, password } = location.state || {}
  console.log('넘어온 값:', userId, password)

  const [studentName, setStudentName] = useState('')
  const [studentPhone, setStudentPhone] = useState('')
  const [account, setAccount] = useState('')
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

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      const res = await instance.post('/signup/mate', {
        loginId: userId,
        password,
        nickname: studentName,
        phone: studentPhone,
        accountNumber: account,
        bankName: bank,
      })

      console.log('회원가입 성공:', res)
      alert('가입되었습니다.')
      navigate('/login')
    } catch (err) {
      console.error('회원가입 실패:', err.response?.data || err.message)
      alert('회원가입에 실패했습니다.')
    }
  }

  return (
    <div className='signup-page'>
      <header className='signup-header'>
        <button className='back-button' onClick={() => navigate(-1)}>
          <Icon name='detail-arrow-left' width={36} height={36} />
        </button>
        <h1 className='header-title'>회원가입</h1>
      </header>

      <main className='signup-form-container'>
        <form className='signup-form' onSubmit={handleSignup}>
          <div className='input-group'>
            <label htmlFor='studentName'>닉네임</label>
            <div className='input-with-button'>
              <input
                type='text'
                id='studentName'
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
          </div>
          <div className='input-group'>
            <label htmlFor='studentPhone'>연락처</label>
            <div className='input-with-button'>
              <input
                type='tel'
                id='studentPhone'
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                placeholder="('-')제외하고 입력"
              />
            </div>
          </div>
          <div className='bank-input'>
            <div className='input-group'>
              <label htmlFor='account'>계좌번호</label>
              <input
                type='text'
                id='account'
                value={account}
                onChange={(e) => setAccount(e.target.value)}
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
          </div>

          <button type='submit' className='signup-button' onClick={handleSignup}>
            가입하기
          </button>
        </form>
      </main>
    </div>
  )
}
