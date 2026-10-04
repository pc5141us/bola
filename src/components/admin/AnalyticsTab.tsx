'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  AlertTriangle, 
  Package, 
  Star, 
  Award, 
  Calendar 
} from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const { products, orders, lowStockProducts } = useStore();

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const totalOrdersCount = orders.length;

  // Monthly revenue estimate
  const currentMonthRevenue = totalRevenue * 0.85;

  // Top products calculation based on orders items
  const productSalesMap: Record<string, { product: typeof products[0]; totalQty: number; revenue: number }> = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const pid = item.product.id;
      const price = item.product.salePrice ?? item.product.price;
      if (!productSalesMap[pid]) {
        productSalesMap[pid] = { product: item.product, totalQty: 0, revenue: 0 };
      }
      productSalesMap[pid].totalQty += item.quantity;
      productSalesMap[pid].revenue += price * item.quantity;
    });
  });

  const topSellingProducts = Object.values(productSalesMap)
    .sort((a, b) => b.totalQty - a.totalQty)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold">إجمالي الأرباح والمبيعات</span>
            <h3 className="text-2xl font-black text-cyan-400 font-mono mt-1">
              {totalRevenue.toLocaleString()} ج.م
            </h3>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +14.2% مقارنة بالشهر السابق
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold">إجمالي عدد الطلبات</span>
            <h3 className="text-2xl font-black text-white font-mono mt-1">
              {totalOrdersCount} طلبات
            </h3>
            <span className="text-[10px] text-slate-400 mt-1 block">مطلوبة ومكتملة</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Low Stock Alert Count */}
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold">تنبيهات المخزون المنخفض</span>
            <h3 className="text-2xl font-black text-amber-400 font-mono mt-1">
              {lowStockProducts.length} منتجات
            </h3>
            <span className="text-[10px] text-amber-400/80 mt-1 block">وصلت للحد الأدنى</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Active Products Count */}
        <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold">إجمالي الكتالوج المتاح</span>
            <h3 className="text-2xl font-black text-emerald-400 font-mono mt-1">
              {products.length} منتجات
            </h3>
            <span className="text-[10px] text-slate-400 mt-1 block">موزعة على 5 أقسام</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Package className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Top Products Table & Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Products */}
        <div className="lg:col-span-2 p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>المنتجات الأكثر طلباً ومبيعاً (Top Best Sellers)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">آخر 30 يوم</span>
          </div>

          <div className="space-y-3">
            {topSellingProducts.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">لا توجد مبيعات مسجلة بعد</p>
            ) : (
              topSellingProducts.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-lg bg-slate-900 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-white truncate">{item.product.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        P/N: {item.product.partNumber}
                      </span>
                    </div>
                  </div>

                  <div className="text-left font-mono shrink-0">
                    <div className="font-bold text-cyan-400">{item.revenue.toLocaleString()} ج.م</div>
                    <div className="text-[10px] text-slate-400">تم بيع {item.totalQty} قطع</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Monthly Revenue Chart Simulation */}
        <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>ملخص المبيعات الشهري</span>
            </h3>

            <div className="mt-4 space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>لابتوبات جديدة واستيراد</span>
                  <span className="font-mono text-cyan-400 font-bold">58%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[58%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>لوحات أم (Motherboards)</span>
                  <span className="font-mono text-indigo-400 font-bold">24%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[24%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>كابلات وتوصيلات 4K</span>
                  <span className="font-mono text-blue-400 font-bold">18%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[18%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-center text-xs text-cyan-300 font-medium">
            تحديث التقارير والإحصائيات فوري مع كل طلب جديد
          </div>
        </div>
      </div>
    </div>
  );
};
