'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDialogFlow } from '@/hooks/use-dialog-flow';
import type { RegisterDialogStep } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';
import LoginForm from '../forms/login-form';
import RegistrationForm from '../forms/registration-form';
import { Button } from '../ui/button';

interface RegisterDialogProps {
  children?: React.ReactNode;
  initialStep?: RegisterDialogStep;
}

const RegisterDialog = ({
  children,
  initialStep = 'login',
}: RegisterDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    dialogState,
    isLoading,
    handleLogin,
    handleRegistration,
    resetDialog,
    goBack,
  } = useDialogFlow(initialStep);

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
            onSubmit={handleRegistration}
            accountList={dialogState.data?.accounts || []}
          />
        );

      // case 'success':
      //   if (!dialogState.data?.resultsData) {
      //     return <div className="p-8 text-center">載入成績資料中...</div>;
      //   }
      //   return (
      //     <ResultsDisplay
      //       data={dialogState.data.resultsData}
      //       isLoading={isLoading}
      //     />
      //   );

      case 'success':
        return (
          <div className="bg-white p-6 px-5 text-center">
            <div className="space-y-2 text-left text-base sm:text-xl">
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
                  天天投票人，也能抽價值40萬好禮！{' '}
                </span>
                一起為期貨戰士加油打氣~
              </p>
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
