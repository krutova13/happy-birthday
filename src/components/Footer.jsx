import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Footer = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <footer
      ref={ref}
      className="py-16 px-4 border-t border-horror-dark-red/30"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          className="text-xl md:text-2xl font-eb-garamond mb-8 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          Каждый год они возвращаются. В этот — ты среди них.
        </motion.p>

        <motion.p
          className="text-sm md:text-base text-horror-dark-red font-eb-garamond"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          © 2025 The Last Night | #nastyas30 #horrorparty #thelastnight
        </motion.p>
      </div>
    </footer>
  )
}

export default Footer

