const REVIEW_KEY = 'reviews'

export function saveReviews(reviews) {
  localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews))
}

export function loadReviews() {
  const data = localStorage.getItem(REVIEW_KEY)
  return data ? JSON.parse(data) : []
}
