import Cloud from '@/assets/cloud.svg';
import Princess from '@/assets/character/princess.svg';

export function CloudElements() {
  return (
    <>
      {/* Desktop clouds */}
      <div className="hidden lg:block">
        {/* <Cloud className="absolute left-[5%] top-[30%] w-[32vh]" /> */}
        <Cloud className="absolute -left-[5%] top-[60%] w-[40vh] opacity-80" />
        {/* <Cloud className="absolute -left-[13%] top-[60%] w-[40vh]" /> */}
        <Cloud className="absolute right-[0%] bottom-[45%] w-[38vh] opacity-80 animate-pixel-float " />
        <Princess className="absolute right-[5%] bottom-[47%] w-24 animate-pixel-float" />
        {/* <Cloud className="absolute right-[-30%] top-[20%] w-[10vh]" /> */}
      </div>

      {/* Mobile clouds */}
      <div className="block lg:hidden">
        {/* <Cloud className="absolute left-[5%] top-[20%] w-40" />
        <Cloud className="absolute -left-[5%] top-[50%] w-48" />
        <Cloud className="absolute -left-[13%] top-[50%] w-48" />
        <Cloud className="absolute right-[0%] top-[40%] w-32" />
        <Cloud className="absolute right-[30%] top-[60%] w-20" /> */}
      </div>
      
    </>
  );
}