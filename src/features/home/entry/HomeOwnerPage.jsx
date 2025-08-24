// HomeOwnerPage.jsx
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Icon } from '../../../components/Icon/Icon'
import PromoCard from '../components/PromoCard'
import BottomNav from '../../../components/BottomNav/BottomNav'
import banner from '../../../assets/logo/logo-home-banner.svg'
import './HomePage.css'
import instance from '../../../api/client'

// Carousel 내부에서 promotions을 props로 받도록 수정
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

function Carousel({ promotions }) {
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
  const navigate = useNavigate()
  const handleCardClick = (promotionId) => {
    navigate(`/review/${promotionId}`)
  }

  return (
    <div className='carousel-container'>
      <h2 className='section-title'>진행 중인 프로모션</h2>
      {promotions.length > 0 ? (
        <Slider {...settings}>
          {promotions.map((promo) => (
            <div key={promo.promotionId} className='card-wrapper'>
              <PromoCard promotion={promo} onClick={handleCardClick} />
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
  const [promotions, setPromotions] = useState([])

  useEffect(() => {
    localStorage.setItem('userType', 'OWNER')

    // hostId 임시 하드코딩 (ex: 3)
    const hostId = 3

    instance
      .get(`/api/promotions?hostId=${hostId}`)
      .then((res) => {
        // 서버 응답: { items: [...], hasNext: false }
        const mapped = res.items.map((p) => ({
          promotionId: p.promotionId,
          nickname: p.nickname,
          category: p.category,
          address: p.address,
          thumbnail: p.thumbnail, // 서버에서는 thumbnail
          end_date: p.end_date,
          start_date: p.start_date,
        }))
        setPromotions(mapped)
      })
      .catch((err) => {
        console.error('프로모션 불러오기 실패:', err)
      })
  }, [])

  return (
    <div className='home-container'>
      <header className='home-header'>
        <Icon name='logo-home' width={86.87} height={21.65} className='logo-home' />
      </header>
      <div className='home-content-wrapper'>
        <div className='home-body'>
          <p className='welcome-msg'>👋 사장님, 환영합니다!</p>
          <img src={banner} className='banner' />

          <Carousel promotions={promotions} />

          <div className='sns-btn'>
            <button onClick={() => window.open('https://www.instagram.com/instagram/')}>
              <Icon name='logo-instagram' width={32} height={32} className='sns-btn-logo' />
              <span className='sns-btn-content'>Feed Up SNS 바로가기</span>
              <Icon name='button-sns-arrow' width={24} height={24} className='sns-btn-arrow' />
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default HomeOwnerPage
