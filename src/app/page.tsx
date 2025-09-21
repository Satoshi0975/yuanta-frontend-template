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

import { ScrollNavigator } from '@/components/ui/scroll-navigator';
import Step from './block/step/step';

export default function Home() {
  return (
    <div className="">
      {/* 內容層 */}
      <div className="relative z-10 pt-[100vh]">
        <FixedBg>
          <SkyScroll />
        </FixedBg>
        <div className="relative z-20" id="registration">
          <HeroSection />
          <WayScroll />
          <div
            className="container mx-auto mb-10 space-y-10 px-4 pt-10 [scroll-margin-top:50px]"
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
        </div>
        <div
          className="container -mt-2 flex flex-col px-4 [scroll-margin-top:65px] lg:mt-10"
          id="hot-to"
        >
          <SectionCard title="立即下單 賺積分">
            <div className="mx-auto max-w-[840px] space-y-4">
              <Step />
            </div>
          </SectionCard>
        </div>
      </div>
      <Information />
      <ScrollNavigator />
    </div>
  );
}
