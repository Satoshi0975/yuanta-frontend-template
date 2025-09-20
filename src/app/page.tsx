import KM from '@/assets/KM.svg';
import Dinosaur from '@/assets/character/dinosaur.svg';
import Hunter from '@/assets/character/hunter.svg';
import Princess from '@/assets/character/princess.svg';
import Wolf from '@/assets/character/wolf.svg';
import Cloud from '@/assets/cloud.svg';
import Gold from '@/assets/gold.svg';
import { DailyMissionSection } from '@/components/sections/daily-mission-section';
import { FixedBg } from '@/components/sections/fixed-bg';
import { HeroSection } from '@/components/sections/hero-section';
import { MainMissionSection } from '@/components/sections/main-mission-section';
import { NewbieVillageSection } from '@/components/sections/newbie-village-section';
import { PopularityRankingSection } from '@/components/sections/popularity-ranking-section';
import { SkyScroll } from '@/components/sections/sky-scroll';
import { WayScroll } from '@/components/sections/way-scroll';

export default function Home() {
  return (
    <div className="">
      <div className="fixed h-screen w-screen bg-contain bg-repeat-x [background-image:url('/bg/sky.png')]">
        <div className="container relative h-full pt-14">
          <KM className="relative z-20 mx-auto mt-[14vh] w-[max(80vh,42rem)] max-w-[100%] px-10 md:w-[max(80vh,42rem)] md:max-w-[90%]" />
          <div className="hidden lg:block">
            <Cloud className="absolute left-[5%] top-[30%] w-[32vh]" />
            <Cloud className="absolute -left-[5%] top-[60%] w-[40vh]" />
            <Cloud className="absolute -left-[13%] top-[60%] w-[40vh]" />
            <Cloud className="absolute right-[0%] top-[45%] w-[38vh]" />
            <Princess className="absolute right-[5%] top-[42%] w-24" />
            <Cloud className="absolute right-[-30%] top-[20%] w-[10vh]" />
          </div>
          <div className="block lg:hidden">
            <Cloud className="absolute left-[5%] top-[20%] w-40" />
            <Cloud className="absolute -left-[5%] top-[50%] w-48" />
            <Cloud className="absolute -left-[13%] top-[50%] w-48" />
            <Cloud className="absolute right-[0%] top-[40%] w-32" />
            <Cloud className="absolute right-[30%] top-[60%] w-20" />
          </div>
        </div>
        <div className="h-30 absolute bottom-0 left-0 flex w-full items-end">
          <div className="relative h-full w-full lg:w-[45%]">
            <div className="absolute bottom-0 left-0 h-10 w-full bg-[url('/images/element/ground.png')] bg-right bg-repeat-x [background-size:auto_100%] lg:h-16"></div>
            <div className="absolute bottom-0 left-[20%] h-10 w-[45%] bg-[url('/images/element/ice.png')] bg-no-repeat [background-size:auto_100%] lg:h-16"></div>
            <div className="absolute bottom-10 right-72 h-12 w-60 bg-[url('/images/element/grass.png')] bg-no-repeat [background-size:auto_100%] lg:bottom-16 lg:h-16"></div>
            <div className="absolute bottom-10 right-0 h-12 w-32 bg-[url('/images/element/grass2.png')] bg-no-repeat [background-size:auto_100%] lg:bottom-16 lg:h-16"></div>
            <Gold className="absolute bottom-24 right-3 hidden w-12 lg:block" />
            <Dinosaur className="right-70 absolute bottom-16 right-40 hidden w-32 lg:block" />
            <Wolf className="absolute bottom-16 right-80 hidden w-24 scale-x-100 lg:block" />
            <div className="lg:hidden">
              <div className="absolute bottom-16 left-32 flex gap-2">
                <Gold className="w-8" />
                <Gold className="w-8" />
              </div>

              <Dinosaur className="right-70 absolute bottom-[14.5rem] w-20" />
              <Wolf className="absolute bottom-10 left-5 w-[4.5rem] lg:hidden" />
              <Princess className="absolute bottom-10 right-20 w-20 lg:hidden" />
              <Hunter className="absolute bottom-10 right-5 w-16" />
              <div className="absolute bottom-48 left-0 h-10 w-[35vw] bg-[url('/images/element/ground.png')] bg-right bg-repeat-x [background-size:auto_100%] lg:h-16"></div>
            </div>
          </div>
          <div className="hidden h-10 w-[30%] bg-[url('/images/element/water.png')] [background-size:auto_100%] lg:block"></div>
          <div className="relative hidden h-full w-[25%] lg:block">
            <div className="absolute bottom-0 left-0 h-16 w-full bg-[url('/images/element/ground.png')] bg-left bg-repeat-x [background-size:auto_100%]"></div>
            <Gold className="absolute bottom-24 left-3 w-12" />
            <Gold className="absolute bottom-24 left-20 w-12" />
            <Hunter className="absolute bottom-16 left-40 w-24" />
          </div>
        </div>
        {/* <div className="absolute bottom-0 left-0 h-[10vw] w-full bg-[url('/images/bg/runway.png')] bg-repeat-x [background-size:auto_100%]" /> */}
      </div>
      <div className="min-h-[200vh] pt-[100vh]">
        <FixedBg>
          <SkyScroll />
        </FixedBg>
        <div className="relative z-20">
          <WayScroll />
          <HeroSection />
          <div className="container mx-auto mt-10 space-y-10 px-4">
            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
              <NewbieVillageSection />
              <DailyMissionSection />
            </div>
            <MainMissionSection />
            <PopularityRankingSection />
          </div>
        </div>
      </div>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
    </div>
  );
}
