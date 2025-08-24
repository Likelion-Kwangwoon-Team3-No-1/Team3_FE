import { Button } from '../../../components/Button/Button'

export function PaymentButton({ ready, widgets, order }) {
  const handlePayment = async () => {
    if (!order) {
      alert('주문 정보가 없습니다.')
      return
    }
    try {
      await widgets.requestPayment({
        orderId: order.orderId,
        orderName: order.orderName,
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
        customerEmail: 'customer123@gmail.com',
        customerName: '김토스',
        customerMobilePhone: '01012341234',
      })
    } catch (err) {
      console.error('결제 요청 실패:', err)
      alert('결제 요청 실패')
    }
  }

  return (
    <Button
      type='button'
      label='결제하기'
      variant='primary'
      onClick={handlePayment}
      disabled={!ready}
    />
  )
}
