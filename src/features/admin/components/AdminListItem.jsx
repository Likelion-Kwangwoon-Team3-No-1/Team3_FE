import './AdminListItem.css'
import arrowIcon from '../../../assets/mypage/mypage-arrow-right.svg'

export function AdminListItem({ title, createdAt, onClick }) {
  return (
    <div className='admin-list-item' onClick={onClick}>
      <div className='admin-list-item__text'>
        <div className='admin-list-item__row'>
          <div className='admin-list-item__title'>{title}</div>
        </div>
        <div className='admin-list-item__date'>
          {new Date(createdAt).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'Asia/Seoul',
          })}
        </div>
      </div>
      <img src={arrowIcon} alt='>' className='admin-list-item__arrow' />
    </div>
  )
}
