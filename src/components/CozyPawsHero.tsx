import {
  Search,
  ShoppingCart,
  Star,
  ArrowUpRight,
  Play,
  ArrowRight,
  Plus,
} from 'lucide-react';

export default function CozyPawsHero() {
  return (
    <div className="h-screen w-full bg-[#EFFDF0] flex flex-col overflow-hidden relative font-['Inter',sans-serif]">
      {/* HEADER */}
      <header className="shrink-0 w-full px-4 sm:px-8 lg:px-12 py-4 relative z-30 flex items-center justify-between animate-fade-in delay-100">
        {/* Left: Navbharat Agro Services Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none">
          <img
            src="/Whitte Circle logo(3).png"
            alt="Navbharat Agro Services Logo"
            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain rounded-full shadow-md transition-transform hover:scale-105"
          />
          <span className="font-sans font-extrabold text-lg sm:text-xl lg:text-2xl text-[#123814] tracking-tight">
            Navbharat Agro Services
          </span>
        </div>

        {/* Center Nav (hidden below md) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#home" className="text-gray-900 font-semibold hover:text-[#1a3d1a] transition-colors">
            Home
          </a>
          <a href="#shop" className="text-gray-600 hover:text-gray-900 transition-colors">
            Shop
          </a>
          <a href="#delivery" className="text-gray-600 hover:text-gray-900 transition-colors">
            Delivery and payment
          </a>
          <a href="#brands" className="text-gray-600 hover:text-gray-900 transition-colors">
            Brands
          </a>
          <a href="#blog" className="text-gray-600 hover:text-gray-900 transition-colors">
            Blog
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => document.getElementById('toonhub')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-3.5 py-1.5 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white text-xs font-semibold tracking-wide transition-all shadow-sm hover:scale-105 cursor-pointer"
          >
            TOONHUB ↓
          </button>

          {/* Search Button (hidden below sm) */}
          <button
            aria-label="Search"
            className="hidden sm:flex w-10 h-10 rounded-full border border-gray-300 items-center justify-center text-gray-700 hover:border-gray-400 bg-white/50 transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Favorites Button */}
          <button
            aria-label="Favorites"
            className="relative w-10 h-10 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <Star className="w-5 h-5 fill-white text-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E86A10] border-2 border-[#EFFDF0] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
              4
            </span>
          </button>

          {/* Cart Button */}
          <button
            aria-label="Cart"
            className="relative w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-400 bg-white/50 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E86A10] border-2 border-[#EFFDF0] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
              1
            </span>
          </button>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 cursor-pointer shrink-0">
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128"
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
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

        {/* Left Product Card (Heat Plus Care) - Desktop/Tablet */}
        <div className="hidden md:block absolute top-[60px] lg:top-[50px] left-4 lg:left-12 z-20 w-[160px] lg:w-[clamp(160px,14vw,260px)] animate-slide-in-left delay-600">
          <div className="relative rounded-2xl overflow-hidden aspect-[260/257] bg-white/60 shadow-sm border border-white/60 group p-2">
            <img
              src="/Heat.png"
              alt="Heat Plus Care"
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <button className="absolute bottom-2 right-2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md cursor-pointer">
              <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="text-gray-700 text-xs lg:text-sm font-medium">Heat Plus Care</span>
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
              src="/left-cow.png"
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
              src="/milk1.png"
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
              src="/right-cow.png"
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
        {/* MOBILE LAYOUT (below md) */}
        {/* ------------------------------------------------------------- */}
        <div className="md:hidden flex flex-col h-full justify-between pt-2">
          {/* Top section: Title, Subtitle, Button */}
          <div className="px-4 text-center z-20 flex flex-col items-center gap-2">
            <h1 className="font-serif-display text-[#1a3d1a] text-[34px] leading-tight">
              A Tradition of Quality. A Legacy of Trust.
            </h1>
            <p className="text-gray-600 text-xs max-w-xs">
              Discover top quality treats, cozy beds, and essential pet supplies.
            </p>
            <button
              onClick={() => document.getElementById('toonhub')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white text-xs font-semibold shadow-md mt-1 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              Explore Products
            </button>
          </div>

          {/* Cards row: Product & Video side by side */}
          <div className="px-4 py-2 flex items-center justify-center gap-3 z-20">
            {/* Product Card */}
            <div className="w-[110px] bg-white/50 p-2 rounded-xl border border-white/70 shadow-sm flex flex-col items-center">
              <div className="w-full aspect-square rounded-lg overflow-hidden relative bg-white/40 p-1">
                <img
                  src="/Heat.png"
                  alt="Heat Plus Care"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[10px] font-medium text-gray-800 mt-1 line-clamp-1">Heat Plus</span>
              <span className="text-xs font-bold text-[#1a3d1a]">$49.99</span>
            </div>

            {/* Video Card */}
            <div className="w-[110px] bg-white/50 p-2 rounded-xl border border-white/70 shadow-sm flex flex-col items-center text-center">
              <div className="w-full aspect-[3/4] rounded-lg overflow-hidden relative">
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/76be6ec3a93a703b15e9cc01e764a4e3f9d7d2c0.png"
                  alt="Review"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#1a3d1a] flex items-center justify-center text-white">
                  <Play className="w-3 h-3 fill-white ml-0.5" />
                </div>
              </div>
              <span className="text-[9px] text-gray-700 mt-1 line-clamp-1">Watch Reviews</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="px-4 flex items-center justify-center gap-4 text-xs font-semibold text-[#1a3d1a] z-20">
            <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-white">
              <div className="flex items-center -space-x-1.5">
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128"
                  alt="Avatar"
                  className="w-5 h-5 rounded-full object-cover"
                />
                <div className="w-5 h-5 rounded-full bg-[#1a3d1a] flex items-center justify-center">
                  <Plus className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <span>98K+ Happy Pets</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-1 bg-white/80 px-3 py-1.5 rounded-full border border-white">
              <Star className="w-4 h-4 text-[#E86A10] fill-[#E86A10]" />
              <span>4.6 Rating</span>
            </div>
          </div>

          {/* Bottom 3-panel images without max-height constraint */}
          <div className="relative z-10 flex items-end justify-center w-full mt-auto">
            <div className="flex-1 relative bg-[#9ce4b3] rounded-t-xl overflow-hidden">
              <img
                src="/left-cow.png"
                alt="Agro cow left"
                className="w-full h-auto block object-cover"
              />
            </div>
            <div className="flex-[1.265] relative bg-[#0c310c] h-[120px] rounded-t-xl flex items-center justify-center p-2">
              <img
                src="/milk1.png"
                alt="Product"
                className="h-[100px] object-contain relative z-10 -mt-6 drop-shadow-md"
              />
            </div>
            <div className="flex-1 relative bg-[#9ce4b3] rounded-t-xl overflow-hidden">
              <img
                src="/right-cow.png"
                alt="Agro cow right"
                className="w-full h-auto block object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
