import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '元大期貨｜2025春節不打烊',
  description:
    '台股休市11天，元大期貨春節不打烊，回饋好禮達百萬元！交易選擇豐富(國外期權或CFD槓桿)商品，指定戶交易一筆送200元，還有機會獲得黃金牌及蘋果好禮。',
  openGraph: {
    title: '元大期貨｜2025春節不打烊',
    description:
      '台股休市11天，元大期貨春節不打烊，回饋好禮達百萬元！交易選擇豐富(國外期權或CFD槓桿)商品，指定戶交易一筆送200元，還有機會獲得黃金牌及蘋果好禮。',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <GoogleTagManager gtmId="GTM-KSVRB2H" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        monica-locale="zh_TW"
      >
        <NextTopLoader />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
