import React from 'react';
import { X, Check, BookOpen, Sparkles } from 'lucide-react';
import { LESSONS, Lesson, WORDS_DATA } from '../data/words';

interface LessonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeLessonId: number;
  onSelectLesson: (lesson: Lesson) => void;
}

export const LessonsModal: React.FC<LessonsModalProps> = ({
  isOpen,
  onClose,
  activeLessonId,
  onSelectLesson,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] p-5 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">انتخاب درس</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              ۵ درس منسجم (هر درس ۱۰ لغت برگزیده روش آگدن)
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 active:scale-95 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 my-4">
          {LESSONS.map((lesson) => {
            const isSelected = lesson.id === activeLessonId;
            const wordsCount = WORDS_DATA.filter((w) => w.lessonId === lesson.id).length;

            return (
              <button
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson);
                  onClose();
                }}
                className={`w-full p-4 rounded-2xl border text-right flex items-center justify-between transition-all cursor-pointer active:scale-[0.98] ${
                  isSelected
                    ? 'bg-blue-50/90 border-blue-300 shadow-sm'
                    : 'bg-slate-50/60 hover:bg-slate-100 border-slate-200/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {lesson.id}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{lesson.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{lesson.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-blue-600 bg-blue-100/60 font-semibold px-2 py-0.5 rounded-full font-english">
                    {wordsCount} Words
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100 flex items-start gap-2.5 text-xs text-indigo-900 leading-relaxed">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span>
            به توصیه آگدن، پیشنهاد می‌شود هر روز روی یک درس (۱۰ کلمه) تمرکز کنید و با همان‌ها جمله بسازید.
          </span>
        </div>
      </div>
    </div>
  );
};
