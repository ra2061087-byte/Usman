import React from 'react';
import { Language } from '../types';

interface PlaceholderProps {
  title: { en: string; ur: string };
  lang: Language;
}

export const PlaceholderPane: React.FC<PlaceholderProps> = ({ title, lang }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
    <div className="w-24 h-24 bg-jamia-green-50 rounded-full flex items-center justify-center mb-6 text-jamia-green-600">
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    </div>
    <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${lang === 'ur' ? 'font-urdu' : ''}`}>
      {title[lang]}
    </h2>
    <p className={`text-gray-500 max-w-md ${lang === 'ur' ? 'font-urdu' : ''}`}>
      {lang === 'ur' 
        ? 'اس سیکشن کا ڈیٹا جلد اپ ڈیٹ کر دیا جائے گا۔ براہ کرم انتظار کریں۔' 
        : 'The data for this section will be updated soon. Please check back later.'}
    </p>
  </div>
);
