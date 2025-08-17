// 📌 상세 정보가 포함된 더미 데이터 생성 함수 (PostDetailPage용)
export const createDummyDataPostDetail = (size = 10) => {
  return Array.from({ length: size }, (_, i) => ({
    promotionId: i + 1,
    createdAt: '08/13',
    nickname: `푸른스시${i + 1}`,
    category: i % 2 === 0 ? '식당' : '카페',
    address: '서울시 노원구 어딘가',
    thumbnail: 'https://placehold.co/400',
    start_date: '2025-08-01',
    phoneNumber: '010-4444-4444',
    context: '신선한 원두와 부드러운 라떼 맛보기 프로모션',
  }))
}
