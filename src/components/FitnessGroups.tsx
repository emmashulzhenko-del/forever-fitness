import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Flame, Anchor, Timer, Rabbit, Wind, Flower2, StretchHorizontal, HeartPulse } from 'lucide-react'

const groups = [
  { name: 'HIIT', icon: Flame, desc: 'Високоінтенсивне інтервальне тренування. Приріст метаболізму, мінус зайві кілограми і об\'єми.' },
  { name: 'TRX (Струнка фігура)', icon: Anchor, desc: 'Комплексне функціональне тренування з TRX-петлями. Для бездоганної фігури.' },
  { name: 'ТАБАТА', icon: Timer, desc: 'Інтервальне тренування 20/10. Максимальне навантаження за мінімум часу.' },
  { name: 'ДЖАМПІНГ', icon: Rabbit, desc: 'Потужне кардіо, без одноманітних рухів. Стрибкова аеробіка на батутах.' },
  { name: 'ФЛАЙ ЙОГА', icon: Wind, desc: 'Декомпресійна Йога Терапія. Коректне підсилення "м\'язового корсету", розвиток гнучкості.' },
  { name: 'ЙОГА', icon: Flower2, desc: 'Класичні практики для зміцнення і гармонії тіла і духу, зцілення нервової системи через дихання — Пранаями.' },
  { name: 'СТРЕТЧИНГ + МОБІЛІТІ', icon: StretchHorizontal, desc: 'Рух без обмежень. Коректне покращення гнучкості усіх м\'язових ланцюгів.' },
  { name: 'FITMAMA + КІНЕЗІОТЕРАПІЯ', icon: HeartPulse, desc: 'Персональні тренування з відновлення і реабілітації.' },
]

export default function FitnessGroups() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="fitness-groups" className="py-20 px-[clamp(20px,6vw,96px)] bg-white dark:bg-zinc-950">
      <h2 className="font-display text-[clamp(32px,5vw,56px)] text-center text-zinc-900 dark:text-white mb-2">
        ФІТНЕС ГРУПИ
      </h2>
      <p className="font-body text-center text-zinc-500 dark:text-zinc-400 mb-12 text-lg">
        Натисни на напрямок, щоб дізнатись більше
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
        {groups.map((g, i) => (
          <div key={g.name} className="flex flex-col">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className={`relative p-6 text-left border transition-all ${
                open === i
                  ? 'border-accent bg-accent/5'
                  : 'border-zinc-200 dark:border-zinc-700 hover:border-accent/50'
              }`}
            >
              <g.icon className="w-7 h-7 text-accent mb-3" />
              <div className="flex items-center justify-between gap-2">
                <span className="font-display font-semibold text-sm text-zinc-900 dark:text-white">
                  {g.name}
                </span>
                <ChevronDown className={`w-4 h-4 text-accent shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="font-body text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed p-4 border border-t-0 border-accent/30 bg-white dark:bg-zinc-900">
                    {g.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  )
}
