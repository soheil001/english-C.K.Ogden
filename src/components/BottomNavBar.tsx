import React from 'react';
import { Home, BarChart2, BookOpen, Settings } from 'lucide-react';

export type NavTab = 'home' | 'progress' | 'lessons' | 'settings';

interface BottomNavBarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-20 px-4 pb-2 pt-1 pointer-events-auto">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-[28px] shadow-lg shadow-slate-900/5 px-3 py-2 flex items-center justify-around">
        {/* Tab 1: خانه */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'text-blue-600 scale-105'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className={`w-5 h-5 ${activeTab === 'home' ? 'fill-blue-600 stroke-blue-600' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-bold mt-1">خانه</span>
        </button>

        {/* Tab 2: پیشرفت */}
        <button
          onClick={() => onTabChange('progress')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'progress'
              ? 'text-blue-600 scale-105'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <BarChart2 className={`w-5 h-5 ${activeTab === 'progress' ? 'stroke-blue-600 stroke-[2.3]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-bold mt-1">پیشرفت</span>
        </button>

        {/* Tab 3: درس‌ها */}
        <button
          onClick={() => onTabChange('lessons')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'lessons'
              ? 'text-blue-600 scale-105'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <BookOpen className={`w-5 h-5 ${activeTab === 'lessons' ? 'stroke-blue-600 stroke-[2.3]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-bold mt-1">درس‌ها</span>
        </button>

        {/* Tab 4: تنظیمات */}
        <button
          onClick={() => onTabChange('settings')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'text-blue-600 scale-105'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'stroke-blue-600 stroke-[2.3]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] font-bold mt-1">تنظیمات</span>
        </button>
      </div>

      {/* iPhone Home Indicator bar */}
      <div className="w-32 h-1 bg-slate-900/30 rounded-full mx-auto mt-2"></div>
    </div>
  );
};
