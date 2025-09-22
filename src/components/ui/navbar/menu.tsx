'use client';

import { motion, useMotionValue } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import MediaLinks from './media-links';
import MenuTrigger from './menu-trigger';
import { SkyScroll } from '@/components/sections/sky-scroll';

const PIXEL_GRID = 2; // 像素網格大小
const TICK_INTERVAL = 100; // 每個 tick 間隔 (毫秒)

const RunwayBackground = () => {
  const baseX = useMotionValue(0);

  useEffect(() => {
    const moveRunway = () => {
      const currentX = baseX.get();
      // 8bit 風格：每次移動固定距離 (像素化)
      const moveDistance = 2; // 每次移動8px
      const pixelMove = (moveDistance / PIXEL_GRID) * PIXEL_GRID; // 確保像素網格對齊
      const newX = currentX - pixelMove;

      // 如果背景移動超過1000px，重置到0 (無縫循環)
      if (newX <= -1000) {
        baseX.set(0);
      } else {
        baseX.set(newX);
      }
    };

    // 使用 setInterval 創造固定的 tick 間隔
    const interval = setInterval(moveRunway, TICK_INTERVAL);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [baseX]);

  return (
    <motion.div
      className="absolute bottom-0 mx-auto h-20 w-[3000px] bg-[url('/images/bg/runway.png')] bg-right bg-repeat-x [background-size:auto_100%] md:h-20"
      style={{ x: baseX }}
    />
  );
};

const sidebar = {
  open: {
    backgroundColor: '#FFFFFF',
    clipPath: `circle(2000px at calc(100% - 53px) 30px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    backgroundColor: '#FFFFFF',
    clipPath: `circle(20px at calc(100% - 53px) 30px)`,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      delay: 0,
    },
  },
};

const Menu = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useRef(0);

  useEffect(() => {
    x.current = ref.current?.getBoundingClientRect().x || 0;
  }, []);
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={open ? 'open' : 'closed'}
      className="z-[100 relative block lg:hidden"
    >
      <motion.div
        className="fixed inset-0 overflow-hidden bg-white"
        variants={sidebar}
      />
      <div className="z-[100] flex justify-center">
        <MenuTrigger open={open} onClick={() => setOpen((o) => !o)} />
      </div>
      {open && (
        <motion.div
          className="fixed inset-0 h-screen w-screen bg-sts-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: open ? 0.5 : 0 }}
        >
          <SkyScroll />
          <aside className="space-y-5 px-5 py-7 pt-12">
            <ul className="w-full text-xl font-bold">
              <li
                className="border-b-2 border-sts-blue-600 p-2 text-gray-900 font-cubic"
                onClick={() => setOpen((o) => !o)}
              >
                <Link 
                href="https://www.yuantafutures.com.tw/openaccount"
                target="_blank"
                rel="noreferrer noopener"
              >
                期貨開戶
              </Link>
              </li>
              <li
                className="border-b-2 border-sts-blue-600 p-2 text-gray-900"
                onClick={() => setOpen((o) => !o)}
              >
                <Link href="#registration">競賽報名</Link>
              </li>
              <li
                className="border-b-2 border-sts-blue-600 p-2 text-gray-900"
                onClick={() => setOpen((o) => !o)}
              >
                <Link href="">成績查詢</Link>
              </li>
              <li
                className="border-b-2 border-sts-blue-600 p-2 text-gray-900"
                onClick={() => setOpen((o) => !o)}
              >
                <Link href="#vote">人氣投票</Link>
              </li>
            </ul>
            <ul className="flex justify-center space-x-6 text-sts-blue-600">
              <MediaLinks />
            </ul>
            <RunwayBackground />
          </aside>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Menu;
