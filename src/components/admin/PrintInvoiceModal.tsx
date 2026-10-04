'use client';

import React from 'react';
import { Order } from '@/types';
import { Printer, X, Cpu } from 'lucide-react';

interface PrintInvoiceModalProps {
  order: Order;
  onClose: () => void;
}

export const PrintInvoiceModal: React.FC<PrintInvoiceModalProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Action Header */}
        <div className="flex items-center justify-between p-4 px-6 bg-slate-950 border-b border-slate-800 no-print">
          <h3 className="text-sm font-bold text-white">معاينة وطباعة فاتورة الشراء</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الفاتورة (PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Sheet */}
        <div className="overflow-y-auto p-8 bg-white text-slate-900 printable-area font-sans text-right">
          {/* Invoice Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-6 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Cpu className="w-8 h-8 text-cyan-600" />
                <h1 className="text-3xl font-black tracking-tight text-slate-900">تكنو هب (TechnoHub)</h1>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                منفذك الأول لأجهزة اللابتوب، قطع الغيار، وحلول التوصيل الاحترافية
              </p>
              <p className="text-xs text-slate-500">هاتف الدعم والمبيعات: 01012345678 | القاهرة - مصر</p>
            </div>

            <div className="text-left font-mono">
              <span className="text-xs text-slate-500 uppercase">فاتورة شراء رقم</span>
              <h2 className="text-xl font-bold text-slate-900">{order.id}</h2>
              <p className="text-xs text-slate-600">التاريخ: {new Date(order.createdAt).toLocaleDateString('ar-EG')}</p>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-2 gap-6 p-4 bg-slate-100 rounded-xl mb-6 text-xs">
            <div>
              <h4 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2">بيانات العميل:</h4>
              <p><strong>الاسم:</strong> {order.customer.fullName}</p>
              <p><strong>الهاتف:</strong> {order.customer.phone}</p>
              <p><strong>العنوان:</strong> {order.customer.city} - {order.customer.address}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2">بيانات الشحن والدفع:</h4>
              <p><strong>رقم التتبع:</strong> {order.trackingNumber}</p>
              <p><strong>طريقة الدفع:</strong> {
                order.paymentMethod === 'cod' ? 'الدفع عند الاستلام (COD)' : 
                order.paymentMethod === 'vodafone_cash' ? 'محافظ إلكترونية' : 'بطاقة بنكية'
              }</p>
              <p><strong>حالة الطلب:</strong> {order.status}</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-xs text-right border-collapse mb-6">
            <thead>
              <tr className="bg-slate-900 text-white font-bold">
                <th className="p-3 border border-slate-900">المنتج</th>
                <th className="p-3 border border-slate-900">رقم القطعة P/N</th>
                <th className="p-3 border border-slate-900 text-center">الكمية</th>
                <th className="p-3 border border-slate-900 text-left">السعر الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {order.items.map((item, idx) => {
                const activePrice = item.product.salePrice ?? item.product.price;
                return (
                  <tr key={idx}>
                    <td className="p-3 font-semibold">{item.product.name}</td>
                    <td className="p-3 font-mono text-slate-700">{item.product.partNumber}</td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-left font-mono font-bold">
                      {(activePrice * item.quantity).toLocaleString()} ج.م
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Total Calculation */}
          <div className="flex justify-end text-xs">
            <div className="w-64 space-y-1.5 p-3 bg-slate-100 rounded-xl">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-mono">{order.totalAmount.toLocaleString()} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم الشحن:</span>
                <span className="font-mono">{order.shippingFee.toLocaleString()} ج.م</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-300">
                <span>الإجمالي الكلي المستحق:</span>
                <span className="font-mono text-cyan-700">
                  {(order.totalAmount + order.shippingFee).toLocaleString()} ج.م
                </span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-4 border-t border-slate-300 text-center text-[10px] text-slate-500">
            شكراً لتعاملكم مع تكنو هب (TechnoHub) | يسري هذا المستند كـ فاتورة شراء رسمية وصحيفة ضمان
          </div>
        </div>
      </div>
    </div>
  );
};
