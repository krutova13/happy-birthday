import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const games = [
  {
    title: '🔪 Кто убийца',
    shortDescription: 'Один из вас — убийца. Раскрой его.',
    fullDescription: 'Один вечер. Один дом. Один из вас — убийца.\n\nКаждый гость получает роль и тайную цель.\nОдин из вас — преступник, скрывающийся под маской.\n\nВ течение вечера появляются улики, разговоры становятся всё напряжённее, а подозрения растут.\nВ финале — голосование и разоблачение.\n\nВыживут не все.'
  },
  {
    title: '🩸 Чёртова рулетка',
    shortDescription: 'Один из бокалов отравлен. Угадай, кто страдает.',
    fullDescription: 'Один из бокалов — отравлен. Угадай, кто страдает.\n\nИгроки делятся на две команды.\nНа столе — одинаковые рюмки, только в одной скрыто нечто ужасное.\n\nПосле "дегустации" вторая команда должна вычислить, кто делает вид, что всё в порядке.\n\nЗа верные догадки — жетоны спасения.\nЗа ошибки — ещё один шаг к безумию.'
  },
  {
    title: '👁 Шпионы ада',
    shortDescription: 'Среди вас есть те, кто ничего не знает. Они пришли из тьмы…',
    fullDescription: 'Среди вас есть те, кто ничего не знает.\nОни пришли из тьмы… и пытаются казаться своими.\n\nВсе получают карточки с одним и тем же словом — кроме двух.\nНа их карточках написано: "Ты — шпион."\n\nШпионы не знают слово и должны догадаться, что это — по вопросам и ответам других.\nОстальные стараются не выдать слово, вычисляя чужаков.\n\nЛогика, блеф и немного паранойи — выживут только внимательные.'
  },
  {
    title: '🕯 Шапито демонов',
    shortDescription: 'Когда маски спадут — кто останется человеком?',
    fullDescription: 'В полночь их лица перестали принадлежать им.\nОдин из них — одержим. Остальные — просто сошли с ума.\n\nКаждый получает карточку с "заклятием" — странной чертой поведения:\nговорить с голосами, повторять чужие жесты, шептать молитвы, смотреть в одну точку.\n\nОдин из игроков — настоящий демон.\n\nПосле нескольких минут безумия начинается голосование: кто одержим на самом деле?\n\nАтмосфера ритуала, актёрство, смех и тревога в одном действии.'
  }
]

const Games = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedGame, setSelectedGame] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.h2
          className="text-5xl md:text-7xl font-creepster text-horror-red mb-12 flicker"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          NIGHT GAMES
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedGame(game)}
              className="border-2 border-horror-dark-red p-6 bg-horror-black hover:bg-horror-dark-red/20 transition-all duration-300 cursor-pointer blood-drop-hover relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                borderColor: '#b22222',
                boxShadow: '0 0 30px rgba(178, 34, 34, 0.7), 0 0 50px rgba(139, 0, 0, 0.3)'
              }}
            >
              <h3 className="font-eb-garamond md:font-creepster text-2xl md:text-3xl text-horror-red mb-4">
                {game.title}
              </h3>
              <p className="font-eb-garamond text-base md:text-lg leading-relaxed">
                {game.shortDescription}
              </p>
              <p className="font-eb-garamond text-sm text-horror-dark-red mt-3 italic">
                Нажми, чтобы узнать больше →
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Game Details Modal - rendered via portal to body */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedGame && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGame(null)}
              style={{ zIndex: 9998 }}
            >
              <motion.div
                className="bg-horror-black border-4 border-horror-red rounded-lg p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedGame(null)}
                  className="absolute top-4 right-4 text-horror-red text-2xl hover:text-horror-dark-red transition-colors z-10"
                >
                  ✕
                </button>

                <h3 className="font-eb-garamond md:font-creepster text-3xl md:text-4xl text-horror-red mb-6 flicker">
                  {selectedGame.title}
                </h3>
                <div className="font-eb-garamond text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {selectedGame.fullDescription}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}

export default Games

