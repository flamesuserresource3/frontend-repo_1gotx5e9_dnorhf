import React from 'react'
import { motion } from 'framer-motion'
import { Smile, Frown, Heart, Clock } from 'lucide-react'

const MOODS = [
  { key: 'happy', label: 'Happy', icon: Smile, color: 'from-amber-400 to-orange-500' },
  { key: 'sad', label: 'Sad', icon: Frown, color: 'from-sky-400 to-indigo-500' },
  { key: 'romantic', label: 'Romantic', icon: Heart, color: 'from-rose-400 to-pink-600' },
  { key: 'nostalgic', label: 'Nostalgic', icon: Clock, color: 'from-emerald-400 to-teal-600' },
]

export default function MoodSelector({ selectedMood, onSelect }) {
  return (
    <section className="relative -mt-8 z-10" aria-label="Mood Selection">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">How are you feeling?</h2>
          <p className="mt-2 text-gray-600">Tap a mood to discover shayaris curated for you</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {MOODS.map(({ key, label, icon: Icon, color }) => {
            const active = selectedMood === key
            return (
              <motion.button
                key={key}
                type="button"
                onClick={() => onSelect(key)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -2 }}
                className={`group relative overflow-hidden rounded-2xl p-4 text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${active ? 'ring-2 ring-gray-900' : ''}`}
                aria-pressed={active}
                aria-label={`Select mood ${label}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2)_0,transparent_40%),radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.2)_0,transparent_40%)]" />
                <div className="relative z-10 flex items-center gap-3 text-white">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm opacity-90">Mood</p>
                    <p className="text-lg font-semibold">{label}</p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
