'use client';

import ArrowLeft from '@/assets/arrow-left.svg';
import X from '@/assets/X.svg';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRegisterDialog } from '@/hooks/use-register-dialog';
import type { RegisterDialogStep } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Copy, Share2, Vote } from 'lucide-react';
import { useState } from 'react';
import LoginForm from '../forms/login-form';
import RegistrationForm from '../forms/registration-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface RegisterDialogProps {
  children?: React.ReactNode;
  initialStep?: RegisterDialogStep;
}

const RegisterDialog = ({
  children,
  initialStep = 'login',
}: RegisterDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const {
    dialogState,
    isLoading,
    handleLogin,
    handleRegistration,
    resetDialog,
    goBack,
  } = useRegisterDialog(initialStep);

  // 處理對話框開關
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetDialog();
    }
    console.log('handleOpenChange', open);
    setIsOpen(open);
  };

  // 獲取標題
  const getTitle = (): string => {
    switch (dialogState.step) {
      case 'login':
        return '帳號登入';
      case 'registration':
        return '活動報名';
      case 'success':
        return '歡迎勇者';
      case 'error':
        return '發生錯誤';
      default:
        return '元大期貨';
    }
  };

  // 處理分享功能
  const handleShare = async () => {
    const shareContext = dialogState.data?.shareContext;
    if (!shareContext) return;

    // 檢查是否支援原生分享
    if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
      try {
        await navigator.share({
          title: '元大期貨人氣王競賽',
          text: shareContext,
        });
      } catch (err) {
        // 使用者取消分享或出現錯誤時，降級使用複製功能
        console.error('原生分享失敗:', err);
        handleCopyShare();
      }
    } else {
      // 桌面版或不支援的裝置使用複製功能
      handleCopyShare();
    }
  };

  // 處理複製分享連結
  const handleCopyShare = async () => {
    const shareContext = dialogState.data?.shareContext;
    if (shareContext) {
      try {
        await navigator.clipboard.writeText(shareContext);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error('複製失敗:', err);
      }
    }
  };

  // 獲取內容組件
  const renderContent = () => {
    switch (dialogState.step) {
      case 'login':
        return (
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={dialogState.data?.errorMessage}
            fieldErrors={dialogState.data?.fieldErrors}
          />
        );

      case 'registration':
        return (
          <RegistrationForm
            onSubmit={async (values) => {
              await handleRegistration(values);
            }}
            accountList={dialogState.data?.accounts || []}
          />
        );

      case 'success':
        return (
          <div className="bg-white p-6 px-5 text-center">
            <div className="space-y-4 text-left text-base sm:text-xl">
              <p className="text-2xl font-bold">
                感謝報名！您的編號：
                <span className="rounded-md bg-sts-blue-100 px-2 text-sts-blue-500">
                  #{dialogState.data?.registrationData?.id}
                </span>
              </p>
              <p>
                歡迎分享給好朋友們，到人氣王專區為您投票，
                <br />
                <span className="font-extrabold">
                  天天投票，抽總價值4萬好禮！{' '}
                </span>
                一起為期貨戰士加油打氣~
              </p>

              {/* 分享連結功能 */}
              {dialogState.data?.shareContext && (
                <div className="mt-4 space-y-3">
                  <div className="hidden items-center gap-2 rounded border bg-gray-50 p-2">
                    <Input
                      value={dialogState.data.shareContext}
                      readOnly
                      className="hidden flex-1 border-none bg-transparent text-sm"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleCopyShare}
                      className="flex items-center gap-1"
                    >
                      {copySuccess ? (
                        <>
                          <Share2 className="h-4 w-4" />
                          已複製！
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          複製連結
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex justify-center gap-2">
                    <Button
                      type="button"
                      onClick={handleShare}
                      className="flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-sm text-white transition-colors hover:bg-green-600"
                    >
                      <Share2 className="h-4 w-4" />
                      {copySuccess ? '已複製連結' : '分享給朋友'}
                    </Button>

                    <a
                      href={
                        dialogState.data.shareContext.match(
                          /https?:\/\/[^\s]+/
                        )?.[0] || '#'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
                    >
                      <Vote className="h-4 w-4" />
                      前往投票
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'error':
        return (
          <div className="p-8 text-center">
            <p className="mb-5 text-xl text-red-600">
              {dialogState.data?.errorMessage ||
                '發生未知錯誤，請重新再試一次！'}
            </p>
            <Button
              onClick={goBack}
              className="hover:!bg-yt-blue-600/90 relative px-12 py-6 text-xl font-medium"
              size="default"
            >
              返回
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  // 是否顯示返回按鈕
  const showBackButton = dialogState.step === 'registration';
  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          'z-[9999] mx-auto max-w-md rounded-lg border-none bg-sts-orange-200 ring-0 [&>button]:hidden'
        )}
      >
        <DialogHeader className="relative">
          {showBackButton && (
            <button
              onClick={goBack}
              className="absolute left-0 top-0 rounded-full p-2 transition-colors hover:scale-110"
              disabled={isLoading}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          <DialogTitle
            className="mx-auto mb-3 w-fit text-center text-3xl"
            asChild
          >
            <h1 className="font-cubic text-3xl font-semibold">{getTitle()}</h1>
          </DialogTitle>

          <button
            onClick={() => handleOpenChange(false)}
            className="absolute right-0 top-0 !mt-0 rounded-full p-2 transition-colors hover:scale-110"
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </button>

          <DialogDescription asChild>
            <div className="space-y-6 text-base text-sts-text nes-corners">
              <ScrollArea className="max-h-[calc(100vh-180px)] overflow-y-auto bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={dialogState.step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="text-center md:px-4"
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </ScrollArea>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
