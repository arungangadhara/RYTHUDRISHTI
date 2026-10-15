/**
 * @file src/App.tsx
 * RythuDrishti AI - Smart Farming Copilot for Telangana
 * B.Tech CSE Final Year Project
 * Stage 1: Responsive Dashboard Shell, Navigation, Routing & English/Telugu Localization
 */

import React from 'react';
import { I18nProvider, useI18n } from './i18n/index.tsx';
import { FarmProvider, useFarm } from './context/FarmContext.tsx';
import { Header } from './components/common/Header.tsx';
import { Sidebar } from './components/common/Sidebar.tsx';
import { MobileNav } from './components/common/MobileNav.tsx';
import { StageBanner } from './components/common/StageBanner.tsx';

// Sections
import { AssistantSection } from './components/sections/AssistantSection.tsx';
import { CropPhotoSection } from './components/sections/CropPhotoSection.tsx';
import { WeatherSection } from './components/sections/WeatherSection.tsx';
import { FarmProfileSection } from './components/sections/FarmProfileSection.tsx';
import { DiarySection } from './components/sections/DiarySection.tsx';
import { ExpensesSection } from './components/sections/ExpensesSection.tsx';
import { SettingsSection } from './components/sections/SettingsSection.tsx';

const DashboardContent: React.FC = () => {
  const { activeSection, toastMessage } = useFarm();

  const renderSection = () => {
    switch (activeSection) {
      case 'assistant':
        return <AssistantSection />;
      case 'crop_photo':
        return <CropPhotoSection />;
      case 'weather':
        return <WeatherSection />;
      case 'farm':
        return <FarmProfileSection />;
      case 'diary':
        return <DiarySection />;
      case 'expenses':
        return <ExpensesSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <AssistantSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 pb-20 md:pb-6">
      {/* Header */}
      <Header />

      {/* Main Layout (Sidebar + Main Content) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Section Area */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 min-w-0">
          {/* Milestone Status Banner */}
          <StageBanner />

          {/* Section View */}
          {renderSection()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (min 48px touch targets) */}
      <MobileNav />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-emerald-950 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl border border-emerald-800 flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <FarmProvider>
        <DashboardContent />
      </FarmProvider>
    </I18nProvider>
  );
}
