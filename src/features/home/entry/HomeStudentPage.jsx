// HomeStudentPage.jsx
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Icon } from '../../../components/Icon/Icon'
import PromoCard from '../components/PromoCard'
import BottomNav from '../../../components/BottomNav/BottomNav'
import banner from '../../../assets/logo/logo-home-banner.svg'
import instance from '../../../api/client'
import './HomePage.css'

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
  const [promotions, setPromotions] = useState([])
  const navigate = useNavigate()

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

  const handleCardClick = (promotionId) => {
    navigate(`/review-form/${promotionId}`)
  }

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await instance.get('/promotion-applies/me', {
          params: { offset: 0, limit: 10 },
        })
        // API 응답 -> PromoCard prop 맞춰주기
        const mapped = res.items.map((item) => ({
          promotionId: item.promotionId,
          image: item.thumbnail,
          nickname: item.nickname,
          category: item.category,
          address: item.address,
          start_date: item.start_date,
          end_date: item.end_date, // 마감일 표시
        }))
        setPromotions(mapped)
      } catch (error) {
        console.error('참여 중인 프로모션 불러오기 실패:', error)
      }
    }

    fetchPromotions()
  }, [])

  const style = { textDecoration: 'none' }

  return (
    <div className='carousel-container'>
      <h2 className='section-title'>참여 중인 프로모션</h2>
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
          <p>아직 참여 중인 프로모션이 없어요</p>
          <Link style={style} to='/postboard'>
            <div className='go-btn'>
              <button>
                <span className='go-btn-text'>프로모션 참여하러 가기</span>
                <Icon name='card-none-arrow' width={24} height={24} className='go-btn-arrow' />
              </button>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export const HomeStudentPage = () => {
  useEffect(() => {
    localStorage.setItem('userType', 'STUDENT')
  }, [])

  return (
    <div className='home-container'>
      <header className='home-header'>
        <Icon name='logo-home' width={86.87} height={21.65} className='logo-home' />
      </header>
      <div className='home-content-wrapper'>
        <div className='home-body'>
          <p className='welcome-msg'>👋 대학생 크리에이터님, 환영합니다!</p>
          <img src={banner} className='banner' />

          <Carousel />

          <div className='sns-btn'>
            <button onClick={() => window.open('https://www.instagram.com/feedup.official/')}>
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

export default HomeStudentPage
