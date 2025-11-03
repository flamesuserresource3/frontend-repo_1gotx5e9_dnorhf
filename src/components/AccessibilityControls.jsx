import React from 'react'
import { motion } from 'framer-motion'
import { Contrast, Plus, Minus } from 'lucide-react'

export default function AccessibilityControls({ textScale, onIncreaseText, onDecreaseText, highContrast, onToggleContrast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto mt-8 max-w-5xl px-6"
      aria-label="Accessibility controls"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/80 p-4 backdrop-blur">
        <div className="text-sm text-gray-700">
          Reading preferences
          <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{Math.round(textScale * 100)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDecreaseText}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50"
            aria-label="Decrease text size"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onIncreaseText}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-50"
            aria-label="Increase text size"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onToggleContrast}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${highContrast ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
            aria-pressed={highContrast}
            aria-label="Toggle high contrast mode"
          >
            <Contrast className="h-4 w-4" />
            High contrast
          </button>
        </div>
      </div>
    </motion.div>
  )
}
