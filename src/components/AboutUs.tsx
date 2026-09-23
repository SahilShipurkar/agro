import { useState } from 'react';
import {
  Target,
  Eye,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Milk,
  Baby,
  Activity,
  Award,
  Layers,
  ShoppingCart,
  Menu,
} from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';
import { useLanguage } from '@/lib/languageContext';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { getAboutUsData } from '@/lib/productsData';

interface AboutUsProps {
  onNavigateHome?: () => void;
  onNavigateProducts?: () => void;
  onNavigateStore?: () => void;
}

export default function AboutUs({
  onNavigateHome,
  onNavigateProducts,
  onNavigateStore,
}: AboutUsProps = {}) {
  const { language, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { whyChooseUs, commitments } = getAboutUsData(language);

  const handleScrollToProducts = () => {
    if (onNavigateProducts) {
      onNavigateProducts();
    } else {
      document.getElementById('toonhub')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const productCategories = [
    {
      title: t('discover.tabs.feed', 'Cattle Nutrition Supplements'),
      description:
        language === 'mr'
          ? 'दुभत्या जनावरांच्या दैनंदिन पोषणाच्या गरजा पूर्ण करणारी उत्पादने.'
          : language === 'hi'
          ? 'दुधारू पशुओं की दैनिक पोषण आवश्यकताओं को पूरा करने वाले उत्पाद।'
          : 'Nutritional solutions designed to support the daily nutritional requirements of dairy animals.',
      icon: Milk,
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: t('discover.tabs.all', 'Dairy & Milk Production Support'),
      description:
        language === 'mr'
          ? 'दूध उत्पादन व फॅट वाढवण्यासाठी गोठा व्यवस्थापनाला पूरक पोषण आहार.'
          : language === 'hi'
          ? 'दूध उत्पादन और फैट बढ़ाने के लिए पशु प्रबंधन को समर्पित पूरक आहार।'
          : 'Products formulated to complement proper nutrition and dairy management practices.',
      icon: Activity,
      color: 'bg-amber-50 text-amber-700',
    },
    {
      title: t('discover.tabs.calf', 'Calf Nutrition'),
      description:
        language === 'mr'
          ? 'लहान वासरांच्या जलद वाढीसाठी आणि रोगप्रतिकारशक्तीसाठी विशेष पोषण.'
          : language === 'hi'
          ? 'छोटे बछड़ों के त्वरित विकास और रोग प्रतिरोधक क्षमता के लिए विशेष पोषण।'
          : 'Specialized nutritional support for growing calves and young Dairy Animals.',
      icon: Baby,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: t('discover.tabs.reproductive', 'Reproductive & Dairy Animals Management'),
      description:
        language === 'mr'
          ? 'वेळेवर माज व सशक्त गर्भाशयासाठी आवश्यक असणारे शास्त्रोक्त पोषण.'
          : language === 'hi'
          ? 'समय पर मद (हीट) और स्वस्थ गर्भाशय के लिए आवश्यक वैज्ञानिक पोषण।'
          : 'Nutrition-focused solutions that can support Dairy Animals reproductive and overall management when used appropriately.',
      icon: Sparkles,
      color: 'bg-rose-50 text-rose-700',
    },
    {
      title: t('discover.tabs.minerals', 'Mineral & Nutritional Supplements'),
      description:
        language === 'mr'
          ? 'खनिजांची कमतरता दूर करून जनावरांचे आरोग्य व ऊर्जा टिकवणारे मिश्रण.'
          : language === 'hi'
          ? 'खनिजों की कमी को दूर कर पशु स्वास्थ्य व ऊर्जा बनाए रखने वाले मिश्रण।'
          : 'Essential nutritional support for maintaining proper Dairy Animals nutrition and overall well-being.',
      icon: Award,
      color: 'bg-purple-50 text-purple-700',
    },
    {
      title: t('discover.tabs.silage', 'Silage & Fodder Solutions'),
      description:
        language === 'mr'
          ? 'वर्षभर हिरव्या चाऱ्याची सुरक्षितता देणारा उच्च प्रतीचा मका मुरघास.'
          : language === 'hi'
          ? 'साल भर हरे चारे की सुरक्षा प्रदान करने वाला उच्च गुणवत्ता मक्का साइलेज।'
          : 'Quality fodder solutions that help farmers plan and manage feed availability throughout the year.',
      icon: Layers,
      color: 'bg-green-50 text-green-700',
    },
  ];

  return (
    <div className="w-full bg-[#EFFDF0] min-h-screen font-['Inter',sans-serif]">
      {/* HEADER WITH NAVBAR BELOW */}
      <header className="shrink-0 w-full relative z-30 animate-fade-in delay-100 bg-[#EFFDF0]">
        {/* Top Row: Logo, Brand Name & Language + Cart Button */}
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
              className="text-[#123814] font-bold hover:text-[#E86A10] transition-colors whitespace-nowrap cursor-pointer"
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
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer"
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
              className="text-[#123814] font-extrabold hover:text-[#E86A10] transition-colors cursor-pointer"
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
              className="hover:text-[#123814] transition-colors cursor-pointer"
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

      <div className="py-12 sm:py-20 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-20 sm:space-y-28">
        {/* ========================================== */}
        {/* SECTION 1: ABOUT HERO / OVERVIEW */}
        {/* ========================================== */}
        <div className="relative rounded-3xl bg-white border-2 border-[#1a3d1a]/20 p-6 sm:p-10 lg:p-14 shadow-2xl shadow-[#1a3d1a]/10 overflow-hidden">
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a3d1a] text-white font-bold text-xs tracking-wider uppercase shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#E86A10]" />
              {t('about.overviewTitle', 'About Navbharat Agro Services')}
            </span>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#123814] leading-tight font-extrabold">
              {t('about.heroTitle', 'Nurturing Animal Health, Empowering Rural Livelihoods.')}
            </h1>

            <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed pt-1 font-medium">
              {t('about.overviewP1', 'Navbharat Agro Services is an animal nutrition company dedicated to supporting dairy farmers, Dairy Animals owners, rural entrepreneurs, dealers, and veterinary professionals.')}
            </p>

            <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
              {t('about.overviewP2', 'Our approach goes beyond selling products. We aim to create long-term value by combining quality nutrition, expert knowledge, farmer education, and reliable support.')}
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* SECTION 2: MISSION & VISION */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Mission Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1a3d1a] via-[#123814] to-[#0c310c] border-2 border-emerald-500/30 p-8 sm:p-10 text-white shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/30 text-[#E86A10] shadow-md">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl text-white font-bold">
                {t('about.missionTitle', 'Our Mission')}
              </h2>
              <p className="text-emerald-50 text-sm sm:text-base leading-relaxed font-medium">
                {t('about.missionDesc', 'To provide quality cattle feed and animal nutrition solutions that support Dairy Animals health, dairy productivity, and the economic well-being of farmers.')}
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="relative rounded-3xl bg-white border-2 border-[#1a3d1a]/25 p-8 sm:p-10 text-[#123814] shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden">
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#1a3d1a] text-white flex items-center justify-center shadow-md">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl text-[#123814] font-bold">
                {t('about.visionTitle', 'Our Vision')}
              </h2>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-medium">
                {t('about.visionDesc', 'To become a trusted animal nutrition brand by combining quality, innovation, technology, expert knowledge, and farmer-focused solutions.')}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* SECTION 3: OUR PRODUCTS CATEGORIES */}
        {/* ========================================== */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#E86A10] text-white font-bold text-xs tracking-wider uppercase shadow-md">
              {t('footer.productRange', 'Product Range')}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#123814] font-bold">
              {t('nav.products', 'Our Products')}
            </h2>
            <p className="text-gray-700 text-sm sm:text-base font-medium">
              {t('about.categoriesSubtitle', 'Targeted nutritional formulations for every life stage and dairy management requirement.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border-2 border-[#1a3d1a]/15 p-6 shadow-md hover:shadow-xl hover:border-[#1a3d1a]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border border-black/5 shadow-xs ${item.color}`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-[#123814] text-lg">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={handleScrollToProducts}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#E86A10] hover:bg-[#d45e0d] text-white font-bold text-sm transition-all shadow-xl hover:scale-105 cursor-pointer"
            >
              <span>{t('carousel.discoverAll', 'View All Products')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* SECTION 4: WHY CHOOSE US */}
        {/* ========================================== */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#1a3d1a] text-white font-bold text-xs tracking-wider uppercase shadow-md">
              {t('about.coreStrengths', 'Core Strengths')}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#123814] font-bold">
              {t('about.whyChooseTitle', 'Why Leading Dairy Farmers Trust Navbharat')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-white border-2 border-[#1a3d1a]/15 p-6 sm:p-8 shadow-md hover:shadow-xl hover:border-[#E86A10]/50 hover:-translate-y-1.5 transition-all duration-300 space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1a3d1a] text-white flex items-center justify-center shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[#123814] text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================== */}
        {/* SECTION 5: COMMITMENT TO FARMERS */}
        {/* ========================================== */}
        <div className="rounded-3xl bg-gradient-to-br from-[#0c310c] via-[#1a3d1a] to-[#123814] border-2 border-emerald-400/30 p-8 sm:p-12 lg:p-16 text-white shadow-2xl space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#9ce4b3]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="px-4 py-1.5 rounded-full bg-white/20 text-emerald-200 font-bold text-xs tracking-wider uppercase border border-white/30 shadow-sm">
              {t('about.corePromise', 'Our Core Promise')}
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {t('about.commitmentTitle', 'Our Commitment to Farmers')}
            </h2>
            <p className="text-emerald-50 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
              {t('about.commitmentSubtitle', 'At Navbharat Agro Services, farmers are at the heart of everything we do. We believe that better Dairy Animals management begins with the right nutrition, the right knowledge, and the right support.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {commitments.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3.5 bg-white/15 backdrop-blur-md px-4.5 py-3.5 rounded-2xl border border-white/30 hover:bg-white/20 transition-colors shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-[#E86A10] shrink-0" />
                <span className="text-sm font-semibold text-white">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/20 text-center relative z-10">
            <p className="font-serif-display text-xl sm:text-2xl lg:text-3xl text-emerald-200 font-medium italic">
              {t('about.commitmentQuote', '“Our goal is to grow together with the farming community.”')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
