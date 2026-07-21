import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  trainer: { name: string; specialty: string } | null
  onClose: () => void
}

export default function TrainerBookingModal({ trainer, onClose }: Props) {
  return (
    <AnimatePresence>
      {trainer && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/70 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-accent" aria-label="Закрити">
              <X className="w-5 h-5" />
            </button>
            <p className="text-[11px] tracking-widest text-accent uppercase font-body mb-1">Записатися до тренера</p>
            <h3 className="font-display text-2xl text-zinc-900 dark:text-white mb-1">{trainer.name}</h3>
            <p className="font-body text-sm text-zinc-500 mb-6">{trainer.specialty}</p>

            <form
              name="trainer-booking"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="trainer-booking" />
              <input type="hidden" name="trainer" value={trainer.name} />
              <p className="hidden">
                <label>Don't fill this: <input name="bot-field" /></label>
              </p>

              <div className="grid grid-cols-2 gap-3">
                <input type="text" name="firstName" required placeholder="Ім'я"
                       className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm" />
                <input type="text" name="lastName" required placeholder="Прізвище"
                       className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm" />
              </div>
              <input type="tel" name="phone" required placeholder="+380 67 123 45 67"
                     className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm" />
              <input type="text" name="day" required placeholder="Бажаний день тижня"
                     className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm" />
              <input type="text" name="time" required placeholder="Бажана година (напр. 18:00)"
                     className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-accent focus:outline-none font-body text-sm" />
              <button type="submit"
                      className="w-full font-display font-semibold text-base bg-accent text-white py-4 hover:bg-pink-700 transition">
                ЗАПИСАТИСЬ
              </button>
              <p className="text-xs text-zinc-500 text-center font-body">
                Ми зв'яжемось протягом години
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
