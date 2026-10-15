/**
 * @file src/components/common/Sidebar.tsx
 * Desktop/Tablet Navigation Sidebar & Mobile Drawer for RythuDrishti AI
 */

import React from 'react';
import { useI18n } from '../../i18n/index.tsx';
import { useFarm } from '../../context/FarmContext.tsx';
import { DashboardSection } from '../../types/index.ts';
import {
  Bot,
  Camera,
  CloudSun,
  Sprout,
  BookOpen,
  IndianRupee,
  Settings,
  PhoneCall,
  CheckCircle2,
  X
} from 'lucide-react';

interface NavItemConfig {
  id: DashboardSection;
  icon: React.ElementType;
  labelEn: string;
  labelTe: string;
  badge?: string;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { id: 'assistant', icon: Bot, labelEn: 'AI Assistant', labelTe: 'ఏఐ సలహాదారు', badge: 'Gemini' },
  { id: 'crop_photo', icon: Camera, labelEn: 'Crop Photo', labelTe: 'పంట ఫోటో తనిఖీ', badge: 'Vision' },
  { id: 'weather', icon: CloudSun, labelEn: 'Weather & Alerts', labelTe: 'వాతావరణం & హెచ్చరికలు', badge: 'Live' },
  { id: 'farm', icon: Sprout, labelEn: 'My Farm', labelTe: 'నా క్షేత్రం' },
  { id: 'diary', icon: BookOpen, labelEn: 'Farm Diary', labelTe: 'సాగు డైరీ' },
  { id: 'expenses', icon: IndianRupee, labelEn: 'Expenses', labelTe: 'ఖర్చులు & రాబడి' },
  { id: 'settings', icon: Settings, labelEn: 'Settings', labelTe: 'సెట్టింగులు' },
];

export const Sidebar: React.FC = () => {
  const { language, t } = useI18n();
  const { 
    activeSection, 
    setActiveSection, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen,
    activeCrop,
    farmProfile 
  } = useFarm();

  const handleSelect = (id: DashboardSection) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      {/* Top section: nav links */}
      <div className="space-y-1">
        <div className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-stone-500">
          {language === 'te' ? 'డ్యాష్‌బోర్డ్ విభాగాలు' : 'Navigation Sections'}
        </div>

        <nav className="space-y-1.5" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full touch-target flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-900/10'
                    : 'text-stone-700 hover:bg-emerald-50/70 hover:text-emerald-900 active:bg-emerald-100'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive ? 'bg-white/20 text-white' : 'text-emerald-800 bg-emerald-100/60'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className={language === 'te' ? 'font-telugu' : ''}>
                    {language === 'te' ? item.labelTe : item.labelEn}
                  </span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide ${
                      isActive ? 'bg-emerald-600 text-emerald-50' : 'bg-stone-200/80 text-stone-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom section: Active context summary & Toll-Free Agri Helpline */}
      <div className="space-y-3 pt-4 border-t border-stone-200 mt-4">
        {/* Active Farm Summary Card */}
        <div className="bg-emerald-50/80 rounded-xl p-3 border border-emerald-200/70">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-900 mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {language === 'te' ? 'రైతు ప్రొఫైల్' : 'Farmer Context'}
            </span>
            <span className="capitalize text-emerald-700 text-[11px] font-bold">
              {farmProfile.totalAcres} {language === 'te' ? 'ఎకరాలు' : 'Acres'}
            </span>
          </div>
          <div className="text-xs text-stone-700 font-medium truncate">
            {farmProfile.farmerName} • {farmProfile.village}
          </div>
          <div className="mt-2 text-[11px] font-semibold text-emerald-800 bg-white/80 py-1 px-2 rounded-lg border border-emerald-200 inline-flex items-center gap-1.5">
            <span>🌾</span>
            <span>
              {language === 'te' ? t.crops.cropLabel : 'Active Crop'}:{' '}
              <strong className="capitalize">{activeCrop}</strong>
            </span>
          </div>
        </div>

        {/* Kisan Helpline */}
        <a
          href="tel:18001801551"
          className="touch-target flex items-center gap-2.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors text-xs font-semibold border border-stone-200"
          title="Call Kisan Call Centre"
        >
          <div className="p-1 rounded-full bg-emerald-600 text-white shrink-0">
            <PhoneCall size={12} />
          </div>
          <div className="truncate">
            <div className="text-emerald-950 font-bold">1800-180-1551</div>
            <div className="text-[10px] text-stone-500 truncate">Kisan Call Centre (Toll-Free)</div>
          </div>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (visible on md and up) */}
      <aside className="hidden md:block w-64 lg:w-72 bg-white border-r border-stone-200 p-4 shrink-0 min-h-[calc(100vh-4rem)]">
        {navContent}
      </aside>

      {/* Mobile Drawer (visible when isMobileMenuOpen is true) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-sm bg-white p-5 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
              <span className="font-bold text-stone-800 text-base">
                {language === 'te' ? 'రైతుదృష్టి మెనూ' : 'RythuDrishti Menu'}
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 touch-target rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">{navContent}</div>
          </div>
        </div>
      )}
    </>
  );
};
