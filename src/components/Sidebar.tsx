import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, FaUser, FaUserGraduate, FaUserShield, FaClipboardList, 
  FaChartBar, FaBookOpen, FaMosque, FaCalendarCheck, 
  FaWallet, FaMoneyBillWave, FaFileInvoiceDollar, FaLanguage,
  FaSignOutAlt
} from 'react-icons/fa';
import { Language, UserRole } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  lang: Language;
  role: UserRole;
  setLang: (lang: Language) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface MenuItem {
  id: string;
  label: { ur: string; en: string };
  icon: React.ReactNode;
  path: string;
  roles: ('admin' | 'student')[];
}

const menuItems: MenuItem[] = [
  { id: 'home', label: { ur: 'ہوم', en: 'Home' }, icon: <FaHome />, path: '/', roles: ['admin', 'student'] },
  { id: 'profiles', label: { ur: 'پروفائلز', en: 'Profiles' }, icon: <FaUser />, path: '/profiles', roles: ['admin', 'student'] },
  { id: 'student-login', label: { ur: 'طالب علم لاگ ان', en: 'Student Login' }, icon: <FaUserGraduate />, path: '/login', roles: ['admin', 'student'] },
  { id: 'admin-login', label: { ur: 'ایڈمن لاگ ان', en: 'Admin Login' }, icon: <FaUserShield />, path: '/admin-login', roles: ['admin', 'student'] },
  { id: 'registration', label: { ur: 'طالب علم رجسٹریشن', en: 'Student Registration' }, icon: <FaClipboardList />, path: '/registration', roles: ['admin'] },
  { id: 'reports', label: { ur: 'رپورٹس', en: 'Reports' }, icon: <FaChartBar />, path: '/reports', roles: ['admin', 'student'] },
  { id: 'lesson-entry', label: { ur: 'اسباق اندراج', en: 'Lesson Entry' }, icon: <FaBookOpen />, path: '/lesson-entry', roles: ['admin'] },
  { id: 'prayer-record', label: { ur: 'نماز ریکارڈ', en: 'Prayer Record' }, icon: <FaMosque />, path: '/prayer', roles: ['admin'] },
  { id: 'attendance', label: { ur: 'حاضری', en: 'Attendance' }, icon: <FaCalendarCheck />, path: '/attendance', roles: ['admin'] },
  { id: 'income', label: { ur: 'آمدن', en: 'Income' }, icon: <FaWallet />, path: '/income', roles: ['admin'] },
  { id: 'expense', label: { ur: 'خرچ', en: 'Expense' }, icon: <FaMoneyBillWave />, path: '/expense', roles: ['admin'] },
  { id: 'finance-reports', label: { ur: 'فنانس رپورٹ', en: 'Finance Reports' }, icon: <FaFileInvoiceDollar />, path: '/finance', roles: ['admin'] },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  lang, 
  role, 
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
        "fixed top-0 bottom-0 z-50 bg-jamia-green-900 text-white transition-all duration-300 flex flex-col shadow-2xl overflow-y-auto no-scrollbar",
        isUrdu ? "right-0 border-l-4 border-jamia-gold" : "left-0 border-r-4 border-jamia-gold",
        isOpen ? "w-[260px]" : "w-0 md:w-20 overflow-hidden"
      )}
    >
      <div className="p-6 border-b border-white/10 shrink-0 text-center">
        <h1 className={cn(
          "font-black text-xl tracking-widest uppercase",
          isUrdu && "font-urdu"
        )}>
          {isOpen ? (isUrdu ? 'جامعہ نقشبندیہ' : 'Jamia Portal') : 'JNBR'}
        </h1>
      </div>

      <nav className="flex-1 py-2">
        {filteredNav.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            onClick={() => {
              if (window.innerWidth < 768) setIsOpen(false);
            }}
            className={({ isActive }) => cn(
              "w-full flex items-center px-6 py-4 transition-all hover:bg-jamia-green-800 text-sm font-medium border-b border-white/5",
              isActive ? "bg-jamia-green-600" : "bg-transparent",
              isUrdu 
                ? cn("flex-row-reverse text-right", isActive && "border-r-4 border-r-jamia-gold") 
                : cn("flex-row text-left", isActive && "border-l-4 border-l-jamia-gold")
            )}
          >
            <span className={cn("text-xl transition-colors", isUrdu ? "ml-0" : "mr-4")}>
              {item.icon}
            </span>
            {isOpen && <span className={cn(isUrdu && "font-urdu mr-4 ml-0 flex-1")}>
              {lang === 'en' ? item.label.en : item.label.ur}
            </span>}
          </NavLink>
        ))}

        <div className="p-4 space-y-3 mt-4">
          <button
            onClick={() => setLang(isUrdu ? 'en' : 'ur')}
            className={cn(
              "w-full flex items-center px-4 py-3 rounded-lg bg-jamia-gold text-jamia-green-900 hover:bg-yellow-500 transition-all text-xs font-black uppercase tracking-wider shadow-lg",
              isUrdu && "flex-row-reverse text-right"
            )}
          >
            <span className={isUrdu ? "ml-3" : "mr-3"}>
              <FaLanguage size={20} />
            </span>
            {isOpen && (isUrdu ? 'English' : 'اردو')}
          </button>

          {role && (
            <button
              onClick={onLogout}
              className={cn(
                "w-full flex items-center px-4 py-3 rounded-lg bg-red-600/20 text-red-100 hover:bg-red-600 transition-all text-xs font-black uppercase tracking-wider border border-red-600/30",
                isUrdu && "flex-row-reverse text-right"
              )}
            >
              <span className={isUrdu ? "ml-3" : "mr-3"}>
                <FaSignOutAlt size={18} />
              </span>
              {isOpen && (isUrdu ? 'لاگ آؤٹ' : 'Logout')}
            </button>
          )}
        </div>
      </nav>
    </aside>
  );
};
