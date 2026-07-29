import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  trainer: { name: string; specialty: string; specialtyFull?: string; bioShort?: string } | null
  onClose: () => void
}

export default function TrainerBookingModal({ trainer, onClose }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (trainer) setStatus('idle')
  }, [trainer])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.currentTarget)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: 'Нова заявка з сайту — Запис до тренера',
          from_name: 'Forever Fitness сайт',
          name: `${fd.get('firstName')} ${fd.get('lastName')}`,
          phone: fd.get('phone'),
          trainer: trainer?.name ?? '',
          day: fd.get('day'),
          time: fd.get('time'),
          source: `Тренер: ${trainer?.name}`,
          botcheck: '',
        }),
      })
      const json = await res.json()
      if (!json.success) throw new Error(json.message || 'submit failed')
      setStatus('success')
    } catch (err) {
      setStatus('error')
      console.error(err)
    }
  }

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
            <p className="font-body text-xs text-accent uppercase tracking-widest mb-2">{trainer.specialtyFull ?? trainer.specialty}</p>
            {trainer.bioShort && (
              <p className="font-body font-light text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 pb-4 border-b border-zinc-100 dark:border-zinc-700">
                {trainer.bioShort}
              </p>
            )}

            {status === 'success' ? (
              <p className="font-body text-sm text-zinc-700 dark:text-zinc-300 py-8 text-center leading-relaxed">
                Дякуємо! Ми зв'яжемось з вами протягом години.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

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

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full font-display font-semibold text-base bg-accent text-white py-4 hover:bg-pink-700 transition disabled:opacity-60"
                >
                  {status === 'sending' ? 'Надсилаємо…' : 'ЗАПИСАТИСЬ'}
                </button>

                {status === 'error' && (
                  <p className="text-xs text-red-500 text-center font-body">
                    Щось пішло не так. Зателефонуйте нам:{' '}
                    <a href="tel:+380737781008" className="underline">+380 73 778 10 08</a>
                  </p>
                )}
                <p className="text-xs text-zinc-500 text-center font-body">
                  Ми зв'яжемось протягом години
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
