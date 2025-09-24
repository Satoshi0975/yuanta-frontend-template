'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ButtonSideButtons } from './button-side-buttons';

export const WayScroll = () => {
  const { scrollYProgress } = useScroll();

  // 讓跑道背景隨滾動向左移動，創造飛行的感覺
  const runwayX = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <div className="safari-sticky sticky bottom-0 z-10 w-screen">
      {/* 改進的陰影效果 */}
      <div className="pointer-events-none relative w-full overflow-hidden pt-10">
        {/* 主要跑道 */}

        {/* 簡化的光暈效果 */}
        <motion.div
          className="relative mx-auto h-16 w-[3000px] bg-[url('/images/bg/runway.png')] bg-left bg-repeat-x [background-size:auto_100%] [filter:drop-shadow(0_-3px_8px_rgba(255,255,255,0.7))] md:h-20"
          style={{ x: runwayX }}
        />
      </div>
      {/* 按鈕背景（手機版） */}
      <div className="-mb-[1px] w-full overflow-hidden">
        <motion.div
          className="mx-auto h-[48px] w-[3000px] bg-[url('/images/bg/runway.png')] bg-left-bottom bg-repeat-x [background-size:116%_700%] md:hidden"
          style={{ x: runwayX }}
        />
      </div>

      <ButtonSideButtons />
      <div className="absolute top-full z-0 -mt-[1px] h-32 w-full bg-white" />
    </div>
  );
};
