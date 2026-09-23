import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';

interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  idealFor: string;
  form?: string;
  src: string;
  bg: string;
  panel: string;
  scale?: number;
}

interface ToonhubCarouselProps {
  onSwitchToCozyPaws?: () => void;
  onNavigateDiscover?: () => void;
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'milk-max',
    name: 'Milk Max',
    subtitle: 'Calcium Supplement for Dairy Animals',
    description:
      'MilkMax / Milkiyana is a calcium supplement designed to support the nutritional requirements of dairy animals, particularly during important stages of the lactation cycle.',
    idealFor: '🐄 Cows • 🐃 Buffaloes',
    form: 'Liquid',
    src: '/milk1.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    id: 'sarki-pend',
    name: 'Dugdhsamrudhi Sarki Pend',
    subtitle: 'Cattle Feed for Dairy Animals',
    description:
      'Dugdhsamrudhi Sarki Pend is a cattle feed solution designed for dairy farmers looking to provide balanced nutritional support to their milking animals.',
    idealFor: '🐄 Cows • 🐃 Buffaloes',
    form: 'Solid Cake',
    src: '/sarkhi.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
    scale: 1.35,
  },
  {
    id: 'navmin',
    name: 'NavMin',
    subtitle: 'Mineral & Nutritional Supplement',
    description:
      "NavMin is a mineral and nutritional supplement designed to support the nutritional requirements of dairy animals. It can be incorporated into a suitable livestock nutrition program based on the animal's requirements and professional guidance.",
    idealFor: '🐄 Cows • 🐃 Buffaloes • 🐐 Goats',
    form: 'Chelated Mineral Powder',
    src: '/navmin.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    id: 'fat-max',
    name: 'FatMax',
    subtitle: 'Milk Fat Booster Supplement',
    description:
      'FatMax is a specialized nutritional supplement designed for dairy animals as part of a balanced feeding program to optimize milk fat percentage and yield.',
    idealFor: '🐄 Cows • 🐃 Buffaloes',
    form: 'Powder',
    src: '/fatmax.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    id: 'garbha-care',
    name: 'Garbha Care',
    subtitle: 'Uterine & Pregnancy Care Supplement',
    description:
      'Garbha Care is a specialized tonic formulated to support uterine health, post-calving cleansing, and overall pregnancy wellness in dairy animals.',
    idealFor: '🐄 Cows • 🐃 Buffaloes',
    form: 'Liquid Tonic',
    src: '/garbhaCare.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    id: 'grow-max',
    name: 'Grow Max',
    subtitle: 'Calf Growth & Muscle Development',
    description:
      'Grow Max is a growth promoter and weight-gain supplement for calves and young cattle, supporting early muscle development and gut digestion.',
    idealFor: '🐄 Calves • 🐃 Young Cattle',
    form: 'Powder',
    src: '/growmax.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    id: 'heat-max',
    name: 'Heat Max',
    subtitle: 'Advanced Estrous & Reproductive Booster',
    description:
      'Heat Max is an advanced reproductive formulation enriched with vitamins and chelated minerals to induce timely heat and optimize breeding results.',
    idealFor: '🐄 Cows • 🐃 Buffaloes',
    form: 'Bolus / Powder Pack',
    src: '/heatmax.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    id: 'mast-guard',
    name: 'Mast Guard',
    subtitle: 'Udder Care & Mastitis Protection',
    description:
      'Mast Guard is an udder immunity and tissue recovery supplement designed to protect against mastitis, support teat health, and preserve milk purity.',
    idealFor: '🐄 Cows • 🐃 Buffaloes',
    form: 'Powder / Ointment',
    src: '/mastguard.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },

];

const grainDataUrl =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)' opacity='0.08'/></svg>";

export default function ToonhubCarousel({
  onNavigateDiscover,
}: ToonhubCarouselProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    PRODUCTS.forEach((item) => {
      const img = new Image();
      img.src = getAssetUrl(item.src);
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll every 3 seconds and rotate continuously
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PRODUCTS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, activeIndex]);

  const navigate = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    const N = PRODUCTS.length;
    setActiveIndex((prev) =>
      direction === 'next' ? (prev + 1) % N : (prev + N - 1) % N
    );
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const getRoleStyle = (index: number) => {
    const N = PRODUCTS.length;
    const isCenter = index === activeIndex;
    const isLeft = index === (activeIndex + N - 1) % N;
    const isRight = index === (activeIndex + 1) % N;

    if (isCenter) {
      return {
        transform: `translateX(-50%) scale(${isMobile ? 1.05 : 1.15})`,
        filter: 'none',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '48%' : '62%',
        bottom: isMobile ? '24%' : '12%',
      };
    }

    if (isLeft) {
      return {
        transform: 'translateX(-50%) scale(0.85)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '18%' : '26%',
        height: isMobile ? '26%' : '38%',
        bottom: isMobile ? '26%' : '14%',
      };
    }

    if (isRight) {
      return {
        transform: 'translateX(-50%) scale(0.85)',
        filter: 'blur(2px)',
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? '82%' : '74%',
        height: isMobile ? '26%' : '38%',
        bottom: isMobile ? '26%' : '14%',
      };
    }

    return {
      transform: 'translateX(-50%) scale(0.6)',
      filter: 'blur(4px)',
      opacity: 0,
      zIndex: 5,
      left: '50%',
      height: isMobile ? '20%' : '30%',
      bottom: isMobile ? '26%' : '14%',
    };
  };

  const currentProduct = PRODUCTS[activeIndex];

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Horizontal swipe threshold 40px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        navigate('next');
      } else {
        navigate('prev');
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor: currentProduct.bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        className="relative w-full h-full md:h-screen overflow-hidden"
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            backgroundImage: `url("${grainDataUrl}")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            opacity: 0.4,
          }}
        />

        {/* Giant ghost text */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            zIndex: 2,
            top: isMobile ? '12%' : '18%',
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(44px, 16vw, 320px)',
            fontWeight: 900,
            color: 'white',
            opacity: 1,
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          OUR PRODUCTS
        </div>

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {PRODUCTS.map((item, index) => {
            const roleStyle = getRoleStyle(index);
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (index !== activeIndex) {
                    setActiveIndex(index);
                  }
                }}
                className="cursor-pointer"
                style={{
                  position: 'absolute',
                  aspectRatio: '0.6 / 1',
                  ...roleStyle,
                  transition:
                    'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1)',
                  willChange: 'transform, filter, opacity',
                }}
              >
                <img
                  src={getAssetUrl(item.src)}
                  alt={item.name}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    transform: item.scale ? `scale(${item.scale})` : undefined,
                    transformOrigin: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP (sm+) CONTROLS LAYOUT */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden sm:block">
          {/* Bottom-left product info text */}
          <div
            className="absolute bottom-6 left-8 lg:left-12 flex flex-col gap-2.5"
            style={{ zIndex: 60, maxWidth: '420px' }}
          >
            <div
              key={currentProduct.id}
              className="p-5 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] transition-all duration-300"
            >
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-white bg-black/30 px-2.5 py-0.5 rounded-full mb-1.5 backdrop-blur-sm shadow-inner">
                {currentProduct.subtitle}
              </span>
              <h2 className="font-extrabold uppercase mb-1.5 text-2xl text-white tracking-wide drop-shadow-md">
                {currentProduct.name}
              </h2>
              <p className="text-sm text-white/95 mb-2.5 leading-relaxed font-medium drop-shadow-sm">
                {currentProduct.description}
              </p>
              <div className="inline-flex flex-wrap items-center gap-2 text-xs text-white bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/25 shadow-sm">
                <div>
                  <span className="font-bold text-white">Ideal For:</span>{' '}
                  {currentProduct.idealFor}
                </div>
                {currentProduct.form && (
                  <div className="border-l border-white/30 pl-2">
                    <span className="font-bold text-white">Form:</span>{' '}
                    {currentProduct.form}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center Navigation Arrows */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 pointer-events-auto"
            style={{ zIndex: 60 }}
          >
            <button
              onClick={() => navigate('prev')}
              aria-label="Previous product"
              className="w-12 h-12 rounded-full border border-white/80 bg-black/30 backdrop-blur-md text-white flex items-center justify-center cursor-pointer select-none transition-all duration-200 hover:scale-110 hover:bg-black/50 active:scale-95 shadow-lg"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => navigate('next')}
              aria-label="Next product"
              className="w-12 h-12 rounded-full border border-white/80 bg-black/30 backdrop-blur-md text-white flex items-center justify-center cursor-pointer select-none transition-all duration-200 hover:scale-110 hover:bg-black/50 active:scale-95 shadow-lg"
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Bottom-right link "DISCOVER IT" */}
          <div
            className="absolute bottom-10 right-10"
            style={{ zIndex: 60 }}
          >
            <a
              href="#discover"
              onClick={(e) => {
                if (onNavigateDiscover) {
                  e.preventDefault();
                  onNavigateDiscover();
                }
              }}
              className="group inline-flex items-center gap-3 text-white no-underline uppercase cursor-pointer select-none transition-all duration-300 animate-live-pulse hover:scale-110 active:scale-95"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 'clamp(28px, 4.5vw, 58px)',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
              aria-label="Discover all products - Click here"
            >
              <span className="drop-shadow-lg group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.9)] transition-all">
                DISCOVER IT
              </span>
              <ArrowRight
                className="w-8 h-8 animate-arrow-bounce drop-shadow-md group-hover:translate-x-2 transition-transform duration-300"
                strokeWidth={2.5}
              />
            </a>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE (below sm) DEDICATED TOUCH-FRIENDLY CONTROLS */}
        {/* ------------------------------------------------------------- */}
        <div className="sm:hidden absolute bottom-3 inset-x-3 z-[60] flex flex-col gap-2">
          {/* Mobile Info Card */}
          <div
            key={currentProduct.id}
            className="p-3.5 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/30 shadow-2xl text-white"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-white bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {currentProduct.subtitle}
              </span>
              <span className="text-[10px] font-bold text-white/80">
                {activeIndex + 1} / {PRODUCTS.length}
              </span>
            </div>

            <h2 className="font-extrabold uppercase text-base text-white tracking-wide leading-tight mb-1">
              {currentProduct.name}
            </h2>

            <p className="text-xs text-white/90 leading-snug line-clamp-2 mb-2">
              {currentProduct.description}
            </p>

            <div className="flex items-center justify-between text-[11px] text-white/95 bg-black/30 px-2.5 py-1 rounded-xl border border-white/20">
              <span className="font-semibold truncate">{currentProduct.idealFor}</span>
              {currentProduct.form && (
                <span className="border-l border-white/30 pl-2 font-bold shrink-0">{currentProduct.form}</span>
              )}
            </div>
          </div>

          {/* Mobile Bottom Bar: Prev / Next Buttons + Discover It CTA */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('prev')}
                aria-label="Previous product"
                className="w-10 h-10 rounded-full border border-white/60 bg-black/40 backdrop-blur-md text-white flex items-center justify-center active:scale-90 shadow-md cursor-pointer"
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => navigate('next')}
                aria-label="Next product"
                className="w-10 h-10 rounded-full border border-white/60 bg-black/40 backdrop-blur-md text-white flex items-center justify-center active:scale-90 shadow-md cursor-pointer"
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            <a
              href="#discover"
              onClick={(e) => {
                if (onNavigateDiscover) {
                  e.preventDefault();
                  onNavigateDiscover();
                }
              }}
              className="flex-1 max-w-[190px] h-10 inline-flex items-center justify-center gap-2 rounded-full bg-[#E86A10] text-white font-bold text-xs uppercase tracking-wide shadow-lg active:scale-95 transition-transform"
            >
              <span>Discover All</span>
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

