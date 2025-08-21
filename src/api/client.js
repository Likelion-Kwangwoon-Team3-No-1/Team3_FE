import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
  withCredentials: true, // JWT 헤더 인증이므로 false
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
      config.headers.Authorization = `Bearer ${token}`
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
      localStorage.removeItem('ACCESS_TOKEN')
      window.location.href = '/login'
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
  }}
export default instance
