// import Cloud from '@/assets/cloud.svg';
import mapSM from '@/assets/images/map-sm.png';
import map from '@/assets/images/map.png';
import { Button } from '@/components/nes/button';
import Image from '@/lib/image';
import { SkyScroll } from './sky-scroll';

export function HeroSection() {
  return (
    <div className="relative flex h-screen w-full items-center bg-contain bg-repeat-x [background-image:url('/bg/sky2.png')]">
      {/* 雲朵背景層 */}
      <div className="absolute inset-0 z-0">
        <SkyScroll
          numberOfClouds={8}
          baseSpeed={0.1}
          changeOpacity={false}
          size={120}
        />
      </div>

      {/* 主要內容層 */}
      <div className="container relative z-10">
        <div className="px-4 pr-0 sm:pr-4">
          <div className="relative mx-auto aspect-[0.8964] max-w-md sm:aspect-[1.8541] sm:max-w-full">
            <Image
              src={mapSM}
              alt=""
              fill
              className="object-cover sm:hidden"
              priority
            />
            <Image
              src={map}
              alt=""
              fill
              className="hidden object-cover sm:block"
              priority
            />
            <div className="absolute inset-0 z-20 -mt-16 mr-4 flex flex-col items-center justify-center gap-2 sm:-mt-0 sm:mr-0">
              <div className="text-sts-orange-500 space-y-1 text-center font-cubic text-xl sm:space-y-2 sm:text-3xl">
                <p>活動期間＝報名期間</p>
                <p>萬元好禮等你拿！</p>
                <p className="!mb-5">▼ 立即報名參賽 ▼</p>
                <Button className="nes-button text-3xl lg:text-5xl [&>.section-middle]:!pb-7 [&>.section-middle]:!pt-4 md:[&>.section-middle]:!pb-10 md:[&>.section-middle]:!pt-6">
                  報名競賽
                </Button>
                <p className="text-sm md:text-base">
                  <small className="text-sts-orange-500">
                    ★中途報名，也可回朔活動期間的成績
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
