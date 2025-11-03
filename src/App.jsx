import React, { useMemo, useRef, useState } from 'react'
import HeroCover from './components/HeroCover'
import MoodSelector from './components/MoodSelector'
import AccessibilityControls from './components/AccessibilityControls'
import ShayariFeed from './components/ShayariFeed'

function App() {
  const [selectedMood, setSelectedMood] = useState('happy')
  const [textScale, setTextScale] = useState(1)
  const [highContrast, setHighContrast] = useState(false)
  const moodRef = useRef(null)

  const onExploreClick = () => {
    moodRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const containerClass = useMemo(
    () =>
      highContrast
        ? 'min-h-screen bg-white text-gray-900'
        : 'min-h-screen bg-[radial-gradient(50%_50%_at_50%_0%,rgba(253,186,116,0.15)_0%,transparent_60%)] from-white to-orange-50',
    [highContrast]
  )

  return (
    <main className={containerClass}>
      <HeroCover onExploreClick={onExploreClick} />

      <div ref={moodRef} className="relative z-10 -mt-16 pb-10">
        <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />
        <AccessibilityControls
          textScale={textScale}
          onIncreaseText={() => setTextScale((v) => Math.min(1.5, +(v + 0.1).toFixed(2)))}
          onDecreaseText={() => setTextScale((v) => Math.max(0.8, +(v - 0.1).toFixed(2)))}
          highContrast={highContrast}
          onToggleContrast={() => setHighContrast((v) => !v)}
        />
        <ShayariFeed mood={selectedMood} textScale={textScale} highContrast={highContrast} />
      </div>

      <footer className="mt-16 border-t border-gray-200/70 bg-white/60 py-6 text-center text-sm text-gray-600 backdrop-blur">
        Crafted for seekers of emotion. Be kind to your heart today.
      </footer>
    </main>
  )
}

export default App
