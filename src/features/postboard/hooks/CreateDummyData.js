// 📌 더미 데이터 생성 함수
export const createDummyData = (page, size = 5) => {
  return Array.from({ length: size }, (_, i) => ({
    promotionId: (page - 1) * size + i + 1,
    createdAt: '08/13',
    promotionStatus: 'APPLYING',
    nickname: `상호명${(page - 1) * size + i + 1}`,
    category: i % 2 === 0 ? '식당' : '카페',
    address: '서울시 노원구 월계동',
    thumbnail: 'https://placehold.co/400',
    start_date: '2025-07-31',
  }))
}
