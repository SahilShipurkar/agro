import { useState } from 'react';
import {
  ShoppingCart,
  Milk,
  Baby,
  Award,
  Sparkles,
  Sprout,
  Layers,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageSquare,
  AlertCircle,
  Package,
  Menu,
} from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';
import { useLanguage } from '@/lib/languageContext';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { getDiscoverSections } from '@/lib/productsData';

interface DiscoverPageProps {
  onNavigateHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateProducts?: () => void;
  onNavigateStore?: () => void;
}

export default function DiscoverPage({
  onNavigateHome,
  onNavigateAbout,
  onNavigateProducts,
  onNavigateStore,
}: DiscoverPageProps = {}) {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('dairy-nutrition');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'dairy-nutrition', label: t('discover.tabs.all', 'All Dairy Nutrition'), icon: Milk },
    { id: 'calf-nutrition', label: t('discover.tabs.calf', 'Calf Nutrition'), icon: Baby },
    { id: 'minerals', label: t('discover.tabs.minerals', 'Mineral & Nutritional Supplements'), icon: Award },
    { id: 'reproductive', label: t('discover.tabs.reproductive', 'Reproductive Management'), icon: Sparkles },
    { id: 'feed-fodder', label: t('discover.tabs.feed', 'Feed & Fodder'), icon: Sprout },
    { id: 'silage', label: t('discover.tabs.silage', 'Silage'), icon: Layers },
  ];

  const sections = getDiscoverSections(language);

  const filteredSections =
    activeTab === 'all'
      ? sections
      : sections.filter((sec) => sec.id === activeTab);

  return (
    <div className="w-full bg-[#EFFDF0] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* HEADER WITH NAVBAR BELOW */}
      <header className="shrink-0 w-full relative z-30 animate-fade-in delay-100 bg-[#EFFDF0]">
        {/* Top Row: Logo, Brand Name & Cart Button */}
        <div className="w-full px-4 sm:px-8 lg:px-12 py-2 sm:py-2.5 flex items-center justify-between border-b border-[#123814]/10">
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <img
              src={getAssetUrl("/Whitte Circle logo(3).png")}
              alt="Navbharat Agro Services Logo"
              className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain rounded-full shadow-md transition-transform hover:scale-105"
            />
            <span className="font-sans font-black text-[15px] sm:text-lg lg:text-xl text-[#123814] tracking-tight">
              {t('nav.brand', 'Navbharat Agro Services')}
            </span>
          </div>

          {/* Right Controls: Language Switcher & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <button
              aria-label={t('nav.cart', 'Cart')}
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
            <a
              href="#home"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('nav.home', 'Home')}
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
              {t('nav.aboutUs', 'About Us')}
            </a>
            <a
              href="#toonhub"
              onClick={(e) => {
                if (onNavigateProducts) {
                  e.preventDefault();
                  onNavigateProducts();
                }
              }}
              className="text-[#123814] font-bold hover:text-[#E86A10] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('nav.products', 'Products')}
            </a>
            <a href="#gallery" className="hover:text-[#123814] transition-colors whitespace-nowrap">
              {t('nav.gallery', 'Gallery')}
            </a>
            <a href="#business" className="hover:text-[#123814] transition-colors whitespace-nowrap">
              {t('nav.careers', 'Careers')}
            </a>
            <a href="#blog" className="hover:text-[#123814] transition-colors whitespace-nowrap">
              {t('nav.blog', 'Blog / Resources')}
            </a>
            <a href="#contact" className="hover:text-[#123814] transition-colors whitespace-nowrap">
              {t('nav.contactUs', 'Contact Us')}
            </a>
          </div>
        </nav>

        {/* Bottom Row: Mobile Navigation Bar (Centered 3 sections + menu icon) */}
        <nav className="md:hidden w-full bg-[#EFFDF0]/95 backdrop-blur-md border-b border-[#123814]/10 py-1.5 px-4 relative flex items-center justify-center">
          <div className="flex items-center justify-center gap-6 text-xs font-bold text-gray-700">
            <a
              href="#home"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className="hover:text-[#123814] transition-colors cursor-pointer"
            >
              {t('nav.home', 'Home')}
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
              {t('nav.aboutUs', 'About Us')}
            </a>
            <a
              href="#toonhub"
              onClick={(e) => {
                if (onNavigateProducts) {
                  e.preventDefault();
                  onNavigateProducts();
                }
              }}
              className="text-[#123814] font-extrabold hover:text-[#E86A10] transition-colors cursor-pointer"
            >
              {t('nav.products', 'Products')}
            </a>
          </div>

          {/* List Icon Button for remaining items on right */}
          <div className="absolute right-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t('nav.menu', 'More navigation links')}
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
                  {t('nav.gallery', 'Gallery')}
                </a>
                <a
                  href="#business"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors"
                >
                  {t('nav.careers', 'Careers')}
                </a>
                <a
                  href="#blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors"
                >
                  {t('nav.blog', 'Blog / Resources')}
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors"
                >
                  {t('nav.contactUs', 'Contact Us')}
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* DISCOVER MAIN BODY */}
      <main className="flex-1 w-full bg-[#EFFDF0] py-8 sm:py-12 px-4 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
          {/* CATEGORY FILTER TABS */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto p-2 -mx-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-sm cursor-pointer ${isActive
                    ? 'bg-[#1a3d1a] text-white shadow-md ring-2 ring-[#1a3d1a]/20'
                    : 'bg-white border-2 border-[#1a3d1a]/15 text-[#123814] hover:bg-white/80'
                    }`}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* DYNAMIC SECTIONS GRID */}
          <div className="space-y-16">
            {filteredSections.map((sec) => {
              const SectionIcon = sec.icon;
              return (
                <section key={sec.id} className="space-y-6">
                  {/* Section Title Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#1a3d1a]/15 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#1a3d1a] text-white flex items-center justify-center shadow-md">
                        <SectionIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-serif-display text-2xl sm:text-3xl text-[#123814] font-bold">
                          {sec.title}
                        </h2>
                        <p className="text-gray-700 text-xs sm:text-sm font-medium">
                          {sec.subtitle}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold border ${sec.badgeColor} self-start sm:self-center`}
                    >
                      {sec.items.length} {sec.items.length > 1 ? t('store.items', 'Products') : t('store.item', 'Product')}
                    </span>
                  </div>

                  <p className="text-gray-800 text-sm leading-relaxed max-w-4xl font-medium">
                    {sec.description}
                  </p>

                  {/* Section Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {sec.items.map((prod, idx) => (
                      <div
                        key={idx}
                        className="rounded-3xl bg-white border-2 border-[#1a3d1a]/20 p-6 sm:p-7 shadow-lg hover:shadow-2xl hover:border-[#1a3d1a]/40 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
                      >
                        {/* Image Box */}
                        <div className="w-32 sm:w-44 aspect-square rounded-2xl bg-[#EFFDF0] border border-[#1a3d1a]/10 p-3 flex items-center justify-center shrink-0 self-center sm:self-start">
                          <img
                            src={getAssetUrl(prod.image)}
                            alt={prod.name}
                            className="w-full h-full object-contain drop-shadow-md"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 space-y-3.5 w-full">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-[#E86A10] bg-[#E86A10]/10 px-2.5 py-0.5 rounded-full">
                                {prod.category}
                              </span>
                              {prod.form && (
                                <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-full border border-gray-200">
                                  {prod.form}
                                </span>
                              )}
                            </div>
                            <h3 className="font-extrabold text-[#123814] text-xl sm:text-2xl tracking-tight">
                              {prod.name}
                            </h3>
                            {prod.subtitle && (
                              <p className="text-xs font-semibold text-gray-600 mt-0.5">
                                {prod.subtitle}
                              </p>
                            )}
                          </div>

                          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-medium">
                            {prod.desc}
                          </p>

                          {/* Key Highlights */}
                          <div className="space-y-1.5 pt-1">
                            <p className="text-xs font-bold text-[#123814] uppercase tracking-wide">
                              {t('discover.keyHighlights', 'Key Highlights')}
                            </p>
                            {prod.highlights.map((h, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-xs font-semibold text-gray-800"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#E86A10] shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>

                          {/* Packaging Variant */}
                          {prod.packaging && (
                            <div className="flex items-center gap-2 text-xs text-gray-800 bg-emerald-50/80 border border-emerald-200/80 px-3 py-1.5 rounded-xl">
                              <Package className="w-4 h-4 text-[#1a3d1a] shrink-0" />
                              <div>
                                <span className="font-bold text-[#123814]">{t('discover.packaging', 'Packaging')}:</span>{' '}
                                <span className="font-medium text-gray-700">{prod.packaging}</span>
                              </div>
                            </div>
                          )}

                          {/* Usage / Special Notes */}
                          {prod.usage && (
                            <div className="text-xs text-gray-700 bg-gray-50 border border-gray-200/80 px-3 py-2 rounded-xl">
                              <span className="font-bold text-[#123814]">{t('discover.recommendedUsage', 'Recommended Usage')}:</span>{' '}
                              <span>{prod.usage}</span>
                            </div>
                          )}

                          {/* Important Veterinary Disclaimer */}
                          {prod.importantNote && (
                            <div className="flex items-start gap-2 text-[11px] text-amber-900 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
                              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold">{t('discover.importantNoteTitle', 'Important')}:</span>{' '}
                                <span>{prod.importantNote}</span>
                              </div>
                            </div>
                          )}

                          {/* Delivery Note */}
                          {prod.deliveryNote && (
                            <div className="text-[11px] text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl font-medium">
                              🚚 {prod.deliveryNote}
                            </div>
                          )}

                          {/* Ideal For + Action Buttons */}
                          <div className="pt-3 flex flex-col gap-3 border-t border-gray-200">
                            <div className="text-xs text-gray-800 font-semibold">
                              <span>{t('discover.idealFor', 'Ideal For')}:</span>{' '}
                              <span className="text-[#123814]">{prod.idealFor}</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <a
                                href={`https://wa.me/918237795424?text=Hello%20Navbharat%20Agro%2C%20I%20want%20to%20buy%20or%20order%20${encodeURIComponent(prod.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#1a3d1a] hover:bg-[#2a5a2a] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                              >
                                <span>{t('hero.buyOrStore', 'Buy Now')}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`https://wa.me/918237795424?text=Hello%20Navbharat%20Agro%2C%20I%20have%20an%20enquiry%20regarding%20${encodeURIComponent(prod.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>{t('footer.whatsAppInquiry', 'WhatsApp Enquiry')}</span>
                              </a>
                              <a
                                href="tel:8237795424"
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>{t('footer.callUs', 'Call 8237795424')}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
