import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Dumbbell, User } from 'lucide-react';

type Cell = { name: string; trainer: string } | null;

type Row = {
  time: string;
  days: [Cell, Cell, Cell, Cell, Cell, Cell];
};

const scheduleRows: Row[] = [
  { time: '10:00', days: [{ name: 'ТАБАТА', trainer: 'Дара' }, null, null, { name: 'ТАБАТА', trainer: 'Дара' }, null, null] },
  { time: '11:00', days: [null, null, null, null, null, { name: 'СТРЕТЧИНГ', trainer: 'Ольга' }] },
  { time: '12:00', days: [null, null, null, null, null, { name: 'ЙОГА', trainer: 'Марина' }] },
  { time: '17:00', days: [null, { name: 'ДЖАМПІНГ', trainer: 'Ольга' }, null, null, null, null] },
  { time: '17:30', days: [{ name: 'ФЛАЙ ЙОГА', trainer: 'Жанна' }, null, { name: 'ЙОГА', trainer: 'Марина' }, { name: 'ФЛАЙ ЙОГА', trainer: 'Жанна' }, null, null] },
  { time: '18:00', days: [null, { name: 'HIIT', trainer: 'Ольга' }, null, null, { name: 'HIIT', trainer: 'Ольга' }, null] },
  { time: '19:00', days: [{ name: 'ТАБАТА+TRX', trainer: 'Дара' }, { name: 'СТРЕТЧИНГ', trainer: 'Ольга' }, { name: 'ТАБАТА+TRX', trainer: 'Дара' }, null, { name: 'СТРЕТЧИНГ', trainer: 'Ольга' }, null] },
];

const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

type GymCard = {
  icon: typeof Clock;
  title: string;
  desc: string;
  links?: { label: string; href: string; isSchedule?: boolean }[];
};

const gymCards: GymCard[] = [
  { icon: Clock, title: 'ГОДИНИ РОБОТИ',
    desc: 'Пн–Сб: 8:00–21:00. Неділя — вихідний.',
    links: [{ label: 'ЗАПИСАТИСЬ: +38 (073) 778 10 08', href: 'tel:+380737781008' }] },
  { icon: Dumbbell, title: 'ЗОНИ ЗАЛУ',
    desc: 'Тренажерний лофт 80 м² · Кросфіт і кардіо 70 м² · TRX, functional training 80 м²',
    links: [{ label: 'ЗАПИСАТИСЬ: +38 (073) 778 10 08', href: 'tel:+380737781008' }] },
  { icon: User, title: 'ЧЕРГОВИЙ ТА ПЕРСОНАЛЬНИЙ ТРЕНЕР',
    desc: 'Погоджуємо особисто, в чаті, або заповніть форму.',
    links: [
      { label: 'Написати в чат', href: '#help-chat' },
      { label: 'Заповнити форму', href: '#class-booking-form' },
      { label: 'Розклад фітнес-груп', href: '#schedule-groups', isSchedule: true },
    ] },
];

export default function Schedule() {
  const [tab, setTab] = useState<'fitness' | 'gym'>('gym');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleClassSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: 'Нова заявка з сайту — Запис на заняття',
          from_name: 'Forever Fitness сайт',
          name: fd.get('name'),
          phone: fd.get('phone'),
          class: fd.get('class'),
          day: fd.get('date'),
          source: 'Заняття',
          botcheck: '',
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'submit failed');
      setFormStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setFormStatus('error');
      console.error(err);
    }
  };

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash
      if (hash === '#schedule-groups' || hash === '#schedule-fitness') {
        setTab('fitness')
        document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
      } else if (hash === '#schedule-gym') {
        setTab('gym')
        document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
      }
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  function switchTab(t: 'fitness' | 'gym') {
    setTab(t)
    history.replaceState(null, '', t === 'fitness' ? '#schedule-groups' : '#schedule-gym')
  }

  return (
    <section id="schedule" className="py-20 bg-zinc-50 dark:bg-zinc-900 scroll-mt-[68px]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2
            className="font-display text-zinc-900 dark:text-white mb-2"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            РОЗКЛАД ТРЕНУВАНЬ
          </h2>
          <p className="font-body font-light text-zinc-500 mb-8">
            Групові заняття відбуваються за попереднім записом
          </p>

          {/* Tab switcher + inline membership link */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex gap-3 flex-wrap">
              {(['gym', 'fitness'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => switchTab(t)}
                  className={`font-display px-6 py-2 transition-colors duration-200 ${
                    tab === t
                      ? 'bg-accent text-white'
                      : 'border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:border-accent hover:text-accent'
                  }`}
                >
                  {t === 'gym' ? 'ТРЕНАЖЕРНИЙ ЗАЛ' : 'ФІТНЕС-ГРУПИ'}
                </button>
              ))}
            </div>
            <a href="#membership"
               className="font-display font-semibold text-sm text-accent hover:underline inline-flex items-center gap-1 whitespace-nowrap">
              ПЕРЕГЛЯНУТИ АБОНЕМЕНТИ →
            </a>
          </div>

          {tab === 'fitness' && (
            <div className="relative">
              <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full border-collapse" style={{ minWidth: 640 }}>
                <thead>
                  <tr>
                    <th className="font-display text-sm text-teal uppercase tracking-widest p-3 text-left border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                      Час
                    </th>
                    {dayLabels.map(d => (
                      <th key={d} className="font-display text-sm text-teal uppercase tracking-widest p-3 text-center border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map(row => (
                    <tr key={row.time}>
                      <td className="font-body font-semibold text-sm text-zinc-900 dark:text-zinc-200 p-3 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                        {row.time}
                      </td>
                      {row.days.map((cell, i) => (
                        <td
                          key={i}
                          className={`p-3 text-center border border-zinc-200 dark:border-zinc-700 text-xs transition-colors duration-150 ${
                            cell
                              ? 'bg-white dark:bg-zinc-800 hover:bg-teal/10 hover:border-teal cursor-default'
                              : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-300 dark:text-zinc-600'
                          }`}
                        >
                          {cell ? (
                            <>
                              <div className="font-body font-medium text-zinc-900 dark:text-white">{cell.name}</div>
                              <div className="font-body font-light text-zinc-400 mt-0.5">{cell.trainer}</div>
                            </>
                          ) : '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              {/* Right-edge fade gradient for mobile scroll hint */}
              <div
                className="absolute top-0 right-0 bottom-0 w-10 pointer-events-none md:hidden"
                style={{ background: 'linear-gradient(to right, transparent, var(--schedule-fade-bg, #f4f4f5))' }}
              />
              {/* Scroll hint label */}
              <p className="font-body text-[11px] text-zinc-400 mt-2 text-right md:hidden">
                ← прокрутіть →
              </p>
              {/* Disclaimer */}
              <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 mt-4">
                <strong>Актуальний час занять уточнюйте за телефоном:</strong>{' '}
                <a href="tel:+380737781008" className="text-accent hover:underline">+38 (073) 778 10 08</a>
              </p>
            </div>
          )}

          {tab === 'gym' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gymCards.map(card => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-8">
                    <Icon size={32} className="text-accent" />
                    <p className="font-display text-xl text-zinc-900 dark:text-white mt-4 mb-2">{card.title}</p>
                    <p className="font-body font-light text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{card.desc}</p>
                    {card.links && (
                      <div className="flex flex-col gap-2 mt-4">
                        {card.links.map(l => (
                          l.isSchedule ? (
                            <a key={l.label} href={l.href}
                               className="font-display font-semibold text-sm border border-accent text-accent px-3 py-2 text-center hover:bg-accent hover:text-white transition-colors">
                              {l.label} →
                            </a>
                          ) : (
                            <a key={l.label} href={l.href}
                               className="font-display font-semibold text-sm text-accent underline underline-offset-4 hover:no-underline">
                              {l.label} →
                            </a>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div id="class-booking-form" className="mt-12 max-w-2xl mx-auto p-8 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <h3 className="font-display text-2xl text-zinc-900 dark:text-white mb-1">ЗАПИСАТИСЬ НА ЗАНЯТТЯ</h3>
            <p className="font-body text-sm text-zinc-500 mb-6">Заповніть форму — ми підтвердимо запис за 10–15 хвилин</p>

            {formStatus === 'success' ? (
              <p className="font-body text-sm text-zinc-700 dark:text-zinc-300 py-8 text-center leading-relaxed">
                Дякуємо! Ми зв'яжемось з вами протягом години.
              </p>
            ) : (
              <form onSubmit={handleClassSubmit} className="space-y-4">
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <input type="text" name="name" required placeholder="Ваше ім'я"
                       className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm" />
                <input type="tel" name="phone" required placeholder="+380 67 123 45 67"
                       className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm" />
                <select name="class" required defaultValue=""
                        className="w-full min-w-0 max-w-full appearance-none px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm">
                  <option value="" disabled>Оберіть заняття</option>
                  <option value="Персональне тренування">Персональне тренування</option>
                  <option value="Черговий тренер">Черговий тренер</option>
                  <option value="Самостійно в тренажерному залі">Самостійно в тренажерному залі</option>
                  <option value="Табата">Табата</option>
                  <option value="Йога">Йога</option>
                  <option value="Флай Йога">Флай Йога</option>
                  <option value="Джампінг">Джампінг</option>
                  <option value="HIIT">HIIT</option>
                  <option value="TRX">TRX</option>
                  <option value="Стретчинг">Стретчинг</option>
                  <option value="FitMama">FitMama</option>
                  <option value="Кінезіотерапія">Кінезіотерапія</option>
                  <option value="Масаж">Масаж</option>
                </select>
                <input type="date" name="date" required
                       className="w-full min-w-0 max-w-full appearance-none px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm"
                       style={{ WebkitAppearance: 'none', minHeight: '48px' }} />
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full font-display font-semibold text-base bg-accent text-white py-4 hover:bg-pink-700 transition disabled:opacity-60"
                >
                  {formStatus === 'sending' ? 'Надсилаємо…' : 'ЗАПИСАТИСЬ НА ЗАНЯТТЯ'}
                </button>
                {formStatus === 'error' && (
                  <p className="text-xs text-red-500 text-center font-body">
                    Щось пішло не так. Зателефонуйте нам:{' '}
                    <a href="tel:+380737781008" className="underline">+380 73 778 10 08</a>
                  </p>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
