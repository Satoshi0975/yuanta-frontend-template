import { SectionCard } from '@/components/section-card';
import { DecorationIcons } from '@/components/ui/decoration-icons';

export function NewbieVillageSection() {
  return (
    <div className="flex flex-col pt-2">
      <DecorationIcons variant="newbie" />
      <SectionCard title="新手村">
        <h2 className="whitespace-pre-wrap text-center text-xl font-bold sm:text-2xl">
          <span className="text-sts-blue-500">新戶/靜止戶</span>交易
          <br />送
          <span className="text-sts-blue-500 ml-2">100元超商電子禮券</span>
        </h2>
        <div className="mx-auto mt-4 max-w-[420px] rounded-xl bg-white/70 px-4 py-2 text-sm lg:text-base 2xl:max-w-[520px]">
          <ol className="ml-4 list-disc space-y-2 marker:text-orange-500">
            <li className="pl-1 text-justify">
              新戶定義：2025/01/01-12/31期間於元大期貨或所屬券商合作夥伴完成新開立期貨帳戶，並交易即符合資格戶。
            </li>
            <li className="pl-1 text-justify">
              靜止定義：已於元大期貨或所屬券商合作夥伴開戶者，最後交易日2024/12/31以前，從未交易本次活動商品者。
            </li>
          </ol>
        </div>
      </SectionCard>
    </div>
  );
}
