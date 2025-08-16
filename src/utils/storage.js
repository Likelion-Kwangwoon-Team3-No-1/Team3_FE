const REVIEW_KEY = 'reviews'

export function saveReviews(reviews) {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews))
}

export function loadReviews() {
  const data = localStorage.getItem(REVIEW_KEY)
  return data ? JSON.parse(data) : []
}

// --- utils/storage.js ---

const loadArray = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch {
    return []
  }
}
const saveArray = (key, arr) => localStorage.setItem(key, JSON.stringify(arr))
const makeId = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

// 업로드 시 호출 (이미 구현돼 있으면 이 부분은 생략)
export const pushAdminItem = ({ title, createdAt, status = 'approved' }) => {
  const now = new Date().toISOString()
  const list = loadArray('admin_posts')
  const item = {
    id: makeId(),
    title,
    createdAt: createdAt || now, // AdminListItem에서 new Date(createdAt).toLocaleString()
    status,
  }
  list.unshift(item)
  saveArray('admin_posts', list)
  return item
}

// 관리자 페이지에서 읽을 때 사용
export const loadAdminItems = () => loadArray('admin_posts')
