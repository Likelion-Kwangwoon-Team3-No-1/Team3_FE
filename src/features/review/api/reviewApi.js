// 서버가 요구하는 파라미터: promotionId, content, rate, photoUrls
// 엔드포인트 경로는 필요 시 아래 REVIEW_CREATE_PATH 한 곳만 바꿔주세요.

import { instance } from '../../../api/client'

const REVIEW_CREATE_PATH = '/reviews' // 예) '/promotion-reviews' 로 바꿔도 됨

/** 리뷰 생성 (JSON) */
export async function createReviewApi({ promotionId, content, rate, photoUrls = [] }) {
  const res = await instance.post(REVIEW_CREATE_PATH, {
    promotionId, // number | string
    content, // string
    rate, // number (예: 4.5)
    photoUrls, // string[] (이미지 URL/데이터URL)
  })
  return res.data
}
