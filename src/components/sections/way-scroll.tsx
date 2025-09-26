'use client';

import runwayImage from '@/assets/images/bg/runway.png';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ButtonSideButtons } from './button-side-buttons';

export const WayScroll = () => {
  const { scrollYProgress } = useScroll();

  // 讓跑道背景隨滾動向左移動，創造飛行的感覺
  const runwayX = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <div className="safari-sticky sticky bottom-0 z-50 w-screen">
      {/* 陰影效果 */}
      <div className="pointer-events-none relative w-full overflow-hidden pt-10">
        <motion.div
          className="my-drop-shadow absolute bottom-0 mx-auto mt-10 h-32 w-[3000px] bg-left-bottom bg-repeat-x md:h-40"
          style={{
            x: runwayX,
            backgroundImage: `url(${runwayImage.src})`,
            backgroundSize: 'auto 50%',
          }}
        />
        <motion.div
          className="absolute bottom-0 mx-auto mt-10 h-32 w-[3000px] bg-left-bottom bg-repeat-x [filter:blur(3px)] md:h-40"
          style={{
            x: runwayX,
            backgroundImage: `url(${runwayImage.src})`,
            backgroundSize: 'auto 50%',
          }}
        />
        {/* 跑道背景 */}
        <motion.div
          className="mx-auto h-16 w-[3000px] bg-left bg-repeat-x md:h-20"
          style={{
            x: runwayX,
            backgroundImage: `url(${runwayImage.src})`,
            backgroundSize: 'auto 100%',
          }}
        />
      </div>
      {/* 按鈕背景（手機版） */}
      <div className="-mb-[1px] w-full overflow-hidden">
        <motion.div
          className="mx-auto h-[48px] w-[3000px] bg-left-bottom bg-repeat-x md:hidden"
          style={{
            x: runwayX,
            backgroundImage: `url(${runwayImage.src})`,
            backgroundSize: '116% 700%',
          }}
        />
      </div>

      <ButtonSideButtons />
      <div className="absolute top-full z-0 -mt-[1px] h-32 w-full bg-white" />
    </div>
  );
};
