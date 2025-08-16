import axios from 'axios'

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

instance.interceptors.request.use(
  (config) => {
    const requestKey = getRequestKey(config)

    if (pendingRequests.has(requestKey)) {
      console.warn(`중복 요청 차단됨: ${requestKey}`)
      return Promise.reject(new Error('중복 요청 차단됨'))
    }

    pendingRequests.set(requestKey, true)
    return config
  },
  (err) => {
    console.error('Request Error:', err.response?.data || err.message)
    return Promise.reject(err)
  },
)

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
    return Promise.reject(err)
  },
)

export default instance
