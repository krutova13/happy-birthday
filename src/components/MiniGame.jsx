import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MiniGame = ({ onComplete, onClose }) => {
  const [gameState, setGameState] = useState('start') // start, playing, win, lose
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [targets, setTargets] = useState([])
  const [passwordRevealed, setPasswordRevealed] = useState(false)
  const gameSoundRef = useRef(null)
  const TARGET_COUNT = 30

  // Game sound and background music control
  useEffect(() => {
    const audio = gameSoundRef.current
    const backgroundMusic = window.backgroundMusicAudio || document.getElementById('background-music')
    
    if (!audio) return

    if (gameState === 'playing') {
      // Pause background music
      if (backgroundMusic) {
        backgroundMusic.pause()
      }
      
      // Play game sound
      audio.volume = 0.5
      audio.loop = true
      audio.play().catch(() => {
        // Ignore autoplay restrictions
      })
    } else {
      // Stop game sound
      audio.pause()
      audio.currentTime = 0
    }

    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [gameState])

  // Handle background music when game closes
  useEffect(() => {
    const backgroundMusic = window.backgroundMusicAudio || document.getElementById('background-music')
    
    // Resume background music when component unmounts (game closed)
    return () => {
      if (backgroundMusic) {
        backgroundMusic.play().catch(() => {
          // Ignore errors
        })
      }
    }
  }, [])

  // Block scroll when mini-game is open
  useEffect(() => {
    // Store current scroll position
    const scrollY = window.scrollY
    
    // Block scroll
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.top = `-${scrollY}px`
    
    // Prevent scroll with wheel (desktop)
    const preventScroll = (e) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
    
    // Prevent scroll with touch (mobile)
    let touchStartY = 0
    const preventTouchMove = (e) => {
      const touchY = e.touches[0].clientY
      const touchDiff = Math.abs(touchY - touchStartY)
      if (touchDiff > 10) {
        e.preventDefault()
      }
    }
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', preventTouchMove, { passive: false })
    
    return () => {
      // Restore scroll when component unmounts
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', preventTouchMove)
      
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      
      // Restore scroll position
      window.scrollTo(0, scrollY)
    }
  }, [])


  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('lose')
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameState, timeLeft])

  const handleTargetClick = (targetId) => {
    // Remove clicked target
    setTargets(prev => prev.filter(t => t.id !== targetId))
    
    setScore(prev => {
      const newScore = prev + 1
      
      // Check for win
      if (newScore >= TARGET_COUNT) {
        setGameState('win')
        return newScore
      }

      // Spawn new target only if game is still playing and not won yet
      // Use longer delay to ensure smooth animation of disappearing target
      setTimeout(() => {
        setTargets(currentTargets => {
          // Only spawn if no targets exist and game should continue
          if (currentTargets.length === 0) {
            const newTarget = {
              id: Date.now(),
              x: Math.random() * 80 + 10, // 10-90%
              y: Math.random() * 60 + 20, // 20-80%
              clicked: false
            }
            return [newTarget]
          }
          return currentTargets
        })
      }, 400) // Longer delay to let animation complete
      
      return newScore
    })
  }

  const spawnNewTarget = () => {
    const newTarget = {
      id: Date.now(),
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 60 + 20, // 20-80%
      clicked: false
    }
    setTargets([newTarget])
  }

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setTimeLeft(30)
    setTargets([])
    setPasswordRevealed(false) // Reset password visibility
    // Spawn first target immediately
    setTimeout(() => {
      spawnNewTarget()
    }, 100)
  }

  const handleComplete = () => {
    if (onComplete) {
      onComplete()
    }
  }

  return (
    <AnimatePresence>
      {/* Game sound */}
      <audio ref={gameSoundRef} preload="auto">
        <source src="/game-sound.mp3" type="audio/mpeg" />
      </audio>

      <div className="fixed inset-0 bg-black/90 z-[10000] flex items-center justify-center px-4">
        <motion.div
          className="bg-horror-black border-4 border-horror-red rounded-lg p-8 max-w-2xl w-full relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-horror-red text-2xl hover:text-horror-dark-red transition-colors"
          >
            ✕
          </button>

          {gameState === 'start' && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="font-eb-garamond md:font-creepster text-4xl md:text-6xl text-horror-red mb-6 flicker">
                ПРОВЕРКА СМЕЛОСТИ
              </h2>
              <p className="font-eb-garamond text-lg md:text-xl mb-4">
                Твоя задача — уничтожить 30 теней, пока они не захватили тебя.
              </p>
              <p className="font-eb-garamond text-base md:text-lg text-horror-dark-red mb-8">
                У тебя есть 30 секунд. Уничтожай появляющиеся тени быстро!
              </p>
              <motion.button
                onClick={startGame}
                className="px-8 py-4 bg-horror-dark-red text-horror-white font-eb-garamond md:font-creepster text-xl md:text-2xl rounded border-2 border-horror-red hover:bg-horror-red transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                НАЧАТЬ ИГРУ
              </motion.button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <div className="relative min-h-[400px]">
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center mb-4 pb-4 border-b-2 border-horror-red">
                <div>
                  <span className="font-eb-garamond md:font-creepster text-2xl text-horror-red">Уничтожено: </span>
                  <span className="font-eb-garamond md:font-creepster text-3xl text-horror-red">{score}/{TARGET_COUNT}</span>
                </div>
                <div>
                  <span className="font-eb-garamond md:font-creepster text-2xl text-horror-red">Время: </span>
                  <span className={`font-eb-garamond md:font-creepster text-3xl ${timeLeft <= 3 ? 'text-horror-dark-red animate-pulse' : 'text-horror-red'}`}>
                    {timeLeft}
                  </span>
                </div>
              </div>

              {/* Game area */}
              <div className="relative w-full h-[400px] mt-8 border-2 border-horror-dark-red rounded bg-horror-black/50">
                {targets.map((target) => (
                  !target.clicked && (
                    <motion.button
                      key={target.id}
                      className="absolute w-16 h-16 bg-horror-red rounded-full border-2 border-horror-dark-red hover:bg-horror-dark-red cursor-pointer shadow-[0_0_20px_rgba(178,34,34,0.8)]"
                      style={{
                        left: `${target.x}%`,
                        top: `${target.y}%`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      onClick={() => handleTargetClick(target.id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-2xl">👹</span>
                    </motion.button>
                  )
                ))}
              </div>
            </div>
          )}

          {gameState === 'win' && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 className="font-eb-garamond md:font-creepster text-4xl md:text-6xl text-horror-red mb-6 flicker">
                ПОБЕДА!
              </h2>
              <p className="font-eb-garamond text-2xl md:text-3xl text-horror-red font-semibold mb-6">
                Добро пожаловать в дом.
              </p>
              
              {/* Password section */}
              <div className="mb-8">
                <p className="font-eb-garamond text-lg md:text-xl text-horror-dark-red mb-3">
                  Пароль для входа:
                </p>
                <motion.div
                  onClick={() => setPasswordRevealed(!passwordRevealed)}
                  className="inline-block cursor-pointer px-6 py-3 bg-horror-black border-2 border-horror-red rounded transition-all duration-300 hover:border-horror-dark-red"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    filter: passwordRevealed ? 'blur(0px)' : 'blur(8px)',
                    userSelect: 'none'
                  }}
                >
                  <span className="font-eb-garamond md:font-creepster text-2xl md:text-3xl text-horror-red font-bold">
                    янеубийца
                  </span>
                </motion.div>
                <p className="font-eb-garamond text-sm text-horror-dark-red mt-2 italic">
                  Нажми, чтобы увидеть
                </p>
              </div>

              <motion.button
                onClick={onClose}
                className="px-8 py-4 bg-horror-dark-red text-horror-white font-eb-garamond md:font-creepster text-xl md:text-2xl rounded border-2 border-horror-red hover:bg-horror-red transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ЗАКРЫТЬ
              </motion.button>
            </motion.div>
          )}

          {gameState === 'lose' && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h2 className="font-eb-garamond md:font-creepster text-4xl md:text-6xl text-horror-red mb-6 flicker">
                ПРОВАЛ...
              </h2>
              <p className="font-eb-garamond text-lg md:text-xl mb-4">
                Ты не справился. Тени захватили тебя.
              </p>
              <p className="font-eb-garamond text-base text-horror-dark-red mb-8">
                Уничтожено: {score}/{TARGET_COUNT}
              </p>
              <div className="flex gap-4 justify-center">
                <motion.button
                  onClick={startGame}
                  className="px-6 py-3 bg-horror-dark-red text-horror-white font-eb-garamond md:font-creepster text-lg rounded border-2 border-horror-red hover:bg-horror-red transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ПОПРОБОВАТЬ СНОВА
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className="px-6 py-3 bg-transparent text-horror-dark-red font-eb-garamond md:font-creepster text-lg rounded border-2 border-horror-dark-red hover:border-horror-red transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ВЫЙТИ
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default MiniGame

