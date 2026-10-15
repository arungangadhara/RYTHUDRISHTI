/**
 * @file src/components/sections/FarmProfileSection.tsx
 * Farm Profile & Land Context Shell
 * Prepares farmer details and growth stage calculation for Stage 6 & 7
 */

import React, { useState } from 'react';
import { useI18n } from '../../i18n/index.tsx';
import { useFarm, TELANGANA_DISTRICTS } from '../../context/FarmContext.tsx';
import { CropType } from '../../types/index.ts';
import { 
  Sprout, 
  MapPin, 
  Calendar, 
  Layers, 
  Droplet, 
  Save, 
  Edit3, 
  CheckCircle2, 
  Clock,
  User
} from 'lucide-react';

export const FarmProfileSection: React.FC = () => {
  const { language, t } = useI18n();
  const { farmProfile, updateFarmProfile, activeCrop, setActiveCrop, showToast } = useFarm();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(farmProfile);

  // Calculate days since sowing
  const sowingDateObj = new Date(farmProfile.sowingDate);
  const diffDays = Math.max(0, Math.floor((Date.now() - sowingDateObj.getTime()) / (1000 * 60 * 60 * 24)));

  // Determine stage based on crop and days
  const getGrowthStage = (crop: CropType, days: number) => {
    if (crop === 'cotton') {
      if (days < 25) return { en: 'Germination & Seedling', te: 'మొలక & నారు దశ' };
      if (days < 60) return { en: 'Vegetative & Square Formation', te: 'శాఖీయ & మొగ్గ తొడిగే దశ' };
      if (days < 100) return { en: 'Flowering & Boll Development', te: 'పూత & కాయల ఎదుగుదల' };
      return { en: 'Boll Bursting & Picking', te: 'పత్తి విచ్చుకోవడం & ఏరివేత' };
    } else if (crop === 'paddy') {
      if (days < 20) return { en: 'Nursery & Tillering Initiation', te: 'నారుమడి & పిలకల ప్రారంభం' };
      if (days < 50) return { en: 'Active Tillering & Stem Elongation', te: 'తీవ్ర పిలకల దశ & కాండం పెరుగుదల' };
      if (days < 80) return { en: 'Panicle Initiation & Flowering', te: 'చిరుపొట్ట & ఈనే దశ' };
      return { en: 'Grain Filling & Maturity', te: 'గింజ పాలుపోసుకునే & కోత దశ' };
    } else {
      if (days < 20) return { en: 'Seedling Establishment', te: 'మొలక దశ' };
      if (days < 45) return { en: 'Knee-High Rapid Growth', te: 'మోకాలి ఎత్తు పెరుగుదల' };
      if (days < 70) return { en: 'Tasseling & Silking', te: 'వెన్ను & పోగులు వచ్చే దశ' };
      return { en: 'Cob Development & Grain Hardening', te: 'కంకి గింజ దశ & కోత' };
    }
  };

  const stage = getGrowthStage(activeCrop, diffDays);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFarmProfile(formData);
    setIsEditing(false);
    showToast(
      language === 'te'
        ? 'వ్యవసాయ క్షేత్ర వివరాలు భద్రపరచబడ్డాయి!'
        : 'Farm profile updated successfully!'
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Sprout size={20} />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.sections.farm.title}
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {t.sections.farm.badge}
            </span>
          </div>
          <p className="text-sm text-stone-600">
            {t.sections.farm.description}
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="touch-target inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-semibold text-xs sm:text-sm transition-colors self-start sm:self-center"
        >
          <Edit3 size={16} />
          <span>{isEditing ? (language === 'te' ? 'రద్దు చేయి' : 'Cancel Edit') : (language === 'te' ? 'వివరాలు సవరించండి' : 'Edit Profile')}</span>
        </button>
      </div>

      {/* Calculated Growth Stage Indicator */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border border-emerald-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
              {language === 'te' ? 'లెక్కింపు ఆధారిత పంట దశ (Context Intelligence)' : 'Calculated Growth Stage (Context Intelligence)'}
            </div>
            <div className="text-lg font-extrabold text-emerald-950 flex items-center gap-2">
              <span>🌾 {language === 'te' ? stage.te : stage.en}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                Day {diffDays}
              </span>
            </div>
            <div className="text-xs text-stone-600 mt-1">
              {language === 'te'
                ? `విత్తిన తేదీ నుండి ${diffDays} రోజులు గడిచాయి. ఏఐ సలహాలు ఈ ఖచ్చితమైన దశకు అనుగుణంగా ఇవ్వబడతాయి.`
                : `${diffDays} days elapsed since sowing. AI advice automatically adapts to this exact biological stage.`}
            </div>
          </div>

          <div className="text-xs text-stone-500 bg-white/80 p-3 rounded-xl border border-emerald-200/80 shrink-0">
            <div><strong>{language === 'te' ? 'విత్తిన తేదీ:' : 'Sowing Date:'}</strong> {farmProfile.sowingDate}</div>
            <div><strong>{language === 'te' ? 'పంట:' : 'Crop:'}</strong> {farmProfile.activeCrop.toUpperCase()}</div>
          </div>
        </div>
      </div>

      {/* Profile Form / Card View */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-stone-900 border-b border-stone-200 pb-2">
            {language === 'te' ? 'వ్యవసాయ వివరాల సవరణ' : 'Edit Farm Parameters'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'te' ? 'రైతు పేరు' : 'Farmer Name'}
              </label>
              <input
                type="text"
                value={formData.farmerName}
                onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'te' ? 'ఫోన్ నంబర్' : 'Phone Number'}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'te' ? 'గ్రామం / మండలం' : 'Village / Mandal'}
              </label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'te' ? 'మొత్తం భూమి (ఎకరాలు)' : 'Total Land (Acres)'}
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={formData.totalAcres}
                onChange={(e) => setFormData({ ...formData, totalAcres: parseFloat(e.target.value) || 1 })}
                className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'te' ? 'ప్రస్తుత పంట' : 'Active Crop'}
              </label>
              <select
                value={formData.activeCrop}
                onChange={(e) => {
                  const crop = e.target.value as CropType;
                  setFormData({ ...formData, activeCrop: crop });
                  setActiveCrop(crop);
                }}
                className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold"
              >
                <option value="cotton">Cotton / పత్తి</option>
                <option value="paddy">Paddy / వరి</option>
                <option value="maize">Maize / మొక్కజొన్న</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {language === 'te' ? 'విత్తిన తేదీ' : 'Sowing Date'}
              </label>
              <input
                type="date"
                value={formData.sowingDate}
                onChange={(e) => setFormData({ ...formData, sowingDate: e.target.value })}
                className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-stone-200">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="touch-target px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
            >
              {language === 'te' ? 'రద్దు చేయి' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="touch-target px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5"
            >
              <Save size={16} />
              <span>{language === 'te' ? 'భద్రపరచు' : 'Save Farm Profile'}</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1">
                <User size={13} /> {language === 'te' ? 'రైతు పేరు' : 'Farmer Name'}
              </span>
              <div className="text-base font-bold text-stone-900 mt-1">{farmProfile.farmerName}</div>
              <div className="text-xs text-stone-500">{farmProfile.phone}</div>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1">
                <MapPin size={13} /> {language === 'te' ? 'ప్రాంతం / గ్రామం' : 'Location & Village'}
              </span>
              <div className="text-base font-bold text-stone-900 mt-1">{farmProfile.village}</div>
              <div className="text-xs text-stone-500">{farmProfile.district} District, Telangana</div>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1">
                <Layers size={13} /> {language === 'te' ? 'భూమి విస్తీర్ణం & నేల రకం' : 'Land Size & Soil'}
              </span>
              <div className="text-base font-bold text-stone-900 mt-1">{farmProfile.totalAcres} Acres</div>
              <div className="text-xs text-stone-500 capitalize">{farmProfile.soilType.replace('_', ' ')} Soil</div>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1">
                <Droplet size={13} /> {language === 'te' ? 'నీటి వనరు' : 'Irrigation Method'}
              </span>
              <div className="text-base font-bold text-stone-900 mt-1 capitalize">{farmProfile.irrigationType}</div>
              <div className="text-xs text-stone-500">Scheduled per weather forecast</div>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] font-bold text-stone-500 uppercase flex items-center gap-1">
                <Calendar size={13} /> {language === 'te' ? 'విత్తిన తేదీ' : 'Sowing Date'}
              </span>
              <div className="text-base font-bold text-stone-900 mt-1">{farmProfile.sowingDate}</div>
              <div className="text-xs text-stone-500">{diffDays} days in field</div>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                <CheckCircle2 size={13} /> {language === 'te' ? 'స్థితి' : 'Profile Status'}
              </span>
              <div className="text-base font-bold text-emerald-950 mt-1">Context Active</div>
              <div className="text-xs text-emerald-700">Feeding into AI Copilot</div>
            </div>

          </div>
        </div>
      )}

      {/* Stage 6 note */}
      <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <Clock size={16} className="text-emerald-700 shrink-0" />
          <span>{t.sections.farm.stage6Note}</span>
        </span>
        <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-emerald-200/70 text-emerald-900 shrink-0">
          Stage 6 Ready
        </span>
      </div>

    </div>
  );
};
