import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteMeta, store } from "@/lib/store";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  applicationName: store.name,
  openGraph: {
    title: siteMeta.title,
    description: siteMeta.description,
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F5F6F8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <body className="min-h-screen font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
