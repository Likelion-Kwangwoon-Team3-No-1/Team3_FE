import { Icon } from '../../../components/Icon/Icon'
import './PromoCard.css'
import { formatPromoDate } from '../../../utils/promoDate'

// 카테고리 변환 매핑
const categoryMap = {
  CAFE: '카페',
  RESTAURANT: '식당',
  OTHER: '기타',
}

const PromoCard = ({ promotion, onClick }) => {
  return (
    <div className='promo-card' onClick={() => onClick(promotion.promotionId)}>
      <img src={promotion.thumbnail} alt={promotion.nickname} className='promo-image' />
      <div className='promo-body'>
        <div className='promo-header'>
          <h3 className='promo-name'>{promotion.nickname}</h3>
          <p className='promo-category'>{categoryMap[promotion.category] || promotion.category}</p>
        </div>

        <div className='promo-info'>
          <div className='info-item'>
            <Icon name='post-location' width={19.49} height={19.49} />
            <span>{promotion.address}</span>
          </div>
          <div className='info-item'>
            <Icon name='post-date' width={19.49} height={19.49} />
            <span>{formatPromoDate(promotion.start_date, promotion.end_date)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoCard
