import { SectionCard } from '@/components/section-card';
import { DailyMissionSection } from '@/components/sections/daily-mission-section';
import { FixedBg } from '@/components/sections/fixed-bg';
import { HeroSection } from '@/components/sections/hero-section';
import { MainMissionSection } from '@/components/sections/main-mission-section';
import { NewbieVillageSection } from '@/components/sections/newbie-village-section';
import { PopularityRankingSection } from '@/components/sections/popularity-ranking-section';
import { SkyScroll } from '@/components/sections/sky-scroll';
import { VoteSection } from '@/components/sections/vote-section';
import { WayScroll } from '@/components/sections/way-scroll';
import { CloudElements } from '@/components/ui/cloud-elements';
import { GroundElements } from '@/components/ui/ground-elements';
import { HeroBackground } from '@/components/ui/hero-background';

export default function Home() {
  return (
    <div className="">
      {/* 固定背景層 - 最底層 */}
      <div className="fixed inset-0 z-0 h-screen w-screen bg-contain bg-repeat-x [background-image:url('/bg/sky.png')]">
        <HeroBackground />
        <CloudElements />
        <GroundElements />
        {/* <div className="absolute bottom-0 left-0 h-[10vw] w-full bg-[url('/images/bg/runway.png')] bg-repeat-x [background-size:auto_100%]" /> */}
      </div>

      {/* 內容層 */}
      <div className="relative z-10 pt-[120vh]">
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
          <VoteSection />
          <div className="-mt-1 flex flex-col pt-0">
            <SectionCard title="立即下單 賺積分">
              <div className="mx-auto max-w-[840px] space-y-4"></div>
            </SectionCard>
          </div>
        </div>
      </div>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
    </div>
  );
}
