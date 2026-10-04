'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Order, OrderStatus } from '@/types';
import { 
  ShoppingBag, 
  Printer, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  FileText, 
  MapPin, 
  Phone, 
  Barcode 
} from 'lucide-react';
import { PrintInvoiceModal } from './PrintInvoiceModal';
import { PrintShippingLabelModal } from './PrintShippingLabelModal';

export const OrdersTab: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [selectedShippingOrder, setSelectedShippingOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchesSearch = 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery);

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" /> قيد الانتظار
          </span>
        );
      case 'processing':
        return (
          <span className="px-2.5 py-1 bg-blue-950 text-blue-400 border border-blue-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <Truck className="w-3 h-3" /> جاري التجهيز
          </span>
        );
      case 'shipped':
        return (
          <span className="px-2.5 py-1 bg-cyan-950 text-cyan-400 border border-cyan-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <Truck className="w-3 h-3 text-cyan-400 animate-pulse" /> جاري الشحن
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> تم التوصيل بنجاح
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 bg-rose-950 text-rose-400 border border-rose-500/30 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <XCircle className="w-3 h-3" /> ملغي
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث برقم الطلب، التتبع، أو اسم العميل..."
            className="w-full bg-slate-950 text-slate-100 placeholder-slate-400 text-xs rounded-xl pr-10 pl-4 py-2.5 border border-slate-800 focus:border-cyan-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'pending', label: 'جديد' },
            { id: 'shipped', label: 'جاري الشحن' },
            { id: 'delivered', label: 'مكتمل' },
            { id: 'cancelled', label: 'ملغي' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                statusFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/90 border border-slate-800 rounded-2xl text-slate-400">
            <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto mb-3" />
            <p className="text-sm font-bold text-slate-200">لا توجد طلبات متطابقة مع البحث</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-5 bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl shadow-xl space-y-4 transition-all"
            >
              {/* Order Row Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="text-base font-black font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-xl border border-cyan-500/30">
                    {order.id}
                  </span>
                  <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Barcode className="w-4 h-4 text-slate-500" />
                    <span>التتبع: {order.trackingNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(order.status)}

                  {/* Status Change Selector */}
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className="bg-slate-950 text-slate-200 text-xs rounded-xl p-1.5 border border-slate-800 focus:border-cyan-500 outline-none cursor-pointer"
                  >
                    <option value="pending">قيد الانتظار</option>
                    <option value="processing">جاري التجهيز</option>
                    <option value="shipped">جاري الشحن</option>
                    <option value="delivered">تم التوصيل بنجاح</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>
              </div>

              {/* Order Info & Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Customer Details */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-slate-300 border-b border-slate-800 pb-1">بيانات العميل</h4>
                  <p className="text-slate-200 font-semibold">{order.customer.fullName}</p>
                  <p className="text-slate-400 flex items-center gap-1 font-mono">
                    <Phone className="w-3 h-3 text-cyan-400" /> {order.customer.phone}
                  </p>
                  <p className="text-slate-400 flex items-start gap-1">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                    <span>{order.customer.city} - {order.customer.address}</span>
                  </p>
                </div>

                {/* Ordered Items Summary */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1">
                  <h4 className="font-bold text-slate-300 border-b border-slate-800 pb-1">المنتجات المطلوبة ({order.items.length})</h4>
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-slate-300">
                        <span className="truncate max-w-[180px]">• {item.product.name}</span>
                        <span className="font-mono text-cyan-400">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Printing Actions */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-300 border-b border-slate-800 pb-1">الإجمالي المستحق</h4>
                    <div className="text-lg font-black text-cyan-400 font-mono mt-1">
                      {(order.totalAmount + order.shippingFee).toLocaleString()} ج.م
                    </div>
                    <span className="text-[10px] text-slate-400">
                      طريقة الدفع: {order.paymentMethod === 'cod' ? 'دفع عند الاستلام' : 'محافظ إلكترونية'}
                    </span>
                  </div>

                  {/* One-Click Printing Buttons */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="flex-1 py-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 border border-slate-700"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>الفاتورة</span>
                    </button>

                    <button
                      onClick={() => setSelectedShippingOrder(order)}
                      className="flex-1 py-1.5 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 border border-slate-700"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>البوليصة</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Print Invoice Modal */}
      {selectedInvoiceOrder && (
        <PrintInvoiceModal
          order={selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}

      {/* Print Shipping Label Modal */}
      {selectedShippingOrder && (
        <PrintShippingLabelModal
          order={selectedShippingOrder}
          onClose={() => setSelectedShippingOrder(null)}
        />
      )}
    </div>
  );
};
