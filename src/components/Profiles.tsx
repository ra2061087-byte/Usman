import React from 'react';
import { Language } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { FaPhone, FaMapMarkerAlt, FaUserTie, FaUserFriends } from 'react-icons/fa';

interface ProfileDetail {
  id: string;
  name: { en: string; ur: string };
  fatherName?: { en: string; ur: string };
  role: { en: string; ur: string };
  img: string;
  phone?: string;
  city?: { en: string; ur: string };
  address?: { en: string; ur: string };
  work?: { en: string; ur: string };
}

const detailedProfiles: ProfileDetail[] = [
  { 
    id: 'zair', 
    name: { en: 'Zair-e-Nigrani', ur: 'زیرِ نگرانی' }, 
    img: 'https://i.ibb.co/VpkfH8Q/zair.jpg',
    role: { en: 'Patron', ur: 'سرپرستِ اعلیٰ' },
    city: { en: 'Faisalabad', ur: 'فیصل آباد' }
  },
  { 
    id: 'faizan', 
    name: { en: 'Faizan Nazar', ur: 'فیضانِ نظر' }, 
    img: 'https://i.ibb.co/zH9P8fV/faizan.jpg',
    role: { en: 'Principal', ur: 'مہتمم' },
    city: { en: 'Faisalabad', ur: 'فیصل آباد' }
  },
  { 
    id: 'moallim', 
    name: { en: 'Qari Muhammad Usman Barvi', ur: 'قاری محمد عثمان باروی' }, 
    fatherName: { en: 'Qari Ghulam Mustafa Barvi', ur: 'قاری غلام مصطفیٰ باروی' },
    img: 'https://share.google/78LVaG0Z0Ja8bYIQk',
    role: { en: 'Teacher', ur: 'مدرس' },
    work: { en: 'Naat Khan / Imam', ur: 'نعت خواں / امام' },
    phone: '0123456678',
    city: { en: 'Faisalabad', ur: 'فیصل آباد' },
    address: { en: '109 Check Jaranwala', ur: '109 چک جڑانوالہ' }
  },
];

interface ProfilesProps {
  lang: Language;
}

export const Profiles: React.FC<ProfilesProps> = ({ lang }) => {
  const isUrdu = lang === 'ur';

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className={cn("text-left", isUrdu && "text-right")}>
        <h2 className={cn("text-3xl font-bold text-jamia-green-900 mb-2", isUrdu && "font-urdu text-4xl")}>
          {isUrdu ? 'انتظامیہ اور اساتذہ' : 'Administration & Faculty'}
        </h2>
        <p className={cn("text-gray-500", isUrdu && "font-urdu text-lg")}>
          {isUrdu ? 'جامعہ کی اہم شخصیات کے پروفائلز' : 'Profiles of the key figures of the Jamia'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {detailedProfiles.map((profile, idx) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, x: isUrdu ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "bg-white rounded-[2rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row",
              isUrdu && "md:flex-row-reverse"
            )}
          >
            {/* Image Placeholder */}
            <div className="md:w-72 shrink-0 h-72 md:h-auto bg-gray-100 relative group overflow-hidden">
              <img 
                src={profile.img} 
                alt={profile.name.en}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 md:hidden">
                <h3 className={cn("text-white font-bold text-2xl", isUrdu && "font-urdu")}>
                  {profile.name[lang]}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-8 md:p-10 space-y-8">
              <div className={cn("flex flex-col md:flex-row justify-between items-start gap-4", isUrdu && "md:flex-row-reverse")}>
                <div className={isUrdu ? "text-right" : "text-left"}>
                  <h3 className={cn("text-2xl md:text-3xl font-bold text-gray-900 mb-1", isUrdu && "font-urdu text-4xl")}>
                    {profile.name[lang]}
                  </h3>
                  <p className={cn("text-jamia-green-600 font-bold tracking-widest uppercase text-sm", isUrdu && "font-urdu text-lg")}>
                    {profile.role[lang]}
                  </p>
                </div>
                {profile.work && (
                  <div className={cn("bg-jamia-green-50 px-4 py-2 rounded-xl text-jamia-green-700 font-bold", isUrdu && "font-urdu")}>
                    {profile.work[lang]}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                {profile.fatherName && (
                  <div className={cn("flex items-center gap-4", isUrdu && "flex-row-reverse")}>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <FaUserFriends />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{isUrdu ? 'والد کا نام' : 'Father\'s Name'}</p>
                      <p className={cn("font-bold text-gray-700", isUrdu && "font-urdu text-lg")}>{profile.fatherName[lang]}</p>
                    </div>
                  </div>
                )}
                
                {profile.phone && (
                  <div className={cn("flex items-center gap-4", isUrdu && "flex-row-reverse")}>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{isUrdu ? 'فون نمبر' : 'Phone Number'}</p>
                      <p className="font-bold text-gray-700 font-mono">{profile.phone}</p>
                    </div>
                  </div>
                )}

                {profile.city && (
                  <div className={cn("flex items-center gap-4", isUrdu && "flex-row-reverse")}>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{isUrdu ? 'شہر' : 'City'}</p>
                      <p className={cn("font-bold text-gray-700", isUrdu && "font-urdu text-lg")}>{profile.city[lang]}</p>
                    </div>
                  </div>
                )}

                {profile.address && (
                  <div className={cn("flex items-center gap-4", isUrdu && "flex-row-reverse")}>
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{isUrdu ? 'پتہ' : 'Address'}</p>
                      <p className={cn("font-bold text-gray-700", isUrdu && "font-urdu text-lg")}>{profile.address[lang]}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
