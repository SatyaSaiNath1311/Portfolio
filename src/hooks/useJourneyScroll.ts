import { useState, useEffect, type RefObject } from 'react'

export function useJourneyScroll(sectionRef: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const totalScrollable = el.offsetHeight - window.innerHeight

      if (totalScrollable <= 0) {
        setProgress(0)
        return
      }

      // Distance scrolled from top of section
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable))
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sectionRef])

  return progress
}
