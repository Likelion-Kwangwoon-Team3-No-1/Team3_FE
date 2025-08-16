import { useNavigate } from 'react-router-dom'
import './TopBar.css'
import backIcon from '../../assets/detail/detail-arrow-left.svg'

export default function TopBar({ title = '제목', onBack }) {
  const navigate = useNavigate()
  const handleBack = () => {
    if (typeof onBack === 'function') onBack()
    else navigate(-1)
  }

  return (
    <header className='topbar'>
      <button className='topbar__back' onClick={handleBack} aria-label='이전으로'>
        <img src={backIcon} alt='' className='topbar__back-icon' />
      </button>
      <h1 className='topbar__title'>{title}</h1>
    </header>
  )
}
