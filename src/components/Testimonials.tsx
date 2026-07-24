import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Star } from 'lucide-react';

// ⚑ ACTION REQUIRED: Replace this URL with the real Google Business reviews share link
// (from the club's Google Maps profile → Share → Copy link → Reviews tab)
const GOOGLE_REVIEWS_URL = 'https://g.page/r/PLACEHOLDER/review';

const reviews = [
  {
    name: 'Люба Боровська',
    text: 'Пройшла курс вісцерального масажу у Сергія. Результати мене дуже потішили. Сьогодні на заняттях з флай йоги мені було набагато легше займатися. Додала ще ранкову зарядку. Великі зміни почалися. Масаж був дуже приємний і безболісний. Сергій дуже дякую 🙏 🥰 Рекомендую 😘',
  },
  {
    name: 'J s',
    text: 'Чудове місце з душею. Обладнання та музика на висоті. Роздягальні та шафки утримуються в чистоті. Я дуже рекомендую цей спортзал.',
  },
  {
    name: 'Катя Латнер',
    text: 'Ходжу на джампінг. Це просто кайф. Дуже гарний тренер Оля. Дуже ефективні тренування. Після них як нове тіло.',
  },
  {
    name: 'Валерий Потапов',
    text: 'Атмосферний фітнес клуб в оригінальному стилі фабричний лофт. Прекрасний вид з вікон на старе місто. Люблю ранкові тренування в цьому залі. Рекомендую!',
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2
          className="font-display text-center text-zinc-900 dark:text-white mb-2"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          ВІДГУКИ
        </h2>
        <p className="font-body font-light text-center text-zinc-500 mb-12">
          Що кажуть наші клієнти
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {reviews.map(r => (
            <motion.div
              key={r.name}
              variants={item}
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-8 flex flex-col min-h-[180px]"
            >
              <Stars />
              <p className="font-body font-light text-base text-zinc-700 dark:text-zinc-300 leading-relaxed flex-1">
                {r.text}
              </p>
              <div className="mt-6 border-t border-zinc-100 dark:border-zinc-700 pt-4 flex items-center justify-between">
                <p className="font-body text-sm font-medium text-zinc-900 dark:text-white">{r.name}</p>
                <span className="font-body text-xs text-zinc-400 dark:text-zinc-500">Google</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-10">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-sm tracking-widest text-accent border-b-2 border-accent pb-0.5 hover:text-pink-700 hover:border-pink-700 transition-colors"
          >
            ВСІ ВІДГУКИ В GOOGLE →
          </a>
        </div>
      </div>
    </section>
  );
}
