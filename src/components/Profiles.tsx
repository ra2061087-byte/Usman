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
  education?: { en: string[]; ur: string[] };
  services?: { en: string[]; ur: string[] };
  skills?: { en: string[]; ur: string[] };
  characteristics?: { en: string[]; ur: string[] };
  institutions?: { en: string[]; ur: string[] };
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
    name: { en: 'Hazrat Allama Maulana Muhammad Usman Barvi', ur: 'حضرت علامہ مولانا محمد عثمان باروی' }, 
    fatherName: { en: 'Hazrat Allama Maulana Qari Ghulam Mujtaba Barvi', ur: 'حضرت علامہ مولانا قاری غلام مجتبیٰ باروی' },
    img: 'https://share.google/78LVaG0Z0Ja8bYIQk',
    role: { en: 'Teacher / Moallim', ur: 'مدرس / معلم' },
    work: { en: 'Naat Khan / Imam', ur: 'نعت خواں / امام' },
    phone: '03065253184',
    city: { en: 'Jaranwala, Faisalabad', ur: 'جڑانوالہ، فیصل آباد' },
    address: { en: 'Jamia Naqshbandia Barvia Rizvia, Jaranwala', ur: 'جامعہ نقشبندیہ بارویہ رضویہ، جڑانوالہ' },
    education: {
      en: [
        'Hifz-ul-Quran: Madrasa Ma\'arif-ul-Quran, Faisalabad',
        'Dars-e-Nizami: Jamia Ittehad-ul-Madaris, Faisalabad'
      ],
      ur: [
        'حفظ القرآن: مدرسہ معارف القرآن، فیصل آباد',
        'درسِ نظامی: جامعہ اتحاد المدارس، فیصل آباد'
      ]
    },
    services: {
      en: [
        'Imamat & Khatabat since 2012',
        'Friday Sermons & Religious Lectures',
        'Religious Education & Training for Children'
      ],
      ur: [
        'امامت و خطابت: 2012 سے تا حال',
        'جمعہ خطبہ اور دینی بیانات',
        'بچوں کی دینی تعلیم و تربیت (خصوصاً حفظِ قرآن)'
      ]
    },
    skills: {
      en: [
        'Recitation of Quran with Melodious Voice',
        'Naat Khawani',
        'Urdu & Punjabi Khatabat',
        'Teaching Hifz-ul-Quran'
      ],
      ur: [
        'قرآن مجید کی خوش الحانی سے تلاوت',
        'نعت خوانی',
        'اردو و پنجابی خطابت',
        'بچوں کو حفظِ قرآن پڑھانا'
      ]
    },
    characteristics: {
      en: [
        'Soft-spoken and well-mannered',
        'Reformer and Guide in society',
        'Messenger of Peace, Love, and Unity'
      ],
      ur: [
        'نرم مزاج اور خوش اخلاق',
        'معاشرے میں اصلاح اور رہنمائی کرنے والے',
        'امن، محبت اور اتحاد کا پیغام دینے والے'
      ]
    },
    institutions: {
      en: [
        'Jamia Masjid Darbar Wali, Chak No. 109, Jaranwala',
        'Jamia Naqshbandia Barvia Rizvia, Jaranwala'
      ],
      ur: [
        'جامع مسجد دربار والی، چک نمبر 109، جڑانوالہ',
        'جامعہ نقشبندیہ بارویہ رضویہ، جڑانوالہ'
      ]
    }
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
            <div className="flex-1 p-8 md:p-10 space-y-10">
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

              {/* Contact Info Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8 border-y border-gray-100">
                {profile.fatherName && (
                  <div className={cn("flex items-start gap-3", isUrdu && "flex-row-reverse")}>
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                      <FaUserFriends size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">{isUrdu ? 'والد کا نام' : 'Father'}</p>
                      <p className={cn("font-bold text-gray-700 leading-tight", isUrdu && "font-urdu")}>{profile.fatherName[lang]}</p>
                    </div>
                  </div>
                )}
                
                {profile.phone && (
                  <div className={cn("flex items-start gap-3", isUrdu && "flex-row-reverse")}>
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                      <FaPhone size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">{isUrdu ? 'رابطہ' : 'Contact'}</p>
                      <p className="font-bold text-gray-700 leading-tight font-mono">{profile.phone}</p>
                    </div>
                  </div>
                )}

                {profile.city && (
                  <div className={cn("flex items-start gap-3", isUrdu && "flex-row-reverse")}>
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                      <FaMapMarkerAlt size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest leading-none mb-1">{isUrdu ? 'شہر' : 'City'}</p>
                      <p className={cn("font-bold text-gray-700 leading-tight", isUrdu && "font-urdu")}>{profile.city[lang]}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Detailed Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                {profile.education && (
                  <div className="space-y-4">
                    <h4 className={cn("text-sm font-black uppercase tracking-[0.2em] text-gray-300 border-b border-gray-50 pb-2", isUrdu && "text-right")}>
                      {isUrdu ? 'دینی تعلیم' : 'Education'}
                    </h4>
                    <ul className={cn("space-y-2 list-none", isUrdu && "text-right")}>
                      {profile.education[lang].map((item, i) => (
                        <li key={i} className={cn("text-gray-600 flex gap-3", isUrdu ? "flex-row-reverse" : "flex-row")}>
                          <span className="w-1.5 h-1.5 rounded-full bg-jamia-gold mt-2 shrink-0" />
                          <span className={cn(isUrdu && "font-urdu")}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {profile.services && (
                  <div className="space-y-4">
                    <h4 className={cn("text-sm font-black uppercase tracking-[0.2em] text-gray-300 border-b border-gray-50 pb-2", isUrdu && "text-right")}>
                      {isUrdu ? 'دینی خدمات' : 'Services'}
                    </h4>
                    <ul className={cn("space-y-2 list-none", isUrdu && "text-right")}>
                      {profile.services[lang].map((item, i) => (
                        <li key={i} className={cn("text-gray-600 flex gap-3", isUrdu ? "flex-row-reverse" : "flex-row")}>
                          <span className="w-1.5 h-1.5 rounded-full bg-jamia-gold mt-2 shrink-0" />
                          <span className={cn(isUrdu && "font-urdu")}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {profile.skills && (
                  <div className="space-y-4">
                    <h4 className={cn("text-sm font-black uppercase tracking-[0.2em] text-gray-300 border-b border-gray-50 pb-2", isUrdu && "text-right")}>
                      {isUrdu ? 'مہارتیں' : 'Skills'}
                    </h4>
                    <div className={cn("flex flex-wrap gap-2", isUrdu && "flex-row-reverse")}>
                      {profile.skills[lang].map((skill, i) => (
                        <span key={i} className={cn("px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold text-gray-500", isUrdu && "font-urdu pb-2")}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profile.characteristics && (
                  <div className="space-y-4">
                    <h4 className={cn("text-sm font-black uppercase tracking-[0.2em] text-gray-300 border-b border-gray-50 pb-2", isUrdu && "text-right")}>
                      {isUrdu ? 'اخلاق و کردار' : 'Character'}
                    </h4>
                    <ul className={cn("space-y-2 list-none", isUrdu && "text-right")}>
                      {profile.characteristics[lang].map((item, i) => (
                        <li key={i} className={cn("text-gray-600 flex gap-3", isUrdu ? "flex-row-reverse" : "flex-row")}>
                          <span className="w-1.5 h-1.5 rounded-full bg-jamia-green-600 mt-2 shrink-0" />
                          <span className={cn(isUrdu && "font-urdu")}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {profile.institutions && (
                  <div className="space-y-4">
                    <h4 className={cn("text-sm font-black uppercase tracking-[0.2em] text-gray-300 border-b border-gray-50 pb-2", isUrdu && "text-right")}>
                      {isUrdu ? 'مساجد و ادارے' : 'Institutions'}
                    </h4>
                    <ul className={cn("space-y-2 list-none", isUrdu && "text-right")}>
                      {profile.institutions[lang].map((item, i) => (
                        <li key={i} className={cn("text-gray-600 flex gap-3", isUrdu ? "flex-row-reverse" : "flex-row")}>
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                          <span className={cn(isUrdu && "font-urdu")}>{item}</span>
                        </li>
                      ))}
                    </ul>
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
