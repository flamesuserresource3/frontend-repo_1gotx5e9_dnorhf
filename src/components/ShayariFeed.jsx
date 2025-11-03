import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThumbsUp, Bookmark, Copy, Share } from 'lucide-react'

const POEMS = {
  happy: [
    {
      poet: 'Mirza Ghalib',
      text: 'Dil hi to hai na sang-o-khisht, dard se bhar na aaye kyun —\nRoyenge hum hazaar baar, koi humein sataaye kyun',
      translit: 'Dil hi to hai na sang-o-khisht, dard se bhar na aaye kyun — Royenge hum hazaar baar, koi humein sataaye kyun',
    },
    {
      poet: 'Faiz Ahmed Faiz',
      text: 'Gul ko gulshan, shab ko sitara mubarak —\nAap aaye to har ek nazara mubarak',
      translit: 'Gul ko gulshan, shab ko sitara mubarak — Aap aaye to har ek nazara mubarak',
    },
  ],
  sad: [
    {
      poet: 'Parveen Shakir',
      text: 'Wo jo hum mein tum mein qarar tha tumhe yaad ho ke na yaad ho —\nWohi yani waada nibah ka tumhe yaad ho ke na yaad ho',
      translit: 'Wo jo hum mein tum mein qarar tha tumhe yaad ho ke na yaad ho — Wohi yani waada nibah ka tumhe yaad ho ke na yaad ho',
    },
    {
      poet: 'Ahmad Faraz',
      text: 'Ranjish hi sahi dil hi dukhane ke liye aa —\nAa phir se mujhe chhod ke jaane ke liye aa',
      translit: 'Ranjish hi sahi dil hi dukhane ke liye aa — Aa phir se mujhe chhod ke jaane ke liye aa',
    },
  ],
  romantic: [
    {
      poet: 'Jaun Elia',
      text: 'Tum jo keh do to aaj ki raat chand niklega hi nahi —\nPhir kisi roz ke liye reh jaayega',
      translit: 'Tum jo keh do to aaj ki raat chaand niklega hi nahi — Phir kisi roz ke liye reh jaayega',
    },
    {
      poet: 'Firaq Gorakhpuri',
      text: 'Raat yun dil mein teri khoi hui yaad aayi —\nJaise veerane mein chupke se bahaar aa jaaye',
      translit: 'Raat yun dil mein teri khoi hui yaad aayi — Jaise veerane mein chupke se bahaar aa jaaye',
    },
  ],
  nostalgic: [
    {
      poet: 'Nida Fazli',
      text: 'Ghar se masjid hai bahut door chalo yun kar lein —\nKisi rote hue bachche ko hansaya jaaye',
      translit: 'Ghar se masjid hai bahut door chalo yun kar lein — Kisi rote hue bachche ko hansaya jaaye',
    },
    {
      poet: 'Sahir Ludhianvi',
      text: 'Kabhi kabhi mere dil mein khayal aata hai —\nKi jaise tujhko banaya gaya hai mere liye',
      translit: 'Kabhi kabhi mere dil mein khayal aata hai — Ki jaise tujhko banaya gaya hai mere liye',
    },
  ],
}

export default function ShayariFeed({ mood, textScale = 1, highContrast = false }) {
  const list = useMemo(() => POEMS[mood] ?? [], [mood])
  const [index, setIndex] = useState(0)
  const [likes, setLikes] = useState({})
  const poem = list[index]

  useEffect(() => {
    setIndex(0)
  }, [mood])

  const copyPoem = async () => {
    if (!poem) return
    const content = `${poem.text}\n— ${poem.poet}`
    try {
      await navigator.clipboard.writeText(content)
    } catch (e) {
      // ignore
    }
  }

  const next = () => setIndex((i) => (i + 1) % Math.max(list.length, 1))
  const prev = () => setIndex((i) => (i - 1 + Math.max(list.length, 1)) % Math.max(list.length, 1))

  return (
    <section className="mx-auto mt-10 max-w-3xl px-6" aria-live="polite">
      <div className={`rounded-3xl border ${highContrast ? 'border-gray-900 bg-white' : 'border-gray-200 bg-white/70'} p-6 backdrop-blur`}
        style={{ fontSize: `${textScale}rem` }}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-gray-500">Selected mood: <strong className="text-gray-800">{mood}</strong></span>
          <div className="text-xs text-gray-500">Swipe or use arrows</div>
        </div>
        <div className="relative min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${mood}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {poem ? (
                <>
                  <p className="whitespace-pre-line leading-relaxed text-gray-900">
                    {poem.translit}
                  </p>
                  <p className="text-sm text-gray-600">— {poem.poet}</p>
                </>
              ) : (
                <p className="text-gray-600">Select a mood to begin discovering shayari.</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLikes((l) => ({ ...l, [index]: !l[index] }))}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${likes[index] ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}
              aria-pressed={!!likes[index]}
              aria-label="Like this shayari"
            >
              <ThumbsUp className="h-4 w-4" /> Like
            </button>
            <button
              onClick={copyPoem}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              aria-label="Copy shayari"
            >
              <Copy className="h-4 w-4" /> Copy
            </button>
            <button
              onClick={() => {}}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              aria-label="Bookmark shayari"
            >
              <Bookmark className="h-4 w-4" /> Bookmark
            </button>
            <button
              onClick={() => { if (poem) navigator.share?.({ title: 'Shayari', text: `${poem.text} — ${poem.poet}` }) }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              aria-label="Share shayari"
            >
              <Share className="h-4 w-4" /> Share
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50" aria-label="Previous">
              Previous
            </button>
            <button onClick={next} className="rounded-lg border border-gray-900 bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black" aria-label="Next">
              Next
            </button>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-gray-500">Modern engine. Classic voices. Infinite moods.</p>
    </section>
  )
}
