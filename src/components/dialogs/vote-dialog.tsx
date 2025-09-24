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
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef, useState } from 'react';

interface VoteDialogProps {
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

const VoteDialog = ({ children, defaultOpen = false }: VoteDialogProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [currentStep, setCurrentStep] = useState(1); // 1: 注意事項, 2: 得獎領取方式
  const [step1Agreed, setStep1Agreed] = useState(false);
  const [step2Agreed, setStep2Agreed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [step1ScrolledToBottom, setStep1ScrolledToBottom] = useState(false);
  const [step2ScrolledToBottom, setStep2ScrolledToBottom] = useState(false);
  const [showScrollWarning, setShowScrollWarning] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 只有在對話框打開時才設置滾動監聽
    if (!isOpen) return;

    const setupScrollListener = () => {
      const scrollArea = scrollAreaRef.current;
      if (!scrollArea) {
        setTimeout(setupScrollListener, 100);
        return;
      }

      const handleScroll = () => {
        setShowScrollWarning(false);
        const { scrollTop, scrollHeight, clientHeight } = scrollArea;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;

        if (isAtBottom) {
          if (currentStep === 1 && !step1ScrolledToBottom) {
            setStep1ScrolledToBottom(true);
          } else if (currentStep === 2 && !step2ScrolledToBottom) {
            setStep2ScrolledToBottom(true);
          }
        }
      };

      scrollArea.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => scrollArea.removeEventListener('scroll', handleScroll);
    };

    // 延遲一下確保 DOM 完全渲染
    const timeout = setTimeout(setupScrollListener, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen, currentStep, step1ScrolledToBottom, step2ScrolledToBottom]);

  const handleCheckboxChange = (checked: boolean) => {
    if (currentStep === 1) {
      if (checked && !step1ScrolledToBottom) {
        setShowScrollWarning(true);
        return;
      }
      setStep1Agreed(checked);
    } else if (currentStep === 2) {
      if (checked && !step2ScrolledToBottom) {
        setShowScrollWarning(true);
        return;
      }
      setStep2Agreed(checked);
    }

    if (checked) {
      setShowWarning(false);
      setShowScrollWarning(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!step1Agreed) {
        setShowWarning(true);
        return;
      }
      setCurrentStep(2);
      setShowWarning(false);

      // 切換到第二步時，將滾動位置重置到頂部
      setTimeout(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTop = 0;
        }
      }, 50);
    } else if (currentStep === 2) {
      if (!step2Agreed) {
        setShowWarning(true);
        return;
      }
      // 兩步驟都完成，關閉對話框
      setIsOpen(false);

      // 關閉後平滑滾動到 #form
      setTimeout(() => {
        const formElement = document.getElementById('form');
        if (formElement) {
          formElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 300);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        // 禁止透過點擊外部關閉對話框
        if (!open && !(step1Agreed && step2Agreed)) {
          setShowWarning(true);
          return;
        }
        setIsOpen(open);
      }}
      open={isOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="z-[9999] mx-auto max-h-screen max-w-md rounded-lg border-none bg-sts-orange-200 ring-0 [&>button]:hidden">
        <DialogHeader>
          <DialogTitle
            className="mx-auto mb-3 w-fit bg-sts-red-200 px-5 py-3 text-center text-xl text-white nes-corners"
            asChild
          >
            <h1 className="font-cubic text-xl font-semibold">
              {currentStep === 1 ? '提醒您：每日限投一次！' : '隱私權保護聲明'}{' '}
              ({currentStep}/2)
            </h1>
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              {currentStep === 1 && (
                <p className="px-2 pb-3 font-sans text-base text-black">
                  同一支手機號碼每日僅能投票一次。若經主辦單位判定有灌票或不當操作之情事，即使中獎，亦將取消資格，並不予補發。
                </p>
              )}
              <div className="space-y-6 text-base text-sts-text nes-corners">
                <div className="bg-white">
                  <ScrollArea
                    ref={scrollAreaRef}
                    className="max-h-[calc(100vh-400px)] overflow-y-auto bg-white p-4"
                  >
                    <div className="text-left">
                      {currentStep === 1 ? (
                        <>
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
                              (一) 真實姓名 <br />
                              (二)
                              手機號碼（需與投票時填寫一致，本公司將會驗證）{' '}
                              <br />
                              (三) 身分證字號 <br />
                              (四) 地址（作為扣繳憑單寄送使用）
                            </li>
                            <li>
                              中獎人須於寄送通知後7日內完成上述領獎流程。逾期未完成者，將自動喪失領獎資格，不再補發。
                            </li>
                            <li>
                              本活動所贈送之〈電子票券〉皆由「PayEasy康訊數位整合股份有限公司」提供，並將於活動結束後兩個月內，以簡訊發送兌換贈品序號至中獎者之手機號碼。
                            </li>
                            <li>
                              本活動〈電子票票券〉的使用方式與相關限制，悉依該獎項所載附之使用說明及相關須知為準。電子票券為不記名，任何人持有皆可兌換，請妊善保管。
                            </li>
                          </ol>
                        </>
                      ) : (
                        <div className="[&>h3]:py-2 [&>h3]:font-sans [&>h3]:text-lg [&>h3]:font-semibold">
                          <h2 className="py-2 text-center font-sans text-xl font-semibold">
                            隱私權保護聲明
                          </h2>
                          <p>
                            親愛的參與者，歡迎您光臨元大期貨股份有限公司(以下簡稱本公司)網站，為了讓您能夠安心的使用本公司網站為您提供的各項服務，對於您個人的隱私權，本公司會絕對尊重並嚴格保護，我們在此向您說明本公司網站的隱私權保護政策，以及我們對您所提供任何資料的絕對保護與尊重。
                          </p>
                          <h3>1. 個人資料之蒐集政策</h3>
                          <p>
                            當您參與本公司線上活動、網路調查、加入會員或其他相關服務時，因服務性質的不同，本公司可能會請您提供姓名、身分證字號、住址、電話、電子信箱或其他相關必要資料。除此之外，本公司也可能會保留您在上網瀏覽或查詢時，伺服器自行產生的相關記錄，包括但不限於您使用連線設備的IP位址、使用的瀏覽器、使用時間、瀏覽及點選資料紀錄等。請您注意，與本網站連結的其他網站，也可能蒐集您個人的資料，對於您主動提供其他網站的個人資料，將依相關法令及各該連結網站所揭露之隱私權保護政策蒐集、處理與利用，不適用本聲明，本公司亦不負擔任何連帶責任。
                          </p>
                          <h3>2. 個人資料之儲存及保護</h3>
                          <p>
                            為保護您個人資料之隱密及完整性，本公司謹恪遵政府相關法令及資訊管理原則。您的個人資料會被嚴密保存於本公司或本公司所委託具有高度安全性、穩定性之資訊保管公司的資料儲存系統中；要取得您的任何資料，都必須在本公司訂定之資料授權範圍內，始可進行資料之取得與使用。此外，本公司已採用適當技術及組織安全措施，保障您的個人資料免遭遺失或任何非法處理。本公司不會將您的資料提供給本公司或本聲明所告知以外之任何人，惟經司法單位或其他主管機關依法並透過正式且合法之程序要求時，則不在此限。
                          </p>
                          <h3>3.個人資料之查詢、閱覽及刪除</h3>
                          <p>
                            除法令另有規定外，您可以依本公司指定之方式及程序，行使下列權利：向本公司查詢、請求閱覽或請求製給複製本，而本公司得酌收必要成本費用。
                          </p>
                          <p>向本公司請求補充或更正，惟您應為適當之釋明。</p>
                          <p>
                            向本公司請求停止蒐集、處理或利用及請求刪除，惟本公司因執行業務所必須者，得不依您的申請為之。
                          </p>
                          <h3>4.自我保護措施</h3>
                          <p>
                            請妥善保管您的憑證、密碼或任何個人資料，切勿將任何個人資料提供第三人。在您使用完本公司網站所提供的各項服務功能後，請務必記得登出帳戶，若您是與他人共享電腦或使用公用電腦，切記要關閉瀏覽器視窗，以防止他人讀取您的個人資料。
                          </p>
                          <h3>5.本聲明之修訂</h3>
                          <p>
                            本公司為因應社會環境變化、業務需求、科技技術之進步及法令規定之變更，將不定時修訂與公布本聲明。請您隨時參閱本公司網站之隱私權保護聲明，以保障您的權益。
                          </p>
                          <h3>6.隱私權與資訊安全宣告</h3>
                          <p>
                            為保護使用者個人資料，並維護網路隱私權，使用者如對本聲明，或與個人資料有關之事項有意見時，請利用電子郵件Futures@Yuanta.Com或客服專線(02)2326-1000/0800-333-338(僅供市話撥打)向本公司提出，本公司將提供進一步之說明。
                          </p>
                          <h3>7.著作權聲明</h3>
                          <p>
                            本公司保留本公司網站內容之一切法律權利，非經本公司授權使用或同意，此處資料均不得利用電子、機械、影印、錄音或任何形式、方法予以重製、轉載或製作衍生物等。
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              {/* Checkbox 同意條款 */}
              <div className="mt-4 flex items-start space-x-2">
                <Checkbox
                  id="agree-terms"
                  checked={currentStep === 1 ? step1Agreed : step2Agreed}
                  onCheckedChange={(checked) => {
                    handleCheckboxChange(checked === true);
                  }}
                />
                <label
                  htmlFor="agree-terms"
                  className="cursor-pointer select-none text-left font-sans text-sm text-black"
                >
                  {currentStep === 1
                    ? '我已閱讀並同意以上注意事項'
                    : '您提供的資料，我們僅會基於您的申請事項之目的及範圍，於業務所需執行期間，在本公司所在地區以合理方式，蒐集、處理、利用您所留下之姓名、電話等個人資料，而在您點選「確認送出」時表示您對前述內容及本公司之隱私權保護聲明及個人資料保護法告知事項已充分瞭解並同意。 '}
                </label>
              </div>
              <Button
                onClick={handleNextStep}
                className="mt-3 pb-5 pt-2 text-xl"
              >
                {currentStep === 1 ? '下一步' : '開始投票'}
              </Button>
              {/* 警告提示 */}
              {showWarning && (
                <p className="mt-2 text-center text-sm text-red-600">
                  請先勾選同意條款才能繼續
                </p>
              )}
              {showScrollWarning && (
                <p className="mt-2 text-center text-sm text-red-600">
                  請先閱讀完整條款內容至底部
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
