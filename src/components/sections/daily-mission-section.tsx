import { SectionCard } from '@/components/section-card';
import { DecorationIcons } from '@/components/ui/decoration-icons';

export function DailyMissionSection() {
  return (
    <div className="flex flex-col pt-2">
      <DecorationIcons variant="daily" />
      <SectionCard title="每日任務">
        <h2 className="whitespace-pre-wrap text-center text-xl sm:text-2xl">
          日日交易日日獲抽獎機會
          <br />
          <span className="ml-2 text-primary">
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
      </SectionCard>
    </div>
  );
}