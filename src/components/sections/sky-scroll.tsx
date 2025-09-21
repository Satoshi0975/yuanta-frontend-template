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

const PIXEL_GRID = 4; // 像素網格大小
const TICK_INTERVAL = 50; // 每個 tick 間隔 (毫秒) - 可調整這個值

const CloudComponent = ({
  cloud,
  tickInterval = TICK_INTERVAL,
}: {
  cloud: CloudProps;
  tickInterval?: number;
}) => {
  const { scrollYProgress } = useScroll();
  const baseX = useMotionValue(cloud.initialX);

  // 8bit 風格移動 - 使用固定間隔
  useEffect(() => {
    // let interval: NodeJS.Timeout;

    const moveCloud = () => {
      const currentX = baseX.get();
      // 8bit 風格：每次移動固定距離 (像素化)
      const moveDistance = cloud.baseSpeed * 2; // 增加移動距離
      const pixelMove = (moveDistance / PIXEL_GRID) * PIXEL_GRID; // 8px 網格對齊
      const newX = currentX - pixelMove; // 確保至少移動 8px

      // 如果雲朵完全移出左側螢幕，重新定位到右側
      if (newX < -cloud.size - 100) {
        baseX.set(window.innerWidth + cloud.size);
      } else {
        baseX.set(newX);
      }
    };

    // 使用 setInterval 而非 requestAnimationFrame，創造固定的 tick 間隔
    const interval = setInterval(moveCloud, tickInterval);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [baseX, cloud.baseSpeed, cloud.size, tickInterval]);

  // 像素化滾動加速效果
  const scrollBoost = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -500 * cloud.baseSpeed]
  );

  // 合併基礎移動和滾動加速，並像素化結果
  const finalX = useTransform(() => {
    const combined = baseX.get() + scrollBoost.get();
    // 確保最終位置也是像素化的
    return Math.round(combined / PIXEL_GRID) * PIXEL_GRID;
  });

  return (
    <motion.div
      className={`absolute`}
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
  tickInterval = TICK_INTERVAL,
}: {
  numberOfClouds?: number;
  baseSpeed?: number;
  changeOpacity?: boolean;
  size?: number;
  tickInterval?: number;
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
        <CloudComponent
          key={cloud.id}
          cloud={cloud}
          tickInterval={tickInterval}
        />
      ))}
    </div>
  );
};
