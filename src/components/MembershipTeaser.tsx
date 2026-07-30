import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { payments, fmtPrice } from '../data/payments';

// ─── Popular 4 picks ──────────────────────────────────────────────────────────
// 1. fp-1m-12  — Фітнес+ 12 занять/1міс — balanced, 44% savings vs разове
// 2. gym-1m-full — Тренажерний зал 1 міс 08:00-21:00 — most common entry
// 3. pt-gym-6  — Персональне 6 занять — entry PT package
// 4. first50   — Перше тренування −50% — lead hook → booking form
// Emma can swap IDs here; savings auto-derive from data.

function savingsPct(priceUAH: number, baseTotal: number) {
  return Math.max(0, Math.round((1 - priceUAH / baseTotal) * 100));
}

const byId = Object.fromEntries(payments.map(e => [e.id, e]));

const fp  = byId['fp-1m-12'];
const gym = byId['gym-1m-full'];
const pt  = byId['pt-gym-6'];

type TeaserCard = {
  id: string;
  title: string;
  sub: string;
  price: number | null;
  savings: number;
  details: string[];
  url: string | null;
  href: string | null;
  recommended: boolean;
};

const POPULAR: TeaserCard[] = [
  {
    id: 'fp-1m-12',
    title: 'Фітнес+',
    sub: '12 тренувань · 1 місяць',
    price: fp.priceUAH,
    savings: savingsPct(fp.priceUAH, 12 * 400),
    details: [
      '12 групових занять',
      'Термін дії: 1 місяць',
      'Всі програми клубу',
      'HIIT, Йога, Джампінг, Табата',
    ],
    url: fp.url ?? null,
    href: '/abonementy#fp',
    recommended: true,
  },
  {
    id: 'gym-1m-full',
    title: 'Тренажерний зал',
    sub: '1 місяць · 08:00–21:00',
    price: gym.priceUAH,
    savings: 0,
    details: [
      'Безлімітний доступ у зал',
      'Термін дії: 1 місяць',
      '3 зони (лофт, Cross Fire, кардіо)',
      'Час роботи: 08:00–21:00',
    ],
    url: gym.url ?? null,
    href: '/abonementy#gym',
    recommended: false,
  },
  {
    id: 'pt-gym-6',
    title: 'Персональне тренування',
    sub: 'Пакет 6 занять · Тренажерний зал',
    price: pt.priceUAH,
    savings: savingsPct(pt.priceUAH, 6 * 400),
    details: [
      '6 персональних тренувань',
      'Індивідуальна програма',
      'Робота з тренером',
      'Тренажерний зал',
    ],
    url: pt.url ?? null,
    href: '/abonementy#personal',
    recommended: false,
  },
  {
    id: 'first50',
    title: 'Перше тренування',
    sub: 'Знижка 50% на перший візит',
    price: null,
    savings: 0,
    details: [
      'Знижка 50% на перший візит',
      'Будь-який напрямок',
      'Знайомство з клубом',
      'Без зобов\u2019язань',
    ],
    url: null,
    href: '/pershe-trenuvannia',
    recommended: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function MembershipTeaser() {
  return (
    <section id="membership" className="py-20 bg-zinc-50 dark:bg-zinc-900 scroll-mt-[68px]">
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
            Популярні формати — обери свій або перегляньте всі варіанти.
          </p>

          {/* 4 popular cards — same PricingCard style as /abonementy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 items-stretch">
            {POPULAR.map(card => (
              <div
                key={card.id}
                className={`flex flex-col h-full p-6 ${
                  card.recommended
                    ? 'border-2 border-accent bg-white dark:bg-zinc-800'
                    : 'border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800'
                }`}
              >
                {/* Badge row — fixed height so all cards align across the row */}
                <div className="flex items-start justify-between gap-2 min-h-[22px] mb-3">
                  {card.recommended ? (
                    <span className="font-body text-[9px] uppercase tracking-widest text-white bg-accent px-2 py-0.5 whitespace-nowrap">
                      ★ Найпопулярніше
                    </span>
                  ) : (
                    <span />
                  )}
                  {(card.savings > 0 || card.id === 'first50') && (
                    <span className="font-body text-[10px] uppercase tracking-wide text-accent bg-accent/10 px-2 py-0.5 whitespace-nowrap shrink-0">
                      {card.id === 'first50' ? '−50%' : `−${card.savings}%`}
                    </span>
                  )}
                </div>

                {/* Plan name + sub */}
                <p className="font-display text-base text-zinc-900 dark:text-white uppercase tracking-wide mb-1">
                  {card.title}
                </p>
                <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                  {card.sub}
                </p>

                {/* Price */}
                <p className="font-display text-3xl text-accent leading-none mb-5">
                  {card.id === 'first50' ? '−50%' : card.price != null ? fmtPrice(card.price) : '—'}
                </p>

                {/* Feature list — flex-1 so CTA pins to bottom regardless of list length */}
                <ul className="flex-1 space-y-2 mb-5">
                  {card.details.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 font-body text-xs text-zinc-500 dark:text-zinc-400"
                    >
                      <span className="text-accent shrink-0 mt-px leading-none">✓</span>
                      <span className="leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA — pinned to bottom, identical padding for all cards */}
                <div className="mt-auto flex flex-col gap-2">
                  {card.url ? (
                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-display text-sm bg-accent text-white text-center py-3 hover:bg-pink-700 transition-colors"
                    >
                      Оплатити
                    </a>
                  ) : (
                    <a
                      href={card.href ?? '/pershe-trenuvannia'}
                      className="block font-display text-sm border border-accent text-accent text-center py-3 hover:bg-accent hover:text-white transition-colors"
                    >
                      Записатись
                    </a>
                  )}
                  {card.href && card.url && (
                    <a
                      href={card.href}
                      className="block font-display text-xs text-zinc-400 dark:text-zinc-500 text-center py-1.5 hover:text-accent transition-colors"
                    >
                      Абонементи →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Section CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/abonementy"
              className="inline-flex items-center gap-2 font-display text-base bg-accent text-white px-8 py-4 hover:bg-pink-700 transition-colors"
            >
              Всі абонементи та ціни
              <ArrowRight size={16} />
            </a>
            <a
              href="tel:+380737781008"
              className="font-body text-sm text-zinc-500 dark:text-zinc-400 hover:text-accent transition-colors"
            >
              або зателефонуйте: +38 (073) 778 10 08
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
