import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import revealImage from './assets/2.jpg'
import downImage from './assets/down.jpg'
import upImage from './assets/up.jpg'

const Hero = () => {
  const heroRef = useRef(null)
  const audioRef = useRef(null)
  const arrowRef = useRef(null)
  const upPanelRef = useRef(null)
  const downPanelRef = useRef(null)
  const hasEnteredRef = useRef(false)
  const animationRef = useRef(null)

  useLayoutEffect(() => {
    const fadeIn = gsap.fromTo(
      heroRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.2, ease: 'power2.out' },
    )

    return () => {
      fadeIn.kill()
      animationRef.current?.kill()
    }
  }, [])

  const handleEnter = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }

    if (hasEnteredRef.current) return
    hasEnteredRef.current = true

    animationRef.current = gsap
      .timeline()
      .to('.hero-enter', {
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.out',
      })
      .to(arrowRef.current, {
        autoAlpha: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
      .to(arrowRef.current, {
        x: () => Math.max(0, window.innerWidth - 96),
        duration: 1.3,
        ease: 'power3.inOut',
      })
      .to(arrowRef.current, {
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.out',
      })
      .to(
        upPanelRef.current,
        {
          yPercent: -100,
          duration: 1.3,
          ease: 'power3.inOut',
        },
        '<',
      )
      .to(
        downPanelRef.current,
        {
          yPercent: 100,
          duration: 1.3,
          ease: 'power3.inOut',
        },
        '<',
      )
  }

  return (
    <div ref={heroRef} className="hero">
      <audio ref={audioRef} src="/Untitled.mp3" preload="auto" />
      <button className="hero-enter" type="button" onClick={handleEnter}>
        ENTER
      </button>
      <span ref={arrowRef} className="hero-slash" aria-hidden="true" />
      <img className="hero-reveal-image" src={revealImage} alt="Final manga panel" />
      <div className="hero-split">
        <div ref={upPanelRef} className="hero-panel hero-panel-up">
          <img className="hero-image" src={upImage} alt="Sukuna manga panel" />
        </div>
        <div ref={downPanelRef} className="hero-panel hero-panel-down">
          <img className="hero-image" src={downImage} alt="Gojo manga panel" />
        </div>
      </div>
    </div>
  )
}

export default Hero
