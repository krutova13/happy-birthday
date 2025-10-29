import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const Hero = ({ onEnter }) => {
  const audioRef = useRef(null)

  const handleEnterClick = () => {
    // Allow scroll
    if (onEnter) {
      onEnter()
    }

    // Play door sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0 // Reset to start
      audioRef.current.play().catch(() => {
        // Ignore autoplay restrictions
      })
    }

    // Scroll to about section after a short delay
    setTimeout(() => {
      const aboutSection = document.getElementById('about')
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  // Create smoke particles - fewer on mobile for performance
  useEffect(() => {
    const smokeContainer = document.getElementById('smoke-container')
    if (!smokeContainer) return

    const isMobile = window.innerWidth <= 768
    const particleCount = isMobile ? 10 : 20

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'smoke-particle'
      particle.style.left = `${Math.random() * 100}%`
      particle.style.bottom = `${Math.random() * 20}%`
      particle.style.animationDelay = `${Math.random() * 8}s`
      particle.style.setProperty('--smoke-x', `${(Math.random() - 0.5) * 100}px`)
      smokeContainer.appendChild(particle)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
      {/* Smoke Effect */}
      <div id="smoke-container" className="smoke" />

      {/* Candles Effect */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around pb-20 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="candle-flame" />
        ))}
      </div>

      {/* Audio for door sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/door-sound.wav" type="audio/wav" />
      </audio>

      <motion.div
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          className="text-7xl md:text-9xl font-eb-garamond md:font-creepster text-horror-red mb-4 flicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          THE LAST NIGHT
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-horror-dark-red mb-8 font-eb-garamond italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          A Horror Birthday Experience by Nastya
        </motion.p>

        <motion.p
          className="text-lg md:text-xl mb-12 font-eb-garamond px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Прошёл ровно год с той ночи. Сегодня — мы возвращаемся.
        </motion.p>

        <motion.button
          onClick={handleEnterClick}
          className="px-8 py-4 bg-horror-dark-red text-horror-white font-eb-garamond md:font-creepster text-xl md:text-2xl rounded border-2 border-horror-red hover:bg-horror-red transition-colors duration-300 cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Войти в дом
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero

