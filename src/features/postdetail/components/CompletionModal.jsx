// CompletionModal.jsx
import { Icon } from '../../../components/Icon/Icon'
import './Modal.css'

export function CompletionModal({ onClose }) {
  return (
    <div className='post-modal-overlay'>
      <div className='post-modal-container'>
        <div className='post-modal-header'>
          <Icon
            name='agree-close'
            width={32}
            height={32}
            className='close-button'
            onClick={onClose}
          />
        </div>
        <div className='completion-body'>
          <div className='completion-icon-wrapper'>
            {/* 겉의 원 아이콘 */}
            <Icon name='detail-circle' width={60} height={60} className='completion-circle-icon' />
            {/* 안의 체크 아이콘 (애니메이션 적용) */}
            <Icon name='detail-check' width={60} height={60} className='completion-check-icon' />
          </div>
          <p>신청 완료</p>
        </div>
      </div>
    </div>
  )
}
