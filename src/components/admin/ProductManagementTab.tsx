'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Product, ProductCategory, ProductCondition, TechnicalSpec } from '@/types';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  X, 
  Image as ImageIcon, 
  Barcode, 
  Layers, 
  ShieldCheck, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

export const ProductManagementTab: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formState, setFormState] = useState<{
    name: string;
    partNumber: string;
    category: ProductCategory;
    categoryName: string;
    price: number;
    salePrice?: number;
    condition: ProductCondition;
    stock: number;
    lowStockThreshold: number;
    description: string;
    mainImage: string;
    images: string[];
    specs: TechnicalSpec[];
    compatibility: string[];
  }>({
    name: '',
    partNumber: '',
    category: 'laptops',
    categoryName: 'لابتوبات',
    price: 1000,
    salePrice: undefined,
    condition: 'new',
    stock: 5,
    lowStockThreshold: 3,
    description: '',
    mainImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    images: [],
    specs: [{ key: 'المعالج', value: 'Intel Core i7' }],
    compatibility: ['جميع الأجهزة بدعم Type-C']
  });

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.partNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormState({
      name: '',
      partNumber: `PN-${Math.floor(100000 + Math.random() * 900000)}`,
      category: 'laptops',
      categoryName: 'لابتوبات',
      price: 5000,
      salePrice: undefined,
      condition: 'new',
      stock: 5,
      lowStockThreshold: 3,
      description: '',
      mainImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
      images: [],
      specs: [{ key: 'المواصفة', value: 'القيمة' }],
      compatibility: ['توافق تام مع أنظمة التشغيل']
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormState({
      name: product.name,
      partNumber: product.partNumber,
      category: product.category,
      categoryName: product.categoryName,
      price: product.price,
      salePrice: product.salePrice,
      condition: product.condition,
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      description: product.description,
      mainImage: product.mainImage,
      images: product.images,
      specs: product.specs.length > 0 ? product.specs : [{ key: '', value: '' }],
      compatibility: product.compatibility
    });
    setIsModalOpen(true);
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...formState.specs];
    updated[index][field] = val;
    setFormState((prev) => ({ ...prev, specs: updated }));
  };

  const addSpecRow = () => {
    setFormState((prev) => ({
      ...prev,
      specs: [...prev.specs, { key: '', value: '' }]
    }));
  };

  const removeSpecRow = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.partNumber) {
      alert('يرجى كتابة اسم المنتج ورقم القطعة P/N');
      return;
    }

    const catNameMap: Record<ProductCategory, string> = {
      laptops: 'لابتوبات',
      motherboards: 'لوحات أم',
      cables: 'كابلات ومحولات',
      storage: 'فلاشات وتخزين',
      chargers: 'شواحن وإكسسوارات'
    };

    const finalData = {
      ...formState,
      categoryName: catNameMap[formState.category],
      images: formState.images.length > 0 ? formState.images : [formState.mainImage]
    };

    if (editingProduct) {
      updateProduct({ ...editingProduct, ...finalData });
    } else {
      addProduct(finalData);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم أو Part Number..."
            className="w-full bg-slate-950 text-slate-100 placeholder-slate-400 text-xs rounded-xl pr-10 pl-4 py-2.5 border border-slate-800 focus:border-cyan-500 outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <button
          onClick={openCreateModal}
          className="w-full sm:w-auto px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة منتج جديد للكتالوج</span>
        </button>
      </div>

      {/* Product Catalog Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right divide-y divide-slate-800">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-4">الصورة والاسم</th>
                <th className="p-4">رقم القطعة P/N</th>
                <th className="p-4">القسم</th>
                <th className="p-4">السعر</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">المخزون</th>
                <th className="p-4 text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map((product) => {
                const isLow = product.stock <= product.lowStockThreshold;
                return (
                  <tr key={product.id} className="hover:bg-slate-800/50 transition-colors">
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

                    <td className="p-4 font-bold text-white font-mono">
                      {(product.salePrice ?? product.price).toLocaleString()} ج.م
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          product.condition === 'new'
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-950 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {product.condition === 'new' ? 'جديد' : 'استيراد'}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          isLow
                            ? 'bg-rose-950 text-rose-400 border-rose-500/30 animate-pulse'
                            : 'bg-slate-950 text-emerald-400 border-slate-800'
                        }`}
                      >
                        {product.stock} قطع
                      </span>
                    </td>

                    <td className="p-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1.5 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 rounded-lg transition-colors"
                          title="تعديل المنتج"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`هل أنت تأكد من حذف المنتج: ${product.name}؟`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-1.5 bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-400 rounded-lg transition-colors"
                          title="حذف المنتج"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div 
            className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 px-6 bg-slate-950 border-b border-slate-800">
              <h3 className="text-base font-extrabold text-white">
                {editingProduct ? 'تعديل بيانيات المنتج' : 'إضافة منتج جديد للكتالوج'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">اسم المنتج *</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="مثال: لابتوب لينوفو ThinkPad T14"
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">رقم القطعة P/N (Part Number) *</label>
                  <input
                    type="text"
                    required
                    value={formState.partNumber}
                    onChange={(e) => setFormState({ ...formState, partNumber: e.target.value })}
                    placeholder="مثال: 20W0004QUS"
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">القسم الرئيسي *</label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value as ProductCategory })}
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none cursor-pointer"
                  >
                    <option value="laptops">لابتوبات (laptops)</option>
                    <option value="motherboards">لوحات أم (motherboards)</option>
                    <option value="cables">كابلات ومحولات (cables)</option>
                    <option value="storage">فلاشات وتخزين (storage)</option>
                    <option value="chargers">شواحن وإكسسوارات (chargers)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">حالة المنتج *</label>
                  <select
                    value={formState.condition}
                    onChange={(e) => setFormState({ ...formState, condition: e.target.value as ProductCondition })}
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none cursor-pointer"
                  >
                    <option value="new">جديد أصلي (New)</option>
                    <option value="imported">استيراد فرز أول (Imported Grade A)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">السعر الأساسي (ج.م) *</label>
                  <input
                    type="number"
                    required
                    value={formState.price}
                    onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">سعر الخصم (اختياري)</label>
                  <input
                    type="number"
                    value={formState.salePrice ?? ''}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        salePrice: e.target.value ? Number(e.target.value) : undefined
                      })
                    }
                    placeholder="السعر بعد الخصم إن وجد"
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">الكمية بالمخزون *</label>
                  <input
                    type="number"
                    required
                    value={formState.stock}
                    onChange={(e) => setFormState({ ...formState, stock: Number(e.target.value) })}
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">حد تنبيه المخزون المنخفض *</label>
                  <input
                    type="number"
                    required
                    value={formState.lowStockThreshold}
                    onChange={(e) => setFormState({ ...formState, lowStockThreshold: Number(e.target.value) })}
                    className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">رابط صورة المنتج الرئيسية (Image URL) *</label>
                <input
                  type="text"
                  required
                  value={formState.mainImage}
                  onChange={(e) => setFormState({ ...formState, mainImage: e.target.value })}
                  className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">الوصف التفصيلي للمنتج</label>
                <textarea
                  rows={2}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  className="w-full bg-slate-950 text-slate-100 p-2.5 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
                />
              </div>

              {/* Dynamic Technical Specs Builder */}
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-400">حقول المواصفات الفنية الديناميكية (Technical Specs)</span>
                  <button
                    type="button"
                    onClick={addSpecRow}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-bold"
                  >
                    + إضافة خاصية
                  </button>
                </div>

                {formState.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="اسم الخاصية (مثال: المعالج / السوكيت)"
                      value={spec.key}
                      onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                      className="flex-1 bg-slate-900 p-2 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
                    />
                    <input
                      type="text"
                      placeholder="القيمة (مثال: Intel Core i7 / LGA1700)"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                      className="flex-1 bg-slate-900 p-2 rounded-xl border border-slate-800 focus:border-cyan-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecRow(idx)}
                      className="p-2 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl shadow-lg shadow-cyan-500/20"
                >
                  حفظ ونشر المنتج
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
