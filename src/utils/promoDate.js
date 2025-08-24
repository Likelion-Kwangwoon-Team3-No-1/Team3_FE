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
  const currentYear = now.getFullYear()

  // createdAt을 Date 객체로 변환 (연도는 올해로 맞춤)
  const [month, day] = createdAt.split('/').map(Number)
  const createdDate = new Date(currentYear, month - 1, day)

  // 오늘 날짜(시,분,초 제거)
  const today = new Date(currentYear, now.getMonth(), now.getDate())

  // 밀리초 차이 → 일 단위 변환
  const diffDays = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return '오늘'
  } else {
    return `${diffDays}일 전`
  }
}
