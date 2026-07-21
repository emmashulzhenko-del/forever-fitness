import { MapPin, Phone, Mail, Clock, Camera, Globe } from 'lucide-react';

const navLinks = ['Головна', 'Тренери', 'Розклад', 'Абонементи', 'Програми', 'Масаж', 'Контакти'];

const contacts = [
  { icon: MapPin, text: 'м. Львів, вул. Зелена, 20' },
  { icon: Phone, text: '+38 (067) 149 69 30' },
  { icon: Mail, text: 'fitness_forever@ukr.net' },
  { icon: Clock, text: 'Пн–Сб: 8:00–21:00' },
];

const navHrefs: Record<string, string> = {
  'Головна': '#',
  'Тренери': '#trainers',
  'Розклад': '#schedule',
  'Абонементи': '#membership',
  'Програми': '#programs',
  'Масаж': '#massage',
  'Контакти': '#footer',
};

export default function Footer() {
  return (
    <footer id="footer" className="bg-zinc-950 border-t border-zinc-800 pt-16 pb-[calc(2rem+68px)] md:pb-8" style={{ paddingLeft: 'clamp(16px, 6vw, 80px)', paddingRight: 'clamp(16px, 6vw, 80px)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Col 1 — Brand */}
          <div>
            <img
              src="/logo-ff-final.png"
              alt="Фітнес Клуб Forever"
              className="h-12 w-auto mb-4"
              loading="lazy"
              decoding="async"
            />
            <p className="font-body font-light text-zinc-500 text-sm leading-relaxed max-w-xs">
              Фітнес-клуб у центрі Львова з 2006 року. Тренажерний зал, групові фітнес-заняття, йога, масаж та персональні тренування.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/fitnesslvivforever" target="_blank" rel="noopener noreferrer">
                <Camera size={20} className="text-zinc-500 hover:text-accent transition-colors cursor-pointer" />
              </a>
              <a href="https://www.facebook.com/gymfitnessyoga" target="_blank" rel="noopener noreferrer">
                <Globe size={20} className="text-zinc-500 hover:text-accent transition-colors cursor-pointer" />
              </a>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="font-display text-white text-base tracking-widest mb-4">НАВІГАЦІЯ</p>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link}>
                  <a
                    href={navHrefs[link] || '#'}
                    className="font-body font-light text-sm text-zinc-500 hover:text-accent transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contacts */}
          <div>
            <p className="font-display text-white text-base tracking-widest mb-4">КОНТАКТИ</p>
            <ul className="space-y-3">
              {contacts.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={i} className="flex items-start gap-2">
                    <Icon size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="font-body font-light text-sm text-zinc-400">{c.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-wrap justify-between gap-4">
          <p className="font-body font-light text-zinc-600 text-xs">
            © 2006–2025 Фітнес Клуб Forever. Всі права захищені.
          </p>
          <p className="font-body font-light text-zinc-600 text-xs">
            Розроблено для конверсій
          </p>
        </div>
      </div>
    </footer>
  );
}
