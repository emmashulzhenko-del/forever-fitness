import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface TrainerForModal {
  name: string;
  specialty: string;
  specialtyFull?: string;
  exp: string;
  photo: string;
  bio?: string;
  external?: { label: string; href: string }[];
}

interface Props {
  trainer: TrainerForModal | null;
  onClose: () => void;
  onBook: () => void;
}

export default function TrainerBioModal({ trainer, onClose, onBook }: Props) {
  useEffect(() => {
    if (!trainer) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [trainer]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {trainer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/80 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden"
            style={{ maxHeight: '88vh' }}
          >
            {/* Photo background */}
            <div
              className="absolute inset-0 bg-cover bg-top"
              style={{ backgroundImage: `url(${trainer.photo})` }}
            />
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/40" />

            {/* Scrollable content */}
            <div className="relative z-10 flex flex-col p-8 overflow-y-auto" style={{ maxHeight: '88vh' }}>
              {/* Close */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Закрити"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="font-body text-[11px] tracking-[0.14em] text-accent uppercase mb-2">
                {trainer.specialtyFull ?? trainer.specialty}
              </p>
              <h2 className="font-display text-3xl text-white mb-1">{trainer.name}</h2>
              <p className="font-body text-sm text-white/55 mb-6">{trainer.exp}</p>

              {trainer.bio && (
                <div className="mb-6 space-y-4">
                  {trainer.bio.split('\n\n').map((para, i) => (
                    <p key={i} className="font-body font-light text-sm text-white/80 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              )}

              {trainer.external && trainer.external.length > 0 && (
                <div className="flex flex-col gap-2 mb-6">
                  {trainer.external.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-semibold text-sm text-accent underline underline-offset-4 hover:no-underline"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              )}

              <button
                onClick={() => { onClose(); onBook(); }}
                className="w-full font-display font-semibold text-base bg-accent text-white py-4 hover:bg-pink-700 transition mt-auto"
              >
                ЗАПИСАТИСЬ ДО ТРЕНЕРА
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
