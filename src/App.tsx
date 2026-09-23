import { useState, useEffect } from 'react';
import CozyPawsHero from './components/CozyPawsHero';
import ToonhubCarousel from './components/ToonhubCarousel';
import AboutUs from './components/AboutUs';
import DiscoverPage from './components/DiscoverPage';
import GlyphPortalSection from './components/GlyphPortalSection';
import Footer from './components/Footer';
import { CommerceHero } from './components/ui/commerce-hero';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'discover' | 'store'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#about') return 'about';
      if (window.location.hash === '#discover') return 'discover';
      if (window.location.hash === '#store') return 'store';
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        setCurrentPage('about');
      } else if (window.location.hash === '#discover') {
        setCurrentPage('discover');
      } else if (window.location.hash === '#store') {
        setCurrentPage('store');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'about' | 'discover' | 'store', sectionId?: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'about' ? 'about' : page === 'discover' ? 'discover' : page === 'store' ? 'store' : sectionId ? sectionId : '';
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

  if (currentPage === 'about') {
    return (
      <div className="w-full bg-[#EFFDF0] min-h-screen flex flex-col justify-between">
        <AboutUs
          onNavigateHome={() => navigateTo('home', 'cozypaws')}
          onNavigateProducts={() => navigateTo('home', 'toonhub')}
          onNavigateStore={() => navigateTo('store')}
        />
        <Footer
          onNavigateHome={() => navigateTo('home', 'cozypaws')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateProducts={() => navigateTo('home', 'toonhub')}
          onNavigateDiscover={() => navigateTo('discover')}
          onNavigateStore={() => navigateTo('store')}
        />
      </div>
    );
  }

  if (currentPage === 'discover') {
    return (
      <div className="w-full bg-[#EFFDF0] min-h-screen flex flex-col justify-between">
        <DiscoverPage
          onNavigateHome={() => navigateTo('home', 'cozypaws')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateProducts={() => navigateTo('home', 'toonhub')}
          onNavigateStore={() => navigateTo('store')}
        />
        <Footer
          onNavigateHome={() => navigateTo('home', 'cozypaws')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateProducts={() => navigateTo('home', 'toonhub')}
          onNavigateDiscover={() => navigateTo('discover')}
          onNavigateStore={() => navigateTo('store')}
        />
      </div>
    );
  }

  if (currentPage === 'store') {
    return (
      <div className="w-full bg-[#EFFDF0] min-h-screen">
        <CommerceHero
          onNavigateHome={() => navigateTo('home', 'cozypaws')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateProducts={() => navigateTo('home', 'toonhub')}
          onNavigateDiscover={() => navigateTo('discover')}
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#EFFDF0] min-h-screen overflow-x-hidden flex flex-col">
      {/* Page Section 1: CozyPaws Hero (First Page) */}
      <section id="cozypaws" className="min-h-[100dvh] md:h-screen w-full relative">
        <CozyPawsHero
          onNavigateAbout={() => navigateTo('about')}
          onNavigateStore={() => navigateTo('store')}
        />
      </section>

      {/* Page Section 2: TOONHUB Carousel (Appears on Scroll) */}
      <section id="toonhub" className="min-h-[100dvh] md:h-screen w-full relative">
        <ToonhubCarousel
          onSwitchToCozyPaws={() => navigateTo('home', 'cozypaws')}
          onNavigateDiscover={() => navigateTo('discover')}
        />
      </section>

      {/* Page Section 3: Glyph Portal (Interactive section below Product page) */}
      <section id="glyph-portal" className="w-full relative min-h-screen">
        <GlyphPortalSection
          onNavigateStore={() => navigateTo('store')}
          onNavigateDiscover={() => navigateTo('discover')}
        />
      </section>

      {/* Website Footer at the very bottom */}
      <Footer
        onNavigateHome={() => navigateTo('home', 'cozypaws')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateProducts={() => navigateTo('home', 'toonhub')}
        onNavigateDiscover={() => navigateTo('discover')}
        onNavigateStore={() => navigateTo('store')}
      />
    </div>
  );
}
