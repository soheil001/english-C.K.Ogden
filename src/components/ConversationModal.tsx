import React, { useState } from 'react';
import { X, MessageSquareQuote, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { speakEnglish } from '../utils/audio';

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SentenceCard {
  en: string;
  fa: string;
  keyWords: string[];
}

const SAMPLE_SENTENCES: SentenceCard[] = [
  {
    en: 'Give me a good book.',
    fa: 'یک کتاب خوب به من بده.',
    keyWords: ['give', 'good', 'book'],
  },
  {
    en: 'I see a new light.',
    fa: 'من یک نور جدید می‌بینم.',
    keyWords: ['see', 'new', 'light'],
  },
  {
    en: 'Come to my house with a friend.',
    fa: 'با یک دوست به خانه من بیا.',
    keyWords: ['come', 'house', 'with', 'friend'],
  },
  {
    en: 'Keep this simple idea in mind.',
    fa: 'این ایده ساده را در ذهن نگه دار.',
    keyWords: ['keep', 'simple', 'idea', 'in'],
  },
  {
    en: 'Time for a true question and answer.',
    fa: 'زمان یک پرسش و پاسخ واقعی است.',
    keyWords: ['time', 'true', 'question', 'answer'],
  },
  {
    en: 'She made an easy way for us.',
    fa: 'او یک راه آسان برای ما درست کرد.',
    keyWords: ['make', 'easy', 'way'],
  },
  {
    en: 'Step out and get some water.',
    fa: 'برو بیرون و مقداری آب بگیر.',
    keyWords: ['out', 'get', 'water'],
  },
];

export const ConversationModal: React.FC<ConversationModalProps> = ({ isOpen, onClose }) => {
  const [activeSentence, setActiveSentence] = useState<SentenceCard>(SAMPLE_SENTENCES[0]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[32px] p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">مکالمه و جمله‌سازی با ۵۰ لغت</h3>
              <p className="text-[10px] text-slate-400">قدرت ترکیب کلمات با متد آگدن</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected sentence showcase */}
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-teal-50/80 to-emerald-50/80 border border-teal-100 text-center">
          <h4 className="text-xl font-extrabold text-slate-900 font-english mb-1">
            {activeSentence.en}
          </h4>
          <p className="text-xs text-slate-600 font-medium mb-3">
            {activeSentence.fa}
          </p>

          <button
            onClick={() => speakEnglish(activeSentence.en, 0.85)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>پخش تلفظ جمله</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-3">
            <span className="text-[10px] text-teal-700 font-semibold">کلمات کلیدی آگدن:</span>
            {activeSentence.keyWords.map((kw) => (
              <span
                key={kw}
                onClick={() => speakEnglish(kw, 0.85)}
                className="px-2 py-0.5 bg-white text-teal-800 border border-teal-200 rounded-md text-[10px] font-english font-bold cursor-pointer hover:bg-teal-50 shadow-2xs"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* List of sample sentences */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <p className="text-xs font-bold text-slate-700 mb-1">
            جملات کاربردی دیگر با ۵۰ کلمه:
          </p>
          {SAMPLE_SENTENCES.map((s, idx) => {
            const isCurrent = s.en === activeSentence.en;
            return (
              <div
                key={idx}
                onClick={() => {
                  setActiveSentence(s);
                  speakEnglish(s.en, 0.85);
                }}
                className={`p-3 rounded-2xl border text-right cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-teal-50 border-teal-300 shadow-xs'
                    : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 font-english text-xs sm:text-sm">
                    {s.en}
                  </span>
                  <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{s.fa}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
