/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { HomeScreen } from './components/HomeScreen';
import { PlaceholderPane } from './components/PlaceholderPane';
import { Profiles } from './components/Profiles';
import { Registration } from './components/Registration';
import { Attendance } from './components/Attendance';
import { Finance } from './components/Finance';
import { LessonEntry } from './components/LessonEntry';
import { PrayerRecord } from './components/PrayerRecord';
import { Language, UserRole } from './types';
import { cn } from './lib/utils';
import { Menu, X } from 'lucide-react';
import { 
  auth 
} from './lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';

export default function App() {
  const [lang, setLang] = useState<Language>('ur');
  const [role, setRole] = useState<UserRole>(null);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // If logged in via Google and email is admin email, set role to admin
        // Note: For production, roles should be stored in Firestore 'roles' collection
        if (currentUser.email === 'ra2061087@gmail.com') {
          setRole('admin');
        } else {
          // Default to student role for any other authenticated user for demo purposes
          setRole('student');
        }
      }
    });
    return () => unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setRole(null);
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const isUrdu = lang === 'ur';

  const LoginPage = ({ type }: { type: 'admin' | 'student' }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = async () => {
      setLoading(true);
      setError('');
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        navigate('/');
      } catch (err) {
        console.error(err);
        setError(isUrdu ? 'گوگل لاگ ان میں دشواری پیش آئی۔' : 'Google login failed.');
      } finally {
        setLoading(false);
      }
    };

    const handleLogin = () => {
      if (type === 'admin') {
        if (email === 'usman@109' && password === 'Usman109') {
          setRole('admin');
          navigate('/');
        } else {
          setError(isUrdu ? 'غلط ای میل یا پاس ورڈ' : 'Invalid email or password');
        }
      } else {
        if (email.trim() && password.length >= 4) {
          setRole('student');
          navigate('/');
        } else {
          setError(isUrdu ? 'براہ کرم صحیح معلومات درج کریں' : 'Please enter valid credentials');
        }
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 text-center">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl w-full max-w-md border-t-[12px] border-jamia-green-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-jamia-green-50 rounded-bl-full -mr-16 -mt-16 opacity-50" />
          
          <h2 className={cn("text-4xl font-bold text-jamia-green-900 mb-4 relative z-10", isUrdu && "font-urdu text-5xl")}>
            {type === 'admin' ? (isUrdu ? 'ایڈمن لاگ ان' : 'Admin Login') : (isUrdu ? 'طالب علم لاگ ان' : 'Student Login')}
          </h2>
          <p className={cn("text-gray-500 mb-10 relative z-10", isUrdu && "font-urdu text-xl")}>
            {isUrdu ? 'جامعہ پورٹل میں خوش آمدید' : 'Welcome to Jamia Portal'}
          </p>

          <div className="space-y-6 relative z-10">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold">
                {error}
              </div>
            )}

            {type === 'admin' && (
              <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full h-14 flex items-center justify-center space-x-3 bg-white border border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
              >
                <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
                <span>{isUrdu ? 'گوگل سے لاگ ان کریں' : 'Login with Google'}</span>
              </button>
            )}

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">{isUrdu ? 'یا' : 'OR'}</span></div>
            </div>

            <div className="space-y-2 text-left">
              <label className={cn("block text-xs font-black uppercase tracking-widest text-gray-400 px-2", isUrdu && "text-right font-urdu text-sm")}>
                {isUrdu ? 'ای میل' : 'Email'}
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={type === 'admin' ? 'usman@109' : 'student@jamia.com'}
                className={cn("w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none", isUrdu && "text-right")} 
              />
            </div>
            <div className="space-y-2 text-left">
              <label className={cn("block text-xs font-black uppercase tracking-widest text-gray-400 px-2", isUrdu && "text-right font-urdu text-sm")}>
                {isUrdu ? 'پاس ورڈ' : 'Password'}
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={cn("w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 outline-none", isUrdu && "text-right")} 
              />
            </div>
          </div>

          <div className="h-10" />

          <button 
            onClick={handleLogin}
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
            {isUrdu ? 'جامعہ نقشبندیہ بارویہ رضویہ' : 'Jamia Naqshbandia'}
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
              <Routes>
                <Route path="/" element={<HomeScreen lang={lang} />} />
                <Route path="/profiles" element={<Profiles lang={lang} />} />
                <Route path="/login" element={<LoginPage type="student" />} />
                <Route path="/admin-login" element={<LoginPage type="admin" />} />
                
                {/* Admin Only Routes */}
                {role === 'admin' ? (
                  <>
                    <Route path="/registration" element={<Registration lang={lang} />} />
                    <Route path="/lesson-entry" element={<LessonEntry lang={lang} />} />
                    <Route path="/prayer" element={<PrayerRecord lang={lang} />} />
                    <Route path="/attendance" element={<Attendance lang={lang} />} />
                    <Route path="/income" element={<Finance lang={lang} initialMode="income" />} />
                    <Route path="/expense" element={<Finance lang={lang} initialMode="expense" />} />
                    <Route path="/finance" element={<Finance lang={lang} initialMode="income" />} />
                  </>
                ) : null}

                {/* Shared Restricted Routes */}
                <Route path="/reports" element={<PlaceholderPane lang={lang} title={{ en: 'Reports', ur: 'رپورٹس' }} />} />

                {/* 404/Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-20 mb-10 text-center text-[#9ca3af] text-sm">
            <p className={cn(isUrdu && "font-urdu text-lg")}>
              {isUrdu ? 'تعاون فرمایا: بارویہ گرافکس فیصل آباد' : 'Collaboration: Barvia Graphics Faisalabad'}
            </p>
            <p className="font-bold text-jamia-green-900 mt-1">
              Powered by Barvia Graphics Faisalabad
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
