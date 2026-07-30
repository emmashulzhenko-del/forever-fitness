import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileSticky from '../components/MobileSticky';
import { useTheme } from '../hooks/useTheme';

// ─── -50% price helper ────────────────────────────────────────────────────────
// Base one-time prices (UAH) per class type. null = price unknown → show generic.
const CLASS_BASE_PRICES: Record<string, number | null> = {
  'Табата':                           400,
  'Йога':                             400,
  'Флай Йога':                        400,
  'Джампінг':                         400,
  'HIIT':                             400,
  'TRX':                              400,
  'Стретчинг':                        400,
  'FitMama':                          400,
  'Персональне тренування':           400,  // pt-gym-razove
  'Черговий тренер':                  400,  // same rate as personal
  'Самостійно в тренажерному залі':   300,  // gym-razove-full rate
  'Кінезіотерапія':                   null, // not in payments.ts
  'Масаж':                            null, // complex range (900–1450)
};

/**
 * Returns the −50% price string for display, or null when base is unknown.
 * Class → base → −50% price table:
 *  Групові (Табата, Йога, Флай Йога, Джампінг, HIIT, TRX, Стретчинг, FitMama) → 400 → 200 грн
 *  Персональне тренування → 400 → 200 грн
 *  Черговий тренер → 400 → 200 грн
 *  Самостійно в залі → 300 → 150 грн
 *  Кінезіотерапія → unknown base → null (show generic)
 *  Масаж → complex → null (show generic)
 */
function getHalfPriceLabel(className: string): string {
  const base = CLASS_BASE_PRICES[className];
  if (base == null) return '−50% від вартості';
  return `${base / 2} грн`;
}

const CLASS_OPTIONS = [
  'Персональне тренування',
  'Черговий тренер',
  'Самостійно в тренажерному залі',
  'Табата',
  'Йога',
  'Флай Йога',
  'Джампінг',
  'HIIT',
  'TRX',
  'Стретчинг',
  'FitMama',
  'Кінезіотерапія',
  'Масаж',
] as const;


export default function PershaTrenuvannia() {
  const { dark, toggle } = useTheme();
  const [selectedClass, setSelectedClass] = useState('');
  const [paymentPref, setPaymentPref] = useState<'upfront' | 'onsite'>('onsite');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const halfPriceLabel = selectedClass ? getHalfPriceLabel(selectedClass) : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: 'Нова заявка — Перше тренування -50%',
          from_name: 'Forever Fitness сайт',
          name: fd.get('name'),
          phone: fd.get('phone'),
          class: fd.get('class'),
          payment_preference: fd.get('payment_preference'),
          source: 'Перше тренування -50%',
          botcheck: '',
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'submit failed');
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
      setSelectedClass('');
    } catch (err) {
      setFormStatus('error');
      console.error(err);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <Navbar dark={dark} onToggleTheme={toggle} />

      {/* ── PROMO HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-accent py-14 md:py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-block font-body text-xs uppercase tracking-[0.2em] text-white/70 mb-4">
            Спеціальна пропозиція для нових клієнтів
          </div>
          <h1
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(48px, 10vw, 96px)' }}
          >
            −50%
          </h1>
          <h2
            className="font-display text-white leading-tight mt-1"
            style={{ fontSize: 'clamp(24px, 5vw, 48px)' }}
          >
            ПЕРШЕ ТРЕНУВАННЯ
          </h2>
          <p className="font-body font-light text-white/85 text-lg mt-5 leading-relaxed max-w-lg mx-auto">
            Знайомство з клубом за половину ціни. Обери напрямок і приходь.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm font-body text-white/70">
            <span className="border border-white/30 px-3 py-1">Тренажерний зал</span>
            <span className="border border-white/30 px-3 py-1">Фітнес-групи</span>
            <span className="border border-white/30 px-3 py-1">Персональний тренер</span>
            <span className="border border-white/30 px-3 py-1">Масаж</span>
          </div>
        </motion.div>
      </section>

      {/* ── FORM ────────────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          >
            <h2 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-white mb-1">
              ЗАПИСАТИСЬ НА ПЕРШЕ ТРЕНУВАННЯ
            </h2>
            <p className="font-body text-sm text-zinc-500 dark:text-zinc-400 mb-8">
              Заповніть форму — ми підтвердимо запис за 10–15 хвилин
            </p>

            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-accent mx-auto mb-4" />
                <p className="font-display text-xl text-zinc-900 dark:text-white mb-2">
                  Дякуємо! Запис прийнято.
                </p>
                <p className="font-body text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Ми зв'яжемось з вами протягом 10–15 хвилин для підтвердження.
                  <br />
                  Телефон:{' '}
                  <a href="tel:+380737781008" className="text-accent hover:underline">
                    +38 (073) 778 10 08
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                {/* Ім'я */}
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ваше ім'я"
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm"
                />

                {/* Телефон */}
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+380 67 123 45 67"
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm"
                />

                {/* Оберіть заняття */}
                <div>
                  <select
                    name="class"
                    required
                    value={selectedClass}
                    onChange={e => setSelectedClass(e.target.value)}
                    className="w-full appearance-none px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm"
                  >
                    <option value="" disabled>Оберіть заняття</option>
                    {CLASS_OPTIONS.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                  {/* Live -50% price display */}
                  {halfPriceLabel && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-2 flex items-center gap-2"
                    >
                      <span className="font-body text-xs text-zinc-500 dark:text-zinc-400">
                        Перший візит зі знижкою −50%:
                      </span>
                      <span className="font-display text-sm text-accent font-semibold">
                        {halfPriceLabel}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Payment preference */}
                <div className="space-y-2">
                  <p className="font-body text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                    Спосіб оплати
                  </p>

                  {/* Option 1: pay upfront (placeholder) */}
                  <label
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                      paymentPref === 'upfront'
                        ? 'border-accent bg-accent/5'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_preference"
                      value="Оплатити зараз зі знижкою -50%"
                      checked={paymentPref === 'upfront'}
                      onChange={() => setPaymentPref('upfront')}
                      className="mt-0.5 accent-pink-600"
                    />
                    <div>
                      <p className="font-display text-sm text-zinc-900 dark:text-white">
                        Оплатити зараз зі знижкою −50%
                        {halfPriceLabel && halfPriceLabel !== '−50% від вартості' && (
                          <span className="ml-2 text-accent">{halfPriceLabel}</span>
                        )}
                      </p>
                      <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                        Онлайн-оплата через monobank — ми зв'яжемося щодо деталей
                      </p>
                      {/* TODO: monobank -50% payment link per class — placeholder */}
                      {paymentPref === 'upfront' && (
                        <p className="mt-2 font-body text-xs text-accent">
                          Після підтвердження запису ми надішлемо посилання на оплату.
                        </p>
                      )}
                    </div>
                  </label>

                  {/* Option 2: pay on-site */}
                  <label
                    className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${
                      paymentPref === 'onsite'
                        ? 'border-accent bg-accent/5'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_preference"
                      value="Записатися і оплатити на місці"
                      checked={paymentPref === 'onsite'}
                      onChange={() => setPaymentPref('onsite')}
                      className="mt-0.5 accent-pink-600"
                    />
                    <div>
                      <p className="font-display text-sm text-zinc-900 dark:text-white">
                        Записатися і оплатити на місці
                      </p>
                      <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                        Оплата готівкою або карткою при відвідуванні
                      </p>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full font-display font-semibold text-base bg-accent text-white py-4 hover:bg-pink-700 transition-colors disabled:opacity-60"
                >
                  {formStatus === 'sending' ? 'Надсилаємо…' : 'ЗАПИСАТИСЬ НА ПЕРШЕ ТРЕНУВАННЯ'}
                </button>

                {formStatus === 'error' && (
                  <p className="text-xs text-red-500 text-center font-body">
                    Щось пішло не так. Зателефонуйте нам:{' '}
                    <a href="tel:+380737781008" className="underline">+380 73 778 10 08</a>
                  </p>
                )}

                <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 text-center leading-relaxed">
                  Або зателефонуйте:{' '}
                  <a href="tel:+380737781008" className="text-accent hover:underline">
                    +38 (073) 778 10 08
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
      <MobileSticky />
    </div>
  );
}
