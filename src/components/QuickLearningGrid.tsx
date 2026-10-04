import React from 'react';
import { Trophy, BookText, MessageSquareQuote, Headphones } from 'lucide-react';

interface QuickLearningGridProps {
  onOpenExercises: () => void;
  onOpenAllWords: () => void;
  onOpenConversation: () => void;
  onOpenListening: () => void;
}

export const QuickLearningGrid: React.FC<QuickLearningGridProps> = ({
  onOpenExercises,
  onOpenAllWords,
  onOpenConversation,
  onOpenListening,
}) => {
  return (
    <div className="px-4 my-3">
      {/* Section Title matching screenshot */}
      <h3 className="text-right text-xs sm:text-sm font-bold text-slate-800 mb-2.5 px-1">
        سایر بخش‌های یادگیری
      </h3>

      {/* 4 Cards Grid matching exact screenshot layout, colors and typography */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {/* Card 1 (Rightmost in RTL): تمرین‌ها (Orange/Peach) */}
        <button
          onClick={onOpenExercises}
          className="bg-amber-50/90 hover:bg-amber-100/90 border border-amber-100/80 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-amber-500 mb-1 group-hover:scale-110 transition-transform">
            <Trophy className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
            تمرین‌ها
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5 whitespace-nowrap">
            تثبیت یادگیری
          </span>
        </button>

        {/* Card 2: لغات بیشتر (Purple/Lavender) */}
        <button
          onClick={onOpenAllWords}
          className="bg-purple-50/90 hover:bg-purple-100/90 border border-purple-100/80 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
            <div className="w-6 h-6 rounded-md bg-purple-500 text-white flex items-center justify-center text-[10px] font-english font-extrabold shadow-xs">
              AZ
            </div>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
            لغات بیشتر
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5 whitespace-nowrap">
            کلمات جدید
          </span>
        </button>

        {/* Card 3: مکالمه (Teal/Mint) */}
        <button
          onClick={onOpenConversation}
          className="bg-teal-50/90 hover:bg-teal-100/90 border border-teal-100/80 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-teal-600 mb-1 group-hover:scale-110 transition-transform">
            <MessageSquareQuote className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
            مکالمه
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5 whitespace-nowrap">
            جمله بساز
          </span>
        </button>

        {/* Card 4 (Leftmost in RTL): شنیداری (Pink/Rose) */}
        <button
          onClick={onOpenListening}
          className="bg-pink-50/90 hover:bg-pink-100/90 border border-pink-100/80 rounded-2xl p-2.5 flex flex-col items-center justify-center text-center shadow-xs active:scale-95 transition-all cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-pink-500 mb-1 group-hover:scale-110 transition-transform">
            <Headphones className="w-6 h-6 stroke-[2.2]" />
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
            شنیداری
          </span>
          <span className="text-[9px] text-slate-400 mt-0.5 whitespace-nowrap">
            گوش بده
          </span>
        </button>
      </div>
    </div>
  );
};
