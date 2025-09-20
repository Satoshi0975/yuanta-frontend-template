import dinosaur from '@/assets/images/element/dinosaur.png';
import fire from '@/assets/images/element/fire.png';
import first from '@/assets/images/element/first.png';
import gold from '@/assets/images/element/gold.png';
import hard from '@/assets/images/element/hard.png';
import second from '@/assets/images/element/second.png';
import start from '@/assets/images/element/start.png';
import third from '@/assets/images/element/third.png';
import ticket from '@/assets/images/element/ticket.png';
import towHard from '@/assets/images/element/tow-hard.png';
import mapSM from '@/assets/images/map-sm.png';
import map from '@/assets/images/map.png';
import { Button } from '@/components/nes/button';
import { SectionCard } from '@/components/section-card';
import Image from '@/lib/image';

export default function Home() {
  return (
    <div className="relative">
      <div className="fixed h-screen w-screen bg-contain bg-repeat-x [background-image:url('/bg/sky.png')]"></div>
      <div className="pt-[100vh]">
        <div className="relative z-10 bg-yuanta-bg">
          {/* 我要報名 */}
          <div className="flex h-screen w-full items-center bg-contain bg-repeat-x [background-image:url('/bg/sky2.png')]">
            <div className="container">
              <div className="px-4 pr-0 sm:pr-4">
                <div className="relative aspect-[0.8964] sm:aspect-[1.8541]">
                  <Image
                    src={mapSM}
                    alt=""
                    fill
                    className="object-cover sm:hidden"
                    priority
                  />
                  <Image
                    src={map}
                    alt=""
                    fill
                    className="hidden object-cover sm:block"
                    priority
                  />
                  <div className="absolute inset-0 z-10 mr-4 flex flex-col items-center justify-center gap-2 sm:mr-0">
                    <div className="space-y-2 text-center font-cubic text-xl sm:text-3xl">
                      <p>活甕期間＝報名期間</p>
                      <p>萬元好禮等你拿！</p>
                      <p className="!mb-6">▼ 立即報名參賽 ▼</p>
                      <Button className="text-3xl lg:text-5xl [&>.section-middle]:!pb-7 [&>.section-middle]:!pt-4 lg:[&>.section-middle]:!pb-10 lg:[&>.section-middle]:!pt-6">
                        報名競賽
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto space-y-10 px-4">
            {/* 新手村 + 每日任務 */}

            <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
              {/* 新手村 */}
              <div className="flex flex-col pt-2">
                <div className="mx-3 mb-4 flex h-12 flex-row-reverse items-center gap-3 md:flex-row">
                  <Image src={ticket} alt="ticket" className="h-12 w-auto" />
                  <Image src={gold} alt="gold" className="h-8 w-auto" />
                  <Image src={gold} alt="gold" className="h-8 w-auto" />
                  <div className="relative mr-auto flex h-12 w-24 md:hidden">
                    <Image
                      src={dinosaur}
                      alt="dinosaur"
                      className="absolute -bottom-6 right-0 h-20 w-auto scale-x-[-1] items-baseline"
                    />
                  </div>
                </div>
                <SectionCard title="新手村">
                  <h2 className="whitespace-pre-wrap text-center text-xl sm:text-2xl">
                    <span className="text-primary">新戶/靜止戶</span>交易
                    <br />送
                    <span className="ml-2 text-primary">100元超商電子禮券</span>
                  </h2>
                  <div className="mx-auto mt-4 max-w-[420px] rounded-xl bg-white/70 px-4 py-2 text-sm lg:text-base 2xl:max-w-[520px]">
                    <ol className="ml-4 list-disc space-y-2 marker:text-orange-500">
                      <li className="pl-1 text-justify">
                        新戶定義：2025/01/01-12/31期間於元大期貨或所屬券商合作夥伴完成新開立期貨帳戶，並交易即符合資格戶。
                      </li>
                      <li className="pl-1 text-justify">
                        靜止定義：已於元大期貨或所屬券商合作夥伴開戶者，最後交易日2024/12/31以前，從未交易本次活動商品者。
                      </li>
                    </ol>
                  </div>
                </SectionCard>
              </div>
              {/* 每日任務 */}
              <div className="flex flex-col pt-2">
                <div className="mx-3 mb-4 flex h-12 items-center justify-end gap-3">
                  <div className="relative mr-6 hidden h-12 w-24 md:flex">
                    <Image
                      src={dinosaur}
                      alt="dinosaur"
                      className="absolute -bottom-4 right-0 h-20 w-auto items-baseline"
                    />
                  </div>
                  <Image src={gold} alt="gold" className="h-8 w-auto" />
                  <Image src={gold} alt="gold" className="h-8 w-auto" />
                  <Image src={gold} alt="gold" className="h-8 w-auto" />
                </div>
                <SectionCard title="每日任務">
                  {/* 每日任務圖片 */}
                  <h2 className="whitespace-pre-wrap text-center text-xl sm:text-2xl">
                    日日交易日日獲抽獎機會
                    <br />
                    <span className="ml-2 text-primary">
                      月月抽元大期貨金幣3枚
                    </span>
                  </h2>
                  <p className="text-center">
                    <small>
                      ※當月交易<span className="text-primary">15天</span>
                      ，抽獎次數<span className="text-primary">x2</span>
                    </small>
                  </p>
                  <div className="mx-auto mt-4 max-w-[420px] rounded-xl bg-white/70 px-4 py-4 text-center text-base lg:text-lg 2xl:max-w-[520px]">
                    <p>交易1天 = 1次抽獎機會</p>
                    <p>交易2天 = 2次抽獎機會</p>
                    <p>...</p>
                    <p>以此類推</p>
                  </div>
                </SectionCard>
              </div>
            </div>
            {/* 主要任務 */}
            <div className="flex flex-col pt-2">
              <div className="mx-3 mb-4 flex h-12 items-center justify-between gap-3">
                <div className="flex gap-3">
                  <Image src={start} alt="gold" className="h-8 w-auto" />
                  <Image src={hard} alt="gold" className="h-8 w-auto" />
                  <Image
                    src={hard}
                    alt="gold"
                    className="hidden h-8 w-auto sm:block"
                  />
                </div>
                <div className="flex gap-3">
                  <Image
                    src={gold}
                    alt="gold"
                    className="hidden h-8 w-auto sm:block"
                  />
                  <Image src={gold} alt="gold" className="h-8 w-auto" />
                  <Image src={gold} alt="gold" className="h-8 w-auto" />
                </div>
              </div>
              <SectionCard title="主要任務">
                <div className="mx-auto max-w-[840px] space-y-4">
                  <div>
                    <h2 className="whitespace-pre-wrap text-center text-xl sm:text-2xl">
                      競賽至少需累積200口以上，始符合排行獎獲獎資格
                    </h2>
                    <p className="text-center tracking-tight">
                      亦可每日於戰績查詢專區登入查個人即時名次，活動結束最後結算時間為12/31
                      T盤交易時間截止。
                    </p>
                  </div>
                  <div className="rounded-lg bg-black text-center text-xl shadow-lg nes-corners">
                    <div className="grid grid-cols-2 gap-1 md:grid-cols-[minmax(0,3fr)_minmax(0,3fr)_minmax(0,5fr)]">
                      <div className="bg-blue-600 p-3 font-semibold text-white">
                        TOP 10
                      </div>
                      <div className="bg-blue-400 p-3 font-semibold text-white">
                        獎金
                      </div>
                      <div className="hidden bg-blue-600 p-3 font-semibold text-white md:block">
                        獎品
                      </div>

                      <div className="bg-white p-3">第一名</div>
                      <div className="bg-white p-3">100,000</div>

                      <div className="bg-white p-3">第二名</div>
                      <div className="bg-white p-3">90,000</div>

                      <div className="bg-white p-3">第三名</div>
                      <div className="bg-white p-3">80,000</div>

                      <div className="bg-white p-3">第四名</div>
                      <div className="bg-white p-3">70,000</div>

                      <div className="bg-white p-3">第五名</div>
                      <div className="bg-white p-3">60,000</div>

                      <div className="col-span-2 bg-blue-600 p-3 font-semibold text-white md:col-span-1 md:col-start-3 md:row-span-5 md:row-start-2 md:hidden">
                        標題 3
                      </div>

                      <div className="col-span-2 bg-white p-4 md:col-span-1 md:col-start-3 md:row-span-5 md:row-start-2">
                        <div className="flex h-full flex-col justify-center">
                          {/* <Button>其他名次獎項</Button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-black text-center text-xl shadow-lg nes-corners">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="bg-green-600 p-3 font-semibold text-white">
                          TOP 10
                        </div>
                        <div className="bg-green-400 p-3 font-semibold text-white">
                          獎金
                        </div>

                        <div className="bg-white p-3">第一名</div>
                        <div className="bg-white p-3">100,000</div>

                        <div className="bg-white p-3">第二名</div>
                        <div className="bg-white p-3">90,000</div>

                        <div className="bg-white p-3">第三名</div>
                        <div className="bg-white p-3">80,000</div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-black text-center text-xl shadow-lg nes-corners">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="bg-orange-600 p-3 font-semibold text-white">
                          TOP 10
                        </div>
                        <div className="bg-orange-400 p-3 font-semibold text-white">
                          獎金
                        </div>

                        <div className="bg-white p-3">第一名</div>
                        <div className="bg-white p-3">100,000</div>

                        <div className="bg-white p-3">第二名</div>
                        <div className="bg-white p-3">90,000</div>

                        <div className="bg-white p-3">第三名</div>
                        <div className="bg-white p-3">80,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* 期貨人氣王 */}
            <div className="flex flex-col pt-2">
              <div className="mx-3 mb-4 flex h-12 items-center justify-between gap-3">
                <div className="flex gap-3">
                  <Image src={fire} alt="fire" className="h-8 w-auto" />
                  <Image
                    src={gold}
                    alt="gold"
                    className="hidden h-8 w-auto sm:block"
                  />
                  <Image
                    src={gold}
                    alt="gold"
                    className="hidden h-8 w-auto sm:block"
                  />
                  <Image
                    src={gold}
                    alt="gold"
                    className="hidden h-8 w-auto sm:block"
                  />
                </div>
                <div className="relative ml-6 mr-6 flex h-12 w-24">
                  <Image
                    src={dinosaur}
                    alt="dinosaur"
                    className="absolute -bottom-4 right-0 h-20 w-auto items-baseline"
                  />
                </div>
                <div className="flex gap-3">
                  <Image
                    src={gold}
                    alt="gold"
                    className="hidden h-8 w-auto sm:block"
                  />
                  <Image
                    src={gold}
                    alt="gold"
                    className="hidden h-8 w-auto sm:block"
                  />
                  <Image
                    src={gold}
                    alt="gold"
                    className="hidden h-8 w-auto sm:block"
                  />
                  <Image src={towHard} alt="gold" className="h-8 w-auto" />
                </div>
              </div>
              <SectionCard title="期貨人氣王">
                <h2 className="nes-sm-corners mx-auto flex w-fit space-x-2 bg-blue-500 px-4 py-2 text-center font-cubic text-xl text-white">
                  <Image src={fire} alt="fire" className="h-7 w-auto" />
                  <span>即時排名</span>{' '}
                  <Image src={fire} alt="fire" className="h-7 w-auto" />
                </h2>
                {/* 排名列表 */}
                <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 py-5 font-cubic md:grid-cols-3">
                  {/* 第一名 */}
                  <div className="space-y-3">
                    <div className="nes-sm-corners bg-white px-3 text-center nes-purple-500">
                      <h3 className="overflow-hidden whitespace-nowrap py-5 text-xl font-bold [text-overflow:ellipsis]">
                        #1 網友暱稱網友暱稱
                      </h3>
                      <Image
                        src={first}
                        alt="first"
                        className="mx-auto h-36 w-auto md:h-24 lg:h-36"
                      />
                    </div>
                    <div className="nes-sm-corners flex h-12 flex-nowrap bg-white text-2xl nes-cyan-900">
                      <div className="flex h-full flex-shrink-0 items-center bg-gray-400 px-3 text-white">
                        票數
                      </div>
                      <div className="flex h-full w-full items-center justify-center bg-white font-sans font-bold">
                        100,000
                      </div>
                    </div>
                  </div>
                  {/* 第二名 */}
                  <div className="space-y-3">
                    <div className="nes-sm-corners bg-white px-3 text-center nes-purple-500">
                      <h3 className="overflow-hidden whitespace-nowrap py-5 text-xl font-bold [text-overflow:ellipsis]">
                        #1 網友暱稱網友暱稱
                      </h3>
                      <Image
                        src={second}
                        alt="second"
                        className="mx-auto h-36 w-auto md:h-24 lg:h-36"
                      />
                    </div>
                    <div className="nes-sm-corners flex h-12 flex-nowrap bg-white text-2xl nes-cyan-900">
                      <div className="flex h-full flex-shrink-0 items-center bg-gray-400 px-3 text-white">
                        票數
                      </div>
                      <div className="flex h-full w-full items-center justify-center bg-white font-sans font-bold">
                        100,000
                      </div>
                    </div>
                  </div>
                  {/* 第三名 */}
                  <div className="space-y-3">
                    <div className="nes-sm-corners bg-white px-3 text-center nes-purple-500">
                      <h3 className="overflow-hidden whitespace-nowrap py-5 text-xl font-bold [text-overflow:ellipsis]">
                        #1 網友暱稱網友暱稱
                      </h3>
                      <Image
                        src={third}
                        alt="third"
                        className="mx-auto h-36 w-auto md:h-24 lg:h-36"
                      />
                    </div>
                    <div className="nes-sm-corners flex h-12 flex-nowrap bg-white text-2xl nes-cyan-900">
                      <div className="flex h-full flex-shrink-0 items-center bg-gray-400 px-3 text-white">
                        票數
                      </div>
                      <div className="flex h-full w-full items-center justify-center bg-white font-sans font-bold">
                        100,000
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg bg-black text-center text-2xl shadow-lg nes-corners">
                    <div className="grid h-full grid-cols-2 gap-1">
                      <div className="flex items-center justify-center bg-green-600 p-3 font-semibold text-white">
                        TOP 10
                      </div>
                      <div className="flex items-center justify-center bg-green-400 p-3 font-semibold text-white">
                        獎金
                      </div>

                      <div className="flex items-center justify-center bg-white p-3">
                        第一名
                      </div>
                      <div className="flex items-center justify-center bg-white p-3">
                        100,000
                      </div>

                      <div className="flex items-center justify-center bg-white p-3">
                        第二名
                      </div>
                      <div className="flex items-center justify-center bg-white p-3">
                        90,000
                      </div>

                      <div className="flex items-center justify-center bg-white p-3">
                        第三名
                      </div>
                      <div className="flex items-center justify-center bg-white p-3">
                        80,000
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-lg bg-white p-3 text-center text-xl shadow-lg nes-corners">
                    <div className="nes-sm-corners flex h-12 flex-nowrap bg-white text-2xl nes-cyan-900">
                      <div className="flex h-full w-[65%] flex-shrink-0 items-center bg-gray-400 px-3 text-white">
                        #3 CME之王
                      </div>
                      <div className="flex h-full w-full items-center justify-center bg-white font-sans font-bold">
                        100,000 票
                      </div>
                    </div>
                    <div className="nes-sm-corners flex h-12 flex-nowrap bg-white text-2xl nes-cyan-900">
                      <div className="flex h-full w-[65%] flex-shrink-0 items-center bg-gray-400 px-3 text-white">
                        #3 CME之王
                      </div>
                      <div className="flex h-full w-full items-center justify-center bg-white font-sans font-bold">
                        100,000 票
                      </div>
                    </div>
                    <div className="nes-sm-corners flex h-12 flex-nowrap bg-white text-2xl nes-cyan-900">
                      <div className="flex h-full w-[65%] flex-shrink-0 items-center bg-gray-400 px-3 text-white">
                        #3 CME之王
                      </div>
                      <div className="flex h-full w-full items-center justify-center bg-white font-sans font-bold">
                        100,000 票
                      </div>
                    </div>
                    <div className="nes-sm-corners flex h-12 flex-nowrap bg-white text-2xl nes-cyan-900">
                      <div className="flex h-full w-[65%] flex-shrink-0 items-center bg-gray-400 px-3 text-white">
                        #3 CME之王
                      </div>
                      <div className="flex h-full w-full items-center justify-center bg-white font-sans font-bold">
                        100,000 票
                      </div>
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </div>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
