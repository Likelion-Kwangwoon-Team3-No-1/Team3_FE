import axios from 'axios'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_DOMAIN,
  withCredentials: true, // 쿠키 기반 인증이 아니면 false로 해도 무방
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

    // 로컬스토리지에 저장된 토큰을 Authorization 헤더에 추가
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

    // 토큰 만료 처리 (401 Unauthorized)
    if (err.response?.status === 401) {
      // 로그아웃 처리 or 리프레시 토큰 로직
      // 예: localStorage.removeItem('ACCESS_TOKEN')
      // window.location.href = '/login'
    }

    return Promise.reject(err)
  },
)
export default instance
