import React from 'react';
import { Menu, X, User, CheckCircle2, Download } from 'lucide-react';

interface ClassHeaderProps {
  currentClassTitle: string;
  onToggleMenu: () => void;
  isMenuOpen: boolean;
  onOpenSubscription: () => void;
  isSubscribed: boolean;
  onOpenDownloadHtml?: () => void;
}

export const ClassHeader: React.FC<ClassHeaderProps> = ({
  currentClassTitle,
  onToggleMenu,
  isMenuOpen,
  onOpenSubscription,
  isSubscribed,
  onOpenDownloadHtml,
}) => {
  return (
    <header className="px-3.5 py-3 flex items-center justify-between glass-card rounded-2xl mx-3 mt-3 border border-white/90 shadow-md relative z-40" dir="rtl">
      {/* Right side: cllo Brand logo + Class title & Subtitle */}
      <div className="flex items-center gap-2.5 text-right">
        {/* Brand Badge with cllo */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white rounded-xl px-2.5 py-1 shadow-md shadow-blue-700/25 shrink-0">
          <span className="font-english font-black text-sm tracking-tight text-white leading-none">
            cllo
          </span>
          <span className="text-[8px] font-english text-blue-200 uppercase tracking-widest mt-0.5">
            ir
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
              {currentClassTitle}
            </h1>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              مقدماتی
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            یادگیری با روش C. K. Ogden در <span className="font-english font-bold text-blue-700">cllo</span>
          </p>
        </div>
      </div>

      {/* Left side actions: User Login/Account Icon + Download ZIP Icon + Hamburger Menu */}
      <div className="flex items-center gap-2">
        {/* Direct Download ZIP Button */}
        {onOpenDownloadHtml && (
          <button
            onClick={onOpenDownloadHtml}
            aria-label="دانلود فایل زیپ"
            title="دانلود فایل HTML در قالب ZIP"
            className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 shadow-2xs flex items-center justify-center transition active:scale-95 cursor-pointer relative"
          >
            <Download className="w-5 h-5 stroke-[2.2]" />
          </button>
        )}

        {/* User / Login / Subscription Icon ("ایکن لاگین آدم") */}
        <button
          onClick={onOpenSubscription}
          aria-label="ورود و وضعیت اشتراک"
          title={isSubscribed ? 'اشتراک فعال است (مشاهده حساب)' : 'ورود / وارد کردن کد اشتراک'}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer relative ${
            isSubscribed
              ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 shadow-2xs'
              : 'bg-white/90 hover:bg-white text-slate-700 border border-slate-200 shadow-2xs active:scale-95'
          }`}
        >
          <User className="w-5 h-5 stroke-[2.2]" />
          {isSubscribed && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <CheckCircle2 className="w-2.5 h-2.5 text-white stroke-[3]" />
            </span>
          )}
        </button>

        {/* Hamburger menu button that opens drawer on the LEFT */}
        <button
          onClick={onToggleMenu}
          aria-label="منوی کلاس‌ها"
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isMenuOpen
              ? 'bg-blue-700 text-white shadow-md shadow-blue-700/30 scale-95'
              : 'bg-white/90 hover:bg-white text-slate-700 border border-slate-200 shadow-2xs active:scale-95'
          }`}
          title="منوی دوره‌ها"
        >
          {isMenuOpen ? <X className="w-5 h-5 stroke-[2.2]" /> : <Menu className="w-5 h-5 stroke-[2.2]" />}
        </button>
      </div>
    </header>
  );
};
