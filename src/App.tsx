import CozyPawsHero from './components/CozyPawsHero';
import ToonhubCarousel from './components/ToonhubCarousel';

export default function App() {
  return (
    <div className="w-full bg-[#EFFDF0] min-h-screen overflow-x-hidden">
      {/* Page Section 1: CozyPaws Hero (First Page) */}
      <section id="cozypaws" className="h-screen w-full relative">
        <CozyPawsHero />
      </section>

      {/* Page Section 2: TOONHUB Carousel (Appears on Scroll) */}
      <section id="toonhub" className="h-screen w-full relative">
        <ToonhubCarousel onSwitchToCozyPaws={() => document.getElementById('cozypaws')?.scrollIntoView({ behavior: 'smooth' })} />
      </section>
    </div>
  );
}
