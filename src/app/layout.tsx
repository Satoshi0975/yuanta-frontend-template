import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_TC } from 'next/font/google';
import localFont from 'next/font/local';
import NextTopLoader from 'nextjs-toploader';
import './globals.scss';

const notoSans = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  subsets: ['latin'],
});

const cubic11 = localFont({
  src: '../../public/fonts/Cubic_11.woff2',
  variable: '--font-cubic-11',
  display: 'swap',
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
        className={`${notoSans.variable} ${cubic11.variable} font-sans antialiased`}
        monica-locale="zh_TW"
      >
        <NextTopLoader />
        <Navbar />
        <main className="relative min-h-screen w-full max-w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
