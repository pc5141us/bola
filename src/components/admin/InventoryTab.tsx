'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  AlertTriangle, 
  Package, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Barcode, 
  Layers 
} from 'lucide-react';

export const InventoryTab: React.FC = () => {
  const { products, adjustStock, lowStockProducts } = useStore();

  return (
    <div className="space-y-6">
      {/* Low Stock Alert Warning Banner */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 bg-amber-950/60 border border-amber-500/40 rounded-2xl flex items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                تنبيه مخزون منخفض: يوجد {lowStockProducts.length} منتجات وصلت أو تجاوزت الحد الأدنى!
              </h4>
              <p className="text-xs text-amber-300/80 mt-0.5">
                يرجى طلب كميات استيراد جديدة أو شحنات إضافية لتفادي نفاذ المخزون أمام الزوار.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold bg-amber-500 text-slate-950 px-3 py-1.5 rounded-xl">
            {lowStockProducts.length} منتج بحاجة للتوريد
          </span>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" />
            <span>عداد المخزون الفعلي والتنبيهات المباشرة</span>
          </h3>
          <span className="text-xs text-slate-400">يخصم تلقائياً عند تأكيد كل طلب</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right divide-y divide-slate-800">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-4">المنتج</th>
                <th className="p-4">رقم القطعة P/N</th>
                <th className="p-4">القسم</th>
                <th className="p-4">الكمية المتاحة حالياً</th>
                <th className="p-4">حد التنبيه الأدنى</th>
                <th className="p-4">حالة التوفر</th>
                <th className="p-4 text-center">تعديل سريع للمخزون</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {products.map((product) => {
                const isLow = product.stock <= product.lowStockThreshold;
                const isOut = product.stock === 0;

                return (
                  <tr key={product.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-lg bg-slate-950 border border-slate-800 shrink-0"
                      />
                      <div className="font-bold text-white max-w-xs truncate">
                        {product.name}
                      </div>
                    </td>

                    <td className="p-4 font-mono text-cyan-400 font-bold">
                      {product.partNumber}
                    </td>

                    <td className="p-4 text-slate-300">
                      {product.categoryName}
                    </td>

                    <td className="p-4 font-mono font-bold text-base text-white">
                      {product.stock}
                    </td>

                    <td className="p-4 font-mono text-slate-400">
                      {product.lowStockThreshold} قطع
                    </td>

                    <td className="p-4">
                      {isOut ? (
                        <span className="px-2.5 py-1 bg-rose-950 text-rose-400 border border-rose-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" /> نفذت الكمية
                        </span>
                      ) : isLow ? (
                        <span className="px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit animate-pulse">
                          <AlertTriangle className="w-3 h-3" /> منخفض (Low Stock)
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" /> مستقر
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => adjustStock(product.id, -1)}
                          className="p-1.5 bg-slate-950 border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-rose-400 rounded-lg transition-colors"
                          title="خصم 1 قطعة"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-mono font-bold text-white w-8 text-center">
                          {product.stock}
                        </span>
                        <button
                          onClick={() => adjustStock(product.id, 1)}
                          className="p-1.5 bg-slate-950 border border-slate-700 hover:border-emerald-500 text-slate-300 hover:text-emerald-400 rounded-lg transition-colors"
                          title="إضافة 1 قطعة"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
