import React, { useState } from 'react';
import { Language } from '../types';
import { cn } from '../lib/utils';
import { BookOpen, Search, Save, History, GraduationCap } from 'lucide-react';

interface LessonEntryProps {
  lang: Language;
}

const mockStudents = [
  { id: '1', name: 'Muhammad Ahmed', rollNo: '101' },
  { id: '2', name: 'Abdullah Khan', rollNo: '102' },
  { id: '3', name: 'Zohaib Hassan', rollNo: '103' },
];

export const LessonEntry: React.FC<LessonEntryProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sabaq: '',
    sabqi: '',
    manzil: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(isUrdu ? 'سبق محفوظ ہو گیا!' : 'Lesson entry saved!');
      setFormData({ sabaq: '', sabqi: '', manzil: '', notes: '' });
      setSelectedStudent('');
    }, 1000);
  };

  const inputClass = cn(
    "w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-jamia-green-600 outline-none bg-gray-50 transition-all",
    isUrdu && "text-right"
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className={cn("text-left", isUrdu && "text-right")}>
        <h2 className={cn("text-3xl font-bold text-jamia-green-900 mb-2", isUrdu && "font-urdu text-4xl")}>
          {isUrdu ? 'اسباق اندراج' : 'Daily Lesson Entry'}
        </h2>
        <p className={cn("text-gray-500", isUrdu && "font-urdu text-lg")}>
          {isUrdu ? 'روزانہ اسباق، سبقی اور منزل کا ریکارڈ یہاں درج کریں' : 'Record daily progress for Sabaq, Sabqi, and Manzil here'}
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-jamia-green-900/5 border border-jamia-green-50">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <label className={cn("block text-sm font-bold text-gray-700 mb-3", isUrdu && "text-right font-urdu text-lg")}>
              {isUrdu ? 'طالب علم منتخب کریں' : 'Select Student'}
            </label>
            <div className="relative group">
              <select 
                value={selectedStudent}
                onChange={e => setSelectedStudent(e.target.value)}
                required
                className={cn(
                  "w-full px-6 py-4 rounded-2xl border border-gray-200 focus:border-jamia-green-600 outline-none appearance-none bg-gray-50 font-bold text-gray-700",
                  isUrdu && "text-right pr-12"
                )}
              >
                <option value="">{isUrdu ? 'منتخب کریں' : 'Choose Student'}</option>
                {mockStudents.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.rollNo})</option>
                ))}
              </select>
              <div className={cn("absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-jamia-green-600 transition-colors", isUrdu ? "right-4" : "right-4")}>
                <GraduationCap size={20} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className={cn("block text-xs uppercase tracking-widest font-black text-jamia-green-700 mb-1", isUrdu && "text-right font-urdu text-sm")}>
                {isUrdu ? 'نیا سبق (Sabaq)' : 'New Lesson (Sabaq)'}
              </label>
              <input 
                type="text" 
                className={inputClass}
                value={formData.sabaq}
                onChange={e => setFormData({...formData, sabaq: e.target.value})}
                placeholder={isUrdu ? 'پارہ / سورۃ / آیت' : 'Para / Surah / Ayah'}
              />
            </div>
            <div className="space-y-2">
              <label className={cn("block text-xs uppercase tracking-widest font-black text-blue-700 mb-1", isUrdu && "text-right font-urdu text-sm")}>
                {isUrdu ? 'سبقی (Sabqi)' : 'Recent Revision (Sabqi)'}
              </label>
              <input 
                type="text" 
                className={inputClass}
                value={formData.sabqi}
                onChange={e => setFormData({...formData, sabqi: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className={cn("block text-xs uppercase tracking-widest font-black text-amber-600 mb-1", isUrdu && "text-right font-urdu text-sm")}>
                {isUrdu ? 'منزل (Manzil)' : 'Old Revision (Manzil)'}
              </label>
              <input 
                type="text" 
                className={inputClass}
                value={formData.manzil}
                onChange={e => setFormData({...formData, manzil: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className={cn("block text-sm font-bold text-gray-700 mb-3", isUrdu && "text-right font-urdu text-lg")}>
              {isUrdu ? 'کیفیت / استاد کا نوٹ' : 'Remarks / Teacher\'s Note'}
            </label>
            <textarea 
              className={cn(inputClass, "h-32 resize-none")}
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-5 rounded-2xl font-bold text-xl text-white bg-jamia-green-700 shadow-xl shadow-jamia-green-700/20 hover:bg-jamia-green-800 transition-all flex items-center justify-center space-x-3",
              isUrdu && "flex-row-reverse space-x-reverse font-urdu text-2xl"
            )}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={24} />
                <span>{isUrdu ? 'ریکارڈ محفوظ کریں' : 'Save Record'}</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
