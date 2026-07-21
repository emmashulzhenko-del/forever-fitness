import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Membership from './components/Membership';
import Schedule from './components/Schedule';
import HelpChatCTA from './components/HelpChatCTA';
import FitnessGroups from './components/FitnessGroups';
import Trainers from './components/Trainers';
import TrainingTypes from './components/TrainingTypes';
import Massage from './components/Massage';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';
import MobileSticky from './components/MobileSticky';

export default function App() {
  const { dark, toggle } = useTheme();

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen">
      <Navbar dark={dark} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Services />
        <TrainingTypes />
        <Membership />
        <Schedule />
        <HelpChatCTA />
        <FitnessGroups />
        <Trainers />
        <WhyUs />
        <Massage />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
      <MobileSticky />
    </div>
  );
}
