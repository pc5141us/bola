'use client';

import React from 'react';
import { Laptop, Cpu, Cable, HardDrive, Zap, Layers, ArrowLeft } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductCategory } from '@/types';

interface CategoryItem {
  id: ProductCategory;
  name: string;
  description: string;
  countText: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  badge?: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'laptops',
    name: 'لابتوبات احترافية',
    description: 'أجهزة جديدة واستيراد فرز أول (ThinkPad, XPS, Latitude)',
    countText: 'جديد وفرز أول',
    icon: <Laptop className="w-7 h-7 text-cyan-400" />,
    gradient: 'from-cyan-950/60 to-slate-900',
    borderColor: 'group-hover:border-cyan-500/50',
    badge: 'فرز أول'
  },
  {
    id: 'motherboards',
    name: 'لوحات أم (Motherboards)',
    description: 'سوكيت إنتل LGA1700 و AMD AM5 للألعاب والتصميم',
    countText: 'أحدث الشرائح Z790 & B650',
    icon: <Cpu className="w-7 h-7 text-indigo-400" />,
    gradient: 'from-indigo-950/60 to-slate-900',
    borderColor: 'group-hover:border-indigo-500/50',
    badge: 'تجميعات'
  },
  {
    id: 'cables',
    name: 'كابلات ومحولات',
    description: 'توصيلات 4K HDMI, Type-C Hubs, محولات احترافية',
    countText: 'حلول التوصيل الفائقة',
    icon: <Cable className="w-7 h-7 text-blue-400" />,
    gradient: 'from-blue-950/60 to-slate-900',
    borderColor: 'group-hover:border-blue-500/50'
  },
  {
    id: 'storage',
    name: 'فلاشات وسائط تخزين',
    description: 'فلاشات عالي السرعة، NVMe SSD 7450MB/s, كروت ذاكرة',
    countText: 'أقصى سرعة قراءة',
    icon: <HardDrive className="w-7 h-7 text-emerald-400" />,
    gradient: 'from-emerald-950/60 to-slate-900',
    borderColor: 'group-hover:border-emerald-500/50'
  },
  {
    id: 'chargers',
    name: 'شواحن وإكسسوارات',
    description: 'شواحن GaN سريعة 65W/100W, كابلات شحن معززة',
    countText: 'حماية ذكية لأجهزتك',
    icon: <Zap className="w-7 h-7 text-amber-400" />,
    gradient: 'from-amber-950/60 to-slate-900',
    borderColor: 'group-hover:border-amber-500/50'
  }
];

export const CategoryGrid: React.FC = () => {
  const { setFilterState, filterState, products } = useStore();

  const getCategoryCount = (catId: ProductCategory) => {
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-cyan-400" />
            <span>تصفح الأقسام الرئيسية</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            اختر القسم المطلوب للوصول المباشر إلى المواصفات والتوافق التام
          </p>
        </div>

        {filterState.category !== 'all' && (
          <button
            onClick={() => setFilterState((prev) => ({ ...prev, category: 'all' }))}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
          >
            إظهار الكل ({products.length})
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = filterState.category === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <div
              key={cat.id}
              onClick={() => setFilterState((prev) => ({ ...prev, category: cat.id }))}
              className={`group relative rounded-2xl p-5 cursor-pointer transition-all duration-300 bg-gradient-to-b ${cat.gradient} border ${
                isSelected
                  ? 'border-cyan-400 shadow-xl shadow-cyan-500/20 ring-2 ring-cyan-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              } ${cat.borderColor}`}
            >
              {cat.badge && (
                <span className="absolute top-3 left-3 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {cat.badge}
                </span>
              )}

              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                {cat.name}
              </h3>

              <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[11px]">{count} منتج</span>
                <span className="text-cyan-400 font-semibold group-hover:-translate-x-1 transition-transform flex items-center gap-1">
                  تصفح <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
