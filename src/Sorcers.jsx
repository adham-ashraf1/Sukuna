import { Link } from 'react-router-dom'
import gojoImage from './assets/1.jpg'
import sukunaImage from './assets/win.jpg'

const Sorcers = () => (
  <main className="sorcerers-page">
    <nav className="battle-nav" aria-label="Sorcerers navigation">
      <Link className="battle-nav-brand" to="/">JJK</Link>
      <div className="battle-nav-links">
        <Link to="/sorcerers">Sorcerers</Link>
        <span>Story</span>
        <span>Final Battle</span>
      </div>
    </nav>
    <section className="sorcerers-section" aria-label="Sorcerers">
      <p className="battle-eyebrow">The contenders</p>
      <h1 className="battle-title">Sorcerers</h1>
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
    </section>
  </main>
)

export default Sorcers
