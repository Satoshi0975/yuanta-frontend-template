'use client';

import Cloud from '@/assets/cloud.svg';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import { useIsClient } from 'usehooks-ts';
interface CloudProps {
  id: number;
  initialX: number;
  top: number;
  size: number;
  baseSpeed: number;
  opacity: number;
}

const CloudComponent = ({ cloud }: { cloud: CloudProps }) => {
  const { scrollYProgress } = useScroll();
  const baseX = useMotionValue(cloud.initialX);

  // 基礎自動滾動
  useEffect(() => {
    let animationFrame: number;

    const moveCloud = () => {
      const currentX = baseX.get();
      const newX = currentX - cloud.baseSpeed * 0.5;

      // 如果雲朵完全移出左側螢幕，重新定位到右側
      if (newX < -cloud.size - 100) {
        baseX.set(window.innerWidth + cloud.size);
      } else {
        baseX.set(newX);
      }

      animationFrame = requestAnimationFrame(moveCloud);
    };

    animationFrame = requestAnimationFrame(moveCloud);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [baseX, cloud.baseSpeed, cloud.size]);

  // 滾動加速效果
  const scrollBoost = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -500 * cloud.baseSpeed]
  );

  // 合併基礎移動和滾動加速
  const finalX = useTransform(() => baseX.get() + scrollBoost.get());

  return (
    <motion.div
      className="absolute"
      style={{
        x: finalX,
        left: '0%',
        top: `${cloud.top}%`,
        opacity: cloud.opacity,
      }}
    >
      <Cloud className="opacity-80" style={{ width: `${cloud.size}px` }} />
    </motion.div>
  );
};

export const SkyScroll = ({
  numberOfClouds = 15,
  baseSpeed = 0.3,
  changeOpacity = true,
  size = 80,
}: {
  numberOfClouds?: number;
  baseSpeed?: number;
  changeOpacity?: boolean;
  size?: number;
}) => {
  const isClient = useIsClient();

  const ref = useRef<HTMLDivElement>(null);

  // 隨機生成雲朵配置
  const clouds = useMemo(() => {
    const cloudConfigs = [];

    // 生成雲朵
    const cloudCount = numberOfClouds;

    for (let i = 0; i < cloudCount; i++) {
      cloudConfigs.push({
        id: i,
        // 初始位置：分散在畫面上，包含畫面外
        initialX: i * 80 + Math.random() * 100 + 100, // 間隔分布
        top: Math.random() * 80 + 10, // 10-90%
        // 雲朵大小
        size: Math.random() * size + size, // 80-160px
        // 基礎移動速度：不同雲朵不同速度
        baseSpeed: Math.random() * baseSpeed + baseSpeed, // 0.5-1.0
        // 透明度變化
        opacity: changeOpacity ? Math.random() * 0.4 + 0.6 : 1, // 0.6-1.0
      });
    }

    return cloudConfigs;
  }, [numberOfClouds, baseSpeed, changeOpacity, size]);

  if (!isClient) return null;

  return (
    <div ref={ref} className="absolute inset-0 h-full w-full overflow-hidden">
      {clouds.map((cloud) => (
        <CloudComponent key={cloud.id} cloud={cloud} />
      ))}
    </div>
  );
};
