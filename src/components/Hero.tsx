import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'

const stats = [
  { value: 500, suffix: '+', label: 'учасників' },
  { value: 12,  suffix: '+', label: 'напрямків'  },
  { value: 8,   suffix: '',  label: 'тренерів'   },
  { value: 20,  suffix: '',  label: 'років досвіду' },
]

function StatItem({ value, suffix, label }: typeof stats[0]) {
  const { ref, count } = useCountUp(value)
  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display font-bold text-accent leading-none"
            style={{ fontSize: 'clamp(44px, 5.5vw, 64px)' }}>
        {count}{suffix}
      </span>
      <span className="font-body font-light text-[14px] uppercase tracking-[0.08em] text-white/45 mt-1 whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}

const gradientOverlay = `
  linear-gradient(to right,
    rgba(10,10,10,0.95) 0%,
    rgba(10,10,10,0.85) 25%,
    rgba(10,10,10,0.55) 45%,
    rgba(10,10,10,0.15) 65%,
    rgba(10,10,10,0.00) 100%
  ),
  linear-gradient(to top,
    rgba(10,10,10,0.70) 0%,
    rgba(10,10,10,0.00) 30%
  ),
  linear-gradient(to bottom,
    rgba(10,10,10,0.55) 0%,
    rgba(10,10,10,0.00) 18%
  )
`

export default function Hero() {
  return (
    <>
      {/* ── DESKTOP hero (md+) ── */}
      <section className="relative min-h-[100dvh] overflow-hidden hidden md:flex md:items-start">
        {/* Background image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-final-test.webp')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1]" style={{ background: gradientOverlay }} />
        {/* Content */}
        <div className="relative z-10 w-full max-w-[820px] pl-[clamp(20px,6vw,96px)] pr-4 pt-[120px] pb-[80px]">
          {/* Brand block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-6"
          >
            <p className="font-display font-bold text-white leading-none"
               style={{ fontSize: 'clamp(34px, 4.5vw, 60px)' }}>
              ФІТНЕС-КЛУБ FOREVER
            </p>
            <p className="font-body font-medium text-white mt-2"
               style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>
              Львів, центр · вул. Зелена 20
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="font-display text-white"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(64px, 8vw, 120px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}
          >
            <span className="hero-headline-line" style={{ display: 'block', whiteSpace: 'nowrap', color: '#E8279A' }}>ТРЕНУЙСЯ</span>
            <span className="hero-headline-line" style={{ display: 'block', whiteSpace: 'nowrap', color: '#E8279A' }}>ТУТ І ЗАРАЗ!</span>
          </motion.h1>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
            className="flex flex-row gap-3 mb-10 flex-wrap"
          >
            <a href="#membership"
               className="font-display font-semibold text-[18px] tracking-[0.04em] bg-accent text-white px-8 py-4 whitespace-nowrap transition-all duration-200 hover:bg-pink-700 hover:scale-[1.02]">
              АБОНЕМЕНТИ
            </a>
            <a href="#schedule"
               className="font-display font-medium text-[18px] tracking-[0.04em] text-white px-8 py-4 whitespace-nowrap transition-all duration-200 hover:bg-white/10"
               style={{ border: '1.5px solid rgba(255,255,255,0.45)' }}>
              РОЗКЛАД
            </a>
            <a href="tel:+380737781008"
               className="font-display font-medium text-[18px] tracking-[0.02em] text-white px-6 py-4 whitespace-nowrap transition-all duration-200 hover:bg-white/10 inline-flex items-center gap-2"
               style={{ border: '1.5px solid rgba(255,255,255,0.45)' }}>
              <Phone className="w-4 h-4" />
              073 778 10 08
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-[clamp(16px,3vw,40px)] items-start flex-wrap md:flex-nowrap"
          >
            {stats.map((stat, i) => (
              <Fragment key={stat.label}>
                <StatItem {...stat} />
                {i < stats.length - 1 && (
                  <div
                    className="hidden md:block w-px h-10 self-center"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  />
                )}
              </Fragment>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── MOBILE hero (< md) ── */}
      <section className="md:hidden flex flex-col">
        {/* Text panel */}
        <div
          className="flex flex-col justify-center px-5 pt-[80px] pb-8"
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #161616 50%, #0a0a0a 100%)' }}
        >
          {/* Brand block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-6"
          >
            <p className="font-display font-bold text-white leading-none"
               style={{ fontSize: 'clamp(34px, 4.5vw, 60px)' }}>
              ФІТНЕС-КЛУБ FOREVER
            </p>
            <p className="font-body font-medium text-white mt-2"
               style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>
              Львів, центр · вул. Зелена 20
            </p>
          </motion.div>

          {/* Headline — teal on mobile */}
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="font-display text-white"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(44px, 12vw, 96px)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}
          >
            <span className="hero-headline-line" style={{ display: 'block', whiteSpace: 'nowrap', color: '#E8279A' }}>ТРЕНУЙСЯ</span>
            <span className="hero-headline-line" style={{ display: 'block', whiteSpace: 'nowrap', color: '#E8279A' }}>ТУТ І ЗАРАЗ!</span>
          </motion.h1>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
            className="flex flex-row gap-3 flex-wrap"
          >
            <a href="#membership"
               className="font-display font-semibold text-[18px] tracking-[0.04em] bg-accent text-white px-8 py-4 whitespace-nowrap transition-all duration-200 hover:bg-pink-700">
              АБОНЕМЕНТИ
            </a>
            <a href="#schedule"
               className="font-display font-medium text-[18px] tracking-[0.04em] text-white px-8 py-4 whitespace-nowrap transition-all duration-200 hover:bg-white/10"
               style={{ border: '1.5px solid rgba(255,255,255,0.45)' }}>
              РОЗКЛАД
            </a>
            <a href="tel:+380737781008"
               className="font-display font-medium text-[18px] tracking-[0.02em] text-white px-6 py-4 whitespace-nowrap transition-all duration-200 hover:bg-white/10 inline-flex items-center gap-2"
               style={{ border: '1.5px solid rgba(255,255,255,0.45)' }}>
              <Phone className="w-4 h-4" />
              073 778 10 08
            </a>
          </motion.div>
        </div>

        {/* Photo panel */}
        <div
          className="w-full"
          style={{
            aspectRatio: '4/5',
            backgroundImage: "url('/mobile-hero-final.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%'
          }}
        />

        {/* Stats under photo */}
        <div className="bg-zinc-950 px-5 py-8">
          <div className="grid grid-cols-2 gap-6">
            {stats.map(s => <StatItem key={s.label} {...s} />)}
          </div>
        </div>
      </section>
    </>
  )
}
