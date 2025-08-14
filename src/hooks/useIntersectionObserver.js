import { useEffect } from 'react'

/**
 * @param {Object} targetRef - 관찰할 DOM ref
 * @param {Function} onIntersect - 교차 시 실행할 콜백
 * @param {boolean} enabled - 옵저버 활성화 여부 (옵셔널)
 */
export const useIntersectionObserver = (targetRef, onIntersect, enabled = false) => {
  useEffect(() => {
    if (!targetRef.current || !enabled) return

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        if (entries[0].isIntersecting) {
          observerInstance.unobserve(entries[0].target)
          onIntersect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(targetRef.current)

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [enabled, onIntersect, targetRef])
}
