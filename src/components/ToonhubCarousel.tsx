import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

interface ImageItem {
  src: string;
  bg: string;
  panel: string;
}

interface ToonhubCarouselProps {
  onSwitchToCozyPaws?: () => void;
}

const IMAGES: ImageItem[] = [
  {
    src: '/Heat.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    src: '/milk1.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    src: '/sarkhi.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
  {
    src: '/navmin.png',
    bg: '#6BBF7A',
    panel: '#85CC92',
  },
];

const grainDataUrl =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='noise'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23noise)' opacity='0.08'/></svg>";

export default function ToonhubCarousel({ onSwitchToCozyPaws }: ToonhubCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    IMAGES.forEach((item) => {
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
    const N = IMAGES.length;
    setActiveIndex((prev) =>
      direction === 'next' ? (prev + 1) % N : (prev + N - 1) % N
    );
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const getRoleStyle = (index: number) => {
    const N = IMAGES.length;
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
        height: isMobile ? '52%' : '65%',
        bottom: isMobile ? '20%' : '6%',
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

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
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
            fontSize: 'clamp(90px, 28vw, 380px)',
            fontWeight: 900,
            color: 'white',
            opacity: 1,
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
          }}
        >
          3D SHAPE
        </div>

        {/* Top-left brand label & CozyPaws switcher */}
        <div
          className="absolute top-6 left-4 sm:left-8 flex items-center gap-4 text-xs font-semibold uppercase text-white"
          style={{ zIndex: 60, letterSpacing: '0.18em' }}
        >
          <span style={{ opacity: 0.9 }}>TOONHUB</span>
          {onSwitchToCozyPaws && (
            <button
              onClick={onSwitchToCozyPaws}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold tracking-normal uppercase transition-all cursor-pointer"
            >
              <Home className="w-3 h-3" />
              CozyPaws
            </button>
          )}
        </div>

        {/* Carousel */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, index) => {
            const roleStyle = getRoleStyle(index);
            return (
              <div
                key={index}
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
                  alt={`Toonhub product ${index + 1}`}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom-left text + nav buttons */}
        <div
          className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24"
          style={{ zIndex: 60, maxWidth: '320px' }}
        >
          <p
            className="font-bold uppercase mb-2 sm:mb-3 text-base sm:text-[22px] text-white"
            style={{
              opacity: 0.95,
              letterSpacing: '0.02em',
            }}
          >
            TOONHUB FIGURINES
          </p>
          <p
            className="hidden sm:block text-xs sm:text-sm text-white mb-4 sm:mb-5"
            style={{
              opacity: 0.85,
              lineHeight: 1.6,
            }}
          >
            The artwork is stunning, shipped fully prepared. The finish is a
            vision, the 3D craft is flawless. Many thanks! Wishing you the win.
            Order now.
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate('prev')}
              aria-label="Previous character"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-transparent text-white flex items-center justify-center cursor-pointer select-none transition-all duration-150 hover:scale-[1.08] hover:bg-[rgba(255,255,255,0.12)] active:scale-95"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button
              onClick={() => navigate('next')}
              aria-label="Next character"
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white bg-transparent text-white flex items-center justify-center cursor-pointer select-none transition-all duration-150 hover:scale-[1.08] hover:bg-[rgba(255,255,255,0.12)] active:scale-95"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Bottom-right link "DISCOVER IT" */}
        <div
          className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10"
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
