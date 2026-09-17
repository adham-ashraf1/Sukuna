import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import fireVideo from './assets/output.mp4'
import gojoImage from './assets/1.jpg'
import sukunaImage from './assets/win.jpg'

gsap.registerPlugin(ScrollTrigger)

const Fire = ({ isUnlocked }) => {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const aftermathRef = useRef(null)

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
      let playbackAllowed = false

      const stopPlayback = () => {
        playbackAllowed = false
        video.pause()
      }

      const startPlayback = () => {
        if (aftermathRef.current?.getBoundingClientRect().top <= window.innerHeight / 2) {
          stopPlayback()
          return
        }

        playbackAllowed = true

        if (video.readyState < 2) {
          video.addEventListener('loadedmetadata', startPlayback, { once: true })
          return
        }

        if (!playbackAllowed) {
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
        onEnter: (trigger) => {
          if (trigger.direction === 1) {
            startPlayback()
          }
        },
        onEnterBack: stopPlayback,
        onUpdate: (trigger) => {
          if (trigger.progress >= 1) {
            stopPlayback()
          }
        },
        onLeave: stopPlayback,
        onLeaveBack: stopPlayback,
      })

      ScrollTrigger.create({
        trigger: aftermathRef.current,
        start: 'top 50%',
        onEnter: stopPlayback,
        onEnterBack: stopPlayback,
      })

      const aftermathItems = aftermathRef.current?.querySelectorAll(
        '.battle-nav, .battle-eyebrow, .battle-title, .battle-intro, .battle-cards',
      )

      gsap.fromTo(
        aftermathItems,
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: aftermathRef.current,
            start: 'top 78%',
            once: true,
          },
        },
      )
    }, sectionRef)

    return () => {
      context.revert()
    }
  }, [isUnlocked])

  return (
    <>
      <section
        ref={sectionRef}
        id="battle"
        className={`fire-section${isUnlocked ? '' : ' fire-section-locked'}`}
        aria-label="Fire sequence"
      >
        <video ref={videoRef} className="fireVideo" playsInline preload="auto">
          <source src={fireVideo} type="video/mp4" />
        </video>
      </section>
      <section
        id="aftermath"
        className={`battle-aftermath-shell${isUnlocked ? '' : ' battle-aftermath-locked'}`}
        aria-label="Battle aftermath"
      >
        <div ref={aftermathRef} className="battle-aftermath">
          <nav className="battle-nav" aria-label="Battle navigation">
            <Link className="battle-nav-brand" to="/">JJK</Link>
            <div className="battle-nav-links">
              <Link to="/sorcerers">Sorcerers</Link>
              <span>Story</span>
              <span>Final Battle</span>
            </div>
          </nav>
          <p className="battle-eyebrow">The aftermath</p>
          <h2 className="battle-title">Two legends. One ending.</h2>
          <p className="battle-intro">
            Infinity met the King of Curses in a battle where every move changed the shape of the world.
          </p>
          <div className="battle-cards">
            <article className="battle-card battle-card-gojo">
              <img src={gojoImage} alt="Satoru Gojo" />
              <div className="battle-card-content">
                <p className="battle-card-label">The strongest sorcerer</p>
                <h3>Satoru Gojo</h3>
                <p>Limitless technique. Six Eyes. An impossible defense pushed beyond its limit.</p>
              </div>
            </article>
            <article className="battle-card battle-card-sukuna">
              <img src={sukunaImage} alt="Ryomen Sukuna" />
              <div className="battle-card-content">
                <p className="battle-card-label">The King of Curses</p>
                <h3>Ryomen Sukuna</h3>
                <p>A ruthless domain and a perfect slash brought the age of monsters to its climax.</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}

export default Fire
