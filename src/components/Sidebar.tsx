import React from 'react';
import { 
  Home, 
  UserCircle, 
  GraduationCap, 
  ShieldCheck, 
  UserPlus, 
  BarChart3, 
  BookOpen, 
  HandMetal, 
  CalendarCheck, 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Languages, 
  LogOut 
} from 'lucide-react';
import { Language, UserRole, MenuItem } from '../types';
import { cn } from '../lib/utils'; // I will create this utility

interface SidebarProps {
  lang: Language;
  role: UserRole;
  activeId: string;
  setActiveId: (id: string) => void;
  setLang: (lang: Language) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: { ur: 'ہوم', en: 'Home' }, icon: <Home size={20} />, roles: ['admin', 'student'] },
  { id: 'profiles', label: { ur: 'پروفائلز', en: 'Profiles' }, icon: <UserCircle size={20} />, roles: ['admin', 'student'] },
  { id: 'student-login', label: { ur: 'طالب علم لاگ ان', en: 'Student Login' }, icon: <GraduationCap size={20} />, roles: ['admin', 'student'] },
  { id: 'admin-login', label: { ur: 'ایڈمن لاگ ان', en: 'Admin Login' }, icon: <ShieldCheck size={20} />, roles: ['admin', 'student'] },
  { id: 'registration', label: { ur: 'طالب علم رجسٹریشن', en: 'Student Registration' }, icon: <UserPlus size={20} />, roles: ['admin'] },
  { id: 'reports', label: { ur: 'رپورٹس', en: 'Reports' }, icon: <BarChart3 size={20} />, roles: ['admin', 'student'] },
  { id: 'lesson-entry', label: { ur: 'اسباق اندراج', en: 'Lesson Entry' }, icon: <BookOpen size={20} />, roles: ['admin'] },
  { id: 'prayer-record', label: { ur: 'نماز ریکارڈ', en: 'Prayer Record' }, icon: <HandMetal size={20} />, roles: ['admin'] },
  { id: 'attendance', label: { ur: 'حاضری', en: 'Attendance' }, icon: <CalendarCheck size={20} />, roles: ['admin'] },
  { id: 'income', label: { ur: 'آمدن', en: 'Income' }, icon: <TrendingUp size={20} />, roles: ['admin'] },
  { id: 'expense', label: { ur: 'خرچ', en: 'Expense' }, icon: <TrendingDown size={20} />, roles: ['admin'] },
  { id: 'finance-reports', label: { ur: 'فنانس رپورٹ', en: 'Finance Reports' }, icon: <FileText size={20} />, roles: ['admin'] },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  lang, 
  role, 
  activeId, 
  setActiveId, 
  setLang, 
  onLogout,
  isOpen,
  setIsOpen
}) => {
  const filteredNav = menuItems.filter(item => {
    if (!role) return ['home', 'student-login', 'admin-login'].includes(item.id);
    if (role === 'student') return ['home', 'profiles', 'reports'].includes(item.id);
    return item.roles.includes('admin');
  });

  const isUrdu = lang === 'ur';

  return (
    <aside 
      className={cn(
        "fixed top-0 bottom-0 z-50 bg-jamia-green-900 text-white transition-all duration-300 flex flex-col shadow-2xl",
        isUrdu ? "right-0 border-l-4 border-jamia-gold" : "left-0 border-r-4 border-jamia-gold",
        isOpen ? "w-[260px]" : "w-0 md:w-20 overflow-hidden"
      )}
    >
      <div className="p-6 border-b border-white/10 shrink-0 text-center">
        <h1 className={cn(
          "font-black text-xl tracking-widest uppercase",
          isUrdu && "font-urdu"
        )}>
          {isOpen ? (isUrdu ? 'جامعہ پورٹل' : 'Jamia Portal') : 'JN'}
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 no-scrollbar">
        {filteredNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={cn(
              "w-full flex items-center px-6 py-3 transition-all hover:bg-jamia-green-800 text-sm font-medium border-b border-white/5",
              activeId === item.id 
                ? "bg-jamia-green-600" 
                : "bg-transparent",
              isUrdu 
                ? cn("flex-row-reverse text-right", activeId === item.id && "border-r-4 border-r-jamia-gold") 
                : cn("flex-row text-left", activeId === item.id && "border-l-4 border-l-jamia-gold")
            )}
          >
            <span className={cn(isUrdu ? "ml-0" : "mr-4", activeId === item.id ? "text-jamia-gold" : "text-jamia-green-100")}>
              {item.icon}
            </span>
            {isOpen && <span className={cn(isUrdu && "font-urdu mr-4 ml-0")}>{item.label[lang]}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-jamia-green-800 shrink-0 space-y-2">
        <button
          onClick={() => setLang(isUrdu ? 'en' : 'ur')}
          className={cn(
            "w-full flex items-center px-4 py-2 rounded-lg bg-jamia-green-800 hover:bg-jamia-green-700 transition-all text-xs font-bold uppercase tracking-wider",
            isUrdu && "flex-row-reverse text-right"
          )}
        >
          <Languages size={16} className={isUrdu ? "ml-2" : "mr-2"} />
          {isOpen && (isUrdu ? 'English' : 'اردو')}
        </button>

        {role && (
          <button
            onClick={onLogout}
            className={cn(
              "w-full flex items-center px-4 py-2 rounded-lg bg-red-900/50 hover:bg-red-900 transition-all text-xs font-bold uppercase tracking-wider",
              isUrdu && "flex-row-reverse text-right"
            )}
          >
            <LogOut size={16} className={isUrdu ? "ml-2" : "mr-2"} />
            {isOpen && (isUrdu ? 'لاگ آؤٹ' : 'Logout')}
          </button>
        )}
      </div>
    </aside>
  );
};
