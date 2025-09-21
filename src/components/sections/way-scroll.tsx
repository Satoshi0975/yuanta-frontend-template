'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export const WayScroll = () => {
  const { scrollYProgress } = useScroll();

  // 讓跑道背景隨滾動向左移動，創造飛行的感覺
  const runwayX = useTransform(scrollYProgress, [0, 1], [200, -1000]);

  return (
    <div className="pointer-events-none sticky top-0 z-0 -mb-[100vh] h-screen w-screen overflow-hidden">
      {/* 底部漸層背景 */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white/50 via-white/10 to-transparent md:h-48" />

      {/* 跑道背景 */}
      <motion.div
        className="absolute bottom-0 left-0 h-20 w-[3000px] bg-[url('/images/bg/runway.png')] bg-right bg-repeat-x [background-size:auto_100%] md:h-32"
        style={{ x: runwayX }}
      />
    </div>
  );
};
