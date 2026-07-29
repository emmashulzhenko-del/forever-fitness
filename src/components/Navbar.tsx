import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface Props {
  dark: boolean;
  onToggleTheme: () => void;
}

const links = [
  { label: 'Головна', href: '/' },
  { label: 'Тренери', href: '/#trainers' },
  {
    label: 'Розклад', href: '/#schedule',
    sub: [
      { label: 'Тренажерний зал', href: '/#schedule-gym' },
      { label: 'Фітнес-групи', href: '/#schedule-groups' },
    ],
  },
  {
    label: 'Абонементи', href: '/abonementy',
    sub: [
      { label: 'Тренажерний зал', href: '/abonementy#gym' },
      { label: 'Фітнес+', href: '/abonementy#fp' },
      { label: 'GYM + Mobility', href: '/abonementy#gym-mobility' },
      { label: 'Персональні', href: '/abonementy#personal' },
      { label: 'Масаж', href: '/abonementy#massage' },
    ],
  },
  { label: 'Контакти', href: '/#footer' },
] as const;

export default function Navbar({ dark, onToggleTheme }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  function openMenu() {
    setExpandedItem(null); // always start collapsed
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleSub(label: string) {
    // one open at a time: setting a new label closes the previous
    setExpandedItem(prev => (prev === label ? null : label));
  }

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="sticky top-0 z-50 h-[68px] flex items-center bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800"
        style={{ padding: '0 clamp(16px, 5vw, 80px)' }}
      >
        {/* Logo */}
        <a href="/" aria-label="Фітнес Клуб Forever — головна" className="mr-8 flex-shrink-0">
          <img
            src="/logo-ff-final.png"
            alt="Фітнес Клуб Forever — Львів, вул. Зелена 20"
            className="h-10 md:h-11 w-auto"
            loading="eager"
            decoding="async"
          />
        </a>

        {/* Center nav — desktop only, untouched */}
        <nav className="hidden md:flex gap-7 flex-1 justify-center">
          {links.map(link => {
            const sub = 'sub' in link ? link.sub : undefined;
            if (!sub) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  {link.label}
                </a>
              );
            }
            return (
              <div key={link.label} className="relative group">
                <a
                  href={link.href}
                  className="font-body text-sm text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors duration-200 underline-offset-4 hover:underline inline-flex items-center gap-1"
                >
                  {link.label}
                  <ChevronDown size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
                {/* Desktop dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden group-hover:block z-10">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-lg py-1 min-w-[180px]">
                    {sub.map(s => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="block px-4 py-2 font-body text-sm text-zinc-700 dark:text-zinc-300 hover:bg-accent/10 hover:text-accent whitespace-nowrap"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <ThemeToggle dark={dark} onToggle={onToggleTheme} />
          <a
            href="/abonementy"
            className="hidden lg:inline-flex items-center font-display text-base bg-accent text-white px-5 py-2.5 hover:bg-pink-700 transition-colors duration-200"
          >
            Перше тренування −50%
          </a>
          <button
            className="md:hidden p-2 text-zinc-700 dark:text-zinc-300"
            onClick={() => (menuOpen ? closeMenu() : openMenu())}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center gap-5 md:hidden overflow-y-auto py-8"
          >
            {links.map(link => {
              const sub = 'sub' in link ? link.sub : undefined;
              const isExpanded = expandedItem === link.label;

              return (
                <div key={link.label} className="flex flex-col items-center">
                  {/* Parent row: text link (navigates) + chevron button (toggles chips) */}
                  <div className="flex items-center">
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="font-display text-3xl text-zinc-900 dark:text-white hover:text-accent transition-colors"
                    >
                      {link.label}
                    </a>

                    {sub && (
                      <button
                        onClick={() => toggleSub(link.label)}
                        aria-label={isExpanded ? 'Сховати підрозділи' : 'Показати підрозділи'}
                        aria-expanded={isExpanded}
                        /* p-3 = 12px padding → effective tap target ≥ 44px */
                        className="p-3 -mr-3 text-accent inline-flex items-center justify-center"
                      >
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          style={{ display: 'inline-flex' }}
                        >
                          <ChevronDown size={20} />
                        </motion.span>
                      </button>
                    )}
                  </div>

                  {/* Chip row — CSS grid 0fr→1fr for smooth height-to-auto */}
                  {sub && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateRows: isExpanded ? '1fr' : '0fr',
                        opacity: isExpanded ? 1 : 0,
                        transition:
                          'grid-template-rows 0.2s ease-in-out, opacity 0.15s ease-in-out',
                      }}
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <div className="flex flex-wrap justify-center gap-2 max-w-[300px] pt-3 pb-1">
                          {sub.map(s => (
                            <a
                              key={s.label}
                              href={s.href}
                              onClick={closeMenu}
                              className="font-body text-sm text-accent border border-accent rounded-full px-4 min-h-[44px] inline-flex items-center hover:bg-accent hover:text-white active:bg-accent active:text-white transition-colors"
                            >
                              {s.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <a
              href="/abonementy"
              onClick={closeMenu}
              className="font-display text-lg bg-accent text-white px-8 py-4 hover:bg-pink-700 transition-colors mt-2"
            >
              ПЕРШЕ ТРЕНУВАННЯ −50%
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
