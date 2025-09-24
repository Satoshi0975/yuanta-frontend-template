'use client';

import { Button } from '@/components/ui/button';
import Image from '@/lib/image';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleChevronLeft, CircleChevronRight } from 'lucide-react';
import { useState } from 'react';
import stepImg1 from './img/step-1.png';
import stepImg2 from './img/step-2.png';
import stepImg3 from './img/step-3.png';
import stepImg4 from './img/step-4.png';
import stepImg5 from './img/step-5.png';
import ListWithBlock from './listWithBlock';

type Props = {
  step: number;
  onClick: (step: number) => void;
};

// 擴展原生的button屬性
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

const StepButton = ({ active, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'nes-full-corners flex aspect-square w-full max-w-16 items-center justify-center bg-gray-200 font-cubic text-2xl font-bold text-gray-500 transition-all duration-300',
        active && 'bg-sts-blue-400 text-white'
      )}
    ></button>
  );
};

const stepCount = [1, 2, 3, 4, 5];

const StepCircle = ({ step, onClick }: Props) => {
  const [hover, setHover] = useState(0);
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[500px]"
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 100 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <hr className="absolute top-1/2 z-0 box-content w-full border-y-2 border-black" />
      <div className="relative z-10 flex w-full items-center justify-between space-x-3 md:space-x-10">
        {stepCount.map((i) => (
          <StepButton
            key={i}
            onClick={() => {
              onClick(i);
            }}
            onMouseOver={() => setHover(i)}
            onMouseLeave={() => setHover(0)}
            active={i <= step || i <= hover}
          >
            {i}
          </StepButton>
        ))}
      </div>
    </motion.div>
  );
};

const infoMotionProps = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 },
  transition: { type: 'spring' as const, duration: 0.5, stiffness: 70 },
};

const mobilMotionProps = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transformOrigin: 'bottom',
  },
  transition: { type: 'spring' as const, duration: 0.5, stiffness: 70 },
};

const Info = ({ currentStep }: { currentStep: number }) => {
  switch (currentStep) {
    case 1:
      return (
        <motion.div {...infoMotionProps} key="1">
          <ListWithBlock
            key="list-1"
            list={[
              '打開「投資先生」APP',
              '選擇「國外選擇權」',
              '如尚未添加可至㊉新增',
            ]}
            className="!space-y-3 !pl-4 text-base"
          />
          <p key="p-1" className="mt-4 flex items-center text-lg lg:text-2xl">
            如果還沒開戶{' '}
            <a
              href="https://www.yuantafutures.com.tw/openaccount_01"
              target="_blank"
              rel="noreferrer noopener"
            >
              <Button className="ml-2 px-3 font-medium text-white">
                點我開戶
              </Button>
            </a>
          </p>
        </motion.div>
      );
    case 2:
      return (
        <motion.div {...infoMotionProps} key="2">
          <ul
            key="ul-2"
            className={cn(
              'list-none space-y-4 pl-8 text-left text-lg md:space-y-6 md:pl-12 md:text-2xl'
            )}
          >
            <li
              className="relative text-gray-800 before:absolute before:-left-8 before:top-1 before:w-6 before:rounded-full before:bg-blue-200 before:text-center before:text-base before:font-bold before:text-blue-900 before:content-['1'] md:before:-left-10"
              key="1"
            >
              選擇想交易的類別
            </li>
            <li
              className="relative text-gray-800 before:absolute before:-left-8 before:top-1 before:w-6 before:rounded-full before:bg-blue-200 before:text-center before:text-base before:font-bold before:text-blue-900 before:content-['2'] md:before:-left-10"
              key="2"
            >
              選擇想交易的商品
            </li>
          </ul>
        </motion.div>
      );
    case 3:
      return (
        <motion.div {...infoMotionProps} key="3">
          <ListWithBlock
            key="list-3"
            list={[
              <p key="1">
                選擇<span className="text-[#D11C1C]">買權</span>或
                <span className="text-[#42AC38]">賣權</span>的履約價
              </p>,
            ]}
          />
        </motion.div>
      );
    case 4:
      return (
        <motion.div {...infoMotionProps} key="4">
          <p key="p-4">輸入口數跟價格，並選擇買進或賣出，交易完成！</p>{' '}
        </motion.div>
      );
    case 5:
      return (
        <motion.div {...infoMotionProps} key="5">
          <Tabs
            key="tabs-5"
            defaultValue="buy"
            className="size-full overflow-clip rounded-lg bg-white"
          >
            <TabsList className="w-full border-b">
              <TabsTrigger
                value="buy"
                className="w-1/2 border-r p-2 text-base data-[state=active]:bg-blue-900 data-[state=active]:text-blue-200 hover:data-[state=active]:bg-blue-900 hover:data-[state=active]:text-blue-200"
              >
                買方策略Tips
              </TabsTrigger>
              <TabsTrigger
                value="sale"
                className="w-1/2 p-2 text-base data-[state=active]:bg-blue-900 data-[state=active]:text-blue-200 hover:data-[state=active]:bg-blue-900 hover:data-[state=active]:text-blue-200"
              >
                賣方策略Tips
              </TabsTrigger>
            </TabsList>
            <TabsContent value="buy" className="p-2">
              <ListWithBlock
                className="!space-y-1 !text-base"
                list={[
                  <p key="1">
                    看漲→
                    <span className="text-[#42AC38]">買進買權(buy Call)</span>
                    <br />
                    最大獲利無限大，最大風險為損失權利金
                  </p>,
                  <p key="2">
                    看跌→
                    <span className="text-[#D11C1C]">買進賣權(buy Put)</span>
                    <br />
                    最大獲利為履約價減權利金，最大風險為損失權利金，可用於避險或放空操作
                  </p>,
                ]}
              />
            </TabsContent>
            <TabsContent value="sale" className="p-2">
              <ListWithBlock
                className="!space-y-1 !text-base"
                list={[
                  <p key="1">
                    看不漲→
                    <span className="text-[#42AC38]">賣出買權(sell Call)</span>
                    <br />
                    最大獲利就是收到的權利金，最大風險則為無限
                  </p>,
                  <p key="2">
                    看不跌→
                    <span className="text-[#D11C1C]">賣出賣權(sell Put)</span>
                    <br />
                    最大獲利就是收到的權利金，最大風險則為無限
                  </p>,
                ]}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      );
    default:
      return null;
  }
};

const stepImages = [stepImg1, stepImg2, stepImg3, stepImg4, stepImg5];

const Step = () => {
  const [step, setStep] = useState(1);

  const handleStepIncrease = () => {
    console.log('?');
    setStep((i) => {
      console.log(i);
      if (i < 5) {
        return i + 1;
      }
      return i;
    });
  };

  const handleStepDecrease = () => {
    setStep((i) => {
      if (i > 1) {
        return i - 1;
      }
      return i;
    });
  };

  return (
    <section className="container space-y-8">
      <StepCircle step={step} onClick={setStep} />
      <div className="relative bg-white nes-corners nes-black">
        <div className="-mb-6 space-y-8 md:-mb-9">
          {/* <motion.div
        className="mx-auto mb-5 max-w-[700px]"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <ATabs className="w-full" value="mobile">
          <ATabsList className="lg:max-w-1/2 mx-auto w-full">
            <ATabsTrigger value="mobile" className="w-full">
              手機下單
            </ATabsTrigger>
            <ATabsTrigger value="pc" className="w-full">
              <a
                href="https://www.yuantafutures.com.tw/tradeplatform"
                target="_blank"
                rel="noreferrer noopener"
              >
                PC下單
              </a>
            </ATabsTrigger>
          </ATabsList>
        </ATabs>
      </motion.div> */}

          <motion.div
            className="!mt-4"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="relative rounded-xl p-3">
              <div className="relative z-10 pb-5">
                {/* Content */}
                <div className="z-10 flex w-full flex-col justify-center md:flex-row-reverse">
                  <div className="flex w-full flex-col self-center md:w-2/3 lg:w-1/2">
                    {/* Controller */}
                    <div className="text-yt-blue-600 flex w-full items-center justify-center space-x-5 text-3xl font-black">
                      <CircleChevronLeft
                        size={48}
                        onClick={handleStepDecrease}
                        className={cn(
                          'text-yt-blue-400 cursor-pointer',
                          step === 1 && 'cursor-default opacity-30'
                        )}
                      />
                      <p className="font-title text-yt-blue-600 font-cubic">
                        STEP . {step}
                      </p>
                      <CircleChevronRight
                        size={48}
                        onClick={handleStepIncrease}
                        className={cn(
                          'text-yt-blue-400 cursor-pointer',
                          step === 5 && 'cursor-default opacity-30'
                        )}
                      />
                    </div>
                    {/* Container */}
                    <div className="border-yt-blue-500 mt-5 min-h-60 overflow-hidden rounded-2xl border-4 bg-white p-3 sm:mx-auto md:w-[400px]">
                      <div className="relative flex min-h-52 w-full items-center space-y-5 p-2 pb-7 text-lg md:h-60 md:p-5 md:text-2xl lg:p-10">
                        <div className="mb-3 flex w-full justify-center font-medium">
                          <AnimatePresence>
                            <Info currentStep={step} />
                          </AnimatePresence>
                        </div>
                        <p className="absolute bottom-0 right-0 text-left text-xs text-gray-600">
                          *此教學為基本下單，其他細節請洽所屬營業員。
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Image */}
                  <motion.div
                    className="mt-5 flex justify-center md:-mb-4 lg:pr-5"
                    {...mobilMotionProps}
                    key={step}
                  >
                    <Image
                      src={stepImages[step - 1]}
                      alt="step"
                      className="-mb-[29px] h-96 object-contain object-bottom md:mb-0"
                    />
                  </motion.div>
                </div>
              </div>

              {/* 
              <Image
                src={stepCubeImg}
                alt="bg"
                className="pointer-events-none absolute bottom-16 left-8 hidden md:block"
              /> */}
            </div>
          </motion.div>
          {/* <h2 className="text-center text-4xl font-black text-blue-700">
        CME選擇權
        <br />
        PC下單
      </h2>
      <div className="relative rounded-xl border-2 border-blue-200 bg-blue-900 p-3 text-white">
        <div className="rounded-sm border-[0.75px] border-blue-200 bg-blue-900 py-10 text-center">
          <p className="text-2xl">請查看操作手冊</p>
        </div>
      </div> */}
        </div>
      </div>
    </section>
  );
};

export default Step;
