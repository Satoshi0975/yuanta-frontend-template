'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ButtonSideButtons } from './button-side-buttons';

export const WayScroll = () => {
  const { scrollYProgress } = useScroll();

  // 讓跑道背景隨滾動向左移動，創造飛行的感覺
  const runwayX = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <div className="safari-sticky pointer-events-none sticky bottom-0 z-50 w-screen pt-10">
      <div className="relative">
        <motion.div
          className="my-drop-shadow absolute bottom-0 mx-auto mt-10 h-32 w-[3000px] bg-[url('/images/bg/runway.png')] bg-left-bottom bg-repeat-x [background-size:auto_50%] md:h-40"
          style={{ x: runwayX }}
        />
        <motion.div
          className="absolute bottom-0 mx-auto mt-10 h-32 w-[3000px] bg-[url('/images/bg/runway.png')] bg-left-bottom bg-repeat-x [background-size:auto_50%] [filter:blur(5px)] md:h-40"
          style={{ x: runwayX }}
        />
        {/* <motion.div
        className="absolute bottom-0 mx-auto h-16 w-[8820px] bg-[url('/images/bg/runway.png')] bg-repeat-x [background-size:auto_100%] [filter:blur(5px)] md:h-20"
        style={{ x: runwayX }}
      /> */}
        {/* 底部漸層背景 */}
        {/* <div className="background-blur absolute bottom-0 left-0 h-28 w-full bg-blue-200/50 md:h-32" /> */}
        {/* 跑道背景 */}
        <motion.div
          className="mx-auto h-16 w-[3000px] bg-[url('/images/bg/runway.png')] bg-left bg-repeat-x [background-size:auto_100%] md:h-20"
          style={{ x: runwayX }}
        />
      </div>
      <motion.div
        className="mx-auto h-[48px] w-[3000px] bg-[url('/images/bg/runway.png')] bg-left-bottom bg-repeat-x [background-size:116%_700%] md:hidden"
        style={{ x: runwayX }}
      />

      <ButtonSideButtons />
      <div className="absolute top-full -mt-[1px] h-10 w-full bg-white" />
    </div>
  );
};
