import { useEffect } from 'react'

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
