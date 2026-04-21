/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomeScreen } from './components/HomeScreen';
import { PlaceholderPane } from './components/PlaceholderPane';
import { Registration } from './components/Registration';
import { Attendance } from './components/Attendance';
import { Finance } from './components/Finance';
import { LessonEntry } from './components/LessonEntry';
import { PrayerRecord } from './components/PrayerRecord';
import { Language, UserRole } from './types';
import { cn } from './lib/utils';
import { Menu, X } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('ur');
  const [role, setRole] = useState<UserRole>(null);
  const [activeId, setActiveId] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auto-close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    setRole(null);
    setActiveId('home');
  };

  const isUrdu = lang === 'ur';

  const renderContent = () => {
    switch (activeId) {
      case 'home':
        return <HomeScreen lang={lang} />;
      case 'profiles':
        return <PlaceholderPane lang={lang} title={{ en: 'Profiles', ur: 'پروفائلز' }} />;
      case 'student-login':
      case 'admin-login':
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 text-center">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl w-full max-w-md border-t-[12px] border-jamia-green-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-jamia-green-50 rounded-bl-full -mr-16 -mt-16 opacity-50" />
              
              <h2 className={cn("text-4xl font-bold text-jamia-green-900 mb-4 relative z-10", isUrdu && "font-urdu text-5xl")}>
                {activeId === 'admin-login' ? (isUrdu ? 'ایڈمن لاگ ان' : 'Admin Login') : (isUrdu ? 'طالب علم لاگ ان' : 'Student Login')}
              </h2>
              <p className={cn("text-gray-500 mb-10 relative z-10", isUrdu && "font-urdu text-xl")}>
                {isUrdu ? 'جامعہ پورٹل میں خوش آمدید' : 'Welcome to Jamia Portal'}
              </p>

              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className={cn("block text-xs font-black uppercase tracking-widest text-gray-400 text-left px-2", isUrdu && "text-right font-urdu text-sm")}>
                    {isUrdu ? 'ای میل' : 'Email'}
                  </label>
                  <input type="email" defaultValue="admin@jamia.com" className={cn("w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none", isUrdu && "text-right")} />
                </div>
                <div className="space-y-2">
                  <label className={cn("block text-xs font-black uppercase tracking-widest text-gray-400 text-left px-2", isUrdu && "text-right font-urdu text-sm")}>
                    {isUrdu ? 'پاس ورڈ' : 'Password'}
                  </label>
                  <input type="password" defaultValue="••••••••" className={cn("w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none", isUrdu && "text-right")} />
                </div>
              </div>

              <div className="h-10" />

              <button 
                onClick={() => {
                  setRole(activeId === 'admin-login' ? 'admin' : 'student');
                  setActiveId('home');
                }}
                className={cn(
                  "w-full bg-jamia-green-700 text-white py-5 rounded-2xl font-bold text-xl hover:bg-jamia-green-800 transition-all shadow-xl shadow-jamia-green-700/20 active:scale-95 relative z-10",
                  isUrdu && "font-urdu text-2xl"
                )}
              >
                {isUrdu ? 'لاگ ان کریں' : 'Login Now'}
              </button>
            </div>
          </div>
        );
      case 'registration':
        return <Registration lang={lang} />;
      case 'reports':
        return <PlaceholderPane lang={lang} title={{ en: 'Reports', ur: 'رپورٹس' }} />;
      case 'lesson-entry':
        return <LessonEntry lang={lang} />;
      case 'prayer-record':
        return <PrayerRecord lang={lang} />;
      case 'attendance':
        return <Attendance lang={lang} />;
      case 'income':
        return <Finance lang={lang} initialMode="income" />;
      case 'expense':
        return <Finance lang={lang} initialMode="expense" />;
      case 'finance-reports':
        return <Finance lang={lang} initialMode="income" />; // Showing shared finance view
      default:
        return <HomeScreen lang={lang} />;
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-gray-50 flex overflow-x-hidden",
      isUrdu ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Sidebar */}
      <Sidebar 
        lang={lang} 
        role={role} 
        activeId={activeId} 
        setActiveId={(id) => {
          setActiveId(id);
          if (window.innerWidth < 768) setIsSidebarOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        setLang={setLang}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Mobile Header */}
      <div className={cn(
        "fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-40 md:hidden flex items-center px-4",
        isUrdu ? "flex-row-reverse" : "flex-row"
      )}>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-jamia-green-900 bg-jamia-green-50 rounded-xl"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex-1 text-center">
          <h1 className={cn("font-bold text-jamia-green-900 truncate px-4", isUrdu && "font-urdu")}>
            {isUrdu ? 'جامعہ نقشبندیہ باروی رضویہ' : 'Jamia Naqshbandia'}
          </h1>
        </div>
      </div>

      {/* Content Area */}
      <main className={cn(
        "flex-1 min-h-screen pt-16 md:pt-0 transition-all duration-300 relative",
        isUrdu 
          ? (isSidebarOpen ? "mr-[260px]" : "mr-0 md:mr-20") 
          : (isSidebarOpen ? "ml-[260px]" : "ml-0 md:ml-20")
      )}>
        {/* Top Bar for Desktop */}
        <div className={cn(
          "hidden md:flex h-[60px] bg-white items-center justify-between px-10 shadow-[0_2px_4px_rgba(0,0,0,0.05)] sticky top-0 z-30",
          isUrdu && "flex-row-reverse"
        )}>
          <div className={cn("flex items-center gap-2", isUrdu && "flex-row-reverse")}>
            <span className="text-[#6b7280]">{isUrdu ? 'خوش آمدید،' : 'Welcome,'}</span>
            <span className="font-bold text-jamia-green-900 capitalize">{role || (isUrdu ? 'مہمان' : 'Guest')}</span>
          </div>
          <button 
            onClick={() => setLang(isUrdu ? 'en' : 'ur')}
            className={cn(
              "bg-jamia-gold text-jamia-green-900 px-4 py-1.5 rounded-full font-bold text-xs hover:bg-jamia-gold/90 transition-colors uppercase tracking-widest",
              isUrdu && "font-urdu"
            )}
          >
            {isUrdu ? 'Urdu / English' : 'English / اردو'}
          </button>
        </div>

        <div className="p-4 md:p-10">
          <div className="min-h-[80vh] relative">
            <div className="max-w-6xl mx-auto relative z-10">
              {renderContent()}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 mb-10 text-center text-[#9ca3af] text-sm">
            <p className={cn(isUrdu && "font-urdu text-lg")}>
              {isUrdu ? 'تعاون فرمایا: باروی گرافکس فیصل آباد' : 'Collaboration: Barvi Graphics Faisalabad'}
            </p>
            <p className="font-bold text-jamia-green-900 mt-1">
              Powered by Barvi Graphics Faisalabad
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
