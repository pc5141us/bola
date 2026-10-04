'use client';

import React from 'react';
import { Order } from '@/types';
import { Printer, X, Barcode, MapPin, Phone, Truck } from 'lucide-react';

interface PrintShippingLabelModalProps {
  order: Order;
  onClose: () => void;
}

export const PrintShippingLabelModal: React.FC<PrintShippingLabelModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Action Header */}
        <div className="flex items-center justify-between p-4 px-6 bg-slate-950 border-b border-slate-800 no-print">
          <h3 className="text-sm font-bold text-white">معاينة وطباعة بوليصة الشحن (Shipping Label)</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة البوليصة</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Shipping Label */}
        <div className="p-6 bg-white text-slate-900 printable-area font-sans text-right">
          <div className="border-4 border-slate-900 rounded-2xl p-6 space-y-4">
            {/* Header / Barcode */}
            <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-500">شركة الشحن والتوصيل</span>
                <h2 className="text-2xl font-black text-slate-900">تكنو هب EXPRESS</h2>
                <p className="text-xs text-slate-600">تسليم لكافة المحافظات</p>
              </div>

              <div className="text-center font-mono border-2 border-slate-900 px-3 py-2 rounded-lg bg-slate-50">
                <div className="text-[10px] font-bold text-slate-500">رقم تتبع الشحنة</div>
                <div className="text-base font-extrabold text-slate-900">{order.trackingNumber}</div>
                {/* Barcode representation */}
                <div className="h-6 w-32 bg-slate-900 mt-1 mx-auto flex items-center justify-center text-white text-[8px] tracking-widest font-mono">
                  ||||| ||| |||| ||||
                </div>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="bg-slate-100 p-4 rounded-xl space-y-2 border border-slate-300 text-xs">
              <span className="text-[10px] font-bold uppercase text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded">
                المستلم (Customer)
              </span>
              <h3 className="text-lg font-black text-slate-900">{order.customer.fullName}</h3>
              <p className="flex items-center gap-1.5 text-slate-800">
                <Phone className="w-3.5 h-3.5" />
                <strong className="font-mono">{order.customer.phone}</strong>
              </p>
              <p className="flex items-start gap-1.5 text-slate-800">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{order.customer.city} - {order.customer.address}</span>
              </p>
              {order.customer.notes && (
                <p className="text-slate-600 italic bg-amber-50 p-2 rounded border border-amber-200">
                  ملاحظات: {order.customer.notes}
                </p>
              )}
            </div>

            {/* COD Amount */}
            <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl">
              <div>
                <span className="text-[10px] text-slate-400">المبلغ التحصيلي المطلـوب من العميل</span>
                <div className="text-xl font-black font-mono text-cyan-400">
                  {(order.totalAmount + order.shippingFee).toLocaleString()} ج.م
                </div>
              </div>
              <div className="text-left font-bold text-xs">
                {order.paymentMethod === 'cod' ? 'دفع عند الاستلام (COD)' : 'مدفوع مسبقاً'}
              </div>
            </div>

            {/* Sender */}
            <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-300 flex justify-between">
              <span>الراسل: تكنو هب للابتوب وقطع الغيار (01012345678)</span>
              <span>عدد القطع: {order.items.reduce((acc, i) => acc + i.quantity, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
