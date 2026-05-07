import { useState, useEffect } from 'react'
import './App.css'

const slides = [
  {
    img: '/pic1.jpg',
    caption: 'We met each other in November. Two strangers who never knew they would one day become each other’s whole world.',
  },
  {
    img: '/pic2.jpg',
    caption: 'As the days passed, we became best friends to each other. We started supporting and caring for each other.',
  },
  {
    img: '/pic3.jpg',
    caption: 'On may 9, the boy proposed to the most precious, rare, diamond-like woman.',
  },
  {
    img: '/pic4.jpg',
    caption: 'We started loving each other deeply and truly. We stood by each other through every storm, holding each other’s hands in every situation.',
  },
  {
    img: '/pic6.jpg',
    caption: 'We started facing many storms and had many fights, but after every fight, our love grew stronger and deeper. We learned lessons from every misunderstanding, and after every fight, we hugged each other and held our hands even tighter.',
  },
  {
    img: '/pic5.jpg',
    caption: 'We are not just a couple, we are best friends — one soul living in two bodies. No matter what life brings, we stand together, understand each other, heal each other, and love each other endlessly.',
  },
]

const heartPositions = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 8}s`,
  duration: `${8 + Math.random() * 8}s`,
  size: `${0.8 + Math.random() * 1.2}rem`,
}))

function HeartsBackground() {
  return (
    <div className="hearts-bg">
      {heartPositions.map((h) => (
        <span
          key={h.id}
          className="heart-particle"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  )
}

function LetterPage({ onBack }) {
  return (
    <div className="letter-page">
      <HeartsBackground />
      <div className="letter-card">
        <div className="letter-icon">💌</div>
        <h2>Appu A Letter For You</h2>
        <div className="letter-divider" />
        <div className="letter-body">
          <p>
            My love, from the very first moment I saw you, something inside me
            knew — you were the one I had been waiting for all along.
          </p>
          <p>
            Every laugh we share, every quiet moment, every glance across the
            room — they all remind me how lucky I am to have you in my life.
          </p>
          <p>
            You make the ordinary feel magical. You turn simple days into
            memories I will carry forever in my heart.
          </p>
          <p>
            I promise to love you on your best days and your hardest ones. To
            stand beside you, to hold your hand, and to never stop choosing you.
          </p>
          <p>
            You are my favorite person, my greatest adventure, and my deepest
            love. Always and forever.
          </p>
        </div>
        <div className="letter-sign">— Yours, always ♥</div>
        <button className="btn-back" onClick={onBack}>
          ← Back to our memories
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [current, setCurrent] = useState(0)
  const [showLetter, setShowLetter] = useState(false)
  const [fadeKey, setFadeKey] = useState(0)

  const goTo = (index) => {
    setCurrent(index)
    setFadeKey((k) => k + 1)
  }

  const handlePrev = () => {
    if (current > 0) goTo(current - 1)
  }

  const handleNext = () => {
    if (current < slides.length - 1) {
      goTo(current + 1)
    } else {
      setShowLetter(true)
    }
  }

  if (showLetter) {
    return <LetterPage onBack={() => setShowLetter(false)} />
  }

  return (
    <div className="app">
      <HeartsBackground />

      <div className="header">
        <h1>♥ Namma Kinya story ♥</h1>
        <p className="subtitle">moments that matter</p>
      </div>

      <div className="card">
        <div className="image-wrapper">
          <span className="counter">
            {current + 1} / {slides.length}
          </span>
          <img
            key={fadeKey}
            src={slides[current].img}
            alt={`Memory ${current + 1}`}
            className="fade-in"
          />
        </div>

        <div className="caption">
          <span className="quote-mark">"</span>
          <p key={fadeKey}>{slides[current].caption}</p>
        </div>

        <div className="dots">
          {slides.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <div className="buttons">
          <button
            className="btn btn-prev"
            onClick={handlePrev}
            disabled={current === 0}
          >
            ← Back
          </button>
          <button className="btn btn-next" onClick={handleNext}>
            {current === slides.length - 1 ? '💌 next->' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
