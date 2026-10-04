import React from 'react';
import ogdenBannerBooks from '../assets/images/ogden_banner_books_1791081314344.jpg';

export const QuoteBanner: React.FC = () => {
  return (
    <section aria-label="فلسفه یادگیری روش آگدن" className="px-4 my-2">
      <h2 className="sr-only">فلسفه و دیدگاه C. K. Ogden در یادگیری زبان</h2>
      <div className="relative overflow-hidden rounded-[26px] shadow-lg shadow-indigo-950/10 min-h-[160px] flex items-center">
        {/* Background Image with warm sunset & books */}
        <img
          src={ogdenBannerBooks}
          alt="Less Words, More Practice"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Scrim for crisp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-indigo-950/75 to-purple-900/60 backdrop-blur-[0.5px]"></div>

        {/* Floating subtle book text labels overlay */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xs:flex flex-col gap-1 items-end pointer-events-none opacity-90">
          <div className="px-2 py-0.5 rounded bg-blue-600/80 backdrop-blur-sm text-[10px] font-english font-bold text-white shadow-sm border border-blue-400/30">
            Less Words
          </div>
          <div className="px-2 py-0.5 rounded bg-indigo-950/85 backdrop-blur-sm text-[10px] font-english font-bold text-indigo-100 shadow-sm border border-indigo-400/30">
            More Practice
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-5 text-right max-w-[85%] sm:max-w-[78%]">
          {/* Quote Mark */}
          <div className="text-3xl text-indigo-300 font-serif leading-none opacity-80 mb-1 select-none font-english">
            “
          </div>

          <p className="text-xs sm:text-[13px] leading-relaxed text-white font-medium drop-shadow-sm">
            برای شروع یادگیری زبان ،
            <br />
            نیازی به هزاران کلمه نیست؛
            <br />
            کافی است با چند کلمه‌ی ساده
            <br />
            جمله بسازیم و از آن‌ها استفاده کنیم.
          </p>

          <div className="mt-2 text-[11px] font-semibold text-indigo-200/90 font-english tracking-wide">
            - C. K. Ogden
          </div>
        </div>
      </div>
    </section>
  );
};
