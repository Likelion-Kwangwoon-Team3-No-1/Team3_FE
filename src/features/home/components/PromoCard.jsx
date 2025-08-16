import { Icon } from '../../../components/Icon/Icon'

const PromoCard = ({ promotion }) => {
  return (
    <div className='card-content'>
      <img src={promotion.image} alt={promotion.name} className='card-image' />
      <h3 className='restaurant-name'>{promotion.name}</h3>
      <p className='restaurant-category'>{promotion.category}</p>
      <div className='info-item'>
        <Icon name='post-location' size={19.45} />
        <span>{promotion.address}</span>
      </div>
      <div className='info-item'>
        <Icon name='post-date' size={19.45} />
        <span>{promotion.date}</span>
      </div>
    </div>
  )
}

export default PromoCard
