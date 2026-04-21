import React from 'react';
import { Language } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface HomeScreenProps {
  lang: Language;
}

const profiles = [
  { 
    id: 'zair', 
    name: { en: 'Zair-e-Nigrani', ur: 'زیرِ نگرانی' }, 
    img: 'https://i.ibb.co/VpkfH8Q/zair.jpg',
    role: { en: 'Patron', ur: 'سرپرستِ اعلیٰ' }
  },
  { 
    id: 'faizan', 
    name: { en: 'Faizan Nazar', ur: 'فیضانِ نظر' }, 
    img: 'https://i.ibb.co/zH9P8fV/faizan.jpg',
    role: { en: 'Principal', ur: 'مہتمم' },
    highlight: true
  },
  { 
    id: 'moallim', 
    name: { en: 'Moallim', ur: 'معلم' }, 
    img: 'https://share.google/78LVaG0Z0Ja8bYIQk',
    role: { en: 'Teacher', ur: 'مدرس' }
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  return (
    <div className="flex flex-col items-center text-center max-w-5xl mx-auto py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-urdu text-jamia-green-900 font-bold mb-2">
          بِسْمِ اللہِ الرَّحْمٰنِ الرَّحِیْمِ
        </h2>
        <h1 className="text-4xl md:text-5xl font-urdu font-black text-[#111827] tracking-tight">
          جامعہ نقشبندیہ باروی رضویہ
        </h1>
        <p className="text-lg md:text-xl font-urdu text-[#6b7280]">
          چک نمبر 109 گ ب بجاجانوالہ جڑانوالہ فیصل آباد
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 w-full max-w-[900px] px-4">
        {profiles.map((p, idx) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "flex flex-col items-center p-8 bg-white border border-[#e5e7eb] rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-jamia-gold",
              p.highlight && "bg-[#f0fdf4] border-jamia-green-900/10"
            )}
          >
            <div className={cn(
              "w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-jamia-green-900 mb-4 transition-all duration-500",
              p.highlight && "border-jamia-gold"
            )}>
              <img 
                src={p.img} 
                alt={p.name.en} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#111827]">
                {p.name.ur}
              </h3>
              <p className="text-sm font-semibold text-jamia-green-600 uppercase tracking-widest">
                {p.name.en}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 p-8 bg-jamia-green-50 rounded-3xl border border-jamia-green-100 max-w-2xl w-full text-left relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-jamia-green-100 rounded-bl-full opacity-50 -mr-16 -mt-16 transition-all group-hover:scale-150 duration-700" />
        <p className={cn(
          "relative z-10 text-lg leading-relaxed text-jamia-green-900",
          isUrdu && "font-urdu text-right"
        )}>
          {isUrdu 
            ? 'جامعہ نقشبندیہ باروی رضویہ میں آپ کا خیر مقدم ہے۔ یہ پورٹل جامعہ کے نظام کو بہتر بنانے اور طلبہ کی بہترین تعلیم و تربیت کے لیے ڈیزائن کیا گیا ہے۔' 
            : 'Welcome to Jamia Naqshbandia Barvi Rizvia. This portal is designed to improve the management of the Jamia and provide the best education and training for students.'}
        </p>
      </div>
    </div>
  );
};
