import KM from '@/assets/KM.svg';

export function HeroBackground() {
  return (
    <div className="container relative h-full pt-8 sm:pt-14">
      <KM className="relative z-20 mx-auto pt-[14vh] w-[max(80vh,42rem)] max-w-[100%] px-10 md:w-[max(80vh,42rem)] md:max-w-[90%]" />
    </div>
  );
}