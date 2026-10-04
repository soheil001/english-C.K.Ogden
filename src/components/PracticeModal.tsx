import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Volume2, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { WordItem, WORDS_DATA } from '../data/words';
import { speakEnglish, playChime } from '../utils/audio';

interface PracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWord: WordItem;
}

export const PracticeModal: React.FC<PracticeModalProps> = ({
  isOpen,
  onClose,
  initialWord,
}) => {
  const [currentWord, setCurrentWord] = useState<WordItem>(initialWord);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  // Generate 4 multiple choice options: 1 correct + 3 random wrong
  const options = React.useMemo(() => {
    const wrong = WORDS_DATA.filter((w) => w.id !== currentWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const combined = [currentWord, ...wrong].sort(() => 0.5 - Math.random());
    return combined;
  }, [currentWord]);

  React.useEffect(() => {
    setCurrentWord(initialWord);
    setIsAnswered(false);
    setSelectedOptionId(null);
  }, [initialWord, isOpen]);

  if (!isOpen) return null;

  const handleSelectOption = (option: WordItem) => {
    if (isAnswered) return;

    setSelectedOptionId(option.id);
    setIsAnswered(true);

    const correct = option.id === currentWord.id;
    setIsCorrect(correct);
    playChime(correct);

    if (correct) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    // Pick another random word from 50 words
    const randomNext = WORDS_DATA[Math.floor(Math.random() * WORDS_DATA.length)];
    setCurrentWord(randomNext);
    setIsAnswered(false);
    setSelectedOptionId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-[32px] p-5 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-500 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              امتیاز زنجیره‌ای: {streak} 🔥
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 active:scale-95 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Question Area */}
        <div className="my-5 text-center">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            تمرین معنی لغات
          </span>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-english mt-3 mb-1 capitalize">
            {currentWord.word}
          </h3>

          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xs text-slate-400 font-english">{currentWord.phonetic}</span>
            <button
              onClick={() => speakEnglish(currentWord.word, 0.85)}
              className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-slate-600 font-medium">
            معنی درست این کلمه را انتخاب کنید:
          </p>
        </div>

        {/* 4 Choices */}
        <div className="space-y-2.5">
          {options.map((opt) => {
            const isThisSelected = selectedOptionId === opt.id;
            const isThisCorrect = opt.id === currentWord.id;

            let buttonStyle = 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800';

            if (isAnswered) {
              if (isThisCorrect) {
                buttonStyle = 'bg-emerald-500 border-emerald-600 text-white shadow-md';
              } else if (isThisSelected) {
                buttonStyle = 'bg-rose-500 border-rose-600 text-white shadow-md';
              } else {
                buttonStyle = 'bg-slate-50 opacity-40 border-slate-200 text-slate-400';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                disabled={isAnswered}
                className={`w-full p-3.5 rounded-2xl border text-sm font-bold flex items-center justify-between transition-all active:scale-[0.98] ${buttonStyle}`}
              >
                <span>{opt.meaning}</span>
                {isAnswered && isThisCorrect && <CheckCircle className="w-4 h-4 text-white" />}
                {isAnswered && isThisSelected && !isThisCorrect && (
                  <AlertCircle className="w-4 h-4 text-white" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback & Next Button */}
        {isAnswered && (
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-right">
              {isCorrect ? (
                <div className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>آفرین! پاسخ صحیح است.</span>
                </div>
              ) : (
                <div className="text-xs font-bold text-rose-600 flex items-center gap-1">
                  <span>پاسخ صحیح: {currentWord.meaning}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition"
            >
              <span>کلمه بعدی</span>
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
