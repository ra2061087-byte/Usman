import React, { useState } from 'react';
import { Language } from '../types';
import { cn } from '../lib/utils';
import { UserPlus, Save, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface RegistrationProps {
  lang: Language;
}

export const Registration: React.FC<RegistrationProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    rollNo: '',
    studentClass: '',
    phone: '',
    address: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setFormData({
        fullName: '',
        fatherName: '',
        rollNo: '',
        studentClass: '',
        phone: '',
        address: '',
        email: '',
        password: ''
      });
    }, 1500);
  };

  const inputClass = cn(
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-jamia-green-600 focus:ring-4 focus:ring-jamia-green-600/10 outline-none transition-all",
    isUrdu && "text-right"
  );

  const labelClass = cn(
    "block text-sm font-bold text-gray-700 mb-2",
    isUrdu && "text-right font-urdu text-base"
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className={cn("mb-12", isUrdu && "text-right")}>
        <h2 className={cn("text-3xl font-bold text-jamia-green-900 mb-2", isUrdu && "font-urdu text-4xl")}>
          {isUrdu ? 'طالب علم رجسٹریشن' : 'Student Registration'}
        </h2>
        <p className={cn("text-gray-500", isUrdu && "font-urdu text-lg")}>
          {isUrdu ? 'نئے طالب علم کا مکمل ڈیٹا یہاں درج کریں' : 'Enter complete data for the new student here'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className={labelClass}>{isUrdu ? 'مکمل نام' : 'Full Name'}</label>
              <input 
                type="text" 
                required
                className={inputClass}
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <label className={labelClass}>{isUrdu ? 'والد کا نام' : 'Father Name'}</label>
              <input 
                type="text" 
                required
                className={inputClass}
                value={formData.fatherName}
                onChange={e => setFormData({...formData, fatherName: e.target.value})}
              />
            </div>
            <div>
              <label className={labelClass}>{isUrdu ? 'رول نمبر' : 'Roll Number'}</label>
              <input 
                type="text" 
                required
                className={inputClass}
                value={formData.rollNo}
                onChange={e => setFormData({...formData, rollNo: e.target.value})}
              />
            </div>
            <div>
              <label className={labelClass}>{isUrdu ? 'کلاس / درجہ' : 'Class / Grade'}</label>
              <input 
                type="text" 
                required
                className={inputClass}
                value={formData.studentClass}
                onChange={e => setFormData({...formData, studentClass: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className={labelClass}>{isUrdu ? 'لاگ ان ای میل' : 'Login Email'}</label>
              <input 
                type="email" 
                required
                className={inputClass}
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="student@jamia.com"
              />
            </div>
            <div>
              <label className={labelClass}>{isUrdu ? 'پاس ورڈ' : 'Password'}</label>
              <input 
                type="password" 
                required
                className={inputClass}
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div>
              <label className={labelClass}>{isUrdu ? 'فون نمبر' : 'Phone Number'}</label>
              <input 
                type="tel" 
                required
                className={inputClass}
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className={labelClass}>{isUrdu ? 'پتہ' : 'Address'}</label>
              <textarea 
                className={cn(inputClass, "h-24 resize-none")}
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className={cn("flex pt-8", isUrdu ? "justify-start" : "justify-end")}>
          <button
            type="submit"
            disabled={loading}
            className={cn(
              "px-12 py-4 rounded-2xl font-bold bg-jamia-green-700 text-white shadow-xl shadow-jamia-green-700/20 hover:bg-jamia-green-800 transition-all flex items-center space-x-3",
              isUrdu && "flex-row-reverse space-x-reverse font-urdu text-xl",
              success && "bg-green-500 shadow-green-500/20"
            )}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : success ? (
              <>
                <CheckCircle2 size={24} />
                <span>{isUrdu ? 'محفوظ ہو گیا!' : 'Saved Successfully!'}</span>
              </>
            ) : (
              <>
                <UserPlus size={24} />
                <span>{isUrdu ? 'رجسٹریشن مکمل کریں' : 'Complete Registration'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
