'use client';

import React from 'react';
import { Cpu, PhoneCall, ShieldCheck, Truck, MessageSquareCode, Heart, MapPin } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const Footer: React.FC = () => {
  const { setFilterState } = useStore();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 text-slate-400 text-xs mt-auto">
      {/* Top Value Proposition Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">شحن لكافة المحافظات</h4>
            <p className="text-slate-400 text-xs">توصيل سريع وآمن حتى باب المنزل أو الفني</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">ضمان ومطابقة التوافق</h4>
            <p className="text-slate-400 text-xs">فحص دقيق للمواصفات ورقم الموديل P/N قبل الشراء</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <MessageSquareCode className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">دعم فني واستشارات مجانية</h4>
            <p className="text-slate-400 text-xs">تواصل مباشر عبر الواتساب لاختيار القطعة المناسبة</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Slogan */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-xl text-white tracking-wide">تكنو<span className="text-cyan-400">هب</span> (TechnoHub)</span>
          </div>

          <p className="text-cyan-400 font-bold leading-relaxed text-sm">
            "منفذك الأول لأجهزة اللابتوب، قطع الغيار، وجميع حلول التوصيل الاحترافية."
          </p>

          <p className="text-slate-400 leading-relaxed max-w-md">
            منصة تجارة إلكترونية متخصصة تقدم حلولاً شاملة لعشاق ومحترفي التكنولوجيا؛ حيث تجمع بين بيع أجهزة الكمبيوتر المحمول (جديدة ومستوردة/فرز أول)، اللوحات الأم (Motherboards)، ومختلف أنواع التوصيلات والكابلات الدقيقة، بالإضافة إلى وسائط التخزين الرقمية.
          </p>
        </div>

        {/* Categories Links */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2">الأقسام السريعة</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setFilterState(prev => ({ ...prev, category: 'laptops' }))} className="hover:text-cyan-400 transition-colors">
                💻 لابتوبات جديدة واستيراد فرز أول
              </button>
            </li>
            <li>
              <button onClick={() => setFilterState(prev => ({ ...prev, category: 'motherboards' }))} className="hover:text-cyan-400 transition-colors">
                🧩 لوحات أم (Motherboards)
              </button>
            </li>
            <li>
              <button onClick={() => setFilterState(prev => ({ ...prev, category: 'cables' }))} className="hover:text-cyan-400 transition-colors">
                🔌 كابلات ومحولات 4K HDMI & Type-C
              </button>
            </li>
            <li>
              <button onClick={() => setFilterState(prev => ({ ...prev, category: 'storage' }))} className="hover:text-cyan-400 transition-colors">
                💾 وسائط تخزين فلاشات و NVMe SSD
              </button>
            </li>
            <li>
              <button onClick={() => setFilterState(prev => ({ ...prev, category: 'chargers' }))} className="hover:text-cyan-400 transition-colors">
                ⚡ شواحن GaN سريعة 65W & 100W
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2">التواصل والمبيعات</h4>
          <div className="space-y-2 text-xs">
            <p className="flex items-center gap-2 text-slate-300 font-mono">
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>01012345678</span>
            </p>
            <p className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>القاهرة - المعادي / الإسكندرية</span>
            </p>
            <a
              href="https://wa.me/201012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-950 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 rounded-xl font-bold transition-all mt-2"
            >
              <MessageSquareCode className="w-4 h-4" />
              <span>محادثة واتساب مباشرة</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-800/80 py-4 bg-slate-950 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 جميع الحقوق محفوظة لمنصة تكنو هب (TechnoHub & TechGear)</span>
          <span className="flex items-center gap-1">
            تم التطوير بواسطة أحدث تقنيات Next.js & React 🚀
          </span>
        </div>
      </div>
    </footer>
  );
};
