import Dinosaur from '@/assets/character/dinosaur.svg';
import Hunter from '@/assets/character/hunter.svg';
import Princess from '@/assets/character/princess.svg';
import Wolf from '@/assets/character/wolf.svg';
import Gold from '@/assets/gold.svg';
import ground from '@/assets/images/element/ground.png';
import ice from '@/assets/images/element/ice.png';
import grass from '@/assets/images/element/grass.png';
import grass2 from '@/assets/images/element/grass2.png';
import water from '@/assets/images/element/water.png';

export function GroundElements() {
  return (
    <div className="h-30 absolute bottom-0 left-0 flex w-full items-end">
      {/* Left section */}
      <div className="relative h-full w-full lg:w-[45%]">
        <div className="absolute bottom-0 left-0 h-10 w-full bg-right bg-repeat-x [background-size:auto_100%] lg:h-16"
          style={{
            backgroundImage: `url(${ground.src})`,
          }}
        ></div>
        <div className="absolute bottom-0 left-[20%] h-10 w-[45%] bg-no-repeat [background-size:auto_100%] lg:h-16"
          style={{
            backgroundImage: `url(${ice.src})`,
          }}
        ></div>
        <div className="absolute bottom-10 right-72 h-12 w-60 bg-no-repeat [background-size:auto_100%] lg:bottom-16 lg:h-16"
          style={{
            backgroundImage: `url(${grass.src})`,
          }}
        ></div>
        <div className="absolute bottom-10 right-0 h-12 w-32 bg-no-repeat [background-size:auto_100%] lg:bottom-16 lg:h-16"
          style={{
            backgroundImage: `url(${grass2.src})`,
          }}
        ></div>

        {/* Desktop characters and elements */}
        <Gold className="absolute bottom-24 right-3 hidden w-12 lg:block gold-rotate-3d" />
        <Dinosaur className="right-70 absolute bottom-16 right-40 hidden w-32 lg:block" />
        <Wolf className="absolute bottom-16 right-80 hidden w-24 scale-x-100 lg:block" />

        {/* Mobile characters and elements */}
        <div className="lg:hidden">
          <div className="absolute bottom-16 left-32 flex gap-2">
            <Gold className="w-8 gold-rotate-3d" />
            <Gold className="w-8 gold-rotate-3d" />
          </div>
          <Dinosaur className="absolute bottom-[232px] left-10 w-20 md:w-24" />
          <Wolf className="absolute bottom-10 left-5 w-[4.5rem] md:w-20" />
          <Princess className="absolute bottom-10 right-20 w-20 md:w-24 md:right-28" />
          <Hunter className="absolute bottom-10 right-5 w-16 md:w-20" />
          <div className="absolute bottom-48 left-0 h-10 w-[35vw] bg-right bg-repeat-x [background-size:auto_100%]"
          style={{
            backgroundImage: `url(${ground.src})`,
          }}
          ></div>
        </div>
      </div>

      {/* Middle water section */}
      <div className="hidden h-10 w-[30%] [background-size:auto_100%] lg:block"
        style={{
          backgroundImage: `url(${water.src})`,
        }}
      ></div>

      {/* Right section */}
      <div className="relative hidden h-full w-[25%] lg:block">
        <div className="absolute bottom-0 left-0 h-16 w-full bg-left bg-repeat-x [background-size:auto_100%]"
          style={{
            backgroundImage: `url(${ground.src})`,
          }}
        ></div>
        <Gold className="absolute bottom-24 left-3 w-12 gold-rotate-3d" />
        <Gold className="absolute bottom-24 left-20 w-12 gold-rotate-3d" />
        <Hunter className="absolute bottom-16 left-40 w-24" />
      </div>
    </div>
  );
}