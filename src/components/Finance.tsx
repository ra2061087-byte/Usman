import React, { useState } from 'react';
import { Language } from '../types';
import { cn } from '../lib/utils';
import { TrendingUp, TrendingDown, Save, Plus, ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

interface FinanceProps {
  lang: Language;
  initialMode: 'income' | 'expense';
}

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  note: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', type: 'income', amount: 50000, category: 'Donation', date: '2024-03-20', note: 'Monthly donation' },
  { id: '2', type: 'expense', amount: 15000, category: 'Utility', date: '2024-03-19', note: 'Electricity bill' },
  { id: '3', type: 'expense', amount: 25000, category: 'Salary', date: '2024-03-18', note: 'Staff salary' },
  { id: '4', type: 'income', amount: 12000, category: 'Fees', date: '2024-03-15', note: 'Student fees' },
];

export const Finance: React.FC<FinanceProps> = ({ lang, initialMode }) => {
  const isUrdu = lang === 'ur';
  const [mode, setMode] = useState<'income' | 'expense'>(initialMode);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);

  const totalIncome = mockTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = mockTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(isUrdu ? 'ریکارڈ محفوظ ہو گیا!' : 'Record saved successfully!');
      setAmount('');
      setCategory('');
      setNote('');
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-jamia-green-900/[0.03] border border-jamia-green-100 flex items-center justify-between group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-jamia-green-50 rounded-bl-full opacity-50 -mr-12 -mt-12 group-hover:scale-150 transition-all duration-700" />
          <div className="relative z-10">
            <p className={cn("text-gray-500 font-bold mb-2 uppercase tracking-wider text-xs", isUrdu && "font-urdu")}>
              {isUrdu ? 'کل آمدن' : 'Total Income'}
            </p>
            <h3 className="text-3xl font-black text-jamia-green-900">₨ {totalIncome.toLocaleString()}</h3>
          </div>
          <div className="p-4 bg-green-100 rounded-2xl text-green-600 relative z-10">
            <ArrowUpRight size={28} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-jamia-green-900/[0.03] border border-red-100 flex items-center justify-between group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full opacity-50 -mr-12 -mt-12 group-hover:scale-150 transition-all duration-700" />
          <div className="relative z-10">
            <p className={cn("text-gray-500 font-bold mb-2 uppercase tracking-wider text-xs", isUrdu && "font-urdu")}>
              {isUrdu ? 'کل خرچ' : 'Total Expense'}
            </p>
            <h3 className="text-3xl font-black text-red-900">₨ {totalExpense.toLocaleString()}</h3>
          </div>
          <div className="p-4 bg-red-100 rounded-2xl text-red-600 relative z-10">
            <ArrowDownLeft size={28} />
          </div>
        </div>

        <div className="bg-jamia-green-900 p-8 rounded-3xl shadow-2xl shadow-jamia-green-900/20 text-white flex items-center justify-between group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full opacity-50 -mr-12 -mt-12 group-hover:scale-150 transition-all duration-700" />
          <div className="relative z-10">
            <p className={cn("text-jamia-green-200 font-bold mb-2 uppercase tracking-wider text-xs", isUrdu && "font-urdu")}>
              {isUrdu ? 'موجودہ بیلنس' : 'Current Balance'}
            </p>
            <h3 className="text-3xl font-black text-jamia-gold">₨ {balance.toLocaleString()}</h3>
          </div>
          <div className="p-4 bg-white/10 rounded-2xl text-jamia-gold relative z-10">
            <Wallet size={28} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Entry Form */}
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 space-y-8">
          <div className={cn("flex items-center justify-between", isUrdu && "flex-row-reverse")}>
            <h3 className={cn("text-2xl font-bold text-gray-900", isUrdu && "font-urdu text-3xl")}>
              {isUrdu ? 'نئی انٹری' : 'New Entry'}
            </h3>
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setMode('income')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  mode === 'income' ? "bg-white text-jamia-green-700 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {isUrdu ? 'آمدن' : 'Income'}
              </button>
              <button 
                onClick={() => setMode('expense')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                  mode === 'expense' ? "bg-white text-red-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                )}
              >
                {isUrdu ? 'خرچ' : 'Expense'}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={cn("block text-sm font-bold text-gray-700 mb-2", isUrdu && "text-right font-urdu text-lg")}>
                {isUrdu ? 'رقم (Amount)' : 'Amount (₨)'}
              </label>
              <input 
                type="number"
                required
                className={cn("w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-jamia-green-600 focus:ring-4 focus:ring-jamia-green-600/10 outline-none text-2xl font-bold bg-gray-50 transition-all", isUrdu && "text-right")}
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div>
              <label className={cn("block text-sm font-bold text-gray-700 mb-2", isUrdu && "text-right font-urdu text-lg")}>
                {isUrdu ? 'کیٹیگری' : 'Category'}
              </label>
              <select 
                required
                className={cn("w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-jamia-green-600 outline-none bg-gray-50", isUrdu && "text-right")}
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">{isUrdu ? 'انتخاب کریں' : 'Select Category'}</option>
                {mode === 'income' ? (
                  <>
                    <option value="Donation">Donation</option>
                    <option value="Fees">Fees</option>
                    <option value="Charity">Charity</option>
                    <option value="Other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="Salary">Salary</option>
                    <option value="Utility">Utility Bills</option>
                    <option value="Food">Food / Ration</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className={cn("block text-sm font-bold text-gray-700 mb-2", isUrdu && "text-right font-urdu text-lg")}>
                {isUrdu ? 'تفصیل / نوٹ' : 'Note / Description'}
              </label>
              <input 
                type="text"
                className={cn("w-full px-6 py-4 rounded-2xl border border-gray-200 outline-none bg-gray-50", isUrdu && "text-right")}
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className={cn(
                "w-full py-5 rounded-2xl font-bold text-xl text-white shadow-xl transition-all flex items-center justify-center space-x-3",
                mode === 'income' ? "bg-jamia-green-700 shadow-jamia-green-700/20 hover:bg-jamia-green-800" : "bg-red-600 shadow-red-600/20 hover:bg-red-700",
                isUrdu && "flex-row-reverse space-x-reverse font-urdu text-2xl"
              )}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={24} />
                  <span>{isUrdu ? 'ڈیٹا محفوظ کریں' : 'Save Transaction'}</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Transaction History */}
        <div className="space-y-6">
          <div className={cn("flex items-center justify-between", isUrdu && "flex-row-reverse")}>
            <h3 className={cn("text-2xl font-bold text-gray-900", isUrdu && "font-urdu text-3xl")}>
              {isUrdu ? 'حالیہ ریکارڈز' : 'Recent Records'}
            </h3>
            <button className="text-jamia-green-700 text-sm font-bold hover:underline">
              {isUrdu ? 'تمام دیکھیں' : 'View All'}
            </button>
          </div>

          <div className="space-y-4">
            {mockTransactions.map((t) => (
              <div 
                key={t.id}
                className={cn(
                  "bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between group",
                  isUrdu && "flex-row-reverse"
                )}
              >
                <div className={cn("flex items-center gap-4", isUrdu && "flex-row-reverse")}>
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                    t.type === 'income' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                  )}>
                    {t.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                  <div className={cn(isUrdu && "text-right")}>
                    <p className="font-bold text-gray-900">{t.category}</p>
                    <p className="text-xs text-gray-400 font-mono italic">{t.date}</p>
                  </div>
                </div>
                <div className={cn("text-right", isUrdu && "text-left")}>
                  <p className={cn(
                    "text-lg font-black",
                    t.type === 'income' ? "text-green-600" : "text-red-600"
                  )}>
                    {t.type === 'income' ? '+' : '-'} ₨ {t.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">{t.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
