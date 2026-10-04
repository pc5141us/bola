'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { SlidersHorizontal, RotateCcw, Check, Sparkles, DollarSign, Tag, ShieldCheck } from 'lucide-react';

export const ProductFilterSidebar: React.FC = () => {
  const { filterState, setFilterState, resetFilters, products } = useStore();

  return (
    <aside className="w-full lg:w-72 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-6 h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
          <span>تصفية المنتجات (Filter)</span>
        </h3>

        <button
          onClick={resetFilters}
          className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
          title="إعادة ضبط الفلاتر"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>مسح الكل</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-cyan-400" />
          <span>الأقسام (Categories)</span>
        </label>
        <div className="flex flex-col gap-1 text-xs">
          {[
            { id: 'all', label: 'جميع الأقسام' },
            { id: 'laptops', label: '💻 لابتوبات (جديد واستيراد)' },
            { id: 'motherboards', label: '🧩 لوحات أم (Motherboards)' },
            { id: 'cables', label: '🔌 كابلات ومحولات 4K & Type-C' },
            { id: 'storage', label: '💾 فلاشات وسائط تخزين (SSD)' },
            { id: 'chargers', label: '⚡ شواحن وإكسسوارات' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterState((prev) => ({ ...prev, category: cat.id }))}
              className={`w-full text-right px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                filterState.category === cat.id
                  ? 'bg-cyan-500/20 text-cyan-400 font-bold border border-cyan-500/40'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>{cat.label}</span>
              {filterState.category === cat.id && <Check className="w-4 h-4 text-cyan-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Condition Filter (جديد / استيراد فرز أول) */}
      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>حالة القطعة (Condition)</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'new', label: 'جديد' },
            { id: 'imported', label: 'استيراد' }
          ].map((cond) => (
            <button
              key={cond.id}
              onClick={() => setFilterState((prev) => ({ ...prev, condition: cond.id }))}
              className={`py-2 rounded-xl text-center font-semibold transition-all border ${
                filterState.condition === cond.id
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-bold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cond.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>نطاق السعر (ج.م)</span>
          </span>
          <span className="text-cyan-400 font-mono">حتى {filterState.maxPrice.toLocaleString()}</span>
        </div>

        <input
          type="range"
          min="100"
          max="50000"
          step="200"
          value={filterState.maxPrice}
          onChange={(e) =>
            setFilterState((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
          }
          className="w-full accent-cyan-400 bg-slate-950 cursor-pointer h-2 rounded-lg"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>100 ج.م</span>
          <span>50,000 ج.م</span>
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-2 border-t border-slate-800">
        <label className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl cursor-pointer border border-slate-800 hover:border-slate-700">
          <span className="text-xs font-semibold text-slate-300">إخفاء المنتجات غير المتوفرة</span>
          <input
            type="checkbox"
            checked={filterState.inStockOnly}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, inStockOnly: e.target.checked }))
            }
            className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
          />
        </label>
      </div>

      {/* Sort By Select */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-300">ترتيب المنتجات حسب</label>
        <select
          value={filterState.sortBy}
          onChange={(e) =>
            setFilterState((prev) => ({ ...prev, sortBy: e.target.value as any }))
          }
          className="bg-slate-950 text-slate-200 text-xs rounded-xl p-2.5 border border-slate-800 focus:border-cyan-500 outline-none cursor-pointer"
        >
          <option value="latest">وصل حديثاً (الأحدث)</option>
          <option value="best_selling">الأكثر مبيعاً</option>
          <option value="price_low">السعر: من الأقل للأعلى</option>
          <option value="price_high">السعر: من الأعلى للأقل</option>
        </select>
      </div>
    </aside>
  );
};
