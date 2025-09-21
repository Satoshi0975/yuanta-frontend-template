import Dinosaur from '@/assets/character/dinosaur.svg';
import Hunter from '@/assets/character/hunter.svg';
import Princess from '@/assets/character/princess.svg';
import Wolf from '@/assets/character/wolf.svg';
import Gold from '@/assets/gold.svg';

export function GroundElements() {
  return (
    <div className="h-30 absolute bottom-0 left-0 flex w-full items-end">
      {/* Left section */}
      <div className="relative h-full w-full lg:w-[45%]">
        <div className="absolute bottom-0 left-0 h-10 w-full bg-[url('/images/element/ground.png')] bg-right bg-repeat-x [background-size:auto_100%] lg:h-16"></div>
        <div className="absolute bottom-0 left-[20%] h-10 w-[45%] bg-[url('/images/element/ice.png')] bg-no-repeat [background-size:auto_100%] lg:h-16"></div>
        <div className="absolute bottom-10 right-72 h-12 w-60 bg-[url('/images/element/grass.png')] bg-no-repeat [background-size:auto_100%] lg:bottom-16 lg:h-16"></div>
        <div className="absolute bottom-10 right-0 h-12 w-32 bg-[url('/images/element/grass2.png')] bg-no-repeat [background-size:auto_100%] lg:bottom-16 lg:h-16"></div>

        {/* Desktop characters and elements */}
        <Gold className="absolute bottom-24 right-3 hidden w-12 lg:block" />
        <Dinosaur className="right-70 absolute bottom-16 right-40 hidden w-32 lg:block" />
        <Wolf className="absolute bottom-16 right-80 hidden w-24 scale-x-100 lg:block" />

        {/* Mobile characters and elements */}
        <div className="lg:hidden">
          <div className="absolute bottom-16 left-32 flex gap-2">
            <Gold className="w-8" />
            <Gold className="w-8" />
          </div>
          <Dinosaur className="absolute bottom-[232px] left-10 w-20 md:w-24" />
          <Wolf className="absolute bottom-10 left-5 w-[4.5rem] md:w-20" />
          <Princess className="absolute bottom-10 right-20 w-20 md:w-24 md:right-28" />
          <Hunter className="absolute bottom-10 right-5 w-16 md:w-20" />
          <div className="absolute bottom-48 left-0 h-10 w-[35vw] bg-[url('/images/element/ground.png')] bg-right bg-repeat-x [background-size:auto_100%]"></div>
        </div>
      </div>

      {/* Middle water section */}
      <div className="hidden h-10 w-[30%] bg-[url('/images/element/water.png')] [background-size:auto_100%] lg:block"></div>

      {/* Right section */}
      <div className="relative hidden h-full w-[25%] lg:block">
        <div className="absolute bottom-0 left-0 h-16 w-full bg-[url('/images/element/ground.png')] bg-left bg-repeat-x [background-size:auto_100%]"></div>
        <Gold className="absolute bottom-24 left-3 w-12" />
        <Gold className="absolute bottom-24 left-20 w-12" />
        <Hunter className="absolute bottom-16 left-40 w-24" />
      </div>
    </div>
  );
}