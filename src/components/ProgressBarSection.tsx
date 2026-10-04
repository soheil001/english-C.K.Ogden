import React from 'react';
import { Sparkles, ListFilter } from 'lucide-react';

interface ProgressBarSectionProps {
  currentIndex: number;
  totalCount: number;
  onOpenWordJump: () => void;
}

export const ProgressBarSection: React.FC<ProgressBarSectionProps> = ({
  currentIndex,
  totalCount,
  onOpenWordJump,
}) => {
  const currentStep = currentIndex + 1;
  const progressPercent = Math.round((currentStep / totalCount) * 100);

  return (
    <div className="px-4 mt-3 mb-2" dir="rtl">
      <div className="flex items-center justify-between text-xs mb-1.5 px-0.5">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <span className="text-slate-500 font-normal">پیشرفت یادگیری:</span>
          <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md font-english font-bold">
            لغت {currentStep} از {totalCount}
          </span>
        </div>

        <button
          onClick={onOpenWordJump}
          className="flex items-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-800 bg-white/70 hover:bg-white border border-blue-100 rounded-lg px-2 py-0.5 transition cursor-pointer active:scale-95 shadow-2xs"
          title="لیست کل ۱۰۰ لغت"
        >
          <ListFilter className="w-3.5 h-3.5" />
          <span>فهرست ۱۰۰ لغت</span>
        </button>
      </div>

      {/* Progress Bar Container */}
      <div className="w-full bg-slate-200/70 rounded-full h-2 overflow-hidden shadow-inner p-0.5">
        <div
          className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.max(2, progressPercent)}%` }}
        />
      </div>
    </div>
  );
};
