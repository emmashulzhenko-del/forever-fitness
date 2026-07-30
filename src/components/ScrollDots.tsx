import { useEffect, useState } from 'react';

type TabKey = 'fp' | 'gym' | 'personal' | 'gym-mobility' | 'massage';

interface Props {
  activeTab: TabKey;
  onSwitch: (tab: TabKey) => void;
  pricingRef: React.RefObject<HTMLElement | null>;
}

const DOTS: { key: TabKey; label: string }[] = [
  { key: 'fp', label: 'Фітнес+' },
  { key: 'gym', label: 'Зал' },
  { key: 'personal', label: 'Персональні' },
  { key: 'gym-mobility', label: 'GYM+Mobility' },
  { key: 'massage', label: 'Масаж' },
];

export default function ScrollDots({ activeTab, onSwitch, pricingRef }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      const el = pricingRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolled = window.scrollY > 120;
      const pastBottom = rect.bottom < 80;
      setVisible(scrolled && !pastBottom);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [pricingRef]);

  return (
    <div
      className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 md:hidden transition-opacity duration-300"
      style={{ opacity: visible ? 0.85 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
    >
      {DOTS.map(dot => (
        <button
          key={dot.key}
          onClick={() => onSwitch(dot.key)}
          aria-label={dot.label}
          title={dot.label}
          className="flex items-center justify-center"
        >
          <span
            className="block rounded-full transition-all duration-200"
            style={{
              width: activeTab === dot.key ? 10 : 6,
              height: activeTab === dot.key ? 10 : 6,
              background: activeTab === dot.key ? '#E8279A' : '#d4d4d8',
            }}
          />
        </button>
      ))}
    </div>
  );
}
