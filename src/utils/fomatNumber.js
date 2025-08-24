export function formatPhoneNumber(phoneStr) {
  // 숫자만 추출
  const digits = phoneStr.replace(/\D/g, '')

  // 02 + 8~9자리 (서울 지역)
  if (digits.startsWith('02') && (digits.length === 9 || digits.length === 10)) {
    return digits.replace(/(02)(\d{3,4})(\d{4})/, '$1-$2-$3')
  }

  // 010/011/016~019 등 + 8자리
  if (/^01\d/.test(digits) && digits.length === 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  }

  // 일반 3자리 지역번호 + 7~8자리
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
  }

  // 그 외는 그냥 원본 반환
  return phoneStr
}
