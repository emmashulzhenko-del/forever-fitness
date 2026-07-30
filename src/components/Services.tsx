import { Dumbbell, Users, User, Heart, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Dumbbell,
    title: 'ТРЕНАЖЕРНИЙ ЗАЛ',
    photo: '/services/gym.webp',
    photoAlt: 'Тренажерний зал Forever — автентичний лофт',
    links: [
      { label: 'Абонементи', href: '/abonementy#gym' },
      { label: 'Розклад', href: '#schedule-gym' },
    ],
  },
  {
    icon: Users,
    title: 'ФІТНЕС ГРУПИ',
    photo: '/services/fitness.webp',
    photoAlt: 'Групові фітнес-заняття Forever',
    links: [
      { label: 'Абонементи', href: '/abonementy#fp' },
      { label: 'Розклад', href: '#schedule-fitness' },
    ],
  },
  {
    icon: User,
    title: 'ПЕРСОНАЛЬНІ ТРЕНУВАННЯ',
    photo: '/services/personal.webp',
    photoAlt: 'Персональні тренування з тренером Forever',
    links: [
      { label: 'Абонементи', href: '/abonementy#personal' },
      { label: 'Тренери', href: '#trainers' },
    ],
  },
  {
    icon: Heart,
    title: 'МАСАЖ, КІНЕЗІОТЕРАПІЯ',
    photo: '/services/massage.webp',
    photoAlt: 'Масаж і кінезіотерапія у Forever',
    links: [
      { label: 'Абонементи', href: '/abonementy#massage' },
      { label: 'Записатись на масаж', href: 'tel:+380737781008' },
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 px-[clamp(20px,6vw,96px)] bg-white dark:bg-zinc-950">
      <h2 className="font-display font-bold text-[clamp(36px,5.5vw,64px)] text-center text-zinc-900 dark:text-white mb-3">
        ОБЕРИ ПОСЛУГУ
      </h2>
      <p className="font-body text-center text-zinc-500 dark:text-zinc-400 mb-12 text-lg">
        Твій фітнес-простір в серці Львова. Тут лише те, що веде до результату.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-accent border border-accent hover:border-zinc-900 dark:hover:border-white transition-colors flex flex-col overflow-hidden group"
          >
            {/* Icon + title */}
            <div className="flex items-center gap-3 p-5">
              <div className="w-11 h-11 border border-white flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg text-white leading-tight">
                {s.title}
              </h3>
            </div>

            {/* Photo */}
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={s.photo}
                alt={s.photoAlt}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Links */}
            <div className="flex flex-col p-5 gap-3 mt-auto">
              {s.links.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="flex items-center justify-between font-display font-medium text-sm text-white hover:text-zinc-900 transition-colors uppercase tracking-wide border-b border-white/30 pb-2"
                >
                  {l.label}
                  <ArrowRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
