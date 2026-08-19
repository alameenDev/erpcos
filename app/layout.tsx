import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "نظام إدارة مبيعات الكوزمتك", description: "نظام محاسبي ومخزني متكامل لشركات مستحضرات التجميل", other: { "codex-preview": "development" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ar" dir="rtl"><body>{children}</body></html>; }
