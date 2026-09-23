import { Phone, MessageSquare, MapPin, ArrowUp, Milk, Award, Sparkles, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';
import { useLanguage } from '@/lib/languageContext';

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
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gradient-to-br from-[#6BBF7A] via-[#7BC78A] to-[#85CC92] text-[#123814] font-['Inter',sans-serif] relative overflow-hidden border-t-2 border-[#123814]/20 shadow-inner">
      {/* Decorative subtle background shapes */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#123814]/10 rounded-full blur-2xl pointer-events-none" />

      {/* ========================================================= */}
      {/* MOBILE COMPACT FOOTER (md:hidden) - Minimal, Rows-aligned */}
      {/* ========================================================= */}
      <div className="md:hidden px-3.5 py-3 relative z-10 space-y-2.5">
        {/* Row 1: Brand Logo + Name + Action Buttons in one compact row */}
        <div className="bg-white/90 backdrop-blur-md border border-[#123814]/15 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={getAssetUrl("/Whitte Circle logo(3).png")}
              alt="Navbharat Agro Services Logo"
              className="w-7 h-7 object-contain rounded-full shadow-xs border border-[#123814]/20 shrink-0"
            />
            <div className="truncate">
              <h3 className="text-xs font-extrabold text-[#123814] leading-tight truncate">
                {t('nav.shortBrand', 'Navbharat Agro')}
              </h3>
              <p className="text-[9px] text-[#1e5221] font-medium truncate">
                Dairy & Livestock Nutrition
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href="https://wa.me/918237795424"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Inquiry"
              className="inline-flex items-center gap-1 bg-[#25D366] text-white px-2 py-1 rounded-full font-bold text-[10px] shadow-xs active:scale-95 transition-transform"
            >
              <MessageSquare className="w-2.5 h-2.5 fill-white" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:8237795424"
              aria-label="Call Helpline"
              className="inline-flex items-center gap-1 bg-[#E86A10] text-white px-2 py-1 rounded-full font-bold text-[10px] shadow-xs active:scale-95 transition-transform"
            >
              <Phone className="w-2.5 h-2.5" />
              <span>{t('footer.callShort', 'Call')}</span>
            </a>
          </div>
        </div>

        {/* Row 2: 2-Column Compact Links Grid */}
        <div className="grid grid-cols-2 gap-2 bg-white/60 backdrop-blur-xs rounded-xl p-2.5 border border-[#123814]/10 text-[10px]">
          {/* Col 1: Navigation */}
          <div>
            <span className="font-extrabold text-[#123814] text-[11px] block mb-1 border-b border-[#123814]/10 pb-0.5">
              {t('footer.pages', 'Pages')}
            </span>
            <ul className="space-y-0.5 text-[#18441b] font-medium">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    if (onNavigateHome) {
                      e.preventDefault();
                      onNavigateHome();
                    }
                  }}
                  className="hover:text-[#E86A10] transition-colors block py-0.5"
                >
                  • {t('nav.home', 'Home')}
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
                  className="hover:text-[#E86A10] transition-colors block py-0.5"
                >
                  • {t('nav.aboutUs', 'About Us')}
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
                  className="hover:text-[#E86A10] transition-colors block py-0.5"
                >
                  • {t('nav.products', 'Products')}
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
                  className="hover:text-[#E86A10] font-bold text-[#123814] block py-0.5"
                >
                  • {t('nav.store', 'Store')} 🛒
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Products Range */}
          <div>
            <span className="font-extrabold text-[#123814] text-[11px] block mb-1 border-b border-[#123814]/10 pb-0.5">
              {t('footer.topProducts', 'Top Products')}
            </span>
            <ul className="space-y-0.5 text-[#18441b] font-medium">
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    if (onNavigateHome) {
                      e.preventDefault();
                      onNavigateHome();
                    }
                  }}
                  className="hover:text-[#E86A10] transition-colors block py-0.5"
                >
                  • Home
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
                  className="hover:text-[#E86A10] transition-colors block py-0.5"
                >
                  • About Us
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
                  className="hover:text-[#E86A10] transition-colors block py-0.5"
                >
                  • Products
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
                  className="hover:text-[#E86A10] font-bold text-[#123814] block py-0.5"
                >
                  • Store 🛒
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Products Range */}
          <div>
            <span className="font-extrabold text-[#123814] text-[11px] block mb-1 border-b border-[#123814]/10 pb-0.5">
              Top Products
            </span>
            <ul className="space-y-0.5 text-[#18441b] font-medium">
              <li>
                <a
                  href="#discover"
                  onClick={(e) => {
                    if (onNavigateDiscover) {
                      e.preventDefault();
                      onNavigateDiscover();
                    }
                  }}
                  className="hover:text-[#E86A10] transition-colors block py-0.5 truncate"
                >
                  • MilkMax Calcium
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
                  className="hover:text-[#E86A10] transition-colors block py-0.5 truncate"
                >
                  • Sarki Pend Feed
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
                  className="hover:text-[#E86A10] transition-colors block py-0.5 truncate"
                >
                  • NavMin Minerals
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
                  className="hover:text-[#E86A10] transition-colors block py-0.5 truncate"
                >
                  • Advanta 756 Silage
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Row 3: Helpline Info & Nationwide delivery */}
        <div className="flex items-center justify-between text-[10px] text-[#123814] font-semibold bg-white/40 px-2.5 py-1 rounded-lg">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#E86A10] shrink-0" />
            <span>Pan-India Delivery</span>
          </div>
          <a href="tel:8237795424" className="flex items-center gap-1 hover:text-[#E86A10]">
            <Phone className="w-3 h-3 text-[#E86A10]" />
            <span>8237795424</span>
          </a>
        </div>

        {/* Row 4: Copyright & Back to Top in 1 row */}
        <div className="flex items-center justify-between pt-1 border-t border-[#123814]/15 text-[9px] text-[#18441b]">
          <span>© {new Date().getFullYear()} Navbharat Agro</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full font-bold text-[#123814] border border-[#123814]/15 shadow-2xs"
          >
            <span>Top</span>
            <ArrowUp className="w-2.5 h-2.5 text-[#E86A10]" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP FOOTER (hidden md:block) - Preserved Original */}
      {/* ========================================================= */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 relative z-10">
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
                {t('nav.brand', 'Navbharat Agro Services')}
              </h3>
              <p className="text-xs text-[#1e5221] font-medium">
                {t('footer.tradition', 'A Tradition of Quality • A Legacy of Trust')}
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
              {t('footer.whatsAppInquiry', 'WhatsApp Inquiry')}
            </a>
            <a
              href="tel:8237795424"
              className="inline-flex items-center gap-1.5 bg-[#E86A10] hover:bg-[#d05c0b] text-white px-4 py-2 rounded-full font-bold text-xs transition-all shadow-sm hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5" />
              {t('footer.callUs', 'Call 8237795424')}
            </a>
          </div>
        </div>

        {/* 4 COLUMNS GRID (MINIMIZED) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-6 border-b border-[#123814]/15">
          {/* COLUMN 1: Company Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[#123814] font-extrabold text-sm sm:text-base">
              <ShieldCheck className="w-4 h-4 text-[#E86A10]" />
              <span>{t('footer.aboutTitle', 'About Navbharat Agro')}</span>
            </div>
            <p className="text-xs text-[#18441b] leading-relaxed">
              {t('footer.aboutText', 'Formulating cattle feeds, mineral mixtures, Advanta 756 maize silage, and specialized supplements for cows and buffaloes across India.')}
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#123814] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#E86A10] shrink-0" />
              <span>{t('footer.servingNationwide', 'Serving Dairy Farmers Nationwide')}</span>
            </div>
          </div>

          {/* COLUMN 2: Products Quick Links */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[#123814] font-extrabold text-sm sm:text-base">
              <Milk className="w-4 h-4 text-[#E86A10]" />
              <span>{t('footer.productRange', 'Product Range')}</span>
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
              <span>{t('footer.navigation', 'Navigation')}</span>
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
                  {t('nav.home', 'Home')}
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
                  {t('nav.aboutUs', 'About Us')}
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
                  {t('nav.products', 'Products')}
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
                  {t('carousel.discoverAll', 'Discover All Products')} →
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
                  {t('nav.store', 'Store')} 🛒
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#E86A10] hover:underline transition-colors">
                  {t('nav.gallery', 'Gallery')}
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Contact & Order */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[#123814] font-extrabold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-[#E86A10]" />
              <span>{t('footer.orderHelpline', 'Order Helpline')}</span>
            </div>
            <div className="bg-white/80 backdrop-blur p-3 rounded-xl border border-[#123814]/15 space-y-1.5">
              <p className="text-[11px] text-[#18441b] font-medium">
                {t('footer.bulkPricing', 'For order placement or bulk pricing:')}
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
                  <span>{t('footer.whatsAppInquiry', 'WhatsApp Inquiry')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & BACK TO TOP BAR */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#18441b] font-medium">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-[#123814]">Navbharat Agro Services</strong>. {t('footer.copyright', 'All Rights Reserved.')}
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 bg-white/90 hover:bg-white text-[#123814] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border border-[#123814]/20 shadow-xs hover:scale-105 cursor-pointer"
          >
            <span>{t('footer.backToTop', 'Back to Top')}</span>
            <ArrowUp className="w-3 h-3 text-[#E86A10]" />
          </button>
        </div>
      </div>
    </footer>
  );
}

