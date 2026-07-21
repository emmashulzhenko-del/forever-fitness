import { motion } from 'framer-motion';

const services = [
  { name: 'Тайський оздоровчий масаж', price: '1 450 грн', course: 'курс 6+ процедур: 1 250 грн' },
  { name: 'Оздоровчий масаж "Все тіло"', price: '1 350 грн', course: 'курс 6+ процедур: 1 200 грн' },
  { name: 'Вісцеральний масаж живота', price: '900 грн', course: 'курс 6+ процедур: 800 грн' },
  { name: 'Масаж спини, комірцевої зони, рук', price: '900 грн', course: 'курс 6+ процедур: 800 грн' },
  { name: 'Масаж нижньої ділянки тіла і ніг', price: '900 грн', course: 'курс 6+ процедур: 800 грн' },
  { name: 'Міофасціальний масаж обличчя та шиї', price: '1 000 грн', course: 'курс 6+ процедур: 900 грн' },
];

export default function Massage() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="inline-flex bg-teal/10 text-teal font-display text-sm px-3 py-1 mb-4">
              ВІДНОВЛЕННЯ ТА ОЗДОРОВЛЕННЯ
            </div>
            <h2
              className="font-display text-zinc-900 dark:text-white mt-4"
              style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
            >
              МАСАЖ У ФІТНЕС-КЛУБІ
            </h2>
            <p className="font-body font-light text-zinc-500 mt-3 leading-relaxed">
              За методом оздоровчої масажної терапії. Тривалість процедур — в середньому 1 година.
            </p>

            <div className="mt-8">
              {services.map((s, i) => (
                <div
                  key={i}
                  className="flex justify-between items-start border-b border-zinc-100 dark:border-zinc-800 py-4 gap-4"
                >
                  <span className="font-body text-sm text-zinc-900 dark:text-white">{s.name}</span>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="font-body text-sm text-accent">{s.price}</span>
                    <span className="font-body font-light text-xs text-zinc-400 mt-0.5">{s.course}</span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="tel:+380671496930"
              className="inline-block bg-accent text-white font-display text-base px-8 py-4 mt-8 hover:bg-pink-700 transition-colors duration-200"
            >
              ЗАПИСАТИСЬ НА МАСАЖ
            </a>
          </motion.div>

          {/* Right — image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="hidden md:block relative min-h-[460px] overflow-hidden"
          >
            <img src="/massage-room.webp"
                 alt="Масажний кабінет фітнес-клубу Forever"
                 className="w-full h-full min-h-[460px] object-cover"
                 loading="lazy" decoding="async" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
