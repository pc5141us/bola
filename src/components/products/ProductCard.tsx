'use client';

import React from 'react';
import { Product } from '@/types';
import { useStore } from '@/context/StoreContext';
import { 
  ShoppingBag, 
  Heart, 
  Eye, 
  MessageSquareCode, 
  CheckCircle2, 
  AlertTriangle, 
  Star, 
  Barcode, 
  Tag, 
  ExternalLink 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedProductDetail 
  } = useStore();

  const isLowStock = product.stock <= product.lowStockThreshold && product.stock > 0;
  const isOutOfStock = product.stock === 0;
  const inWishlist = isInWishlist(product.id);
  const activePrice = product.salePrice ?? product.price;
  const discountPercent = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100) 
    : 0;

  // Pre-filled WhatsApp quick order message
  const whatsappUrl = `https://wa.me/201012345678?text=${encodeURIComponent(
    `مرحباً تكنو هب 👋 أرغب في طلب المنتج التالي بشكل سريع:\n\n📌 اسم المنتج: ${product.name}\n🔢 رقم القطعة (Part Number): ${product.partNumber}\n💰 السعر: ${activePrice.toLocaleString()} ج.م\n🏷️ الحالة: ${product.condition === 'new' ? 'جديد' : 'استيراد فرز أول'}`
  )}`;

  return (
    <div className="group relative bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col h-full">
      {/* Top Badges Header */}
      <div className="relative aspect-4/3 w-full bg-slate-950 overflow-hidden">
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Condition & Discount Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          <span
            className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold shadow-md backdrop-blur-md border ${
              product.condition === 'new'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                : 'bg-amber-950/80 text-amber-400 border-amber-500/40'
            }`}
          >
            {product.condition === 'new' ? 'جديد أصلـي' : 'استيراد فرز أول ⭐'}
          </span>

          {discountPercent > 0 && (
            <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black bg-rose-500 text-white shadow-md">
              خصم {discountPercent}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 left-3 p-2 rounded-xl backdrop-blur-md border transition-all z-10 ${
            inWishlist
              ? 'bg-rose-500 text-white border-rose-400 shadow-lg'
              : 'bg-slate-950/60 text-slate-300 hover:text-white border-slate-700/80'
          }`}
          title="أضف للمفضلة"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Trigger Banner */}
        <button
          onClick={() => setSelectedProductDetail(product)}
          className="absolute inset-x-3 bottom-3 py-2 bg-slate-950/80 hover:bg-cyan-500 text-slate-200 hover:text-slate-950 border border-slate-700 hover:border-cyan-400 rounded-xl backdrop-blur-md text-xs font-bold transition-all opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 shadow-xl"
        >
          <Eye className="w-4 h-4" />
          <span>المواصفات الفنية والتوافق</span>
        </button>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Part Number & Category */}
          <div className="flex items-center justify-between gap-2 text-[11px] mb-1.5">
            <span className="text-cyan-400 font-semibold bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
              {product.categoryName}
            </span>

            <span className="text-slate-400 font-mono text-[10px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 flex items-center gap-1">
              <Barcode className="w-3 h-3 text-slate-500" />
              P/N: {product.partNumber}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setSelectedProductDetail(product)}
            className="text-sm font-bold text-white line-clamp-2 hover:text-cyan-400 cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>

          {/* Key Technical Specs Pills */}
          {product.specs.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-1">
              {product.specs.slice(0, 3).map((spec, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-slate-300 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800"
                >
                  <strong className="text-slate-400">{spec.key}:</strong> {spec.value}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Price & Availability */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
          {/* Stock Availability Indicator */}
          <div className="flex items-center justify-between text-xs">
            {isOutOfStock ? (
              <span className="text-rose-400 text-[11px] font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> غير متوفر حالياً
              </span>
            ) : isLowStock ? (
              <span className="text-amber-400 text-[11px] font-bold flex items-center gap-1 animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" /> قارب على النفاد ({product.stock} قطع)
              </span>
            ) : (
              <span className="text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> متوفر للمعيانة والتسليم
              </span>
            )}

            <div className="flex items-center gap-1 text-amber-400 text-[11px]">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Price & Action CTA */}
          <div className="flex items-center justify-between gap-2">
            <div>
              {product.salePrice ? (
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 line-through">
                    {product.price.toLocaleString()} ج.م
                  </span>
                  <span className="text-base font-extrabold text-cyan-400">
                    {product.salePrice.toLocaleString()} ج.م
                  </span>
                </div>
              ) : (
                <span className="text-base font-extrabold text-cyan-400">
                  {product.price.toLocaleString()} ج.م
                </span>
              )}
            </div>

            {/* Direct Buy & WhatsApp buttons */}
            <div className="flex items-center gap-1.5">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-emerald-950/80 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 rounded-xl transition-all"
                title="طلب سريع عبر الواتساب"
              >
                <MessageSquareCode className="w-4 h-4" />
              </a>

              {/* Add to Cart */}
              <button
                disabled={isOutOfStock}
                onClick={() => addToCart(product, 1)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>شراء</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
