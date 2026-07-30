import { useState, useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { payments, fmtPrice, type PaymentEntry } from '../data/payments';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileSticky from '../components/MobileSticky';
import ScrollDots from '../components/ScrollDots';
import { useTheme } from '../hooks/useTheme';

// ─── Savings helper ───────────────────────────────────────────────────────────
function computeSavings(entry: PaymentEntry): number {
  const { id, priceUAH } = entry;
  const fpSess = id.match(/^fp-(\d+)m-(8|12|16)$/);
  if (fpSess)
    return Math.max(0, Math.round((1 - priceUAH / (+fpSess[1] * +fpSess[2] * 400)) * 100));
  const fpUnlim = id.match(/^fp-(\d+)m-unlim$/);
  if (fpUnlim && +fpUnlim[1] > 1)
    return Math.max(0, Math.round((1 - priceUAH / (4000 * +fpUnlim[1])) * 100));
  const gymD = id.match(/^gym-(\d+)m-(early|full)$/);
  if (gymD && +gymD[1] > 1) {
    const base = gymD[2] === 'early' ? 990 : 1100;
    return Math.max(0, Math.round((1 - priceUAH / (base * +gymD[1])) * 100));
  }
  const gm = id.match(/^gm-(\d+)m$/);
  if (gm && +gm[1] > 1)
    return Math.max(0, Math.round((1 - priceUAH / (1900 * +gm[1])) * 100));
  const ptG = id.match(/^pt-gym-(\d+)$/);
  if (ptG) return Math.max(0, Math.round((1 - priceUAH / (400 * +ptG[1])) * 100));
  const ptS = id.match(/^pt-str-(\d+)$/);
  if (ptS) return Math.max(0, Math.round((1 - priceUAH / (450 * +ptS[1])) * 100));
  const ms6 = id.match(/^ms-(\w+)-6$/);
  if (ms6) {
    const s = payments.find(e => e.id === `ms-${ms6[1]}-1`);
    if (s) return Math.max(0, Math.round((1 - priceUAH / (s.priceUAH * 6)) * 100));
  }
  return 0;
}

// ─── Pricing card ─────────────────────────────────────────────────────────────
function PricingCard({
  name,
  price,
  periodLabel,
  savings = 0,
  details,
  recommended = false,
  entry,
}: {
  name: string;
  price: number;
  periodLabel?: string;
  savings?: number;
  details: string[];
  recommended?: boolean;
  entry: PaymentEntry;
}) {
  return (
    <div
      className={`flex flex-col h-full p-6 ${
        recommended
          ? 'border-2 border-accent bg-white dark:bg-zinc-800'
          : 'border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800'
      }`}
    >
      {/* Badge row — fixed height so all cards align */}
      <div className="flex items-start justify-between gap-2 min-h-[22px] mb-3">
        {recommended ? (
          <span className="font-body text-[9px] uppercase tracking-widest text-white bg-accent px-2 py-0.5 whitespace-nowrap">
            ★ Найпопулярніше
          </span>
        ) : (
          <span />
        )}
        {savings > 0 && (
          <span className="font-body text-[10px] uppercase tracking-wide text-accent bg-accent/10 px-2 py-0.5 whitespace-nowrap shrink-0">
            −{savings}%
          </span>
        )}
      </div>

      {/* Plan name */}
      <p className="font-display text-base text-zinc-900 dark:text-white uppercase tracking-wide mb-3">
        {name}
      </p>

      {/* Price */}
      <div className="mb-5">
        <span className="font-display text-3xl text-accent leading-none">
          {fmtPrice(price)}
        </span>
        {periodLabel && (
          <p className="font-body text-xs text-zinc-400 mt-1">{periodLabel}</p>
        )}
      </div>

      {/* Detail list — flex-1 so CTA always pins to bottom */}
      <ul className="flex-1 space-y-2 mb-5">
        {details.map((d, i) => (
          <li
            key={i}
            className="flex items-start gap-2 font-body text-xs text-zinc-500 dark:text-zinc-400"
          >
            <span className="text-accent shrink-0 mt-px leading-none">✓</span>
            <span className="leading-relaxed">{d}</span>
          </li>
        ))}
      </ul>

      {/* CTA — pinned to bottom */}
      <div className="mt-auto">
        {entry.noLink || !entry.url ? (
          <a
            href="tel:+380737781008"
            className="flex items-center justify-center gap-1.5 font-display text-sm border border-zinc-300 dark:border-zinc-600 text-zinc-500 dark:text-zinc-400 py-3 hover:border-accent hover:text-accent transition-colors"
          >
            <Phone size={13} />
            Оплата за телефоном
          </a>
        ) : (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-display text-sm bg-accent text-white py-3 text-center hover:bg-pink-700 transition-colors"
          >
            Оплатити
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Sub-toggle (reusable for FP duration picker) ─────────────────────────────
function SubToggle<T extends string>({
  options,
  active,
  onChange,
}: {
  options: readonly { key: T; label: string }[];
  active: T;
  onChange: (k: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {options.map(o => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={`font-display text-xs uppercase tracking-widest px-4 py-2 transition-colors ${
            active === o.key
              ? 'bg-accent text-white'
              : 'border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:border-accent hover:text-accent'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ─── Section sub-heading (used inside panels) ─────────────────────────────────
function PanelGroup({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8 last:mb-0">
      {label && (
        <p className="font-body text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
          {label}
        </p>
      )}
      {children}
    </div>
  );
}

// ─── FITNESS+ PANEL ───────────────────────────────────────────────────────────
const FP_DURATIONS = [
  { key: 'razove', label: 'Разове' },
  { key: '1m',     label: '1 міс' },
  { key: '3m',     label: '3 міс' },
  { key: '6m',     label: '6 міс' },
  { key: '12m',    label: '12 міс' },
] as const;
type FpDur = (typeof FP_DURATIONS)[number]['key'];

const DUR_LABEL: Record<string, string> = {
  '1m': '1 місяць', '3m': '3 місяці', '6m': '6 місяців', '12m': '12 місяців',
};

const FP_COLS = [
  { key: '8',    name: '8 тренувань' },
  { key: '12',   name: '12 тренувань' },
  { key: '16',   name: '16 тренувань' },
  { key: 'unlim',name: 'Безліміт' },
] as const;

function fpDetails(col: string, durKey: string): string[] {
  const dur = DUR_LABEL[durKey] ?? '';
  if (col === 'unlim') {
    return [
      'Необмежена кількість занять',
      `Термін дії: ${dur}`,
      'Всі програми без обмежень',
      'HIIT, Йога, Джампінг, Табата…',
    ];
  }
  return [
    `${col} групових занять`,
    `Термін дії: ${dur}`,
    'Всі програми фітнес-клубу',
    'HIIT, Йога, Джампінг, Табата…',
  ];
}

function FpPanel() {
  const [dur, setDur] = useState<FpDur>('1m');
  const byId = Object.fromEntries(payments.map(e => [e.id, e]));

  if (dur === 'razove') {
    const entry = byId['fp-razove'];
    return (
      <>
        <SubToggle options={FP_DURATIONS} active={dur} onChange={setDur} />
        <div className="max-w-xs">
          <PricingCard
            name="Разове відвідування"
            price={entry.priceUAH}
            periodLabel="одне відвідування"
            details={[
              'Доступ до однієї програми за вибором',
              'Дійсний протягом дня',
              "Без прив\u2019язки до абонементу",
            ]}
            entry={entry}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <SubToggle options={FP_DURATIONS} active={dur} onChange={setDur} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {FP_COLS.map(col => {
          const id = `fp-${dur}-${col.key}`;
          const entry = byId[id];
          if (!entry) return null;
          const savings = computeSavings(entry);
          const recommended = col.key === '12';
          return (
            <PricingCard
              key={id}
              name={col.name}
              price={entry.priceUAH}
              periodLabel={DUR_LABEL[dur]}
              savings={savings}
              details={fpDetails(col.key, dur)}
              recommended={recommended}
              entry={entry}
            />
          );
        })}
      </div>
      <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 mt-5 max-w-2xl leading-relaxed">
        Абонемент Фітнес+ включає всі програми клубу: HIIT, Флай Йога, Джампінг, Йога,
        Стретчинг + Мобіліті, Табата, TRX та інші. Відсоток економії — відносно разового
        відвідування (400&nbsp;₴).
      </p>
    </>
  );
}

// ─── GYM PANEL ────────────────────────────────────────────────────────────────
const GYM_DURATIONS = [
  { key: 'razove', label: 'Разове' },
  { key: '1m',     label: '1 міс' },
  { key: '3m',     label: '3 міс' },
  { key: '6m',     label: '6 міс' },
  { key: '12m',    label: '12 міс' },
] as const;
type GymDur = (typeof GYM_DURATIONS)[number]['key'];

const GYM_GROUPS: readonly {
  durKey: GymDur;
  label: string;
  items: readonly { id: string; name: string; periodLabel?: string }[];
}[] = [
  {
    durKey: 'razove',
    label: 'Разове відвідування',
    items: [
      { id: 'gym-razove-early', name: '08:00–15:00' },
      { id: 'gym-razove-full',  name: '15:00–21:00' },
    ],
  },
  {
    durKey: '1m',
    label: '1 місяць',
    items: [
      { id: 'gym-1m-early', name: '08:00–15:00', periodLabel: '1 місяць' },
      { id: 'gym-1m-full',  name: '08:00–21:00', periodLabel: '1 місяць' },
    ],
  },
  {
    durKey: '3m',
    label: '3 місяці',
    items: [
      { id: 'gym-3m-early', name: '08:00–15:00', periodLabel: '3 місяці' },
      { id: 'gym-3m-full',  name: '08:00–21:00', periodLabel: '3 місяці' },
    ],
  },
  {
    durKey: '6m',
    label: '6 місяців',
    items: [
      { id: 'gym-6m-early', name: '08:00–15:00', periodLabel: '6 місяців' },
      { id: 'gym-6m-full',  name: '08:00–21:00', periodLabel: '6 місяців' },
    ],
  },
  {
    durKey: '12m',
    label: '12 місяців',
    items: [
      { id: 'gym-12m-early', name: '08:00–15:00', periodLabel: '12 місяців' },
      { id: 'gym-12m-full',  name: '08:00–21:00', periodLabel: '12 місяців' },
    ],
  },
] as const;

const GYM_RECOMMENDED = 'gym-1m-full';

function gymDetails(entry: PaymentEntry, periodLabel?: string): string[] {
  const isRazove = entry.id.includes('razove');
  const slot = entry.sub ?? '';
  if (isRazove) {
    return ['Одне відвідування', `Час роботи: ${slot}`, 'Тренажерний зал + Кросфіт + TRX'];
  }
  return [
    'Безліміт відвідувань',
    periodLabel ? `Термін: ${periodLabel}` : `Термін: ${entry.name}`,
    `Час роботи: ${slot}`,
    'Тренажерний зал + Кросфіт + TRX',
  ];
}

function GymPanel() {
  const [dur, setDur] = useState<GymDur>('1m');
  const byId = Object.fromEntries(payments.map(e => [e.id, e]));
  const group = GYM_GROUPS.find(g => g.durKey === dur)!;
  return (
    <>
      <SubToggle options={GYM_DURATIONS} active={dur} onChange={setDur} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
        {group.items.map(item => {
          const entry = byId[item.id];
          const savings = computeSavings(entry);
          return (
            <PricingCard
              key={item.id}
              name={item.name}
              price={entry.priceUAH}
              periodLabel={item.periodLabel}
              savings={savings}
              details={gymDetails(entry, item.periodLabel)}
              recommended={item.id === GYM_RECOMMENDED}
              entry={entry}
            />
          );
        })}
      </div>
      <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 mt-5 leading-relaxed">
        Безліміт — необмежена кількість відвідувань протягом дії абонементу.
        Економія — відносно щомісячної оплати.
      </p>
    </>
  );
}

// ─── PERSONAL PANEL ───────────────────────────────────────────────────────────
const PERSONAL_TYPES = [
  { key: 'gym', label: 'Тренажерний зал' },
  { key: 'str', label: 'Стретчинг' },
] as const;
type PersonalType = (typeof PERSONAL_TYPES)[number]['key'];

const PERSONAL_GROUPS: readonly {
  type: PersonalType;
  label: string;
  ids: readonly string[];
  recommendedId: string;
}[] = [
  {
    type: 'gym',
    label: 'Тренажерний зал',
    ids: ['pt-gym-razove', 'pt-gym-6', 'pt-gym-8', 'pt-gym-12'],
    recommendedId: 'pt-gym-12',
  },
  {
    type: 'str',
    label: 'Стретчинг · Мобіліті · Пілатес',
    ids: ['pt-str-razove', 'pt-str-6', 'pt-str-8', 'pt-str-12'],
    recommendedId: 'pt-str-12',
  },
] as const;

function personalDetails(entry: PaymentEntry, type: PersonalType): string[] {
  const sub = entry.sub ?? '';
  const location = type === 'gym' ? 'Тренажерний зал' : 'Стретчинг, Мобіліті, Пілатес';
  const isRazove = entry.id.includes('razove');
  if (isRazove) {
    return ['Одне тренування', location, 'Складання плану тренувань', 'Тренер — особисто під вас'];
  }
  const sessMatch = sub.match(/(\d+)/);
  const sessions = sessMatch ? sessMatch[1] : '';
  return [
    `${sessions} персональних тренувань`,
    location,
    'Індивідуальна програма',
    'Тренер під ваші цілі та рівень',
  ];
}

function PersonalPanel() {
  const [type, setType] = useState<PersonalType>('gym');
  const byId = Object.fromEntries(payments.map(e => [e.id, e]));
  const group = PERSONAL_GROUPS.find(g => g.type === type)!;
  return (
    <>
      <SubToggle options={PERSONAL_TYPES} active={type} onChange={setType} />
      <PanelGroup label={group.label}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {group.ids.map(id => {
            const entry = byId[id];
            const savings = computeSavings(entry);
            return (
              <PricingCard
                key={id}
                name={entry.sub ?? entry.name}
                price={entry.priceUAH}
                savings={savings}
                details={personalDetails(entry, group.type)}
                recommended={id === group.recommendedId}
                entry={entry}
              />
            );
          })}
        </div>
      </PanelGroup>
      <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 mt-2">
        При першому тренуванні — знижка 50%. Економія — відносно разового відвідування.
      </p>
    </>
  );
}

// ─── GYM+MOBILITY PANEL ──────────────────────────────────────────────────────
const GM_RECOMMENDED = 'gm-1m';

function GymMobilityPanel() {
  const entries = payments.filter(e => e.group === 'gym-mobility');
  return (
    <>
      <p className="font-body text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-lg">
        Безліміт відвідувань тренажерного залу + 4 заняття Стретчинг&nbsp;&amp;&nbsp;Мобіліті
        щомісяця. Ідеально для тих, хто поєднує силові тренування з гнучкістю.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
        {entries.map(entry => {
          const savings = computeSavings(entry);
          return (
            <PricingCard
              key={entry.id}
              name={entry.name}
              price={entry.priceUAH}
              periodLabel={savings > 0 ? `економія ${savings}% vs щомісячна` : undefined}
              savings={savings}
              details={[
                'Безліміт відвідувань залу',
                '4 заняття Стретчинг + Мобіліті / міс',
                `Термін: ${entry.name}`,
              ]}
              recommended={entry.id === GM_RECOMMENDED}
              entry={entry}
            />
          );
        })}
      </div>
    </>
  );
}

// ─── MASSAGE PANEL ────────────────────────────────────────────────────────────
const MASSAGE_TYPES = [
  { key: 'thai',     label: 'Тайський оздоровчий масаж' },
  { key: 'body',     label: 'Оздоровчий масаж "Все тіло"' },
  { key: 'visceral', label: 'Вісцеральний масаж живота' },
  { key: 'back',     label: 'Масаж спини, комірцевої зони, рук' },
  { key: 'legs',     label: 'Масаж нижньої ділянки тіла і ніг' },
  { key: 'face',     label: 'Міофасціальний масаж обличчя та шиї' },
];

const MS_RECOMMENDED = 'ms-thai-6';

function massageDetails(entry: PaymentEntry, typeLabel: string): string[] {
  const isCourse = entry.id.endsWith('-6');
  if (isCourse) {
    return ['Курс 6 процедур', typeLabel, 'Тривалість ~1 година', 'Запис на зручний час'];
  }
  return ['Разова процедура', typeLabel, 'Тривалість ~1 година'];
}

function MassagePanel() {
  const byId = Object.fromEntries(payments.map(e => [e.id, e]));
  return (
    <>
      {MASSAGE_TYPES.map(type => {
        const single = byId[`ms-${type.key}-1`];
        const course = byId[`ms-${type.key}-6`];
        const courseSav = computeSavings(course);
        return (
          <PanelGroup key={type.key} label={type.label}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
              <PricingCard
                name="Разова процедура"
                price={single.priceUAH}
                details={massageDetails(single, type.label)}
                entry={single}
              />
              <PricingCard
                name="Курс 6 процедур"
                price={course.priceUAH}
                savings={courseSav}
                details={massageDetails(course, type.label)}
                recommended={course.id === MS_RECOMMENDED}
                entry={course}
              />
            </div>
          </PanelGroup>
        );
      })}
      <p className="font-body text-xs text-zinc-400 dark:text-zinc-500 mt-2">
        Тривалість процедур — в середньому 1 година. Запис за телефоном або через форму.
      </p>
    </>
  );
}

// ─── CATEGORY TABS ────────────────────────────────────────────────────────────
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

const PANELS: Record<TabKey, { title: string; badge: string; panel: React.ReactNode }> = {
  'fp':           { title: 'Фітнес+',               badge: 'Групові заняття',      panel: <FpPanel /> },
  'gym':          { title: 'Тренажерний зал',        badge: 'Безліміт відвідувань', panel: <GymPanel /> },
  'personal':     { title: 'Персональні тренування', badge: 'Індивідуально',        panel: <PersonalPanel /> },
  'gym-mobility': { title: 'GYM + Mobility',         badge: 'Зал + Мобіліті',       panel: <GymMobilityPanel /> },
  'massage':      { title: 'Масаж',                  badge: 'Відновлення',          panel: <MassagePanel /> },
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Abonementy() {
  const { dark, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState<TabKey>(() =>
    hashToTab(typeof window !== 'undefined' ? window.location.hash : ''),
  );
  const pricingRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const h = () => setActiveTab(hashToTab(window.location.hash));
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);

  useEffect(() => {
    if (window.location.hash) setActiveTab(hashToTab(window.location.hash));
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

      {/* Page header — eyebrow → title → subline (not sticky) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
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

      {/* Sticky category tab bar — sits below the header text on scroll */}
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

      <ScrollDots activeTab={activeTab} onSwitch={switchTab} pricingRef={pricingRef} />

      <main ref={pricingRef} className="max-w-7xl mx-auto px-4 md:px-8 pb-24 md:pb-16">
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
