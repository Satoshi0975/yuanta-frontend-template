// import Cloud from '@/assets/cloud.svg';
import mapSM from '@/assets/images/map-sm.png';
import map from '@/assets/images/map.png';
import { Button } from '@/components/nes/button';
import Image from '@/lib/image';
import { SkyScroll } from './sky-scroll';

export function HeroSection() {
  return (
    <div className="relative flex h-screen w-full items-center bg-contain bg-repeat-x [background-image:url('/bg/sky2.png')]">
      <div className="">
        <SkyScroll
          numberOfClouds={8}
          baseSpeed={0.1}
          changeOpacity={false}
          size={120}
        />
      </div>
      <div className="container">
        <div className="px-4 pr-0 sm:pr-4">
          <div className="relative aspect-[0.8964] sm:aspect-[1.8541]">
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
            <div className="absolute inset-0 z-10 mr-4 flex flex-col items-center justify-center gap-2 sm:mr-0">
              <div className="space-y-2 text-center font-cubic text-xl sm:text-3xl">
                <p>活動期間＝報名期間</p>
                <p>萬元好禮等你拿！</p>
                <p className="!mb-6">▼ 立即報名參賽 ▼</p>
                <Button className="text-3xl lg:text-5xl [&>.section-middle]:!pb-7 [&>.section-middle]:!pt-4 lg:[&>.section-middle]:!pb-10 lg:[&>.section-middle]:!pt-6">
                  報名競賽
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
