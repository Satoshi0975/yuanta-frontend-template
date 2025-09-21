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

export function VoteSection() {
  return (
    <div className="relative flex h-screen w-full items-center bg-contain bg-repeat-x [background-image:url('/bg/sky2.png')]">
      {/* 雲朵背景層 */}
      <div className="absolute inset-0 z-0 lg:hidden"></div>
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
            <Button className="nes-button-secondary animate-retro-blink relative z-10 -mb-14 pb-7 pt-4 text-3xl sm:pb-10 sm:pt-6 sm:text-5xl lg:scale-110 lg:hover:scale-125">
              <span className="animate-pixel-glitch">立即投票</span>
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
        <WolfCloud className="animate-pixel-float absolute left-0 top-[7%] scale-75 xl:scale-100" />
        <PrincessCloud className="animate-pixel-float absolute right-[30%] top-[45%] scale-75 delay-1000 xl:scale-100" />
      </div>
      <div className="absolute bottom-0 right-0 hidden h-full w-1/2 lg:block">
        <DinosaurCloud className="animate-pixel-float absolute right-0 top-[60%] scale-75 [animation-delay:2000ms] xl:scale-100" />
        <HunterCloud className="animate-pixel-float absolute right-[10%] top-[25%] scale-75 [animation-delay:3000ms] xl:scale-100" />
      </div>
      <div className="absolute bottom-0 left-0 z-20 flex h-36 w-full items-end px-8 lg:hidden">
        <div className="container mx-auto grid grid-cols-[5fr_6fr_6fr_5fr] items-end justify-around gap-5">
          <Wolf className="mx-auto w-full max-w-[100px]" />
          <Dinosaur className="mx-auto w-full max-w-[120px]" />
          <Princess className="mx-auto w-full max-w-[120px]" />
          <Hunter className="mx-auto w-full max-w-[100px]" />
        </div>
      </div>
    </div>
  );
}
