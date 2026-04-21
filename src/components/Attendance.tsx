import React, { useState } from 'react';
import { Language } from '../types';
import { cn } from '../lib/utils';
import { Calendar, Save, Check, X, User } from 'lucide-react';
import { motion } from 'motion/react';

interface AttendanceProps {
  lang: Language;
}

type AttendanceStatus = 'present' | 'absent' | 'leave';

const mockStudents = [
  { id: '1', name: 'Muhammad Ahmed', rollNo: '101' },
  { id: '2', name: 'Abdullah Khan', rollNo: '102' },
  { id: '3', name: 'Zohaib Hassan', rollNo: '103' },
  { id: '4', name: 'Umar Farooq', rollNo: '104' },
  { id: '5', name: 'Bilal Raza', rollNo: '105' },
];

export const Attendance: React.FC<AttendanceProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>(
    Object.fromEntries(mockStudents.map(s => [s.id, 'present']))
  );
  const [saving, setSaving] = useState(false);

  const toggleStatus = (id: string, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert(isUrdu ? 'حاضری محفوظ ہو گئی ہے' : 'Attendance has been saved');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className={cn("flex flex-col md:flex-row justify-between items-start md:items-center gap-6", isUrdu && "md:flex-row-reverse")}>
        <div>
          <h2 className={cn("text-3xl font-bold text-jamia-green-900 mb-2", isUrdu && "font-urdu text-4xl")}>
            {isUrdu ? 'روزانہ حاضری' : 'Daily Attendance'}
          </h2>
          <p className={cn("text-gray-500", isUrdu && "font-urdu text-lg")}>
            {isUrdu ? 'تمام طلبہ کی حاضری یہاں درج کریں' : 'Record attendance for all students here'}
          </p>
        </div>

        <div className={cn("flex items-center bg-white p-3 rounded-2xl shadow-sm border border-gray-100", isUrdu && "flex-row-reverse")}>
          <Calendar size={20} className={cn("text-jamia-green-600", isUrdu ? "ml-3" : "mr-3")} />
          <input 
            type="date" 
            value={date}
            onChange={e => setDate(e.target.value)}
            className="outline-none font-bold text-gray-700 cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100">
        <div className={cn(
          "grid grid-cols-4 bg-jamia-green-900 text-white p-6 font-bold uppercase tracking-wider text-xs",
          isUrdu && "grid-cols-4 text-right flex-row-reverse space-x-reverse"
        )}>
          <div className="col-span-1">{isUrdu ? 'رول نمبر' : 'Roll No'}</div>
          <div className="col-span-2">{isUrdu ? 'طالب علم' : 'Student Name'}</div>
          <div className="col-span-1 text-center">{isUrdu ? 'حاضری' : 'Status'}</div>
        </div>

        <div className="divide-y divide-gray-100">
          {mockStudents.map((student) => (
            <div 
              key={student.id}
              className={cn(
                "grid grid-cols-4 p-6 items-center hover:bg-gray-50 transition-colors",
                isUrdu && "text-right flex-row-reverse space-x-reverse"
              )}
            >
              <div className="col-span-1 font-mono font-bold text-jamia-green-700">
                #{student.rollNo}
              </div>
              <div className="col-span-2 flex items-center gap-4">
                <div className="w-10 h-10 bg-jamia-green-50 rounded-full flex items-center justify-center text-jamia-green-600">
                  <User size={20} />
                </div>
                <span className="font-bold text-gray-900">{student.name}</span>
              </div>
              <div className="col-span-1 flex justify-center gap-2">
                {(['present', 'absent', 'leave'] as AttendanceStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => toggleStatus(student.id, status)}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                      attendance[student.id] === status 
                        ? (status === 'present' ? "bg-green-600 text-white shadow-lg shadow-green-600/30" 
                           : status === 'absent' ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                           : "bg-jamia-gold text-white shadow-lg shadow-jamia-gold/30")
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    )}
                    title={status}
                  >
                    {status === 'present' ? <Check size={18} /> : status === 'absent' ? <X size={18} /> : <span className="text-sm font-bold">L</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={cn("flex pt-4", isUrdu ? "justify-start" : "justify-end")}>
        <button
          onClick={handleSave}
          disabled={saving}
          className={cn(
            "px-12 py-4 rounded-2xl font-bold bg-jamia-green-700 text-white shadow-xl shadow-jamia-green-700/20 hover:bg-jamia-green-800 transition-all flex items-center space-x-3",
            isUrdu && "flex-row-reverse space-x-reverse font-urdu text-xl"
          )}
        >
          {saving ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={24} />
              <span>{isUrdu ? 'حاضری محفوظ کریں' : 'Save Attendance'}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
