'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  Barcode, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    cartTotal,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 px-6 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-extrabold text-white">سلة المشتريات</h2>
              <span className="text-xs bg-slate-800 text-cyan-400 px-2 py-0.5 rounded-full font-bold">
                {cart.length} قطع
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-base font-bold text-slate-200">سلة المشتريات فارغة</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  قم بتصفح اللابتوبات، الكابلات، واللوحات الأم وإضافة ما تحتاجه للسلة.
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const activePrice = item.product.salePrice ?? item.product.price;
                return (
                  <div
                    key={item.product.id}
                    className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex gap-3 items-center"
                  >
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl bg-slate-900 border border-slate-800 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-0.5">
                        <Barcode className="w-3 h-3 text-slate-500" />
                        <span>P/N: {item.product.partNumber}</span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-extrabold text-cyan-400">
                          {(activePrice * item.quantity).toLocaleString()} ج.م
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-lg p-0.5">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      title="حذف من السلة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & Guest Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-4 bg-slate-950/90 border-t border-slate-800 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>مجموع المنتجات:</span>
                  <span className="font-mono text-slate-200">{cartTotal.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>رسوم الشحن التقديرية:</span>
                  <span className="font-mono text-emerald-400">60 ج.م</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-800">
                  <span>الإجمالي الكلي:</span>
                  <span className="font-mono text-cyan-400 text-base">
                    {(cartTotal + 60).toLocaleString()} ج.م
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={clearCart}
                  className="px-3 py-3 text-xs font-bold text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 rounded-xl"
                >
                  تفريغ السلة
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <span>إتمام الطلب كزائر (Guest Checkout)</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-500 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>إتمام الشراء بدون الحاجة لإنشاء حساب أو كلمة مرور</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
