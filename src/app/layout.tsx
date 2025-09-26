import sky from '@/assets/images/bg/sky.png';
import { LeftSideButtons } from '@/components/sections/left-side-buttons';
import { SkyScroll } from '@/components/sections/sky-scroll';
import { CloudElements } from '@/components/ui/cloud-elements';
import Footer from '@/components/ui/footer';
import { GroundElements } from '@/components/ui/ground-elements';
import { HeroBackground } from '@/components/ui/hero-background';
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
  title: '元大期貨｜2025 CME 交易競賽',
  description:
    '想賺獎金？想被看見？參加Super Yuanta交易任務，交易CME商品、投票人氣王，就有機會登上排行榜，抱回萬元好禮！',
  openGraph: {
    title: '元大期貨｜2025 CME 交易競賽',
    description:
      '想賺獎金？想被看見？參加Super Yuanta交易任務，交易CME商品、投票人氣王，就有機會登上排行榜，抱回萬元好禮！',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
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
        className={`${notoSans.variable} ${cubic11.variable} overflow-x-hidden font-sans antialiased`}
        monica-locale="zh_TW"
      >
        <NextTopLoader />
        <Navbar />
        <main className="relative min-h-screen w-full max-w-full">
          {/* 固定背景層 - 最底層 */}
          <div
            className="sticky inset-0 top-0 z-0 h-screen w-screen bg-contain bg-repeat-x"
            style={{
              backgroundImage: `url(${sky.src})`,
            }}
          >
            <HeroBackground />
            <SkyScroll size={160} baseSpeed={0.1} numberOfClouds={6} />
            <CloudElements />
            <GroundElements />
            {/* <div className="absolute bottom-0 left-0 h-[10vw] w-full bg-[url('/images/bg/runway.png')] bg-repeat-x [background-size:auto_100%]" /> */}
          </div>
          <div className="">
            {/* <div className="h-[2000px]"></div> */}
            {children}
          </div>
          <div className="fixed top-full z-[999] h-screen w-full bg-black" />
        </main>
        <LeftSideButtons />
        <Footer />
      </body>
    </html>
  );
}
