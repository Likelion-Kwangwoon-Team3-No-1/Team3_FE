import { useState, useEffect } from 'react'
import './TermsModal.css'

export function TermsModal({ onClose }) {
  const [isChecked, setIsChecked] = useState(false)

  // isChecked 상태가 true로 바뀌면 onClose 함수를 호출하면서 true 값을 전달
  useEffect(() => {
    if (isChecked) {
      onClose(true) // 동의했음을 나타내는 true 값을 전달
    }
  }, [isChecked, onClose])

  const handleCheckboxChange = () => {
    setIsChecked(true)
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h2>유의사항</h2>
        </div>
        <div className='modal-body'>
          <ul>
            <li>만원 이상 주문 시에만 페이백이 가능합니다.</li>
            <li>
              흐릿하거나 어두운 사진, 짧은 문장만 포함된 게시물은 페이백 지급이 제한될 수 있습니다.
            </li>
            <li>최소 3장 이상의 이미지 및 성의 있는 설명이 포함되어야 합니다.</li>
            <li>업로드 기한(예: 8월 12일)을 초과할 경우, 페이백 지급이 불가합니다.</li>
            <li>같은 프로모션에는 1회만 참여 가능하며, 중복 계정 참여는 엄격히 제한됩니다.</li>
            <li>
              입력 정보 오류에 대해선 책임을 지지 않습니다.
              <ul>
                <li>계좌, 상호명(모집 게시글과 동일하게) 등</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='modal-checkbox-group'>
          <div
            className={`modal-checkbox ${isChecked ? 'checked' : ''}`}
            onClick={handleCheckboxChange}
          >
            <div className='checkmark'>✔</div>
          </div>
          <span className='checkbox-text'>유의사항을 모두 확인하고 전체 동의합니다.</span>
        </div>
      </div>
    </div>
  )
}
