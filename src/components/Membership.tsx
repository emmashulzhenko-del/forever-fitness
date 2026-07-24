import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type Tab = 'gym' | 'fitness' | 'gym-mobility' | 'personal';

const gymRows = [
  { plan: 'РАЗОВЕ', early: '250 грн', full: '300 грн' },
  { plan: '1 МІС.', early: '990 грн', full: '1 100 грн' },
  { plan: '3 МІС.', early: '2 820 грн', full: '3 135 грн' },
  { plan: '6 МІС.', early: '5 525 грн', full: '6 140 грн' },
  { plan: '12 МІС.', early: '10 690 грн', full: '11 880 грн' },
];

const fitnessRows = [
  { plan: 'РАЗОВЕ', v8: '400 грн', v12: '400 грн', v16: '400 грн', unlim: '400 грн' },
  { plan: '1 МІС.', v8: '2 000 грн', v12: '2 700 грн', v16: '3 200 грн', unlim: '4 000 грн' },
  { plan: '3 МІС.', v8: '5 700 грн', v12: '7 695 грн', v16: '9 120 грн', unlim: '11 400 грн' },
  { plan: '6 МІС.', v8: '11 160 грн', v12: '15 060 грн', v16: '17 850 грн', unlim: '22 320 грн' },
  { plan: '12 МІС.', v8: '21 600 грн', v12: '29 160 грн', v16: '34 560 грн', unlim: '43 200 грн' },
];

const thClass = 'font-display text-sm text-white uppercase tracking-widest p-4 text-left bg-zinc-900 dark:bg-zinc-800 border border-zinc-700';
const tdClass = 'font-body text-sm p-4 border border-zinc-200 dark:border-zinc-700';

const tabHashes: Record<Tab, string> = {
  'gym': '#membership-gym',
  'fitness': '#membership-fitness',
  'gym-mobility': '#membership-gym-mobility',
  'personal': '#membership-personal',
};

function hashToTab(hash: string): Tab | null {
  if (hash === '#membership-fitness') return 'fitness';
  if (hash === '#membership-gym-mobility') return 'gym-mobility';
  if (hash === '#membership-personal') return 'personal';
  if (hash === '#membership-gym' || hash === '#membership') return 'gym';
  return null;
}

export default function Membership() {
  const [tab, setTab] = useState<Tab>('gym');

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash;
      const t = hashToTab(hash);
      if (t) {
        setTab(t);
        // Browser won't auto-scroll for sub-hashes (no matching element id), do it manually
        if (hash !== '#membership') {
          document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  function switchTab(t: Tab) {
    setTab(t);
    history.replaceState(null, '', tabHashes[t]);
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'gym', label: 'ТРЕНАЖЕРНИЙ ЗАЛ' },
    { key: 'fitness', label: 'ФІТНЕС+' },
    { key: 'gym-mobility', label: 'GYM + Mobility' },
    { key: 'personal', label: 'ПЕРСОНАЛЬНІ ТРЕНУВАННЯ' },
  ];

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
            className="font-display text-center text-zinc-900 dark:text-white mb-2"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            АБОНЕМЕНТИ
          </h2>
          <p className="font-body font-light text-center text-zinc-500 dark:text-zinc-400 mb-8">
            Хочеш тренуватись у Тренажерному Залі чи поєднати фітнес-групи із силовими? Обирай.
          </p>

          {/* Tab switcher */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => switchTab(t.key)}
                className={`font-display px-6 py-2 transition-colors duration-200 ${
                  tab === t.key
                    ? 'bg-accent text-white'
                    : 'border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:border-accent hover:text-accent'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* GYM tab */}
          {tab === 'gym' && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={thClass}>ТАРИФ</th>
                      <th className={thClass}>8:00–15:00</th>
                      <th className={thClass}>8:00–21:00</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gymRows.map((row, i) => (
                      <tr key={row.plan} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-800' : 'bg-zinc-50 dark:bg-zinc-900'}>
                        <td className={`${tdClass} font-display text-base text-zinc-900 dark:text-white`}>{row.plan}</td>
                        <td className={`${tdClass} font-display text-base text-accent`}>{row.early}</td>
                        <td className={`${tdClass} font-display text-base text-accent`}>{row.full}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-body font-light text-xs text-zinc-500 mt-4">
                Безліміт для тренажерного залу — необмежена кількість відвідувань протягом терміну абонементу
              </p>
              <a href="#schedule?tab=gym" className="inline-flex items-center gap-2 font-display text-sm text-accent hover:underline mt-4">
                Розклад тренажерного залу →
              </a>
            </>
          )}

          {/* FITNESS+ tab */}
          {tab === 'fitness' && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={thClass}>ТЕРМІН</th>
                      <th className={thClass}>8 тренувань</th>
                      <th className={thClass}>12 тренувань</th>
                      <th className={thClass}>16 тренувань</th>
                      <th className={`${thClass} bg-accent/20 border-accent/30`}>Безліміт</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fitnessRows.map((row, i) => (
                      <tr key={row.plan} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-800' : 'bg-zinc-50 dark:bg-zinc-900'}>
                        <td className={`${tdClass} font-display text-base text-zinc-900 dark:text-white`}>{row.plan}</td>
                        <td className={`${tdClass} font-display text-base text-accent`}>{row.v8}</td>
                        <td className={`${tdClass} font-display text-base text-accent`}>{row.v12}</td>
                        <td className={`${tdClass} font-display text-base text-accent`}>{row.v16}</td>
                        <td className={`${tdClass} font-display text-base text-accent bg-accent/5 border-accent/30`}>{row.unlim}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-body font-light text-xs text-zinc-500 mt-4">
                Абонемент ФІТНЕС+ включає усі фітнес-програми з розкладу — HIIT, Флай Йога, Джампінг, Йога, Стретчинг + Мобіліті, Табата, TRX та інші
              </p>
              <a href="#schedule?tab=fitness" className="inline-flex items-center gap-2 font-display text-sm text-accent hover:underline mt-4">
                Розклад фітнес-груп →
              </a>
            </>
          )}

          {/* GYM + MOBILITY tab */}
          {tab === 'gym-mobility' && (
            <div className="max-w-2xl mx-auto">
              <div className="p-8 bg-white dark:bg-zinc-800 border-2 border-accent">
                <p className="text-[11px] tracking-[0.1em] uppercase text-accent font-body mb-2">Новий абонемент</p>
                <h3 className="font-display text-3xl text-zinc-900 dark:text-white mb-4">GYM + MOBILITY</h3>
                <ul className="space-y-3 font-body text-base text-zinc-700 dark:text-zinc-300">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">—</span>
                    Необмежена кількість відвідувань Тренажерного залу
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">—</span>
                    + 4 тренування Стретчинг + Мобіліті на місяць
                  </li>
                </ul>
                <table className="w-full border-collapse mt-6">
                  <thead>
                    <tr className="bg-zinc-900 dark:bg-zinc-800 text-white">
                      <th className="p-4 text-left font-display text-sm tracking-widest uppercase border border-zinc-700">Термін</th>
                      <th className="p-4 text-left font-display text-sm tracking-widest uppercase border border-zinc-700">Вартість</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-zinc-900">
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-body text-sm">1 місяць</td>
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-display text-base text-accent">1 900 грн</td>
                    </tr>
                    <tr className="bg-zinc-50 dark:bg-zinc-800">
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-body text-sm">3 місяці</td>
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-display text-base text-accent">5 415 грн</td>
                    </tr>
                    <tr className="bg-white dark:bg-zinc-900">
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-body text-sm">6 місяців</td>
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-display text-base text-accent">10 602 грн</td>
                    </tr>
                  </tbody>
                </table>
                <p className="font-body text-sm text-zinc-500 dark:text-zinc-400 mt-6">
                  Питання? Зателефонуйте: +38 (073) 778 10 08
                </p>
                <a href="tel:+380737781008"
                   className="inline-block mt-4 font-display font-semibold text-base bg-accent text-white px-8 py-3 hover:bg-pink-700 transition">
                  ЗАТЕЛЕФОНУВАТИ
                </a>
              </div>
            </div>
          )}

          {/* PERSONAL tab */}
          {tab === 'personal' && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-zinc-900 dark:bg-zinc-800 text-white">
                      <th className="p-4 text-left font-display text-sm tracking-widest uppercase border border-zinc-700">
                        Персональне тренування і тренувальний план
                      </th>
                      <th className="p-4 text-left font-display text-sm tracking-widest uppercase border border-zinc-700">
                        З інструктором тренажерного залу
                      </th>
                      <th className="p-4 text-left font-display text-sm tracking-widest uppercase border border-zinc-700">
                        З інструктором Стретчинг, Мобіліті, Пілатес
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white dark:bg-zinc-900">
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-body text-sm">Разове</td>
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-display text-base text-accent">400 грн</td>
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-display text-base text-accent">450 грн</td>
                    </tr>
                    <tr className="bg-zinc-50 dark:bg-zinc-800">
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-body text-sm">Оплата 6–8 тренувань</td>
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-display text-base text-accent">350 грн/1 тренування</td>
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-display text-base text-accent">400 грн/1 тренування</td>
                    </tr>
                    <tr className="bg-white dark:bg-zinc-900">
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-body text-sm">Оплата 12-ти тренувань</td>
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-display text-base text-accent">320 грн/1 тренування</td>
                      <td className="p-4 border border-zinc-200 dark:border-zinc-700 font-display text-base text-accent">350 грн/1 тренування</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="font-body text-sm text-zinc-600 dark:text-zinc-400 mt-4 italic">
                При першому тренуванні — знижка на відвідування залу 50%
              </p>
            </>
          )}

          {/* CTA strip */}
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
