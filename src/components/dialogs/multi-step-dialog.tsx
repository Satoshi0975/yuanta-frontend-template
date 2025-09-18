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
import type { DialogStep } from '@/lib/types';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import RegistrationForm from '../forms/registration-form';
import AccountSelection from './account-selection';
import LoginForm from './login-form';
import ResultsDisplay from './results-display';

interface MultiStepDialogProps {
  children?: React.ReactNode;
  initialStep?: DialogStep;
}

const MultiStepDialog = ({
  children,
  initialStep = 'login',
}: MultiStepDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    dialogState,
    isLoading,
    handleLogin,
    handleRegistration,
    handleGetResults,
    handleAccountRegistration,
    handleAccountResults,
    resetDialog,
    goBack,
  } = useDialogFlow(initialStep);

  // 處理對話框開關
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetDialog();
    }
    setIsOpen(open);
  };

  // 獲取標題
  const getTitle = (): string => {
    switch (dialogState.step) {
      case 'login':
        return '帳號登入';
      case 'account-selection':
        return '選擇操作';
      case 'registration':
        return '活動報名';
      case 'results':
        return '我的打擊率';
      case 'success':
        return '操作成功';
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
        return <LoginForm onSubmit={handleLogin} />;

      case 'account-selection':
        if (!dialogState.data?.user || !dialogState.data?.accounts) {
          return <div className="p-8 text-center">載入帳號資料中...</div>;
        }
        return (
          <AccountSelection
            user={dialogState.data.user}
            accounts={dialogState.data.accounts}
            onRegistration={handleAccountRegistration}
            onViewResults={handleAccountResults}
          />
        );

      case 'registration':
        return (
          <RegistrationForm
            onSubmit={handleRegistration}
            defaultAccount={dialogState.data?.selectedAccountId || ''}
          />
        );

      case 'results':
        if (!dialogState.data?.resultsData) {
          return <div className="p-8 text-center">載入成績資料中...</div>;
        }
        return (
          <ResultsDisplay
            data={dialogState.data.resultsData}
            onRefresh={() => {
              if (dialogState.data?.accounts?.[0]?.accountId) {
                handleGetResults(dialogState.data.accounts[0].accountId);
              }
            }}
            isLoading={isLoading}
          />
        );

      case 'success':
        return (
          <div className="p-8 text-center">
            <div className="mb-4 text-xl text-green-600">✓ 操作成功</div>
            {dialogState.data?.registrationData && (
              <div className="space-y-2">
                <p>恭喜您成功報名！</p>
                <p className="text-sm text-gray-600">
                  暱稱：{dialogState.data.registrationData.nickname}
                </p>
                <p className="text-sm text-gray-600">
                  報名時間：
                  {new Date(
                    dialogState.data.registrationData.registrationTime
                  ).toLocaleString('zh-TW')}
                </p>
              </div>
            )}
          </div>
        );

      case 'error':
        return (
          <div className="p-8 text-center">
            <div className="mb-4 text-xl text-red-600">✗ 發生錯誤</div>
            <p className="mb-4 text-red-600">
              {dialogState.data?.errorMessage || '發生未知錯誤'}
            </p>
            <button
              onClick={goBack}
              className="text-blue-600 underline hover:text-blue-800"
            >
              返回重試
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // 是否顯示返回按鈕
  const showBackButton =
    dialogState.step !== 'login' &&
    dialogState.step !== 'success' &&
    dialogState.step !== 'account-selection';

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          'mx-auto max-w-md rounded-lg bg-white',
          dialogState.step === 'results' && 'md:max-w-2xl'
        )}
      >
        <DialogHeader className="relative">
          {showBackButton && (
            <button
              onClick={goBack}
              className="absolute left-0 top-0 rounded-full p-2 transition-colors hover:bg-gray-100"
              disabled={isLoading}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}

          <DialogTitle className="mx-auto mb-5 w-fit text-center text-3xl">
            <h1 className="font-cubic text-3xl font-semibold">{getTitle()}</h1>
          </DialogTitle>

          <DialogDescription asChild>
            <div className="text-yuan-blue-800 space-y-6 text-base">
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
              </ScrollArea>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepDialog;
