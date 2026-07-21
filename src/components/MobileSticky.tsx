import { useState, useEffect } from 'react';
import { Phone, ChevronUp } from 'lucide-react';

export default function MobileSticky() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handler = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Fixed bottom bar — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-[100] bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 px-3 py-2.5 flex gap-2 items-center shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        {/* Button 1 — 50% offer */}
        <a href="#membership"
           className="flex-1 font-display font-semibold text-[12px] bg-accent text-white py-3 text-center whitespace-nowrap">
          −50% ПЕРШЕ
        </a>
        {/* Button 2 — Help choosing */}
        <a href="#help-chat"
           className="flex-1 font-display font-semibold text-[12px] border-2 border-accent text-accent py-[10px] text-center whitespace-nowrap">
          ДОПОМОГА У ВИБОРІ
        </a>
        {/* Button 3 — Call */}
        <a href="tel:+380671496930"
           className="w-11 h-11 flex items-center justify-center border-2 border-accent text-accent shrink-0"
           aria-label="Зателефонувати">
          <Phone className="w-4 h-4" />
        </a>
      </div>

      {/* Scroll to top — fixed */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-20 right-4 md:bottom-8 z-[100] bg-accent text-white w-10 h-10 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: showScroll ? 1 : 0, pointerEvents: showScroll ? 'auto' : 'none' }}
        aria-label="Scroll to top"
      >
        <ChevronUp size={18} />
      </button>
    </>
  );
}
