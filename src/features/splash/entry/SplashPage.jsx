import { useEffect, useState } from 'react'
import { Icon } from '../../../components/Icon/Icon'
import { useNavigate } from 'react-router-dom'
import './SplashPage.css'

export function SplashPage() {
  const [step, setStep] = useState(0)
  const [fade, setFade] = useState(false) // fade-in 적용 여부
  const navigate = useNavigate()

  useEffect(() => {
    // 첫 렌더 후 fade 적용
    const timeout = setTimeout(() => setFade(true), 50)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < 2 ? prev + 1 : prev))
    }, 1400)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (step === 2) {
      const timeout = setTimeout(() => {
        navigate('/login')
      }, 1400)
      return () => clearTimeout(timeout)
    }
  }, [step, navigate])

  return (
    <div className='splash-container'>
      {step === 0 && (
        <Icon name='splash-up' width={120} height={120} className={fade ? 'fade-in' : ''} />
      )}
      {step === 1 && <Icon name='splash-union' width={120} height={120} />}
      {step === 2 && (
        <div className='splash-logo fade-in'>
          <Icon name='splash-icon' width={50} height={50} />
          <span className='logo-text'>Feed up</span>
        </div>
      )}
    </div>
  )
}
