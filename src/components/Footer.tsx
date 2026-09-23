import { Phone, MessageSquare, MapPin, ArrowUp, Milk, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';

interface FooterProps {
  onNavigateHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateProducts?: () => void;
  onNavigateDiscover?: () => void;
  onNavigateStore?: () => void;
}

export default function Footer({
  onNavigateHome,
  onNavigateAbout,
  onNavigateProducts,
  onNavigateDiscover,
  onNavigateStore,
}: FooterProps = {}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gradient-to-br from-[#6BBF7A] via-[#7BC78A] to-[#85CC92] text-[#123814] font-['Inter',sans-serif] relative overflow-hidden border-t-2 border-[#123814]/20 shadow-inner">
      {/* Decorative subtle background shapes */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#123814]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Main Compact Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 relative z-10">
        {/* TOP CALLOUT BAR (COMPACT) */}
        <div className="bg-white/90 backdrop-blur-md border border-[#123814]/15 rounded-2xl p-4 sm:p-5 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={getAssetUrl("/Whitte Circle logo(3).png")}
              alt="Navbharat Agro Services Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full shadow-sm border border-[#123814]/20"
            />
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#123814] tracking-tight leading-tight">
                Navbharat Agro Services
              </h3>
              <p className="text-xs text-[#1e5221] font-medium">
                A Tradition of Quality • A Legacy of Trust
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto justify-center">
            <a
              href="https://wa.me/918237795424"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1eb956] text-white px-4 py-2 rounded-full font-bold text-xs transition-all shadow-sm hover:scale-105"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              WhatsApp Inquiry
            </a>
            <a
              href="tel:8237795424"
              className="inline-flex items-center gap-1.5 bg-[#E86A10] hover:bg-[#d05c0b] text-white px-4 py-2 rounded-full font-bold text-xs transition-all shadow-sm hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              Call 8237795424
            </a>
          </div>
        </div>

        {/* 4 COLUMNS GRID (MINIMIZED) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-6 border-b border-[#123814]/15">
          {/* COLUMN 1: Company Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[#123814] font-extrabold text-sm sm:text-base">
              <ShieldCheck className="w-4 h-4 text-[#E86A10]" />
              <span>About Navbharat Agro</span>
            </div>
            <p className="text-xs text-[#18441b] leading-relaxed">
              Formulating cattle feeds, mineral mixtures, Advanta 756 maize silage, and specialized supplements for cows and buffaloes across India.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#123814] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#E86A10] shrink-0" />
              <span>Serving Dairy Farmers Nationwide</span>
            </div>
          </div>

          {/* COLUMN 2: Products Quick Links */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[#123814] font-extrabold text-sm sm:text-base">
              <Milk className="w-4 h-4 text-[#E86A10]" />
              <span>Product Range</span>
            </div>
            <ul className="space-y-1 text-xs text-[#18441b] font-medium">
              <li>
                <a
                  href="#discover"
                  onClick={(e) => {
                    if (onNavigateDiscover) {
                      e.preventDefault();
                      onNavigateDiscover();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors flex items-center gap-1"
                >
                  <span className="text-[#E86A10]">›</span> Dugdhsamrudhi Sarki Pend
                </a>
              </li>
              <li>
                <a
                  href="#discover"
                  onClick={(e) => {
                    if (onNavigateDiscover) {
                      e.preventDefault();
                      onNavigateDiscover();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors flex items-center gap-1"
                >
                  <span className="text-[#E86A10]">›</span> MilkMax Calcium
                </a>
              </li>
              <li>
                <a
                  href="#discover"
                  onClick={(e) => {
                    if (onNavigateDiscover) {
                      e.preventDefault();
                      onNavigateDiscover();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors flex items-center gap-1"
                >
                  <span className="text-[#E86A10]">›</span> NavMin Mineral Supplement
                </a>
              </li>
              <li>
                <a
                  href="#discover"
                  onClick={(e) => {
                    if (onNavigateDiscover) {
                      e.preventDefault();
                      onNavigateDiscover();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors flex items-center gap-1"
                >
                  <span className="text-[#E86A10]">›</span> FatMax Booster & GrowMax
                </a>
              </li>
              <li>
                <a
                  href="#discover"
                  onClick={(e) => {
                    if (onNavigateDiscover) {
                      e.preventDefault();
                      onNavigateDiscover();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors flex items-center gap-1"
                >
                  <span className="text-[#E86A10]">›</span> Heat Plus & GarbhaCare
                </a>
              </li>
              <li>
                <a
                  href="#discover"
                  onClick={(e) => {
                    if (onNavigateDiscover) {
                      e.preventDefault();
                      onNavigateDiscover();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors flex items-center gap-1"
                >
                  <span className="text-[#E86A10]">›</span> Maize Silage (Advanta 756)
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Website Navigation */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[#123814] font-extrabold text-sm sm:text-base">
              <Award className="w-4 h-4 text-[#E86A10]" />
              <span>Navigation</span>
            </div>
            <ul className="space-y-1 text-xs text-[#18441b] font-medium">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    if (onNavigateHome) {
                      e.preventDefault();
                      onNavigateHome();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    if (onNavigateAbout) {
                      e.preventDefault();
                      onNavigateAbout();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#toonhub"
                  onClick={(e) => {
                    if (onNavigateProducts) {
                      e.preventDefault();
                      onNavigateProducts();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors cursor-pointer"
                >
                  Products Carousel
                </a>
              </li>
              <li>
                <a
                  href="#discover"
                  onClick={(e) => {
                    if (onNavigateDiscover) {
                      e.preventDefault();
                      onNavigateDiscover();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors cursor-pointer text-[#123814] font-extrabold"
                >
                  Discover All Products →
                </a>
              </li>
              <li>
                <a
                  href="#store"
                  onClick={(e) => {
                    if (onNavigateStore) {
                      e.preventDefault();
                      onNavigateStore();
                    }
                  }}
                  className="hover:text-[#E86A10] hover:underline transition-colors cursor-pointer text-[#123814] font-extrabold"
                >
                  Store & Collections 🛒
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E86A10] hover:underline transition-colors">
                  Gallery & Careers
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Contact & Order */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[#123814] font-extrabold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-[#E86A10]" />
              <span>Order Helpline</span>
            </div>
            <div className="bg-white/80 backdrop-blur p-3 rounded-xl border border-[#123814]/15 space-y-1.5">
              <p className="text-[11px] text-[#18441b] font-medium">
                For order placement or bulk pricing:
              </p>
              <div className="space-y-1">
                <a
                  href="tel:8237795424"
                  className="flex items-center gap-2 text-xs font-bold text-[#123814] hover:text-[#E86A10] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E86A10]" />
                  <span>+91 8237795424</span>
                </a>
                <a
                  href="https://wa.me/918237795424"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-[#1a853d] hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & BACK TO TOP BAR */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#18441b] font-medium">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-[#123814]">Navbharat Agro Services</strong>. All Rights Reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#123814] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border border-[#123814]/20 shadow-xs hover:scale-105 cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3 h-3 text-[#E86A10]" />
          </button>
        </div>
      </div>
    </footer>
  );
}
