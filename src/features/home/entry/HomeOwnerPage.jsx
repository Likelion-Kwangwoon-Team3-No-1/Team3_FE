import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Link } from 'react-router-dom'

import PromoCard from '../components/PromoCard'
import { Icon } from '../../../components/Icon/Icon'
import BottomNav from '../../../components/BottomNav/BottomNav'
import banner from '../../../assets/logo/logo-home-banner.svg'
import './HomeOwnerPage.css'

// 더미데이터
const promotions = [
  {
    image: 'https://placehold.co/353x200',
    name: '푸른스시',
    category: '식당',
    address: '서울특별시 노원구 월계동',
    date: '2025.07.31 ~ 2025.08.31',
  },
  {
    image: 'https://placehold.co/353x200',
    name: '푸른스시',
    category: '식당',
    address: '서울특별시 노원구 월계동',
    date: '2025.07.31 ~ 2025.08.31',
  },
  {
    image: 'https://placehold.co/353x200',
    name: '푸른스시',
    category: '식당',
    address: '서울특별시 노원구 월계동',
    date: '2025.07.31 ~ 2025.08.31',
  },
]

function NextArrow(props) {
  const { onClick, currentSlide, slideCount } = props
  if (currentSlide === slideCount - 1) return null
  return (
    <button className='arrow-btn next' onClick={onClick}>
      <Icon name='card-next' width={24} height={24} />
    </button>
  )
}

function PrevArrow(props) {
  const { onClick, currentSlide } = props
  if (currentSlide === 0) return null
  return (
    <button className='arrow-btn prev' onClick={onClick}>
      <Icon name='card-pre' width={24} height={24} />
    </button>
  )
}

function Carousel() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  }
  const style = { textDecoration: 'none' }

  return (
    <div className='carousel-container'>
      <h2 className='section-title'>진행 중인 프로모션</h2>
      {promotions.length > 0 ? (
        <Slider {...settings}>
          {promotions.map((promo, index) => (
            <div key={index} className='card-wrapper'>
              <PromoCard promotion={promo} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className='empty-promo'>
          <Icon name='card-none' width={100} height={100} className='empty-icon' />
          <p>아직 진행 중인 프로모션이 없어요</p>
          <Link style={style} to='/postform'>
            <div className='go-btn'>
              <button>
                <span className='go-btn-text'>프로모션 신청하러 가기</span>
                <Icon name='card-none-arrow' width={24} height={24} className='go-btn-arrow' />
              </button>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export const HomeOwnerPage = () => {
  return (
    <div className='home-container'>
      <header className='home-header'>
        <Icon name='logo-home' width={86.87} height={21.65} className='logo-home' />
      </header>
      <div className='home-body'>
        <p className='welcome-msg'>👋 사장님, 환영합니다!</p>
        <img src={banner} className='banner' />

        <Carousel />

        <div className='sns-btn'>
          <button>
            <Icon name='logo-instagram' width={32} height={32} className='sns-btn-logo' />
            <span className='sns-btn-content'>Feed Up SNS 바로가기</span>
            <Icon name='button-sns-arrow' width={24} height={24} className='sns-btn-arrow' />
          </button>
        </div>
        <BottomNav />
      </div>
    </div>
  )
}

export default HomeOwnerPage
