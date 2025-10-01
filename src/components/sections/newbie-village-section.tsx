import { SectionCard } from '@/components/section-card';
import { DecorationIcons } from '@/components/ui/decoration-icons';
import { BounceLeftOnScroll, FadeInOnScroll } from '../animation-container';

export function NewbieVillageSection() {
  return (
    <BounceLeftOnScroll delay={0.2} repeat className="flex flex-col pt-2">
      <DecorationIcons variant="newbie" />
      <SectionCard title="新手村">
        <FadeInOnScroll
          delay={0.4}
          repeat
          className="flex h-full flex-col items-center justify-around"
        >
          <h2 className="mb-2 whitespace-pre-wrap text-center text-xl font-bold sm:text-2xl">
            <span className="text-sts-blue-500">新戶/靜止戶</span>交易
            <br />送
            <span className="ml-2 text-sts-blue-500">100元超商電子禮券</span>
          </h2>
          <div className="mx-auto mt-auto max-w-[420px] rounded-xl bg-white/70 px-4 py-5 text-sm lg:text-base 2xl:max-w-[520px]">
            <ol className="ml-4 list-disc space-y-4 marker:text-orange-500">
              <li className="pl-1 text-justify">
                新戶定義：2025/01/01-12/31期間於元大期貨或所屬券商合作夥伴完成新開立期貨帳戶，且2025/01/01-2025/09/30未交易過CME商品，於活動期間交易活動商品即符合資格戶。
              </li>
              <li className="pl-1 text-justify">
                靜止定義：2024/12/31以前已於元大期貨或所屬券商合作夥伴開戶者，且2025/1/1-2025/9/30期間從未交易本活動商品者。
              </li>
            </ol>
          </div>
        </FadeInOnScroll>
      </SectionCard>
    </BounceLeftOnScroll>
  );
}
