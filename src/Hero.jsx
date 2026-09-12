import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import revealImage from './assets/win.jpg'
import downImage from './assets/down.jpg'
import upImage from './assets/up.jpg'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const scrollRef = useRef(null)
  const heroRef = useRef(null)
  const upPanelRef = useRef(null)
  const downPanelRef = useRef(null)

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1.2, ease: 'power2.out' },
      )

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: scrollRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
        },
      })

      reveal
        .to('.hero-text', { autoAlpha: 0, ease: 'none' }, 0)
        .to(upPanelRef.current, { yPercent: -100, ease: 'none' }, 0)
        .to(downPanelRef.current, { yPercent: 100, ease: 'none' }, 0)
        .to({}, { duration: 1.5 })
        .to('.hero-win-reality', { autoAlpha: 1, duration: 0.4, ease: 'power2.out' })
    }, scrollRef)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <div ref={scrollRef} className="hero-scroll">
      <div ref={heroRef} className="hero">
        <img className="hero-reveal-image" src={revealImage} alt="Winning manga panel" />
        <h1 className="hero-text hero-title">Who would win</h1>
        <span className="hero-text hero-label hero-label-gojo">Gojo satoru</span>
        <span className="hero-text hero-label hero-label-sukuna">Ryomen Sukuna</span>
        <div className="hero-split">
          <div ref={upPanelRef} className="hero-panel hero-panel-up">
            <img className="hero-image" src={upImage} alt="Sukuna manga panel" />
          </div>
          <div ref={downPanelRef} className="hero-panel hero-panel-down">
            <img className="hero-image" src={downImage} alt="Gojo manga panel" />
          </div>
        </div>
        <button className="hero-win-reality" type="button">
          REALITY
        </button>
      </div>
    </div>
  )
}

export default Hero
