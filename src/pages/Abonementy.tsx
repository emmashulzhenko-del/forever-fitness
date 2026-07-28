import { useEffect, useRef, useState } from 'react';
import { Phone } from 'lucide-react';
import { payments, fmtPrice, type PaymentEntry } from '../data/payments';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileSticky from '../components/MobileSticky';
import { useTheme } from '../hooks/useTheme';

// ─── Pay button ───────────────────────────────────────────────────────────────
function PayBtn({ entry }: { entry: PaymentEntry }) {
  if (entry.noLink || !entry.url) {
    return (
      <div className="flex flex-col items-start gap-0.5">
        <a
          href="tel:+380737781008"
          className="inline-flex items-center gap-1.5 font-display text-xs border border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400 px-3 py-2 hover:border-accent hover:text-accent transition-colors"
        >
          <Phone size={12} />
          Оплата за телефоном
        </a>
        <span className="font-body text-[10px] text-zinc-400">073 778 10 08</span>
      </div>
    );
  }
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block font-display text-sm bg-accent text-white px-4 py-2 hover:bg-pink-700 transition-colors whitespace-nowrap"
    >
      Оплатити
    </a>
  );
}

// ─── Section wrapper with anchor ─────────────────────────────────────────────
function Section({
  id,
  title,
  badge,
  children,
}: {
  id: string;
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-[88px] py-14 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 mb-8">
        {badge && (
          <span className="font-body text-[11px] tracking-[0.1em] uppercase text-accent bg-accent/10 px-3 py-1">
            {badge}
          </span>
        )}
        <h2 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-white uppercase tracking-wide">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

// ─── Fitness+ matrix ──────────────────────────────────────────────────────────
const PERIODS = ['1\u00a0міс', '3\u00a0міс', '6\u00a0міс', '12\u00a0міс'] as const;
const COLS = ['8\u00a0тренувань', '12\u00a0тренувань', '16\u00a0тренувань', 'Безліміт'] as const;

type Period = (typeof PERIODS)[number];
type Col = (typeof COLS)[number];

// Map ids: fp-{1m|3m|6m|12m}-{8|12|16|unlim}
const periodKey: Record<Period, string> = {
  '1\u00a0міс': '1m',
  '3\u00a0міс': '3m',
  '6\u00a0міс': '6m',
  '12\u00a0міс': '12m',
};
const colKey: Record<Col, string> = {
  '8\u00a0тренувань': '8',
  '12\u00a0тренувань': '12',
  '16\u00a0тренувань': '16',
  'Безліміт': 'unlim',
};

function getFPEntry(period: Period, col: Col): PaymentEntry | undefined {
  const id = `fp-${periodKey[period]}-${colKey[col]}`;
  return payments.find(e => e.id === id);
}

function MatrixCell({ entry }: { entry: PaymentEntry | undefined }) {
  if (!entry) return <td className="border border-zinc-200 dark:border-zinc-700 p-3 text-center text-zinc-400">—</td>;
  return (
    <td className="border border-zinc-200 dark:border-zinc-700 p-3 text-center">
      <div className="font-display text-base text-accent mb-1.5">{fmtPrice(entry.priceUAH)}</div>
      <PayBtn entry={entry} />
    </td>
  );
}

function FitnessPlusMatrix() {
  const razove = payments.find(e => e.id === 'fp-razove')!;
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      {/* Razove row above the matrix */}
      <div className="flex items-center justify-between gap-4 px-4 py-3.5 bg-white dark:bg-zinc-800 mb-3 border border-zinc-200 dark:border-zinc-700">
        <span className="font-body text-sm text-zinc-900 dark:text-white">Разове відвідування</span>
        <span className="font-display text-base text-accent">{fmtPrice(razove.priceUAH)}</span>
        <PayBtn entry={razove} />
      </div>

      <table className="w-full border-collapse min-w-[580px]">
        <thead>
          <tr>
            <th className="font-display text-xs text-white uppercase tracking-widest p-3 text-left bg-zinc-900 dark:bg-zinc-800 border border-zinc-700">
              Термін
            </th>
            {COLS.map(col => (
              <th
                key={col}
                className={`font-display text-xs text-white uppercase tracking-widest p-3 text-center border border-zinc-700 ${
                  col === 'Безліміт'
                    ? 'bg-accent/80'
                    : 'bg-zinc-900 dark:bg-zinc-800'
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PERIODS.map((period, ri) => (
            <tr key={period} className={ri % 2 === 0 ? 'bg-white dark:bg-zinc-800' : 'bg-zinc-50 dark:bg-zinc-900'}>
              <td className="font-display text-sm text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 p-3 whitespace-nowrap">
                {period}
              </td>
              {COLS.map(col => (
                <MatrixCell key={col} entry={getFPEntry(period, col)} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="font-body text-xs text-zinc-400 mt-3">
        Абонемент ФІТНЕС+ включає всі фітнес-програми з розкладу — HIIT, Флай Йога, Джампінг, Йога, Стретчинг + Мобіліті, Табата, TRX та інші.
      </p>
    </div>
  );
}

// ─── Gym table ────────────────────────────────────────────────────────────────
function GymTable() {
  const rows = [
    { label: 'Разове відвідування', early: 'gym-razove-early', full: 'gym-razove-full' },
    { label: '1 місяць', early: 'gym-1m-early', full: 'gym-1m-full' },
    { label: '3 місяці', early: 'gym-3m-early', full: 'gym-3m-full' },
    { label: '6 місяців', early: 'gym-6m-early', full: 'gym-6m-full' },
    { label: '12 місяців', early: 'gym-12m-early', full: 'gym-12m-full' },
  ];
  const byId = Object.fromEntries(payments.map(e => [e.id, e]));

  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full border-collapse min-w-[480px]">
        <thead>
          <tr>
            <th className="font-display text-xs text-white uppercase tracking-widest p-3 text-left bg-zinc-900 dark:bg-zinc-800 border border-zinc-700">
              Тариф
            </th>
            <th className="font-display text-xs text-white uppercase tracking-widest p-3 text-center bg-zinc-900 dark:bg-zinc-800 border border-zinc-700">
              08:00–15:00
            </th>
            <th className="font-display text-xs text-white uppercase tracking-widest p-3 text-center bg-zinc-900 dark:bg-zinc-800 border border-zinc-700">
              15:00–21:00 / 08:00–21:00
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const e = byId[row.early];
            const f = byId[row.full];
            return (
              <tr key={row.label} className={i % 2 === 0 ? 'bg-white dark:bg-zinc-800' : 'bg-zinc-50 dark:bg-zinc-900'}>
                <td className="font-display text-sm text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 p-3">
                  {row.label}
                </td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-3 text-center">
                  <div className="font-display text-base text-accent mb-1.5">{fmtPrice(e.priceUAH)}</div>
                  <PayBtn entry={e} />
                </td>
                <td className="border border-zinc-200 dark:border-zinc-700 p-3 text-center">
                  <div className="font-display text-base text-accent mb-1.5">{fmtPrice(f.priceUAH)}</div>
                  <PayBtn entry={f} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="font-body text-xs text-zinc-400 mt-3">
        Безліміт — необмежена кількість відвідувань протягом терміну абонементу.
        Разове відвідування в другій колонці діє з 15:00 до 21:00.
      </p>
    </div>
  );
}

// ─── GYM+Mobility cards ───────────────────────────────────────────────────────
function GymMobilitySection() {
  const entries = payments.filter(e => e.group === 'gym-mobility');
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {entries.map(entry => (
        <div key={entry.id} className="border border-zinc-200 dark:border-zinc-700 p-6 flex flex-col gap-4">
          <div>
            <p className="font-display text-lg text-zinc-900 dark:text-white">{entry.name}</p>
            <p className="font-display text-2xl text-accent mt-1">{fmtPrice(entry.priceUAH)}</p>
          </div>
          <PayBtn entry={entry} />
        </div>
      ))}
    </div>
  );
}

// ─── Personal training ────────────────────────────────────────────────────────
function PersonalSection() {
  const gymEntries = payments.filter(
    e => e.group === 'personal' && e.id.startsWith('pt-gym'),
  );
  const strEntries = payments.filter(
    e => e.group === 'personal' && e.id.startsWith('pt-str'),
  );

  const SubTable = ({
    entries,
    title,
  }: {
    entries: PaymentEntry[];
    title: string;
  }) => (
    <div className="mb-6">
      <p className="font-body text-xs text-zinc-500 uppercase tracking-widest mb-2">{title}</p>
      {entries.map((entry, i) => (
        <div
          key={entry.id}
          className={`flex items-center justify-between gap-4 px-4 py-3.5 ${
            i % 2 === 0 ? 'bg-white dark:bg-zinc-800' : 'bg-zinc-50 dark:bg-zinc-900'
          }`}
        >
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm text-zinc-900 dark:text-white">{entry.sub}</p>
          </div>
          <span className="font-display text-base text-accent whitespace-nowrap shrink-0">
            {fmtPrice(entry.priceUAH)}
          </span>
          <div className="shrink-0">
            <PayBtn entry={entry} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <SubTable entries={gymEntries} title="Тренажерний зал" />
      <SubTable entries={strEntries} title="Стретчинг · Мобіліті · Пілатес" />
      <p className="font-body text-xs text-zinc-400 mt-1">
        При першому тренуванні — знижка на відвідування залу 50%.
      </p>
    </>
  );
}

// ─── Massage table ────────────────────────────────────────────────────────────
function MassageSection() {
  // Group by massage type
  const massageTypes = [
    { nameKey: 'thai', label: 'Тайський оздоровчий масаж' },
    { nameKey: 'body', label: 'Оздоровчий масаж "Все тіло"' },
    { nameKey: 'visceral', label: 'Вісцеральний масаж живота' },
    { nameKey: 'back', label: 'Масаж спини, комірцевої зони, рук' },
    { nameKey: 'legs', label: 'Масаж нижньої ділянки тіла і ніг' },
    { nameKey: 'face', label: 'Міофасціальний масаж обличчя та шиї' },
  ];

  return (
    <div>
      {massageTypes.map((type, ti) => {
        const single = payments.find(e => e.id === `ms-${type.nameKey}-1`)!;
        const course = payments.find(e => e.id === `ms-${type.nameKey}-6`)!;
        return (
          <div key={type.nameKey}>
            <div
              className={`flex items-center px-4 py-3.5 gap-4 ${
                ti % 2 === 0 ? 'bg-white dark:bg-zinc-800' : 'bg-zinc-50 dark:bg-zinc-900'
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-zinc-900 dark:text-white font-medium">
                  {type.label}
                </p>
              </div>
              {/* Single */}
              <div className="flex flex-col items-center gap-1 min-w-[110px] text-center">
                <p className="font-body text-[10px] text-zinc-400 uppercase tracking-wide">Разова</p>
                <p className="font-display text-sm text-accent">{fmtPrice(single.priceUAH)}</p>
                <PayBtn entry={single} />
              </div>
              {/* Course */}
              <div className="flex flex-col items-center gap-1 min-w-[130px] text-center">
                <p className="font-body text-[10px] text-zinc-400 uppercase tracking-wide">Курс 6 процедур</p>
                <p className="font-display text-sm text-accent">{fmtPrice(course.priceUAH)}</p>
                <PayBtn entry={course} />
              </div>
            </div>
          </div>
        );
      })}
      <p className="font-body text-xs text-zinc-400 mt-3">
        Тривалість процедур — в середньому 1 година.
      </p>
    </div>
  );
}

// ─── Sticky mini-nav ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'fp', label: 'Фітнес+' },
  { id: 'gym', label: 'Зал' },
  { id: 'personal', label: 'Персональні' },
  { id: 'gym-mobility', label: 'GYM+Mobility' },
  { id: 'massage', label: 'Масаж' },
] as const;

function MiniNav() {
  const [active, setActive] = useState('fp');

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className="sticky top-[68px] z-30 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-0">
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`font-display text-xs uppercase tracking-widest px-4 py-3 whitespace-nowrap transition-colors border-b-2 ${
              active === s.id
                ? 'text-accent border-accent'
                : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-accent'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Abonementy() {
  const { dark, toggle } = useTheme();
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle hash on mount (e.g. /abonementy#gym-mobility)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <Navbar dark={dark} onToggleTheme={toggle} />
      <MiniNav />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-24 md:pb-16" ref={headerRef}>
        {/* Page header */}
        <div className="pt-14 pb-10 border-b border-zinc-200 dark:border-zinc-800">
          <p className="font-body text-xs text-accent uppercase tracking-[0.15em] mb-3">Оплата онлайн</p>
          <h1
            className="font-display text-zinc-900 dark:text-white uppercase"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
          >
            АБОНЕМЕНТИ ТА ОПЛАТА
          </h1>
          <p className="font-body font-light text-zinc-500 dark:text-zinc-400 mt-3 max-w-xl leading-relaxed">
            Оплата через monobank — карткою, Apple Pay або Google Pay. Після оплати збережіть квитанцію та пред'явіть її на рецепції.
          </p>
        </div>

        {/* Sections */}
        <Section id="fp" title="Фітнес+" badge="Групові заняття">
          <FitnessPlusMatrix />
        </Section>

        <Section id="gym" title="Тренажерний зал" badge="Безліміт відвідувань">
          <GymTable />
        </Section>

        <Section id="personal" title="Персональні тренування" badge="Індивідуально">
          <PersonalSection />
        </Section>

        <Section id="gym-mobility" title="GYM + Mobility" badge="Новий абонемент">
          <div className="mb-4 max-w-lg">
            <p className="font-body text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Безліміт відвідувань тренажерного залу + 4 тренування Стретчинг&nbsp;&amp;&nbsp;Мобіліті на місяць.
            </p>
          </div>
          <GymMobilitySection />
        </Section>

        <Section id="massage" title="Масаж" badge="Відновлення">
          <MassageSection />
        </Section>
      </main>

      <Footer />
      <MobileSticky />
    </div>
  );
}
