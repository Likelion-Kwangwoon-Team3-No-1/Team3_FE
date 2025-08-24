import { useState } from 'react'
import './Onboarding.css'
import { Icon } from '../../../components/Icon/Icon'
import { useNavigate } from 'react-router-dom'

export const OnBoardingStudentPage = () => {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  const pages = [
    {
      name: 'onboard-student-1',
      button: '다음',
    },
    {
      name: 'onboard-student-2',
      button: '다음',
    },
    {
      name: 'onboard-student-3',
      button: '시작하기',
    },
  ]

  const handleNext = () => {
    if (step < pages.length - 1) {
      setStep(step + 1)
    } else {
      alert('온보딩이 완료되었습니다!') // 추후 라우팅 연결 가능
      navigate('/home/student')
    }
  }

  return (
    <div className='onboarding'>
      <div className='onboarding-content'>
        <Icon name={pages[step].name} width={360} height={400} />
      </div>

      {/* indicator */}
      <div className='indicator'>
        {pages.map((_, idx) => (
          <span key={idx} className={idx === step ? 'dot active' : 'dot'} />
        ))}
      </div>

      {/* button */}
      <button className='next-btn' onClick={handleNext}>
        {pages[step].button}
      </button>
    </div>
  )
}
