import './Button.css'

export const Button = ({
  type = 'button', // 기본 버튼 타입
  label = '버튼', // 버튼에 표시할 텍스트
  variant = 'default', // 스타일 종류: 'primary', 'secondary', 'danger' 등
  onClick, // 클릭 이벤트 핸들러
  disabled = false, // 비활성화 여부
  loading = false, // 로딩 중 상태
  icon, // 선택적 아이콘
}) => {
  return (
    <button
      type={type}
      className={`btn ${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        '로딩 중...'
      ) : (
        <>
          {icon && <span className='icon'>{icon}</span>}
          {label}
        </>
      )}
    </button>
  )
}
