import './Rating.css'
import fill from '../../assets/review/review-fill.svg'
import unfilled from '../../assets/review/review-unfilled.svg'

/**
 * 1~5점까지 평점을 선택할 수 있는 별점 선택 컴포넌트
 *
 * @param {Object} props
 * @param {number} props.rating - 현재 선택된 평점 (1~5)
 * @param {(rating: number) => void} props.onRate - 평점 클릭 시 호출되는 콜백
 * @param {number} props.iconSize - 아이콘 크기 (px 단위)
 * @returns {JSX.Element}
 */

export const Rating = ({ rating, onRate, iconSize }) => {
  const handleRate = (selectedRating) => {
    if (typeof onRate === 'function') {
      onRate(selectedRating)
    }
  }

  return (
    <div className='rating-container'>
      {[...Array(5)].map((_, index) => {
        const isFilled = index < rating
        const iconSrc = isFilled ? fill : unfilled

        return (
          <button
            key={index}
            type='button'
            onClick={() => handleRate(index + 1)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <img
              src={iconSrc}
              alt={isFilled ? '채워진 별' : '비어있는 별'}
              width={iconSize}
              height={iconSize}
            />
          </button>
        )
      })}
    </div>
  )
}
