import './ListItem.css'
import arrowIcon from '../../../assets/mypage/mypage-arrow-right.svg'

export function ListItem({ title, createdAt, status, onClick }) {
  const isOngoing = status === 'ongoing' // 진행 중인 항목만 뱃지

  return (
    <div className='list-item' onClick={onClick}>
      <div className='list-item-text'>
        <div className='list-item-row'>
          <div className='list-item-title'>{title}</div>
          {isOngoing && <span className='badge-ongoing'>진행 중</span>}
        </div>
        <div className='list-item-date'>{new Date(createdAt).toLocaleString()}</div>
      </div>
      <img src={arrowIcon} alt='>' className='list-item-arrow' />
    </div>
  )
}
