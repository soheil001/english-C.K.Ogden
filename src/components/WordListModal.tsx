import React, { useState } from 'react';
import { Search, X, Volume2, CheckCircle2, Filter } from 'lucide-react';
import { WORDS_DATA, WordItem, LESSONS } from '../data/words';
import { speakEnglish } from '../utils/audio';

interface WordListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWord: (word: WordItem) => void;
  selectedWordId: number;
}

export const WordListModal: React.FC<WordListModalProps> = ({
  isOpen,
  onClose,
  onSelectWord,
  selectedWordId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeLessonFilter, setActiveLessonFilter] = useState<number | 'all'>('all');

  if (!isOpen) return null;

  const filteredWords = WORDS_DATA.filter((w) => {
    const matchesSearch =
      w.word.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      w.meaning.includes(searchTerm.trim()) ||
      w.category.includes(searchTerm.trim());

    const matchesLesson =
      activeLessonFilter === 'all' || w.lessonId === activeLessonFilter;

    return matchesSearch && matchesLesson;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-[32px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h3 className="font-bold text-slate-900 text-base">لیست کامل ۵۰ لغت آگدن</h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              کلمات را انتخاب کنید یا تلفظ آن‌ها را بشنوید
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 active:scale-95 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-slate-100">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="جستجو در ۵۰ لغت (فارسی یا انگلیسی)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pr-9 pl-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Lesson Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-2 no-scrollbar">
            <button
              onClick={() => setActiveLessonFilter('all')}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeLessonFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              همه (۵۰ لغت)
            </button>
            {LESSONS.map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveLessonFilter(l.id)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeLessonFilter === l.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                درس {l.id}
              </button>
            ))}
          </div>
        </div>

        {/* Words List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {filteredWords.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              لغتی با این عبارت پیدا نشد.
            </div>
          ) : (
            filteredWords.map((item) => {
              const isSelected = item.id === selectedWordId;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectWord(item);
                    onClose();
                  }}
                  className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/80 border border-blue-200/80 shadow-xs'
                      : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-english font-bold ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {item.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 font-english text-sm">
                          {item.word}
                        </span>
                        <span className="text-[11px] text-slate-400 font-english">
                          {item.phonetic}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {item.meaning}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md font-medium">
                      {item.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakEnglish(item.word, 0.85);
                      }}
                      title="پخش تلفظ"
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-500 hover:text-white text-slate-600 flex items-center justify-center transition-colors active:scale-90"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500 font-medium">
          نمایش {filteredWords.length} از ۵۰ کلمه برگزیده متد آگدن
        </div>
      </div>
    </div>
  );
};
