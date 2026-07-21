import { MessageCircle, Phone } from 'lucide-react'

export default function HelpChatCTA() {
  return (
    <section id="help-chat" className="py-16 px-[clamp(20px,6vw,96px)] bg-accent">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-display text-[clamp(28px,4.5vw,48px)] text-white leading-tight mb-3">
          РОЗМІРКОВУЄШ, ЯКЕ ТРЕНУВАННЯ ОБРАТИ?
        </h2>
        <p className="font-body font-normal text-white/90 text-lg md:text-xl mb-8">
          Ми допоможемо підібрати коректну програму під твої цілі. Напиши нам у зручному месенджері — відповідаємо за 10–15 хвилин.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://wa.me/380671496930" target="_blank" rel="noopener"
             className="font-display font-semibold text-base px-6 py-3 bg-white text-accent hover:bg-zinc-100 transition flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a href="viber://chat?number=%2B380671496930"
             className="font-display font-semibold text-base px-6 py-3 bg-white text-accent hover:bg-zinc-100 transition flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> Viber
          </a>
          <a href="https://t.me/+380671496930" target="_blank" rel="noopener"
             className="font-display font-semibold text-base px-6 py-3 bg-white text-accent hover:bg-zinc-100 transition flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> Telegram
          </a>
          <a href="tel:+380671496930"
             className="font-display font-semibold text-base px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-accent transition flex items-center gap-2">
            <Phone className="w-4 h-4" /> Подзвонити
          </a>
        </div>
      </div>
    </section>
  )
}
