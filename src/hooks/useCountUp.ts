import { useState, useRef, useEffect } from 'react'

export function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
          const tick = (now: number) => {
            const elapsed = Math.min((now - startTime) / duration, 1)
            setCount(Math.round(easeOutQuart(elapsed) * target))
            if (elapsed < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, count }
}
