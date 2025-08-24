import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { instance } from '../../../api/client'

export function SuccessPage() {
  const [searchParams] = useSearchParams()
  const [payment, setPayment] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey')
    const orderId = searchParams.get('orderId')
    const amount = Number(searchParams.get('amount'))

    if (!paymentKey || !orderId || !amount) {
      setError('결제 파라미터가 올바르지 않습니다.')
      return
    }

    async function confirmPayment() {
      try {
        const res = await instance.post('/payments/confirm', {
          paymentKey,
          orderId,
          amount,
        })
        setPayment(res)
      } catch (err) {
        console.error('결제 확인 실패:', err)
        setError('결제 확인 실패')
      }
    }

    confirmPayment()
  }, [searchParams])

  // 결제 완료되면 2초 뒤 자동 이동
  useEffect(() => {
    if (payment) {
      const timer = setTimeout(() => {
        navigate('/home/owner')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [payment, navigate])

  if (error) {
    return (
      <div className='result wrapper'>
        <div className='box_section'>
          <h2>결제 오류</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!payment) {
    return (
      <div className='result wrapper'>
        <div className='box_section'>
          <h2>결제 확인 중...</h2>
          <p>잠시만 기다려주세요.</p>
        </div>
      </div>
    )
  }

  // 결제 완료 UI
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#fff',
      }}
    >
      {/* 체크 아이콘 (파란 원 + 흰색 체크) */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#1A73E8',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='48'
          height='48'
          viewBox='0 0 24 24'
          fill='none'
          stroke='white'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M20 6L9 17l-5-5' />
        </svg>
      </div>

      <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333' }}>결제를 완료했어요</h2>
    </div>
  )
}
