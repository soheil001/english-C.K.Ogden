import React, { useState, useRef } from 'react';
import { Volume2, MessageSquare, ChevronRight, ChevronLeft, Play, ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { WordItem, Lesson } from '../data/words';
import { speakEnglish } from '../utils/audio';

interface MainWordCardProps {
  currentWord: WordItem;
  currentLesson: Lesson;
  lessonWords: WordItem[];
  currentIndexInLesson: number;
  onSelectWordIndex: (index: number) => void;
  onStartPractice: () => void;
  onOpenLessonsModal: () => void;
}

export const MainWordCard: React.FC<MainWordCardProps> = ({
  currentWord,
  currentLesson,
  lessonWords,
  currentIndexInLesson,
  onSelectWordIndex,
  onStartPractice,
  onOpenLessonsModal,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'right' | 'left'>('right');
  
  // Touch swipe handling for RTL
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handlePlayWordAudio = () => {
    setIsPlayingAudio(true);
    speakEnglish(currentWord.word, 0.85);
    setTimeout(() => setIsPlayingAudio(false), 900);
  };

  const handlePlayExampleAudio = () => {
    speakEnglish(currentWord.exampleEn, 0.9);
  };

  const totalInLesson = lessonWords.length || 10;
  const currentStep = currentIndexInLesson + 1;
  const progressPercent = (currentStep / totalInLesson) * 100;
  const radius = 11;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const goToNext = () => {
    if (currentIndexInLesson < lessonWords.length - 1) {
      setSlideDirection('left');
      onSelectWordIndex(currentIndexInLesson + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndexInLesson > 0) {
      setSlideDirection('right');
      onSelectWordIndex(currentIndexInLesson - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    // In RTL: swiping left goes to next word, swiping right goes to previous word
    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section aria-labelledby="lesson-heading" className="px-4 my-2" dir="rtl">
      {/* Lesson Bar Header matching screenshot (Strictly RTL) */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          onClick={onOpenLessonsModal}
          className="flex items-center gap-2 group text-right focus:outline-none cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
            <Layers className="w-4 h-4" />
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5">
              <h2 id="lesson-heading" className="font-bold text-slate-800 text-sm">
                {currentLesson.title}
              </h2>
              <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-md">
                تغییر درس
              </span>
            </div>
          </div>
        </button>

        {/* Progress Circular ring (e.g. 1 / 10) */}
        <div className="flex items-center gap-2 flex-row-reverse">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg className="w-6 h-6 -rotate-90 transform">
              <circle
                cx="12"
                cy="12"
                r={radius}
                stroke="#e2e8f0"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="12"
                cy="12"
                r={radius}
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-300 ease-out"
              />
            </svg>
          </div>
          <span className="text-xs font-english font-bold text-slate-500 tracking-tight">
            {currentStep} / {totalInLesson}
          </span>
        </div>
      </div>

      {/* Main Learning Card (Strictly RTL & Touch Swipeable) */}
      <article
        aria-labelledby="word-title"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="bg-white rounded-[32px] p-5 shadow-xl shadow-indigo-100/60 border border-slate-100/80 relative text-right transition-all select-none"
      >
        <div
          key={currentWord.id}
          className={`flex items-start justify-between gap-3 ${
            slideDirection === 'left' ? 'animate-in fade-in slide-in-from-right-4' : 'animate-in fade-in slide-in-from-left-4'
          } duration-300`}
        >
          {/* Right Text Info (Persian & English) */}
          <div className="flex-1 text-right">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50/90 rounded-full mb-2 border border-blue-100/50">
              {currentWord.category}
            </span>

            {/* English Word */}
            <h3
              id="word-title"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-english tracking-tight capitalize text-right"
            >
              {currentWord.word}
            </h3>

            {/* Phonetic & Audio Trigger */}
            <div className="flex items-center gap-3 mt-1.5 justify-start">
              <span className="text-slate-400 font-english text-sm font-medium tracking-wide">
                {currentWord.phonetic}
              </span>

              <button
                onClick={handlePlayWordAudio}
                aria-label={`تلفظ ${currentWord.word}`}
                title="پخش تلفظ صوتی"
                className={`w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 active:scale-95 transition-all cursor-pointer ${
                  isPlayingAudio ? 'ring-4 ring-blue-200 scale-105' : ''
                }`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Persian Meaning */}
            <div className="text-xl sm:text-2xl font-bold text-slate-800 mt-2.5 text-right">
              {currentWord.meaning}
            </div>
          </div>

          {/* Left: 3D Illustration matching screenshot */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-1 shadow-sm border border-purple-100/50 shrink-0">
            {currentWord.image ? (
              <img
                src={currentWord.image}
                alt={currentWord.word}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex flex-col items-center justify-center text-center p-2">
                <span className="text-4xl mb-1 drop-shadow-sm">
                  {currentWord.id % 4 === 0 ? '✨' : currentWord.id % 3 === 0 ? '💡' : currentWord.id % 2 === 0 ? '🌟' : '📚'}
                </span>
                <span className="text-[11px] font-english font-bold text-indigo-700 capitalize">
                  {currentWord.word}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Example Sentence Box (Right-to-Left aligned) */}
        <div
          onClick={handlePlayExampleAudio}
          role="button"
          tabIndex={0}
          title="برای شنیدن تلفظ جمله کلیک کنید"
          className="mt-4 bg-slate-50/90 hover:bg-blue-50/50 border border-slate-100 rounded-2xl p-3.5 flex items-start gap-3 transition-colors cursor-pointer group text-right"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="flex-1 text-right">
            <div className="text-sm font-bold text-slate-800 font-english group-hover:text-blue-600 transition-colors flex items-center justify-start gap-1.5 text-right">
              <span>{currentWord.exampleEn}</span>
              <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1 text-right">
              {currentWord.exampleFa}
            </div>
          </div>
        </div>

        {/* Carousel Dots & RTL Navigation Controls */}
        <div className="flex items-center justify-between mt-5 px-1">
          {/* Previous in RTL (Right button: کلمه قبلی) */}
          <button
            onClick={goToPrev}
            disabled={currentIndexInLesson === 0}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentIndexInLesson === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 cursor-pointer'
            }`}
            aria-label="کلمه قبلی"
          >
            <ChevronRight className="w-4 h-4" />
            <span>قبلی</span>
          </button>

          {/* Dots Indicator (Right-to-Left) */}
          <div className="flex items-center gap-1.5">
            {lessonWords.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSlideDirection(idx > currentIndexInLesson ? 'left' : 'right');
                  onSelectWordIndex(idx);
                }}
                aria-label={`کلمه ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndexInLesson
                    ? 'w-6 h-2 bg-blue-600'
                    : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          {/* Next in RTL (Left button: کلمه بعدی با فلش رو به جلو در راست‌چین) */}
          <button
            onClick={goToNext}
            disabled={currentIndexInLesson === lessonWords.length - 1}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentIndexInLesson === lessonWords.length - 1
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'bg-blue-50 hover:bg-blue-100 text-blue-700 active:scale-95 cursor-pointer'
            }`}
            aria-label="کلمه بعدی"
          >
            <span>بعدی</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Primary CTA Button matching screenshot (RTL arrow pointing left) */}
        <button
          onClick={onStartPractice}
          className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 active:scale-[0.98] transition-all cursor-pointer group"
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white text-xs">
            <Play className="w-3 h-3 fill-current ml-0.5" />
          </div>
          <span>شروع تمرین</span>
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
        </button>
      </article>
    </section>
  );
};
