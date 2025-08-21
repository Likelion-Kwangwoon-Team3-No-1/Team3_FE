import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createDummyDataPostDetail } from '../hooks/CreateDummyDataPostDetail'
import { formatPromoDate } from '../../../utils/promoDate'
import { ConsentModal } from '../components/ConsentModal'
import { CompletionModal } from '../components/CompletionModal'
import './PostDetailPage.css'
import { Icon } from '../../../components/Icon/Icon'

export function PostDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [showConsentModal, setShowConsentModal] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)

  useEffect(() => {
    const allDummyPosts = createDummyDataPostDetail(5)
    const foundPost = allDummyPosts.find((p) => p.promotionId === Number(id))
    setPost(foundPost)
  }, [id])

  const handleApplyClick = () => {
    setShowConsentModal(true)
  }

  const handleApplySubmit = () => {
    setShowConsentModal(false)
    setShowCompletionModal(true)
  }

  const handleCloseCompletionModal = () => {
    setShowCompletionModal(false)
    navigate('/home/student') // 신청 완료 후 홈 화면으로 이동
  }

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>
  }

  return (
    <div className='post-detail-container'>
      <div className='detail-header'>
        <div className='image-container'>
          <img src={post.thumbnail} alt={post.nickname} className='main-image' />
          <div className='back-button-overlay'>
            <button className='back-button' onClick={() => navigate(-1)}>
              <Icon name='detail-arrow-left' width={36} height={36} />
            </button>
          </div>
        </div>
        <div className='detail-info'>
          <div className='store-info'>
            <img src={post.thumbnail} alt={post.nickname} className='store-thumbnail' />
            <div className='store-text'>
              <h1 className='store-name'>{post.nickname}</h1>
              <p className='store-category'>{post.category}</p>
              <div className='store-details'>
                <p className='detail-item'>
                  <Icon name='detail-location' width={24} height={24} />
                  <span>{post.address}</span>
                </p>
                <p className='detail-item'>
                  <Icon name='detail-phone' width={24} height={24} />
                  <span>{post.phoneNumber}</span>
                </p>
                <p className='detail-item'>
                  <Icon name='detail-date' width={24} height={24} />
                  <span>{formatPromoDate(post.start_date)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='scrollable-content'>
        <div className='detail-content'>
          <div className='promotion-section'>
            <h2 className='section-title'>프로모션 내용</h2>
            <div className='promotion-text'>
              <p>{post.context}</p>
            </div>
          </div>
        </div>
        <div className='additional-info'>
          <p>
            선정된 후 별도 연락 없이 방문하지 않거나, 업로드 기한 내 콘텐츠 미등록 시 향후 참여
            제한될 수 있습니다. 흐릿하거나 어두운 사진, 짧은 문장만 포함된 게시물은 페이백 지급이
            제한될 수 있습니다. 최소 3장 이상의 이미지(또는 10초 이상 영상) 및 성의 있는 설명이
            포함되어야 합니다. 업로드 기한(예: 8월 12일)을 초과할 경우, 리워드 제공이 불가합니다.
            같은 프로모션에는 1회만 참여 가능하며, 중복 계정 참여는 엄격히 제한됩니다. 방문 및
            콘텐츠 업로드를 모두 완료한 후, 피드업 내 인증 절차를 완료한 사용자에게만 리워드가
            지급됩니다. 영업상황(브레이크 타임, 재료 소진 등)에 따라 방문 일정이 일부 조정될 수
            있습니다.
          </p>
        </div>
      </div>
      <div className='apply-button-wrapper'>
        <button className='apply-button' onClick={handleApplyClick}>
          신청하기
        </button>
      </div>

      {showConsentModal && (
        <ConsentModal onClose={() => setShowConsentModal(false)} onApply={handleApplySubmit} />
      )}

      {showCompletionModal && <CompletionModal onClose={handleCloseCompletionModal} />}
    </div>
  )
}
