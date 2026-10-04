'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Wallet, 
  Banknote, 
  Truck, 
  ShieldCheck, 
  MessageSquareCode, 
  Copy, 
  Check, 
  Sparkles,
  Barcode
} from 'lucide-react';
import { PaymentMethod, Order } from '@/types';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotal, 
    createOrder 
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    whatsappPhone: '',
    city: 'القاهرة - المعادي',
    address: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [copiedWallet, setCopiedWallet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleCopyWallet = () => {
    navigator.clipboard.writeText('01012345678');
    setCopiedWallet(true);
    setTimeout(() => setCopiedWallet(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('يرجى ملء جميع الحقول الأساسية (الاسم، الهاتف، والعنوان التفصيلي)');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = createOrder(formData, paymentMethod);
      setCreatedOrder(order);
      setIsSubmitting(false);

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // fallback
      }
    }, 600);
  };

  const closeAll = () => {
    setIsCheckoutOpen(false);
    setCreatedOrder(null);
  };

  const whatsappOrderUrl = createdOrder
    ? `https://wa.me/201012345678?text=${encodeURIComponent(
        `مرحباً تكنو هب 👋 قمت بإتمام الطلب رقم [${createdOrder.id}] عبر الموقع:\n\n👤 العميل: ${createdOrder.customer.fullName}\n📱 الهاتف: ${createdOrder.customer.phone}\n📍 العنوان: ${createdOrder.customer.city} - ${createdOrder.customer.address}\n💰 الإجمالي: ${(createdOrder.totalAmount + createdOrder.shippingFee).toLocaleString()} ج.م\n💳 طريقة الدفع: ${
          createdOrder.paymentMethod === 'cod' ? 'دفع عند الاستلام' : createdOrder.paymentMethod === 'vodafone_cash' ? 'محافظ إلكترونية' : 'بطاقة بنكية'
        }`
      )}`
    : '#';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-extrabold text-white">
              {createdOrder ? 'تم تأكيد طلبك بنجاح 🎉' : 'إتمام الطلب السريع كـ زائر'}
            </h2>
          </div>

          <button
            onClick={closeAll}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content View: Form or Confirmation */}
        {createdOrder ? (
          /* Order Confirmation Summary Modal View */
          <div className="p-6 flex flex-col gap-6">
            <div className="p-4 bg-cyan-950/40 border border-cyan-500/40 rounded-2xl text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-white">شكراً لطلبك من تكنو هب!</h3>
              <p className="text-xs text-slate-300">
                تم تسجيل طلبك وجاري مراجعة توافق القطع وتجهيز الشحنة فوراً.
              </p>
              <div className="pt-2 flex items-center justify-center gap-2">
                <span className="text-xs text-slate-400">رقم تتبع الطلب:</span>
                <span className="font-mono text-sm font-extrabold text-cyan-400 bg-slate-950 px-3 py-1 rounded-lg border border-cyan-500/30">
                  {createdOrder.trackingNumber}
                </span>
              </div>
            </div>

            {/* Order Items & Customer Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-300 border-b border-slate-800 pb-1.5">بيانات التسليم</h4>
                <p className="text-slate-200"><strong>الاسم:</strong> {createdOrder.customer.fullName}</p>
                <p className="text-slate-200"><strong>رقم الهاتف:</strong> {createdOrder.customer.phone}</p>
                <p className="text-slate-200"><strong>العنوان:</strong> {createdOrder.customer.city} - {createdOrder.customer.address}</p>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-300 border-b border-slate-800 pb-1.5">تفاصيل الدفع</h4>
                <p className="text-slate-200">
                  <strong>طريقة الدفع:</strong> {
                    createdOrder.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : 
                    createdOrder.paymentMethod === 'vodafone_cash' ? 'المحافظ الإلكترونية' : 'بطاقة بنكية'
                  }
                </p>
                <p className="text-slate-200">
                  <strong>إجمالي المنتجات:</strong> {createdOrder.totalAmount.toLocaleString()} ج.م
                </p>
                <p className="text-cyan-400 font-bold text-sm">
                  <strong>الإجمالي النهائي:</strong> {(createdOrder.totalAmount + createdOrder.shippingFee).toLocaleString()} ج.م
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 bg-emerald-950 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageSquareCode className="w-4 h-4" />
                <span>إرسال تفاصيل الطلب عبر الواتساب لتسريع الشحن</span>
              </a>

              <button
                onClick={closeAll}
                className="w-full sm:w-auto px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black transition-all"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Input Form View */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Customer Contact Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> 1. البيانات الشخصية ومكان التسليم (بدون تسجيل دخول)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">الاسم بالكامل *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="مثال: أحمد محمد علي"
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">رقم الهاتف للتواصل *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010XXXXXXXX"
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">المحافظة / المدينة *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none cursor-pointer"
                  >
                    <option value="القاهرة - المعادي">القاهرة - المعادي</option>
                    <option value="القاهرة - مدينة نصر">القاهرة - مدينة نصر</option>
                    <option value="الجيزة - المهندسين">الجيزة - المهندسين</option>
                    <option value="الإسكندرية - سموحة">الإسكندرية - سموحة</option>
                    <option value="المنصورة">المنصورة</option>
                    <option value="طنطا">طنطا</option>
                    <option value="محافظة أخرى">محافظة أخرى (شحن لكافة المحافظات)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">العنوان التفصيلي *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="الشارع، رقم المبنى، رقم الشقة"
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Flexible Payment Method Options */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" /> 2. طريقة الدفع المرنة
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${
                    paymentMethod === 'cod'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold ring-2 ring-cyan-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Banknote className="w-6 h-6 text-emerald-400" />
                  <div>
                    <div className="text-slate-200">الدفع عند الاستلام</div>
                    <div className="text-[10px] text-slate-400 font-normal">نقداً لمندوب الشحن</div>
                  </div>
                </div>

                {/* E-Wallets */}
                <div
                  onClick={() => setPaymentMethod('vodafone_cash')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${
                    paymentMethod === 'vodafone_cash'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold ring-2 ring-cyan-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Wallet className="w-6 h-6 text-rose-400" />
                  <div>
                    <div className="text-slate-200">المحافظ الإلكترونية</div>
                    <div className="text-[10px] text-slate-400 font-normal">فودافون كاش / InstaPay</div>
                  </div>
                </div>

                {/* Card Payment */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${
                    paymentMethod === 'card'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold ring-2 ring-cyan-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-indigo-400" />
                  <div>
                    <div className="text-slate-200">بطاقات بنكية</div>
                    <div className="text-[10px] text-slate-400 font-normal">فيزا / ماستركارد</div>
                  </div>
                </div>
              </div>

              {/* Wallet Info Notice */}
              {paymentMethod === 'vodafone_cash' && (
                <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                  <div>
                    <span>حوالة فودافون كاش / إينستا باي على الرقم: </span>
                    <strong className="text-rose-400 font-mono text-sm ml-2">01012345678</strong>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyWallet}
                    className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-300 flex items-center gap-1"
                  >
                    {copiedWallet ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedWallet ? 'تم النسخ' : 'نسخ الرقم'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Total & Submit */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400">إجمالي المطلوب سداده</span>
                <div className="text-xl font-black text-cyan-400 font-mono">
                  {(cartTotal + 60).toLocaleString()} ج.م
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                {isSubmitting ? (
                  <span>جاري تأكيد الطلب...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>تأكيد الطلب الآن</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
