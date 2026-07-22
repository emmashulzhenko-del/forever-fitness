import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Flame, Anchor, Timer, Rabbit, Wind, Flower2, StretchHorizontal, HeartPulse } from 'lucide-react'

const groups = [
  { name: 'HIIT', icon: Flame, desc: 'Високоінтенсивне інтервальне тренування. Приріст метаболізму, мінус зайві кілограми і об\'єми.', photo: '/programs/hiit.webp' },
  { name: 'TRX (Струнка фігура)', icon: Anchor, desc: 'Комплексне функціональне тренування з TRX-петлями. Для бездоганної фігури.', photo: '/programs/trx.webp' },
  { name: 'ТАБАТА', icon: Timer, desc: 'Інтервальне тренування 20/10. Максимальне навантаження за мінімум часу.', photo: '/programs/tabata.webp' },
  { name: 'ДЖАМПІНГ', icon: Rabbit, desc: 'Потужне кардіо, без одноманітних рухів. Стрибкова аеробіка на батутах.', photo: '/programs/jumping.webp' },
  { name: 'ФЛАЙ ЙОГА', icon: Wind, desc: 'Декомпресійна Йога Терапія. Коректне підсилення "м\'язового корсету", розвиток гнучкості.', photo: '/programs/fly-yoga.webp' },
  { name: 'ЙОГА', icon: Flower2, desc: 'Класичні практики для зміцнення і гармонії тіла і духу, зцілення нервової системи через дихання — Пранаями.', photo: '/programs/hatha-yoga.webp' },
  { name: 'СТРЕТЧИНГ + МОБІЛІТІ', icon: StretchHorizontal, desc: 'Рух без обмежень. Коректне покращення гнучкості усіх м\'язових ланцюгів.', photo: '/programs/stretching-mobility.webp' },
  { name: 'FITMAMA + КІНЕЗІОТЕРАПІЯ', icon: HeartPulse, desc: 'Персональні тренування з відновлення і реабілітації.', photo: '/programs/fitmama.webp' },
]

type Group = typeof groups[0]

function GroupModal({ group, onClose }: { group: Group; onClose: () => void }) {
  const Icon = group.icon

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-black/75 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-sm overflow-hidden bg-zinc-900"
      >
        {/* Photo */}
        {group.photo && (
          <div className="w-full aspect-[4/3] overflow-hidden">
            <img
              src={group.photo}
              alt={group.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        )}
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <Icon className="w-6 h-6 text-accent shrink-0" />
              <h3 className="font-display font-semibold text-lg text-white leading-snug">{group.name}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white/50 hover:text-white transition-colors shrink-0 mt-0.5"
              aria-label="Закрити"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="font-body font-light text-sm text-white/75 leading-relaxed">{group.desc}</p>
          <a
            href="#schedule"
            onClick={onClose}
            className="mt-5 block w-full font-display font-semibold text-sm bg-accent text-white py-3 text-center hover:bg-pink-700 transition"
          >
            ПЕРЕГЛЯНУТИ РОЗКЛАД
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function FitnessGroups() {
  const [active, setActive] = useState<Group | null>(null)

  return (
    <section id="fitness-groups" className="py-20 px-[clamp(20px,6vw,96px)] bg-white dark:bg-zinc-950">
      <h2 className="font-display text-[clamp(32px,5vw,56px)] text-center text-zinc-900 dark:text-white mb-2">
        ФІТНЕС ГРУПИ
      </h2>
      <p className="font-body text-center text-zinc-500 dark:text-zinc-400 mb-12 text-lg">
        Натисни на напрямок, щоб дізнатись більше
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
        {groups.map(g => {
          const Icon = g.icon
          return (
            <button
              key={g.name}
              onClick={() => setActive(g)}
              className="p-6 text-left border border-zinc-200 dark:border-zinc-700 hover:border-accent/50 hover:bg-accent/5 transition-all min-h-[8rem] flex flex-col"
            >
              <Icon className="w-7 h-7 text-accent mb-3 shrink-0" />
              <span className="font-display font-semibold text-sm text-zinc-900 dark:text-white">
                {g.name}
              </span>
            </button>
          )
        })}
      </div>

      <AnimatePresence>
        {active && (
          <GroupModal group={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
