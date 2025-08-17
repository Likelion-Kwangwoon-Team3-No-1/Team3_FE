import './PostList.css'
import { formatPromoDate, timeAgo } from '../../../utils/promoDate'
import { Icon } from '../../../components/Icon/Icon'

// PostBoardPage 에서 {...post}로 props가 펼쳐져 넘어옴
export function PostList({
  promotionId,
  nickname,
  category,
  createdAt,
  address,
  thumbnail,
  start_date,
  onClick,
}) {
  return (
    <div className='postlist-item' key={promotionId} onClick={() => onClick(promotionId)}>
      {/* 왼쪽 텍스트 영역 */}
      <div className='postlist-content'>
        <div className='postlist-header'>
          <span className='promo-shop'>{nickname}</span>
          <span className='dot'>·</span>
          <span className='promo-category'>{category}</span>
          <span className='promo-time'>{timeAgo(createdAt)}</span>
        </div>
        <div className='promo-address'>
          <Icon name='post-location' width={16} height={16} />
          <span>{address}</span>
        </div>
        <div className='promo-date'>
          <Icon name='post-date' width={16} height={16} />
          <span>{formatPromoDate(start_date)}</span>
        </div>
      </div>

      {/* 오른쪽 이미지 */}
      {thumbnail && (
        <div className='postlist-image'>
          <img src={thumbnail} alt={nickname} />
        </div>
      )}
    </div>
  )
}
