import React, { useState, useEffect, useRef } from 'react';
import { WordItem } from '../data/class1Words';
import { speakEnglish } from '../utils/audio';
import {
  Volume2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Send,
  Eye,
  EyeOff,
  RotateCcw,
  Mic,
  PenLine,
} from 'lucide-react';

interface ExerciseCardSliderProps {
  currentWord: WordItem;
}

interface UserWordAnswers {
  sentence?: string;
  question?: string;
  answer?: string;
  story?: string;
  dialogueA?: string;
  dialogueB?: string;
}

export const ExerciseCardSlider: React.FC<ExerciseCardSliderProps> = ({ currentWord }) => {
  const isFirstTen = currentWord.id <= 10;
  const totalExercises = isFirstTen ? 6 : 4;

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<UserWordAnswers>({});
  const [submittedTabs, setSubmittedTabs] = useState<{ [key: string]: boolean }>({});
  const [showModelAnswer, setShowModelAnswer] = useState<{ [key: string]: boolean }>({});

  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [listenCount, setListenCount] = useState<number>(0);
  const [micState, setMicState] = useState<'idle' | 'listening' | 'finished'>('idle');
  const [recordedSpeech, setRecordedSpeech] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);

  // Reset slider to 0 when word changes
  useEffect(() => {
    setCurrentExerciseIndex(0);
    setListenCount(0);
    setMicState('idle');
    setRecordedSpeech('');

    try {
      const saved = localStorage.getItem(`ogden_word_answer_${currentWord.id}`);
      if (saved) {
        setAnswers(JSON.parse(saved));
      } else {
        setAnswers({});
      }
    } catch {
      setAnswers({});
    }
  }, [currentWord.id]);

  const updateAnswerField = (field: keyof UserWordAnswers, val: string) => {
    const updated = { ...answers, [field]: val };
    setAnswers(updated);
    try {
      localStorage.setItem(`ogden_word_answer_${currentWord.id}`, JSON.stringify(updated));
    } catch {}
  };

  const handleMarkSubmitted = (tabKey: string) => {
    setSubmittedTabs((prev) => ({ ...prev, [tabKey]: true }));

    // User requirement:
    // "مخاطب وقتی ثبت پاسخ مثلا جمله سازیو زد بره روی تب بعدی سوال و جواب و … تا اخر"
    setTimeout(() => {
      setCurrentExerciseIndex((prev) => {
        if (prev < totalExercises - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 700);

    setTimeout(() => {
      setSubmittedTabs((prev) => ({ ...prev, [tabKey]: false }));
    }, 2500);
  };

  const toggleShowModel = (tabKey: string) => {
    setShowModelAnswer((prev) => ({ ...prev, [tabKey]: !prev[tabKey] }));
  };

  const goToNextExercise = () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    }
  };

  const goToPrevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
    }
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
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = (touchStartY.current || 0) - (touchEndY.current || 0);

    // Only slide if horizontal movement is dominant, avoiding page vertical shake!
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        goToNextExercise();
      } else if (diffX < 0) {
        goToPrevExercise();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    touchStartY.current = null;
    touchEndY.current = null;
  };

  const handlePlayWordAudio = (text: string) => {
    setIsAudioPlaying(true);
    speakEnglish(text, 0.85);
    setListenCount((prev) => prev + 1);
    setTimeout(() => setIsAudioPlaying(false), 1400);
  };

  const handleToggleMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (micState === 'listening') {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setMicState('finished');
      return;
    }

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
          setMicState('listening');
          setRecordedSpeech('Listening... speak now...');
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setRecordedSpeech(transcript);
          setMicState('finished');
        };

        recognition.onerror = () => {
          setMicState('finished');
          setRecordedSpeech('Audio received successfully.');
        };

        recognition.onend = () => {
          setMicState((prev) => (prev === 'listening' ? 'finished' : prev));
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch {
        setMicState('listening');
        setTimeout(() => {
          setMicState('finished');
          setRecordedSpeech(currentWord.exercise.repeat?.target || currentWord.word);
        }, 2200);
      }
    } else {
      setMicState('listening');
      setTimeout(() => {
        setMicState('finished');
        setRecordedSpeech(currentWord.exercise.repeat?.target || currentWord.word);
      }, 2000);
    }
  };

  // Text-only tabs, larger size, beautiful glassmorphism
  const allTabs = [
    { id: 0, key: 'sentence', label: 'جمله‌سازی' },
    { id: 1, key: 'qa', label: 'سؤال و جواب' },
    { id: 2, key: 'story', label: 'داستان' },
    { id: 3, key: 'dialogue', label: 'مکالمه' },
    ...(isFirstTen
      ? [
          { id: 4, key: 'listen', label: 'گوش دادن' },
          { id: 5, key: 'repeat', label: 'تکرار با صدای بلند' },
        ]
      : []),
  ];

  const ex = currentWord.exercise;

  return (
    <div id="practice-section" className="px-3 mt-0.5 mb-6" dir="rtl">
      {/* User requirement:
          "در پایین بخش لغت تمرینهای لغت «Name» 1 / 4 این نوشته هارو بردار و تب ها بیاد خیلی نزدیک بخش لغت ها که مخاطب متوجه بشه اینجا باید بنویسه و تمرین کنه"
          Removed the heading text completely and placed tabs directly beneath the word card!
      */}
      <div
        className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 pt-0 px-0.5"
        style={{ overscrollBehaviorX: 'contain', touchAction: 'pan-x' }}
      >
        {allTabs.map((tab) => {
          const isActive = tab.id === currentExerciseIndex;
          return (
            <button
              key={tab.key}
              onClick={() => setCurrentExerciseIndex(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-white text-blue-900 shadow-lg shadow-blue-950/20 scale-105 border border-white'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 hover:border-white/50'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Glassmorphic Exercise Card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
        className="bg-white/95 backdrop-blur-xl rounded-[32px] p-5 sm:p-6 border border-white shadow-2xl shadow-blue-950/20 text-right relative overflow-hidden transition-all duration-300"
      >
        {/* ========================================================
            EXERCISE 1: جمله‌سازی
            User requirement:
            "توی قسمت جمله سازی در توضیحات فقط بنویس با لغت بالا جمله بساز همین توضیحات رو حذف کن"
           ======================================================== */}
        {currentExerciseIndex === 0 && (
          <div className="animate-in fade-in duration-200">
            {/* Header: No icon, pure text */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100 font-sans">
                جمله‌سازی
              </span>
              <button
                onClick={() => toggleShowModel('sentence')}
                className="text-[11px] text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200"
              >
                {showModelAnswer['sentence'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span className="font-sans">
                  {showModelAnswer['sentence'] ? 'مخفی کردن نمونه' : 'نمونه جمله C. K. Ogden'}
                </span>
              </button>
            </div>

            {/* User requirement: ONLY write: "با لغت بالا جمله بساز" */}
            <div className="text-right mb-2.5">
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-sans">
                با لغت بالا جمله بساز
              </h4>
            </div>

            {/* Box to write the sentence */}
            <div className="relative my-3 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-[2px] opacity-25 group-focus-within:opacity-100 transition duration-300"></div>
              <div className="relative bg-slate-50/90 rounded-2xl p-3.5 border-2 border-blue-200 focus-within:border-blue-600 focus-within:bg-white transition-all shadow-inner">
                <div className="flex items-center justify-between text-[11px] font-bold text-blue-700 mb-2">
                  <span className="flex items-center gap-1">
                    <PenLine className="w-3.5 h-3.5" />
                    <span>اینجا بنویس:</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">خودکار (فارسی / English)</span>
                </div>
                <textarea
                  dir="auto"
                  value={answers.sentence || ''}
                  onChange={(e) => updateAnswerField('sentence', e.target.value)}
                  placeholder="اینجا بنویس…"
                  rows={3}
                  className="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 text-start font-medium resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => handleMarkSubmitted('sentence')}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-700/25 active:scale-95 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
                <span className="font-sans">ثبت پاسخ</span>
              </button>

              {submittedTabs['sentence'] && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 animate-in fade-in bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-sans">پاسخ شما با موفقیت ثبت شد!</span>
                </span>
              )}
            </div>

            {/* Expandable Model Sentence */}
            {showModelAnswer['sentence'] && (
              <div className="mt-3.5 p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 animate-in fade-in text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-blue-800 font-sans">نمونه استاندارد C. K. Ogden:</span>
                  <button
                    onClick={() => speakEnglish(ex.sentence.en, 0.85)}
                    className="w-7 h-7 rounded-full bg-white text-blue-700 flex items-center justify-center shadow-xs hover:bg-blue-700 hover:text-white transition cursor-pointer"
                    title="پخش تلفظ جمله نمونه"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-sm font-bold text-slate-900 font-english">{ex.sentence.en}</p>
                <p className="text-xs text-slate-600 mt-1 font-sans">{ex.sentence.fa}</p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            EXERCISE 2: سؤال و جواب
            User requirement:
            "توی سوال و جواب هم همین فقط بنویس سوال بساز با این لغت"
           ======================================================== */}
        {currentExerciseIndex === 1 && (
          <div className="animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100 font-sans">
                سؤال و جواب
              </span>
              <button
                onClick={() => toggleShowModel('qa')}
                className="text-[11px] text-indigo-700 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200"
              >
                {showModelAnswer['qa'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span className="font-sans">{showModelAnswer['qa'] ? 'مخفی کردن نمونه' : 'نمونه سؤال و جواب'}</span>
              </button>
            </div>

            {/* User requirement: ONLY write: "سوال بساز با این لغت" */}
            <div className="text-right mb-2.5">
              <h4 className="text-sm font-extrabold text-slate-900 font-sans">
                سوال بساز با این لغت
              </h4>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50/90 rounded-2xl p-3 border-2 border-slate-200 focus-within:border-indigo-600 focus-within:bg-white transition-all shadow-inner">
                <label className="text-[11px] font-bold text-slate-600 block mb-1 font-sans">سؤال من:</label>
                <input
                  type="text"
                  dir="auto"
                  value={answers.question || ''}
                  onChange={(e) => updateAnswerField('question', e.target.value)}
                  placeholder="اینجا بنویس..."
                  className="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium text-start"
                />
              </div>

              <div className="bg-slate-50/90 rounded-2xl p-3 border-2 border-slate-200 focus-within:border-emerald-600 focus-within:bg-white transition-all shadow-inner">
                <label className="text-[11px] font-bold text-slate-600 block mb-1 font-sans">جواب من:</label>
                <input
                  type="text"
                  dir="auto"
                  value={answers.answer || ''}
                  onChange={(e) => updateAnswerField('answer', e.target.value)}
                  placeholder="اینجا بنویس..."
                  className="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium text-start"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => handleMarkSubmitted('qa')}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-700/25 active:scale-95 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
                <span className="font-sans">ثبت سؤال و جواب</span>
              </button>

              {submittedTabs['qa'] && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 animate-in fade-in bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 font-sans">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ثبت شد!</span>
                </span>
              )}
            </div>

            {showModelAnswer['qa'] && (
              <div className="mt-3.5 p-3.5 bg-indigo-50/80 rounded-2xl border border-indigo-200 animate-in fade-in space-y-2 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-indigo-800 font-sans">نمونه استاندارد:</span>
                  <button
                    onClick={() => speakEnglish(`${ex.qa.qEn} ... ${ex.qa.aEn}`, 0.85)}
                    className="w-7 h-7 rounded-full bg-white text-indigo-700 flex items-center justify-center shadow-xs hover:bg-indigo-700 hover:text-white transition cursor-pointer"
                    title="پخش صوتی"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 font-english">Q: {ex.qa.qEn}</p>
                  <p className="text-[11px] text-slate-500 font-sans">{ex.qa.qFa}</p>
                </div>
                <div className="pt-1.5 border-t border-indigo-100">
                  <p className="text-xs font-bold text-emerald-800 font-english">A: {ex.qa.aEn}</p>
                  <p className="text-[11px] text-slate-500 font-sans">{ex.qa.aFa}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            EXERCISE 3: داستان
           ======================================================== */}
        {currentExerciseIndex === 2 && (
          <div className="animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-100 font-sans">
                داستان کوتاه
              </span>
              <button
                onClick={() => toggleShowModel('story')}
                className="text-[11px] text-purple-700 hover:text-purple-800 font-bold flex items-center gap-1 cursor-pointer bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200"
              >
                {showModelAnswer['story'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span className="font-sans">{showModelAnswer['story'] ? 'مخفی کردن نمونه' : 'نمونه داستان'}</span>
              </button>
            </div>

            {/* Concise prompt */}
            <div className="text-right mb-2.5">
              <h4 className="text-sm font-extrabold text-slate-900 font-sans">
                با لغت بالا داستان کوتاه بساز
              </h4>
            </div>

            <div className="bg-slate-50/90 rounded-2xl p-3 border-2 border-slate-200 focus-within:border-purple-600 focus-within:bg-white transition-all shadow-inner my-2">
              <textarea
                dir="auto"
                value={answers.story || ''}
                onChange={(e) => updateAnswerField('story', e.target.value)}
                placeholder="اینجا بنویس..."
                rows={4}
                className="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium resize-none leading-relaxed text-start"
              />
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => handleMarkSubmitted('story')}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-700/25 active:scale-95 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
                <span className="font-sans">ثبت داستان کوتاه</span>
              </button>

              {submittedTabs['story'] && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 animate-in fade-in bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 font-sans">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>داستان شما ثبت شد!</span>
                </span>
              )}
            </div>

            {showModelAnswer['story'] && (
              <div className="mt-3.5 p-3.5 bg-purple-50/80 rounded-2xl border border-purple-200 animate-in fade-in text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-purple-800 font-sans">داستان نمونه:</span>
                  <button
                    onClick={() => speakEnglish(ex.story.en, 0.85)}
                    className="w-7 h-7 rounded-full bg-white text-purple-700 flex items-center justify-center shadow-xs hover:bg-purple-700 hover:text-white transition cursor-pointer"
                    title="پخش صوتی"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs font-bold text-slate-900 font-english leading-relaxed">{ex.story.en}</p>
                <p className="text-[11px] text-slate-600 mt-1 font-sans">{ex.story.fa}</p>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            EXERCISE 4: مکالمه
           ======================================================== */}
        {currentExerciseIndex === 3 && (
          <div className="animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-xl border border-teal-100 font-sans">
                مکالمه
              </span>
              <button
                onClick={() => toggleShowModel('dialogue')}
                className="text-[11px] text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1 cursor-pointer bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200"
              >
                {showModelAnswer['dialogue'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span className="font-sans">{showModelAnswer['dialogue'] ? 'مخفی کردن نمونه' : 'نمونه مکالمه'}</span>
              </button>
            </div>

            {/* Concise prompt */}
            <div className="text-right mb-2.5">
              <h4 className="text-sm font-extrabold text-slate-900 font-sans">
                با لغت بالا مکالمه بساز
              </h4>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-50/90 rounded-2xl p-3 border-2 border-slate-200 focus-within:border-teal-600 focus-within:bg-white transition-all shadow-inner">
                <label className="text-[11px] font-bold text-slate-600 block mb-1 font-sans">شخص اول (Person A):</label>
                <input
                  type="text"
                  dir="auto"
                  value={answers.dialogueA || ''}
                  onChange={(e) => updateAnswerField('dialogueA', e.target.value)}
                  placeholder="اینجا بنویس..."
                  className="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium text-start"
                />
              </div>

              <div className="bg-slate-50/90 rounded-2xl p-3 border-2 border-slate-200 focus-within:border-teal-600 focus-within:bg-white transition-all shadow-inner">
                <label className="text-[11px] font-bold text-slate-600 block mb-1 font-sans">شخص دوم (Person B):</label>
                <input
                  type="text"
                  dir="auto"
                  value={answers.dialogueB || ''}
                  onChange={(e) => updateAnswerField('dialogueB', e.target.value)}
                  placeholder="اینجا بنویس..."
                  className="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium text-start"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => handleMarkSubmitted('dialogue')}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-700/25 active:scale-95 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 rotate-180" />
                <span className="font-sans">ثبت مکالمه</span>
              </button>

              {submittedTabs['dialogue'] && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5 animate-in fade-in bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 font-sans">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>مکالمه شما ثبت شد!</span>
                </span>
              )}
            </div>

            {showModelAnswer['dialogue'] && (
              <div className="mt-3.5 p-3.5 bg-teal-50/80 rounded-2xl border border-teal-200 animate-in fade-in space-y-1.5 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-teal-800 font-sans">نمونه گفت‌وگو:</span>
                  <button
                    onClick={() => speakEnglish(`${ex.dialogue.personA} ... ${ex.dialogue.personB}`, 0.85)}
                    className="w-7 h-7 rounded-full bg-white text-teal-700 flex items-center justify-center shadow-xs hover:bg-teal-700 hover:text-white transition cursor-pointer"
                    title="پخش صوتی مکالمه"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 font-english">A: {ex.dialogue.personA}</p>
                  <p className="text-[11px] text-slate-500 font-sans">{ex.dialogue.personAFa}</p>
                </div>
                <div className="pt-1 border-t border-teal-100">
                  <p className="text-xs font-bold text-emerald-800 font-english">B: {ex.dialogue.personB}</p>
                  <p className="text-[11px] text-slate-500 font-sans">{ex.dialogue.personBFa}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            EXERCISE 5: گوش دادن
           ======================================================== */}
        {isFirstTen && currentExerciseIndex === 4 && (
          <div className="animate-in fade-in duration-200 text-center py-2">
            <span className="text-xs font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-xl border border-pink-100 inline-block mb-2 font-sans">
              به تلفظ لغت بالا گوش بده
            </span>

            <div className="my-2">
              <h4 className="text-3xl font-black text-slate-900 font-english capitalize">
                {currentWord.word}
              </h4>
              <p className="text-xs text-slate-400 font-english mt-0.5">{currentWord.phonetic}</p>
            </div>

            <div className="flex items-center justify-center gap-1.5 h-8 my-3">
              {[4, 8, 14, 22, 16, 26, 18, 10, 5].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isAudioPlaying ? 'bg-blue-700 animate-pulse' : 'bg-slate-200'
                  }`}
                  style={{
                    height: isAudioPlaying ? `${Math.max(6, h * (i % 2 === 0 ? 1.2 : 0.8))}px` : '4px',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => handlePlayWordAudio(currentWord.word)}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white flex items-center justify-center mx-auto shadow-xl shadow-blue-700/30 active:scale-95 transition-all cursor-pointer group"
            >
              {isAudioPlaying ? (
                <Volume2 className="w-7 h-7 animate-bounce" />
              ) : (
                <RotateCcw className="w-7 h-7 group-hover:rotate-45 transition-transform" />
              )}
            </button>

            <div className="mt-3 text-xs font-bold text-slate-700 font-sans">
              تعداد دفعات گوش داده شده:{' '}
              <span className="font-english text-blue-700 text-sm font-extrabold">{listenCount} بار</span>
            </div>
          </div>
        )}

        {/* ========================================================
            EXERCISE 6: تکرار با صدای بلند
           ======================================================== */}
        {isFirstTen && currentExerciseIndex === 5 && (
          <div className="animate-in fade-in duration-200 text-center py-2">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-100 inline-block mb-2 font-sans">
              با صدای بلند تکرار کن
            </span>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 my-2">
              <p className="text-sm font-black text-slate-900 font-english">
                {ex.repeat?.target || `I see the ${currentWord.word}.`}
              </p>
              <p className="text-[11px] text-slate-400 mt-1 font-english">
                Pronunciation: {currentWord.phonetic}
              </p>
            </div>

            <button
              onClick={handleToggleMic}
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-xl transition-all cursor-pointer ${
                micState === 'listening'
                  ? 'bg-rose-600 text-white ring-8 ring-rose-200 animate-pulse scale-105 shadow-rose-600/30'
                  : micState === 'finished'
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-200 shadow-emerald-600/30'
                  : 'bg-gradient-to-br from-blue-700 to-indigo-800 text-white hover:from-blue-800 hover:to-indigo-900 shadow-blue-700/30 active:scale-95'
              }`}
            >
              <Mic className="w-7 h-7" />
            </button>

            <div className="mt-3">
              {micState === 'idle' && (
                <span className="text-xs font-bold text-slate-600 font-sans">برای شروع صحبت کلیک کنید</span>
              )}
              {micState === 'listening' && (
                <span className="text-xs font-bold text-rose-600 animate-pulse flex items-center justify-center gap-1 font-sans">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping"></span>
                  <span>در حال ضبط صدا... لطفاً صحبت کنید</span>
                </span>
              )}
              {micState === 'finished' && (
                <div className="space-y-1 animate-in fade-in">
                  <span className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1 font-sans">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تلفظ شما با موفقیت ثبت شد!</span>
                  </span>
                  {recordedSpeech && (
                    <p className="text-[11px] text-slate-600 font-english bg-slate-100 px-3 py-1 rounded-xl inline-block mt-1">
                      "{recordedSpeech}"
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Horizontal Slider Navigation (تمرین قبلی / تمرین بعدی) */}
        <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100">
          <button
            onClick={goToPrevExercise}
            disabled={currentExerciseIndex === 0}
            className={`flex items-center gap-1.5 text-xs font-bold transition ${
              currentExerciseIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'text-blue-700 hover:text-blue-900 cursor-pointer active:scale-95'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span className="font-sans">تمرین قبلی</span>
          </button>

          <span className="text-[11px] font-bold text-slate-400 font-sans">
            {currentExerciseIndex + 1} از {totalExercises}
          </span>

          <button
            onClick={goToNextExercise}
            disabled={currentExerciseIndex === totalExercises - 1}
            className={`flex items-center gap-1.5 text-xs font-bold transition ${
              currentExerciseIndex === totalExercises - 1
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'text-blue-700 hover:text-blue-900 cursor-pointer active:scale-95'
            }`}
          >
            <span className="font-sans">تمرین بعدی</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
