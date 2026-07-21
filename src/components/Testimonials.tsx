import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    text: 'Ходжу на Флай Йогу вже 3 місяці — хребет більше не болить, а гнучкість неймовірна. Жанна — чудовий тренер!',
    name: 'Оксана К.',
    program: 'Флай Йога',
  },
  {
    text: 'Тренажерний зал на Зеленій — мій другий дім. Обладнання сучасне, атмосфера домашня, тренери уважні.',
    name: 'Андрій М.',
    program: 'Тренажерний зал',
  },
  {
    text: 'Записалась на HIIT після народження дитини — через 2 місяці повністю відновилась. Дякую команді Forever!',
    name: 'Наталія В.',
    program: 'HIIT',
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Testimonials() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2
          className="font-display text-center text-zinc-900 dark:text-white mb-2"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          ВАШ РЕЗУЛЬТАТ
        </h2>
        <p className="font-body font-light text-center text-zinc-500 mb-12">
          Що кажуть наші учасники
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map(t => (
            <motion.div
              key={t.name}
              variants={item}
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-8"
            >
              <Quote size={24} className="text-accent/40" />
              <p className="font-body font-light text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mt-4">
                {t.text}
              </p>
              <div className="mt-6 border-t border-zinc-100 dark:border-zinc-700 pt-4">
                <p className="font-body text-sm text-zinc-900 dark:text-white">{t.name}</p>
                <p className="font-body font-light text-xs text-accent">{t.program}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Google rating */}
        <div className="flex items-center gap-2 justify-center mt-8">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
          ))}
          <span className="font-body text-zinc-900 dark:text-white ml-2">4.9 · 120+ відгуків на Google</span>
        </div>
      </div>
    </section>
  );
}
