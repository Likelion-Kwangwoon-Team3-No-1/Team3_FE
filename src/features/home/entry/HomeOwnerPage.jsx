import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import PromoCard from '../components/PromoCard'

import './HomeStudentPage.css'

const promotions = [
  {
    image: 'https://placehold.co/353x200', // 실제 이미지 URL로 교체
    name: '푸른스시',
    category: '식당',
    address: '서울특별시 노원구 월계동',
    date: '2025.07.31 ~ 2025.08.31',
  },
  {
    image: 'https://placehold.co/353x200', // 실제 이미지 URL로 교체
    name: '푸른스시',
    category: '식당',
    address: '서울특별시 노원구 월계동',
    date: '2025.07.31 ~ 2025.08.31',
  },
  {
    image: 'https://placehold.co/353x200', // 실제 이미지 URL로 교체
    name: '푸른스시',
    category: '식당',
    address: '서울특별시 노원구 월계동',
    date: '2025.07.31 ~ 2025.08.31',
  },
  // ... 다른 프로모션 데이터
]

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  }

  return (
    <div className='carousel-container'>
      <h2>참여 중인 프로모션</h2>
      <Slider {...settings}>
        {promotions.map((promo, index) => (
          <div key={index} className='card-wrapper'>
            <PromoCard promotion={promo} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel

export const HomeOwnerPage = () => {
  return (
    <div className='test'>
      <h1>자영업자 홈입니다.</h1>
      <h1>========구분선=========</h1>
      {Carousel()}
    </div>
  )
}
