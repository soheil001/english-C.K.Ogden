import React from 'react';
import { X, Lock, CheckCircle2, Sparkles, GraduationCap, FileArchive } from 'lucide-react';
import { CLASSES_LIST, CourseClass } from '../data/class1Words';

interface ClassesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeClassId: number;
  onSelectClass: (c: CourseClass) => void;
  onOpenDownloadHtml?: () => void;
}

export const ClassesDrawer: React.FC<ClassesDrawerProps> = ({
  isOpen,
  onClose,
  activeClassId,
  onSelectClass,
  onOpenDownloadHtml,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 pointer-events-none transition-visibility duration-300 ${
        isOpen ? 'pointer-events-auto visible' : 'invisible'
      }`}
    >
      {/* Backdrop overlay with smooth fade */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out cursor-pointer ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Drawer sliding in smoothly strictly from the LEFT side */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-10 w-full max-w-[310px] bg-white/98 backdrop-blur-2xl shadow-2xl flex flex-col text-right border-r border-slate-200 transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        dir="rtl"
      >
        {/* Drawer Header with cllo brand */}
        <div className="p-4 bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col items-center justify-center bg-white/15 backdrop-blur-md text-white rounded-xl px-2.5 py-1 border border-white/20">
              <span className="font-english font-black text-sm tracking-tight leading-none">cllo</span>
              <span className="text-[8px] font-english text-blue-200 uppercase tracking-widest mt-0.5">ir</span>
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">دوره زبان انگلیسی cllo</h3>
              <p className="text-[11px] text-blue-200">روش علمی C. K. Ogden</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition active:scale-95 cursor-pointer"
            title="بستن منو"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Classes List */}
        <div className="p-4 space-y-2.5 overflow-y-auto flex-1 no-scrollbar">
          <div className="text-[11px] font-bold text-slate-400 mb-1 px-1">
            سطوح آموزشی کلاس‌ها:
          </div>

          {CLASSES_LIST.map((item) => {
            const isActive = item.id === activeClassId;

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.isUnlocked) {
                    onSelectClass(item);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-2xl border transition-all text-right ${
                  isActive
                    ? 'bg-blue-50/90 border-blue-400 shadow-xs cursor-pointer'
                    : item.isUnlocked
                    ? 'bg-white hover:bg-slate-50 border-slate-200 cursor-pointer shadow-2xs'
                    : 'bg-slate-50/60 border-slate-200/60 opacity-70 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Class Icon */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs font-english shrink-0 ${
                        isActive
                          ? 'bg-blue-700 text-white shadow-xs'
                          : item.isUnlocked
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {item.isUnlocked ? `0${item.id}` : <Lock className="w-4 h-4 text-slate-400" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                          {item.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.isUnlocked ? `${item.wordsCount} لغت فعال` : 'به‌زودی'}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0 mr-2">
                    {isActive ? (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>فعال</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>به‌زودی</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Download Standalone App ZIP button */}
        {onOpenDownloadHtml && (
          <div className="px-3 pb-2">
            <button
              onClick={() => {
                onClose();
                onOpenDownloadHtml();
              }}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition cursor-pointer"
            >
              <FileArchive className="w-4 h-4" />
              <span>دانلود فایل HTML در قالب ZIP</span>
            </button>
          </div>
        )}

        {/* Footer info in Drawer */}
        <div className="p-3.5 m-3 mt-1 bg-blue-50/80 rounded-2xl border border-blue-100 text-xs text-blue-900 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            کلاس اول شامل ۱۰۰ لغت بنیادین هم‌اکنون در <span className="font-english font-bold">cllo</span> فعال است. پس از تکمیل، کلاس‌های بعدی باز خواهند شد.
          </p>
        </div>
      </aside>
    </div>
  );
};
