import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import revealDownImage from './assets/windown.png'
import revealUpImage from './assets/winup.png'
import downImage from './assets/down.jpg'
import finalImage from './assets/2.jpg'
import upImage from './assets/up.jpg'



gsap.registerPlugin(ScrollTrigger)

const Hero = ({ onReality }) => {
  const scrollRef = useRef(null)
  const heroRef = useRef(null)
  const upPanelRef = useRef(null)
  const downPanelRef = useRef(null)
  const revealUpRef = useRef(null)
  const revealDownRef = useRef(null)
  const finalImageRef = useRef(null)
  const audioRef = useRef(null)
  const buttonRef = useRef(null)
  const [isRealityPressed, setIsRealityPressed] = useState(false)

  const splitReveal = () => {
    if (isRealityPressed) {
      return
    }

    onReality()

    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    }

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        ease: 'power2.out',
        onComplete: () => {
          setIsRealityPressed(true)
        },
      })
    } else {
      setIsRealityPressed(true)
    }

    gsap.to(revealUpRef.current, {
      duration: 1.1,
      ease: 'power3.inOut',
      yPercent: -100,
    })
    gsap.to(revealDownRef.current, {
      duration: 1.1,
      ease: 'power3.inOut',
      yPercent: 100,
    })
    gsap.to(finalImageRef.current, {
      autoAlpha: 1,
      delay: 0.4,
      duration: 0.6,
    })
  }
  
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
        <div className="hero-reveal-images" aria-label="Winning manga panel" role="img">
          <img ref={revealUpRef} className="hero-reveal-image" src={revealUpImage} alt="" />
          <img ref={revealDownRef} className="hero-reveal-image" src={revealDownImage} alt="" />
        </div>
        <img ref={finalImageRef} className="hero-final-image" src={finalImage} alt="Final manga panel" />
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
        {!isRealityPressed && (
          <button ref={buttonRef} className="hero-win-reality" type="button" onClick={splitReveal}>
            REALITY
          </button>
        )}
        <audio ref={audioRef} src="/Untitled.mp3" preload="auto" />
      </div>
      <div className="hero-scroll-content">
        <p className="hero-scroll-text">
          Scroll down to see the battle unfold
        </p>
      </div>
    </div>
  )
}

export default Hero
