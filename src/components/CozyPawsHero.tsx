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
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <img
            src="https://polo-pecan-73837341.figma.site/_assets/v11/0ae29d6d9628bede667f90d57bebe81b8f1ec2bf.svg"
            alt="CozyPaws Logo"
            className="w-[130px] h-[33px] lg:w-[205px] lg:h-[52px] object-contain cursor-pointer"
          />
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
          <h1 className="font-serif-display text-[#1a3d1a] leading-[0.95] tracking-tight text-5xl sm:text-7xl lg:text-[clamp(60px,7.5vw,110px)] flex flex-col items-center">
            <span className="block">
              <span className="inline-block animate-word-pop delay-200">Everything</span>
            </span>
            <span className="block mt-1 sm:mt-2">
              <span className="inline-block animate-word-pop delay-300">Your</span>{' '}
              <span className="inline-block animate-word-pop delay-400">Pets</span>{' '}
              <span className="inline-block animate-word-pop delay-500">Love</span>
            </span>
          </h1>
        </div>

        {/* Left Product Card (Cozy Cat House) - Desktop/Tablet */}
        <div className="hidden md:block absolute top-[60px] lg:top-[50px] left-4 lg:left-12 z-20 w-[160px] lg:w-[clamp(160px,14vw,260px)] animate-slide-in-left delay-600">
          <div className="relative rounded-2xl overflow-hidden aspect-[260/257] bg-white/40 shadow-sm border border-white/60 group">
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png"
              alt="Cozy Cat House"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <button className="absolute bottom-2 right-2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white flex items-center justify-center transition-transform hover:scale-110 shadow-md cursor-pointer">
              <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="text-gray-700 text-xs lg:text-sm font-medium">Cozy Cat House</span>
            <span className="text-[#1a3d1a] font-bold text-sm lg:text-base">$49.99</span>
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
          {/* Left Image */}
          <div className="flex-1 max-h-[60vh] lg:max-h-[min(70vh,55vw)] relative overflow-hidden animate-photo-reveal delay-700">
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png"
              alt="Pet left"
              className="w-full h-auto block object-cover"
            />
            {/* Left Overlay */}
            <div className="absolute bottom-[clamp(20px,4vh,50px)] left-6 lg:left-12 z-20 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-full flex items-center gap-3 shadow-lg border border-white/70 animate-fade-up delay-1000">
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-[#1a3d1a] border-2 border-white flex items-center justify-center">
                  <Plus className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <span className="font-bold text-[#1a3d1a] text-sm lg:text-base">98K+</span>
            </div>
          </div>

          {/* Center Image (Tallest) */}
          <div className="flex-[1.265] max-h-[75vh] lg:max-h-[min(85vh,70vw)] relative overflow-hidden animate-photo-reveal delay-600">
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024"
              alt="Pet center"
              className="w-full h-auto block object-cover"
            />
            {/* Center Overlay */}
            <div className="absolute bottom-[clamp(20px,4vh,50px)] left-1/2 -translate-x-1/2 z-20 text-center flex flex-col items-center gap-3 w-full px-4 animate-fade-up delay-1100">
              <h2 className="text-white text-lg sm:text-2xl font-bold drop-shadow-md">
                Best Products for Your Pet
              </h2>
              <button
                onClick={() => document.getElementById('toonhub')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white font-medium text-sm transition-all duration-200 shadow-lg hover:scale-105 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                Explore Products
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 max-h-[60vh] lg:max-h-[min(70vh,55vw)] relative overflow-hidden animate-photo-reveal delay-800">
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png"
              alt="Pet right"
              className="w-full h-auto block object-cover"
            />
            {/* Right Overlay */}
            <div className="absolute bottom-[clamp(20px,4vh,50px)] right-6 lg:right-12 z-20 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg border border-white/70 animate-fade-up delay-1200">
              <Star className="w-5 h-5 text-[#E86A10] fill-[#E86A10]" />
              <span className="font-bold text-[#1a3d1a] text-sm lg:text-base">4.6</span>
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
              Everything Your Pets Love
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
              <div className="w-full aspect-square rounded-lg overflow-hidden relative">
                <img
                  src="https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png"
                  alt="Cozy Cat House"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-medium text-gray-800 mt-1 line-clamp-1">Cat House</span>
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
            <div className="flex-1 relative">
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png"
                alt="Pet left"
                className="w-full h-auto block object-cover"
              />
            </div>
            <div className="flex-[1.265] relative">
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024"
                alt="Pet center"
                className="w-full h-auto block object-cover"
              />
            </div>
            <div className="flex-1 relative">
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png"
                alt="Pet right"
                className="w-full h-auto block object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
