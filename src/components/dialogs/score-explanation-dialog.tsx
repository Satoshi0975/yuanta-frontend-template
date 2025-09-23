'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ScoreExplanationDialogProps {
  children?: React.ReactNode;
}

const ScoreExplanationDialog = ({ children }: ScoreExplanationDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-[9999] mx-auto max-h-screen max-w-4xl rounded-lg border-none bg-sts-orange-200 ring-0">
        <DialogHeader>
          <DialogDescription asChild>
            <div className="space-y-6 text-base text-sts-text">
              <div className="">
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-4">
                  <div className="nes-sm-corners mx-auto mb-6 w-fit bg-sts-red-200 px-5 py-3 text-center text-xl text-white">
                    <h1 className="text-left text-xl font-semibold">
                      <span className="rounded-md bg-sts-orange-400 px-2 py-0.5">
                        期貨
                      </span>{' '}
                      +{' '}
                      <span className="rounded-md bg-sts-blue-400 px-2 py-0.5">
                        證券
                      </span>{' '}
                      總積分 = <br className="md:hidden" />①{' '}
                      <span className="underline">報酬率</span>積分 +{' '}
                      <br className="md:hidden" />②{' '}
                      <span className="underline">絕對獲利</span>積分 +{' '}
                      <br className="md:hidden" /> ③ 交易
                      <span className="underline">分數</span>積分
                    </h1>
                  </div>
                  <div className="space-y-6 text-left">
                    {/* 報酬率積分 */}
                    <div className="flex flex-wrap items-baseline space-y-3">
                      <h2 className="text-nowrap text-xl">
                        ①{' '}
                        <span className="font-bold text-red-600 underline">
                          報酬率
                        </span>
                        積分
                      </h2>
                      <div className="ml-4 space-y-2">
                        <div className="text-lg">
                          ▶ 報酬率0.1%=1分{' '}
                          <span className="text-base text-gray-600">
                            (*每日報酬率累加，正負都計算)
                          </span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-red-600">報酬率</h3>

                    <div className="!mt-1 rounded-lg border-4 border-black bg-white p-6">
                      <div className="space-y-4">
                        <div className="text-center text-lg leading-relaxed">
                          (
                          <span className="mx-1 rounded-md bg-sts-blue-400/15 px-2 py-0.5">
                            平日
                            <span className="text-sts-blue-500">期貨</span>
                            平倉損益
                          </span>
                          +
                          <span className="mx-1 rounded-md bg-sts-blue-400/15 px-2 py-0.5">
                            本日
                            <span className="text-sts-blue-500">期貨</span>
                            未實損益
                          </span>
                          -
                          <span className="mx-1 rounded-md bg-sts-blue-400/15 px-2 py-0.5">
                            昨日
                            <span className="text-sts-blue-500">期貨</span>
                            未實損益
                          </span>
                          ) <br /> + (
                          <span className="mx-1 rounded-md bg-sts-orange-400/15 px-2 py-0.5">
                            本日
                            <span className="text-sts-orange-500">權利金</span>
                            收支
                          </span>
                          +
                          <span className="mx-1 rounded-md bg-sts-orange-400/15 px-2 py-0.5">
                            本日
                            <span className="text-sts-orange-500">權利金</span>
                            淨市值
                          </span>
                          -
                          <span className="mx-1 rounded-md bg-sts-orange-400/15 px-2 py-0.5">
                            昨日
                            <span className="text-sts-orange-500">權利金</span>
                            淨市值
                          </span>
                          )
                        </div>

                        <div className="border-t border-black pt-3 text-center">
                          <div className="text-lg">
                            口數(X保證金) <br />
                            <span className="-mt-1 block text-sm text-gray-600">
                              (=當日平倉口數+當日持倉口數)
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-600">
                          (註) *選擇權(無論買賣方)以對應期貨商品之原始保證金計算
                        </div>
                      </div>
                    </div>

                    {/* 絕對獲利積分 */}
                    <div className="flex flex-wrap items-baseline space-y-3">
                      <h2 className="text-nowrap text-xl">
                        ②{' '}
                        <span className="font-bold text-red-600 underline">
                          絕對獲利
                        </span>
                        積分
                      </h2>
                      <div className="ml-4 space-y-2">
                        <div className="text-lg">
                          ▶ 每獲利2,000元=1分{' '}
                          <span className="text-base text-gray-600">
                            (*盈虧皆計算)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 交易分數積分 */}
                    <div className="flex flex-wrap items-baseline space-y-3">
                      <h2 className="text-nowrap text-xl">
                        ③ 交易
                        <span className="font-bold text-red-600 underline">
                          分數
                        </span>
                        積分
                      </h2>
                      <div className="ml-4 space-y-2">
                        <div className="text-lg">
                          ▶ 選擇權、大、中、小型合約=兩分
                        </div>
                        <div className="text-lg">▶ 微型合約=1分</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreExplanationDialog;
