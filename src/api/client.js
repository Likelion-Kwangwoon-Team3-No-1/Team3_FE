import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

const pendingRequests = new Map()
const getRequestKey = (config) => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    const requestKey = getRequestKey(config)
    if (pendingRequests.has(requestKey)) {
      console.warn(`중복 요청 차단됨: ${requestKey}`)
      return Promise.reject(new Error('중복 요청 차단됨'))
    }

    pendingRequests.set(requestKey, true)

    const token = localStorage.getItem('ACCESS_TOKEN')
    if (token) {
      /*배포시 변경 config.headers.Authorization = `Bearer ${token}`*/
      /* 자영업자 토큰
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIb3N0QWRtaW4iLCJyb2xlIjoiUk9MRV9IT1NUIiwiaWF0IjoxNzU1OTkyODkzLCJleHAiOjE3NTU5OTY0OTN9.Gs5-i3PwUyWGQF7mgDlS1UN5lDEWQ83HrmLhu9mpg3o`
*/
      /* 대학생 토큰*/
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNYXRlQWRtaW4iLCJyb2xlIjoiUk9MRV9NQVRFIiwiaWF0IjoxNzU1OTkyODY0LCJleHAiOjE3NTU5OTY0NjR9.SHfXK_1BLwNQuFJGQ8yGbDzTi0jcsK-T8LjPmqFIDrc`
    }

    return config
  },
  (err) => {
    console.error('Request Error:', err.response?.data || err.message)
    return Promise.reject(err)
  },
)

// 응답 인터셉터
instance.interceptors.response.use(
  (res) => {
    const requestKey = getRequestKey(res.config)
    pendingRequests.delete(requestKey)
    return res.data
  },
  (err) => {
    const requestKey = getRequestKey(err.config || {})
    pendingRequests.delete(requestKey)
    console.error('Response Error:', err.response?.data || err.message)

    if (err.response?.status === 401) {
      // 로그아웃 처리
    }

    return Promise.reject(err)
  },
)

// 유저 역할 함수 HOST / MATE
export const getUserRole = () => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  if (!token) return null
  try {
    const decoded = jwtDecode(token)
    return decoded.role
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}

// 유저 아이디 가져오는 함수
export const getUserSub = () => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  if (!token) return null
  try {
    const decoded = jwtDecode(token)
    return decoded.sub // JWT payload 안의 sub 값 반환
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}

export default instance
