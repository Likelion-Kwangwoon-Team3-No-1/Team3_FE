import { useState } from 'react'
import { Icon } from '../../../components/Icon/Icon'
import './Modal.css'

export function ConsentModal({ onApply }) {
  const [agreed, setAgreed] = useState(false)

  const handleApplyClick = () => {
    if (agreed) {
      onApply()
    } else {
      alert('유의사항에 동의해주세요.')
    }
  }

  return (
    <div className='post-modal-overlay'>
      <div className='post-modal-container'>
        <div className='post-modal-body'>
          <div className='post-modal-attention'>
            <h3 className='post-modal-title'>유의사항</h3>
            <ul className='post-modal-list'>
              <li>· 만원이상 주문 시에만 페이백이 가능합니다.</li>
              <li>
                · 흐릿하거나 어두운 사진, 짧은 문장만 포함된 게시물은 페이백 지급이 제한될 수
                있습니다.
              </li>
              <li>· 최소 3장 이상의 이미지 및 성의 있는 설명이 포함되어야 합니다.</li>
              <li>· 업로드 기한(예: 8월 12일)을 초과할 경우, 페이백 지급이 불가합니다.</li>
              <li>· 같은 프로모션에는 1회만 참여 가능하며, 중복 계정 참여는 엄격히 제한됩니다.</li>
              <li>· 입력 정보 오류에 대해선 책임을 지지 않습니다.</li>
              <li>
                · 입력 정보 오류에 대해선 책임을 지지 않습니다. 계좌, 상호명(모집 게시글과 동일하게)
                등
              </li>
            </ul>
            <div className='agreement-checkbox' onClick={() => setAgreed(!agreed)}>
              <Icon
                name={agreed ? 'agree-checkbox-filled' : 'agree-checkbox-default'}
                width={20}
                height={20}
              />
              <span className='agreement-text'>유의사항을 모두 확인하고 전체 동의합니다.</span>
            </div>
          </div>
          <button className={`modal-button ${agreed ? 'active' : ''}`} onClick={handleApplyClick}>
            신청하기
          </button>
        </div>
      </div>
    </div>
  )
}
