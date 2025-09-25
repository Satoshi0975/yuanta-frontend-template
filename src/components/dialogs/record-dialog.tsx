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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useRecordDialog } from '@/hooks/use-record-dialog';
import type { RecordDialogStep } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import LoginForm from '../forms/login-form';
import RecordDisplay from '../record/record-display';
import { Button } from '../ui/button';

interface RecordDialogProps {
  children?: React.ReactNode;
  initialStep?: RecordDialogStep;
}

const RecordDialog = ({
  children,
  initialStep = 'login',
}: RecordDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    dialogState,
    isLoading,
    handleLogin,
    handleAccountResults,
    resetDialog,
    goBack,
  } = useRecordDialog(initialStep);

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
      case 'record':
        return '成績查詢';
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

      case 'record':
        return (
          <RecordDisplay
            accounts={dialogState.data?.accounts || []}
            resultsData={dialogState.data?.resultsData}
            selectedAccount={dialogState.data?.selectedAccountId}
            isLoading={isLoading}
            onAccountSelect={handleAccountResults}
          />
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
  const showBackButton = dialogState.step === 'record';

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          'z-[9999] mx-auto rounded-lg border-none bg-sts-orange-200 ring-0 [&>button]:hidden',
          {
            'max-w-md': dialogState.step === 'login',
            'max-w-2xl': dialogState.step === 'record',
          }
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
            <div
              className={cn(
                'max-w-full space-y-6 text-base text-sts-text',
                dialogState.step === 'login' && 'bg-white nes-corners'
              )}
            >
              <ScrollArea className="max-h-[calc(100vh-180px)] overflow-y-auto">
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
                <ScrollBar hidden />
              </ScrollArea>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RecordDialog;
