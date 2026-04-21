import React, { useState } from 'react';
import { Language } from '../types';
import { cn } from '../lib/utils';
import { Moon, Sun, Sunrise, Sunset, Save, User, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface PrayerRecordProps {
  lang: Language;
}

const mockStudents = [
  { id: '1', name: 'Muhammad Ahmed', rollNo: '101' },
  { id: '2', name: 'Abdullah Khan', rollNo: '102' },
  { id: '3', name: 'Zohaib Hassan', rollNo: '103' },
];

const prayers = [
  { id: 'fajr', name: { en: 'Fajr', ur: 'فجر' }, icon: <Sunrise size={20} /> },
  { id: 'zuhr', name: { en: 'Zuhr', ur: 'ظہر' }, icon: <Sun size={20} /> },
  { id: 'asr', name: { en: 'Asr', ur: 'عصر' }, icon: <Sun size={20} /> },
  { id: 'maghrib', name: { en: 'Maghrib', ur: 'مغرب' }, icon: <Sunset size={20} /> },
  { id: 'isha', name: { en: 'Isha', ur: 'عشاء' }, icon: <Moon size={20} /> },
  { id: 'tahajjud', name: { en: 'Tahajjud', ur: 'تہجد' }, icon: <Moon size={20} /> },
];

export const PrayerRecord: React.FC<PrayerRecordProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [selectedStudent, setSelectedStudent] = useState('');
  const [completedPrayers, setCompletedPrayers] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const togglePrayer = (id: string) => {
    setCompletedPrayers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    if (!selectedStudent) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(isUrdu ? 'نماز ریکارڈ محفوظ ہو گیا!' : 'Prayer record saved!');
      setSelectedStudent('');
      setCompletedPrayers({});
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className={cn("text-left", isUrdu && "text-right")}>
        <h2 className={cn("text-3xl font-bold text-jamia-green-900 mb-2", isUrdu && "font-urdu text-4xl")}>
          {isUrdu ? 'نماز ریکارڈ' : 'Prayer Record'}
        </h2>
        <p className={cn("text-gray-500", isUrdu && "font-urdu text-lg")}>
          {isUrdu ? 'طلبہ کی نمازوں کی ادائیگی کا ریکارڈ یہاں درج کریں' : 'Record students\' prayer attendance here'}
        </p>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-blue-50">
        <div className="space-y-10">
          <div className="space-y-4">
            <label className={cn("block text-sm font-bold text-gray-700", isUrdu && "text-right font-urdu text-lg")}>
              {isUrdu ? 'طالب علم منتخب کریں' : 'Select Student'}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockStudents.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStudent(s.id)}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all flex items-center justify-between group",
                    selectedStudent === s.id 
                      ? "border-jamia-green-600 bg-jamia-green-50 text-jamia-green-900" 
                      : "border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200",
                    isUrdu && "flex-row-reverse"
                  )}
                >
                  <div className={cn("flex flex-col", isUrdu && "text-right")}>
                    <span className="font-bold">{s.name}</span>
                    <span className="text-xs opacity-60">Roll #{s.rollNo}</span>
                  </div>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    selectedStudent === s.id ? "bg-jamia-green-600 text-white" : "bg-gray-200 text-gray-400 group-hover:bg-gray-300"
                  )}>
                    <User size={16} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {prayers.map((prayer) => (
              <button
                key={prayer.id}
                onClick={() => togglePrayer(prayer.id)}
                className={cn(
                  "relative h-32 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center justify-center space-y-3 overflow-hidden group",
                  completedPrayers[prayer.id] 
                    ? "border-blue-600 bg-blue-50 text-blue-900 shadow-lg shadow-blue-600/10" 
                    : "border-gray-100 bg-gray-50 text-gray-400 grayscale hover:grayscale-0 hover:border-gray-200"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                  completedPrayers[prayer.id] ? "bg-blue-600 text-white scale-110" : "bg-white text-gray-400 group-hover:scale-110"
                )}>
                  {completedPrayers[prayer.id] ? <CheckCircle2 size={24} /> : prayer.icon}
                </div>
                <span className={cn("font-bold text-lg", isUrdu && "font-urdu text-xl")}>
                  {prayer.name[lang]}
                </span>
                
                {completedPrayers[prayer.id] && (
                  <motion.div 
                    layoutId="tick"
                    className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={loading || !selectedStudent}
            className={cn(
              "w-full py-5 rounded-3xl font-bold text-xl text-white bg-blue-700 shadow-xl shadow-blue-700/20 hover:bg-blue-800 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:grayscale",
              isUrdu && "flex-row-reverse space-x-reverse font-urdu text-2xl"
            )}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={24} />
                <span>{isUrdu ? 'ریکارڈ محفوظ کریں' : 'Save Prayer Log'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
