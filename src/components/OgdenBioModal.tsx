import React from 'react';
import { X, BookOpen, Quote } from 'lucide-react';
import ogdenPortrait from '../assets/images/ogden_portrait_1791081302763.jpg';

interface OgdenBioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OgdenBioModal: React.FC<OgdenBioModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-[32px] p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-sm">درباره روش C. K. Ogden</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="my-4 text-center">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-3 border-indigo-200 shadow-md mb-3">
            <img
              src={ogdenPortrait}
              alt="Charles Kay Ogden"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-bold text-slate-900 text-base">چارلز کی آگدن (C. K. Ogden)</h4>
          <p className="text-xs text-indigo-600 font-medium">زبان‌شناس و فیلسوف دانشگاه کمبریج</p>
        </div>

        <div className="text-xs text-slate-600 leading-relaxed space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <p>
            آگدن مبدع سیستم زبان ساده‌سازی‌شده بین‌المللی (Basic English) بود. او معتقد بود:
          </p>
          <div className="p-3 bg-white rounded-xl border-r-3 border-indigo-500 text-slate-800 font-medium italic text-[11px] leading-normal">
            «برای صحبت کردن روان به هزاران کلمه نیاز ندارید، کافیست چند کلمه اساسی را خوب بلد باشید و یاد بگیرید چطور با هم ترکیبشان کنید.»
          </div>
          <p>
            در این مجموعه، <strong>۵۰ کلمه طلایی و بنیادین</strong> متد آگدن گردآوری شده است تا بتوانید با کمترین تلاش، بیشترین جملات ممکن را در زبان انگلیسی بسازید.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition"
        >
          متوجه شدم
        </button>
      </div>
    </div>
  );
};
