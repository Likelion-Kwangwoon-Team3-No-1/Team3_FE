import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'

const DUMMY_USER = {
  id: 'test1234',
  password: 'test1234',
}

export function LoginPage() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const navigate = useNavigate()

  const handleLoginClick = (e) => {
    e.preventDefault()

    if (userId === DUMMY_USER.id && password === DUMMY_USER.password) {
      alert('로그인 성공')
      navigate('/home/owner')
    } else {
      setLoginStatus('*아이디 또는 비밀번호가 잘못되었습니다.')
    }
  }

  return (
    <div className='login-container'>
      <div className='login-header'>Feed Up</div>
      <form onSubmit={handleLoginClick} className='login-form'>
        <input
          type='text'
          placeholder='아이디'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className='login-input'
        />
        <input
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='login-input'
        />
        <div className='message-container'>
          {loginStatus && <div className='login-status-message'>{loginStatus}</div>}
        </div>

        <div className='login-footer' onClick={() => navigate('/signup')}>
          아직 계정이 없으신가요? <a>가입하기</a>
        </div>
        <button className='login-button' onClick={handleLoginClick}>
          로그인
        </button>
      </form>
    </div>
  )
}
