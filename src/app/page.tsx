import { SectionCard } from '@/components/section-card';
import { DailyMissionSection } from '@/components/sections/daily-mission-section';
import { FixedBg } from '@/components/sections/fixed-bg';
import { HeroSection } from '@/components/sections/hero-section';
import Information from '@/components/sections/Information';
import { MainMissionSection } from '@/components/sections/main-mission-section';
import { NewbieVillageSection } from '@/components/sections/newbie-village-section';
import { PopularityRankingSection } from '@/components/sections/popularity-ranking-section';
import { SkyScroll } from '@/components/sections/sky-scroll';
import { VoteSection } from '@/components/sections/vote-section';
import { WayScroll } from '@/components/sections/way-scroll';
import { CloudElements } from '@/components/ui/cloud-elements';
import { GroundElements } from '@/components/ui/ground-elements';
import { HeroBackground } from '@/components/ui/hero-background';
import Step from './block/step/step';

export default function Home() {
  return (
    <div className="">
      {/* 固定背景層 - 最底層 */}
      <div className="fixed inset-0 z-0 h-screen w-screen bg-contain bg-repeat-x [background-image:url('/bg/sky.png')]">
        <HeroBackground />
        <SkyScroll size={160} baseSpeed={0.1} numberOfClouds={8} />
        <CloudElements />
        <GroundElements />
        {/* <div className="absolute bottom-0 left-0 h-[10vw] w-full bg-[url('/images/bg/runway.png')] bg-repeat-x [background-size:auto_100%]" /> */}
      </div>

      {/* 內容層 */}
      <div className="relative z-10 pt-[100vh]">
        <FixedBg>
          <SkyScroll />
        </FixedBg>
        <div className="relative z-20" id="registration">
          <HeroSection />
          <WayScroll />
          <div
            className="container mx-auto mb-10 mt-10 space-y-10 px-4"
            id="competition"
          >
            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
              <NewbieVillageSection />
              <DailyMissionSection />
            </div>
            <MainMissionSection />
            <PopularityRankingSection />
          </div>
          <div id="vote">
            <VoteSection />
          </div>
          <div
            className="container -mt-2 flex flex-col px-4 lg:mt-10"
            id="hot-to"
          >
            <SectionCard title="立即下單 賺積分">
              <div className="mx-auto max-w-[840px] space-y-4">
                <Step />
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
      <Information />
    </div>
  );
}
