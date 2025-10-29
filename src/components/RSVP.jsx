import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import MiniGame from './MiniGame'

const RSVP = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [showScreamer, setShowScreamer] = useState(false)
  const [showMiniGame, setShowMiniGame] = useState(false)
  const screamerRef = useRef(null)

  // Replace with your actual Telegram group link
  const telegramLink = 'https://t.me/your_telegram_group'

  const handleGameComplete = () => {
    setShowMiniGame(false)
    window.open(telegramLink, '_blank')
  }

  useEffect(() => {
    if (showScreamer) {
      const timer = setTimeout(() => {
        setShowScreamer(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showScreamer])

  const handleNoClick = () => {
    setShowScreamer(true)
    // Scream sound
    const screamSound = new Audio('/scream-sound.wav')
    screamSound.volume = 0.7
    screamSound.play().catch(() => {
      // Ignore autoplay restrictions
    })
  }

  return (
    <>
      <section
        ref={ref}
        className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-5xl md:text-7xl font-creepster text-horror-red mb-16 flicker"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Ты войдёшь в дом?
          </motion.h2>

          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setShowMiniGame(true)}
              className="px-8 py-4 bg-horror-dark-red text-horror-white font-creepster text-xl md:text-2xl rounded border-2 border-horror-red hover:bg-horror-red transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✅ Да, я готов к кошмару
            </motion.button>

            <motion.button
              onClick={handleNoClick}
              className="px-8 py-4 bg-transparent text-horror-dark-red font-creepster text-xl md:text-2xl rounded border-2 border-horror-dark-red hover:border-horror-red transition-colors duration-300"
              whileHover={{ 
                scale: 1.05,
                x: [0, -2, 2, -2, 2, 0]
              }}
              whileTap={{ scale: 0.95 }}
            >
              💀 Нет, я не переживу эту ночь
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Screamer overlay */}
      <div
        ref={screamerRef}
        className={`screamer-overlay ${showScreamer ? 'active' : ''}`}
        onClick={() => setShowScreamer(false)}
      >
        {showScreamer && (
          <>
            {/* Wrong Answer Text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-[10000] pointer-events-none px-4"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1
              }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <motion.h2 
                className="font-creepster text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-horror-red text-center"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  textShadow: '0 0 10px #b22222, 0 0 20px #b22222, 0 0 30px #8b0000'
                }}
              >
                <motion.span 
                  className="screamer-text-glow inline-block"
                  animate={{
                    x: [0, -2, 2, -1, 1, 0]
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  НЕПРАВИЛЬНЫЙ ОТВЕТ!
                </motion.span>
              </motion.h2>
            </motion.div>
            <motion.div
              className="screamer-image"
              initial={{ scale: 0.3, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.3, opacity: 0, rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="screamer-glitch" />
            <svg
              width="900"
              height="900"
              viewBox="0 0 900 900"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid meet"
              style={{ 
                filter: 'brightness(0.8) contrast(2) saturate(1.3) drop-shadow(0 0 40px #8b0000)',
                width: '100%',
                height: '100%'
              }}
            >
              {/* Background dark circle with gradient */}
              <defs>
                <radialGradient id="faceGradient">
                  <stop offset="0%" stopColor="#000" />
                  <stop offset="100%" stopColor="#1a0000" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <circle cx="450" cy="450" r="400" fill="#000" />
              <circle cx="450" cy="450" r="380" fill="url(#faceGradient)" />
              
              {/* Distorted background effect */}
              <circle cx="450" cy="450" r="350" fill="#0a0000" opacity="0.5" />
              
              {/* Eyes - large, distorted and intense */}
              <ellipse cx="350" cy="380" rx="90" ry="120" fill="#fff" opacity="0.95" />
              <ellipse cx="550" cy="380" rx="90" ry="120" fill="#fff" opacity="0.95" />
              
              {/* Eye veins/redness */}
              <path
                d="M 300 380 Q 320 360 340 370 Q 360 380 350 390 Q 340 400 320 390"
                stroke="#8b0000"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M 500 380 Q 520 360 540 370 Q 560 380 550 390 Q 540 400 520 390"
                stroke="#8b0000"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
              
              {/* Pupils - dark and dilated */}
              <ellipse cx="350" cy="380" rx="55" ry="75" fill="#000" />
              <ellipse cx="550" cy="380" rx="55" ry="75" fill="#000" />
              
              {/* Creepy eye reflections */}
              <ellipse cx="325" cy="355" rx="20" ry="25" fill="#fff" opacity="0.9" />
              <ellipse cx="525" cy="355" rx="20" ry="25" fill="#fff" opacity="0.9" />
              <ellipse cx="330" cy="350" rx="8" ry="10" fill="#000" opacity="0.5" />
              <ellipse cx="530" cy="350" rx="8" ry="10" fill="#000" opacity="0.5" />
              
              {/* Blood tears - multiple streams */}
              <path
                d="M 290 420 L 320 520 L 340 500 L 330 520 L 350 520 L 360 490 Z"
                fill="#8b0000"
                opacity="0.9"
              />
              <path
                d="M 310 430 L 330 550 L 350 530 L 340 550 L 370 550 L 385 515 Z"
                fill="#b22222"
                opacity="0.7"
              />
              <path
                d="M 490 420 L 520 520 L 540 500 L 530 520 L 550 520 L 560 490 Z"
                fill="#8b0000"
                opacity="0.9"
              />
              <path
                d="M 510 430 L 530 550 L 550 530 L 540 550 L 570 550 L 585 515 Z"
                fill="#b22222"
                opacity="0.7"
              />
              
              {/* Mouth - wider, more terrifying */}
              <ellipse cx="450" cy="620" rx="140" ry="120" fill="#8b0000" />
              <ellipse cx="450" cy="620" rx="120" ry="100" fill="#b22222" />
              <ellipse cx="450" cy="620" rx="100" ry="80" fill="#6b0000" />
              <ellipse cx="450" cy="620" rx="85" ry="65" fill="#000" />
              
              {/* More teeth - jagged and crooked */}
              <rect x="380" y="595" width="18" height="35" fill="#fff" rx="1" transform="rotate(-5 389 612.5)" />
              <rect x="405" y="590" width="18" height="40" fill="#fff" rx="1" transform="rotate(2 414 610)" />
              <rect x="430" y="595" width="18" height="35" fill="#fff" rx="1" transform="rotate(-2 439 612.5)" />
              <rect x="455" y="590" width="18" height="40" fill="#fff" rx="1" transform="rotate(3 464 610)" />
              <rect x="480" y="595" width="18" height="35" fill="#fff" rx="1" transform="rotate(-4 489 612.5)" />
              <rect x="505" y="590" width="18" height="40" fill="#fff" rx="1" transform="rotate(2 514 610)" />
              
              {/* Tongue */}
              <ellipse cx="450" cy="650" rx="40" ry="25" fill="#8b0000" opacity="0.8" />
              
              {/* Deep cracks/scars - more numerous */}
              <path
                d="M 260 280 L 310 340 L 300 350 L 320 360"
                stroke="#8b0000"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M 640 280 L 590 340 L 600 350 L 580 360"
                stroke="#8b0000"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M 320 320 L 340 360 L 350 370"
                stroke="#b22222"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M 580 320 L 560 360 L 550 370"
                stroke="#b22222"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
              
              {/* Creepy shadows/hair/features */}
              <path
                d="M 150 200 L 270 310 L 290 295"
                stroke="#fff"
                strokeWidth="15"
                strokeLinecap="round"
                opacity="0.5"
              />
              <path
                d="M 750 200 L 630 310 L 610 295"
                stroke="#fff"
                strokeWidth="15"
                strokeLinecap="round"
                opacity="0.5"
              />
              
              {/* Additional horror details - distorted face lines */}
              <path
                d="M 280 450 Q 365 400 450 450 Q 535 400 620 450"
                stroke="#8b0000"
                strokeWidth="4"
                fill="none"
                opacity="0.4"
              />
              
              {/* Scars across cheeks */}
              <path
                d="M 320 470 L 380 490 L 375 495"
                stroke="#b22222"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M 520 470 L 580 490 L 575 495"
                stroke="#b22222"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
            </svg>
          </motion.div>
          </>
        )}
      </div>

      {/* Mini Game */}
      {showMiniGame && (
        <MiniGame 
          onComplete={handleGameComplete}
          onClose={() => setShowMiniGame(false)}
        />
      )}
    </>
  )
}

export default RSVP

