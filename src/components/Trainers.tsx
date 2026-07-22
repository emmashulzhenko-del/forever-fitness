import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import TrainerBookingModal from './TrainerBookingModal';
import TrainerBioModal from './TrainerBioModal';

type Trainer = {
  name: string;
  specialty: string;
  exp: string;
  photo: string;
  bio?: string;
  bioShort?: string;
  external?: { label: string; href: string }[];
};

const trainers: Trainer[] = [
  {
    name: 'Наталя Пустовит',
    specialty: 'ПЕРСОНАЛЬНИЙ ТРЕНІНГ',
    exp: 'Досвід: 25 років',
    photo: '/trainers/natalia-pustovit.webp',
    bio: 'Персональна тренерка з 25-річним досвідом, майстер спорту з плавання. Допомагає клієнтам будь-якого віку досягати реальних результатів: схуднення, набору м\'язової маси, корекції фігури та покращення постави. Працює за індивідуальними програмами, поєднуючи ефективні тренування з рекомендаціями щодо здорового харчування. Має великий досвід у фітнесі, бодібілдингу та оздоровчому тренінгу. Якщо ви цінуєте професіоналізм, дисципліну та безпечний шлях до своєї найкращої форми — Наталя стане вашим надійним тренером.',
    bioShort: 'Персональна тренерка з 25-річним досвідом, майстер спорту з плавання. Допомагає клієнтам будь-якого віку досягати реальних результатів: схуднення, набору м\'язової маси, корекції фігури та покращення постави.',
  },
  {
    name: 'Оля Нагірна',
    specialty: 'HIIT · ДЖАМПІНГ · СТРЕТЧИНГ',
    exp: 'Досвід: 18 років',
    photo: '/trainers/olha-nahirna.webp',
    bio: 'Тренерка з 18-річним досвідом, випускниця Львівського державного університету фізичної культури та майстер спорту зі спортивної гімнастики. Постійно вдосконалює свої знання, щоб кожне тренування було максимально ефективним і безпечним. Спеціалізується на персональних і групових тренуваннях: HIIT, Jumping Fitness, Stretching, силова підготовка, СФП, мобіліті та тренування в тренажерному залі. Їй довіряють як початківці, так і професійні спортсмени. Індивідуальний підхід, контроль техніки та програми, адаптовані під ваші цілі, допоможуть швидко й безпечно досягти бажаного результату.',
    bioShort: 'Тренерка з 18-річним досвідом, випускниця Львівського державного університету фізичної культури та майстер спорту зі спортивної гімнастики. Постійно вдосконалює свої знання, щоб кожне тренування було максимально ефективним і безпечним.',
  },
  {
    name: 'Діана Непомяща',
    specialty: 'ПЕРСОНАЛЬНИЙ ТРЕНІНГ',
    exp: 'Досвід: 5 років',
    photo: '/trainers/diana-nepomyashcha.webp',
    bio: 'Персональна тренерка тренажерного залу, яка допомагає дорослим і підліткам досягати своїх фітнес-цілей. Має практичний досвід, постійних клієнтів та індивідуальний підхід до кожного. З дитинства займається спортом: спортивною й художньою гімнастикою, акробатикою, стрільбою з лука та професійним волейболом. Постійно вдосконалює свої знання та здобуває медичну освіту, щоб тренування були максимально ефективними й безпечними. На персональних заняттях Діана складає індивідуальні програми, навчає правильній техніці виконання вправ і допомагає стати сильнішими, витривалішими та впевненішими у собі.',
    bioShort: 'Персональна тренерка тренажерного залу, яка допомагає дорослим і підліткам досягати своїх фітнес-цілей. Має практичний досвід, постійних клієнтів та індивідуальний підхід до кожного.',
  },
  {
    name: 'Оксана Сидун',
    specialty: 'СТРЕТЧИНГ · ПІЛАТЕС',
    exp: 'Досвід: 5 років',
    photo: '/trainers/oksana-sydun.webp',
    bio: 'Персональна тренерка, яка допомагає безпечно й ефективно досягати бажаної форми, покращувати здоров\'я та самопочуття. Має спортивний досвід у футболі та легкій атлетиці, а також багато вдячних клієнтів із реальними результатами. Спеціалізується на схудненні, корекції фігури, наборі м\'язової маси, FitMama — післяпологовому відновленні, реабілітації після травм, операцій. Для кожного клієнта розробляє індивідуальну програму тренувань і надає рекомендації щодо харчування. Кожне заняття адаптоване до ваших можливостей, стану здоров\'я та цілей, щоб шлях до результату був комфортним, безпечним і максимально ефективним.',
    bioShort: 'Персональна тренерка, яка допомагає безпечно й ефективно досягати бажаної форми, покращувати здоров\'я та самопочуття. Має спортивний досвід у футболі та легкій атлетиці, а також багато вдячних клієнтів із реальними результатами.',
  },
  {
    name: 'Дарія Вовчаненко',
    specialty: 'ТАБАТА · TRX · ФУНКЦІОНАЛЬНИЙ',
    exp: 'Досвід: 3+ роки',
    photo: '/trainers/dara-vovniachenko.webp',
    bio: 'Сертифікована тренерка з фітнесу, яка проводить TRX, TABATA та персональні тренування. Уже понад 3 роки допомагає клієнтам ставати сильнішими, витривалішими та впевненішими у собі. Велике значення приділяє правильній техніці виконання вправ, індивідуальному підбору навантаження та підтримці кожного клієнта. Її тренування поєднують ефективність, різноманітність і позитивну атмосферу. Дара постійно вдосконалює свої професійні навички та допомагає зробити спорт не лише результативним, а й справді захопливим.',
    bioShort: 'Сертифікована тренерка з фітнесу, яка проводить TRX, TABATA та персональні тренування. Уже понад 3 роки допомагає клієнтам ставати сильнішими, витривалішими та впевненішими у собі.',
  },
  {
    name: 'Марина Алєксандрова',
    specialty: 'ЙОГА · VINYASA FLOW',
    exp: 'Досвід: з 2011 року',
    photo: '/trainers/maryna-aleksandrova.webp',
    bio: 'Інструкторка з йоги з досвідом викладання з 2011 року. Спеціалізується на Vinyasa Flow Yoga — динамічній практиці, яка розвиває силу, гнучкість, витривалість і внутрішню гармонію. Має медичну освіту та практичний досвід роботи у сфері охорони здоров\'я, що дозволяє проводити заняття з максимальною увагою до анатомії, безпеки та індивідуальних особливостей кожного учасника. Марина працює з людьми різного віку й рівня підготовки, допомагаючи через йогу покращити фізичне самопочуття, знизити рівень стресу та знайти баланс між тілом і розумом.',
    bioShort: 'Інструкторка з йоги з досвідом викладання з 2011 року. Спеціалізується на Vinyasa Flow Yoga — динамічній практиці, яка розвиває силу, гнучкість, витривалість і внутрішню гармонію.',
  },
  {
    name: 'Марія Тартушкіна',
    specialty: 'ТРЕНАЖЕРНИЙ ЗАЛ · БОЙОВІ МИСТЕЦТВА',
    exp: 'Досвід: 6 років',
    photo: '/trainers/mariia-tartushkina.webp',
    bio: 'Марія Тартушкіна — персональна тренерка тренажерного залу, спеціалістка з бойових мистецтв, фітнес-інструкторка та дієтолог. Професійні навички тренера підтверджено 8 сертифікатами Expert I Smart Fitness.\n\nДопомагає клієнтам зміцнити здоров\'я, скоригувати фігуру, покращити поставу, розвинути силу й витривалість, отримати навички самозахисту, а також відновитися після фізичних навантажень.\n\nКожна програма тренувань розробляється індивідуально, щоб ви безпечно та ефективно досягли своїх цілей і отримували задоволення від процесу.',
    bioShort: 'Марія Тартушкіна — персональна тренерка тренажерного залу, спеціалістка з бойових мистецтв, фітнес-інструкторка та дієтолог. Професійні навички тренера підтверджено 8 сертифікатами Expert I Smart Fitness.',
  },
  {
    // ⚑ FLAG: placed last by default — client list did not specify her position
    name: 'Жанна Потапова',
    specialty: 'ФЛАЙ ЙОГА · ЙОГА-ТЕРАПІЯ',
    exp: 'Досвід: 20 років',
    photo: '/trainers/zhanna-potapova.webp',
    bio: 'Жанна Потапова — засновниця фітнес-клубу Forever, дипломована випускниця ЛДУФК з відзнакою, сертифікована інструкторка з йоги, аюрведист і прихильниця холістичного підходу до оздоровлення. Викладає з 2007 року, спеціалізується на Хатха-йозі, Флай-йозі (в гамаках), йога-терапії та оздоровчому пілатесі.\n\nСпікерка фестивалів Yoga Expo та Veda Life, засновниця всеукраїнського проєкту Йогатабір «Прана». Поєднує багаторічний досвід, сучасні знання та природні методи оздоровлення, допомагаючи відновити здоров\'я, внутрішню рівновагу та якість життя.\n\nДля Жанни йога — це шлях до фізичного здоров\'я, внутрішньої гармонії та усвідомленого життя. Її головна мета — допомогти кожній людині віднайти баланс тіла, розуму й свідомості, адже «Живи тут і зараз!»',
    bioShort: 'Жанна Потапова — засновниця фітнес-клубу Forever, дипломована випускниця ЛДУФК з відзнакою, сертифікована інструкторка з йоги, аюрведист і прихильниця холістичного підходу до оздоровлення. Викладає з 2007 року, спеціалізується на Хатха-йозі, Флай-йозі (в гамаках), йога-терапії та оздоровчому пілатесі.',
    external: [
      { label: 'www.yogatabir.com.ua', href: 'https://www.yogatabir.com.ua' },
      { label: 'www.ayurvedaahimsa.com', href: 'https://www.ayurvedaahimsa.com' },
    ],
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Trainers() {
  const [bookingTrainer, setBookingTrainer] = useState<Trainer | null>(null);
  const [bioTrainer, setBioTrainer] = useState<Trainer | null>(null);

  return (
    <section id="trainers" className="py-20 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <h2
            className="font-display text-zinc-900 dark:text-white"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            НАШІ ТРЕНЕРИ
          </h2>
          <p className="font-body font-light text-zinc-500">Професіонали, які допоможуть тобі досягти цілей</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trainers.map(trainer => (
            <motion.div
              key={trainer.name}
              variants={item}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden group hover:-translate-y-1 transition-transform duration-150 flex flex-col"
              style={{ borderTop: '3px solid transparent' }}
              onMouseEnter={e => (e.currentTarget.style.borderTopColor = '#E8279A')}
              onMouseLeave={e => (e.currentTarget.style.borderTopColor = 'transparent')}
            >
              {/* Clickable photo */}
              <div
                className="relative cursor-pointer overflow-hidden shrink-0"
                onClick={() => setBioTrainer(trainer)}
              >
                <img
                  src={trainer.photo}
                  alt={`${trainer.name} — тренер фітнес-клубу Forever`}
                  className="w-full aspect-[3/4] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                {/* Hover hint badge */}
                <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <Maximize2 size={10} />
                  детальніше
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="space-y-1">
                  <p className="font-display text-xl text-zinc-900 dark:text-white leading-snug">{trainer.name}</p>
                  <p className="font-body font-light text-[10px] text-accent uppercase tracking-wide">{trainer.specialty}</p>
                  <p className="font-body font-light text-xs text-zinc-500 dark:text-zinc-400">{trainer.exp}</p>
                </div>

                <button
                  onClick={() => setBookingTrainer(trainer)}
                  className="w-full font-display font-semibold text-sm bg-accent text-white py-3 mt-auto hover:bg-pink-700 transition"
                >
                  ОБРАТИ ТРЕНЕРА
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bio modal (photo click) */}
      <TrainerBioModal
        trainer={bioTrainer}
        onClose={() => setBioTrainer(null)}
        onBook={() => setBookingTrainer(bioTrainer)}
      />

      {/* Booking form modal (ОБРАТИ ТРЕНЕРА button) */}
      <TrainerBookingModal
        trainer={bookingTrainer}
        onClose={() => setBookingTrainer(null)}
      />
    </section>
  );
}
