import './SignupPage.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '../../../components/Icon/Icon'
import { useState } from 'react'
import instance from '../../../api/client'

export function SignupOwnerPage() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  const [previewUrl, setPreviewUrl] = useState(null) // 업로드한 이미지 상태
  const [shopName, setShopName] = useState('')
  const [shopPhone, setShopPhone] = useState('')
  const [detailedAddress, setDetailedAddress] = useState('')

  const location = useLocation()
  const { userId, password } = location.state || {}
  console.log('넘어온 값:', userId, password)

  const categoryList = ['식당', '카페', '기타']

  const MAX_FILE_SIZE_MB = 2 // 최대 2MB

  // 이미지 업로드 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size / 1024 / 1024 > MAX_FILE_SIZE_MB) {
      alert(`이미지 크기는 ${MAX_FILE_SIZE_MB}MB 이하로 선택해주세요.`)
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => setPreviewUrl(reader.result)
    reader.readAsDataURL(file)

    e.target.value = ''
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    const finalImage = previewUrl || 'https://placehold.co/400'
    const address = `서울특별시 노원구 ${detailedAddress}`

    try {
      const response = await instance.post('/signup/host', {
        loginId: userId,
        password: password,
        nickname: shopName,
        phone: shopPhone,
        address: address,
        category: category,
        thumbnail: finalImage,
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
      <header className='signup-header'>
        <button className='back-button' onClick={() => navigate(-1)}>
          <Icon name='detail-arrow-left' width={36} height={36} />
        </button>
        <h1 className='header-title'>회원가입</h1>
      </header>

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

          <div className='input-group'>
            <label htmlFor='detailed-address'>상세 주소</label>
            <div className='address-input-group'>
              <input type='text' className='fixed-address' value='서울특별시 노원구' disabled />
              <input
                type='text'
                id='detailed-address'
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                placeholder=''
              />
            </div>
          </div>

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

          <button type='submit' className='signup-button'>
            가입하기
          </button>
        </form>
      </main>
    </div>
  )
}
