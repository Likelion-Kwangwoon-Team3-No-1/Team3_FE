import { Icon } from '../../../components/Icon/Icon'
import './PromoCard.css'
import { formatPromoDate } from '../../../utils/promoDate'

const PromoCard = ({ promotion }) => {
  return (
    <div className='promo-card'>
      <img src={promotion.image} alt={promotion.name} className='promo-image' />
      <div className='promo-body'>
        <div className='promo-header'>
          <h3 className='promo-name'>{promotion.name}</h3>
          <p className='promo-category'>{promotion.category}</p>
        </div>

        <div className='promo-info'>
          <div className='info-item'>
            <Icon name='post-location' width={19.49} height={19.49} />
            <span>{promotion.address}</span>
          </div>
          <div className='info-item'>
            <Icon name='post-date' width={19.49} height={19.49} />
            <span>{formatPromoDate(promotion.date)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromoCard
