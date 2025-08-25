/**
 * @param {string} createdAt - "MM/DD" 형식 (예: "08/13")
 * @param {string} startDateStr - "2025-08-25" 같은 형식의 날짜 문자열
 * @returns {string} - "2025.08.25 ~ 2025.09.25", "10분 전" | "3시간 전" | "2일 전"
 */

export function formatPromoDate(startDateStr, endDateStr) {
  const format = (dateStr) => {
    const date = new Date(dateStr)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  }

  return `${format(startDateStr)} ~ ${format(endDateStr)}`
}

export function timeAgo(createdAt) {
  const now = new Date()

  // ":" 포함 → 시간 계산
  if (createdAt.includes(':')) {
    const [hh, mm] = createdAt.split(':').map(Number)
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm)

    const diffMs = now - target
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const hours = Math.floor(diffMinutes / 60)
    const minutes = diffMinutes % 60

    if (hours > 0) {
      return `${hours}시간 ${minutes}분 전`
    }
    return `${minutes}분 전`
  }

  // "/" 포함 → 날짜 계산 (MM/DD)
  if (createdAt.includes('/')) {
    const [MM, DD] = createdAt.split('/').map(Number)
    const target = new Date(now.getFullYear(), MM - 1, DD)

    const diffMs = now - target
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    return `${diffDays}일 전`
  }

  return '잘못된 입력'
}
