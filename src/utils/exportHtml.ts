import JSZip from 'jszip';
import { CLASS_1_WORDS } from '../data/class1Words';

export const AUTH_JS_CODE = `// auth.js — در همه صفحات import کن
const SUPABASE_URL = 'https://hjzzvzxhrqovvducnxha.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqenp2enhocnFvdnZkdWNueGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDY0MTksImV4cCI6MjA5NzUyMjQxOX0.XfFimXnkKHFBlYUE-E7daaBNjPJZV-D21UfCL_1SeoQ';
const SESSION_KEY = 'lingua_session_v1';

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
  catch (e) { return null; }
}

function isLoggedIn() {
  const s = getSession();
  return !!(s && s.phone && s.verified);
}

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = '/index.html';
    return false;
  }
  return true;
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = '/index.html';
}

// بررسی اشتراک فعال (بر اساس کد ۵ رقمی که در phone ذخیره شده)
async function verifySession() {
  const session = getSession();
  if (!session || !session.phone) return false;

  try {
    const res = await fetch(
      \`\${SUPABASE_URL}/rest/v1/subscriptions?phone=eq.\${encodeURIComponent(session.phone)}&is_active=eq.true&limit=1\`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY
        }
      }
    );
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      localStorage.removeItem(SESSION_KEY);
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

// بررسی و ورود مستقیم با کد ۵ رقمی
async function verifySubscriptionCode(code) {
  const cleanCode = (code || '').trim();
  if (!cleanCode) {
    return { success: false, message: 'لطفاً کد اشتراک ۵ رقمی را وارد کنید.' };
  }

  try {
    const res = await fetch(
      \`\${SUPABASE_URL}/rest/v1/subscriptions?phone=eq.\${encodeURIComponent(cleanCode)}&is_active=eq.true&limit=1\`,
      {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY
        }
      }
    );

    if (!res.ok) {
      return { success: false, message: 'خطا در ارتباط با سرور. لطفاً مجدداً امتحان کنید.' };
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return { success: false, message: 'کد اشتراک نامعتبر است یا اشتراک شما فعال نیست.' };
    }

    const sessionData = {
      phone: cleanCode,
      verified: true,
      loginAt: Date.now()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    return { success: true };
  } catch (e) {
    return { success: false, message: 'خطا در بررسی اشتراک. اتصال اینترنت خود را بررسی کنید.' };
  }
}
`;

export const README_MD_CODE = `# پلتفرم آموزش زبان انگلیسی با متد C. K. Ogden (نسخه مستقل cllo)

این بسته شامل کدهای کامل، مستقل و آماده اجرای برنامه است:

## 📁 محتویات فایل ZIP:
1. **\`index.html\`**: فایل اصلی و مستقل اپلیکیشن. بدون نیاز به نصب هیچ ابزاری، تنها با دو بار کلیک روی این فایل در هر مرورگری (کامپیوتر یا موبایل) اجرا می‌شود.
2. **\`auth.js\`**: اسکریپت احراز هویت و بررسی اشتراک سوپابیس (Supabase) بر اساس کد ۵ رقمی و شماره تلفن کاربر.
3. **\`README.md\`**: راهنمای فارسی نحوه استفاده و راه‌اندازی.

## 🌟 ویژگی‌های پیاده‌سازی شده در این نسخه:
- **۱۰۰ لغت بنیادین کلاس اول متد C. K. Ogden** همراه با فونتیک، ترجمه و مثال‌ها.
- **۴ بخش تمرین تعاملی برای هر لغت**:
  - جمله‌سازی با فیلد «اینجا بنویس...»
  - سؤال و جواب با فیلد «اینجا بنویس...»
  - داستان کوتاه با فیلد «اینجا بنویس...»
  - مکالمه دو نفره (Person A و Person B)
- **جهت‌گیری هوشمند نوشتاری**:
  - متن‌های فارسی خودکار از راست به چپ (RTL).
  - متن‌های انگلیسی خودکار از چپ به راست (LTR).
- **جلوگیری از زوم ناخواسته در مرورگرهای موبایل و سافاری**:
  - با تنظیم فونت ۱۶ پیکسل و متاتگ‌های استاندارد، صفحه کاملاً سفت و محکم سر جای خود می‌ماند.
- **اسکرول خودکار نرم ۱۶۰ پیکسل**:
  - ۲ ثانیه بعد از زدن دکمه «لغت بعدی»، صفحه ۱۶۰ پیکسل به سمت پایین اسکرول می‌کند تا بخش تمرین‌ها در دید قرار گیرد.
  - اگر مخاطب در انتهای صفحه باشد، دیگر اسکرول پایین انجام نمی‌شود.
- **نوار پیشرفت یادگیری امروز**:
  - پیشرفت به سمت راست پر می‌شود.
  - پس از تکمیل ۱۰ لغت اولیه، پیامی همراه با دو گزینه «آره» و «نه» نمایش داده می‌شود: «تمرین امروز شما تموم شد ۱۰ لغت میخوای ادامه بدی ؟»
- **قفل اشتراک و پاپ‌آپ شیشه‌ای**:
  - ۱۰ لغت اول کاملاً رایگان است.
  - پس از پایان ۱۰ لغت اول (یا تلاش برای رفتن به لغت ۱۱)، پاپ‌آپ شیشه‌ای نمایش داده شده و درخواست وارد کردن کد اشتراک ۵ رقمی را می‌دهد.
  - اگر کاربر از قبل لاگین کرده باشد، دسترسی به تمام ۱۰۰ لغت باز خواهد بود.
- **آیکون حساب کاربری در هدر**:
  - با کلیک روی آیکون کاربر در بالای صفحه، وضعیت اشتراک مشاهده شده و امکان ورود یا خروج فراهم است.
- **دکمه‌های کنار هم لغت بعدی و قبلی**:
  - دکمه‌ها کاملاً فشرده در یک سطر کنار هم قرار دارند و کلمات زیر هم نمی‌شکنند.
- **رفتن خودکار به تب بعدی پس از ثبت پاسخ**.

## 🚀 نحوه اجرای فایل:
فایل \`index.html\` را در مرورگر (Google Chrome, Safari, Firefox, Edge) باز کنید یا روی هر هاست دلخواه (cPanel, DirectAdmin, Vercel, Netlify, GitHub Pages) آپلود نمایید.
`;

export function generateStandaloneHtml(): string {
  const wordsJson = JSON.stringify(CLASS_1_WORDS);

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>cllo — آموزش زبان انگلیسی با متد C. K. Ogden</title>
  <meta name="description" content="یادگیری ۱۰۰ لغت بنیادین کلاس اول با روش C. K. Ogden">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700;800;900&family=Vazirmatn:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0f172a;
      min-height: 100vh;
      direction: rtl;
      text-align: right;
      touch-action: pan-y;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
    }
    .font-en {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    /* Prevent auto-zoom in Safari on mobile */
    input, textarea, select {
      font-size: 16px !important;
      direction: auto;
      text-align: start;
      touch-action: manipulation;
    }
    .glass-card {
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.15);
    }
    .word-slide-enter {
      animation: slideInRtl 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes slideInRtl {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
  </style>
</head>
<body class="flex justify-center items-start min-h-screen text-slate-800 bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#0f172a]" dir="rtl">
  
  <!-- Mobile Container (Max 430px) -->
  <main id="mainAppContainer" class="w-full max-w-[430px] min-h-screen bg-gradient-to-b from-[#1d4ed8] via-[#2563eb] to-[#1e40af] flex flex-col justify-start relative shadow-2xl sm:border-x sm:border-blue-700/40 pb-12 overflow-x-hidden">
    
    <!-- Top Header -->
    <header class="px-3.5 py-3 flex items-center justify-between glass-card rounded-2xl mx-3 mt-3 border border-white/90 shadow-md relative z-40">
      <div class="flex items-center gap-2.5 text-right">
        <div class="flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 text-white rounded-xl px-2.5 py-1 shadow-md shadow-blue-700/25 shrink-0">
          <span class="font-en font-black text-sm tracking-tight text-white leading-none">cllo</span>
          <span class="text-[8px] font-en text-blue-200 uppercase tracking-widest mt-0.5">ir</span>
        </div>
        <div>
          <div class="flex items-center gap-1.5">
            <h1 class="text-sm sm:text-base font-extrabold text-slate-900">کلاس اول: مقدماتی</h1>
            <span class="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">۱۰۰ لغت</span>
          </div>
          <p class="text-[10px] sm:text-[11px] text-slate-500 font-medium mt-0.5">
            روش C. K. Ogden در <span class="font-en font-bold text-blue-700">cllo</span>
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <!-- Account / Subscription Button -->
        <button id="authBtn" onclick="openSubscriptionModal()" class="w-10 h-10 rounded-xl bg-white/90 hover:bg-white text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center transition active:scale-95 cursor-pointer relative" title="ورود و وضعیت اشتراک">
          <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span id="authBadge" class="hidden absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
        </button>

        <!-- Words List Directory -->
        <button onclick="toggleWordDirectory()" class="w-10 h-10 rounded-xl bg-white/90 hover:bg-white text-slate-700 border border-slate-200 shadow-xs flex items-center justify-center transition active:scale-95 cursor-pointer" title="فهرست ۱۰۰ لغت">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>
    </header>

    <!-- Today Goal Card -->
    <div class="px-3 my-2" dir="rtl">
      <div class="bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-white shadow-md text-right">
        <div class="flex items-center justify-between gap-3">
          <!-- Right side: یادگیری امروز (Progress fills to the right) -->
          <div class="flex-1 border-l border-slate-200/80 pl-3">
            <div class="flex items-center justify-between text-[11px] mb-1.5">
              <span class="font-extrabold text-slate-900 flex items-center gap-1">
                <span>🔥</span>
                <span>یادگیری امروز</span>
              </span>
              <span id="todayProgressText" class="font-en font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                1 از 10
              </span>
            </div>
            <!-- Active line fills towards the right -->
            <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/70 p-0.5 shadow-inner" dir="ltr">
              <div id="todayProgressBar" class="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500 ease-out" style="width: 10%;"></div>
            </div>
          </div>

          <!-- Left side: Total learned -->
          <div class="shrink-0 flex items-center gap-2 pr-1">
            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-xs text-sm">
              ✓
            </div>
            <div>
              <span class="text-[10px] text-slate-500 font-medium block">لغات یادگرفته‌شده</span>
              <span class="text-xs font-en font-extrabold text-slate-900">
                <span id="totalLearnedCount">1</span> <span class="text-[10px] font-normal text-slate-400">/ 100</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Completion prompt for 10 words -->
        <div id="todayCompletionPrompt" class="hidden mt-2.5 pt-2.5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 bg-gradient-to-r from-blue-50/90 to-indigo-50/90 p-2.5 rounded-xl border border-blue-100 animate-in fade-in">
          <div class="flex items-center gap-2 text-right">
            <span>🎉</span>
            <p class="text-xs font-bold text-slate-900 leading-snug">
              تمرین امروز شما تموم شد ۱۰ لغت میخوای ادامه بدی ؟
            </p>
          </div>
          <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button onclick="handleContinueToday('yes')" class="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-extrabold shadow-sm active:scale-95 transition cursor-pointer">
              آره
            </button>
            <button onclick="handleContinueToday('no')" class="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold active:scale-95 transition cursor-pointer">
              نه
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Word Card Slider -->
    <div class="px-3 mt-1.5 mb-1" dir="ltr">
      <div id="wordCardElement" style="touch-action: pan-y;" class="bg-white/95 backdrop-blur-md rounded-[32px] p-5 border border-white shadow-xl text-left relative overflow-hidden transition-all duration-300">
        <div id="wordCardWrapper" class="word-slide-enter">
          <div class="flex items-start justify-between gap-3">
            <!-- Text on Left -->
            <div class="flex-1 text-left">
              <span id="wordCategoryBadge" class="inline-block px-3 py-1 text-[11px] font-bold text-blue-700 bg-blue-50 rounded-full mb-1 border border-blue-100">
                فعل حرکتی
              </span>
              <div class="flex items-center gap-2">
                <h2 id="wordTitle" class="text-3xl sm:text-4xl font-black text-slate-900 font-en tracking-tight capitalize">
                  come
                </h2>
                <button onclick="speakCurrentWord()" class="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 flex items-center justify-center transition active:scale-95 cursor-pointer shadow-xs" title="پخش صوتی">
                  🔊
                </button>
              </div>
              <div id="wordPhonetic" class="text-sm font-bold text-slate-400 font-en mt-0.5">
                /kʌm/
              </div>
              <div id="wordMeaning" class="text-xl sm:text-2xl font-black text-slate-900 mt-2 text-right" dir="rtl">
                آمدن
              </div>
            </div>

            <!-- Picture / Emoji on Right -->
            <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100/70 border border-blue-100 flex items-center justify-center shadow-inner text-4xl shrink-0">
              <span id="wordEmoji">🚶</span>
            </div>
          </div>
        </div>

        <!-- Buttons side-by-side on one row (کلمات کنار هم نه زیر هم) -->
        <div class="flex items-center justify-between gap-2.5 mt-5 pt-3 border-t border-slate-100" dir="rtl">
          <!-- Previous Word Button -->
          <button id="prevWordBtn" onclick="handlePrevWord()" class="flex-1 py-2.5 px-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap bg-white hover:bg-slate-50 text-slate-700 border border-slate-200">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
            <span class="whitespace-nowrap">لغت قبلی</span>
          </button>

          <!-- Index Indicator -->
          <div class="shrink-0 px-2 py-1 bg-slate-100 rounded-lg text-[11px] font-en font-bold text-slate-500">
            <span id="currentWordIdxText">1</span> / 100
          </div>

          <!-- Next Word Button -->
          <button id="nextWordBtn" onclick="handleNextWord()" class="flex-1 py-2.5 px-3 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white">
            <span class="whitespace-nowrap">لغت بعدی</span>
            <svg class="w-4 h-4 shrink-0 rotate-180" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Exercise Card Slider Section -->
    <div id="practice-section" class="px-3 mt-0.5 mb-6" dir="rtl">
      <!-- Exercise Tabs Bar -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none mb-1.5">
        <button onclick="selectExerciseTab(0)" id="tab-0" class="flex-1 py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap text-center bg-white text-blue-700 shadow-md border-b-2 border-blue-600">
          جمله‌سازی
        </button>
        <button onclick="selectExerciseTab(1)" id="tab-1" class="flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-center bg-white/70 text-slate-600 hover:bg-white">
          سؤال و جواب
        </button>
        <button onclick="selectExerciseTab(2)" id="tab-2" class="flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-center bg-white/70 text-slate-600 hover:bg-white">
          داستان
        </button>
        <button onclick="selectExerciseTab(3)" id="tab-3" class="flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-center bg-white/70 text-slate-600 hover:bg-white">
          مکالمه
        </button>
      </div>

      <!-- Exercise Content Box -->
      <div class="bg-white/95 backdrop-blur-xl rounded-[32px] p-5 sm:p-6 border border-white shadow-2xl shadow-blue-950/20 text-right relative overflow-hidden">
        
        <!-- Tab 0: جمله‌سازی -->
        <div id="exercisePane-0">
          <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <span class="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-xl border border-blue-100">
              جمله‌سازی
            </span>
            <button onclick="toggleModelAnswer('sentence')" class="text-[11px] text-blue-700 hover:text-blue-800 font-bold bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
              نمونه جمله C. K. Ogden
            </button>
          </div>

          <div class="text-right mb-2.5">
            <h4 class="text-sm sm:text-base font-extrabold text-slate-900">
              با لغت بالا جمله بساز
            </h4>
          </div>

          <!-- Typing Box (placeholder: اینجا بنویس...) -->
          <div class="relative my-3">
            <div class="bg-slate-50/90 rounded-2xl p-3.5 border-2 border-blue-200 focus-within:border-blue-600 focus-within:bg-white transition-all shadow-inner">
              <div class="flex items-center justify-between text-[11px] font-bold text-blue-700 mb-2">
                <span>اینجا بنویس:</span>
                <span class="text-[10px] text-slate-400 font-normal">خودکار (فارسی / English)</span>
              </div>
              <textarea id="input-sentence" dir="auto" placeholder="اینجا بنویس…" rows="3" class="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium resize-none leading-relaxed text-start"></textarea>
            </div>
          </div>

          <div class="flex items-center justify-between mt-3">
            <button onclick="handleSubmitAnswer('sentence', 0)" class="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition cursor-pointer">
              ثبت پاسخ
            </button>
            <span id="feedback-sentence" class="hidden text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              ✓ پاسخ شما با موفقیت ثبت شد!
            </span>
          </div>

          <div id="model-sentence" class="hidden mt-3 p-3.5 bg-blue-50/80 rounded-2xl border border-blue-200 text-left">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[11px] font-bold text-blue-800" dir="rtl">جمله نمونه:</span>
              <button onclick="speakSentenceModel()" class="text-xs bg-white text-blue-700 px-2 py-1 rounded-lg shadow-xs">🔊 پخش</button>
            </div>
            <p id="modelSentenceEn" class="text-sm font-bold text-slate-900 font-en">Please come here and help me.</p>
            <p id="modelSentenceFa" class="text-xs text-slate-600 mt-1" dir="rtl">لطفاً بیا اینجا و کمکم کن.</p>
          </div>
        </div>

        <!-- Tab 1: سؤال و جواب -->
        <div id="exercisePane-1" class="hidden">
          <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <span class="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-xl border border-indigo-100">
              سؤال و جواب
            </span>
            <button onclick="toggleModelAnswer('qa')" class="text-[11px] text-indigo-700 hover:text-indigo-800 font-bold bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
              نمونه سؤال و جواب
            </button>
          </div>

          <div class="text-right mb-2.5">
            <h4 class="text-sm font-extrabold text-slate-900">
              سوال بساز با این لغت
            </h4>
          </div>

          <div class="space-y-3">
            <div class="bg-slate-50/90 rounded-2xl p-3 border-2 border-slate-200 focus-within:border-indigo-600 focus-within:bg-white transition-all shadow-inner">
              <label class="text-[11px] font-bold text-slate-600 block mb-1">سؤال من:</label>
              <input id="input-q" type="text" dir="auto" placeholder="اینجا بنویس..." class="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium text-start">
            </div>
            <div class="bg-slate-50/90 rounded-2xl p-3 border-2 border-slate-200 focus-within:border-emerald-600 focus-within:bg-white transition-all shadow-inner">
              <label class="text-[11px] font-bold text-slate-600 block mb-1">جواب من:</label>
              <input id="input-a" type="text" dir="auto" placeholder="اینجا بنویس..." class="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium text-start">
            </div>
          </div>

          <div class="flex items-center justify-between mt-3">
            <button onclick="handleSubmitAnswer('qa', 1)" class="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition cursor-pointer">
              ثبت سؤال و جواب
            </button>
            <span id="feedback-qa" class="hidden text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              ✓ ثبت شد!
            </span>
          </div>

          <div id="model-qa" class="hidden mt-3 p-3.5 bg-indigo-50/80 rounded-2xl border border-indigo-200 text-left">
            <p id="modelQEn" class="text-xs font-bold text-slate-900 font-en">Q: When will you come?</p>
            <p id="modelQFa" class="text-[11px] text-slate-500" dir="rtl">کی خواهی آمد؟</p>
            <p id="modelAEn" class="text-xs font-bold text-emerald-800 font-en mt-1">A: I will come at five.</p>
            <p id="modelAFa" class="text-[11px] text-slate-500" dir="rtl">من ساعت پنج می‌آیم.</p>
          </div>
        </div>

        <!-- Tab 2: داستان -->
        <div id="exercisePane-2" class="hidden">
          <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <span class="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-xl border border-purple-100">
              داستان کوتاه
            </span>
            <button onclick="toggleModelAnswer('story')" class="text-[11px] text-purple-700 hover:text-purple-800 font-bold bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
              نمونه داستان
            </button>
          </div>

          <div class="text-right mb-2.5">
            <h4 class="text-sm font-extrabold text-slate-900">
              با لغت بالا داستان کوتاه بساز
            </h4>
          </div>

          <div class="bg-slate-50/90 rounded-2xl p-3 border-2 border-slate-200 focus-within:border-purple-600 focus-within:bg-white transition-all shadow-inner my-2">
            <textarea id="input-story" dir="auto" placeholder="اینجا بنویس..." rows="4" class="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium resize-none leading-relaxed text-start"></textarea>
          </div>

          <div class="flex items-center justify-between mt-3">
            <button onclick="handleSubmitAnswer('story', 2)" class="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition cursor-pointer">
              ثبت داستان کوتاه
            </button>
            <span id="feedback-story" class="hidden text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              ✓ داستان شما ثبت شد!
            </span>
          </div>

          <div id="model-story" class="hidden mt-3 p-3.5 bg-purple-50/80 rounded-2xl border border-purple-200 text-left">
            <p id="modelStoryEn" class="text-xs font-bold text-slate-900 font-en leading-relaxed"></p>
            <p id="modelStoryFa" class="text-[11px] text-slate-600 mt-1" dir="rtl"></p>
          </div>
        </div>

        <!-- Tab 3: مکالمه -->
        <div id="exercisePane-3" class="hidden">
          <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <span class="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-xl border border-teal-100">
              مکالمه
            </span>
            <button onclick="toggleModelAnswer('dialogue')" class="text-[11px] text-teal-700 hover:text-teal-800 font-bold bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
              نمونه مکالمه
            </button>
          </div>

          <div class="text-right mb-2.5">
            <h4 class="text-sm font-extrabold text-slate-900">
              با لغت بالا مکالمه بساز
            </h4>
          </div>

          <div class="space-y-3">
            <div class="bg-slate-50/90 rounded-2xl p-3 border-2 border-slate-200 focus-within:border-teal-600 focus-within:bg-white transition-all shadow-inner">
              <label class="text-[11px] font-bold text-slate-600 block mb-1">شخص اول (Person A):</label>
              <input id="input-diaA" type="text" dir="auto" placeholder="اینجا بنویس..." class="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium text-start">
            </div>
            <div class="bg-slate-50/90 rounded-2xl p-3 border-2 border-slate-200 focus-within:border-teal-600 focus-within:bg-white transition-all shadow-inner">
              <label class="text-[11px] font-bold text-slate-600 block mb-1">شخص دوم (Person B):</label>
              <input id="input-diaB" type="text" dir="auto" placeholder="اینجا بنویس..." class="w-full bg-transparent outline-none text-[16px] text-slate-900 placeholder:text-xs placeholder:text-slate-400 font-medium text-start">
            </div>
          </div>

          <div class="flex items-center justify-between mt-3">
            <button onclick="handleSubmitAnswer('dialogue', 3)" class="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition cursor-pointer">
              ثبت مکالمه
            </button>
            <span id="feedback-dialogue" class="hidden text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
              ✓ مکالمه شما ثبت شد!
            </span>
          </div>

          <div id="model-dialogue" class="hidden mt-3 p-3.5 bg-teal-50/80 rounded-2xl border border-teal-200 text-left">
            <p id="modelDiaA" class="text-xs font-bold text-slate-900 font-en"></p>
            <p id="modelDiaAFa" class="text-[11px] text-slate-500" dir="rtl"></p>
            <p id="modelDiaB" class="text-xs font-bold text-teal-800 font-en mt-1"></p>
            <p id="modelDiaBFa" class="text-[11px] text-slate-500" dir="rtl"></p>
          </div>
        </div>

      </div>
    </div>

    <!-- Floating Toast Prompt ("تمرین انجام بده ✍️") -->
    <div id="practiceToast" class="hidden fixed bottom-6 inset-x-0 mx-auto w-fit z-50 flex items-center gap-2.5 px-5 py-3 rounded-full bg-slate-900/95 text-white backdrop-blur-md border border-white/20 shadow-2xl pointer-events-none">
      <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
      <span class="text-xs sm:text-sm font-extrabold text-white">تمرین انجام بده ✍️</span>
    </div>

    <!-- Glassmorphic Subscription Modal -->
    <div id="subscriptionModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
      <div class="absolute inset-0" onclick="closeSubscriptionModal()"></div>
      <div class="relative z-10 w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl p-6 border border-white shadow-2xl shadow-blue-950/30 text-right" dir="rtl">
        <button onclick="closeSubscriptionModal()" class="absolute top-4 left-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer">
          ✕
        </button>

        <div id="subModalNotLoggedIn">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-700/30 mb-3 text-2xl">
            🔑
          </div>
          <div class="text-center mb-4">
            <h3 class="text-base sm:text-lg font-black text-slate-900">کد اشتراک خودتون رو وارد کنید</h3>
            <div class="flex items-center justify-center gap-1 mt-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 w-fit mx-auto">
              <span>تا ۱۰ لغت اول رایگان است</span>
            </div>
            <p id="subModalPromptText" class="text-xs text-slate-500 mt-2.5 leading-relaxed px-1">
              ۱۰ لغت اول رایگان را تمام کردید! برای باز شدن دسترسی به ادامه ۱۰۰ لغت، لطفاً کد اشتراک ۵ رقمی خود را وارد کنید.
            </p>
          </div>

          <form onsubmit="handleCodeSubmit(event)" class="space-y-3.5">
            <div>
              <label class="block text-[11px] font-bold text-slate-600 mb-1.5">کد اشتراک ۵ رقمی:</label>
              <input id="subCodeInput" type="text" inputmode="numeric" dir="ltr" placeholder="مثلاً: 12345" maxlength="15" class="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white rounded-2xl p-3 text-center text-lg font-en font-black tracking-widest outline-none text-slate-900 transition-all shadow-inner">
            </div>
            <div id="subErrorMsg" class="hidden p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold"></div>
            <div id="subSuccessMsg" class="hidden p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold"></div>
            <button id="subSubmitBtn" type="submit" class="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-blue-700/30 transition cursor-pointer">
              فعال‌سازی و ادامه یادگیری
            </button>
          </form>
        </div>

        <div id="subModalLoggedIn" class="hidden text-center py-2 space-y-4">
          <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 text-2xl">
            🛡️
          </div>
          <div>
            <h3 class="text-base font-black text-slate-900">حساب کاربری فعال</h3>
            <p class="text-xs text-slate-500 mt-1">اشتراک شما با کد زیر فعال است:</p>
            <div id="userPhoneDisplay" class="mt-2 inline-block bg-slate-100 px-4 py-1.5 rounded-xl font-en font-extrabold text-blue-700 tracking-wider"></div>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button onclick="closeSubscriptionModal()" class="flex-1 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold transition shadow-md cursor-pointer">
              ادامه یادگیری
            </button>
            <button onclick="handleLogout()" class="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold transition cursor-pointer">
              خروج
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 100 Words Jump / Directory Modal -->
    <div id="wordDirectoryModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
      <div class="absolute inset-0" onclick="toggleWordDirectory()"></div>
      <div class="relative z-10 w-full max-w-sm max-h-[85vh] bg-white rounded-3xl p-5 shadow-2xl flex flex-col text-right" dir="rtl">
        <div class="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h3 class="font-extrabold text-slate-900 text-sm">فهرست ۱۰۰ لغت کلاس اول (Ogden)</h3>
            <p class="text-[10px] text-slate-400">روی هر کلمه بزنید تا تمرین‌های آن باز شود</p>
          </div>
          <button onclick="toggleWordDirectory()" class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 text-sm">✕</button>
        </div>
        <div id="directoryWordsList" class="overflow-y-auto divide-y divide-slate-100 py-2 flex-1"></div>
      </div>
    </div>

  </main>

  <script>
    // Supabase Auth Configuration
    const SUPABASE_URL = 'https://hjzzvzxhrqovvducnxha.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqenp2enhocnFvdnZkdWNueGhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDY0MTksImV4cCI6MjA5NzUyMjQxOX0.XfFimXnkKHFBlYUE-E7daaBNjPJZV-D21UfCL_1SeoQ';
    const SESSION_KEY = 'lingua_session_v1';

    const words = ${wordsJson};
    let currentIndex = 0;
    let currentTab = 0;
    let todayLearnedCount = 1;
    let todayGoal = 10;
    let completedWords = new Set();
    let scrollTimer = null;

    function getSession() {
      try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
      catch (e) { return null; }
    }

    function isLoggedIn() {
      const s = getSession();
      return !!(s && s.phone && s.verified);
    }

    function renderAuthBadge() {
      const badge = document.getElementById('authBadge');
      if (isLoggedIn()) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }

    function openSubscriptionModal(customPrompt) {
      const modal = document.getElementById('subscriptionModal');
      const notLoggedInView = document.getElementById('subModalNotLoggedIn');
      const loggedInView = document.getElementById('subModalLoggedIn');
      const err = document.getElementById('subErrorMsg');
      const succ = document.getElementById('subSuccessMsg');
      err.classList.add('hidden');
      succ.classList.add('hidden');

      if (customPrompt) {
        document.getElementById('subModalPromptText').innerText = customPrompt;
      }

      if (isLoggedIn()) {
        notLoggedInView.classList.add('hidden');
        loggedInView.classList.remove('hidden');
        document.getElementById('userPhoneDisplay').innerText = getSession().phone;
      } else {
        notLoggedInView.classList.remove('hidden');
        loggedInView.classList.add('hidden');
        document.getElementById('subCodeInput').value = '';
      }
      modal.classList.remove('hidden');
    }

    function closeSubscriptionModal() {
      document.getElementById('subscriptionModal').classList.add('hidden');
    }

    async function handleCodeSubmit(e) {
      e.preventDefault();
      const codeInput = document.getElementById('subCodeInput');
      const code = (codeInput.value || '').trim();
      const err = document.getElementById('subErrorMsg');
      const succ = document.getElementById('subSuccessMsg');
      const btn = document.getElementById('subSubmitBtn');

      err.classList.add('hidden');
      succ.classList.add('hidden');

      if (!code) {
        err.innerText = 'لطفاً کد اشتراک ۵ رقمی را وارد کنید.';
        err.classList.remove('hidden');
        return;
      }

      btn.disabled = true;
      btn.innerText = 'در حال بررسی...';

      try {
        const res = await fetch(
          \`\${SUPABASE_URL}/rest/v1/subscriptions?phone=eq.\${encodeURIComponent(code)}&is_active=eq.true&limit=1\`,
          {
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': 'Bearer ' + SUPABASE_KEY
            }
          }
        );
        btn.disabled = false;
        btn.innerText = 'فعال‌سازی و ادامه یادگیری';

        if (!res.ok) {
          err.innerText = 'خطا در ارتباط با سرور.';
          err.classList.remove('hidden');
          return;
        }

        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          err.innerText = 'کد اشتراک نامعتبر است یا اشتراک شما فعال نیست.';
          err.classList.remove('hidden');
          return;
        }

        localStorage.setItem(SESSION_KEY, JSON.stringify({ phone: code, verified: true, loginAt: Date.now() }));
        succ.innerText = 'اشتراک شما با موفقیت تأیید شد!';
        succ.classList.remove('hidden');
        renderAuthBadge();

        setTimeout(() => {
          closeSubscriptionModal();
          if (currentIndex === 9) {
            goToWord(10);
          }
        }, 1000);

      } catch (ex) {
        btn.disabled = false;
        btn.innerText = 'فعال‌سازی و ادامه یادگیری';
        err.innerText = 'خطا در بررسی اتصال اینترنت.';
        err.classList.remove('hidden');
      }
    }

    function handleLogout() {
      localStorage.removeItem(SESSION_KEY);
      renderAuthBadge();
      closeSubscriptionModal();
      if (currentIndex >= 10) {
        goToWord(0);
      }
    }

    function renderCurrentWord() {
      const w = words[currentIndex];
      document.getElementById('currentWordIdxText').innerText = w.id;
      document.getElementById('wordCategoryBadge').innerText = w.category;
      document.getElementById('wordTitle').innerText = w.word;
      document.getElementById('wordPhonetic').innerText = w.phonetic;
      document.getElementById('wordMeaning').innerText = w.meaning;
      document.getElementById('wordEmoji').innerText = w.emoji || '📖';

      // Update Exercise Models
      if (w.exercise) {
        document.getElementById('modelSentenceEn').innerText = w.exercise.sentence ? w.exercise.sentence.en : '';
        document.getElementById('modelSentenceFa').innerText = w.exercise.sentence ? w.exercise.sentence.fa : '';
        document.getElementById('modelQEn').innerText = w.exercise.qa ? 'Q: ' + w.exercise.qa.qEn : '';
        document.getElementById('modelQFa').innerText = w.exercise.qa ? w.exercise.qa.qFa : '';
        document.getElementById('modelAEn').innerText = w.exercise.qa ? 'A: ' + w.exercise.qa.aEn : '';
        document.getElementById('modelAFa').innerText = w.exercise.qa ? w.exercise.qa.aFa : '';
        document.getElementById('modelStoryEn').innerText = w.exercise.story ? w.exercise.story.en : '';
        document.getElementById('modelStoryFa').innerText = w.exercise.story ? w.exercise.story.fa : '';
        document.getElementById('modelDiaA').innerText = w.exercise.dialogue ? 'A: ' + w.exercise.dialogue.personA : '';
        document.getElementById('modelDiaAFa').innerText = w.exercise.dialogue ? w.exercise.dialogue.personAFa : '';
        document.getElementById('modelDiaB').innerText = w.exercise.dialogue ? 'B: ' + w.exercise.dialogue.personB : '';
        document.getElementById('modelDiaBFa').innerText = w.exercise.dialogue ? w.exercise.dialogue.personBFa : '';
      }

      // Track completed
      completedWords.add(w.id);
      document.getElementById('totalLearnedCount').innerText = completedWords.size;

      // Update today goal
      todayLearnedCount = Math.min(todayGoal, Math.max(1, (completedWords.size % todayGoal) || (completedWords.size > 0 ? todayGoal : 1)));
      document.getElementById('todayProgressText').innerText = todayLearnedCount + ' از ' + todayGoal;
      const progressPercent = Math.min(100, Math.round((todayLearnedCount / todayGoal) * 100));
      document.getElementById('todayProgressBar').style.width = progressPercent + '%';

      if (todayLearnedCount >= 10 && todayGoal <= 10) {
        document.getElementById('todayCompletionPrompt').classList.remove('hidden');
      } else {
        document.getElementById('todayCompletionPrompt').classList.add('hidden');
      }

      // Hide all exercise feedback
      ['sentence', 'qa', 'story', 'dialogue'].forEach(k => {
        const el = document.getElementById('feedback-' + k);
        if (el) el.classList.add('hidden');
      });

      // Animate card
      const wrapper = document.getElementById('wordCardWrapper');
      wrapper.classList.remove('word-slide-enter');
      void wrapper.offsetWidth;
      wrapper.classList.add('word-slide-enter');
    }

    function handleContinueToday(choice) {
      if (choice === 'yes') {
        todayGoal += 10;
        document.getElementById('todayCompletionPrompt').classList.add('hidden');
        handleNextWord();
      } else {
        document.getElementById('todayCompletionPrompt').classList.add('hidden');
      }
    }

    function handleNextWord() {
      // Free tier check: words 0..9 (first 10) are free
      if (currentIndex === 9 && !isLoggedIn()) {
        openSubscriptionModal('۱۰ لغت اول رایگان را با موفقیت تمام کردید! برای باز شدن دسترسی به لغت‌های ۱۱ تا ۱۰۰، لطفاً کد اشتراک ۵ رقمی خود را وارد کنید.');
        return;
      }

      if (currentIndex < words.length - 1) {
        goToWord(currentIndex + 1);

        // Auto-scroll 160px after 2 seconds
        if (scrollTimer) clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          const windowHeight = window.innerHeight;
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const totalHeight = document.documentElement.scrollHeight;
          const isAtBottom = (windowHeight + scrollY) >= (totalHeight - 50);

          if (!isAtBottom) {
            window.scrollBy({ top: 160, behavior: 'smooth' });
          }

          // Show floating prompt
          const toast = document.getElementById('practiceToast');
          toast.classList.remove('hidden');
          setTimeout(() => { toast.classList.add('hidden'); }, 3500);
        }, 2000);
      }
    }

    function handlePrevWord() {
      if (currentIndex > 0) {
        goToWord(currentIndex - 1);
      }
    }

    function goToWord(idx) {
      if (idx >= 10 && !isLoggedIn()) {
        openSubscriptionModal('تمرین‌های رایگان ۱۰ لغت اول به پایان رسید. برای باز شدن دسترسی به ادامه، لطفاً کد اشتراک ۵ رقمی خود را وارد کنید.');
        return;
      }
      currentIndex = idx;
      renderCurrentWord();
      selectExerciseTab(0);
      closeWordDirectory();
    }

    function selectExerciseTab(tabIdx) {
      currentTab = tabIdx;
      for (let i = 0; i < 4; i++) {
        const pane = document.getElementById('exercisePane-' + i);
        const tabBtn = document.getElementById('tab-' + i);
        if (pane && tabBtn) {
          if (i === tabIdx) {
            pane.classList.remove('hidden');
            tabBtn.className = 'flex-1 py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap text-center bg-white text-blue-700 shadow-md border-b-2 border-blue-600';
          } else {
            pane.classList.add('hidden');
            tabBtn.className = 'flex-1 py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap text-center bg-white/70 text-slate-600 hover:bg-white';
          }
        }
      }
    }

    function handleSubmitAnswer(type, currentTabIndex) {
      const fb = document.getElementById('feedback-' + type);
      if (fb) fb.classList.remove('hidden');

      // Auto progression to next tab after submit
      setTimeout(() => {
        if (currentTabIndex < 3) {
          selectExerciseTab(currentTabIndex + 1);
        }
      }, 700);
    }

    function toggleModelAnswer(type) {
      const el = document.getElementById('model-' + type);
      if (el) el.classList.toggle('hidden');
    }

    function speakCurrentWord() {
      speakEnglish(words[currentIndex].word);
    }

    function speakSentenceModel() {
      const w = words[currentIndex];
      if (w.exercise && w.exercise.sentence) {
        speakEnglish(w.exercise.sentence.en);
      }
    }

    function speakEnglish(text) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
      }
    }

    function toggleWordDirectory() {
      const modal = document.getElementById('wordDirectoryModal');
      modal.classList.toggle('hidden');
      if (!modal.classList.contains('hidden')) {
        renderDirectoryList();
      }
    }

    function closeWordDirectory() {
      document.getElementById('wordDirectoryModal').classList.add('hidden');
    }

    function renderDirectoryList() {
      const container = document.getElementById('directoryWordsList');
      const isUserAuth = isLoggedIn();
      container.innerHTML = words.map((w, idx) => {
        const isLocked = idx >= 10 && !isUserAuth;
        const isActive = idx === currentIndex;
        return \`
          <div onclick="goToWord(\${idx})" class="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer rounded-xl transition \${isActive ? 'bg-blue-50 border border-blue-200' : ''} \${isLocked ? 'opacity-60' : ''}">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-en font-bold">\${w.id}</span>
              <div class="text-right">
                <span class="font-bold text-slate-800 font-en text-sm">\${w.word}</span>
                <span class="text-xs text-slate-400 font-en mr-1">\${w.phonetic}</span>
                <div class="text-xs text-slate-500 mt-0.5">\${w.meaning}</div>
              </div>
            </div>
            <div>
              \${isLocked ? '<span class="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md font-bold">🔒 قفل</span>' : '<span class="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-medium">' + w.category + '</span>'}
            </div>
          </div>
        \`;
      }).join('');
    }

    // Init App
    renderAuthBadge();
    renderCurrentWord();
  </script>
</body>
</html>`;
}

// Download Standalone HTML file
export function downloadStandaloneHtmlFile() {
  const html = generateStandaloneHtml();
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cllo_ogden_app.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Download Complete Application ZIP package (containing index.html, auth.js, README.md)
export async function downloadAppZip(): Promise<void> {
  const zip = new JSZip();
  const htmlContent = generateStandaloneHtml();

  // Add files to ZIP
  zip.file('index.html', htmlContent);
  zip.file('auth.js', AUTH_JS_CODE);
  zip.file('README.md', README_MD_CODE);

  // Generate ZIP blob
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cllo_app_html.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
