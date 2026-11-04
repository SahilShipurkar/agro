import { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';
import { useLanguage } from '@/lib/languageContext';
import LanguageSwitcher from './ui/LanguageSwitcher';
import AdminLoginModal, { isAdminLoggedIn } from './AdminLoginModal';

export interface GlobalNavbarProps {
  currentPage?: 'home' | 'store' | 'admin';
  onNavigateHome?: () => void;
  onNavigateAbout?: () => void;
  onNavigateProducts?: () => void;
  onNavigateStore?: () => void;
  onNavigateAdmin?: () => void;
  cartCount?: number;
  onOpenCart?: () => void;
  sticky?: boolean;
}

export default function GlobalNavbar({
  currentPage = 'home',
  onNavigateHome,
  onNavigateAbout,
  onNavigateProducts,
  onNavigateStore,
  onNavigateAdmin,
  cartCount = 0,
  onOpenCart,
  sticky = true,
}: GlobalNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => isAdminLoggedIn());
  const { t } = useLanguage();

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAdmin(isAdminLoggedIn());
    };
    window.addEventListener('navbharat_admin_auth_changed', handleAuthChange);
    return () => window.removeEventListener('navbharat_admin_auth_changed', handleAuthChange);
  }, []);

  const handleProfileClick = () => {
    if (isAdminLoggedIn()) {
      if (onNavigateAdmin) {
        onNavigateAdmin();
      } else {
        window.location.hash = 'admin';
      }
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleCartClick = () => {
    if (onOpenCart) {
      onOpenCart();
    } else if (onNavigateStore) {
      onNavigateStore();
    } else {
      window.location.hash = 'store';
    }
  };

  const handleNavClick = (section: string, callback?: () => void) => {
    setIsMobileMenuOpen(false);
    if (callback) {
      callback();
      return;
    }
    if (currentPage !== 'home') {
      window.location.hash = section;
      if (onNavigateHome) onNavigateHome();
    } else {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = section;
      }
    }
  };

  return (
    <>
      <header
        className={`w-full z-40 bg-[#EFFDF0] border-b border-[#123814]/10 ${
          sticky ? 'sticky top-0 shadow-xs' : 'relative'
        }`}
      >
        {/* Top Row: Logo, Brand Name, Language Switcher, Cart & Admin Sign In */}
        <div className="w-full px-3.5 sm:px-8 lg:px-12 py-2 sm:py-2.5 flex items-center justify-between border-b border-[#123814]/10">
          {/* Logo & Brand Name */}
          <div
            onClick={() => handleNavClick('home', onNavigateHome)}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none"
          >
            <img
              src={getAssetUrl('/Whitte Circle logo(3).png')}
              alt="Navbharat Agro Services Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 object-contain rounded-full shadow-md transition-transform hover:scale-105"
            />
            <span className="font-sans font-black text-sm sm:text-lg lg:text-xl text-[#123814] tracking-tight">
              {t('nav.brand')}
            </span>
          </div>

          {/* Right Controls: Language Switcher, Cart & Admin Sign In */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />

            {/* Cart Button */}
            <button
              aria-label="Cart"
              onClick={handleCartClick}
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#123814]/20 flex items-center justify-center text-[#123814] hover:border-gray-400 bg-white/70 shadow-xs transition-colors cursor-pointer hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#E86A10] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin / Profile Icon */}
            <button
              aria-label={isAdmin ? 'Admin Dashboard' : 'Admin Sign In'}
              title={isAdmin ? 'Admin Dashboard (Logged In)' : 'Admin Sign In'}
              onClick={handleProfileClick}
              className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                isAdmin
                  ? 'border-[#123814] bg-[#EFFDF0] text-[#123814] ring-2 ring-[#123814]/15'
                  : 'border-[#123814]/20 bg-white/70 text-[#123814] hover:border-[#123814] hover:text-[#E86A10]'
              }`}
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
              {isAdmin && (
                <span
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full shadow-xs"
                  title="Admin Logged In"
                />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Row: Desktop Navigation Links */}
        <nav className="hidden md:block w-full bg-[#EFFDF0]/90 backdrop-blur-md border-b border-[#123814]/10 py-1.5 px-4 sm:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-6 text-xs sm:text-sm font-semibold text-gray-700">
            <button
              type="button"
              onClick={() => handleNavClick('home', onNavigateHome)}
              className={`hover:text-[#E86A10] transition-colors whitespace-nowrap cursor-pointer ${
                currentPage === 'home' ? 'text-[#123814] font-bold' : 'text-gray-700'
              }`}
            >
              {t('nav.home')}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about', onNavigateAbout)}
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('nav.aboutUs')}
            </button>
            <button
              type="button"
              onClick={() => {
                if (onNavigateProducts) onNavigateProducts();
                else handleNavClick('toonhub');
              }}
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('nav.products')}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('gallery')}
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('nav.gallery')}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('business')}
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('nav.careers')}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('blog')}
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('nav.blog')}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#123814] transition-colors whitespace-nowrap cursor-pointer"
            >
              {t('nav.contactUs')}
            </button>
          </div>
        </nav>

        {/* Bottom Row: Mobile Navigation Bar */}
        <nav className="md:hidden w-full bg-[#EFFDF0]/95 backdrop-blur-md border-b border-[#123814]/10 py-1.5 px-4 relative flex items-center justify-center">
          <div className="flex items-center justify-center gap-6 text-xs font-bold text-gray-700">
            <button
              type="button"
              onClick={() => handleNavClick('home', onNavigateHome)}
              className="text-[#123814] font-extrabold hover:text-[#E86A10] transition-colors cursor-pointer"
            >
              {t('nav.home')}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about', onNavigateAbout)}
              className="hover:text-[#123814] transition-colors cursor-pointer"
            >
              {t('nav.aboutUs')}
            </button>
            <button
              type="button"
              onClick={() => {
                if (onNavigateProducts) onNavigateProducts();
                else handleNavClick('toonhub');
              }}
              className="hover:text-[#123814] transition-colors cursor-pointer"
            >
              {t('nav.products')}
            </button>
          </div>

          {/* Dropdown Menu Trigger on Right for Mobile */}
          <div className="absolute right-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="More navigation links"
              className="flex items-center justify-center w-7 h-7 rounded-full bg-white/90 border border-[#123814]/20 text-[#123814] shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <Menu className="w-3.5 h-3.5 text-[#123814]" />
            </button>

            {/* Dropdown Menu */}
            {isMobileMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#123814]/15 py-2 z-50 animate-fade-in text-xs font-semibold text-gray-800">
                <button
                  type="button"
                  onClick={() => handleNavClick('gallery')}
                  className="w-full text-left px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors cursor-pointer"
                >
                  {t('nav.gallery')}
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('business')}
                  className="w-full text-left px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors cursor-pointer"
                >
                  {t('nav.careers')}
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('blog')}
                  className="w-full text-left px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors cursor-pointer"
                >
                  {t('nav.blog')}
                </button>
                <button
                  type="button"
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left px-4 py-2 hover:bg-[#EFFDF0] hover:text-[#E86A10] transition-colors cursor-pointer"
                >
                  {t('nav.contactUs')}
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Admin Login Modal (opens when clicking profile if not logged in) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoginOpen(false);
          if (onNavigateAdmin) {
            onNavigateAdmin();
          } else {
            window.location.hash = 'admin';
          }
        }}
      />
    </>
  );
}

