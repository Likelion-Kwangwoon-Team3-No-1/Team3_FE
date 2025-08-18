import instance from '../../../api/client'

/**
 * 주문 생성: 서버에서 orderId 만들고 DB에 amount 저장
 * 응답 예: { orderId: '...' }
 */
export async function createOrder({ amount, orderName }) {
  return instance.post('/orders', {
    amount: amount.value, // KRW 기준이면 value만 쓰면 됨
    currency: amount.currency, // 필요 시 서버에서 사용
    orderName,
  })
}

/**
 * 결제 승인: 성공 페이지에서 호출
 * 서버가 secretKey로 토스 승인 API를 호출하고 결과를 반환
 */
export async function confirmPayment({ paymentKey, orderId, amount }) {
  return instance.post('/payments/confirm', {
    paymentKey,
    orderId,
    amount, // number
  })
}
