import switchImage from '@/assets/images/switch.png';
import { Button } from '@/components/nes/button';
import { SectionCard } from '@/components/section-card';
import { DecorationIcons } from '@/components/ui/decoration-icons';
import { PrizeTable } from '@/components/ui/prize-table';
import Image from '@/lib/image';

export function MainMissionSection() {
  const mainPrizeData = [
    { rank: '第一名', prize: 100000 },
    { rank: '第二名', prize: 90000 },
    { rank: '第三名', prize: 80000 },
    { rank: '第四名', prize: 70000 },
    { rank: '第五名', prize: 60000 },
  ];

  const leftTableData = [
    { rank: '第一名', prize: 100000 },
    { rank: '第二名', prize: 90000 },
    { rank: '第三名', prize: 80000 },
  ];

  const rightTableData = [
    { rank: '第一名', prize: 100000 },
    { rank: '第二名', prize: 90000 },
    { rank: '第三名', prize: 80000 },
  ];

  return (
    <div className="flex flex-col pt-2">
      <DecorationIcons variant="main" />
      <SectionCard title="主要任務">
        <div className="mx-auto max-w-[840px] space-y-4">
          <div>
            <h2 className="text-sts-blue-500 whitespace-pre-wrap text-center text-xl font-bold sm:text-2xl">
              競賽至少需累積200口以上，始符合排行獎獲獎資格
            </h2>
            <p className="mt-1 text-center tracking-tight">
              亦可每日於戰績查詢專區登入查個人即時名次，活動結束最後結算時間為12/31
              T盤交易時間截止。
            </p>
          </div>

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
                <Button
                  variant="secondary"
                  className="mt-3 text-base [&>.section-middle]:pb-2 [&>.section-middle]:pt-1"
                >
                  其他名次獎項
                </Button>
              </div>
            }
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <PrizeTable title="TOP 3" titleColor="green" data={leftTableData} />
            <PrizeTable
              title="TOP 3"
              titleColor="orange"
              data={rightTableData}
            />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
