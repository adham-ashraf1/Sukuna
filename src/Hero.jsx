import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import heroImage from './assets/1.jpg'

const Hero = () => {
  const heroRef = useRef(null)

  useLayoutEffect(() => {
    const fadeIn = gsap.fromTo(
      heroRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.2, ease: 'power2.out' },
    )

    return () => fadeIn.kill()
  }, [])

  return (
    <div ref={heroRef} className="hero">
        <img className="hero-image" src={heroImage} alt="Hero" />
    </div>
  )
}

export default Hero
