import Information from '@/components/sections/Information';
import { DailyMissionSection } from '@/components/sections/daily-mission-section';
import { FixedBg } from '@/components/sections/fixed-bg';
import { HeroSection } from '@/components/sections/hero-section';
import HowToCreateAccount from '@/components/sections/how-to-create-account';
import { MainMissionSection } from '@/components/sections/main-mission-section';
import { MainRankingSection } from '@/components/sections/main-ranking-section';
import { NewbieVillageSection } from '@/components/sections/newbie-village-section';
import { PopularityRankingSection } from '@/components/sections/popularity-ranking-section';
import { SkyScroll } from '@/components/sections/sky-scroll';
import { VoteSection } from '@/components/sections/vote-section';
import { WayScroll } from '@/components/sections/way-scroll';
import { ScrollNavigator } from '@/components/ui/scroll-navigator';

export default function Home() {
  return (
    <div className="">
      {/* 內容層 */}
      <div className="relative z-0">
        <FixedBg>
          <SkyScroll />
        </FixedBg>
        <div className="relative z-10" id="registration">
          <HeroSection />
          <div>
            <div
              className="container mx-auto space-y-10 px-4 pt-10"
              id="competition"
            >
              <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
                <NewbieVillageSection />
                <DailyMissionSection />
              </div>
              <MainMissionSection />
              <MainRankingSection />
              <PopularityRankingSection />
            </div>
            <WayScroll />
          </div>
          <div id="vote" className="relative z-50">
            <VoteSection />
          </div>
        </div>
        <div
          className="container -mt-2 flex flex-col px-4 pb-10 [scroll-margin-top:65px] lg:mt-10"
          id="hot-to"
        >
          <HowToCreateAccount />
        </div>
      </div>
      <Information />
      <ScrollNavigator />
    </div>
  );
}
