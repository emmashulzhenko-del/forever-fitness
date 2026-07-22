import { useState } from 'react'
import { Flame, Anchor, Timer, Rabbit, Wind, Flower2, StretchHorizontal, HeartPulse } from 'lucide-react'
import ModalOverlay from './ModalOverlay'

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

      <ModalOverlay open={!!active} onClose={() => setActive(null)}>
        {active && (() => {
          const Icon = active.icon
          return (
            <>
              {active.photo && (
                <div className="w-full aspect-[4/3] overflow-hidden">
                  <img src={active.photo} alt={active.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3 pr-6">
                  <Icon className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <h3 className="font-display font-semibold text-lg text-white leading-snug">{active.name}</h3>
                </div>
                <p className="font-body font-light text-sm text-white/75 leading-relaxed">{active.desc}</p>
                <a
                  href="#schedule"
                  onClick={() => setActive(null)}
                  className="mt-5 block w-full font-display font-semibold text-sm bg-accent text-white py-3 text-center hover:bg-pink-700 transition"
                >
                  ПЕРЕГЛЯНУТИ РОЗКЛАД
                </a>
              </div>
            </>
          )
        })()}
      </ModalOverlay>
    </section>
  )
}
