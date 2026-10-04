import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";

export const metadata: Metadata = {
  title: "تكنو هب (TechnoHub) | منفذك الأول للابتوبات، قطع الغيار، وحلول التوصيل الاحترافية",
  description: "منصة تجارة إلكترونية متخصصة في بيع أجهزة الكمبيوتر المحمول (جديدة ومستوردة فرز أول)، اللوحات الأم (Motherboards)، كابلات وتوصيلات دقيقة، ومستلزمات التخزين الرقمية مع تفاصيل توافق تقنية دقيقة.",
  keywords: ["تكنو هب", "TechnoHub", "لابتوبات استيراد", "لوحات أم", "Motherboard", "كابلات Type-C", "HDMI 4K", "فلاشات", "SSD", "قطع غيار لابتوب"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
