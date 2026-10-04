'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilterSidebar } from '@/components/products/ProductFilterSidebar';
import { ProductDetailModal } from '@/components/products/ProductDetailModal';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CheckoutModal } from '@/components/cart/CheckoutModal';
import { Footer } from '@/components/layout/Footer';
import { AnalyticsTab } from '@/components/admin/AnalyticsTab';
import { ProductManagementTab } from '@/components/admin/ProductManagementTab';
import { InventoryTab } from '@/components/admin/InventoryTab';
import { OrdersTab } from '@/components/admin/OrdersTab';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  SlidersHorizontal, 
  PackageSearch, 
  ArrowLeft, 
  BarChart3, 
  Package, 
  Layers, 
  ShoppingBag, 
  ShieldCheck, 
  Cpu 
} from 'lucide-react';

export default function Home() {
  const { 
    products, 
    filterState, 
    setFilterState, 
    isAdminOpen, 
    setIsAdminOpen,
    lowStockProducts
  } = useStore();

  const [featuredTab, setFeaturedTab] = useState<'best_seller' | 'new_arrival'>('best_seller');
  const [adminTab, setAdminTab] = useState<'analytics' | 'products' | 'inventory' | 'orders'>('analytics');

  // Filtered Products Logic
  const filteredProducts = React.useMemo(() => {
    return products.filter((p) => {
      // Search by name or part number
      const q = filterState.searchQuery.trim().toLowerCase();
      if (q) {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesPN = p.partNumber.toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        if (!matchesName && !matchesPN && !matchesCat) return false;
      }

      // Category filter
      if (filterState.category !== 'all' && p.category !== filterState.category) {
        return false;
      }

      // Condition filter
      if (filterState.condition !== 'all' && p.condition !== filterState.condition) {
        return false;
      }

      // Price filter
      const price = p.salePrice ?? p.price;
      if (price > filterState.maxPrice) {
        return false;
      }

      // Stock filter
      if (filterState.inStockOnly && p.stock === 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price_low') {
        return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      }
      if (filterState.sortBy === 'price_high') {
        return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      }
      if (filterState.sortBy === 'best_selling') {
        return b.reviewsCount - a.reviewsCount;
      }
      // default 'latest'
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, filterState]);

  // Featured sections
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19]">
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {isAdminOpen ? (
          /* ==========================================================
             ADMIN DASHBOARD VIEW (لوحة تحكم الإدارة)
             ========================================================== */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {/* Admin Header Banner */}
            <div className="p-6 bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-cyan-500/20 text-cyan-400 text-xs px-3 py-1 rounded-full font-bold border border-cyan-500/40 uppercase tracking-wider">
                    لوحة الإدارة والتحكم
                  </span>
                  {lowStockProducts.length > 0 && (
                    <span className="bg-rose-500/20 text-rose-400 text-xs px-3 py-1 rounded-full font-bold border border-rose-500/40 animate-pulse">
                      {lowStockProducts.length} تنبيهات مخزون
                    </span>
                  )}
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  لوحة تحكم منصة تكنو هب (TechnoHub Control)
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  إدارة الكتالوج، متابعة المبيعات والأرباح، التحكم بالمخزون، وطباعة الفواتير وبوالص الشحن.
                </p>
              </div>

              <button
                onClick={() => setIsAdminOpen(false)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                العودة لواجهة المتجر
              </button>
            </div>

            {/* Admin Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs overflow-x-auto">
              <button
                onClick={() => setAdminTab('analytics')}
                className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  adminTab === 'analytics'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>الإحصائيات والتقارير (Analytics)</span>
              </button>

              <button
                onClick={() => setAdminTab('products')}
                className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  adminTab === 'products'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>إدارة الكتالوج والمنتجات</span>
              </button>

              <button
                onClick={() => setAdminTab('inventory')}
                className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  adminTab === 'inventory'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>إدارة المخزون والتنبيهات</span>
                {lowStockProducts.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </button>

              <button
                onClick={() => setAdminTab('orders')}
                className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  adminTab === 'orders'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>إدارة الطلبات والشحن</span>
              </button>
            </div>

            {/* Admin Content Switcher */}
            {adminTab === 'analytics' && <AnalyticsTab />}
            {adminTab === 'products' && <ProductManagementTab />}
            {adminTab === 'inventory' && <InventoryTab />}
            {adminTab === 'orders' && <OrdersTab />}
          </div>
        ) : (
          /* ==========================================================
             STOREFRONT VIEW FOR VISITORS & CUSTOMERS (واجهة المتجر)
             ========================================================== */
          <div className="space-y-10">
            {/* 1. Hero Slider Banner */}
            <HeroSlider />

            {/* 2. Categories Grid */}
            <CategoryGrid />

            {/* 3. Featured Sections: Best Sellers & New Arrivals */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                      <span>منتجات مميزة ومختارة للعملاء</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      الأعلى طلباً والأحدث وصولاً بأسعار وضمان فني شامل
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                      onClick={() => setFeaturedTab('best_seller')}
                      className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                        featuredTab === 'best_seller'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Flame className="w-4 h-4 text-rose-400" />
                      <span>الأكثر مبيعاً</span>
                    </button>
                    <button
                      onClick={() => setFeaturedTab('new_arrival')}
                      className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                        featuredTab === 'new_arrival'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>وصل حديثاً</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(featuredTab === 'best_seller' ? bestSellers : newArrivals).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Products Listing with Filter Sidebar */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar Filter */}
                <ProductFilterSidebar />

                {/* Main Product Grid */}
                <div className="flex-1 space-y-4">
                  {/* Results Header */}
                  <div className="flex items-center justify-between p-4 bg-slate-900/90 border border-slate-800 rounded-2xl">
                    <div className="text-xs text-slate-300">
                      عرض <strong className="text-cyan-400 font-mono text-sm">{filteredProducts.length}</strong> منتج مطابـق
                      {filterState.searchQuery && (
                        <span> للبحث عن: "<strong className="text-white">{filterState.searchQuery}</strong>"</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 hidden sm:inline">الفرز:</span>
                      <select
                        value={filterState.sortBy}
                        onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
                        className="bg-slate-950 text-slate-200 text-xs rounded-xl p-2 border border-slate-800 outline-none cursor-pointer"
                      >
                        <option value="latest">وصل حديثاً (الأحدث)</option>
                        <option value="best_selling">الأكثر مبيعاً</option>
                        <option value="price_low">السعر: من الأقل للأعلى</option>
                        <option value="price_high">السعر: من الأعلى للأقل</option>
                      </select>
                    </div>
                  </div>

                  {/* Grid or Empty state */}
                  {filteredProducts.length === 0 ? (
                    <div className="p-12 text-center bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
                      <PackageSearch className="w-12 h-12 text-slate-700 mx-auto" />
                      <h3 className="text-base font-bold text-slate-200">لم نجد منتجات تطابق شروط تصفيتك</h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        جرب البحث برقم موديل مختلف (Part Number) أو قم بتعديل ناتاق السعر والأقسام.
                      </p>
                      <button
                        onClick={() => setFilterState({
                          searchQuery: '',
                          partNumberQuery: '',
                          category: 'all',
                          condition: 'all',
                          minPrice: 0,
                          maxPrice: 50000,
                          specFilterKey: 'all',
                          specFilterValue: '',
                          inStockOnly: false,
                          sortBy: 'latest'
                        })}
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-extrabold transition-all"
                      >
                        إعادة ضبط جميع الفلاتر
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />

      <Footer />
    </div>
  );
}
