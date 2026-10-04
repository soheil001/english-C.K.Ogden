import React from 'react';
import { ChevronLeft, Download, Sparkles } from 'lucide-react';
import ogdenPortrait from '../assets/images/ogden_portrait_1791081302763.jpg';

interface HeaderProps {
  onBackClick?: () => void;
  onDownloadHtml: () => void;
  onOpenOgdenBio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onBackClick,
  onDownloadHtml,
  onOpenOgdenBio,
}) => {
  return (
    <header dir="rtl" className="relative z-10 pt-2 pb-3 px-4 text-right">
      {/* Top Status Bar indicator simulation */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-800 px-2 pb-2">
        <span className="font-english tracking-tight">9:41</span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="font-english">5G</span>
          {/* Signal bars */}
          <div className="flex items-end gap-0.5 h-2.5">
            <span className="w-0.5 h-1 bg-slate-800 rounded-full"></span>
            <span className="w-0.5 h-1.5 bg-slate-800 rounded-full"></span>
            <span className="w-0.5 h-2 bg-slate-800 rounded-full"></span>
            <span className="w-0.5 h-2.5 bg-slate-800 rounded-full"></span>
          </div>
          {/* Battery */}
          <div className="w-5 h-2.5 border border-slate-800 rounded-sm p-0.5 flex items-center">
            <div className="h-full w-4 bg-slate-800 rounded-2xs"></div>
          </div>
        </div>
      </div>

      {/* Main Top Header matching screenshot */}
      <div className="flex items-center justify-between mt-1">
        {/* Left: Round Back button */}
        <button
          onClick={onBackClick}
          aria-label="بازگشت"
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/70 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-slate-700" />
        </button>

        {/* Center / Right: Method name + subtitle + Ogden Avatar */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-md hidden sm:inline-block">متد ۵۰ کلمه</span>
              <h1 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1">
                <span>روش</span>
                <span className="font-english font-bold text-indigo-950">C. K. Ogden</span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">
              یادگیری زبان با کلمات کمتر، استفاده بیشتر
            </p>
          </div>

          {/* Ogden Avatar */}
          <button
            onClick={onOpenOgdenBio}
            title="درباره چارلز کی آگدن"
            className="relative group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-indigo-100 group-hover:ring-indigo-300 transition-all bg-slate-200">
              <img
                src={ogdenPortrait}
                alt="C. K. Ogden"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full text-white text-[9px] flex items-center justify-center border-2 border-white shadow">
              i
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
