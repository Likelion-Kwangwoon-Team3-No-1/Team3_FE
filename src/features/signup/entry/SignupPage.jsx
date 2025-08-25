import { useState } from 'react'
import './SignupPage.css'
import { TermsModal } from '../components/TermsModal'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../../../components/Icon/Icon'
import { Button } from '../../../components/Button/Button'
import TopBar from '../../../components/TopBar/TopBar'

export function SignupPage() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userType, setUserType] = useState(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false) // 이 상태가 이제 모달과 연동됩니다.
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleUserIdChange = (e) => {
    setUserId(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleUserTypeSelect = (type) => {
    setUserType(type)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = (agreed) => {
    // 모달에서 전달받은 동의 여부(agreed)를 agreedToTerms 상태에 설정
    setAgreedToTerms(agreed)
    setIsModalOpen(false)
  }

  const navigate = useNavigate()
  const handleSignup = (e) => {
    e.preventDefault()
    if (!agreedToTerms) {
      alert('이용약관에 동의해야 합니다.')
      return
    }

    if (!userId || !password || !confirmPassword) {
      alert('모든 필수 정보를 입력하고 약관에 동의해주세요.')
      return
    }

    if (password !== confirmPassword) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
      return
    }

    const passwordRegex =
      /^(?=.*[A-Za-z\d])(?=.*[A-Za-z@$!%*#?&])(?=.*[\d@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/
    if (!passwordRegex.test(password)) {
      alert('비밀번호는 6~20자이며, 영문, 숫자, 특수문자 중 2가지 이상을 조합해야 합니다.')
      return
    }

    console.log('회원가입 정보:', {
      userId,
      password,
      userType,
      agreedToTerms,
    })

    if (userType === 'ROLE_MATE') {
      navigate('/signup/student', {
        state: {
          userId,
          password,
        },
      })
    }
    if (userType === 'ROLE_HOST') {
      navigate('/signup/owner', {
        state: {
          userId,
          password,
        },
      })
    }
  }

  return (
    <div className='signup-page'>
      <TopBar title='회원가입' />

      <main className='signup-form-container'>
        <form onSubmit={handleSignup} className='signup-form'>
          <div className='input-group'>
            <label htmlFor='userId'>아이디</label>
            <input type='text' id='userId' value={userId} onChange={handleUserIdChange} />
          </div>

          <div className='input-group'>
            <label htmlFor='password'>비밀번호</label>
            <input type='password' id='password' value={password} onChange={handlePasswordChange} />
          </div>

          <div className='input-group'>
            <label htmlFor='confirmPassword'>비밀번호 확인</label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <div className='signup-password-info'>
              <p>* 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 6~20자로 입력해주세요</p>
            </div>
          </div>

          <div className='signup-buttons'>
            <div className='user-type-group'>
              <button
                type='button'
                className={`user-type-button ${userType === 'ROLE_MATE' ? 'active' : ''}`}
                onClick={() => handleUserTypeSelect('ROLE_MATE')}
              >
                대학생
              </button>
              <button
                type='button'
                className={`user-type-button ${userType === 'ROLE_HOST' ? 'active' : ''}`}
                onClick={() => handleUserTypeSelect('ROLE_HOST')}
              >
                자영업자
              </button>
            </div>

            <div className='terms-group'>
              <div className='terms-group-left'>
                <Icon
                  name={`agree-checkbox${agreedToTerms ? '-filled' : '-default'}`}
                  width={24}
                  height={24}
                  onClick={handleOpenModal}
                />
                <span className='terms-text'>이용약관 동의</span>
              </div>

              <span className='terms-link' onClick={handleOpenModal}>
                <Icon name='agree-arrow-right' width={24} height={24} />
              </span>
            </div>
          </div>
          <Button label='저장하기' className='signup-button' />
        </form>
      </main>
      {isModalOpen && <TermsModal onClose={handleModalClose} />}
    </div>
  )
}
