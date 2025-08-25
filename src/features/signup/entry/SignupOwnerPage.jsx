import './SignupPage.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '../../../components/Icon/Icon'
import { useState } from 'react'
import instance from '../../../api/client'
import imageCompression from 'browser-image-compression' // 추가
import { Button } from '../../../components/Button/Button'
import TopBar from '../../../components/TopBar/TopBar'

export function SignupOwnerPage() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  const [previewUrl, setPreviewUrl] = useState(null) // 미리보기
  const [file, setFile] = useState(null) // 실제 업로드할 파일
  const [shopName, setShopName] = useState('')
  const [shopPhone, setShopPhone] = useState('')
  const [detailedAddress, setDetailedAddress] = useState('')

  const location = useLocation()
  const { userId, password } = location.state || {}
  console.log('넘어온 값:', userId, password)

  const categoryList = ['식당', '카페', '기타']
  const MAX_FILE_SIZE_MB = 2

  // 이미지 선택
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    try {
      // 브라우저에서 이미지 압축
      const options = {
        maxSizeMB: MAX_FILE_SIZE_MB,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      }

      const compressedFile = await imageCompression(selectedFile, options)

      if (compressedFile.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
        alert(`이미지 크기는 ${MAX_FILE_SIZE_MB}MB 이하로 선택해주세요.`)
        return
      }

      setFile(compressedFile)

      // 미리보기
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result)
      reader.readAsDataURL(compressedFile)
    } catch (error) {
      console.error('이미지 압축 실패:', error)
      alert('이미지 처리 중 오류가 발생했습니다.')
    }

    e.target.value = ''
  }

  // 회원가입
  const handleSignup = async (e) => {
    e.preventDefault()
    const address = `서울특별시 노원구 ${detailedAddress}`

    let uploadedImageUrl = null

    try {
      // 파일 업로드
      if (file) {
        const formData = new FormData()
        formData.append('thumbnail', file)

        const uploadRes = await instance.post(
          `/uploads/host-thumbnail?loginId=${encodeURIComponent(userId)}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        )

        // 서버에서 urls 배열로 내려주는 구조 반영
        uploadedImageUrl = uploadRes?.urls?.[0] || null
        console.log('업로드 성공:', uploadedImageUrl)
      }

      // 한글 카테고리를 영어 카테고리로 매핑
      const categoryMap = {
        식당: 'RESTAURANT',
        카페: 'CAFE',
        기타: 'OTHER',
      }
      const en_category = categoryMap[category] || 'etc'

      // 회원가입 요청
      const response = await instance.post('/signup/host', {
        loginId: userId,
        password,
        nickname: shopName,
        phone: shopPhone,
        address,
        category: en_category,
        thumbnail: uploadedImageUrl,
      })

      console.log('회원가입 성공:', response)
      alert('가입되었습니다.')
      navigate('/login')
    } catch (err) {
      console.error('회원가입 실패:', err.response || err)
      alert('회원가입 실패! 다시 시도해주세요.')
    }
  }

  return (
    <div className='signup-page'>
      <TopBar title='가게 정보' />

      <main className='signup-form-container'>
        <form className='signup-form' onSubmit={handleSignup}>
          {/* 이미지 업로드 */}
          <div className='image-upload'>
            <label htmlFor='shopImageUpload' className='image-upload-label'>
              {previewUrl ? (
                <img src={previewUrl} alt='가게 사진' className='preview-image' />
              ) : (
                <div className='image-placeholder'>
                  <Icon name='signup-photo' width={40} height={40} />
                </div>
              )}
            </label>
            <input
              type='file'
              id='shopImageUpload'
              accept='image/*'
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* 상호명 */}
          <div className='input-group'>
            <label htmlFor='shopName'>상호명</label>
            <div className='input-with-button'>
              <input
                type='text'
                id='shopName'
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </div>

          {/* 가게 번호 */}
          <div className='input-group'>
            <label htmlFor='shopPhone'>가게 번호</label>
            <div className='input-with-button'>
              <input
                type='tel'
                inputMode='numeric'
                id='shopPhone'
                value={shopPhone}
                onChange={(e) => setShopPhone(e.target.value)}
                placeholder="('-')제외하고 입력"
              />
            </div>
          </div>

          {/* 주소 */}
          <div className='input-group'>
            <label htmlFor='detailed-address'>상세 주소</label>
            <div className='address-input-group'>
              <input type='text' className='fixed-address' value='서울특별시 노원구' disabled />
              <input
                type='text'
                id='detailed-address'
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
              />
            </div>
          </div>

          {/* 카테고리 */}
          <div className='input-group'>
            <label htmlFor='category-select'>가게 카테고리</label>
            <select
              id='category-select'
              className='category-select'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='' disabled>
                전체
              </option>
              {categoryList.map((Category) => (
                <option key={Category} value={Category}>
                  {Category}
                </option>
              ))}
            </select>
          </div>

          <Button label='저장하기' className='signup-button' onClick={handleSignup} />
        </form>
      </main>
    </div>
  )
}
