import switchImage from '@/assets/images/switch.png';
import { BounceOnScroll } from '@/components/animation-container';
import { Button } from '@/components/nes/button';
import { SectionCard } from '@/components/section-card';
import { DecorationIcons } from '@/components/ui/decoration-icons';
import { PrizeTable } from '@/components/ui/prize-table';
import Image from '@/lib/image';
import OtherRanksDialog from '../dialogs/other-ranks-dialog';
import RankingDialog from '../dialogs/ranking-dialog';
import ScoreExplanationDialog from '../dialogs/score-explanation-dialog';

export function MainMissionSection() {
  const mainPrizeData = [
    { rank: '第一名', prize: 100000 },
    { rank: '第二名', prize: 90000 },
    { rank: '第三名', prize: 80000 },
    { rank: '第四名', prize: 75000 },
    { rank: '第五名', prize: 70000 },
  ];

  const leftTableData = [
    { rank: '第一名', prize: 25_000 },
    { rank: '第二名', prize: 20_000 },
    { rank: '第三名', prize: 15_000 },
  ];

  const rightTableData = [
    { rank: '第一名', prize: 25_000 },
    { rank: '第二名', prize: 20_000 },
    { rank: '第三名', prize: 15_000 },
  ];

  return (
    <BounceOnScroll delay={0.2} repeat className="flex flex-col pt-2">
      <DecorationIcons variant="main" />
      <SectionCard title="主要任務">
        <div className="mx-auto max-w-[840px] space-y-4">
          <div>
            <h2 className="whitespace-pre-wrap text-center text-xl font-bold text-sts-blue-500 sm:text-2xl">
              競賽至少需累積200口以上，始符合排行獎獲獎資格
            </h2>
            <p className="mt-1 text-center tracking-tight">
              亦可每日於戰績查詢專區登入查個人即時名次（以活動結束為憑，查詢僅供參考），活動結束最後結算時間為12/31
              T盤交易時間截止。
            </p>
          </div>
          <ScoreExplanationDialog>
            <Button
              variant="secondary"
              className="ml-auto mt-3 pb-2 pt-1 text-base"
            >
              活動積分計算方式
            </Button>
          </ScoreExplanationDialog>
          <PrizeTable
            title="TOP 10"
            data={mainPrizeData}
            showThirdColumn={true}
            thirdColumnTitle="獎品"
            thirdColumnContent={
              <div className="flex h-full flex-col justify-center">
                <div className="relative mx-auto w-3/5">
                  <Image src={switchImage} alt="switch" className="w-full" />
                </div>
                <OtherRanksDialog>
                  <Button
                    variant="secondary"
                    className="mt-3 pb-2 pt-1 text-base"
                  >
                    其他名次獎項
                  </Button>
                </OtherRanksDialog>
              </div>
            }
          />
          {/* <div className="rounded-lg bg-black text-center text-xl shadow-lg nes-corners">
            <div className="grid grid-cols-2 gap-1 md:grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,5fr)]">
              <div className="bg-blue-600 p-3 font-semibold text-white">
                TOP 10
              </div>
              <div className="bg-blue-400 p-3 font-semibold text-white">
                獎金
              </div>
              <div className="hidden bg-blue-600 p-3 font-semibold text-white md:block">
                獎品
              </div>

              <div className="bg-white p-3">第一名</div>
              <div className="bg-white p-3">100,000</div>

              <div className="bg-white p-3">第二名</div>
              <div className="bg-white p-3">90,000</div>

              <div className="bg-white p-3">第三名</div>
              <div className="bg-white p-3">80,000</div>

              <div className="bg-white p-3">第四名</div>
              <div className="bg-white p-3">70,000</div>

              <div className="bg-white p-3">第五名</div>
              <div className="bg-white p-3">60,000</div>

              <div className="col-span-2 bg-blue-600 p-3 font-semibold text-white md:col-span-1 md:col-start-3 md:row-span-5 md:row-start-2 md:hidden">
                標題 3
              </div>

              <div className="col-span-2 bg-white p-4 md:col-span-1 md:col-start-3 md:row-span-5 md:row-start-2">
                <div className="flex h-full flex-col justify-center">
                </div>
              </div>
            </div>
          </div> */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <PrizeTable
              title="報酬率王"
              titleColor="green"
              data={leftTableData}
            />
            <PrizeTable
              title="口數王"
              titleColor="orange"
              data={rightTableData}
            />
          </div>
          <RankingDialog>
            <Button className="mx-auto mt-3 pb-4 pt-2 text-2xl">
              主要任務排名
            </Button>
          </RankingDialog>
        </div>
      </SectionCard>
    </BounceOnScroll>
  );
}
