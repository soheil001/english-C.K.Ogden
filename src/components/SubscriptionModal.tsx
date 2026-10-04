import React, { useState } from 'react';
import { X, KeyRound, Sparkles, CheckCircle2, AlertCircle, Loader2, LogOut, ShieldCheck } from 'lucide-react';
import { verifySubscriptionCode, logout, getSession } from '../utils/auth';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  initialMessage?: string;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMessage = 'تمرین‌های رایگان ۱۰ لغت اول به پایان رسید. برای باز شدن دسترسی به ادامه ۱۰۰ لغت کلاس اول، لطفاً کد اشتراک خود را وارد نمایید.',
}) => {
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const currentSession = getSession();
  const isLoggedIn = !!(currentSession && currentSession.phone && currentSession.verified);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!code.trim()) {
      setErrorMessage('لطفاً کد اشتراک ۵ رقمی خود را وارد کنید.');
      return;
    }

    setLoading(true);
    const result = await verifySubscriptionCode(code.trim());
    setLoading(false);

    if (result.success) {
      setSuccessMessage('اشتراک شما با موفقیت تأیید و فعال شد!');
      setTimeout(() => {
        onLoginSuccess();
        onClose();
      }, 1200);
    } else {
      setErrorMessage(result.message || 'کد اشتراک نامعتبر است.');
    }
  };

  const handleLogout = () => {
    logout();
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Glassmorphic Modal Dialog */}
      <div
        className="relative z-10 w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl p-6 border border-white shadow-2xl shadow-blue-950/30 text-right animate-in zoom-in-95 duration-200"
        dir="rtl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition active:scale-95 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isLoggedIn ? (
          /* User is already logged in */
          <div className="text-center py-2 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900 font-sans">
                حساب کاربری فعال
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-1">
                اشتراک دوره شما با شماره / کد زیر فعال است:
              </p>
              <div className="mt-2 inline-block bg-slate-100 px-4 py-1.5 rounded-xl font-english font-extrabold text-blue-700 tracking-wider">
                {currentSession.phone}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition shadow-md shadow-blue-700/25 active:scale-95 cursor-pointer font-sans"
              >
                ادامه یادگیری
              </button>
              <button
                onClick={handleLogout}
                className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer font-sans"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج</span>
              </button>
            </div>
          </div>
        ) : (
          /* Need to enter subscription code */
          <div>
            {/* Header Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-700/30 mb-3">
              <KeyRound className="w-7 h-7" />
            </div>

            <div className="text-center mb-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 font-sans">
                کد اشتراک خودتون رو وارد کنید
              </h3>
              <div className="flex items-center justify-center gap-1 mt-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 w-fit mx-auto">
                <Sparkles className="w-3.5 h-3.5" />
                <span>تا ۱۰ لغت اول رایگان است</span>
              </div>
              <p className="text-xs text-slate-500 font-sans mt-2.5 leading-relaxed px-1">
                {initialMessage}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1.5 font-sans">
                  کد اشتراک ۵ رقمی:
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  dir="ltr"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="مثلاً: 12345"
                  maxLength={15}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white rounded-2xl p-3 text-center text-lg font-english font-black tracking-widest outline-none text-slate-900 transition-all shadow-inner placeholder:font-sans placeholder:text-xs placeholder:tracking-normal placeholder:font-normal"
                />
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-700/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>در حال بررسی اشتراک...</span>
                  </>
                ) : (
                  <span>فعال‌سازی و ادامه یادگیری</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
