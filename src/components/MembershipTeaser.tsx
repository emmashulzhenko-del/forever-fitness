import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const highlights = [
  { label: 'Фітнес+', from: 'від\u00a02\u00a0000\u00a0₴/міс', href: '/abonementy#fp' },
  { label: 'Тренажерний зал', from: 'від\u00a0250\u00a0₴', href: '/abonementy#gym' },
  { label: 'GYM + Mobility', from: 'від\u00a01\u00a0900\u00a0₴/міс', href: '/abonementy#gym-mobility' },
  { label: 'Масаж', from: 'від\u00a0900\u00a0₴', href: '/abonementy#massage' },
];

export default function MembershipTeaser() {
  return (
    <section id="membership" className="py-20 bg-zinc-50 dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2
            className="font-display text-center text-zinc-900 dark:text-white mb-2 uppercase"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            АБОНЕМЕНТИ
          </h2>
          <p className="font-body font-light text-center text-zinc-500 dark:text-zinc-400 mb-10">
            Тренажерний зал, фітнес-групи, персональні тренування, масаж — обирай свій формат.
          </p>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {highlights.map(h => (
              <a
                key={h.label}
                href={h.href}
                className="group block border border-zinc-200 dark:border-zinc-700 p-5 hover:border-accent transition-colors"
              >
                <p className="font-display text-sm text-zinc-900 dark:text-white uppercase tracking-wide group-hover:text-accent transition-colors">
                  {h.label}
                </p>
                <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 mt-1">{h.from}</p>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/abonementy"
              className="inline-flex items-center gap-2 font-display text-base bg-accent text-white px-8 py-4 hover:bg-pink-700 transition-colors"
            >
              Всі абонементи та оплата
              <ArrowRight size={16} />
            </a>
            <a
              href="tel:+380737781008"
              className="font-body text-sm text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors"
            >
              або зателефонуйте: +38 (073) 778 10 08
            </a>
          </div>

          {/* First training discount strip */}
          <div className="mt-12 bg-accent py-8 text-center">
            <p className="font-display text-2xl text-white">ПЕРШЕ ТРЕНУВАННЯ ЗІ ЗНИЖКОЮ 50%</p>
            <p className="font-body font-light text-white/80 mt-2">Запишіться зараз — отримайте знижку на перший візит</p>
            <a
              href="tel:+380737781008"
              className="inline-block bg-white text-accent font-display text-lg px-10 py-4 mt-4 hover:bg-zinc-100 transition-colors duration-200"
            >
              ЗАПИСАТИСЬ ЗАРАЗ
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
