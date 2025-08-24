// CheckoutPage.jsx
import { loadTossPayments } from '@tosspayments/tosspayments-sdk'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { instance } from '../../../api/client'
import { PaymentButton } from './PaymentButton'

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'
const customerKey = 'V3I3W43j_V5CY-rtsjAhU'

export function CheckoutPage() {
  const { state } = useLocation()
  // 기본값으로 planId:1, promotionId:9 설정 (테스트용)
  const { planId = 1, promotionId = 9 } = state || {}

  const [amount, setAmount] = useState({ currency: 'KRW', value: 0 })
  const [ready, setReady] = useState(false)
  const [widgets, setWidgets] = useState(null)
  const [order, setOrder] = useState(null)

  // 서버에서 결제 주문 생성
  useEffect(() => {
    async function fetchOrder() {
      if (!planId || !promotionId) return

      try {
        const orderData = await instance.post('/payments/orders', {
          planId,
          promotionId,
        })
        // orderData = { orderId, amount, orderName }

        setOrder(orderData)
        setAmount({ currency: 'KRW', value: orderData.amount })
      } catch (err) {
        console.error('결제 주문 생성 실패:', err)
        alert('결제 주문 생성 실패')
      }
    }

    fetchOrder()
  }, [planId, promotionId])

  // Toss 위젯 초기화
  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey)
      const widgets = tossPayments.widgets({ customerKey })
      setWidgets(widgets)
    }
    fetchPaymentWidgets()
  }, [])

  // UI 렌더링 (order가 준비된 후 실행)
  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets || !order) return

      await widgets.setAmount({
        currency: 'KRW',
        value: order.amount,
      })

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ])

      setReady(true)
    }
    renderPaymentWidgets()
  }, [widgets, order])

  // 쿠폰 적용 시 금액 업데이트
  useEffect(() => {
    if (!widgets || !amount.value) return
    widgets.setAmount(amount)
  }, [widgets, amount])

  return (
    <div className='wrapper'>
      <div className='box_section'>
        {order && (
          <p
            className='font'
            style={{ fontfamily: 'EliceDigitalBaeum', textAlign: 'center', marginTop: '20px' }}
          >
            상품명: {order.orderName} / 금액: {amount.value.toLocaleString()}원
          </p>
        )}

        {/* 결제 UI */}
        <div id='payment-method' style={{ minHeight: '200px', marginBottom: '20px' }} />
        {/* 이용약관 UI */}
        <div id='agreement' style={{ minHeight: '100px', marginBottom: '20px' }} />

        {/* 버튼 컴포넌트 */}
        <PaymentButton ready={ready} widgets={widgets} order={order} />
      </div>
    </div>
  )
}
