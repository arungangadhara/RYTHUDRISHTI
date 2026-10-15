/**
 * @file src/components/sections/ExpensesSection.tsx
 * Farm Expense Tracker Shell
 * Prepares categories (seed, fertilizer, labour, irrigation, transport, other), totals, revenue, and profit/loss
 */

import React, { useState } from 'react';
import { useI18n } from '../../i18n/index.tsx';
import { useFarm } from '../../context/FarmContext.tsx';
import { ExpenseItem } from '../../types/index.ts';
import { 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Trash2, 
  PieChart, 
  Clock, 
  CheckCircle2, 
  X,
  AlertCircle
} from 'lucide-react';

export const ExpensesSection: React.FC = () => {
  const { language, t } = useI18n();
  const { activeCrop, showToast } = useFarm();

  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: 'exp-1', date: '2026-06-15', category: 'seed', description: 'Certified Hybrid Cotton Seeds (4 packets)', amount: 3400, recordedBy: 'Farmer' },
    { id: 'exp-2', date: '2026-06-20', category: 'labour', description: 'Tractor Ploughing & Land Levelling', amount: 4800, recordedBy: 'Farmer' },
    { id: 'exp-3', date: '2026-07-02', category: 'fertilizer', description: 'DAP & Complex Fertilizers (Basal application)', amount: 5600, recordedBy: 'Farmer' },
    { id: 'exp-4', date: '2026-07-18', category: 'labour', description: 'Manual Weeding (4 workers x 2 days)', amount: 3200, recordedBy: 'Farmer' },
    { id: 'exp-5', date: '2026-08-01', category: 'irrigation', description: 'Borewell pump electricity & line maintenance', amount: 1500, recordedBy: 'Farmer' },
  ]);

  const [recordedRevenue, setRecordedRevenue] = useState<number>(45000); // Sample projected/recorded cotton yield sales
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<ExpenseItem['category']>('fertilizer');
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const netBalance = recordedRevenue - totalExpense;

  const categoryLabels: Record<ExpenseItem['category'], { en: string; te: string; color: string }> = {
    seed: { en: 'Seed', te: 'విత్తనాలు', color: 'bg-emerald-500' },
    fertilizer: { en: 'Fertilizer', te: 'ఎరువులు', color: 'bg-blue-500' },
    labour: { en: 'Labour', te: 'కూలీలు', color: 'bg-amber-500' },
    irrigation: { en: 'Irrigation', te: 'నీటి తడులు', color: 'bg-cyan-500' },
    transport: { en: 'Transport', te: 'రవాణా', color: 'bg-purple-500' },
    other: { en: 'Other', te: 'ఇతరాలు', color: 'bg-stone-500' },
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim() || !newAmount) return;

    const newItem: ExpenseItem = {
      id: `exp-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      category: newCategory,
      description: newDesc.trim(),
      amount: parseFloat(newAmount),
      recordedBy: 'Farmer',
    };

    setExpenses([newItem, ...expenses]);
    setIsAddModalOpen(false);
    setNewDesc('');
    setNewAmount('');
    showToast(
      language === 'te'
        ? `₹${newItem.amount} ఖర్చు రికార్డు నమోదు చేయబడింది`
        : `Recorded expense of ₹${newItem.amount}`
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
    showToast(language === 'te' ? 'ఖర్చు రికార్డు తొలగించబడింది' : 'Expense record removed');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <IndianRupee size={20} />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.sections.expenses.title}
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {t.sections.expenses.badge}
            </span>
          </div>
          <p className="text-sm text-stone-600">
            {t.sections.expenses.description}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="touch-target inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-semibold text-xs sm:text-sm transition-colors self-start sm:self-center shadow-xs"
        >
          <Plus size={16} />
          <span>{language === 'te' ? 'ఖర్చు నమోదు చేయండి' : 'Record New Expense'}</span>
        </button>
      </div>

      {/* Summary KPI Cards (Strictly labeled as "recorded" values) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Total Expenses */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {t.sections.expenses.totalExpenses}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 flex items-baseline gap-1">
            <span>₹</span>
            <span>{totalExpense.toLocaleString('en-IN')}</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            [Recorded: {expenses.length} entries for {activeCrop.toUpperCase()}]
          </div>
        </div>

        {/* Recorded Revenue */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {t.sections.expenses.totalRevenue}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1 flex items-baseline gap-1">
            <span>₹</span>
            <span>{recordedRevenue.toLocaleString('en-IN')}</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            [Recorded: Telangana Agri Market Yard (AMMC) rate]
          </div>
        </div>

        {/* Net Profit / Loss */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center justify-between">
            <span>{t.sections.expenses.netProfit}</span>
            {netBalance >= 0 ? (
              <TrendingUp size={16} className="text-emerald-600" />
            ) : (
              <TrendingDown size={16} className="text-red-600" />
            )}
          </div>
          <div className={`text-2xl sm:text-3xl font-extrabold mt-1 flex items-baseline gap-1 ${netBalance >= 0 ? 'text-emerald-800' : 'text-red-700'}`}>
            <span>₹</span>
            <span>{netBalance.toLocaleString('en-IN')}</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {netBalance >= 0 
              ? (language === 'te' ? '[రికార్డుల ప్రకారం నికర లాభం]' : '[Recorded Net Profit]') 
              : (language === 'te' ? '[రికార్డుల ప్రకారం నష్టం]' : '[Recorded Net Deficit]')}
          </div>
        </div>

      </div>

      {/* Visual Category Distribution Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
          <PieChart size={14} className="text-emerald-700" />
          <span>{language === 'te' ? 'వర్గాల వారీగా ఖర్చుల నిష్పత్తి (Recorded Distribution)' : 'Category-wise Expenditure Breakdown'}</span>
        </h3>

        {/* Multi-segment Progress Bar */}
        <div className="w-full h-3.5 bg-stone-100 rounded-full overflow-hidden flex">
          {Object.keys(categoryLabels).map((catKey) => {
            const cat = catKey as ExpenseItem['category'];
            const catTotal = expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
            const pct = totalExpense > 0 ? (catTotal / totalExpense) * 100 : 0;
            if (pct === 0) return null;
            return (
              <div
                key={cat}
                style={{ width: `${pct}%` }}
                className={`${categoryLabels[cat].color} h-full transition-all`}
                title={`${categoryLabels[cat].en}: ₹${catTotal} (${pct.toFixed(0)}%)`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-2">
          {Object.keys(categoryLabels).map((catKey) => {
            const cat = catKey as ExpenseItem['category'];
            const catTotal = expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
            return (
              <div key={cat} className="flex items-center gap-2 text-xs text-stone-600">
                <span className={`w-2.5 h-2.5 rounded-full ${categoryLabels[cat].color} shrink-0`} />
                <div className="truncate">
                  <span className="font-medium">{language === 'te' ? categoryLabels[cat].te : categoryLabels[cat].en}</span>
                  <div className="text-[10px] text-stone-400">₹{catTotal}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-stone-200 font-bold text-sm text-stone-900">
          {language === 'te' ? 'ఖర్చుల జాబితా' : 'Recorded Expense Ledger'}
        </div>
        <div className="divide-y divide-stone-100">
          {expenses.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${categoryLabels[item.category].color}`} />
                <div>
                  <div className="text-sm font-bold text-stone-900">{item.description}</div>
                  <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span className="capitalize">{language === 'te' ? categoryLabels[item.category].te : categoryLabels[item.category].en}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-sm sm:text-base text-stone-900">
                  ₹{item.amount.toLocaleString('en-IN')}
                </span>
                <button
                  onClick={() => handleDeleteExpense(item.id)}
                  className="touch-target p-2 text-stone-400 hover:text-red-600 rounded-lg"
                  title="Remove expense"
                  aria-label="Remove expense"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-bold text-stone-900 text-base">
                {language === 'te' ? 'వ్యవసాయ ఖర్చు నమోదు' : 'Record Farm Expense'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="touch-target p-2 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'te' ? 'ఖర్చు వర్గం (Category)' : 'Category'}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ExpenseItem['category'])}
                  className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm font-semibold"
                >
                  <option value="seed">Seed (విత్తనాలు)</option>
                  <option value="fertilizer">Fertilizer (ఎరువులు)</option>
                  <option value="labour">Labour (కూలీలు / యంత్రాలు)</option>
                  <option value="irrigation">Irrigation (నీటి తడులు)</option>
                  <option value="transport">Transport (రవాణా / మార్కెట్)</option>
                  <option value="other">Other (ఇతరాలు)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'te' ? 'వివరాలు (Description)' : 'Description'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'te' ? 'ఉదా: యూరియా బస్తా, ట్రాక్టర్ అద్దె' : 'e.g. Urea bag, tractor rental'}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'te' ? 'మొత్తం (₹ Amount)' : 'Amount (₹)'}
                </label>
                <input
                  type="number"
                  placeholder="0"
                  min="1"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full touch-target px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl text-sm"
                  required
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
                  {language === 'te' ? 'నమోదు చేయి' : 'Save Expense'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stage 7 note */}
      <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <Clock size={16} className="text-emerald-700 shrink-0" />
          <span>{t.sections.expenses.stage7Note}</span>
        </span>
        <span className="text-[11px] font-bold px-2 py-1 rounded-md bg-emerald-200/70 text-emerald-900 shrink-0">
          Stage 7 Ready
        </span>
      </div>

    </div>
  );
};
