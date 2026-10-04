import React, { useState } from 'react';
import { CheckCircle2, Flame, Sparkles, PartyPopper } from 'lucide-react';

interface TodayGoalCardProps {
  todayLearnedCount: number;
  todayGoalCount?: number;
  totalCompletedCount: number;
  totalWordsCount?: number;
  onContinuePractice?: () => void;
  onPausePractice?: () => void;
}

export const TodayGoalCard: React.FC<TodayGoalCardProps> = ({
  todayLearnedCount = 7,
  todayGoalCount = 10,
  totalCompletedCount = 24,
  totalWordsCount = 100,
  onContinuePractice,
  onPausePractice,
}) => {
  const [showCompletionPrompt, setShowCompletionPrompt] = useState<boolean>(true);
  const [userChoice, setUserChoice] = useState<'yes' | 'no' | null>(null);

  const isCompleted = todayLearnedCount >= todayGoalCount;
  const todayProgressPercent = Math.min(100, Math.round((todayLearnedCount / todayGoalCount) * 100));

  const handleChooseYes = () => {
    setUserChoice('yes');
    setShowCompletionPrompt(false);
    if (onContinuePractice) {
      onContinuePractice();
    }
  };

  const handleChooseNo = () => {
    setUserChoice('no');
    if (onPausePractice) {
      onPausePractice();
    }
  };

  return (
    <div className="px-3 my-2" dir="rtl">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-white shadow-md text-right">
        <div className="flex items-center justify-between gap-3">
          {/* Right side: یادگیری امروز (Today's Goal) - text stays in its place */}
          <div className="flex-1 border-l border-slate-200/80 pl-3">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="font-extrabold text-slate-900 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>یادگیری امروز</span>
              </span>
              <span className="font-english font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                {todayLearnedCount} از {todayGoalCount}
              </span>
            </div>

            {/* Line is active and fills towards the right */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/70 p-0.5 shadow-inner" dir="ltr">
              <div
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${todayProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Left side: لغات یادگرفته‌شده (Total Learned) - text stays in its place */}
          <div className="shrink-0 flex items-center gap-2.5 pr-1">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-medium block">لغات یادگرفته‌شده</span>
              <span className="text-xs font-english font-extrabold text-slate-900">
                {totalCompletedCount} <span className="text-[10px] font-normal text-slate-400">/ {totalWordsCount}</span>
              </span>
            </div>
          </div>
        </div>

        {/* User requirement:
            "و ۱۰ تا تکمیل شد بنویسه تمرین امروز شما تموم شد ۱۰ لغت میخوای ادامه بدی ؟ آره یا نه داشته باشه"
        */}
        {isCompleted && showCompletionPrompt && userChoice !== 'no' && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 bg-gradient-to-r from-blue-50/90 to-indigo-50/90 p-2.5 rounded-xl border border-blue-100 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-right">
              <PartyPopper className="w-4 h-4 text-amber-500 shrink-0" />
              <p className="text-xs font-bold text-slate-900 leading-snug font-sans">
                تمرین امروز شما تموم شد (۱۰ لغت). می‌خوای ادامه بدی؟
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={handleChooseYes}
                className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-extrabold shadow-sm active:scale-95 transition cursor-pointer font-sans"
              >
                آره
              </button>
              <button
                onClick={handleChooseNo}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold active:scale-95 transition cursor-pointer font-sans"
              >
                نه
              </button>
            </div>
          </div>
        )}

        {isCompleted && userChoice === 'no' && (
          <div className="mt-2 pt-2 border-t border-slate-100 text-center text-xs font-bold text-emerald-700 flex items-center justify-center gap-1.5 animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>آفرین به پشتکارت! تمرین امروزت با موفقیت انجام شد. فردا با انرژی برگرد.</span>
          </div>
        )}
      </div>
    </div>
  );
};
