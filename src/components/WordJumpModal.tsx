import React, { useState } from 'react';
import { Search, X, Volume2 } from 'lucide-react';
import { CLASS_1_WORDS, WordItem } from '../data/class1Words';
import { speakEnglish } from '../utils/audio';

interface WordJumpModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeWordId: number;
  onSelectWord: (index: number) => void;
}

export const WordJumpModal: React.FC<WordJumpModalProps> = ({
  isOpen,
  onClose,
  activeWordId,
  onSelectWord,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = CLASS_1_WORDS.filter((w) => {
    const q = searchTerm.toLowerCase().trim();
    return (
      w.word.toLowerCase().includes(q) ||
      w.meaning.includes(q) ||
      w.category.includes(q) ||
      w.id.toString() === q
    );
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-[430px] bg-white/95 backdrop-blur-2xl rounded-t-[32px] sm:rounded-[32px] p-5 shadow-2xl border border-white/80 max-h-[85vh] flex flex-col text-right animate-in slide-in-from-bottom-8 duration-300"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">فهرست ۱۰۰ لغت کلاس اول</h3>
            <p className="text-[11px] text-slate-400">کلمه مورد نظر را برای پرش سریع انتخاب کنید</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition active:scale-95 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative my-3">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="جستجوی شماره، لغت انگلیسی یا معنی..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50/80 border border-slate-200/80 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-right"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 pr-0.5">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              کلمه‌ای با این مشخصات پیدا نشد.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isActive = item.id === activeWordId;
              const realIndex = CLASS_1_WORDS.findIndex((w) => w.id === item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectWord(realIndex);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                    isActive
                      ? 'bg-blue-50/90 border border-blue-200 shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-english font-bold ${
                        isActive
                          ? 'bg-blue-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.id}
                    </span>
                    <span className="text-xl">{item.emoji}</span>
                    <div className="text-right">
                      <div className="font-extrabold text-slate-900 font-english text-sm">
                        {item.word}{' '}
                        <span className="text-[11px] text-slate-400 font-normal">
                          {item.phonetic}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.meaning}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-medium">
                      {item.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakEnglish(item.word, 0.85);
                      }}
                      className="w-7 h-7 rounded-full bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-600 flex items-center justify-center transition active:scale-95 cursor-pointer"
                      title="پخش تلفظ"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-100">
          نمایش {filtered.length} از ۱۰۰ لغت کلاس اول
        </div>
      </div>
    </div>
  );
};
