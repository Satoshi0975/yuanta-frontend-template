// import Cloud from '@/assets/cloud.svg';
import DinosaurCloud from '@/assets/character-cloud/dinosaur.svg';
import HunterCloud from '@/assets/character-cloud/hunter.svg';
import PrincessCloud from '@/assets/character-cloud/princess.svg';
import WolfCloud from '@/assets/character-cloud/wolf.svg';
import Dinosaur from '@/assets/character/dinosaur.svg';
import Hunter from '@/assets/character/hunter.svg';
import Princess from '@/assets/character/princess.svg';
import Wolf from '@/assets/character/wolf.svg';
import treasure from '@/assets/images/treasure.png';
import { Button } from '@/components/nes/button';
import Image from '@/lib/image';
import { SkyScroll } from './sky-scroll';

export function VoteSection() {
  return (
    <div className="relative flex h-screen w-full items-center bg-contain bg-repeat-x [background-image:url('/bg/sky2.png')]">
      {/* 雲朵背景層 */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <SkyScroll
          numberOfClouds={8}
          baseSpeed={0.1}
          changeOpacity={false}
          size={120}
        />
      </div>
      <div className="container">
        <div className="relative m-auto -mt-36 flex flex-col items-center justify-center gap-8 sm:-mt-0">
          {/* 文字內容層 - 在上層 */}
          <div className="relative z-20 space-y-2 text-center font-cubic text-2xl text-white sm:text-4xl">
            <p className="font-bold">一起為參賽者加油打氣</p>
            <p className="!mb-6 font-bold">日日投票者 也有機會抽好禮</p>
            <p className="text-2xl">\ 日日投 得獎率越高 /</p>
          </div>

          {/* 圖片層 - 在下層 */}
          <div className="z-10">
            <Button className="nes-button-secondary relative z-10 -mb-14 text-3xl sm:text-5xl lg:scale-110 [&>.section-middle]:!pb-7 [&>.section-middle]:!pt-4 sm:[&>.section-middle]:!pb-10 sm:[&>.section-middle]:!pt-6">
              立即投票
            </Button>
            <Image
              src={treasure}
              alt=""
              width={260}
              height={195}
              className="h-auto w-72 object-contain sm:w-80 md:w-[30rem]"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 hidden h-full w-1/2 lg:block">
        <WolfCloud className="absolute left-0 top-[7%]" />
        <PrincessCloud className="absolute right-[30%] top-[45%]" />
      </div>
      <div className="absolute bottom-0 right-0 hidden h-full w-1/2 lg:block">
        <DinosaurCloud className="absolute right-0 top-[60%]" />
        <HunterCloud className="absolute right-[10%] top-[25%]" />
      </div>
      <div className="absolute bottom-0 left-0 z-20 grid h-36 w-full grid-cols-[5fr_6fr_6fr_5fr] items-end justify-around gap-5 px-8 lg:hidden">
        <Wolf className="mx-auto w-full max-w-[120px]" />
        <Dinosaur className="mx-auto w-full max-w-[148px]" />
        <Princess className="mx-auto w-full max-w-[148px]" />
        <Hunter className="mx-auto w-full max-w-[120px]" />
      </div>
    </div>
  );
}
