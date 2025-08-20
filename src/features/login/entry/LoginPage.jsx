import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import instance from '../../../api/client'
import './LoginPage.css'

export function LoginPage() {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginStatus('')

    try {
      const response = await instance.post('/login', {
        loginId: loginId,
        password: password,
      })

      const { accessToken, refreshToken } = response

      localStorage.setItem('ACCESS_TOKEN', accessToken)
      localStorage.setItem('REFRESH_TOKEN', refreshToken)

      const decodedToken = jwtDecode(accessToken)
      const userRole = decodedToken.role

      if (userRole === 'MATE') {
        navigate('/home/student')
      } else if (userRole === 'HOST') {
        navigate('/home/owner')
      } else {
        console.error('Unknown role:', userRole)
        navigate('/')
      }
    } catch (error) {
      console.error('Login failed:', error)
      if (error.response) {
        setLoginStatus('*아이디 또는 비밀번호가 잘못되었습니다.')
      } else if (error.message === '중복 요청 차단됨') {
        setLoginStatus('*로그인 요청이 이미 처리 중입니다.')
      } else if (error.request) {
        setLoginStatus('*서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.')
      } else {
        setLoginStatus('*로그인 중 오류가 발생했습니다.')
      }
    }
  }

  return (
    <div className='login-container'>
      <div className='login-header'>Feed Up</div>
      <form onSubmit={handleLogin} className='login-form'>
        <input
          type='text'
          placeholder='아이디'
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          className='login-input'
          autoComplete='username'
        />
        <input
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='login-input'
          autoComplete='current-password'
        />
        <div className='message-container'>
          {loginStatus && <div className='login-status-message'>{loginStatus}</div>}
        </div>

        <div className='login-footer' onClick={() => navigate('/signup')}>
          아직 계정이 없으신가요? <a>가입하기</a>
        </div>
        <button className='login-button' onClick={handleLogin}>
          로그인
        </button>
      </form>
    </div>
  )
}
