import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Countdown from './Countdown'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10"
    >
      <div className="max-w-3xl mx-auto">
        <Countdown />
        <motion.h2
          className="text-5xl md:text-7xl font-creepster text-horror-red mb-12 text-center flicker"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          О ВЕЧЕРИНКЕ
        </motion.h2>

        <motion.div
          className="space-y-8 text-lg md:text-xl font-eb-garamond"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="leading-relaxed">
            Настя отмечает свой 30-й день рождения в доме, где год назад нашли тело. 
            Теперь она снова собирает всех... чтобы закончить начатое.
          </p>

          <div className="border-l-4 border-horror-red pl-6 space-y-4">
            <div>
              <span className="text-horror-red font-semibold">Дата: </span>
              <span>20 декабря</span>
            </div>
            <div>
              <span className="text-horror-red font-semibold">Время: </span>
              <span>18:30 — двери закроются в 19:00</span>
            </div>
            <div>
              <span className="text-horror-red font-semibold">Адрес: </span>
              <span>Московская область, г.о. Щёлково, д. Медвежьи Озёра, 50В</span>
            </div>
          </div>

          <motion.a
            href="https://yandex.ru/maps/-/CLftrD9h"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-horror-dark-red text-horror-white font-eb-garamond text-lg rounded hover:bg-horror-red transition-colors duration-300 border border-horror-red"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Открыть в Яндекс.Картах
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default About

