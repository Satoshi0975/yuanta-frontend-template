'use client';

import { Button } from '@/components/nes/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useState } from 'react';

interface VoteDialogProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

const VoteDialog = ({ children, defaultOpen = false }: VoteDialogProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isAgreed, setIsAgreed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleClose = () => {
    if (!isAgreed) {
      setShowWarning(true);
      return;
    }
    setIsOpen(false);

    // 關閉後平滑滾動到 #form
    setTimeout(() => {
      const formElement = document.getElementById('form');
      if (formElement) {
        formElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300); // 延遲確保對話框完全關閉
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-[9999] mx-auto max-h-screen max-w-md rounded-lg border-none bg-sts-orange-200 ring-0 [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="mx-auto mb-3 w-fit bg-sts-red-200 px-5 py-3 text-center text-xl text-white nes-corners">
            <h1 className="font-cubic text-xl font-semibold">
              提醒您：每日限投一次！
            </h1>
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <p className="px-2 pb-3 font-sans text-base text-black">
                同一支手機號碼每日僅能投票一次。若經主辦單位判定有灌票或不當操作之情事，即使中獎，亦將取消資格，並不予補發。
              </p>
              <div className="space-y-6 text-base text-sts-text nes-corners">
                <div className="bg-white">
                  <ScrollArea className="max-h-[calc(100vh-400px)] overflow-y-auto bg-white p-4">
                    <div className="text-left">
                      <h2 className="py-2 font-sans text-xl font-semibold">
                        注意事項：
                      </h2>
                      <ol className="list-decimal space-y-1 pl-6">
                        <li>
                          本活動為「期貨人氣王投票」，同一支手機號碼每日限投一票。如經主辦單位判定有灌票或不當操作（含重複輸入、使用虛擬號碼、程式操作等）之嫌疑，即使抽中獎項，亦將取消資格並不予補發。
                        </li>
                        <li>
                          活動結束後，主辦單位將抽出40名中獎者，贈送NT$1,000電子禮券，並以簡訊發送至參加者所填之手機號碼。中獎資格不得轉讓、兌換現金或更換其他品項。
                        </li>
                        <li>
                          主辦單位於活動範圍內蒐集、處理及使用個人資料（如中獎通知、寄送獎品、稅務申報），並遵守個資保護法規定。
                        </li>
                        <li>
                          主辦單位得視情況（如系統異常、法規要求或不可抗力因素）保留審核、調整、暫停或終止活動之權利，並以公告為準。
                        </li>
                        <li>
                          中獎人(納稅義務人)於本公司(扣繳義務人)之全年中獎總金額超過新台幣1,000元(含)以上，年底時元大期貨將依稅法相關規定辦理開立扣繳憑單。如有活動問題，週一至週五08：00-17：00洽活動承辦小組
                          蘇小姐(02-2717-6000 #7213)
                        </li>
                      </ol>
                      <h2 className="py-2 font-sans text-xl font-semibold">
                        得獎領取方式：
                      </h2>
                      <ol className="list-decimal space-y-1 pl-6">
                        <li>
                          活動結束後，主辦單位將於指定日期抽出中獎者，並將「專屬連結與密碼」透過簡訊寄送至中獎人於投票時填寫的手機號碼。
                        </li>
                        <li>
                          提供真實姓名與手機號碼，以作為中獎通知與獎品發送使用。若填寫不實或無法接收簡訊或未於期限內完成領獎流程，則視同放棄領獎資格，恕不補發。
                        </li>
                        <li>
                          中獎人須於收到簡訊後，點擊主辦單位提供之專屬連結，並輸入簡訊內的專屬密碼驗證身分。
                        </li>
                        <li>
                          驗證成功後，中獎人需完整填寫以下資料： <br />
                          (一) 真實姓名
                          <br />
                          (二) 手機號碼（需與投票時填寫一致，本公司將會驗證）
                          <br />
                          (三) 身分證字號 <br />
                          (四) 地址（作為扣繳憑單寄送使用）
                        </li>
                        <li>
                          中獎人須於寄送通知後7日內完成上述領獎流程。逾期未完成者，將自動喪失領獎資格，不再補發。
                        </li>
                        <li>
                          本活動所贈送之〈電子票券〉皆由「PayEasy康迅數位整合股份有限公司」提供，並將於活動結束後兩個月內，以簡訊發送兌換贈品序號至中獎者之手機號碼。中獎者如未提供完整正確資料或拒絕填寫，將視同放棄得獎資格，不予補發。贈品序號須於指定期限內完成兌換，逾期視同放棄；電子票券為不記名，任何人持有皆可兌換，請妥善保管，若遭他人盜用或遺失，恕不補發。
                        </li>
                        <li>
                          本活動〈電子票票券〉之贊品使用方式與相關限制，悉依該獎項所載附之使用說明及相關須知為準，若有疑問請洽商品廠商或服務提供者，如因使用本獎項而引起之爭議、糾紛、損害賠償，由商品廠商或服務提供者負責。元大期貨之電子兌換券由「PayEasy禮贈平台」提供，與本公司並無任何代理關係，如因使用兌換或服務產生任何爭議，將由PayEasy負責，電子兌換券若有任何疑問，請於台灣時間週一至週五上午9:00至下午6:00電洽PayEasy客服專線：02-5569-1616。
                        </li>
                        <li>
                          本活動〈電子票票券〉之贊品使用方式與相關限制，悉依該獎項所載附之使用說明及相關須知為準，若有疑問請洽商品廠商或服務提供者，如因使用本獎項而引起之爭議、糾紛、損害賠償，由商品廠商或服務提供者負責。
                        </li>
                      </ol>
                    </div>
                  </ScrollArea>
                </div>
              </div>

              {/* Checkbox 同意條款 */}
              <div className="mt-4 flex items-center space-x-2">
                <Checkbox
                  id="agree-terms"
                  checked={isAgreed}
                  onCheckedChange={(checked) => {
                    setIsAgreed(checked === true);
                    if (checked) setShowWarning(false);
                  }}
                />
                <label
                  htmlFor="agree-terms"
                  className="cursor-pointer select-none font-sans text-sm text-black"
                >
                  我已閱讀並同意以上注意事項，並開始投票
                </label>
              </div>

              <Button
                onClick={handleClose}
                className="mt-3 pb-5 pt-2 text-xl"
              >
                確認
              </Button>

              {/* 警告提示 */}
              {showWarning && (
                <p className="mt-2 text-center text-sm text-red-600">
                  請先勾選同意條款才能繼續
                </p>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VoteDialog;
