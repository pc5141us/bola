'use client';

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ShieldCheck, Zap, Laptop, Cpu, Cable, ArrowLeft } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'أقوى لابتوبات الاستيراد الفرز الأول (Grade A)',
    subtitle: 'لينوفو ThinkPad & ديل XPS بأسعار تنافسية وحالة كالجديد مع ضمان اختبار الشامل 100%',
    badge: 'تخفيضات الاستيراد',
    tag: 'خصم يصل إلى 2500 ج.م',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&auto=format&fit=crop&q=80',
    category: 'laptops',
    accentColor: 'from-cyan-500 to-blue-600',
    ctaText: 'تصفح لابتوبات الاستيراد'
  },
  {
    id: 2,
    title: 'اللوحات الأم الاحترافية LGA 1700 & AM5',
    subtitle: 'أحدث الماذربوردات من ASUS ROG و Gigabyte AORUS لبناء تجميعات ألعاب وعمل شاقة',
    badge: 'وصل حديثاً 2026',
    tag: 'أحدث الجيل 14 & Ryzen 9000',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    category: 'motherboards',
    accentColor: 'from-indigo-500 to-purple-600',
    ctaText: 'استكشف اللوحات الأم'
  },
  {
    id: 3,
    title: 'حلول التوصيل والكابلات الدقيقة 4K & Type-C',
    subtitle: 'محولات متعددة المنافذ، كابلات HDMI عالية السرعة، وشواحن GaN بقدرات حتى 100W',
    badge: 'حلول الفنيين والمحترفين',
    tag: 'توافق مع جميع الأجهزة',
    image: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=1200&auto=format&fit=crop&q=80',
    category: 'cables',
    accentColor: 'from-blue-500 to-cyan-400',
    ctaText: 'تسوق التوصيلات والكابلات'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setFilterState } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative h-[420px] sm:h-[480px] lg:h-[500px] rounded-3xl overflow-hidden glass-panel border border-cyan-500/20 shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out">
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-slate-950/80" />
        </div>

        {/* Content Container */}
        <div className="relative h-full max-w-2xl px-6 sm:px-12 flex flex-col justify-center gap-4 text-right z-10">
          <div className="flex items-center gap-2">
            <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <Zap className="w-3.5 h-3.5 fill-cyan-400" />
              {activeSlide.badge}
            </span>
            <span className="bg-slate-800/80 text-slate-300 text-xs px-3 py-1 rounded-full font-medium border border-slate-700">
              {activeSlide.tag}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-wide">
            {activeSlide.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
            {activeSlide.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setFilterState((prev) => ({ ...prev, category: activeSlide.category }))}
              className={`px-6 py-3.5 rounded-xl font-extrabold text-sm text-slate-950 bg-gradient-to-r ${activeSlide.accentColor} hover:brightness-110 shadow-lg shadow-cyan-500/30 transition-all flex items-center gap-2 group`}
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>مطابقة مواصفات التوافق قبل التنسيق</span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md transition-all z-20"
          aria-label="السابق"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md transition-all z-20"
          aria-label="التالي"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-8 bg-cyan-400 shadow-lg shadow-cyan-400/50'
                  : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
