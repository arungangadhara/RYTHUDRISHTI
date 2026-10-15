/**
 * @file src/components/common/MobileNav.tsx
 * Mobile Bottom Navigation Bar for RythuDrishti AI
 * Adheres to 48px min touch target rule for field-ready usability
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
  MoreHorizontal
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { language } = useI18n();
  const { activeSection, setActiveSection, setIsMobileMenuOpen } = useFarm();

  const primaryMobileTabs: { id: DashboardSection; icon: React.ElementType; labelEn: string; labelTe: string }[] = [
    { id: 'assistant', icon: Bot, labelEn: 'Assistant', labelTe: 'ఏఐ' },
    { id: 'crop_photo', icon: Camera, labelEn: 'Photo', labelTe: 'ఫోటో' },
    { id: 'weather', icon: CloudSun, labelEn: 'Weather', labelTe: 'వాతావరణం' },
    { id: 'farm', icon: Sprout, labelEn: 'Farm', labelTe: 'క్షేత్రం' },
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200 z-40 px-2 py-1 shadow-lg"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {primaryMobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 touch-target min-h-[52px] flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-800 font-bold bg-emerald-50/90'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} className={isActive ? 'text-emerald-800 scale-110' : ''} />
              <span className={`text-[10px] mt-1 leading-tight ${language === 'te' ? 'font-telugu' : ''}`}>
                {language === 'te' ? tab.labelTe : tab.labelEn}
              </span>
            </button>
          );
        })}

        {/* More button to toggle drawer */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className={`flex-1 touch-target min-h-[52px] flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
            activeSection === 'diary' || activeSection === 'expenses' || activeSection === 'settings'
              ? 'text-emerald-800 font-bold bg-emerald-50/90'
              : 'text-stone-500 hover:text-stone-800'
          }`}
          aria-label="More options"
        >
          <MoreHorizontal size={20} />
          <span className="text-[10px] mt-1 leading-tight">
            {language === 'te' ? 'మరిన్ని' : 'More'}
          </span>
        </button>
      </div>
    </nav>
  );
};
