import React, { useState } from 'react';
import { Download, Volume2, Sparkles, RefreshCw, FileCode, CheckCircle2 } from 'lucide-react';
import { downloadStandaloneHtmlFile } from '../utils/exportHtml';

interface SettingsViewProps {
  speechRate: number;
  onSpeechRateChange: (rate: number) => void;
  onResetProgress: () => void;
  onOpenDownloadModal: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  speechRate,
  onSpeechRateChange,
  onResetProgress,
  onOpenDownloadModal,
}) => {
  const [resetDone, setResetDone] = useState(false);

  const handleReset = () => {
    if (window.confirm('آیا از بازنشانی پیشرفت یادگیری ۵۰ لغت اطمینان دارید؟')) {
      onResetProgress();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 2000);
    }
  };

  return (
    <div className="px-4 py-4 animate-in fade-in duration-200">
      <div className="text-right mb-4">
        <h2 className="text-xl font-bold text-slate-900">تنظیمات و ابزارها</h2>
        <p className="text-xs text-slate-500 mt-0.5">شخصی‌سازی و استخراج برنامه</p>
      </div>

      <div className="space-y-3">
        {/* Standalone HTML Export Banner - directly answering user's request */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/20">
          <div className="flex items-center gap-2 mb-1.5">
            <FileCode className="w-5 h-5 text-blue-200" />
            <h3 className="font-bold text-sm">دریافت فایل HTML مستقل</h3>
          </div>
          <p className="text-xs text-blue-100 leading-relaxed mb-3">
            اگر می‌خواهید این صفحه و ۵۰ لغت را به صورت یک فایل مستقل HTML داشته باشید و بدون اینترنت روی کامپیوتر یا موبایل باز کنید:
          </p>
          <div className="flex gap-2">
            <button
              onClick={downloadStandaloneHtmlFile}
              className="flex-1 py-2.5 px-3 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>دانلود مستقیم فایل HTML</span>
            </button>
            <button
              onClick={onOpenDownloadModal}
              className="py-2.5 px-3 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl transition"
            >
              کپی کد
            </button>
          </div>
        </div>

        {/* Audio Speech Rate Control */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">سرعت تلفظ صوتی کلمات</span>
            </div>
            <span className="text-xs font-english font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              {speechRate}x
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mt-3">
            <button
              onClick={() => onSpeechRateChange(0.7)}
              className={`flex-1 py-1.5 text-xs rounded-xl font-medium transition ${
                speechRate === 0.7
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              آرام (۰.۷x)
            </button>
            <button
              onClick={() => onSpeechRateChange(0.9)}
              className={`flex-1 py-1.5 text-xs rounded-xl font-medium transition ${
                speechRate === 0.9
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              معمولی (۰.۹x)
            </button>
            <button
              onClick={() => onSpeechRateChange(1.1)}
              className={`flex-1 py-1.5 text-xs rounded-xl font-medium transition ${
                speechRate === 1.1
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              سریع (۱.۱x)
            </button>
          </div>
        </div>

        {/* Reset Progress */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-800">شروع مجدد آموزش</div>
            <div className="text-[11px] text-slate-400 mt-0.5">پاک کردن پیشرفت و امتیازهای ثبت شده</div>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition flex items-center gap-1 active:scale-95"
          >
            {resetDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
            <span>{resetDone ? 'پاک شد' : 'بازنشانی'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
