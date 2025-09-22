'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export const WayScroll = () => {
  const { scrollYProgress } = useScroll();

  // 讓跑道背景隨滾動向左移動，創造飛行的感覺
  const runwayX = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <div className="pointer-events-none sticky bottom-0 z-50 w-screen overflow-hidden pt-10">
      <motion.div
        className="absolute bottom-0 mx-auto h-16 w-[3000px] bg-[url('/images/bg/runway.png')] bg-right bg-repeat-x [background-size:auto_100%] [filter:blur(10px)] md:h-20"
        style={{ x: runwayX }}
      />
      {/* 底部漸層背景 */}
      {/* <div className="background-blur absolute bottom-0 left-0 h-28 w-full bg-blue-200/50 md:h-32" /> */}
      {/* 跑道背景 */}
      <motion.div
        className="mx-auto h-16 w-[3000px] bg-[url('/images/bg/runway.png')] bg-right bg-repeat-x [background-size:auto_100%] md:h-20"
        style={{ x: runwayX }}
      />
    </div>
  );
};
