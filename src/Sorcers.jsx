import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import aoiImage from './assets/aoi.png'
import getoImage from './assets/geto.png'
import gojoImage from './assets/gojo.png'
import hakariImage from './assets/hakari.png'
import megumiImage from './assets/megumi.png'
import sukunaImage from './assets/sakuna.png'
import tojiImage from './assets/toji.png'
import yutaImage from './assets/yuta.png'
import yujiImage from './assets/yuji.png'
import sukuna from './data/sukuna.json'
import gojo from './data/gojo.json'
import itadori from './data/itadori.json'
import aoiTodo from './data/aoi-todo.json'
import yuta from './data/yuta.json'
import geto from './data/geto.json'
import toji from './data/toji.json'
import hakari from './data/hakari.json'
import megumi from './data/megumi.json'

const characters = [
  { ...gojo, image: gojoImage, accent: 'gojo' },
  { ...sukuna, image: sukunaImage, accent: 'sukuna' },
  { ...itadori, image: yujiImage, accent: 'itadori' },
  { ...aoiTodo, image: aoiImage, accent: 'todo' },
  { ...yuta, image: yutaImage, accent: 'yuta' },
  { ...geto, image: getoImage, accent: 'geto' },
  { ...toji, image: tojiImage, accent: 'toji' },
  { ...hakari, image: hakariImage, accent: 'hakari' },
  { ...megumi, image: megumiImage, accent: 'megumi' },
]

const CharacterCard = ({ character, onOpen }) => (
  <button className={`battle-card battle-card-${character.accent}`} type="button" onClick={() => onOpen(character)}>
    {character.image ? (
      <img src={character.image} alt={character.name} />
    ) : (
      <div className="battle-card-monogram" aria-hidden="true">
        {character.name.charAt(0)}
      </div>
    )}
    <div className="battle-card-content">
      <p className="battle-card-label">{character.knownAs[0]}</p>
      <h2>{character.name}</h2>
      <p className="battle-card-aliases">Also known as: {character.knownAs.join(' / ')}</p>
      <span className="battle-card-cta">Press to open full profile</span>
    </div>
  </button>
)

const CharacterDetails = ({ character, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.classList.add('modal-open')
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('modal-open')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="character-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={`character-dialog battle-card-${character.accent}`} role="dialog" aria-modal="true" aria-labelledby="character-dialog-title">
        <button className="character-dialog-close" type="button" onClick={onClose} aria-label="Close character profile">×</button>
        <p className="battle-card-label">{character.knownAs[0]}</p>
        <h2 id="character-dialog-title">{character.name}</h2>
        <p className="battle-card-aliases">Also known as: {character.knownAs.join(' / ')}</p>
        <div className="character-dialog-grid">
          <div>
            <h3>Abilities</h3>
            <ul className="character-detail-list">
              {character.abilities.map((ability) => (
                <li key={ability.name}>
                  <strong>{ability.name}</strong>
                  <span>{ability.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Domain</h3>
            {character.domain ? (
              <div className="battle-domain">
                <strong>{character.domain.name}</strong>
                {character.domain.japaneseName && <span>{character.domain.japaneseName}</span>}
                <ul>
                  {character.domain.abilities.map((ability) => <li key={ability}>{ability}</li>)}
                </ul>
              </div>
            ) : (
              <p className="battle-no-domain">No domain expansion listed.</p>
            )}
          </div>
        </div>
        <a className="character-source" href={character.source} target="_blank" rel="noreferrer">View source page</a>
      </section>
    </div>
  )
}

const Sorcers = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  useEffect(() => {
    if (isPaused || selectedCharacter) return undefined

    const carouselTimer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % characters.length)
    }, 5000)

    return () => window.clearInterval(carouselTimer)
  }, [isPaused, selectedCharacter])

  const moveCarousel = (direction) => {
    setActiveIndex((currentIndex) => (currentIndex + direction + characters.length) % characters.length)
  }

  const activeCharacter = characters[activeIndex]

  return (
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
      <p className="battle-intro">Nine names. Their techniques, domains, and the details that make each one dangerous.</p>
      <div className="battle-carousel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocus={() => setIsPaused(true)} onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setIsPaused(false)}>
        <button className="carousel-control carousel-control-previous" type="button" onClick={() => moveCarousel(-1)} aria-label="Show previous character">←</button>
        <CharacterCard key={activeCharacter.name} character={activeCharacter} onOpen={setSelectedCharacter} />
        <button className="carousel-control carousel-control-next" type="button" onClick={() => moveCarousel(1)} aria-label="Show next character">→</button>
        <div className="carousel-status" aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, '0')} / {String(characters.length).padStart(2, '0')}</span>
          <span>{isPaused ? 'Paused' : 'Auto-playing'}</span>
        </div>
      </div>
    </section>
      {selectedCharacter && <CharacterDetails character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />}
    </main>
  )
}

export default Sorcers
