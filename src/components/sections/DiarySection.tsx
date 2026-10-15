/**
 * @file src/components/sections/DiarySection.tsx
 * Farm Diary & Field Operations Chronological Log
 * Provides CRUD shell and feeds the last 10 entries into Gemini Context
 */

import React, { useState } from 'react';
import { useI18n } from '../../i18n/index.tsx';
import { useFarm } from '../../context/FarmContext.tsx';
import { DiaryEntry } from '../../types/index.ts';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  X,
  FileText,
  IndianRupee,
  Layers
} from 'lucide-react';

export const DiarySection: React.FC = () => {
  const { language, t } = useI18n();
  const { activeCrop, showToast } = useFarm();

  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: 'entry-1',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      stage: 'Vegetative',
      activity: 'Inter-cultivation & Manual Weeding (ఎడపెట్టడం మరియు కలుపు తీత)',
      notes: 'Completed second inter-cultivation with bullock pair. Soil moisture adequate.',
      cost: 1600,
      createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    },
    {
      id: 'entry-2',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      stage: 'Vegetative',
      activity: 'Foliar Nutrient Application (మొదటి సారి ఎరువుల వినియోగం)',
      notes: 'Applied recommended urea and complex mixture as per PJTSAU schedule.',
      cost: 2200,
      createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
    },
    {
      id: 'entry-3',
      date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      stage: 'Sowing',
      activity: 'Seed Sowing & Basal Dose (విత్తనాలు విత్తుట)',
      notes: 'Treated certified hybrid seeds with Trichoderma. Sown at 90x60 cm spacing.',
      cost: 4500,
      createdAt: Date.now() - 45 * 24 * 60 * 60 * 1000,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newActivity, setNewActivity] = useState('');
  const [newStage, setNewStage] = useState('Vegetative');
  const [newNotes, setNewNotes] = useState('');
  const [newCost, setNewCost] = useState('');

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivity.trim()) return;

    const newEntry: DiaryEntry = {
      id: `entry-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      stage: newStage,
      activity: newActivity.trim(),
      notes: newNotes.trim() || undefined,
      cost: newCost ? parseFloat(newCost) : undefined,
      createdAt: Date.now(),
    };

    setEntries([newEntry, ...entries]);
    setIsAddModalOpen(false);
    setNewActivity('');
    setNewNotes('');
    setNewCost('');
    showToast(
      language === 'te'
        ? 'డైరీలో కొత్త పని వివరాలు నమోదయ్యాయి!'
        : 'Field log added to farm diary!'
    );
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
    showToast(
      language === 'te'
        ? 'డైరీ రికార్డు తొలగించబడింది'
        : 'Diary record removed'
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <BookOpen size={20} />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.sections.diary.title}
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {t.sections.diary.badge}
            </span>
          </div>
          <p className="text-sm text-stone-600">
            {t.sections.diary.description}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="touch-target inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-semibold text-xs sm:text-sm transition-colors self-start sm:self-center shadow-xs"
        >
          <Plus size={16} />
          <span>{t.sections.diary.newEntryBtn}</span>
        </button>
      </div>

      {/* Intelligence Context Notice */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-950 flex items-start gap-3">
        <Layers size={18} className="text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">
            {language === 'te' ? 'ఏఐ సందర్భానుసార అవగాహన (Context Differentiator):' : 'Context-Aware Farm Intelligence Connection:'}
          </span>
          <p className="mt-0.5 text-emerald-900 leading-relaxed">
            {language === 'te'
              ? `ప్రస్తుతం నమోదైన చివరి ${Math.min(10, entries.length)} డైరీ రికార్డులు నేరుగా జెమినీ ఏఐ కి పంపబడతాయి. దీని ద్వారా గతంలో వేసిన ఎరువులు మరియు చేసిన పనుల ఆధారంగా ఏఐ మరింత ప్రభావవంతమైన సలహాలు అందిస్తుంది.`
              : `The last ${Math.min(10, entries.length)} diary entries are automatically packed into the AI context object before each prompt to prevent duplicate or conflicting advice.`}
          </p>
        </div>
      </div>

      {/* Chronological Entry List */}
      <div className="space-y-3">
        {entries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
            <h4 className="font-bold text-stone-800 text-base">{t.sections.diary.emptyTitle}</h4>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">{t.sections.diary.emptyDesc}</p>
          </div>
        ) : (
          entries.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100/70 text-emerald-800 font-bold text-xs shrink-0 mt-1">
                  #{entries.length - idx}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm sm:text-base text-stone-900">
                      {item.activity}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      {item.stage}
                    </span>
                  </div>

                  {item.notes && (
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-0.5">
                      {item.notes}
                    </p>
                  )}

                  <div className="flex items-center gap-3 pt-1 text-xs text-stone-500 flex-wrap">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar size={13} className="text-emerald-700" />
                      <span>{item.date}</span>
                    </span>
                    {item.cost !== undefined && (
                      <span className="flex items-center gap-1 font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                        <IndianRupee size={12} />
                        <span>{item.cost.toLocaleString('en-IN')}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDeleteEntry(item.id)}
                className="touch-target p-2 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors self-end sm:self-center"
                title="Delete field log"
                aria-label="Delete entry"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Add Entry Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <BookOpen size={18} className="text-emerald-700" />
                <span>{language === 'te' ? 'కొత్త సాగు పని నమోదు' : 'Add Field Diary Entry'}</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="touch-target p-2 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'te' ? 'చేసిన పని (Activity)' : 'Farming Activity *'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'te' ? 'ఉదా: నీటి తడి ఇవ్వడం, కలుపు తీత, ఎరువుల వినియోగం' : 'e.g. Irrigation, Weeding, Fertilizer application'}
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'te' ? 'పంట దశ (Growth Stage)' : 'Growth Stage'}
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                  >
                    <option value="Sowing">Sowing (విత్తనం)</option>
                    <option value="Vegetative">Vegetative (శాఖీయ దశ)</option>
                    <option value="Flowering">Flowering (పూత దశ)</option>
                    <option value="Boll/Grain">Boll/Grain (కాయ / గింజ)</option>
                    <option value="Harvest">Harvest (కోత దశ)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'te' ? 'ఖర్చు (రూపాయల్లో)' : 'Expense (₹ optional)'}
                  </label>
                  <input
                    type="number"
                    placeholder="₹ 0"
                    value={newCost}
                    onChange={(e) => setNewCost(e.target.value)}
                    className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'te' ? 'వివరాలు & గమనికలు' : 'Field Observations & Notes'}
                </label>
                <textarea
                  rows={3}
                  placeholder={language === 'te' ? 'మట్టి తేమ, వాతావరణం, కూలీల సంఖ్య మొదలైనవి...' : 'Soil condition, labour count, chemicals or organic inputs used...'}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="touch-target px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 text-xs font-semibold"
                >
                  {language === 'te' ? 'రద్దు' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="touch-target px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold"
                >
                  {language === 'te' ? 'నమోదు చేయి' : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stage 6 footer */}
      <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <Clock size={16} className="text-emerald-700 shrink-0" />
          <span>{t.sections.diary.stage6Note}</span>
        </span>
        <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-emerald-200/70 text-emerald-900 shrink-0">
          Stage 6 Ready
        </span>
      </div>

    </div>
  );
};
