import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const programs = [
  { title: 'ТРЕНАЖЕРНИЙ ЗАЛ', photo: '/programs/gym.webp',
    desc: "Сила і м'язова маса. Три зони з професійним обладнанням." },
  { title: 'ПЕРСОНАЛЬНІ ТРЕНУВАННЯ', photo: '/programs/personal.webp',
    desc: 'Індивідуальна програма — найшвидший шлях до результату.' },
  { title: 'МАСАЖ', photo: '/programs/massage.webp',
    desc: "Відновлення життєвих сил і підтримання здоров'я рухового апарату." },
  { title: 'ЧЕРГОВИЙ ТРЕНЕР', photo: '/programs/duty-trainer.webp',
    desc: 'Тренування з тренером за 200 грн — ідеально для початку.' },
  { title: 'ДЖАМПІНГ', photo: '/programs/jumping.webp',
    desc: 'До 800 ккал за тренування без навантаження на суглоби.' },
  { title: 'TRX', photo: '/programs/trx.webp',
    desc: 'Все тіло за 50 хвилин — сила, баланс, витривалість.' },
  { title: 'HIIT', photo: '/programs/hiit.webp',
    desc: 'Максимальне спалення жиру. Метаболізм працює ще 24 години.' },
  { title: 'STRETCHING + МОБІЛІТІ', photo: '/programs/stretching-mobility.webp',
    desc: 'Рух без обмежень. Мʼяка розтяжка усіх мʼязових груп. Робота з фасціями.' },
  { title: 'ФЛАЙ ЙОГА', photo: '/programs/fly-yoga.webp',
    desc: 'Декомпресійна Йога терапія. Коректна практика в гамаках.' },
  { title: 'ХАТХА ЙОГА', photo: '/programs/hatha-yoga.webp',
    desc: 'Баланс тіла і нервової системи через асани та дихання.' },
  { title: 'FITMAMA', photo: '/programs/fitmama.webp',
    desc: 'Персональні тренування з відновлення і реабілітації.' },
  { title: 'КІНЕЗІОТЕРАПІЯ', photo: '/programs/kinesio.webp',
    desc: 'Персональні тренування з відновлення і реабілітації.' },
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function TrainingTypes() {
  return (
    <section id="programs" className="py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2
          className="font-display text-center text-zinc-900 dark:text-white mb-2"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          НАШІ ПРОГРАМИ
        </h2>
        <p className="font-body font-light text-center text-zinc-500 mb-12">
          Обери напрямок, що підходить саме тобі
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-l border-t border-zinc-200 dark:border-zinc-800"
        >
          {programs.map(prog => (
            <motion.div
              key={prog.title}
              variants={item}
              className="group border-r border-b border-zinc-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={prog.photo}
                  alt={prog.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              <div className="p-5 bg-white dark:bg-zinc-950">
                <p className="font-display text-base text-zinc-900 dark:text-white">{prog.title}</p>
                <p className="font-body font-light text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">{prog.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
