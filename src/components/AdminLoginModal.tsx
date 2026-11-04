import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, X, ShieldCheck, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export const ADMIN_EMAIL = 'admin@gmail.com';
export const ADMIN_PASS = 'Rohit@121';
export const ADMIN_AUTH_KEY = 'navbharat_admin_auth';

export function isAdminLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function logoutAdmin(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ADMIN_AUTH_KEY);
  supabase.auth.signOut().catch(() => {});
  window.location.hash = '';
  window.dispatchEvent(new Event('navbharat_admin_auth_changed'));
}

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }: AdminLoginModalProps) {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedEmail = email.trim().toLowerCase();
    const isMasterAdmin = trimmedEmail === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASS;

    if (!trimmedEmail || !password) {
      setErrorMessage('कृपया ईमेल आणि पासवर्ड टाका (Please enter email & password)');
      return;
    }

    setLoading(true);

    try {
      let loggedIn = false;

      // 1. Try Supabase Auth if configured
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: trimmedEmail,
            password,
          });

          if (!error && data?.session) {
            loggedIn = true;
          } else if (isMasterAdmin) {
            // Attempt to auto-register master admin into Supabase if account hasn't been created yet
            supabase.auth
              .signUp({ email: ADMIN_EMAIL, password: ADMIN_PASS })
              .catch(() => {});
          }
        } catch (supabaseErr) {
          console.warn('Supabase auth attempt:', supabaseErr);
        }
      }

      // 2. Validate against designated Admin credentials
      if (loggedIn || isMasterAdmin) {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
        window.dispatchEvent(new Event('navbharat_admin_auth_changed'));
        setSuccessMessage('लॉगिन यशस्वी! Admin Dashboard उघडत आहे...');

        setTimeout(() => {
          onClose();
          if (onLoginSuccess) {
            onLoginSuccess();
          } else {
            window.location.hash = 'admin';
          }
        }, 900);
      } else {
        setErrorMessage('चुकीचा ईमेल किंवा पासवर्ड (Invalid credentials. Use admin@gmail.com & designated password)');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'लॉगिन अयशस्वी. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#123814]/15 overflow-hidden z-10"
          >
            {/* Top decorative gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#123814] via-[#1b5e20] to-[#E86A10]" />

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#EFFDF0] border border-[#123814]/20 flex items-center justify-center text-[#123814] shadow-xs">
                  <ShieldCheck className="w-8 h-8 text-[#123814]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#123814] tracking-tight">
                  Admin Sign In
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  किमती आणि उत्पादने व्यवस्थापित करण्यासाठी लॉगिन करा
                </p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs sm:text-sm animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2.5 text-emerald-800 text-xs sm:text-sm font-semibold animate-fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Admin Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@gmail.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#123814] focus:ring-2 focus:ring-[#123814]/20 outline-none text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-[#123814] focus:ring-2 focus:ring-[#123814]/20 outline-none text-sm transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-[#123814] hover:bg-[#1a4a1d] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>प्रक्रिया चालू आहे...</span>
                    </>
                  ) : (
                    <span>लॉगिन करा (Sign In)</span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
