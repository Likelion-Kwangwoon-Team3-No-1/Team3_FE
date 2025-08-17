/**
 * @param {string} createdAt - "MM/DD" 형식 (예: "08/13")
 * @param {string} startDateStr - "2025-08-25" 같은 형식의 날짜 문자열
 * @returns {string} - "2025.08.25 ~ 2025.09.25", "10분 전" | "3시간 전" | "2일 전"
 */

export function formatPromoDate(startDateStr) {
  const startDate = new Date(startDateStr)

  const startYear = startDate.getFullYear()
  const startMonth = String(startDate.getMonth() + 1).padStart(2, '0')
  const startDay = String(startDate.getDate()).padStart(2, '0')

  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + 1)

  const endYear = endDate.getFullYear()
  const endMonth = String(endDate.getMonth() + 1).padStart(2, '0')
  const endDay = String(endDate.getDate()).padStart(2, '0')

  return `${startYear}.${startMonth}.${startDay} ~ ${endYear}.${endMonth}.${endDay}`
}

export function timeAgo(createdAt) {
  const now = new Date()
  const currentYear = now.getFullYear()

  // createdAt을 Date 객체로 변환 (연도는 올해로 맞춤)
  const [month, day] = createdAt.split('/').map(Number)
  const createdDate = new Date(currentYear, month - 1, day)

  // 현재 시간과의 차이(ms 단위)
  const diffMs = now - createdDate
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`
  } else {
    return `${diffDays}일 전`
  }
}
