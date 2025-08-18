import { useEffect, useState, useCallback } from 'react'
import { createReviewApi } from './reviewApi'

export function useMyReviews(pageSize = 10) {
  const [items, setItems] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasNext, setHasNext] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!hasNext || loading) return
    setLoading(true)
    setError(null)
    try {
      const data = await createReviewApi({ offset, limit: pageSize })
      setItems((prev) => [...prev, ...(data.items ?? [])])
      setHasNext(Boolean(data.hasNext))
      setOffset(data.nextOffset ?? offset + pageSize)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [offset, pageSize, hasNext, loading])

  useEffect(() => {
    // 초기 1페이지
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { items, hasNext, load, loading, error }
}
