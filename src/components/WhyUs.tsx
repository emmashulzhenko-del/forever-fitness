import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dumbbell, Award, Activity, Heart, X } from 'lucide-react'

const advantages = [
  {
    icon: Dumbbell,
    title: 'Автентичний лофт',
    subtitle: 'Тренажерний зал',
    teaser: 'Сучасне обладнання у просторі справжнього лофту з видом на історичний Львів',
    photo: '/whyus/loft-final.webp',
    photoAlt: 'Автентичний лофт тренажерного залу Forever у Львові',
    variant: 'neutral' as const,
    expanded: {
      heading: 'Три формати тренувань у залі',
      items: [
        {
          title: 'Персональний тренер',
          body: 'Індивідуальний підхід, складання програми, контроль техніки, аналіз результатів. Від 320 грн/заняття при оплаті курсу з 12 тренувань.'
        },
        {
          title: 'Черговий тренер',
          body: 'Разове силове тренування з тренером — 200 грн за наявності абонементу або разової оплати залу.'
        },
        {
          title: 'Самостійні тренування',
          body: 'Усі три зони залу — лофт 80м², Cross Fire 70м², кардіо-зона 100м² — доступні за абонементом. Безліміт або за відвідуваннями.'
        }
      ] as { title: string; body: string }[],
      body: undefined as string | undefined,
      stats: undefined as { value: string; label: string }[] | undefined,
      services: undefined as { name: string; price: string; course: string }[] | undefined,
    }
  },
  {
    icon: Award,
    title: 'Від 2006 року',
    subtitle: 'Сталість — ознака майстерності',
    teaser: '20 років допомагаємо людям розкрити і розвинути життєву силу. Професійна команда тренерів.',
    photo: null,
    photoAlt: '',
    variant: 'teal' as const,
    expanded: {
      heading: 'Наша історія',
      body: 'Фітнес-клуб Forever працює у центрі Львова з 2006 року. За цей час ми сформували команду з 8 досвідчених тренерів, обладнали три залі сучасним обладнанням InterAtletika, і допомогли тисячам учасників розкрити свою життєву силу. Ми — серед найстаріших фітнес-клубів Львова, і це не випадковість: ми робимо ставку на якість, а не на тренди. Наші учасники залишаються з нами роками, тому що бачать результат.',
      stats: [
        { value: '20+', label: 'років роботи' },
        { value: '500+', label: 'активних учасників' },
        { value: '8', label: 'тренерів у команді' }
      ],
      items: undefined as { title: string; body: string }[] | undefined,
      services: undefined as { name: string; price: string; course: string }[] | undefined,
    }
  },
  {
    icon: Activity,
    title: 'Ефективні фітнес-групи',
    subtitle: 'Підносять емоційний стан',
    teaser: 'HIIT, Флай Йога, TRX, Джампінг, ТАБАТА, Хатха Йога, Стретчинг — обери своє',
    photo: null,
    photoAlt: '',
    variant: 'pink' as const,
    expanded: {
      heading: 'Усі наші напрямки',
      items: [
        { title: 'HIIT', body: 'Високоінтенсивне інтервальне тренування — суперсети для спалення зайвої ваги, підвищення витривалості і сили.' },
        { title: 'Флай Йога', body: 'Декомпресійна Йога Терапія. Коректне підсилення "м\'язового корсету", розвиток гнучкості.' },
        { title: 'TRX Тренінг', body: 'Функціональне тренування на петлях TRX — сила, стрункість, витривалість.' },
        { title: 'Джампінг', body: 'Драйвове кардіо на батутах для гарних ніжок, стрункості, піднесеного настрою.' },
        { title: 'ТАБАТА', body: 'Інтервальне функціональне тренування. Інтенсивне схуднення і виховання витривалості.' },
        { title: 'Хатха Йога', body: 'Класичні практики для зміцнення і гармонії тіла і духу, зцілення нервової системи через дихання — Пранаями.' },
        { title: 'Стретчинг + Мобіліті', body: 'Гнучкість, мобільність, грація та повне відновлення м\'язів після навантажень.' },
        { title: 'Пілатес + Фітбол', body: 'Зміцнення кору та корекція постави з використанням великих фітнес-м\'ячів.' }
      ] as { title: string; body: string }[],
      body: undefined as string | undefined,
      stats: undefined as { value: string; label: string }[] | undefined,
      services: undefined as { name: string; price: string; course: string }[] | undefined,
    }
  },
  {
    icon: Heart,
    title: 'Масаж і кінезіотерапія',
    subtitle: 'Повноцінне відновлення',
    teaser: 'Корекція дисбалансів рухового апарату. Найефективніші методики. Професійні фізіотерапевти.',
    photo: null,
    photoAlt: '',
    variant: 'neutral' as const,
    expanded: {
      heading: 'Чому масаж у Forever',
      body: 'Наші фізіотерапевти та реабілітологи допомагають відновитися після травм, скорегувати дисбаланси рухового апарату, зняти м\'язові затиски та повернути свободу рухів. Ми працюємо за методом оздоровчої масажної терапії — кожна процедура триває в середньому 1 годину.',
      services: [
        { name: 'Тайський оздоровчий масаж', price: '1 450 грн', course: '1 250 грн (курс 6+ процедур)' },
        { name: 'Оздоровчий масаж "Все тіло"', price: '1 350 грн', course: '1 200 грн (курс 6+)' },
        { name: 'Вісцеральний масаж живота', price: '900 грн', course: '800 грн (курс 6+)' },
        { name: 'Масаж спини, комірцевої зони', price: '900 грн', course: '800 грн (курс 6+)' },
        { name: 'Міофасціальний масаж обличчя', price: '1 000 грн', course: '900 грн (курс 6+)' }
      ],
      items: undefined as { title: string; body: string }[] | undefined,
      stats: undefined as { value: string; label: string }[] | undefined,
    }
  }
]

// Bento layout: row1 = [0=wide loft, 1=narrow teal], row2 = [2=narrow pink, 3=wide massage]
const wideIndices = new Set([0, 3])

export default function WhyUs() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900 px-[clamp(20px,6vw,96px)]">
      <h2 className="font-display text-[clamp(32px,5vw,56px)] text-center text-zinc-900 dark:text-white mb-2">
        ЧОМУ ОБИРАЮТЬ НАС
      </h2>
      <p className="font-body font-light text-center text-zinc-500 dark:text-zinc-400 mb-2 text-lg">
        20 років поспіль ми ГАРТУЄМО Здорову Націю
      </p>
      <p className="font-body font-light text-center text-zinc-500 dark:text-zinc-400 mb-12">
        Пробуджуємо силу. Відновлюємо здоров'я. Надихаємо на життя.
      </p>

      {/* Bento grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {advantages.map((adv, i) => {
          const Icon = adv.icon
          const isActive = active === i
          const isWide = wideIndices.has(i)
          const isPink = adv.variant === 'pink'
          const isTeal = adv.variant === 'teal'
          const isColored = isPink || isTeal

          const cardBg = isPink
            ? 'bg-accent border-accent'
            : isTeal
            ? 'bg-teal border-teal'
            : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'

          const cardHover = isColored
            ? 'hover:opacity-90'
            : 'hover:border-accent'

          const titleColor = isColored ? 'text-white' : 'text-zinc-900 dark:text-white'
          const subtitleColor = isColored ? 'text-white/70' : 'text-zinc-500 dark:text-zinc-400'
          const teaserColor = isColored ? 'text-white/80' : 'text-zinc-500 dark:text-zinc-400'
          // Icon badge
          const iconBadgeBg = isPink
            ? 'bg-white'
            : isTeal
            ? 'bg-white'
            : 'bg-accent'
          const iconColor = isPink
            ? 'text-accent'
            : isTeal
            ? 'text-teal'
            : 'text-white'

          return (
            <div
              key={adv.title}
              onClick={() => setActive(isActive ? null : i)}
              className={`cursor-pointer border transition-colors overflow-hidden flex flex-col ${
                isWide ? 'lg:col-span-2' : 'lg:col-span-1'
              } ${cardBg} ${
                isActive && !isColored ? 'border-accent' : ''
              } ${cardHover}`}
            >
              {/* Photo (loft card only) */}
              {adv.photo && (
                <div className="w-full aspect-[3/2] overflow-hidden">
                  <img
                    src={adv.photo}
                    alt={adv.photoAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}

              {/* Text content */}
              <div className={`p-6 flex flex-col flex-1 ${!adv.photo ? 'justify-center' : ''}`}>
                {/* Icon badge */}
                <div className={`w-10 h-10 rounded-full ${iconBadgeBg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className={`text-[11px] tracking-[0.1em] uppercase mb-1 font-body ${subtitleColor}`}>
                  {adv.subtitle}
                </div>
                <h3 className={`font-display font-semibold text-xl mb-3 ${titleColor}`}>
                  {adv.title}
                </h3>
                <p className={`font-body font-light text-sm leading-relaxed mb-3 ${teaserColor}`}>
                  {adv.teaser}
                </p>
                {isTeal && (
                  <div className="flex flex-col gap-2 mt-4">
                    <a href="#schedule" onClick={e => e.stopPropagation()}
                       className="font-display font-semibold text-sm text-white underline underline-offset-4 hover:no-underline">
                      ЗАПИСАТИСЬ ЗАРАЗ →
                    </a>
                    <a href="#membership" onClick={e => e.stopPropagation()}
                       className="font-display font-semibold text-sm text-white underline underline-offset-4 hover:no-underline">
                      Перше тренування −50% →
                    </a>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Expanded content panel */}
      <AnimatePresence mode="wait">
        {active !== null && (
          <motion.div
            key={active}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden max-w-6xl mx-auto"
          >
            <div className="mt-6 p-8 bg-white dark:bg-zinc-800 border border-accent/30 relative">
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-accent"
                aria-label="Закрити"
              >
                <X className="w-5 h-5" />
              </button>
              <h4 className="font-display text-2xl text-zinc-900 dark:text-white mb-4">
                {advantages[active].expanded.heading}
              </h4>

              {advantages[active].expanded.body && (
                <p className="font-body font-light text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-3xl mb-4">
                  {advantages[active].expanded.body}
                </p>
              )}

              {advantages[active].expanded.items && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {advantages[active].expanded.items!.map(item => (
                    <div key={item.title}>
                      <p className="font-display font-semibold text-base text-zinc-900 dark:text-white mb-1">{item.title}</p>
                      <p className="font-body font-light text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {advantages[active].expanded.stats && (
                <div className="flex gap-8 mt-4 flex-wrap">
                  {advantages[active].expanded.stats!.map(s => (
                    <div key={s.label}>
                      <div className="font-display text-3xl text-accent font-bold">{s.value}</div>
                      <div className="font-body text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {advantages[active].expanded.services && (
                <div className="divide-y divide-zinc-100 dark:divide-zinc-700">
                  {advantages[active].expanded.services!.map(s => (
                    <div key={s.name} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                      <p className="font-body font-medium text-sm text-zinc-900 dark:text-white">{s.name}</p>
                      <div className="flex gap-4 text-sm">
                        <span className="font-body font-semibold text-accent">{s.price}</span>
                        <span className="font-body font-light text-zinc-400">{s.course}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
