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

const EMOJIS = ['❤️', '😘', '🫂', '💋', '🥰', '💕', '💖', '😍', '🫀', '💝']

function EmojiExplosion({ onDone }) {
  const [particles] = useState(() =>
    Array.from({ length: 500 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 1.5}s`,
      duration: `${2 + Math.random() * 3}s`,
      size: `${1.2 + Math.random() * 2}rem`,
      type: Math.random() < 0.33 ? 'fall' : Math.random() < 0.5 ? 'rise' : 'pop',
      startY: `${20 + Math.random() * 60}vh`,
      drift: `${(Math.random() - 0.5) * 200}px`,
    }))
  )

  useEffect(() => {
    const t = setTimeout(onDone, 5000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="emoji-explosion">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`emoji-particle emoji-${p.type}`}
          style={{
            left: p.left,
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            '--drift': p.drift,
            '--startY': p.startY,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

function LetterPage({ onBack }) {
  const [exploding, setExploding] = useState(false)

  return (
    <div className="letter-page">
      <HeartsBackground />
      {exploding && <EmojiExplosion onDone={() => setExploding(false)} />}
      <div className="letter-card">
        <div className="letter-icon">🫂🫂🫂❤️❤️❤️</div>
        <h2>Appu A Letter For You</h2>
        <div className="letter-divider" />
        <div className="letter-body">
          <p>
           Happy Anniversary enna mokeda muddu kinni bodedig🫂🫂🫂❤️❤️❤️😘😘😘😘🫀🫀🫀..
          </p>
          <p>
           E day dani enna lifegonji bangar tiknd🫂🫂🫂, eer enna kinni jojja enna lifeg bathina dina😘😘😘
           Nama masth fights, misunderstanding etc etc sumar face malda , But in every situation, we never gave up on each other.
           After every fight, we understood each other more deeply, and our love grew stronger and stronger.
           This shows how much we truly love, care for, and respect each other.... 
          </p>
          <p>
           Iam waiting for the day, Morning lakkd kann bulanaga aa munku tojodu pand😁😁😁
           Lakkle yavu upadra malthinind eer panodu 😁😁😁
          </p>
          <p>
           I love you cho much much much much much much much much much much much much much much much much
           much much much much much much much much much much much much much much much much Kinni muddu apuchi bangaru jojja bodedi
           🫂🫂🫂❤️❤️❤️😘😘😘😘🫀🫀🫀🫂🫂🫂❤️❤️❤️😘😘😘😘🫀🫀🫀
          </p>
        </div>
        <div className="letter-sign">— Yours, always ♥</div>
        <button className="btn-clickme" onClick={() => setExploding(true)}>
          💌 Click Me appu dethonle 😁😁😁💌
        </button>
        <button className="btn-back" onClick={onBack}>
          ← Back
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
        <h2>♥ Namma Kinya story ♥</h2>
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
