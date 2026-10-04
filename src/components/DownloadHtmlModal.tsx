import React, { useState } from 'react';
import { X, Download, Copy, Check, FileArchive, Sparkles, Loader2, FileCode } from 'lucide-react';
import { downloadStandaloneHtmlFile, downloadAppZip, generateStandaloneHtml } from '../utils/exportHtml';

interface DownloadHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadHtmlModal: React.FC<DownloadHtmlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      await downloadAppZip();
    } catch (err) {
      console.error('Error generating zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleCopy = () => {
    const code = generateStandaloneHtml();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[32px] p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200" dir="rtl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <FileArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">دانلود کد فایل HTML در فایل ZIP</h3>
              <p className="text-[11px] text-slate-400">شامل index.html + auth.js + راهنما</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 space-y-3">
          <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-100 text-xs text-slate-700 leading-relaxed space-y-1.5 text-right">
            <div className="font-extrabold text-blue-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>محتویات بسته دانلودی ZIP:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pr-1 text-[11px]">
              <li><strong className="text-slate-800 font-english">index.html</strong>: اپلیکیشن کامل و مستقل ۱۰۰ لغت متد C. K. Ogden</li>
              <li><strong className="text-slate-800 font-english">auth.js</strong>: اسکریپت اتصال به Supabase و اعتبارسنجی کد ۵ رقمی اشتراک</li>
              <li><strong className="text-slate-800 font-english">README.md</strong>: راهنمای نحوه اجرا و ویژگی‌ها</li>
            </ul>
          </div>

          {/* Primary Action: Download ZIP */}
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-blue-700/25 flex items-center justify-center gap-2 active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
          >
            {isZipping ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>در حال ایجاد فایل ZIP...</span>
              </>
            ) : (
              <>
                <FileArchive className="w-4 h-4" />
                <span>دانلود بسته کامل در یک فایل ZIP (cllo_app_html.zip)</span>
              </>
            )}
          </button>

          {/* Secondary Action: Download HTML directly */}
          <button
            onClick={downloadStandaloneHtmlFile}
            className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-98 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>دانلود فقط فایل HTML تک‌صفحه‌ای</span>
          </button>

          {/* Copy HTML directly */}
          <button
            onClick={handleCopy}
            className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-medium text-[11px] rounded-xl flex items-center justify-center gap-1.5 active:scale-98 transition cursor-pointer border border-slate-200"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'کد کامل HTML کپی شد!' : 'کپی مستقیم متن کد HTML در کلیپ‌بورد'}</span>
          </button>
        </div>

        <div className="text-center text-[11px] text-slate-500 pt-1">
          بدون نیاز به سرور و تنها با دو بار کلیک در هر مرورگری اجرا می‌شود.
        </div>
      </div>
    </div>
  );
};
