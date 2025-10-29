import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const DressCode = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 px-4 relative z-10"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-5xl md:text-7xl font-eb-garamond md:font-creepster text-horror-red mb-12 flicker"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          HORROR ICONS
        </motion.h2>

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/icons.png"
            alt="Horror Icons"
            className="w-full max-w-xl mx-auto rounded-lg shadow-[0_0_30px_rgba(178,34,34,0.3)]"
          />
        </motion.div>

        <motion.div
          className="space-y-12 text-lg md:text-xl font-eb-garamond"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="leading-relaxed px-4 md:px-8">
            <p className="mb-4">
              Фредди. Самара. Чаки. Пеннивайз.
            </p>
            <p className="mb-4">
              Ведьмы. Вампиры. Призраки.
            </p>
            <p>
              Любой персонаж, от которого стало бы не по себе.
            </p>
          </div>

          <div className="text-horror-red uppercase text-xl md:text-2xl font-semibold leading-relaxed mt-8 px-4 md:px-8">
            <p className="mb-2">
              БУДЬТЕ ПУГАЮЩЕ ЭФФЕКТНЫ.
            </p>
            <p className="mb-2">
              СМЕРТЕЛЬНО ПРИВЛЕКАТЕЛЬНЫ.
            </p>
            <p>
              И НЕМНОГО БЕЗУМНЫ.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DressCode

