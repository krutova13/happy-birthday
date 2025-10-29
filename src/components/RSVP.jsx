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
  const screamSoundRef = useRef(null)

  // Replace with your actual Telegram group link
  const telegramLink = 'https://t.me/your_telegram_group'

  // Preload scream sound
  useEffect(() => {
    screamSoundRef.current = new Audio('/scream-sound.wav')
    screamSoundRef.current.volume = 0.7
    screamSoundRef.current.preload = 'auto'
    // Try to load the audio
    screamSoundRef.current.load()
    
    return () => {
      if (screamSoundRef.current) {
        screamSoundRef.current.pause()
        screamSoundRef.current.src = ''
      }
    }
  }, [])

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
    // Play preloaded scream sound immediately
    if (screamSoundRef.current) {
      screamSoundRef.current.currentTime = 0 // Reset to start
      screamSoundRef.current.play().catch(() => {
        // Ignore autoplay restrictions
      })
    }
  }

  return (
    <>
      <section
        ref={ref}
        className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-5xl md:text-7xl font-eb-garamond md:font-creepster text-horror-red mb-16 flicker"
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
              className="px-8 py-4 bg-horror-dark-red text-horror-white font-eb-garamond md:font-creepster text-xl md:text-2xl rounded border-2 border-horror-red hover:bg-horror-red transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✅ Да, я готов к кошмару
            </motion.button>

            <motion.button
              onClick={handleNoClick}
              className="px-8 py-4 bg-transparent text-horror-dark-red font-eb-garamond md:font-creepster text-xl md:text-2xl rounded border-2 border-horror-dark-red hover:border-horror-red transition-colors duration-300"
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
                className="font-eb-garamond md:font-creepster text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-horror-red text-center not-italic font-bold"
                animate={{
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  textShadow: '0 0 10px #b22222, 0 0 20px #b22222, 0 0 30px #8b0000',
                  fontStyle: 'normal',
                  fontWeight: 'bold'
                }}
              >
                <motion.span 
                  className="screamer-text-glow inline-block not-italic font-bold"
                  style={{
                    fontStyle: 'normal',
                    fontWeight: 'bold'
                  }}
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
              <img
                src="/screamer.png"
                alt="Screamer"
                className="w-full h-full object-contain"
                style={{ 
                  filter: 'brightness(0.8) contrast(2) saturate(1.3) drop-shadow(0 0 40px #8b0000)'
                }}
              />
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

