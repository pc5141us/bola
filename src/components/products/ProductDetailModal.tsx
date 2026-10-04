'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { 
  X, 
  ShoppingBag, 
  MessageSquareCode, 
  CheckCircle2, 
  AlertTriangle, 
  Star, 
  Barcode, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Truck, 
  Copy, 
  Check 
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductDetail, 
    setSelectedProductDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'compatibility' | 'shipping'>('specs');
  const [copiedPartNumber, setCopiedPartNumber] = useState(false);

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;
  const isLowStock = product.stock <= product.lowStockThreshold && product.stock > 0;
  const isOutOfStock = product.stock === 0;
  const inWishlist = isInWishlist(product.id);
  const activePrice = product.salePrice ?? product.price;

  const images = product.images.length > 0 ? product.images : [product.mainImage];
  const activeImage = images[activeImageIndex] || product.mainImage;

  const handleCopyPN = () => {
    navigator.clipboard.writeText(product.partNumber);
    setCopiedPartNumber(true);
    setTimeout(() => setCopiedPartNumber(false), 2000);
  };

  const whatsappUrl = `https://wa.me/201012345678?text=${encodeURIComponent(
    `مرحباً تكنو هب 👋 أرغب في طلب المنتج التالي وتأكيد التوافق:\n\n📌 المنتج: ${product.name}\n🔢 P/N: ${product.partNumber}\n💰 السعر: ${activePrice.toLocaleString()} ج.م`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 px-6 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-xs bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2.5 py-1 rounded-lg font-bold">
              {product.categoryName}
            </span>
            <span className="text-slate-400 font-mono text-xs flex items-center gap-1.5">
              <Barcode className="w-4 h-4 text-slate-500" />
              P/N: <strong className="text-white">{product.partNumber}</strong>
            </span>
            <button
              onClick={handleCopyPN}
              className="text-slate-400 hover:text-cyan-400 text-[10px] bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 flex items-center gap-1"
            >
              {copiedPartNumber ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedPartNumber ? 'تم النسخ' : 'نسخ رقم الموديل'}</span>
            </button>
          </div>

          <button
            onClick={() => setSelectedProductDetail(null)}
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-bold border backdrop-blur-md ${
                    product.condition === 'new'
                      ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500/40'
                      : 'bg-amber-950/90 text-amber-400 border-amber-500/40'
                  }`}
                >
                  {product.condition === 'new' ? 'جديد بالكرتونة' : 'استيراد فرز أول ممتاز'}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-slate-950 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-cyan-400 ring-2 ring-cyan-500/30'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Compatibility */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h2 className="text-xl font-extrabold text-white leading-relaxed">
                {product.name}
              </h2>

              <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Price & Stock */}
              <div className="mt-5 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">السعر الحالي الإجمالي</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-cyan-400">
                      {activePrice.toLocaleString()} ج.م
                    </span>
                    {product.salePrice && (
                      <span className="text-xs text-slate-500 line-through">
                        {product.price.toLocaleString()} ج.م
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  {isOutOfStock ? (
                    <span className="px-3 py-1 bg-rose-950 text-rose-400 border border-rose-500/40 rounded-xl text-xs font-bold flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> غير متوفر
                    </span>
                  ) : isLowStock ? (
                    <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="w-4 h-4" /> متبقي {product.stock} قطع فقط!
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded-xl text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> متوفر في المخزون
                    </span>
                  )}
                </div>
              </div>

              {/* Tabs: Specs / Compatibility / Shipping */}
              <div className="mt-6">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs">
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeTab === 'specs'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    المواصفات الفنية (Technical Specs)
                  </button>
                  <button
                    onClick={() => setActiveTab('compatibility')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeTab === 'compatibility'
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    التوافق والدعم (Compatibility)
                  </button>
                </div>

                <div className="mt-3">
                  {activeTab === 'specs' && (
                    <div className="rounded-xl border border-slate-800 overflow-hidden text-xs">
                      <table className="w-full text-right divide-y divide-slate-800">
                        <tbody>
                          {product.specs.map((spec, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-950/60' : 'bg-slate-900/60'}>
                              <td className="p-2.5 font-bold text-slate-300 w-1/3 border-l border-slate-800">
                                {spec.key}
                              </td>
                              <td className="p-2.5 text-cyan-300 font-mono">
                                {spec.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeTab === 'compatibility' && (
                    <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-2 text-xs">
                      <p className="font-bold text-amber-400 flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> تأكيد التوافق التام قبل الشراء:
                      </p>
                      <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                        {product.compatibility.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
              <button
                disabled={isOutOfStock}
                onClick={() => {
                  addToCart(product, 1);
                  setSelectedProductDetail(null);
                }}
                className={`w-full sm:flex-1 py-3.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>إضافة إلى السلة للشراء الفوري</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 bg-emerald-950 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <MessageSquareCode className="w-4 h-4" />
                <span>طلب عبر الواتساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
