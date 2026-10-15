/**
 * @file src/components/common/Header.tsx
 * Responsive Header for RythuDrishti AI
 * Features:
 * - Brand logo and responsive title
 * - Fast English/Telugu language toggle
 * - Instant active crop selector (Cotton / Paddy / Maize)
 * - District location badge
 * - Large touch targets (min 48px)
 */

import React, { useState } from 'react';
import { Logo } from './Logo.tsx';
import { useI18n } from '../../i18n/index.tsx';
import { useFarm, TELANGANA_DISTRICTS } from '../../context/FarmContext.tsx';
import { CropType } from '../../types/index.ts';
import { 
  Languages, 
  MapPin, 
  ChevronDown, 
  Sparkles, 
  Menu, 
  X,
  PhoneCall
} from 'lucide-react';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useI18n();
  const { 
    activeCrop, 
    setActiveCrop, 
    activeDistrict, 
    setActiveDistrict,
    isMobileMenuOpen, 
    setIsMobileMenuOpen 
  } = useFarm();

  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);

  const crops: { id: CropType; nameEn: string; nameTe: string; icon: string }[] = [
    { id: 'cotton', nameEn: 'Cotton', nameTe: 'పత్తి (White Gold)', icon: '🌱' },
    { id: 'paddy', nameEn: 'Paddy', nameTe: 'వరి (Paddy Rice)', icon: '🌾' },
    { id: 'maize', nameEn: 'Maize', nameTe: 'మొక్కజొన్న (Maize Corn)', icon: '🌽' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Left: Mobile hamburger & Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden touch-target inline-flex items-center justify-center p-2 rounded-xl text-stone-700 hover:text-emerald-800 hover:bg-emerald-50 active:bg-emerald-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center gap-2.5 cursor-pointer select-none">
              <Logo size={40} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-emerald-950 font-sans">
                    {language === 'te' ? 'రైతుదృష్టి' : 'RythuDrishti'}
                  </span>
                  <span className="text-xs px-1.5 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-800 tracking-wide uppercase">
                    AI
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-500 hidden sm:block truncate max-w-xs font-medium">
                  {t.app.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Active Crop Quick Selector */}
          <div className="relative">
            <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              <span className="text-xs font-semibold text-stone-500 px-2 select-none">
                {t.crops.cropLabel}:
              </span>
              {crops.map((c) => {
                const isSelected = activeCrop === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCrop(c.id)}
                    className={`touch-target px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                        : 'text-stone-700 hover:text-emerald-800 hover:bg-white/80'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{language === 'te' ? c.nameTe.split(' ')[0] : c.nameEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Crop Selector Button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsCropDropdownOpen(!isCropDropdownOpen)}
                className="touch-target flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 font-semibold text-xs active:bg-emerald-100"
              >
                <span>{crops.find(c => c.id === activeCrop)?.icon}</span>
                <span>{language === 'te' ? crops.find(c => c.id === activeCrop)?.nameTe.split(' ')[0] : crops.find(c => c.id === activeCrop)?.nameEn}</span>
                <ChevronDown size={14} className="text-emerald-700" />
              </button>

              {isCropDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {t.crops.selectCrop}
                  </div>
                  {crops.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveCrop(c.id);
                        setIsCropDropdownOpen(false);
                      }}
                      className={`w-full touch-target text-left px-3 py-2 text-sm flex items-center justify-between ${
                        activeCrop === c.id ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{c.icon}</span>
                        <span>{language === 'te' ? c.nameTe : c.nameEn}</span>
                      </span>
                      {activeCrop === c.id && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: District Selector + Language Toggle Switch */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* District Selector */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsDistrictDropdownOpen(!isDistrictDropdownOpen)}
                className="touch-target flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition-colors"
                title="Telangana Farm District"
              >
                <MapPin size={14} className="text-emerald-600" />
                <span className="font-semibold text-stone-800">
                  {language === 'te' ? activeDistrict.nameTe : activeDistrict.nameEn}
                </span>
                <ChevronDown size={14} className="text-stone-400" />
              </button>

              {isDistrictDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-50">
                  <div className="px-3 py-1 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {t.districts.title}
                  </div>
                  {TELANGANA_DISTRICTS.map((dist) => (
                    <button
                      key={dist.id}
                      onClick={() => {
                        setActiveDistrict(dist.id);
                        setIsDistrictDropdownOpen(false);
                      }}
                      className={`w-full touch-target text-left px-3 py-2 text-xs flex items-center justify-between ${
                        activeDistrict.id === dist.id ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{language === 'te' ? dist.nameTe : dist.nameEn}</span>
                      {activeDistrict.id === dist.id && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switch Toggle (English / తెలుగు) */}
            <div className="inline-flex items-center bg-emerald-950 p-1 rounded-xl shadow-inner border border-emerald-900" role="group" aria-label="Language selector">
              <button
                onClick={() => setLanguage('en')}
                className={`touch-target px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
                title="Switch to English"
              >
                English
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`touch-target px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold font-telugu transition-all ${
                  language === 'te'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-200 hover:text-white'
                }`}
                title="తెలుగు భాషలోకి మారండి"
              >
                తెలుగు
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
