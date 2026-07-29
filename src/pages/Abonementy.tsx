import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { payments, fmtPrice, type PaymentEntry } from '../data/payments';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileSticky from '../components/MobileSticky';
import { useTheme } from '../hooks/useTheme';

// ─── Savings helper ───────────────────────────────────────────────────────────
function computeSavings(entry: PaymentEntry): number {
  const { id, priceUAH } = entry;

  // fp-{1|3|6|12}m-{8|12|16}: per-session vs 400₴ razove
  const fpSess = id.match(/^fp-(\d+)m-(8|12|16)$/);
  if (fpSess)
    return Math.max(0, Math.round((1 - priceUAH / (+fpSess[1] * +fpSess[2] * 400)) * 100));

  // fp-{3|6|12}m-unlim: vs buying 1-month unlimited (4000₴) × n
  const fpUnlim = id.match(/^fp-(\d+)m-unlim$/);
  if (fpUnlim && +fpUnlim[1] > 1)
    return Math.max(0, Math.round((1 - priceUAH / (4000 * +fpUnlim[1])) * 100));

  // gym-{3|6|12}m-{early|full}: vs 1-month pass × n
  const gymD = id.match(/^gym-(\d+)m-(early|full)$/);
  if (gymD && +gymD[1] > 1) {
    const base = gymD[2] === 'early' ? 990 : 1100;
    return Math.max(0, Math.round((1 - priceUAH / (base * +gymD[1])) * 100));
  }

  // gm-{3|6}m: vs 1900 × n
  const gm = id.match(/^gm-(\d+)m$/);
  if (gm && +gm[1] > 1)
    return Math.max(0, Math.round((1 - priceUAH / (1900 * +gm[1])) * 100));

  // pt-gym-{6|8|12}: vs 400 × n
  const ptG = id.match(/^pt-gym-(\d+)$/);
  if (ptG) return Math.max(0, Math.round((1 - priceUAH / (400 * +ptG[1])) * 100));

  // pt-str-{6|8|12}: vs 450 × n
  const ptS = id.match(/^pt-str-(\d+)$/);
  if (ptS) return Math.max(0, Math.round((1 - priceUAH / (450 * +ptS[1])) * 100));

  // ms-{type}-6: vs single × 6
  const ms6 = id.match(/^ms-(\w+)-6$/);
  if (ms6) {
    const s = payments.find(e => e.id === `ms-${ms6[1]}-1`);
    if (s) return Math.max(0, Math.round((1 - priceUAH / (s.priceUAH * 6)) * 100));
  }

  return 0;
}

// ─── Shared small components ──────────────────────────────────────────────────
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block font-body text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5">
      {children}
    </span>
  );
}

function PayBtn({ entry, block }: { entry: PaymentEntry; block?: boolean }) {
  if (entry.noLink || !entry.url) {
    return (
      <a
        href="tel:+380737781008"
        className="inline-flex items-center gap-1.5 font-display text-xs border border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400 px-3 py-2 hover:border-accent hover:text-accent transition-colors"
      >
        <Phone size={11} />
        За телефоном
      </a>
    );
  }
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-display bg-accent text-white hover:bg-pink-700 transition-colors whitespace-nowrap text-xs px-4 py-2 ${
        block ? 'block text-center text-sm px-4 py-3' : 'inline-block'
      }`}
    >
      Оплатити
    </a>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────
const TABS = [
  { key: 'fp',           hash: 'fp',           label: 'Фітнес+' },
  { key: 'gym',          hash: 'gym',           label: 'Тренажерний зал' },
  { key: 'personal',     hash: 'personal',      label: 'Персональні' },
  { key: 'gym-mobility', hash: 'gym-mobility',  label: 'GYM+Mobility' },
  { key: 'massage',      hash: 'massage',       label: 'Масаж' },
] as const;
type TabKey = (typeof TABS)[number]['key'];

function hashToTab(h: string): TabKey {
  const key = h.replace('#', '');
  return (TABS.find(t => t.hash === key)?.key ?? 'fp') as TabKey;
}

// ─── FITNESS+ MATRIX (Mode B) ─────────────────────────────────────────────────
const FP_PERIODS = [
  { label: '1\u00a0міс', key: '1m' },
  { label: '3\u00a0міс', key: '3m' },
  { label: '6\u00a0міс', key: '6m' },
  { label: '12\u00a0міс', key: '12m' },
] as const;

const FP_COLS = [
  { label: '8 занять',  key: '8' },
  { label: '12 занять', key: '12' },
  { label: '16 занять', key: '16' },
  { label: 'Безліміт',  key: 'unlim' },
] as const;

const FP_RECOMMENDED = 'fp-1m-12';

function FpPanel() {
  const byId = Object.fromEntries(payments.map(e => [e.id, e]));
  const razove = byId['fp-razove'];
  return (
    <div>
      {/* Razove banner */}
      <div className="flex flex-wrap items-center gap-4 justify-between px-5 py-4 mb-5 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60">
        <div>
          <p className="font-body text-sm font-medium text-zinc-900 dark:text-white">
            Разове відвідування
          </p>
          <p className="font-body text-xs text-zinc-400 mt-0.5">Без прив'язки до абонементу</p>
        </div>
        <span className="font-display text-2xl text-accent">{fmtPrice(razove.priceUAH)}</span>
        <PayBtn entry={razove} />
      </div>

      {/* Scrollable matrix — left column sticky on mobile */}
      <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <table className="border-collapse" style={{ minWidth: 520 }}>
          <thead>
            <tr>
              <th
                className="sticky left-0 z-10 bg-zinc-900 dark:bg-zinc-800 font-display text-[10px] text-white uppercase tracking-widest p-3 text-left border border-zinc-700 whitespace-nowrap"
                style={{ minWidth: 76 }}
              >
                Термін
              </th>
              {FP_COLS.map(col => (
                <th
                  key={col.key}
                  className={`font-display text-[10px] text-white uppercase tracking-widest p-3 text-center border border-zinc-700 whitespace-nowrap ${
                    col.key === 'unlim' ? 'bg-accent' : 'bg-zinc-900 dark:bg-zinc-800'
                  }`}
                  style={{ minWidth: 118 }}
                >
                  {col.label}
                  {col.key === 'unlim' && (
                    <div className="font-body text-[9px] font-normal text-white/70 mt-0.5 normal-case tracking-normal">
                      необмежено
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FP_PERIODS.map((period, ri) => (
              <tr key={period.key}>
                <td
                  className={`sticky left-0 z-10 font-display text-sm text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 p-3 whitespace-nowrap ${
                    ri % 2 === 0 ? 'bg-white dark:bg-zinc-800' : 'bg-zinc-50 dark:bg-zinc-900'
                  }`}
                >
                  {period.label}
                </td>
                {FP_COLS.map(col => {
                  const id = `fp-${period.key}-${col.key}`;
                  const entry = byId[id];
                  if (!entry)
                    return (
                      <td
                        key={col.key}
                        className="border border-zinc-200 dark:border-zinc-700 p-3 text-center text-zinc-300 dark:text-zinc-600"
                      >
                        —
                      </td>
                    );
                  const savings = computeSavings(entry);
                  const isRec = entry.id === FP_RECOMMENDED;
                  return (
                    <td
                      key={col.key}
                      className={`border p-3 text-center align-top ${
                        isRec
                          ? 'border-accent bg-accent/5 dark:bg-accent/10'
                          : ri % 2 === 0
                          ? 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800'
                          : 'border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900'
                      }`}
                    >
                      {isRec && (
                        <p className="font-body text-[9px] text-accent uppercase tracking-widest mb-1">
                          ★ Найпопулярніше
                        </p>
                      )}
                      <p className="font-display text-sm text-accent mb-1">
                        {fmtPrice(entry.priceUAH)}
                      </p>
                      {savings > 0 && (
                        <p className="font-body text-[10px] text-accent/80 mb-2">−{savings}%</p>
                      )}
                      <PayBtn entry={entry} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-body text-[11px] text-zinc-400 mt-2 md:hidden">
        ← прокрутіть таблицю →
      </p>
      <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 mt-4 max-w-2xl leading-relaxed">
        Абонемент Фітнес+ — доступ до всіх групових занять: HIIT, Флай Йога, Джампінг, Йога,
        Стретчинг + Мобіліті, Табата, TRX та інші. Відсоток економії — відносно разового
        відвідування (400&nbsp;₴).
      </p>
    </div>
  );
}

// ─── GYM (Mode A – cards) ─────────────────────────────────────────────────────
const GYM_DURATIONS = [
  { label: '1 місяць',  earlyId: 'gym-1m-early',  fullId: 'gym-1m-full',  recommended: true },
  { label: '3 місяці',  earlyId: 'gym-3m-early',  fullId: 'gym-3m-full',  recommended: false },
  { label: '6 місяців', earlyId: 'gym-6m-early',  fullId: 'gym-6m-full',  recommended: false },
  { label: '12 місяців',earlyId: 'gym-12m-early', fullId: 'gym-12m-full', recommended: false },
];

function GymPanel() {
  const byId = Object.fromEntries(payments.map(e => [e.id, e]));
  const earlyRaz = byId['gym-razove-early'];
  const fullRaz = byId['gym-razove-full'];

  return (
    <div>
      {/* Razove banner — two time slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {([
          { entry: earlyRaz, slot: '08:00–15:00' },
          { entry: fullRaz,  slot: '15:00–21:00' },
        ] as const).map(({ entry, slot }) => (
          <div
            key={entry.id}
            className="flex flex-wrap items-center gap-4 justify-between px-5 py-4 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/60"
          >
            <div>
              <p className="font-body text-sm font-medium text-zinc-900 dark:text-white">
                Разове відвідування
              </p>
              <p className="font-body text-xs text-zinc-400 mt-0.5">{slot}</p>
            </div>
            <span className="font-display text-2xl text-accent">{fmtPrice(entry.priceUAH)}</span>
            <PayBtn entry={entry} />
          </div>
        ))}
      </div>

      {/* Duration cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GYM_DURATIONS.map(row => {
          const early = byId[row.earlyId];
          const full = byId[row.fullId];
          const eSav = computeSavings(early);
          const fSav = computeSavings(full);
          return (
            <div
              key={row.label}
              className={`border p-5 flex flex-col gap-4 ${
                row.recommended
                  ? 'border-accent'
                  : 'border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {row.recommended && <Chip>Найпопулярніше</Chip>}
              <p className="font-display text-lg text-zinc-900 dark:text-white">{row.label}</p>

              {/* Early slot */}
              <div>
                <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  08:00–15:00
                </p>
                {eSav > 0 && <Chip>економія {eSav}%</Chip>}
                <div className="flex items-center justify-between gap-2 mt-2">
                  <span className="font-display text-xl text-accent">
                    {fmtPrice(early.priceUAH)}
                  </span>
                  <PayBtn entry={early} />
                </div>
              </div>

              <div className="border-t border-zinc-100 dark:border-zinc-700" />

              {/* Full slot */}
              <div>
                <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  08:00–21:00
                </p>
                {fSav > 0 && <Chip>економія {fSav}%</Chip>}
                <div className="flex items-center justify-between gap-2 mt-2">
                  <span className="font-display text-xl text-accent">
                    {fmtPrice(full.priceUAH)}
                  </span>
                  <PayBtn entry={full} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 mt-4">
        Безліміт відвідувань протягом дії абонементу. Економія — відносно щомісячної оплати за 1&nbsp;місяць.
      </p>
    </div>
  );
}

// ─── PERSONAL (Mode A – cards) ────────────────────────────────────────────────
function PersonalSubGroup({
  title,
  entries,
  recommendedId,
}: {
  title: string;
  entries: PaymentEntry[];
  recommendedId: string;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="font-body text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {entries.map(entry => {
          const savings = computeSavings(entry);
          const isRec = entry.id === recommendedId;
          return (
            <div
              key={entry.id}
              className={`border p-5 flex flex-col gap-3 ${
                isRec ? 'border-accent' : 'border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {isRec && <Chip>Найкраща цінність</Chip>}
              <p className="font-body text-sm text-zinc-900 dark:text-white">{entry.sub}</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-2xl text-accent">
                  {fmtPrice(entry.priceUAH)}
                </span>
                {savings > 0 && (
                  <span className="font-body text-xs text-accent/80">−{savings}%</span>
                )}
              </div>
              <PayBtn entry={entry} block />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PersonalPanel() {
  const gymEntries = payments.filter(
    e => e.group === 'personal' && e.id.startsWith('pt-gym'),
  );
  const strEntries = payments.filter(
    e => e.group === 'personal' && e.id.startsWith('pt-str'),
  );
  return (
    <>
      <PersonalSubGroup
        title="Тренажерний зал"
        entries={gymEntries}
        recommendedId="pt-gym-12"
      />
      <PersonalSubGroup
        title="Стретчинг · Мобіліті · Пілатес"
        entries={strEntries}
        recommendedId="pt-str-12"
      />
      <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 mt-2">
        При першому тренуванні — знижка 50%. Тренер формує індивідуальну програму під ваші цілі.
        Економія — відносно разового відвідування.
      </p>
    </>
  );
}

// ─── GYM+MOBILITY (Mode A – cards) ───────────────────────────────────────────
function GymMobilityPanel() {
  const entries = payments.filter(e => e.group === 'gym-mobility');
  return (
    <>
      <p className="font-body text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-lg">
        Безліміт відвідувань тренажерного залу + 4 заняття Стретчинг&nbsp;&amp;&nbsp;Мобіліті
        на місяць. Ідеально для тих, хто хоче поєднати силові тренування з гнучкістю.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {entries.map(entry => {
          const savings = computeSavings(entry);
          const isRec = entry.id === 'gm-1m';
          return (
            <div
              key={entry.id}
              className={`border p-6 flex flex-col gap-4 ${
                isRec ? 'border-accent' : 'border-zinc-200 dark:border-zinc-700'
              }`}
            >
              {isRec && <Chip>Доступно онлайн</Chip>}
              <div>
                <p className="font-display text-xl text-zinc-900 dark:text-white">{entry.name}</p>
                {savings > 0 && (
                  <p className="font-body text-xs text-accent/80 mt-1">
                    економія {savings}% vs щомісячна оплата
                  </p>
                )}
              </div>
              <span className="font-display text-3xl text-accent">
                {fmtPrice(entry.priceUAH)}
              </span>
              <PayBtn entry={entry} block />
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── MASSAGE (Mode A – type cards) ───────────────────────────────────────────
const MASSAGE_TYPES = [
  { key: 'thai',     label: 'Тайський оздоровчий масаж' },
  { key: 'body',     label: 'Оздоровчий масаж "Все тіло"' },
  { key: 'visceral', label: 'Вісцеральний масаж живота' },
  { key: 'back',     label: 'Масаж спини, комірцевої зони, рук' },
  { key: 'legs',     label: 'Масаж нижньої ділянки тіла і ніг' },
  { key: 'face',     label: 'Міофасціальний масаж обличчя та шиї' },
];

function MassagePanel() {
  const byId = Object.fromEntries(payments.map(e => [e.id, e]));
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MASSAGE_TYPES.map(type => {
          const single = byId[`ms-${type.key}-1`];
          const course = byId[`ms-${type.key}-6`];
          const courseSav = computeSavings(course);
          return (
            <div
              key={type.key}
              className="border border-zinc-200 dark:border-zinc-700 p-5 flex flex-col gap-4"
            >
              <p className="font-body text-sm font-medium text-zinc-900 dark:text-white leading-snug">
                {type.label}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Single */}
                <div className="flex flex-col gap-2">
                  <p className="font-body text-[10px] uppercase tracking-wider text-zinc-400">
                    Разова процедура
                  </p>
                  <p className="font-display text-xl text-accent">{fmtPrice(single.priceUAH)}</p>
                  <PayBtn entry={single} />
                </div>
                {/* Course */}
                <div className="flex flex-col gap-2">
                  <p className="font-body text-[10px] uppercase tracking-wider text-zinc-400">
                    Курс 6 процедур
                    {courseSav > 0 && (
                      <span className="ml-1 text-accent">−{courseSav}%</span>
                    )}
                  </p>
                  <p className="font-display text-xl text-accent">{fmtPrice(course.priceUAH)}</p>
                  <PayBtn entry={course} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 mt-4">
        Тривалість процедур — в середньому 1 година. Курс: 6 процедур за зниженою ціною.
      </p>
    </>
  );
}

// ─── Tab panel map ────────────────────────────────────────────────────────────
const PANELS: Record<TabKey, { title: string; badge: string; panel: React.ReactNode }> = {
  'fp':           { title: 'Фітнес+',               badge: 'Групові заняття',    panel: <FpPanel /> },
  'gym':          { title: 'Тренажерний зал',        badge: 'Безліміт відвідувань', panel: <GymPanel /> },
  'personal':     { title: 'Персональні тренування', badge: 'Індивідуально',      panel: <PersonalPanel /> },
  'gym-mobility': { title: 'GYM + Mobility',         badge: 'Зал + Мобіліті',     panel: <GymMobilityPanel /> },
  'massage':      { title: 'Масаж',                  badge: 'Відновлення',        panel: <MassagePanel /> },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Abonementy() {
  const { dark, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>(() =>
    hashToTab(typeof window !== 'undefined' ? window.location.hash : ''),
  );

  useEffect(() => {
    const h = () => setActiveTab(hashToTab(window.location.hash));
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);

  // Handle hash on mount (deep-link from menu)
  useEffect(() => {
    if (window.location.hash) {
      setActiveTab(hashToTab(window.location.hash));
    }
  }, []);

  function switchTab(key: TabKey) {
    const tab = TABS.find(t => t.key === key)!;
    setActiveTab(key);
    history.replaceState(null, '', '#' + tab.hash);
  }

  const { title, badge, panel } = PANELS[activeTab];

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <Navbar dark={dark} onToggleTheme={toggle} />

      {/* Sticky category tabs */}
      <nav className="sticky top-[68px] z-30 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-0">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => switchTab(t.key)}
              className={`font-display text-xs uppercase tracking-widest px-4 py-3.5 whitespace-nowrap transition-colors border-b-2 ${
                activeTab === t.key
                  ? 'text-accent border-accent'
                  : 'text-zinc-500 dark:text-zinc-400 border-transparent hover:text-accent'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-24 md:pb-16">
        {/* Page header */}
        <div className="pt-12 pb-8 border-b border-zinc-200 dark:border-zinc-800">
          <p className="font-body text-xs text-accent uppercase tracking-[0.15em] mb-3">
            Оплата онлайн
          </p>
          <h1
            className="font-display text-zinc-900 dark:text-white uppercase"
            style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
          >
            АБОНЕМЕНТИ
          </h1>
          <p className="font-body font-light text-zinc-500 dark:text-zinc-400 mt-3 max-w-xl leading-relaxed">
            Обери напрямок і знайди свій формат. Оплата через monobank — карткою, Apple Pay або
            Google Pay. Після оплати збережіть квитанцію та пред'явіть на рецепції.
          </p>
        </div>

        {/* Animated panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="pt-10"
          >
            <div className="flex flex-wrap items-center gap-3 mb-7">
              <span className="font-body text-[11px] tracking-[0.1em] uppercase text-accent bg-accent/10 px-3 py-1">
                {badge}
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-zinc-900 dark:text-white uppercase tracking-wide">
                {title}
              </h2>
            </div>
            {panel}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      <MobileSticky />
    </div>
  );
}
