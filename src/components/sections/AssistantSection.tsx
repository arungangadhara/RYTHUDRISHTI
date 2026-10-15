/**
 * @file src/components/sections/AssistantSection.tsx
 * AI Assistant Section Shell for RythuDrishti AI
 * Prepares the UI for Stage 2 (Gemini Chat + Language Choice) & Stage 4 (Telugu Voice)
 */

import React, { useState } from 'react';
import { useI18n } from '../../i18n/index.tsx';
import { useFarm } from '../../context/FarmContext.tsx';
import { 
  Bot, 
  Send, 
  Mic, 
  Sparkles, 
  ShieldAlert, 
  ArrowRight,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';

export const AssistantSection: React.FC = () => {
  const { language, t } = useI18n();
  const { activeCrop, farmProfile, activeDistrict, showToast } = useFarm();
  const [inputText, setInputText] = useState('');

  const sampleQueries = [
    {
      crop: 'cotton',
      en: 'What is the recommended irrigation schedule during cotton boll development?',
      te: 'పత్తిలో కాయ ఏర్పడే దశలో ఎన్ని రోజులకు నీటి తడులు ఇవ్వాలి?',
    },
    {
      crop: 'paddy',
      en: 'How to differentiate between zinc deficiency and bacterial leaf blight in paddy?',
      te: 'వరిలో జింక్ లోపానికి మరియు బాక్టీరియా ఆకు ఎండు తెగులుకు మధ్య తేడా ఏమిటి?',
    },
    {
      crop: 'maize',
      en: 'Best organic and cultural practices to control Fall Armyworm in 30-day maize?',
      te: '30 రోజుల మొక్కజొన్నలో కత్తెర పురుగు నివారణకు సమగ్ర యాజమాన్య పద్ధతులు ఏమిటి?',
    },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    showToast(
      language === 'te' 
        ? 'దశ 1 మోడ్: మీ ప్రశ్న రికార్డ్ చేయబడింది. దశ 2 లో జెమినీ ఏఐ నేరుగా సమాధానమిస్తుంది!'
        : 'Stage 1 shell: Question captured. Stage 2 will wire direct Gemini AI chat responses!'
    );
    setInputText('');
  };

  const handleSampleClick = (query: string) => {
    setInputText(query);
  };

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Bot size={20} />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.sections.assistant.title}
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {t.sections.assistant.badge}
            </span>
          </div>
          <p className="text-sm text-stone-600">
            {t.sections.assistant.description}
          </p>
        </div>

        {/* Current Agricultural Context Tag */}
        <div className="flex items-center gap-2 bg-stone-50 px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>{language === 'te' ? 'పంట:' : 'Crop:'} <strong className="capitalize text-emerald-900">{activeCrop}</strong></span>
          <span className="text-stone-300">|</span>
          <span>{language === 'te' ? 'జిల్లా:' : 'District:'} <strong className="text-emerald-900">{language === 'te' ? activeDistrict.nameTe : activeDistrict.nameEn}</strong></span>
        </div>
      </div>

      {/* Safety & Compliance Box (Put into Gemini prompt in Stage 2) */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldAlert size={20} className="text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <span>{language === 'te' ? 'వ్యవసాయ భద్రతా నియమావళి (AI Safety Protocol)' : 'Agricultural AI Safety Protocol'}</span>
          </div>
          <p className="leading-relaxed text-amber-800">
            {t.app.safetyNotice}
          </p>
          <div className="text-[11px] text-amber-700 pt-0.5">
            {language === 'te'
              ? '• రసాయన మందుల పేర్లు/మోతాదులు సూచించబడవు. ప్రభుత్వ వ్యవసాయ విభాగం & విశ్వవిద్యాలయాల (PJTSAU/ICAR) సిఫార్సులు మాత్రమే ఆధారంగా తీసుకోబడతాయి.'
              : '• No direct pesticide chemical names/dosages prescribed. Advice strictly aligns with PJTSAU/ICAR agricultural extension guidelines.'}
          </div>
        </div>
      </div>

      {/* Chat Conversation Preview Area */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-4 sm:p-6 min-h-[320px] flex flex-col justify-between">
        
        {/* Sample Welcome Message */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 max-w-2xl">
            <div className="p-2 rounded-xl bg-emerald-700 text-white shrink-0 mt-1 shadow-xs">
              <Bot size={18} />
            </div>
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs sm:text-sm text-stone-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-stone-600 pb-1 border-b border-stone-200">
                <span className="font-bold text-emerald-800">
                  {language === 'te' ? 'రైతుదృష్టి ఏఐ కోపైలట్' : 'RythuDrishti AI Copilot'}
                </span>
                <span>{language === 'te' ? 'దశ 1 ప్రివ్యూ' : 'Stage 1 Preview'}</span>
              </div>
              <p className="leading-relaxed">
                {language === 'te'
                  ? `నమస్కారం! నేను మీ తెలంగాణ స్మార్ట్ వ్యవసాయ సలహాదారుని. ప్రస్తుతం మీరు ఎంచుకున్న పంట: ${activeCrop.toUpperCase()} (${language === 'te' ? activeDistrict.nameTe : activeDistrict.nameEn} జిల్లా). మీ పంట దశ, నీటి యాజమాన్యం లేదా తెగుళ్ళ నివారణ గురించి నన్ను అడగవచ్చు.`
                  : `Namaskaram! I am your Smart Farming Copilot for Telangana. Your active crop is ${activeCrop.toUpperCase()} in ${activeDistrict.nameEn}. You can ask any question in Telugu or English regarding soil nutrition, sowing schedules, or crop health.`}
              </p>

              {/* Core Differentiator Demonstration Tag */}
              <div className="pt-2 flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                  [Live data: {activeDistrict.nameEn}]
                </span>
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold border border-blue-200">
                  [Your records: 4.5 Acres {activeCrop}]
                </span>
                <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold border border-purple-200">
                  [AI analysis: PJTSAU Advisory]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Quick Prompt Questions */}
        <div className="mt-6 pt-4 border-t border-stone-200">
          <div className="text-xs font-semibold text-stone-500 mb-2 flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" />
            <span>{language === 'te' ? 'సూచించిన నమూనా ప్రశ్నలు:' : 'Suggested Questions for Telangana Crops:'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSampleClick(language === 'te' ? q.te : q.en)}
                className="touch-target text-left p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50/70 border border-stone-200 hover:border-emerald-300 transition-all text-xs text-stone-700 leading-snug group flex flex-col justify-between"
              >
                <span className="font-medium text-stone-800 group-hover:text-emerald-950">
                  {language === 'te' ? q.te : q.en}
                </span>
                <span className="mt-1 text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                  <span>{q.crop}</span>
                  <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar with Voice Mic placeholder */}
        <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.sections.assistant.placeholderInput}
              className="w-full touch-target px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white placeholder:text-stone-400 font-sans"
            />
          </div>

          {/* Voice Mic Button (Stage 4 hookup) */}
          <button
            type="button"
            onClick={() => showToast(
              language === 'te'
                ? 'వాయిస్ ఇన్పుట్ స్టేజ్ 4 లో క్రియాశీలం అవుతుంది (Web Speech API)'
                : 'Telugu Voice input activates in Stage 4 via Web Speech API'
            )}
            className="touch-target p-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors"
            title="Telugu Voice Recognition (Stage 4)"
            aria-label="Voice input"
          >
            <Mic size={20} className="text-emerald-800" />
          </button>

          {/* Send Button */}
          <button
            type="submit"
            className="touch-target px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-semibold text-sm transition-colors flex items-center gap-2 shadow-xs shrink-0"
          >
            <span>{t.sections.assistant.quickAction}</span>
            <Send size={16} />
          </button>
        </form>

      </div>

      {/* Stage 2 Integration Callout */}
      <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-emerald-700 shrink-0" />
          <span>{t.sections.assistant.stage2Note}</span>
        </div>
        <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-emerald-200/70 text-emerald-900 shrink-0">
          Stage 2 Ready
        </span>
      </div>

    </div>
  );
};
