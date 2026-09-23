import { useState } from 'react';
import {
  ShoppingCart,
  Star,
  ArrowUpRight,
  Play,
  ArrowRight,
  Plus,
  Menu,
} from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';

interface CozyPawsHeroProps {
  onNavigateAbout?: () => void;
  onNavigateStore?: () => void;
}

export default function CozyPawsHero({ onNavigateAbout, onNavigateStore }: CozyPawsHeroProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-full w-full bg-[#EFFDF0] flex flex-col overflow-hidden relative font-['Inter',sans-serif]">
      {/* HEADER WITH NAVBAR BELOW */}
      <header className="shrink-0 w-full relative z-30 animate-fade-in delay-100 bg-[#EFFDF0]">
        {/* Top Row: Logo, Brand Name & Cart Button */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-2 sm:py-2.5 flex items-center justify-between border-b border-[#123814]/10">
          <div className="flex items-center gap-2.5 cursor-pointer select-none">
            <img
              src={getAssetUrl("/Whitte Circle logo(3).png")}
              alt="Navbharat Agro Services Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain rounded-full shadow-md transition-transform hover:scale-105"
            />
            <span className="font-sans font-black text-[15px] sm:text-lg lg:text-xl text-[#123814] tracking-tight">
              Navbharat Agro Services
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Cart"
              onClick={onNavigateStore}
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#123814]/20 flex items-center justify-center text-[#123814] hover:border-gray-400 bg-white/70 shadow-xs transition-colors cursor-pointer hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Desktop Navigation Bar */}
        <nav className="hidden md:block w-full bg-[#EFFDF0]/90 backdrop-blur-md border-b border-[#123814]/10 py-1.5 px-4 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-6 text-xs sm:text-sm font-semibold text-gray-700">
            <a href="#home" className="text-[#123814] font-bold hover:text-[#E86A10] transition-colors whitespace-nowrap">
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                if (onNavigateAbout) {
                  e.preventDefault();
                  onNavigateAbout();
                }
              }}
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer"
            >
              About Us
            </a>
            <a href="#toonhub" className="hover:text-[#123814] transition-colors whitespace-nowrap">
              Products
            </a>
            <a href="#gallery" className="hover:text-[#123814] transition-colors whitespace-nowrap">
              Gallery
            </a>
            <a href="#business" className="hover:text-[#123814] transition-colors whitespace-nowrap">
              Careers
            </a>
            <a href="#blog" className="hover:text-[#123814] transition-colors whitespace-nowrap">
              Blog / Resources
            </a>
            <a href="#contact" className="hover:text-[#123814] transition-colors whitespace-nowrap">
              Contact Us
            </a>
          </div>
        </nav>

        {/* Bottom Row: Mobile Navigation Bar (Centered 3 sections + menu icon) */}
        <nav className="md:hidden w-full bg-[#EFFDF0]/95 backdrop-blur-md border-b border-[#123814]/10 py-1.5 px-4 relative flex items-center justify-center">
          <div className="flex items-center justify-center gap-6 text-xs font-bold text-gray-700">
            <a href="#home" className="text-[#123814] font-extrabold hover:text-[#E86A10] transition-colors">
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => {
                if (onNavigateAbout) {
                  e.preventDefault();
                  onNavigateAbout();
                }
              }}
              className="hover:text-[#123814] transition-colors cursor-pointer"
            >
              About Us
            </a>
            <a href="#toonhub" className="hover:text-[#123814] transition-colors">
              Products
            </a>
          </div>

          {/* List Icon Button for remaining items on right */}
          <div className="absolute right-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="More navigation links"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-white/90 border border-[#123814]/20 text-[#123814] shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Menu className="w-3.5 h-3.5 text-[#123814]" />
            </button>

            {/* Dropdown Menu */}
            {isMobileMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#123814]/15 py-2 z-50 animate-fade-in text-xs font-semibold text-gray-800">
                <a
                  href="#gallery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors"
                >
                  Gallery
                </a>
                <a
                  href="#business"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors"
                >
                  Careers
                </a>
                <a
                  href="#blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors"
                >
                  Blog / Resources
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors"
                >
                  Contact Us
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* HERO SECTION CONTAINER */}
      <main className="flex-1 relative flex flex-col justify-between overflow-hidden">
        {/* ------------------------------------------------------------- */}
        {/* DESKTOP (lg+) & TABLET (md) LAYOUT */}
        {/* ------------------------------------------------------------- */}

        {/* Text Layer (z-5) */}
        <div className="hidden md:flex flex-col items-center justify-center px-12 pt-4 lg:pt-[5.4rem] z-5 relative text-center pointer-events-none">
          <h1 className="font-serif-display text-[#1a3d1a] leading-[1.05] tracking-tight text-3xl sm:text-5xl lg:text-[clamp(36px,4.5vw,72px)] flex flex-col items-center">
            <span className="block">
              <span className="inline-block animate-word-pop delay-200">A</span>{' '}
              <span className="inline-block animate-word-pop delay-250">Tradition</span>{' '}
              <span className="inline-block animate-word-pop delay-300">of</span>{' '}
              <span className="inline-block animate-word-pop delay-350">Quality.</span>
            </span>
            <span className="block mt-1 sm:mt-2">
              <span className="inline-block animate-word-pop delay-400">A</span>{' '}
              <span className="inline-block animate-word-pop delay-450">Legacy</span>{' '}
              <span className="inline-block animate-word-pop delay-500">of</span>{' '}
              <span className="inline-block animate-word-pop delay-550">Trust</span>
            </span>
          </h1>
        </div>

        {/* Left Product Card (Heat Max) - Desktop/Tablet */}
        <div
          onClick={onNavigateStore}
          className="hidden md:block absolute top-[60px] lg:top-[50px] left-4 lg:left-12 z-20 w-[160px] lg:w-[clamp(160px,14vw,260px)] animate-slide-in-left delay-600 cursor-pointer group select-none"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[260/257] bg-white/60 shadow-sm border border-white/60 group-hover:border-[#1a3d1a]/40 group-hover:shadow-lg transition-all duration-300 p-2">
            <img
              src={getAssetUrl("/heatmax.png")}
              alt="Heat Max Booster"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onNavigateStore) onNavigateStore();
              }}
              aria-label="Open Store"
              className="absolute bottom-2 right-2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#1a3d1a] group-hover:bg-[#E86A10] text-white flex items-center justify-center transition-all duration-300 hover:scale-115 shadow-md cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="text-gray-700 text-xs lg:text-sm font-medium group-hover:text-[#E86A10] transition-colors">Heat Max Booster</span>
            <span className="text-[#1a3d1a] font-bold text-sm lg:text-base">499rs</span>
          </div>
        </div>

        {/* Right Video Card (Reviews) - Desktop/Tablet */}
        <div className="hidden md:block absolute top-[60px] lg:top-[50px] right-4 lg:right-12 z-20 w-[120px] lg:w-[clamp(120px,10vw,177px)] animate-slide-in-right delay-700">
          <div className="relative rounded-2xl overflow-hidden aspect-[177/287] bg-white/40 shadow-sm border border-white/60 group">
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/76be6ec3a93a703b15e9cc01e764a4e3f9d7d2c0.png"
              alt="Product Reviews"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <button className="absolute bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md cursor-pointer">
              <Play className="w-4 h-4 lg:w-5 lg:h-5 fill-white ml-0.5" />
            </button>
          </div>
          <p className="mt-2 text-[10px] lg:text-xs text-gray-700 leading-tight text-center lg:text-left">
            Watch Product Reviews on TikTok and YouTube
          </p>
        </div>

        {/* Bottom 3 Images Flex - Desktop/Tablet */}
        <div className="hidden md:flex absolute bottom-0 left-0 right-0 z-10 items-end justify-center pointer-events-auto">
          {/* Left Image (Cow Left) */}
          <div className="flex-1 min-h-[200px] sm:min-h-[250px] lg:min-h-[280px] relative overflow-visible animate-photo-reveal delay-700 flex items-end justify-center">
            {/* Light Green Box (Height aligned to red line under hooves) */}
            <div className="absolute bottom-0 left-0 right-0 h-[100px] sm:h-[125px] lg:h-[140px] bg-[#9ce4b3] rounded-t-2xl z-0" />

            {/* Cow Image with hooves resting on red line */}
            <img
              src={getAssetUrl("/left-cow.png")}
              alt="Agro cow left"
              className="w-full h-auto block object-contain relative z-10"
              style={{ transform: 'translateY(-110px) scale(0.72)', transformOrigin: 'bottom center' }}
            />
            {/* Left Overlay */}
            <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-8 z-20 bg-white/85 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-3 shadow-lg border border-white/70 animate-fade-up delay-1000">
              <div className="flex items-center -space-x-2">
                <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-7 h-7 rounded-full bg-[#1a3d1a] border-2 border-white flex items-center justify-center">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              </div>
              <span className="font-bold text-[#1a3d1a] text-xs lg:text-sm">98K+</span>
            </div>
          </div>

          {/* Center Dark Green Box Panel with /milk1.png product bag */}
          <div className="flex-[1.265] min-h-[220px] sm:min-h-[260px] lg:min-h-[290px] bg-[#0c310c] relative overflow-visible animate-photo-reveal delay-600 flex flex-col items-center justify-end pb-6 text-center shadow-lg rounded-t-2xl">
            {/* Product Bag Image popping up over dark green box */}
            <img
              src={getAssetUrl("/milk1.png")}
              alt="Dugdha Samruddhi Product"
              className="h-[150px] sm:h-[190px] lg:h-[230px] object-contain relative z-20 -mt-20 sm:-mt-28 drop-shadow-2xl transition-transform duration-300 hover:scale-105"
            />
            <div className="z-20 text-center flex flex-col items-center gap-3 w-full px-4 mt-2 animate-fade-up delay-1100">
              <h2 className="text-white text-base sm:text-xl font-bold drop-shadow-md">
                Best Products for Your Pet
              </h2>
              <button
                onClick={() => document.getElementById('toonhub')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white font-medium text-sm transition-all duration-200 shadow-lg hover:scale-105 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                Explore Products
              </button>
            </div>
          </div>

          {/* Right Image (Cow Right) */}
          <div className="flex-1 min-h-[200px] sm:min-h-[250px] lg:min-h-[280px] relative overflow-visible animate-photo-reveal delay-800 flex items-end justify-center">
            {/* Light Green Box (Height aligned to red line under hooves) */}
            <div className="absolute bottom-0 left-0 right-0 h-[100px] sm:h-[125px] lg:h-[140px] bg-[#9ce4b3] rounded-t-2xl z-0" />

            {/* Cow Image with hooves resting on red line */}
            <img
              src={getAssetUrl("/right-cow.png")}
              alt="Agro cow right"
              className="w-full h-auto block object-contain relative z-10"
              style={{ transform: 'translateY(-110px) scale(0.72)', transformOrigin: 'bottom center' }}
            />
            {/* Right Overlay */}
            <div className="absolute bottom-4 lg:bottom-6 right-4 lg:right-8 z-20 bg-white/85 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg border border-white/70 animate-fade-up delay-1200">
              <Star className="w-4 h-4 text-[#E86A10] fill-[#E86A10]" />
              <span className="font-bold text-[#1a3d1a] text-xs lg:text-sm">4.6</span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE LAYOUT (below md) - Pixel-perfect match to website view */}
        {/* ------------------------------------------------------------- */}
        <div className="md:hidden flex flex-col h-full justify-between pt-1 overflow-hidden relative">
          {/* Top section: Title and Subtitle */}
          <div className="px-4 text-center z-20 flex flex-col items-center gap-1.5 mt-0.5">
            <h1 className="font-serif-display text-[#1a3d1a] text-[26px] xs:text-[28px] leading-[1.16] font-bold">
              A Tradition of Quality.<br className="hidden xs:block" /> A Legacy of Trust.
            </h1>
            <p className="text-gray-700 text-xs max-w-[310px] leading-snug font-medium">
              Premium cattle feed, chelated minerals & essential dairy nutrition supplements.
            </p>
          </div>

          {/* Side-by-side cards: Heat Max (Left) and Farmer Reviews (Right) */}
          <div className="px-3 py-1 flex items-stretch justify-center gap-3 z-20">
            {/* Left Card: Heat Max with Buy / Go to Store button */}
            <div
              onClick={onNavigateStore}
              className="w-[145px] xs:w-[155px] bg-white/85 backdrop-blur-md p-2 rounded-2xl border border-white/90 shadow-md flex flex-col justify-between items-center cursor-pointer select-none active:scale-[0.98] transition-all hover:border-[#123814]/20"
            >
              <div className="w-full h-[88px] rounded-xl overflow-hidden relative bg-white/70 p-1 flex items-center justify-center">
                <img
                  src={getAssetUrl("/heatmax.png")}
                  alt="Heat Max Booster"
                  className="w-full h-full object-contain drop-shadow-sm"
                />
              </div>
              <div className="w-full flex items-center justify-between mt-1 px-0.5">
                <span className="text-[11px] font-extrabold text-gray-800 line-clamp-1">Heat Max</span>
                <span className="text-[11px] font-black text-[#1a3d1a]">₹499</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onNavigateStore) onNavigateStore();
                }}
                className="w-full mt-1.5 py-1 px-2 rounded-lg bg-[#E86A10] hover:bg-[#d05c0b] text-white text-[10px] font-extrabold flex items-center justify-center gap-1 shadow-xs active:scale-95 transition-transform cursor-pointer"
              >
                <span>Buy / Store</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            {/* Right Card: Video Review */}
            <div
              onClick={onNavigateStore}
              className="w-[145px] xs:w-[155px] bg-white/85 backdrop-blur-md p-2 rounded-2xl border border-white/90 shadow-md flex flex-col justify-between items-center text-center cursor-pointer select-none active:scale-[0.98] transition-all"
            >
              <div className="w-full h-[88px] rounded-xl overflow-hidden relative bg-black/10">
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/76be6ec3a93a703b15e9cc01e764a4e3f9d7d2c0.png"
                  alt="Farmer Video Review"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-[#1a3d1a] border border-white/60 flex items-center justify-center text-white shadow-md">
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="w-full mt-1 px-0.5 flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-gray-800 line-clamp-1">Farmer Reviews</span>
                <span className="text-[10px] font-bold text-[#E86A10] flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-[#E86A10]" /> 4.9
                </span>
              </div>
              <div className="w-full mt-1.5 py-1 px-2 rounded-lg bg-[#123814]/10 text-[#123814] text-[10px] font-extrabold flex items-center justify-center gap-1">
                <span>Watch Stories</span>
                <Play className="w-2.5 h-2.5 fill-[#123814]" />
              </div>
            </div>
          </div>

          {/* Bottom 3-panel images resting at the bottom with cows over light green boxes and 98K+/4.8 badges */}
          <div className="relative z-10 flex items-end justify-center w-full mt-auto pointer-events-auto">
            {/* Left Image & Box (Cow Left) */}
            <div className="flex-1 relative overflow-visible flex items-end justify-center">
              {/* Light green box */}
              <div className="absolute bottom-0 left-0 right-0 h-[68px] bg-[#9ce4b3] rounded-t-xl z-0" />

              {/* Cow image with hooves resting on top edge of light green box */}
              <img
                src={getAssetUrl("/left-cow.png")}
                alt="Agro cow left"
                className="w-full h-auto block object-contain relative z-10"
                style={{ transform: 'translateY(-34px) scale(0.85)', transformOrigin: 'bottom center' }}
              />

              {/* Bottom-left 98K+ Badge */}
              <div className="absolute bottom-1.5 left-1.5 z-20 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-white/70">
                <div className="flex items-center -space-x-1">
                  <img
                    src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128"
                    alt="User"
                    className="w-3.5 h-3.5 rounded-full object-cover"
                  />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1a3d1a] text-white flex items-center justify-center text-[7px] font-bold">
                    +
                  </div>
                </div>
                <span className="font-extrabold text-[#1a3d1a] text-[9px]">98K+</span>
              </div>
            </div>

            {/* Center Dark Green Box Panel with milk bottle */}
            <div className="flex-[1.28] h-[95px] bg-[#0c310c] relative overflow-visible flex flex-col items-center justify-end pb-2.5 text-center shadow-lg rounded-t-xl">
              {/* Milk Max bottle popping up over dark green box */}
              <img
                src={getAssetUrl("/milk1.png")}
                alt="Milk Max Product"
                className="h-[80px] object-contain relative z-20 -mt-10 drop-shadow-md transition-transform duration-300 hover:scale-105"
              />
              <button
                onClick={() => document.getElementById('toonhub')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white font-bold text-[9px] shadow-md active:scale-95 transition-transform z-20 cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>

            {/* Right Image & Box (Cow Right) */}
            <div className="flex-1 relative overflow-visible flex items-end justify-center">
              {/* Light green box */}
              <div className="absolute bottom-0 left-0 right-0 h-[68px] bg-[#9ce4b3] rounded-t-xl z-0" />

              {/* Cow image with hooves resting on top edge of light green box */}
              <img
                src={getAssetUrl("/right-cow.png")}
                alt="Agro cow right"
                className="w-full h-auto block object-contain relative z-10"
                style={{ transform: 'translateY(-34px) scale(0.85)', transformOrigin: 'bottom center' }}
              />

              {/* Bottom-right 4.8 Rating Badge */}
              <div className="absolute bottom-1.5 right-1.5 z-20 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm border border-white/70">
                <Star className="w-2.5 h-2.5 text-[#E86A10] fill-[#E86A10]" />
                <span className="font-extrabold text-[#1a3d1a] text-[9px]">4.8</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
