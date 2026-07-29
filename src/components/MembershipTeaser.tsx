import { ArrowRight, Phone } from 'lucide-react';
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
  url: string | null;
  href: string | null;
  recommended: boolean;
};

const POPULAR: TeaserCard[] = [
  {
    id: 'fp-1m-12',
    title: 'Фітнес+',
    sub: '12 занять · 1 місяць',
    price: fp.priceUAH,
    savings: savingsPct(fp.priceUAH, 12 * 400),
    url: fp.url ?? null,
    href: null,
    recommended: true,
  },
  {
    id: 'gym-1m-full',
    title: 'Тренажерний зал',
    sub: '1 місяць · 08:00–21:00',
    price: gym.priceUAH,
    savings: 0,
    url: gym.url ?? null,
    href: null,
    recommended: false,
  },
  {
    id: 'pt-gym-6',
    title: 'Персональне тренування',
    sub: 'Пакет 6 занять · Тренажерний зал',
    price: pt.priceUAH,
    savings: savingsPct(pt.priceUAH, 6 * 400),
    url: pt.url ?? null,
    href: null,
    recommended: false,
  },
  {
    id: 'first50',
    title: 'Перше тренування',
    sub: 'Знижка 50% на перший візит',
    price: null,
    savings: 0,
    url: null,
    href: '#class-booking-form',
    recommended: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
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
            Популярні формати — обери свій або перегляньте всі варіанти.
          </p>

          {/* 4 popular cards — same card style as /abonementy */}
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
                {/* Badge row — fixed height so cards align */}
                <div className="flex items-start justify-between gap-2 min-h-[22px] mb-3">
                  {card.recommended ? (
                    <span className="font-body text-[9px] uppercase tracking-widest text-white bg-accent px-2 py-0.5 whitespace-nowrap">
                      ★ Найпопулярніше
                    </span>
                  ) : (
                    <span />
                  )}
                  {card.savings > 0 && (
                    <span className="font-body text-[10px] uppercase tracking-wide text-accent bg-accent/10 px-2 py-0.5 whitespace-nowrap shrink-0">
                      −{card.savings}%
                    </span>
                  )}
                  {card.id === 'first50' && (
                    <span className="font-body text-[10px] uppercase tracking-wide text-accent bg-accent/10 px-2 py-0.5 whitespace-nowrap shrink-0">
                      −50%
                    </span>
                  )}
                </div>

                {/* Plan name */}
                <p className="font-display text-base text-zinc-900 dark:text-white uppercase tracking-wide mb-1">
                  {card.title}
                </p>
                <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                  {card.sub}
                </p>

                {/* Price */}
                <p className="font-display text-3xl text-accent leading-none mb-5 flex-1">
                  {card.id === 'first50' ? '−50%' : card.price != null ? fmtPrice(card.price) : '—'}
                </p>

                {/* CTA — pinned to bottom */}
                <div className="mt-auto">
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
                      href={card.href ?? '#class-booking-form'}
                      className="flex items-center justify-center gap-1.5 font-display text-sm border border-accent text-accent text-center py-3 hover:bg-accent hover:text-white transition-colors"
                    >
                      {card.id === 'first50' ? (
                        'Записатись'
                      ) : (
                        <>
                          <Phone size={13} />
                          Оплата за телефоном
                        </>
                      )}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
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
