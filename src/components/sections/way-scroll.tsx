'use client';

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
          className="my-drop-shadow absolute bottom-0 mx-auto mt-10 h-32 w-[3000px] bg-[url('/images/bg/runway.png')] bg-left-bottom bg-repeat-x [background-size:auto_50%] md:h-40"
          style={{ x: runwayX }}
        />
        <motion.div
          className="absolute bottom-0 mx-auto mt-10 h-32 w-[3000px] bg-[url('/images/bg/runway.png')] bg-left-bottom bg-repeat-x [background-size:auto_50%] [filter:blur(3px)] md:h-40"
          style={{ x: runwayX }}
        />
        {/* 跑道背景 */}
        <motion.div
          className="mx-auto h-16 w-[3000px] bg-[url('/images/bg/runway.png')] bg-left bg-repeat-x [background-size:auto_100%] md:h-20"
          style={{ x: runwayX }}
        />
      </div>
      {/* 按鈕背景（手機版） */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="mx-auto h-[48px] w-[3000px] bg-[url('/images/bg/runway.png')] bg-left-bottom bg-repeat-x [background-size:116%_700%] md:hidden"
          style={{ x: runwayX }}
        />
      </div>

      <ButtonSideButtons />
      <div className="absolute top-full -mt-[1px] h-10 w-full bg-white" />
    </div>
  );
};
