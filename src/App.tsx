import { useState, useEffect } from 'react';
import CozyPawsHero from './components/CozyPawsHero';
import ToonhubCarousel from './components/ToonhubCarousel';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import { CommerceHero } from './components/ui/commerce-hero';
import { LanguageProvider } from './lib/languageContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<'home' | 'store'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#store' || window.location.hash === '#discover') return 'store';
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        setCurrentPage('home');
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else if (window.location.hash === '#store' || window.location.hash === '#discover') {
        setCurrentPage('store');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'about' | 'discover' | 'store', sectionId?: string) => {
    if (page === 'about') {
      setCurrentPage('home');
      window.location.hash = 'about';
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }

    if (page === 'discover' || page === 'store') {
      setCurrentPage('store');
      window.location.hash = 'store';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(page);
    window.location.hash = sectionId ? sectionId : '';
    if (page === 'home') {
      setTimeout(() => {
        if (sectionId) {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (currentPage === 'store') {
    return (
      <div className="w-full bg-[#EFFDF0] min-h-screen">
        <CommerceHero
          onNavigateHome={() => navigateTo('home', 'cozypaws')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateProducts={() => navigateTo('home', 'toonhub')}
          onNavigateDiscover={() => navigateTo('store')}
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#EFFDF0] min-h-screen overflow-x-hidden flex flex-col snap-y snap-proximity md:snap-none">
      {/* Page Section 1: CozyPaws Hero (First Page) */}
      <section id="cozypaws" className="h-[100svh] min-h-[100svh] max-h-[100svh] md:h-screen md:min-h-screen md:max-h-none w-full relative snap-start snap-always overflow-hidden">
        <CozyPawsHero
          onNavigateAbout={() => navigateTo('about')}
          onNavigateStore={() => navigateTo('store')}
        />
      </section>

      {/* Page Section 2: TOONHUB Carousel (Appears on Scroll) */}
      <section id="toonhub" className="h-[100svh] min-h-[100svh] max-h-[100svh] md:h-screen md:min-h-screen md:max-h-none w-full relative snap-start snap-always overflow-hidden">
        <ToonhubCarousel
          onSwitchToCozyPaws={() => navigateTo('home', 'cozypaws')}
          onNavigateDiscover={() => navigateTo('store')}
        />
      </section>

      {/* Page Section 3: About Us (Shown directly on landing page to make it longer & informative) */}
      <section id="about" className="w-full relative">
        <AboutUs
          embedded={true}
          onNavigateHome={() => navigateTo('home', 'cozypaws')}
          onNavigateProducts={() => navigateTo('home', 'toonhub')}
          onNavigateStore={() => navigateTo('store')}
        />
      </section>

      {/* Website Footer at the very bottom */}
      <Footer
        onNavigateHome={() => navigateTo('home', 'cozypaws')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateProducts={() => navigateTo('home', 'toonhub')}
        onNavigateDiscover={() => navigateTo('store')}
        onNavigateStore={() => navigateTo('store')}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

