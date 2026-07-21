import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Camera, Play, Send } from 'lucide-react';
import TrainerBookingModal from './TrainerBookingModal';

type Trainer = {
  name: string;
  specialty: string;
  exp: string;
  photo: string;
  bio?: string;
  external?: { label: string; href: string }[];
};

const trainers: Trainer[] = [
  { name: 'Дара Вовняченко',    specialty: 'Табата · TRX · Функціональний',   exp: 'Досвід: 7 років',  photo: '/trainers/dara-vovniachenko.webp' },
  { name: 'Марія Тартушкіна',   specialty: 'Флай Йога · Стретчинг',            exp: 'Досвід: 6 років',  photo: '/trainers/mariia-tartushkina.webp' },
  { name: 'Оксана Сидун',       specialty: 'Стретчинг · Пілатес',              exp: 'Досвід: 5 років',  photo: '/trainers/oksana-sydun.webp' },
  { name: 'Ольга Нагірна',      specialty: 'HIIT · Джампінг · Стретчинг',      exp: 'Досвід: 8 років',  photo: '/trainers/olha-nahirna.webp' },
  {
    name: 'Жанна Потапова',
    specialty: 'Флай Йога · Хатха Йога · Йога-терапія',
    exp: 'Викладає з 2007 року',
    photo: '/trainers/zhanna-potapova.webp',
    bio: 'Засновниця фітнес-клубу Forever, дипломована випускниця ЛДУФК з відзнакою, сертифікована інструкторка з йоги, аюрведист і прихильниця холістичного підходу до оздоровлення. Спеціалізується на Хатха-йозі, Флай-йозі (в гамаках), йога-терапії та оздоровчому пілатесі. Спікерка фестивалів Yoga Expo та Veda Life, засновниця всеукраїнського проєкту Йогатабір «Прана». Для Жанни йога — це шлях до фізичного здоров\'я, внутрішньої гармонії та усвідомленого життя. «Живи тут і зараз!»',
    external: [
      { label: 'yogatabir.com.ua', href: 'https://www.yogatabir.com.ua' },
      { label: 'ayurvedaahimsa.com', href: 'https://www.ayurvedaahimsa.com' },
    ],
  },
  { name: 'Марина Александрова', specialty: 'Йога · Пранаяма',                 exp: 'Досвід: 10 років', photo: '/trainers/maryna-aleksandrova.webp' },
  { name: 'Наталя Пустовіт',    specialty: 'Персональний тренінг',             exp: 'Досвід: 6 років',  photo: '/trainers/natalia-pustovit.webp' },
  { name: 'Діана Непомяща',     specialty: 'Пілатес · Фітбол',                 exp: 'Досвід: 5 років',  photo: '/trainers/diana-nepomyashcha.webp' },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Trainers() {
  const [bookingTrainer, setBookingTrainer] = useState<Trainer | null>(null);
  const [expandedBio, setExpandedBio] = useState<string | null>(null);

  return (
    <section id="trainers" className="py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <h2
            className="font-display text-zinc-900 dark:text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            НАШІ ТРЕНЕРИ
          </h2>
          <p className="font-body font-light text-zinc-500">Професіонали, які допоможуть тобі досягти цілей</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {trainers.map(trainer => {
              const isBioOpen = expandedBio === trainer.name;
              return (
                <motion.div
                  key={trainer.name}
                  variants={item}
                  layout
                  className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden group hover:-translate-y-1 transition-transform duration-150"
                  style={{ borderTop: '3px solid transparent' }}
                  onMouseEnter={e => (e.currentTarget.style.borderTopColor = '#E8279A')}
                  onMouseLeave={e => (e.currentTarget.style.borderTopColor = 'transparent')}
                >
                  <div
                    className={trainer.bio ? 'cursor-pointer' : ''}
                    onClick={() => trainer.bio && setExpandedBio(isBioOpen ? null : trainer.name)}
                  >
                    <img
                      src={trainer.photo}
                      alt={`${trainer.name} — тренер фітнес-клубу Forever`}
                      className="w-full aspect-[3/4] object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  {/* Body */}
                  <div className="p-5">
                    <p className="font-display text-xl text-zinc-900 dark:text-white">{trainer.name}</p>
                    <p className="font-body font-light text-xs text-accent uppercase tracking-widest mt-1">{trainer.specialty}</p>
                    <p className="font-body font-light text-xs text-zinc-500 dark:text-zinc-400 mt-1">{trainer.exp}</p>
                    {trainer.bio && (
                      <p className="font-body text-[11px] text-zinc-400 mt-1">натисни на фото</p>
                    )}
                    <div className="flex gap-3 mt-3">
                      <Camera size={16} className="text-zinc-400 hover:text-accent cursor-pointer transition-colors" />
                      <Play size={16} className="text-zinc-400 hover:text-accent cursor-pointer transition-colors" />
                      <Send size={16} className="text-zinc-400 hover:text-accent cursor-pointer transition-colors" />
                    </div>

                    {/* Expandable bio */}
                    <AnimatePresence>
                      {isBioOpen && trainer.bio && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <p className="font-body font-light text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                            {trainer.bio}
                          </p>
                          {trainer.external && (
                            <div className="flex flex-col gap-1 mt-3">
                              {trainer.external.map(link => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-display font-semibold text-sm text-accent underline underline-offset-4 hover:no-underline"
                                  onClick={e => e.stopPropagation()}
                                >
                                  {link.label} →
                                </a>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      onClick={() => setBookingTrainer(trainer)}
                      className="w-full font-display font-semibold text-sm bg-accent text-white py-3 mt-4 hover:bg-pink-700 transition"
                    >
                      ОБРАТИ ТРЕНЕРА
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
      <TrainerBookingModal trainer={bookingTrainer} onClose={() => setBookingTrainer(null)} />
    </section>
  );
}
