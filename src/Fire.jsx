import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import fireVideo from './assets/output.mp4'

gsap.registerPlugin(ScrollTrigger)

const Fire = ({ isUnlocked }) => {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useLayoutEffect(() => {
    if (!isUnlocked) {
      return undefined
    }

    const video = videoRef.current
    const section = sectionRef.current

    if (!video || !section) {
      return undefined
    }

    const context = gsap.context(() => {
      const startPlayback = () => {
        if (video.readyState < 2) {
          video.addEventListener('loadedmetadata', startPlayback, { once: true })
          return
        }

        gsap.set(video, { autoAlpha: 1 })
        video.currentTime = 0
        video.loop = true
        video.play().catch(() => {})
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        end: 'bottom top',
        onEnter: startPlayback,
        onLeaveBack: () => {
          video.pause()
          video.currentTime = 0
        },
      })
    }, sectionRef)

    return () => context.revert()
  }, [isUnlocked])

  return (
    <section
      ref={sectionRef}
      className={`fire-section${isUnlocked ? '' : ' fire-section-locked'}`}
      aria-label="Fire sequence"
    >
      <video ref={videoRef} className="fireVideo" playsInline preload="auto">
        <source src={fireVideo} type="video/mp4" />
      </video>
    </section>
  )
}

export default Fire
