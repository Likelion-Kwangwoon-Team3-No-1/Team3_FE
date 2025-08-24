import { loadTossPayments } from '@tosspayments/tosspayments-sdk'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { instance } from '../../../api/client'

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm'
const customerKey = 'FaCEncROfkbEXg_aC4HN4'

export function CheckoutPage() {
  const { state } = useLocation()
  const { planId, promotionId } = state || {}

  const [ready, setReady] = useState(false)
  const [widgets, setWidgets] = useState(null)

  useEffect(() => {
    async function fetchPaymentWidgets() {
      const tossPayments = await loadTossPayments(clientKey)
      const widgets = tossPayments.widgets({ customerKey })
      setWidgets(widgets)
    }
    fetchPaymentWidgets()
  }, [])

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return

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
  }, [widgets])

  // 결제 생성 API
  const createPaymentOrder = async ({ planId, promotionId }) => {
    const res = await instance.post('/api/payments/orders', {
      planId,
      promotionId,
    })
    return res.data // { orderId, amount, orderName }
  }

  const handlePayment = async () => {
    if (!planId || !promotionId) {
      alert('planId 또는 promotionId 값이 없습니다.')
      return
    }

    try {
      const order = await createPaymentOrder({ planId, promotionId })

      await widgets.requestPayment({
        orderId: order.orderId,
        orderName: order.orderName,
        amount: order.amount,
        successUrl: window.location.origin + '/success',
        failUrl: window.location.origin + '/fail',
        customerEmail: 'customer123@gmail.com',
        customerName: '김토스',
        customerMobilePhone: '01012341234',
      })
    } catch (error) {
      console.error('결제 요청 실패:', error)
    }
  }

  return (
    <div className='wrapper'>
      <div className='box_section'>
        <h3>결제 페이지</h3>
        <p>
          planId: {planId}, promotionId: {promotionId}
        </p>

        <div id='payment-method' />
        <div id='agreement' />

        <button className='button' disabled={!ready} onClick={handlePayment}>
          결제하기
        </button>
      </div>
    </div>
  )
}
