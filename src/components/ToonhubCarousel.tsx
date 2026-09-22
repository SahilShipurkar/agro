import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
    src: '/navmin.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    id: 'heat-plus',
    name: 'Heat Plus',
    subtitle: 'Reproductive Nutrition Support',
    description:
      'Heat Plus is a nutritional supplement designed to support reproductive management in dairy animals as part of a proper nutrition and herd-management program.',
    idealFor: '🐄 Cows • 🐃 Buffaloes',
    src: '/Heat.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
];

const grainDataUrl =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)' opacity='0.08'/></svg>";

export default function ToonhubCarousel({}: ToonhubCarouselProps = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    PRODUCTS.forEach((item) => {
      const img = new Image();
      img.src = item.src;
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: currentProduct.bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div
        className="relative w-full"
        style={{ height: '100vh', overflow: 'hidden' }}
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
            top: '18%',
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(60px, 18vw, 320px)',
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
                  src={item.src}
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

        {/* Bottom-left product info text + nav buttons */}
        <div
          className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 lg:left-12 flex flex-col gap-2.5"
          style={{ zIndex: 60, maxWidth: isMobile ? '300px' : '420px' }}
        >
          {/* Glassmorphic Card Container */}
          <div
            key={currentProduct.id}
            className="p-4 sm:p-5 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] transition-all duration-300"
          >
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white bg-black/30 px-2.5 py-0.5 rounded-full mb-1.5 backdrop-blur-sm shadow-inner">
              {currentProduct.subtitle}
            </span>
            <h2 className="font-extrabold uppercase mb-1.5 text-lg sm:text-2xl text-white tracking-wide drop-shadow-md">
              {currentProduct.name}
            </h2>
            <p className="text-xs sm:text-sm text-white/95 mb-2.5 leading-relaxed font-medium drop-shadow-sm">
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

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2 sm:gap-3 pl-0.5">
            <button
              onClick={() => navigate('prev')}
              aria-label="Previous product"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/80 bg-black/25 backdrop-blur-md text-white flex items-center justify-center cursor-pointer select-none transition-all duration-200 hover:scale-105 hover:bg-black/40 active:scale-95 shadow-md"
            >
              <ArrowLeft size={18} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate('next')}
              aria-label="Next product"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/80 bg-black/25 backdrop-blur-md text-white flex items-center justify-center cursor-pointer select-none transition-all duration-200 hover:scale-105 hover:bg-black/40 active:scale-95 shadow-md"
            >
              <ArrowRight size={18} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Bottom-right link "DISCOVER IT" */}
        <div
          className="absolute bottom-6 right-4 sm:bottom-12 sm:right-10"
          style={{ zIndex: 60 }}
        >
          <a
            href="#discover"
            className="flex items-center gap-2 text-white no-underline uppercase opacity-95 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            <span>DISCOVER IT</span>
            <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </a>
        </div>
      </div>
    </div>
  );
}
