/**
 * @file src/components/sections/WeatherSection.tsx
 * Live Weather & Rule-Based Agricultural Risk Alerts Shell
 * Open-Meteo Integration Architecture for Stage 5
 */

import React, { useState } from 'react';
import { useI18n } from '../../i18n/index.tsx';
import { useFarm, TELANGANA_DISTRICTS } from '../../context/FarmContext.tsx';
import { 
  CloudSun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  RefreshCw,
  Info
} from 'lucide-react';

export const WeatherSection: React.FC = () => {
  const { language, t } = useI18n();
  const { activeCrop, activeDistrict, setActiveDistrict, showToast } = useFarm();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const lastUpdated = new Date().toLocaleTimeString(language === 'te' ? 'te-IN' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast(
        language === 'te'
          ? `${activeDistrict.nameTe} వాతావరణం అప్‌డేట్ చేయబడింది`
          : `Weather refreshed for ${activeDistrict.nameEn}`
      );
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <CloudSun size={20} />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.sections.weather.title}
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {t.sections.weather.badge}
            </span>
          </div>
          <p className="text-sm text-stone-600">
            {t.sections.weather.description}
          </p>
        </div>

        {/* District Selector & Refresh */}
        <div className="flex items-center gap-2">
          <select
            value={activeDistrict.id}
            onChange={(e) => setActiveDistrict(e.target.value)}
            className="touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold text-stone-800 focus:ring-2 focus:ring-emerald-600"
            aria-label="Select Telangana district"
          >
            {TELANGANA_DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                {language === 'te' ? d.nameTe : d.nameEn}
              </option>
            ))}
          </select>

          <button
            onClick={handleRefresh}
            className="touch-target p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors"
            title="Refresh Weather Forecast"
            aria-label="Refresh forecast"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin text-emerald-700' : ''} />
          </button>
        </div>
      </div>

      {/* Main Weather Card */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-700 relative overflow-hidden">
        
        {/* Subtle background graphics */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 opacity-10 pointer-events-none">
          <CloudSun size={240} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between text-xs text-emerald-200 mb-4 pb-2 border-b border-emerald-700/60">
            <span className="flex items-center gap-1.5 font-semibold">
              <MapPin size={14} className="text-emerald-400" />
              <span>{language === 'te' ? activeDistrict.nameTe : activeDistrict.nameEn}, Telangana</span>
              <span className="text-emerald-400">({activeDistrict.lat}°N, {activeDistrict.lon}°E)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              <span>{language === 'te' ? 'తాజా సమాచారం:' : 'Last updated:'} {lastUpdated}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            
            {/* Temperature */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between text-emerald-200 text-xs mb-1">
                <span>{language === 'te' ? 'ఉష్ణోగ్రత' : 'Temperature'}</span>
                <Thermometer size={16} className="text-amber-300" />
              </div>
              <div className="text-3xl font-extrabold tracking-tight">31.4°C</div>
              <div className="text-[11px] text-emerald-300 mt-1">
                {language === 'te' ? 'గరిష్టం: 33°C • కనిష్టం: 22°C' : 'Max: 33°C • Min: 22°C'}
              </div>
            </div>

            {/* Rain Probability */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between text-emerald-200 text-xs mb-1">
                <span>{language === 'te' ? 'వర్ష సంభావ్యత' : 'Rain Probability'}</span>
                <CloudRain size={16} className="text-cyan-300" />
              </div>
              <div className="text-3xl font-extrabold tracking-tight text-cyan-200">65%</div>
              <div className="text-[11px] text-emerald-300 mt-1">
                {language === 'te' ? 'సాయంత్రం జల్లులు కురిసే అవకాశం' : 'Scattered afternoon showers'}
              </div>
            </div>

            {/* Relative Humidity */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between text-emerald-200 text-xs mb-1">
                <span>{language === 'te' ? 'గాలిలో తేమ' : 'Relative Humidity'}</span>
                <Droplets size={16} className="text-blue-300" />
              </div>
              <div className="text-3xl font-extrabold tracking-tight">74%</div>
              <div className="text-[11px] text-emerald-300 mt-1">
                {language === 'te' ? 'శిలీంధ్రాల వ్యాప్తికి అనుకూలం' : 'High foliar moisture'}
              </div>
            </div>

            {/* Wind Velocity */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between text-emerald-200 text-xs mb-1">
                <span>{language === 'te' ? 'గాలి వేగం' : 'Wind Speed'}</span>
                <Wind size={16} className="text-teal-300" />
              </div>
              <div className="text-3xl font-extrabold tracking-tight">14 km/h</div>
              <div className="text-[11px] text-emerald-300 mt-1">
                {language === 'te' ? 'పడమర నుండి వీచు గాలి' : 'Westerly breeze'}
              </div>
            </div>

          </div>

          {/* Source Attribution footer */}
          <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-300/90">
            <span>{t.sections.weather.sourceText}</span>
            <span>API: Open-Meteo Seamless DWD/ECMWF</span>
          </div>

        </div>
      </div>

      {/* Rule-based Agricultural Risk Alerts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
            <AlertTriangle size={18} className="text-amber-600" />
            <span>{language === 'te' ? 'నియమ-ఆధారిత వ్యవసాయ ప్రమాద హెచ్చరికలు' : 'Rule-Based Farming Risk Alerts'}</span>
          </h2>
          <span className="text-xs text-stone-500">
            {language === 'te' ? 'పంట: ' : 'Target: '} <strong className="capitalize">{activeCrop}</strong>
          </span>
        </div>

        {/* Alert 1 */}
        <div className="bg-white rounded-2xl border-l-4 border-l-amber-500 border border-stone-200 p-4 sm:p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-stone-900">
              {t.sections.weather.sampleAlertTitle}
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
              Risk: Moderate (Rain &gt; 25mm)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            {t.sections.weather.sampleAlertDesc}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
            <span><strong>{language === 'te' ? 'డేటా ఆధారం:' : 'Data source:'}</strong> Open-Meteo 48h Precipitation Forecast</span>
            <span>•</span>
            <span><strong>{language === 'te' ? 'జాగ్రత్త:' : 'Precaution:'}</strong> {language === 'te' ? 'మందుల పిచికారీ నిలిపివేయండి' : 'Halt foliar spraying'}</span>
          </div>
        </div>

        {/* Alert 2: Safe indicator */}
        <div className="bg-emerald-50/70 rounded-2xl border-l-4 border-l-emerald-600 border border-emerald-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-emerald-700 shrink-0" />
            <div className="text-xs sm:text-sm text-emerald-950">
              <span className="font-bold">
                {language === 'te' ? 'ఉష్ణోగ్రత సాధారణ స్థాయిలో ఉంది' : 'Heat Stress Threshold Normal'}
              </span>
              <p className="text-xs text-emerald-800 mt-0.5">
                {language === 'te' ? 'పత్తి మరియు వరి పెరుగుదలకు ప్రస్తుత 31°C ఉష్ణోగ్రత అనుకూలంగా ఉంది.' : 'Current 31°C is within the optimal vegetative window for Telangana crops.'}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-200/60 px-2 py-1 rounded-md shrink-0">
            Safe
          </span>
        </div>
      </div>

    </div>
  );
};
