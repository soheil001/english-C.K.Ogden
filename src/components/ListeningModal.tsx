import React, { useState, useEffect } from 'react';
import { X, Volume2, CheckCircle2, RotateCcw, Headphones, Sparkles } from 'lucide-react';
import { WORDS_DATA, WordItem } from '../data/words';
import { speakEnglish, playChime } from '../utils/audio';

interface ListeningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ListeningModal: React.FC<ListeningModalProps> = ({ isOpen, onClose }) => {
  const [currentWord, setCurrentWord] = useState<WordItem>(WORDS_DATA[0]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const initRound = () => {
    const random = WORDS_DATA[Math.floor(Math.random() * WORDS_DATA.length)];
    setCurrentWord(random);
    setIsAnswered(false);
    setSelectedId(null);
    speakEnglish(random.word, 0.85);
  };

  useEffect(() => {
    if (isOpen) {
      initRound();
    }
  }, [isOpen]);

  const options = React.useMemo(() => {
    const others = WORDS_DATA.filter((w) => w.id !== currentWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [currentWord, ...others].sort(() => 0.5 - Math.random());
  }, [currentWord]);

  if (!isOpen) return null;

  const handleSelect = (opt: WordItem) => {
    if (isAnswered) return;
    setSelectedId(opt.id);
    setIsAnswered(true);
    const correct = opt.id === currentWord.id;
    playChime(correct);
    if (correct) setScore((s) => s + 1);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-[32px] p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
              <Headphones className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">تمرین شنیداری (گوش بده)</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-center my-6">
          <p className="text-xs text-slate-500 mb-4 font-medium">
            به تلفظ انگلیسی گوش دهید و کلمه مربوطه را انتخاب کنید:
          </p>

          <button
            onClick={() => speakEnglish(currentWord.word, 0.85)}
            className="w-20 h-20 rounded-full bg-pink-500 hover:bg-pink-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-pink-500/30 active:scale-95 transition-all group"
          >
            <Volume2 className="w-9 h-9 group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={() => speakEnglish(currentWord.word, 0.85)}
            className="text-xs font-semibold text-pink-600 hover:text-pink-700 mt-3 inline-block"
          >
            پخش مجدد تلفظ
          </button>

          {isAnswered && (
            <div className="mt-3 text-lg font-extrabold text-slate-800 font-english capitalize">
              {currentWord.word}{' '}
              <span className="text-xs text-slate-400 font-normal">
                {currentWord.phonetic}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {options.map((opt) => {
            let style = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
            if (isAnswered) {
              if (opt.id === currentWord.id) {
                style = 'bg-emerald-500 border-emerald-600 text-white font-bold';
              } else if (opt.id === selectedId) {
                style = 'bg-rose-500 border-rose-600 text-white font-bold';
              } else {
                style = 'opacity-40 bg-slate-50 border-slate-200 text-slate-400';
              }
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                disabled={isAnswered}
                className={`p-3 rounded-2xl border text-xs sm:text-sm font-semibold transition-all active:scale-95 ${style}`}
              >
                {opt.meaning}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <button
            onClick={initRound}
            className="mt-4 w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs rounded-xl shadow-md active:scale-95 transition"
          >
            کلمه بعدی
          </button>
        )}
      </div>
    </div>
  );
};
