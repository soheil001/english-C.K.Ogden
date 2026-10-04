/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { PenLine } from 'lucide-react';
import { ClassHeader } from './components/ClassHeader';
import { ClassesDrawer } from './components/ClassesDrawer';
import { TodayGoalCard } from './components/TodayGoalCard';
import { WordCardSlider } from './components/WordCardSlider';
import { ExerciseCardSlider } from './components/ExerciseCardSlider';
import { WordJumpModal } from './components/WordJumpModal';
import { SubscriptionModal } from './components/SubscriptionModal';
import { DownloadHtmlModal } from './components/DownloadHtmlModal';
import { CLASS_1_WORDS, CLASSES_LIST, CourseClass } from './data/class1Words';
import { isLoggedIn, verifySession } from './utils/auth';

export default function App() {
  const [currentClass, setCurrentClass] = useState<CourseClass>(CLASSES_LIST[0]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isClassesDrawerOpen, setIsClassesDrawerOpen] = useState<boolean>(false);
  const [isWordJumpOpen, setIsWordJumpOpen] = useState<boolean>(false);
  const [isDownloadHtmlOpen, setIsDownloadHtmlOpen] = useState<boolean>(false);
  const [showPracticePrompt, setShowPracticePrompt] = useState<boolean>(false);

  // Subscription & Auth state
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => isLoggedIn());
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [subscriptionModalMessage, setSubscriptionModalMessage] = useState<string>('');

  const scrollTimerRef = useRef<any>(null);
  const mainContainerRef = useRef<HTMLElement | null>(null);

  // Bookmarked words state
  const [bookmarkedWordIds, setBookmarkedWordIds] = useState<number[]>([]);
  // Completed words state
  const [completedWordIds, setCompletedWordIds] = useState<number[]>([1, 2, 3, 4, 5, 6, 7]);
  // Dynamic daily goal
  const [todayGoal, setTodayGoal] = useState<number>(10);

  // Active word (100 words array in Class 1)
  const totalWords = CLASS_1_WORDS.length;
  const currentWord = CLASS_1_WORDS[currentWordIndex] || CLASS_1_WORDS[0];

  // Verify session on mount and load saved progress
  useEffect(() => {
    // Check Supabase session validity
    if (isLoggedIn()) {
      verifySession().then((valid) => {
        setIsSubscribed(valid);
      });
    }

    try {
      const savedIndex = localStorage.getItem('ogden_class1_word_index');
      if (savedIndex !== null) {
        const parsed = parseInt(savedIndex, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < totalWords) {
          // If saved index > 9 but not logged in, revert to word 10 max
          if (parsed >= 10 && !isLoggedIn()) {
            setCurrentWordIndex(9);
          } else {
            setCurrentWordIndex(parsed);
          }
        }
      }

      const savedBookmarks = localStorage.getItem('ogden_bookmarks');
      if (savedBookmarks) {
        setBookmarkedWordIds(JSON.parse(savedBookmarks));
      }

      const savedCompleted = localStorage.getItem('ogden_completed_words_class1');
      if (savedCompleted) {
        setCompletedWordIds(JSON.parse(savedCompleted));
      }
    } catch {
      // ignore
    }
  }, [totalWords]);

  const handleSelectWordIndex = (index: number) => {
    if (index >= 0 && index < totalWords) {
      // Check free tier: up to 10 words (index 0 to 9) are free
      if (index >= 10 && !isSubscribed && !isLoggedIn()) {
        setSubscriptionModalMessage(
          'تمرین‌های رایگان ۱۰ لغت اول به پایان رسید. برای باز شدن دسترسی به لغت‌های ۱۱ تا ۱۰۰، لطفاً کد اشتراک ۵ رقمی خود را وارد کنید.'
        );
        setIsSubscriptionModalOpen(true);
        return;
      }

      setCurrentWordIndex(index);
      try {
        localStorage.setItem('ogden_class1_word_index', index.toString());
      } catch {}

      // Automatically register studied word
      const targetId = CLASS_1_WORDS[index].id;
      setCompletedWordIds((prev) => {
        if (!prev.includes(targetId)) {
          const updated = [...prev, targetId];
          try {
            localStorage.setItem('ogden_completed_words_class1', JSON.stringify(updated));
          } catch {}
          return updated;
        }
        return prev;
      });
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  const handleNextWord = () => {
    // If on 10th word (index 9) and not subscribed, prompt for subscription
    if (currentWordIndex === 9 && !isSubscribed && !isLoggedIn()) {
      setSubscriptionModalMessage(
        '۱۰ لغت اول رایگان را با موفقیت تمام کردید! برای ادامه یادگیری و دسترسی به لغت‌های ۱۱ تا ۱۰۰، لطفاً کد اشتراک ۵ رقمی خود را وارد کنید.'
      );
      setIsSubscriptionModalOpen(true);
      return;
    }

    if (currentWordIndex < totalWords - 1) {
      handleSelectWordIndex(currentWordIndex + 1);

      // User requirement:
      // کلا ۱۶۰ پیکسل بیاد پایین، ولی اگه انتهای صفحه بود دیگه ۱۶۰ پیکسل نیاد پایینتر
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      scrollTimerRef.current = setTimeout(() => {
        if (typeof window !== 'undefined') {
          const windowHeight = window.innerHeight;
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const totalHeight = document.documentElement.scrollHeight;
          const isAtBottom = (windowHeight + scrollY) >= (totalHeight - 50);

          if (!isAtBottom) {
            window.scrollBy({ top: 160, behavior: 'smooth' });
          }
        }

        if (mainContainerRef.current) {
          const el = mainContainerRef.current;
          const isContainerAtBottom = (el.scrollTop + el.clientHeight) >= (el.scrollHeight - 50);
          if (!isContainerAtBottom) {
            el.scrollBy({ top: 160, behavior: 'smooth' });
          }
        }

        setShowPracticePrompt(true);
        setTimeout(() => {
          setShowPracticePrompt(false);
        }, 3500);
      }, 2000);
    }
  };

  const handlePrevWord = () => {
    if (currentWordIndex > 0) {
      handleSelectWordIndex(currentWordIndex - 1);
    }
  };

  const handleToggleBookmark = () => {
    const id = currentWord.id;
    setBookmarkedWordIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem('ogden_bookmarks', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isCurrentBookmarked = bookmarkedWordIds.includes(currentWord.id);
  const totalCompleted = completedWordIds.length;
  // Today's dynamic goal tracking
  const todayLearned = Math.min(todayGoal, Math.max(1, totalCompleted % todayGoal || (totalCompleted > 0 ? todayGoal : 1)));

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-slate-800 flex flex-col justify-start items-center overflow-x-hidden selection:bg-blue-200 font-sans"
    >
      {/* Strictly Mobile Viewport Container with vibrant Blue Gradient so white sections pop out */}
      <main
        ref={mainContainerRef}
        className="w-full max-w-[430px] min-h-screen flex flex-col justify-start overflow-x-hidden relative shadow-2xl sm:border-x sm:border-blue-700/40 bg-gradient-to-b from-[#1d4ed8] via-[#2563eb] to-[#1e40af] pb-10"
      >
        {/* Subtle Ambient Radial Lighting for richness */}
        <div className="absolute top-0 inset-x-0 h-64 bg-radial from-white/20 via-transparent to-transparent pointer-events-none -z-0"></div>

        {/* 1. Header (Includes cllo brand, user login/subscription icon, download zip icon, & smooth left sliding drawer menu) */}
        <ClassHeader
          currentClassTitle={currentClass.title}
          onToggleMenu={() => setIsClassesDrawerOpen(!isClassesDrawerOpen)}
          isMenuOpen={isClassesDrawerOpen}
          onOpenSubscription={() => {
            setSubscriptionModalMessage(
              'کد اشتراک ۵ رقمی خود را جهت فعال‌سازی حساب کاربری وارد کنید.'
            );
            setIsSubscriptionModalOpen(true);
          }}
          isSubscribed={isSubscribed}
          onOpenDownloadHtml={() => setIsDownloadHtmlOpen(true)}
        />

        {/* 2. Motivational Today's Learning & Completed Words Widget with completion question (آره/نه) */}
        <TodayGoalCard
          todayLearnedCount={todayLearned}
          todayGoalCount={todayGoal}
          totalCompletedCount={totalCompleted}
          totalWordsCount={totalWords}
          onContinuePractice={() => {
            // User chose "آره" to continue: expand goal and move forward
            setTodayGoal((prev) => prev + 10);
            if (currentWordIndex < totalWords - 1) {
              handleNextWord();
            }
          }}
          onPausePractice={() => {
            // User chose "نه": stays on current word in satisfaction
          }}
        />

        {/* 3. Main Word Card (Horizontal Slider with Text on Left, Picture on Right, Next on Right) */}
        <WordCardSlider
          currentWord={currentWord}
          currentIndex={currentWordIndex}
          totalWords={totalWords}
          isBookmarked={isCurrentBookmarked}
          onToggleBookmark={handleToggleBookmark}
          onGoNext={handleNextWord}
          onGoPrev={handlePrevWord}
        />

        {/* 4. Second Slider: Exercises with text-only tabs, no icon on sentence header, left-aligned text, & prominent typing box */}
        <ExerciseCardSlider currentWord={currentWord} />

        {/* Classes Menu Dropdown Drawer (Opens from LEFT side) */}
        <ClassesDrawer
          isOpen={isClassesDrawerOpen}
          onClose={() => setIsClassesDrawerOpen(false)}
          activeClassId={currentClass.id}
          onSelectClass={(c) => setCurrentClass(c)}
          onOpenDownloadHtml={() => setIsDownloadHtmlOpen(true)}
        />

        {/* 100 Words Quick Jump / Search Directory Modal */}
        <WordJumpModal
          isOpen={isWordJumpOpen}
          onClose={() => setIsWordJumpOpen(false)}
          activeWordId={currentWord.id}
          onSelectWord={handleSelectWordIndex}
        />

        {/* Download Standalone App HTML & ZIP Modal */}
        <DownloadHtmlModal
          isOpen={isDownloadHtmlOpen}
          onClose={() => setIsDownloadHtmlOpen(false)}
        />

        {/* Subscription & Account Modal (Supabase integrated) */}
        <SubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          onLoginSuccess={() => {
            setIsSubscribed(true);
            // If was waiting on word 10, proceed to word 11
            if (currentWordIndex === 9) {
              handleSelectWordIndex(10);
            }
          }}
          initialMessage={subscriptionModalMessage}
        />

        {/* Floating "تمرین انجام بده" toast prompt (triggered 2s after Next Word) */}
        {showPracticePrompt && (
          <div className="fixed bottom-6 inset-x-0 mx-auto w-fit z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-900/95 text-white backdrop-blur-md border border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-300 font-sans pointer-events-none">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <PenLine className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-xs sm:text-sm font-extrabold text-white">
              تمرین انجام بده ✍️
            </span>
          </div>
        )}
      </main>
    </div>
  );
}
