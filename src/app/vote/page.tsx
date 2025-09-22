import voteDinosaur from '@/assets/images/vote-dinosaur.png';
import vote from '@/assets/images/vote.png';
import { VoteForm } from '@/components/forms/VoteForm';
import { FixedBg } from '@/components/sections/fixed-bg';
import { SkyScroll } from '@/components/sections/sky-scroll';
import { WayScroll } from '@/components/sections/way-scroll';
import Image from '@/lib/image';

const VotePage = () => {
  return (
    <div className="w-screen">
      <FixedBg>
        <SkyScroll />
      </FixedBg>

      <div className="container relative z-10 -mt-[100vh] px-3 pb-10 pt-10">
        <div className="mb-5 flex items-end justify-center gap-3">
          <div className="w-7/12 bg-sts-blue-600 p-3 text-center font-cubic text-base text-white nes-corners md:w-1/3">
            <p>投下你最喜歡的參賽者</p>
            <p>每日投票再抽好禮~</p>
          </div>
          <Image
            className="hidden max-h-32 w-auto md:block"
            src={voteDinosaur}
            alt="vote-dinosaur"
          />
          <Image
            src={vote}
            alt="vote"
            width={100}
            height={100}
            className="max-h-32 w-auto"
          />
        </div>
        <div className="relative pt-[1px]">
          <div
            className="absolute left-4 top-0 z-10 mt-[1px] h-8 w-[calc(100%-32px)] bg-[length:auto_40px] bg-repeat-x md:h-14 md:bg-[length:auto_64px]"
            style={{
              backgroundImage: "url('/images/element/ground.png')",
              backgroundPosition: 'left top',
            }}
          ></div>
          <div className="relative z-10 mx-auto mt-8 max-w-3xl bg-sts-orange-100 p-5 nes-corners md:mt-14">
            <VoteForm />
          </div>
        </div>
      </div>
      <WayScroll />
    </div>
  );
};

export default VotePage;
