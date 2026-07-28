export type PaymentGroup =
  | 'fitness-plus'
  | 'gym'
  | 'gym-mobility'
  | 'personal'
  | 'massage';

export interface PaymentEntry {
  id: string;
  group: PaymentGroup;
  name: string;
  /** Displayed sub-label (e.g. time slot, session count, package size) */
  sub?: string;
  priceUAH: number;
  url: string | null;
  /** true = no monobank link; show phone fallback */
  noLink?: true;
}

const BASE = 'https://pay.mbnk.biz/';

const p = (id: string): string => BASE + id;

export const payments: PaymentEntry[] = [
  // ─── ФІТНЕС+ ────────────────────────────────────────────────────────────────
  // Разове — single shared link for all columns (same 400 ₴)
  {
    id: 'fp-razove',
    group: 'fitness-plus',
    name: 'Разове відвідування',
    priceUAH: 400,
    url: p('2Mv_Wm-bBKVF'),
  },
  // 1 міс
  {
    id: 'fp-1m-8',
    group: 'fitness-plus',
    name: '1 місяць · 8 тренувань',
    priceUAH: 2000,
    url: p('hFROMehPyWKp'),
  },
  {
    id: 'fp-1m-12',
    group: 'fitness-plus',
    name: '1 місяць · 12 тренувань',
    priceUAH: 2700,
    url: p('Lo6ah2NXcgDC'),
  },
  {
    id: 'fp-1m-16',
    group: 'fitness-plus',
    name: '1 місяць · 16 тренувань',
    priceUAH: 3200,
    url: p('A0QuqGckJ4Zk'),
  },
  {
    id: 'fp-1m-unlim',
    group: 'fitness-plus',
    name: '1 місяць · Безліміт',
    priceUAH: 4000,
    url: p('zPmWn9nHl3YZ'),
  },
  // 3 міс
  {
    id: 'fp-3m-8',
    group: 'fitness-plus',
    name: '3 місяці · 8 тренувань',
    priceUAH: 5700,
    url: p('hZO2TW4Pfm4l'),
  },
  {
    id: 'fp-3m-12',
    group: 'fitness-plus',
    name: '3 місяці · 12 тренувань',
    priceUAH: 7695,
    url: p('8QrLTyGajT_Y'),
  },
  {
    id: 'fp-3m-16',
    group: 'fitness-plus',
    name: '3 місяці · 16 тренувань',
    priceUAH: 9120,
    url: p('tGifYzS9AV1k'),
  },
  {
    id: 'fp-3m-unlim',
    group: 'fitness-plus',
    name: '3 місяці · Безліміт',
    priceUAH: 11400,
    url: p('kpYY-0RJIO4f'),
  },
  // 6 міс
  {
    id: 'fp-6m-8',
    group: 'fitness-plus',
    name: '6 місяців · 8 тренувань',
    priceUAH: 11160,
    url: p('5O2rC8MKBmSW'),
  },
  {
    id: 'fp-6m-12',
    group: 'fitness-plus',
    name: '6 місяців · 12 тренувань',
    priceUAH: 15060,
    url: p('618CzQTvtyYG'),
  },
  {
    id: 'fp-6m-16',
    group: 'fitness-plus',
    name: '6 місяців · 16 тренувань',
    priceUAH: 17850,
    url: p('n-RIY5G5-sV5'),
  },
  {
    id: 'fp-6m-unlim',
    group: 'fitness-plus',
    name: '6 місяців · Безліміт',
    priceUAH: 22320,
    url: p('8YkukUAH54-D'),
  },
  // 12 міс
  {
    id: 'fp-12m-8',
    group: 'fitness-plus',
    name: '12 місяців · 8 тренувань',
    priceUAH: 21600,
    url: p('50cUfTETKKr4'),
  },
  {
    id: 'fp-12m-12',
    group: 'fitness-plus',
    name: '12 місяців · 12 тренувань',
    priceUAH: 29160,
    url: p('lY0kkPSNi59y'),
  },
  {
    id: 'fp-12m-16',
    group: 'fitness-plus',
    name: '12 місяців · 16 тренувань',
    priceUAH: 34560,
    url: p('DyOuw-ZaimTb'),
  },
  {
    id: 'fp-12m-unlim',
    group: 'fitness-plus',
    name: '12 місяців · Безліміт',
    priceUAH: 43200,
    url: p('bdI1G8BhiJeJ'),
  },

  // ─── ТРЕНАЖЕРНИЙ ЗАЛ ────────────────────────────────────────────────────────
  {
    id: 'gym-razove-early',
    group: 'gym',
    name: 'Разове відвідування',
    sub: '08:00–15:00',
    priceUAH: 250,
    url: p('E_I79lt0MFO8'),
  },
  {
    id: 'gym-razove-full',
    group: 'gym',
    name: 'Разове відвідування',
    sub: '15:00–21:00',
    priceUAH: 300,
    url: p('yqhQB0d7l4mM'),
  },
  {
    id: 'gym-1m-early',
    group: 'gym',
    name: '1 місяць',
    sub: '08:00–15:00',
    priceUAH: 990,
    url: p('EAnw9oJFHJUR'),
  },
  {
    id: 'gym-1m-full',
    group: 'gym',
    name: '1 місяць',
    sub: '08:00–21:00',
    priceUAH: 1100,
    url: p('hlloI5zh1BVu'),
  },
  {
    id: 'gym-3m-early',
    group: 'gym',
    name: '3 місяці',
    sub: '08:00–15:00',
    priceUAH: 2820,
    url: p('4TZbZeMpYw_D'),
  },
  {
    id: 'gym-3m-full',
    group: 'gym',
    name: '3 місяці',
    sub: '08:00–21:00',
    priceUAH: 3135,
    url: p('nt5TndjY5nAn'),
  },
  {
    id: 'gym-6m-early',
    group: 'gym',
    name: '6 місяців',
    sub: '08:00–15:00',
    priceUAH: 5580,
    url: p('ZvGbKdQXxj7T'),
  },
  {
    id: 'gym-6m-full',
    group: 'gym',
    name: '6 місяців',
    sub: '08:00–21:00',
    priceUAH: 6200,
    url: p('v7ibuD1Ghto1'),
  },
  {
    id: 'gym-12m-early',
    group: 'gym',
    name: '12 місяців',
    sub: '08:00–15:00',
    priceUAH: 10800,
    url: p('Z4ZVy0FtPdaM'),
  },
  {
    id: 'gym-12m-full',
    group: 'gym',
    name: '12 місяців',
    sub: '08:00–21:00',
    priceUAH: 12000,
    url: p('BYO3qVvFV6cM'),
  },

  // ─── GYM + MOBILITY ─────────────────────────────────────────────────────────
  {
    id: 'gm-1m',
    group: 'gym-mobility',
    name: '1 місяць',
    priceUAH: 1900,
    url: p('9C02yuDlporl'),
  },
  {
    id: 'gm-3m',
    group: 'gym-mobility',
    name: '3 місяці',
    priceUAH: 5415,
    url: null,
    noLink: true,
  },
  {
    id: 'gm-6m',
    group: 'gym-mobility',
    name: '6 місяців',
    priceUAH: 10602,
    url: null,
    noLink: true,
  },

  // ─── ПЕРСОНАЛЬНІ — Тренажерний зал ──────────────────────────────────────────
  {
    id: 'pt-gym-razove',
    group: 'personal',
    name: 'Персональне тренування · Тренажерний зал',
    sub: 'Разове',
    priceUAH: 400,
    url: p('iC3zSn4Vv548'),
  },
  {
    id: 'pt-gym-6',
    group: 'personal',
    name: 'Персональне тренування · Тренажерний зал',
    sub: 'Пакет 6 занять',
    priceUAH: 2100,
    url: p('YOGml9W3ZoBB'),
  },
  {
    id: 'pt-gym-8',
    group: 'personal',
    name: 'Персональне тренування · Тренажерний зал',
    sub: 'Пакет 8 занять',
    priceUAH: 2800,
    url: p('yx48VMwI_qIy'),
  },
  {
    id: 'pt-gym-12',
    group: 'personal',
    name: 'Персональне тренування · Тренажерний зал',
    sub: 'Пакет 12 занять',
    priceUAH: 3840,
    url: p('zSIq5Cxh06UC'),
  },

  // ─── ПЕРСОНАЛЬНІ — Стретчинг / Мобіліті / Пілатес ──────────────────────────
  {
    id: 'pt-str-razove',
    group: 'personal',
    name: 'Персональне тренування · Стретчинг, Мобіліті, Пілатес',
    sub: 'Разове',
    priceUAH: 450,
    url: p('wZ9MjRhN19X5'),
  },
  {
    id: 'pt-str-6',
    group: 'personal',
    name: 'Персональне тренування · Стретчинг, Мобіліті, Пілатес',
    sub: 'Пакет 6 занять',
    priceUAH: 2400,
    url: p('6CfoJnHJgiJb'),
  },
  {
    id: 'pt-str-8',
    group: 'personal',
    name: 'Персональне тренування · Стретчинг, Мобіліті, Пілатес',
    sub: 'Пакет 8 занять',
    priceUAH: 3200,
    url: p('TOx7KO7pZQfv'),
  },
  {
    id: 'pt-str-12',
    group: 'personal',
    name: 'Персональне тренування · Стретчинг, Мобіліті, Пілатес',
    sub: 'Пакет 12 занять',
    priceUAH: 4200,
    url: p('OP8EDeuI1sYG'),
  },

  // ─── МАСАЖ ──────────────────────────────────────────────────────────────────
  {
    id: 'ms-thai-1',
    group: 'massage',
    name: 'Тайський оздоровчий масаж',
    sub: 'Разова процедура',
    priceUAH: 1450,
    url: p('SvA8G1CdCw3t'),
  },
  {
    id: 'ms-thai-6',
    group: 'massage',
    name: 'Тайський оздоровчий масаж',
    sub: 'Курс 6 процедур',
    priceUAH: 7500,
    url: p('t2xvKYuSazcI'),
  },
  {
    id: 'ms-body-1',
    group: 'massage',
    name: 'Оздоровчий масаж "Все тіло"',
    sub: 'Разова процедура',
    priceUAH: 1350,
    url: p('ucXXEV98Ex6q'),
  },
  {
    id: 'ms-body-6',
    group: 'massage',
    name: 'Оздоровчий масаж "Все тіло"',
    sub: 'Курс 6 процедур',
    priceUAH: 7200,
    url: p('HZ9e_1IxIaBO'),
  },
  {
    id: 'ms-visceral-1',
    group: 'massage',
    name: 'Вісцеральний масаж живота',
    sub: 'Разова процедура',
    priceUAH: 900,
    url: p('Isgl1DNB3xAQ'),
  },
  {
    id: 'ms-visceral-6',
    group: 'massage',
    name: 'Вісцеральний масаж живота',
    sub: 'Курс 6 процедур',
    priceUAH: 4800,
    url: null,
    noLink: true,
  },
  {
    id: 'ms-back-1',
    group: 'massage',
    name: 'Масаж спини, комірцевої зони, рук',
    sub: 'Разова процедура',
    priceUAH: 900,
    url: null,
    noLink: true,
  },
  {
    id: 'ms-back-6',
    group: 'massage',
    name: 'Масаж спини, комірцевої зони, рук',
    sub: 'Курс 6 процедур',
    priceUAH: 4800,
    url: p('G7cRJCKWwvLN'),
  },
  {
    id: 'ms-legs-1',
    group: 'massage',
    name: 'Масаж нижньої ділянки тіла і ніг',
    sub: 'Разова процедура',
    priceUAH: 900,
    url: p('vfRSwFjan0f3'),
  },
  {
    id: 'ms-legs-6',
    group: 'massage',
    name: 'Масаж нижньої ділянки тіла і ніг',
    sub: 'Курс 6 процедур',
    priceUAH: 4800,
    url: p('LmROwzA6NK96'),
  },
  {
    id: 'ms-face-1',
    group: 'massage',
    name: 'Міофасціальний масаж обличчя та шиї',
    sub: 'Разова процедура',
    priceUAH: 1000,
    url: p('Z2AsI4Dj8Gl2'),
  },
  {
    id: 'ms-face-6',
    group: 'massage',
    name: 'Міофасціальний масаж обличчя та шиї',
    sub: 'Курс 6 процедур',
    priceUAH: 5400,
    url: null,
    noLink: true,
  },
];

/** Format price as "2 000 ₴" */
export function fmtPrice(uah: number): string {
  return uah.toLocaleString('uk-UA').replace(/\s/g, '\u00a0') + '\u00a0₴';
}
