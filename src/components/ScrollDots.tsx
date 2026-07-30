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
    const el = pricingRef.current;
    if (!el) return;

    // Show rail when pricing area is intersecting the viewport
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      // Show when at least 5% of the pricing area is in view
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pricingRef]);

  return (
    <div
      className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 md:hidden transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
    >
      {DOTS.map(dot => {
        const isActive = activeTab === dot.key;
        return (
          <button
            key={dot.key}
            onClick={() => onSwitch(dot.key)}
            aria-label={dot.label}
            title={dot.label}
            className="flex items-center justify-center"
            style={{ width: 20, height: 20 }}
          >
            <span
              className="block rounded-full transition-all duration-200"
              style={{
                width: isActive ? 10 : 6,
                height: isActive ? 10 : 6,
                background: isActive ? '#E8279A' : 'rgba(161,161,170,0.7)',
                boxShadow: isActive ? '0 0 0 2px rgba(232,39,154,0.25)' : 'none',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
