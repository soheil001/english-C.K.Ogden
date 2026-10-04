import React from 'react';
import { Award, CheckCircle2, TrendingUp, Sparkles, BookOpen, Clock } from 'lucide-react';
import { WORDS_DATA, LESSONS } from '../data/words';

interface ProgressViewProps {
  completedWordIds: number[];
  onOpenWordList: () => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  completedWordIds,
  onOpenWordList,
}) => {
  const total = 50;
  const count = completedWordIds.length;
  const percentage = Math.round((count / total) * 100);

  return (
    <div className="px-4 py-4 animate-in fade-in duration-200">
      <div className="text-right mb-4">
        <h2 className="text-xl font-bold text-slate-900">گزارش پیشرفت یادگیری</h2>
        <p className="text-xs text-slate-500 mt-0.5">۵۰ کلمه طلایی متد C. K. Ogden</p>
      </div>

      {/* Main Stats Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-5 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden mb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-blue-200">میزان تسلط شما</span>
            <div className="text-4xl font-extrabold font-english mt-1 tracking-tight">
              {percentage}%
            </div>
            <div className="text-xs text-blue-100 mt-1">
              {count} کلمه از ۵۰ کلمه تمرین شده
            </div>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl">
            🏆
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-2.5 mt-4 overflow-hidden">
          <div
            className="bg-white h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(6, percentage)}%` }}
          ></div>
        </div>
      </div>

      {/* Lessons Breakdown */}
      <h3 className="font-bold text-slate-800 text-sm mb-2.5 text-right">
        وضعیت درس‌ها (۵ درس ۱۰ کلمه‌ای)
      </h3>

      <div className="space-y-2 mb-4">
        {LESSONS.map((lesson) => {
          const lessonWords = WORDS_DATA.filter((w) => w.lessonId === lesson.id);
          const finishedInLesson = lessonWords.filter((w) => completedWordIds.includes(w.id)).length;
          const lessonPercent = Math.round((finishedInLesson / lessonWords.length) * 100);

          return (
            <div
              key={lesson.id}
              className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center font-english">
                  L{lesson.id}
                </span>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">{lesson.title}</h4>
                  <div className="text-[10px] text-slate-400 mt-0.5">{lesson.description}</div>
                </div>
              </div>

              <div className="text-left font-english text-xs font-bold text-slate-700">
                {finishedInLesson} / 10
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onOpenWordList}
        className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition active:scale-98"
      >
        مشاهده تمام ۵۰ لغت در دیکشنری
      </button>
    </div>
  );
};
