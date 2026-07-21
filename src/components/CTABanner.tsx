import { motion } from 'framer-motion';

export default function CTABanner() {
  return (
    <section className="py-14 md:py-24 bg-accent">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl mx-auto px-4 text-center"
      >
        <h2
          className="font-display text-white leading-none"
          style={{ fontSize: 'clamp(48px, 8vw, 96px)' }}
        >
          ПЕРШЕ ТРЕНУВАННЯ
        </h2>
        <h3
          className="font-display text-white/90 leading-none mt-2"
          style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
        >
          ЗІ ЗНИЖКОЮ 50%
        </h3>
        <p className="font-body font-light text-white/80 text-lg mt-6 leading-relaxed">
          45 хвилин. Познайомтесь із клубом, тренером та виконайте перше тренування. Жодних зобов'язань.
        </p>
        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          <a
            href="tel:+380671496930"
            className="bg-white text-accent font-display text-xl px-12 py-5 hover:bg-zinc-100 hover:scale-[1.02] transition-all duration-200"
          >
            ЗАПИСАТИСЬ ЗАРАЗ
          </a>
          <a
            href="tel:+380671496930"
            className="border-2 border-white text-white font-display text-xl px-12 py-5 hover:bg-white hover:text-accent transition-colors duration-200"
          >
            ЗАТЕЛЕФОНУВАТИ
          </a>
        </div>
      </motion.div>
    </section>
  );
}
