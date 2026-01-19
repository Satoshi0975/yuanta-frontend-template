'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button as NesButton } from '@/components/nes/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import gold from '@/assets/images/element/gold.png';
import Image from '@/lib/image';
import { WinnerFormData, winnerSchema } from '@/lib/validations';
import { LoaderCircle } from 'lucide-react';

export function InformationForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WinnerFormData>({
    resolver: zodResolver(winnerSchema),
    defaultValues: {
      fullName: '',
      citizenId: '',
      mobilePhone: '',
      address: '',
    },
  });

  const onSubmit = async (values: WinnerFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/2025Contest/api/winner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccessDialog(true);
        form.setValue('fullName', '');
        form.setValue('citizenId', '');
        form.setValue('mobilePhone', '');
        form.setValue('address', '');
      } else {
        setSubmitError(result.message || '提交失敗');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('網路錯誤，請稍後再試');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="-ml-1 flex items-center gap-2 font-cubic text-lg font-bold">
                  <Image
                    src={gold}
                    alt="gold"
                    className="gold-rotate-3d h-5 w-auto"
                  />
                  姓名（真實姓名）
                  <span className="text-sm font-normal text-gray-400">
                    必填
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full max-w-52 rounded-none border-2 border-black bg-white"
                    placeholder="請輸入您的姓名"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="citizenId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="-ml-1 flex items-center gap-2 font-cubic text-lg font-bold">
                  <Image
                    src={gold}
                    alt="gold"
                    className="gold-rotate-3d h-5 w-auto"
                  />
                  身分證字號
                  <span className="text-sm font-normal text-gray-400">
                    必填
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full max-w-52 rounded-none border-2 border-black bg-white"
                    placeholder="請輸入您的身分證字號"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobilePhone"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="-ml-1 flex items-center gap-2 font-cubic text-lg font-bold">
                    <Image
                      src={gold}
                      alt="gold"
                      className="gold-rotate-3d h-5 w-auto"
                    />
                    手機號碼
                    <span className="text-sm font-normal text-gray-400">
                      必填
                    </span>
                  </FormLabel>

                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input
                        className="w-full max-w-52 rounded-none border-2 border-black bg-white"
                        placeholder="0900000000"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="-ml-1 flex items-center gap-2 font-cubic text-lg font-bold">
                  <Image
                    src={gold}
                    alt="gold"
                    className="gold-rotate-3d h-5 w-auto"
                  />
                  戶籍地址
                  <span className="text-sm font-normal text-gray-400">
                    必填
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full max-w-full rounded-none border-2 border-black bg-white"
                    placeholder="臺北市中山區南京東路二段77號2樓"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {submitError && (
            <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {submitError}
            </div>
          )}

          <NesButton
            variant="secondary"
            type="submit"
            className="mt-3 pb-4 pt-3 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? '送出中...' : '確認送出'}
            {isSubmitting && (
              <LoaderCircle className="absolute right-3 top-[calc(50%-12px)] animate-spin" />
            )}
          </NesButton>
        </form>
      </Form>

      {/* 成功投票彈窗 */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="nes-sm-corners max-w-md border-2 bg-sts-orange-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center font-cubic text-xl font-bold">
              送出成功！
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col items-center justify-center pt-4">
            <AlertDialogDescription className="-mt-4 mb-3 text-center text-lg text-sts-text">
              感謝填寫資訊！
              <br />
              電子禮券將於30天內寄送到您填寫的手機簡訊，請留意訊息。
              <br />
              有任何問題請洽活動小組（02-2717-6000 #7213蘇小姐）
            </AlertDialogDescription>
            <AlertDialogAction
              onClick={() => setShowSuccessDialog(false)}
              className="nes-sm-corners border-black bg-sts-blue-300 px-6 py-2 font-cubic font-bold hover:bg-sts-blue-400"
            >
              確定
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
