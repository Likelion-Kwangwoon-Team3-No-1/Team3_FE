// FailPage.jsx
import { useSearchParams } from 'react-router-dom'

export function FailPage() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const message = searchParams.get('message')
  const orderId = searchParams.get('orderId')

  return (
    <div>
      <h2>결제 실패</h2>
      <p>코드: {code}</p>
      <p>메시지: {message}</p>
      <p>주문번호: {orderId}</p>
    </div>
  )
}
