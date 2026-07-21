import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface Props {
  dark: boolean;
  onToggleTheme: () => void;
}

const links = [
  { label: 'Головна', href: '#' },
  { label: 'Тренери', href: '#trainers' },
  { label: 'Розклад', href: '#schedule' },
  { label: 'Абонементи', href: '#membership' },
  { label: 'Контакти', href: '#footer' },
];

export default function Navbar({ dark, onToggleTheme }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <a href="#" aria-label="Фітнес Клуб Forever — головна" className="mr-8 flex-shrink-0">
          <img
            src="/logo-ff-final.png"
            alt="Фітнес Клуб Forever — Львів, вул. Зелена 20"
            className="h-10 md:h-11 w-auto"
            loading="eager"
            decoding="async"
          />
        </a>

        {/* Center nav */}
        <nav className="hidden md:flex gap-7 flex-1 justify-center">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm text-zinc-700 dark:text-zinc-300 hover:text-accent transition-colors duration-200 underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <ThemeToggle dark={dark} onToggle={onToggleTheme} />
          <a
            href="#membership"
            className="hidden lg:inline-flex items-center font-display text-base bg-accent text-white px-5 py-2.5 hover:bg-pink-700 transition-colors duration-200"
          >
            Перше тренування −50%
          </a>
          <button
            className="md:hidden p-2 text-zinc-700 dark:text-zinc-300"
            onClick={() => setMenuOpen(v => !v)}
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
            className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl text-zinc-900 dark:text-white hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#membership"
              onClick={() => setMenuOpen(false)}
              className="font-display text-lg bg-accent text-white px-8 py-4 hover:bg-pink-700 transition-colors mt-4"
            >
              ПЕРШЕ ТРЕНУВАННЯ −50%
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
