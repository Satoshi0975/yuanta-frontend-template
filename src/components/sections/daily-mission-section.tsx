import coin from '@/assets/images/coin.png';
import { SectionCard } from '@/components/section-card';
import { DecorationIcons } from '@/components/ui/decoration-icons';
import Image from '@/lib/image';
import { BounceLeftOnScroll, FadeInOnScroll } from '../animation-container';

export function DailyMissionSection() {
  return (
    <BounceLeftOnScroll delay={0.6} className="flex flex-col pt-2" repeat>
      <DecorationIcons variant="daily" />
      <SectionCard title="每日任務">
        <FadeInOnScroll delay={0.8} repeat>
          <h2 className="whitespace-pre-wrap text-center text-xl font-bold sm:text-2xl">
            日日交易日日獲抽獎機會
            <br />
            <span className="ml-2 text-sts-blue-500">
              月月抽元大期貨金幣3枚
            </span>
          </h2>
          <p className="text-center">
            <small>
              ※當月交易
              <span className="text-primary underline">15天(含)以上</span>
              ，抽獎次數<span className="text-primary">x2</span>
            </small>
          </p>
          <div className="mx-auto mt-4 grid max-w-[420px] grid-cols-1 gap-2 sm:grid-cols-12 2xl:max-w-[520px]">
            <div className="order-2 rounded-xl bg-white/70 px-4 py-2 text-center text-base sm:order-1 sm:col-span-8 md:col-span-7 md:text-sm lg:col-span-8 lg:text-base">
              <p>交易1天 = 1次抽獎機會</p>
              <p>交易2天 = 2次抽獎機會</p>
              <p>...</p>
              <p>(以此類推)</p>
              <p>交易15天 = 30次抽獎機會</p>
              <p>交易16天 = 32次抽獎機會</p>
              <p>...</p>
            </div>
            <div className="relative order-1 flex flex-col items-center justify-center rounded-xl bg-white/70 px-4 py-2 sm:order-2 sm:col-span-4 md:col-span-5 lg:col-span-4">
              <Image src={coin} alt="coin" className="w-full max-w-28" />
              <p className="mt-2 text-center text-xs text-gray-500">
                價值 8,000元
              </p>
            </div>
          </div>
        </FadeInOnScroll>
      </SectionCard>
    </BounceLeftOnScroll>
  );
}
