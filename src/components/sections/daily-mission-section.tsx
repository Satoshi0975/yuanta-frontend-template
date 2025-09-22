import { SectionCard } from '@/components/section-card';
import { DecorationIcons } from '@/components/ui/decoration-icons';
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
              ※當月交易<span className="text-primary">15天</span>
              ，抽獎次數<span className="text-primary">x2</span>
            </small>
          </p>
          <div className="mx-auto mt-4 max-w-[420px] rounded-xl bg-white/70 px-4 py-4 text-center text-base lg:text-lg 2xl:max-w-[520px]">
            <p>交易1天 = 1次抽獎機會</p>
            <p>交易2天 = 2次抽獎機會</p>
            <p>...</p>
            <p>以此類推</p>
          </div>
        </FadeInOnScroll>
      </SectionCard>
    </BounceLeftOnScroll>
  );
}
