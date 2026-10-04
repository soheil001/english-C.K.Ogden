import React, { useState, useRef } from 'react';
import { Volume2, ChevronRight, ChevronLeft, Bookmark, Sparkles } from 'lucide-react';
import { WordItem } from '../data/class1Words';
import { playWordPronunciation } from '../utils/audio';
import { WordIcon } from './WordIcon';
import purpleBook3D from '../assets/images/purple_book_3d_1791081323930.jpg';

interface WordCardSliderProps {
  currentWord: WordItem;
  currentIndex: number;
  totalWords: number;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onGoNext: () => void;
  onGoPrev: () => void;
}

export const WordCardSlider: React.FC<WordCardSliderProps> = ({
  currentWord,
  currentIndex,
  totalWords,
  isBookmarked,
  onToggleBookmark,
  onGoNext,
  onGoPrev,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [swipeAnim, setSwipeAnim] = useState<'right' | 'left' | null>(null);

  // Swipe gesture detection with vertical movement isolation
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    playWordPronunciation(currentWord.word, undefined, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = (touchStartY.current || 0) - (touchEndY.current || 0);

    // Only slide if horizontal movement was clearly intentional (prevents vertical jitter!)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      // In RTL: swipe right = next, swipe left = previous
      if (deltaX < 0 && currentIndex < totalWords - 1) {
        setSwipeAnim('right');
        onGoNext();
      } else if (deltaX > 0 && currentIndex > 0) {
        setSwipeAnim('left');
        onGoPrev();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
    setTimeout(() => setSwipeAnim(null), 300);
  };

  const percentage = Math.round(((currentIndex + 1) / totalWords) * 100);

  // 5-dot sliding indicator window
  const indicatorDots = React.useMemo(() => {
    const windowSize = 5;
    const half = Math.floor(windowSize / 2);
    let start = Math.max(0, currentIndex - half);
    let end = Math.min(totalWords, start + windowSize);
    if (end - start < windowSize) {
      start = Math.max(0, end - windowSize);
    }
    const dots = [];
    for (let i = start; i < end; i++) {
      dots.push(i);
    }
    return dots;
  }, [currentIndex, totalWords]);

  const isBook = currentWord.word.toLowerCase() === 'book';

  return (
    <div className="px-3 mt-1.5 mb-1" dir="ltr">
      {/* Outer Card with Crisp White / Glassmorphism */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
        className="bg-white/95 backdrop-blur-md rounded-[32px] p-5 sm:p-6 border border-white shadow-xl shadow-blue-950/15 relative text-left select-none transition-transform duration-200"
      >
        {/* Top Header of Card: Progress percentage (Left) and Bookmark & Category (Right) */}
        <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-100">
          {/* Left: Progress info */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-english font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-lg border border-blue-100">
              {percentage}%
            </span>
            <span className="text-xs font-bold text-slate-700 font-sans" dir="rtl">
              لغت {currentIndex + 1} از {totalWords}
            </span>
          </div>

          {/* Right: Category badge + Bookmark button */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md font-sans">
              {currentWord.category}
            </span>

            <button
              onClick={onToggleBookmark}
              title={isBookmarked ? 'حذف از نشان‌شده‌ها' : 'نشان کردن این لغت'}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-amber-50 text-amber-500 border border-amber-200 shadow-2xs scale-105'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-400 border border-slate-200/70'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Word Text (Left) and Image (Right) */}
        <div
          key={currentWord.id}
          className={`flex items-center justify-between gap-4 animate-in fade-in ${
            swipeAnim === 'right'
              ? 'slide-in-from-left-6'
              : swipeAnim === 'left'
              ? 'slide-in-from-right-6'
              : 'zoom-in-95'
          } duration-300`}
        >
          {/* LEFT SIDE: Word Text & Audio button */}
          <div className="flex-1 text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-english tracking-tight capitalize">
              {currentWord.word}
            </h2>

            <div className="flex items-center gap-2.5 mt-1.5">
              <span className="text-slate-400 font-english text-sm font-medium tracking-wider">
                {currentWord.phonetic}
              </span>

              <button
                onClick={handlePlayAudio}
                aria-label={`تلفظ کلمه ${currentWord.word}`}
                title="پخش تلفظ انگلیسی"
                className={`w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center shadow-md shadow-blue-700/30 active:scale-90 transition-all cursor-pointer ${
                  isPlayingAudio ? 'ring-4 ring-blue-200 scale-105' : ''
                }`}
              >
                <Volume2 className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

            <div className="mt-3.5 text-right" dir="rtl">
              <span className="text-[11px] text-slate-400 font-medium block">معنی:</span>
              <span className="text-xl sm:text-2xl font-black text-slate-800">
                {currentWord.meaning}
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Real Picture / Image */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-100 border-2 border-slate-100 shadow-md flex items-center justify-center shrink-0 p-1 relative">
            {isBook ? (
              <img
                src={purpleBook3D}
                alt="book"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-600/10 via-indigo-600/10 to-blue-50 flex flex-col items-center justify-center p-2 text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-1">
                  <WordIcon wordKey={currentWord.word} size={38} className="text-blue-700" />
                </div>
                <span className="text-[10px] font-english font-bold text-slate-600 capitalize truncate max-w-full">
                  {currentWord.word}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Indicator dots: ● ● ○ ○ ○ */}
        <div className="flex items-center justify-center gap-1.5 my-3.5">
          {indicatorDots.map((dotIdx) => {
            const isActive = dotIdx === currentIndex;
            return (
              <span
                key={dotIdx}
                className={`rounded-full transition-all duration-300 ${
                  isActive ? 'w-5 h-1.5 bg-blue-700' : 'w-1.5 h-1.5 bg-slate-300'
                }`}
              />
            );
          })}
        </div>

        {/* User requirement:
            "دکمه لغت بعدی لغت قبلی رو هم یکم کوچیکتر کن که ۲ کلمه کنار هم باشن نه زیر هم"
            Compact, side-by-side words without wrapping
        */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
          {/* LEFT: لغت قبلی */}
          <button
            onClick={() => {
              setSwipeAnim('left');
              onGoPrev();
            }}
            disabled={currentIndex === 0}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400 bg-slate-50'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 active:scale-95 shadow-2xs cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.4] shrink-0" />
            <span className="font-sans whitespace-nowrap" dir="rtl">لغت قبلی</span>
          </button>

          <span className="text-[10px] text-slate-400 font-bold font-sans text-center whitespace-nowrap px-1" dir="rtl">
            ورق بزنید
          </span>

          {/* RIGHT: لغت بعدی */}
          <button
            onClick={() => {
              setSwipeAnim('right');
              onGoNext();
            }}
            disabled={currentIndex === totalWords - 1}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 transition-all ${
              currentIndex === totalWords - 1
                ? 'opacity-30 cursor-not-allowed text-slate-400 bg-slate-200'
                : 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white shadow-md shadow-blue-700/25 active:scale-95 cursor-pointer'
            }`}
          >
            <span className="font-sans whitespace-nowrap" dir="rtl">لغت بعدی</span>
            <ChevronRight className="w-4 h-4 stroke-[2.4] shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
