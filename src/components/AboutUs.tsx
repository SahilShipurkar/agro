import {
  ShieldCheck,
  GraduationCap,
  Users,
  HeartHandshake,
  Sprout,
  Briefcase,
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
} from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';

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
  const handleScrollToProducts = () => {
    if (onNavigateProducts) {
      onNavigateProducts();
    } else {
      document.getElementById('toonhub')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const productCategories = [
    {
      title: 'Cattle Nutrition Supplements',
      description:
        'Nutritional solutions designed to support the daily nutritional requirements of dairy animals.',
      icon: Milk,
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'Dairy & Milk Production Support',
      description:
        'Products formulated to complement proper nutrition and dairy management practices.',
      icon: Activity,
      color: 'bg-amber-50 text-amber-700',
    },
    {
      title: 'Calf Nutrition',
      description:
        'Specialized nutritional support for growing calves and young Dairy Animals.',
      icon: Baby,
      color: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'Reproductive & Dairy Animals Management',
      description:
        'Nutrition-focused solutions that can support Dairy Animals reproductive and overall management when used appropriately.',
      icon: Sparkles,
      color: 'bg-rose-50 text-rose-700',
    },
    {
      title: 'Mineral & Nutritional Supplements',
      description:
        'Essential nutritional support for maintaining proper Dairy Animals nutrition and overall well-being.',
      icon: Award,
      color: 'bg-purple-50 text-purple-700',
    },
    {
      title: 'Silage & Fodder Solutions',
      description:
        'Quality fodder solutions that help farmers plan and manage feed availability throughout the year.',
      icon: Layers,
      color: 'bg-green-50 text-green-700',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Quality First',
      description:
        'We place strong emphasis on product quality and consistency.',
      icon: ShieldCheck,
    },
    {
      title: 'Expert Guidance',
      description:
        'Our approach is supported by knowledge from veterinary and animal nutrition professionals.',
      icon: GraduationCap,
    },
    {
      title: 'Farmer-Centric Approach',
      description:
        'Our products and services are developed with the practical needs of dairy farmers in mind.',
      icon: Users,
    },
    {
      title: 'Reliable Support',
      description:
        'We focus on building long-term relationships with farmers, dealers, and business partners.',
      icon: HeartHandshake,
    },
    {
      title: 'Rural Entrepreneurship',
      description:
        'We create opportunities for rural entrepreneurs, dealers, and women-led groups to participate in the Dairy Animals nutrition ecosystem.',
      icon: Sprout,
    },
    {
      title: 'Technology & Innovation',
      description:
        'We believe technology can make rural businesses more connected, efficient, and accessible.',
      icon: Briefcase,
    },
  ];

  const commitments = [
    'Better Dairy Animals nutrition practices',
    'Appropriate product selection',
    'Practical animal management guidance',
    'Dairy productivity support',
    'Calf and young-stock nutrition',
    'Feed and fodder management',
    'Access to business and market opportunities',
  ];

  return (
    <div className="w-full bg-[#EFFDF0] min-h-screen font-['Inter',sans-serif]">
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
              className="w-9 h-9 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain rounded-full shadow-md transition-transform hover:scale-105"
            />
            <span className="font-sans font-extrabold text-sm sm:text-lg lg:text-xl text-[#123814] tracking-tight">
              Navbharat Agro Services
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Cart"
              onClick={onNavigateStore}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-400 bg-white/50 transition-colors cursor-pointer hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>
        </div>

        {/* Bottom Row: Navigation Bar Below Logo & Name */}
        <nav className="w-full bg-[#EFFDF0]/90 backdrop-blur-md border-b border-[#123814]/10 py-1.5 px-3 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto flex items-center justify-start sm:justify-between overflow-x-auto scrollbar-none gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-gray-700 no-scrollbar py-0.5">
            <a
              href="#home"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer px-1 py-0.5"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-[#123814] font-bold hover:text-[#E86A10] transition-colors whitespace-nowrap cursor-pointer px-1 py-0.5"
            >
              About Us
            </a>
            <a
              href="#toonhub"
              onClick={(e) => {
                if (onNavigateProducts) {
                  e.preventDefault();
                  onNavigateProducts();
                }
              }}
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer px-1 py-0.5"
            >
              Products
            </a>
            <a href="#gallery" className="hover:text-[#123814] transition-colors whitespace-nowrap px-1 py-0.5">
              Gallery
            </a>
            <a href="#business" className="hover:text-[#123814] transition-colors whitespace-nowrap px-1 py-0.5">
              Careers
            </a>
            <a href="#blog" className="hover:text-[#123814] transition-colors whitespace-nowrap px-1 py-0.5">
              Blog / Resources
            </a>
            <a href="#contact" className="hover:text-[#123814] transition-colors whitespace-nowrap px-1 py-0.5">
              Contact Us
            </a>
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
              About Navbharat Agro Services
            </span>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#123814] leading-tight font-extrabold">
              Nurturing Animal Health, Empowering Rural Livelihoods.
            </h1>

            <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed pt-1 font-medium">
              Navbharat Agro Services (NAS) is an animal nutrition company
              dedicated to supporting dairy farmers, Dairy Animals owners,
              rural entrepreneurs, dealers, and veterinary professionals. We
              develop and provide cattle feed, nutritional supplements, silage,
              and Dairy Animals nutrition solutions designed around the
              practical needs of farmers.
            </p>

            <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
              Our approach goes beyond selling products. We aim to create
              long-term value by combining quality nutrition, expert knowledge,
              farmer education, and reliable support. Our goal is to contribute
              to healthier Dairy Animals, better dairy management, improved
              productivity, and stronger rural livelihoods.
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
                Our Mission
              </h2>
              <p className="text-emerald-50 text-sm sm:text-base leading-relaxed font-medium">
                To provide quality cattle feed and animal nutrition solutions
                that support Dairy Animals health, dairy productivity, and the
                economic well-being of farmers.
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
                Our Vision
              </h2>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-medium">
                To become a trusted animal nutrition brand by combining quality,
                innovation, technology, expert knowledge, and farmer-focused
                solutions to contribute to the growth of India&apos;s rural
                economy.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* SECTION 3: OUR PRODUCTS */}
        {/* ========================================== */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-4 py-1.5 rounded-full bg-[#E86A10] text-white font-bold text-xs tracking-wider uppercase shadow-md">
              Product Range
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#123814] font-bold">
              Our Products
            </h2>
            <p className="text-gray-700 text-sm sm:text-base font-medium">
              We offer a growing range of Dairy Animals nutrition products
              developed to address different stages and requirements of dairy
              farming.
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
              <span>View All Products</span>
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
              Core Strengths
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#123814] font-bold">
              Why Choose Navbharat Agro Services?
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
              Our Core Promise
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Our Commitment to Farmers
            </h2>
            <p className="text-emerald-50 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
              At Navbharat Agro Services, farmers are at the heart of everything
              we do. We believe that better Dairy Animals management begins with
              the right nutrition, the right knowledge, and the right support.
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
              &ldquo;Our goal is to grow together with the farming
              community.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
