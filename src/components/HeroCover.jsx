import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function HeroCover({ onExploreClick }) {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden" aria-label="Hero Cover">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Mood-based Urdu Shayari, in Roman Script
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90">
            Feel seen. Pick how you feel and let timeless couplets find you — interactive, immersive, and accessible to everyone.
          </p>
          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              onClick={onExploreClick}
              className="rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-gray-900 shadow-lg backdrop-blur supports-[backdrop-filter]:backdrop-blur-md hover:bg-white"
            >
              Start with your mood
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
