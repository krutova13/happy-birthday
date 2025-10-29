import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Countdown = () => {
  const targetDate = new Date('2025-12-20T18:30:00').getTime()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const timeUnits = [
    { label: 'Дней', value: timeLeft.days },
    { label: 'Часов', value: timeLeft.hours },
    { label: 'Минут', value: timeLeft.minutes },
    { label: 'Секунд', value: timeLeft.seconds }
  ]

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <motion.p
        className="text-xl md:text-2xl font-eb-garamond mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        До начала ночи осталось:
      </motion.p>
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <motion.div
              className="text-4xl md:text-6xl font-creepster text-horror-red flicker"
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </motion.div>
            <span className="text-sm md:text-base font-eb-garamond text-horror-dark-red mt-2">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Countdown

