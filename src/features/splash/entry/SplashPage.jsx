import { useEffect, useState } from 'react'
import splashUp from '../../../assets/splash/splash-up.svg'
import splashUnion from '../../../assets/splash/splash-union.svg'
import splashIcon from '../../../assets/splash/splash-icon.svg'
import splashFeedup from '../../../assets/splash/splash-feedup.svg'

export function SplashPage() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [1000, 1000, 1000] // 각 단계마다 1초씩 보여줌

    timers.forEach((time, index) => {
      setTimeout(() => {
        setStep(index + 1)
      }, time * (index + 1))
    })
  }, [])

  const renderContent = () => {
    switch (step) {
      case 0:
        return <img src={splashUp} alt='splash-up' className='splash-img' />
      case 1:
        return <img src={splashUnion} alt='splash-union' className='splash-img' />
      case 2:
        return <img src={splashIcon} alt='splash-icon' className='splash-img' />
      case 3:
        return <img src={splashFeedup} alt='splash-feedup' className='splash-img' />
      default:
        return null
    }
  }

  return <div className='splash-container'>{renderContent()}</div>
}
