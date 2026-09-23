import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import type { Language } from '@/lib/languageContext';

interface LanguageSwitcherProps {
  className?: string;
}

const languages: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी' },
];

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className={`relative inline-block text-left z-50 ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-[#123814]/20 bg-white/90 hover:bg-white text-[#123814] text-xs font-bold shadow-xs hover:border-[#123814]/40 transition-all active:scale-95 cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E86A10] shrink-0" />
        <span className="font-extrabold text-[11px] sm:text-xs tracking-tight">
          {currentLang.nativeLabel}
        </span>
        <ChevronDown className={`w-3 h-3 text-[#123814]/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-2xl bg-white/95 backdrop-blur-md border border-[#123814]/15 shadow-xl py-1.5 animate-fade-in z-50 text-xs">
          <div className="px-3 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
            भाषा निवडा / Language
          </div>
          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between font-bold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#EFFDF0] text-[#123814]'
                    : 'text-gray-700 hover:bg-[#EFFDF0]/60 hover:text-[#E86A10]'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-extrabold">{lang.nativeLabel}</span>
                  <span className="text-[9px] text-gray-400 font-medium">{lang.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#E86A10] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
