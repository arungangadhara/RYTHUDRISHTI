/**
 * @file src/components/common/StageBanner.tsx
 * Interactive Stage 1 Status & B.Tech Project Roadmap Banner
 */

import React, { useState } from 'react';
import { useI18n } from '../../i18n/index.tsx';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Info
} from 'lucide-react';

export const StageBanner: React.FC = () => {
  const { language, t } = useI18n();
  const [isExpanded, setIsExpanded] = useState(false);

  const stages = [
    { num: 1, title: 'Project Shell & i18n', status: 'completed' },
    { num: 2, title: 'Auth & Gemini Chat', status: 'next' },
    { num: 3, title: 'Crop Photo & Vision', status: 'upcoming' },
    { num: 4, title: 'Telugu Voice Speech', status: 'upcoming' },
    { num: 5, title: 'Live Open-Meteo Weather', status: 'upcoming' },
    { num: 6, title: 'Farm Profile & Diary CRUD', status: 'upcoming' },
    { num: 7, title: 'Context Engine & Expenses', status: 'upcoming' },
    { num: 8, title: 'Testing, Docs & Deploy Guide', status: 'upcoming' },
  ];

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-850 to-teal-950 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-800/80 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0 mt-0.5">
            <CheckCircle2 size={22} className="text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/20">
                {language === 'te' ? 'దశ 1 పూర్తి' : 'Stage 1 Complete'}
              </span>
              <span className="text-xs text-emerald-300 font-medium">
                B.Tech CSE Project Milestone
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white mt-1">
              {t.stage1.bannerTitle}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-0.5 max-w-2xl leading-relaxed">
              {t.stage1.bannerDesc}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="touch-target self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 active:bg-emerald-600 text-xs font-semibold text-emerald-100 transition-colors border border-emerald-700/60 shrink-0"
        >
          <Layers size={14} />
          <span>{isExpanded ? (language === 'te' ? 'దాచండి' : 'Hide Roadmap') : (language === 'te' ? 'రోడ్‌మ్యాప్ & తనిఖీ' : 'View Checklist & Stages')}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expanded Stage Checklist & Roadmap */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-emerald-800/70 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Checklist */}
          <div className="bg-emerald-950/70 rounded-xl p-3.5 border border-emerald-800/60">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
              <Info size={14} />
              {t.stage1.checklistTitle}
            </h3>
            <ul className="space-y-2 text-xs text-emerald-100">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t.stage1.item1}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t.stage1.item2}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t.stage1.item3}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{t.stage1.item4}</span>
              </li>
            </ul>
          </div>

          {/* Project Stage Matrix */}
          <div className="bg-emerald-950/70 rounded-xl p-3.5 border border-emerald-800/60">
            <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Sparkles size={14} />
              {language === 'te' ? 'ప్రాజెక్ట్ 8 దశల ప్రణాళిక' : '8-Stage Engineering Roadmap'}
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {stages.map((st) => (
                <div
                  key={st.num}
                  className={`text-[11px] p-2 rounded-lg flex items-center justify-between ${
                    st.status === 'completed'
                      ? 'bg-emerald-700/60 text-white font-semibold border border-emerald-500/40'
                      : st.status === 'next'
                      ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-400/40 animate-pulse'
                      : 'bg-emerald-900/30 text-emerald-300/70'
                  }`}
                >
                  <span className="truncate">S{st.num}: {st.title}</span>
                  {st.status === 'completed' && <span className="text-emerald-400">✓</span>}
                  {st.status === 'next' && <span className="text-amber-300 text-[10px]">NEXT</span>}
                </div>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-amber-200/90 font-medium">
              → {t.stage1.nextStagePreview}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
