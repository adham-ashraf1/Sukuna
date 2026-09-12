import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Loading = () => {
  const progressRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const progress = gsap.fromTo(
      progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 2.2, ease: 'power2.inOut' },
    )
    const title = gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    )

    return () => {
      progress.kill()
      title.kill()
    }
  }, [])

  return (
    <main className="loading-page" aria-label="Loading" aria-busy="true">
      <div className="loading-content">
        <h1 ref={titleRef} className="loading-title">
          Jujutsu<span></span> kaisen
        </h1>
        <div className="loading-track" aria-hidden="true">
          <div ref={progressRef} className="loading-progress" />
        </div>
      </div>
    </main>
  )
}

export default Loading
