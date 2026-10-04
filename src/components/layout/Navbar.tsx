'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Cpu, 
  SlidersHorizontal, 
  ShieldCheck, 
  Truck, 
  PhoneCall, 
  Layers, 
  ChevronDown, 
  LayoutDashboard,
  X,
  Menu,
  Sparkles,
  Barcode
} from 'lucide-react';
import { Product } from '@/types';

export const Navbar: React.FC = () => {
  const { 
    cartItemCount, 
    cartTotal, 
    wishlist, 
    setIsCartOpen, 
    isAdminOpen, 
    setIsAdminOpen,
    products,
    filterState,
    setFilterState,
    setSelectedProductDetail,
    lowStockProducts
  } = useStore();

  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Suggestions based on Search Query or Part Number
  const searchSuggestions: Product[] = React.useMemo(() => {
    const q = filterState.searchQuery.trim().toLowerCase();
    if (!q) return [];
    return products.filter((p) => 
      p.name.toLowerCase().includes(q) || 
      p.partNumber.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [filterState.searchQuery, products]);

  // Handle outside click to dismiss search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-blue-950 text-slate-300 text-xs py-1.5 px-4 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-cyan-500/20 text-cyan-400 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-pulse" /> عروض الحصري
            </span>
            <span>خصومات تصل إلى 20% على لابتوبات الاستيراد واللوحات الأم | ضمان توافق القطع 100%</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              <span>شحن سريع لجميع المحافظات</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>فحص ودعم فني قبل الشراء</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden text-slate-300 hover:text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-white tracking-wide">تكنو<span className="text-cyan-400">هب</span></span>
                <span className="text-[10px] bg-slate-800 text-cyan-400 px-1.5 py-0.5 rounded font-mono border border-cyan-500/30">PRO</span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-1 font-medium">TechnoHub & TechGear</p>
            </div>
          </a>
        </div>

        {/* Smart Search Bar with Part Number Support */}
        <div className="hidden md:flex flex-1 max-w-xl relative" ref={searchRef}>
          <div className="relative w-full">
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
              onFocus={() => setSearchFocused(true)}
              placeholder="ابحث باسم المنتج أو رقم القطعة (Part Number مثل: 20W0004QUS)..."
              className="w-full bg-slate-900/90 text-slate-100 placeholder-slate-400 text-sm rounded-xl pr-11 pl-20 py-2.5 border border-slate-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            
            {filterState.searchQuery && (
              <button
                onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
                className="absolute left-14 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
              <Barcode className="w-3 h-3" /> P/N
            </span>
          </div>

          {/* Search Autosuggest Dropdown */}
          {searchFocused && searchSuggestions.length > 0 && (
            <div className="absolute top-full right-0 left-0 mt-2 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800">
              <div className="p-2 bg-slate-950/60 text-xs font-semibold text-cyan-400 flex items-center justify-between">
                <span>نتائج البحث المباشرة ({searchSuggestions.length})</span>
                <span className="text-[10px] text-slate-400">يدعم البحث برقم الموديل</span>
              </div>
              {searchSuggestions.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProductDetail(product);
                    setSearchFocused(false);
                  }}
                  className="p-3 hover:bg-slate-800/80 cursor-pointer transition-colors flex items-center gap-3"
                >
                  <img src={product.mainImage} alt={product.name} className="w-10 h-10 object-cover rounded-lg bg-slate-800" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-200 truncate">{product.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded font-mono text-[10px] border border-slate-700">
                        P/N: {product.partNumber}
                      </span>
                      <span>•</span>
                      <span className="text-cyan-400 font-semibold">{product.categoryName}</span>
                    </div>
                  </div>
                  <div className="text-left font-bold text-cyan-400 text-sm">
                    {(product.salePrice ?? product.price).toLocaleString()} ج.م
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin Dashboard Switcher */}
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              isAdminOpen
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/30'
                : 'bg-slate-900 text-slate-300 hover:text-white border-slate-700 hover:border-cyan-500/50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">لوحة التحكم</span>
            {lowStockProducts.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1" />
            )}
          </button>

          {/* Wishlist */}
          <button 
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-rose-400 border border-slate-800 rounded-xl transition-colors relative"
            title="قائمة المفضلة"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 rounded-xl font-bold text-xs flex items-center gap-2.5 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-slate-950 text-cyan-400 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-cyan-400">
                  {cartItemCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col text-right leading-tight">
              <span className="text-[10px] text-slate-900/80 font-medium">السلة</span>
              <span className="font-extrabold text-xs">{cartTotal.toLocaleString()} ج.م</span>
            </div>
          </button>
        </div>
      </div>

      {/* Navigation Categories Bar */}
      <div className="bg-slate-950/80 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto py-2 scrollbar-none text-xs">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max">
            <button
              onClick={() => setFilterState(prev => ({ ...prev, category: 'all' }))}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterState.category === 'all'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              جميع المنتجات
            </button>
            <button
              onClick={() => setFilterState(prev => ({ ...prev, category: 'laptops' }))}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterState.category === 'laptops'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              💻 لابتوبات (جديد واستيراد)
            </button>
            <button
              onClick={() => setFilterState(prev => ({ ...prev, category: 'motherboards' }))}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterState.category === 'motherboards'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              🧩 لوحات أم (Motherboards)
            </button>
            <button
              onClick={() => setFilterState(prev => ({ ...prev, category: 'cables' }))}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterState.category === 'cables'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              🔌 كابلات ومحولات (Type-C / HDMI)
            </button>
            <button
              onClick={() => setFilterState(prev => ({ ...prev, category: 'storage' }))}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterState.category === 'storage'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              💾 فلاشات وتخزين (SSD & Flash)
            </button>
            <button
              onClick={() => setFilterState(prev => ({ ...prev, category: 'chargers' }))}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterState.category === 'chargers'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-bold'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              ⚡ شواحن وإكسسوارات
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] text-cyan-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>دعم التوافق الفني 24/7 عبر الواتساب</span>
          </div>
        </div>
      </div>
    </header>
  );
};
