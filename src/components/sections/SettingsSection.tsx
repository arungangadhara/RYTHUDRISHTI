/**
 * @file src/components/sections/SettingsSection.tsx
 * Settings & Preferences Management for RythuDrishti AI
 */

import React from 'react';
import { useI18n } from '../../i18n/index.tsx';
import { useFarm, TELANGANA_DISTRICTS } from '../../context/FarmContext.tsx';
import { 
  Settings, 
  Languages, 
  MapPin, 
  RotateCcw,
  Volume2,
  Bell
} from 'lucide-react';

export const SettingsSection: React.FC = () => {
  const { language, setLanguage, t } = useI18n();
  const { activeDistrict, setActiveDistrict, showToast } = useFarm();

  const handleReset = () => {
    localStorage.clear();
    showToast(
      language === 'te'
        ? 'సెట్టింగులు ప్రాథమిక స్థితికి రీసెట్ చేయబడ్డాయి'
        : 'Settings reset to factory defaults'
    );
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Settings size={20} />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.sections.settings.title}
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {t.sections.settings.badge}
            </span>
          </div>
          <p className="text-sm text-stone-600">
            {t.sections.settings.description}
          </p>
        </div>

        <button
          onClick={handleReset}
          className="touch-target inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 border border-stone-200 self-start sm:self-center transition-colors"
        >
          <RotateCcw size={14} />
          <span>{language === 'te' ? 'రీసెట్ చేయండి' : 'Reset Local State'}</span>
        </button>
      </div>

      {/* User Preferences Card */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
        <h2 className="text-base font-bold text-stone-900 pb-2 border-b border-stone-200">
          {language === 'te' ? 'రైతు ప్రాధాన్యతలు (Preferences)' : 'User Preferences'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Language Preference */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Languages size={16} className="text-emerald-700" />
                <span>{t.sections.settings.languagePref}</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-800 uppercase">
                {language === 'te' ? 'తెలుగు' : 'English'}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {language === 'te' ? 'యాప్ లోని అన్ని వివరాలు, సలహాలు ఈ భాషలోనే ఉంటాయి.' : 'All advice and labels will render in your chosen language.'}
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`flex-1 touch-target py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  language === 'en'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('te')}
                className={`flex-1 touch-target py-2 px-3 rounded-lg text-xs font-bold font-telugu transition-all ${
                  language === 'te'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                తెలుగు
              </button>
            </div>
          </div>

          {/* District Preference */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <MapPin size={16} className="text-emerald-700" />
                <span>{t.sections.settings.districtPref}</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-800 uppercase">
                {activeDistrict.nameEn}
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {language === 'te' ? 'వాతావరణం మరియు స్థానిక మార్కెట్ సమాచారం కోసం జిల్లా ఎంచుకోండి.' : 'Determines default coordinates for Open-Meteo forecast.'}
            </p>
            <select
              value={activeDistrict.id}
              onChange={(e) => setActiveDistrict(e.target.value)}
              className="w-full touch-target px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs sm:text-sm font-semibold text-stone-800 focus:ring-2 focus:ring-emerald-600"
            >
              {TELANGANA_DISTRICTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {language === 'te' ? d.nameTe : d.nameEn} ({d.lat}°, {d.lon}°)
                </option>
              ))}
            </select>
          </div>

          {/* Voice Assistance Preview */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Volume2 size={16} className="text-emerald-700" />
                <span>{language === 'te' ? 'తెలుగు వాయిస్ రీడ్-అవుట్' : 'Voice Read-Out (TTS)'}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Stage 4
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {language === 'te' ? 'ఏఐ సమాధానాలను తెలుగులో వినిపించే సదుపాయం.' : 'Enable spoken Telugu responses using Web Speech Synthesis.'}
            </p>
          </div>

          {/* Weather Risk Notifications */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Bell size={16} className="text-emerald-700" />
                <span>{language === 'te' ? 'వాతావరణ ప్రమాద హెచ్చరికలు' : 'Weather Risk Alerts'}</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Active
              </span>
            </div>
            <p className="text-xs text-stone-500">
              {language === 'te' ? 'వర్షపాతం లేదా అధిక వేడి ఉన్నప్పుడు హెచ్చరికలు చూపుతుంది.' : 'Rule-based threshold alerts for heavy rainfall and heat stress.'}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
