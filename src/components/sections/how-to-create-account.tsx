import Step from '@/app/block/step/step';
import { SectionCard } from '@/components/section-card';

const HowToCreateAccount = () => {
  return (
    <SectionCard title="立即下單 賺積分">
      <div className="mx-auto max-w-[840px] space-y-4">
        <Step />
      </div>
    </SectionCard>
  );
};

export default HowToCreateAccount;
