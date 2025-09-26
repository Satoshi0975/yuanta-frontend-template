'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button as NesButton } from '@/components/nes/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import gold from '@/assets/images/element/gold.png';
import { useVoting } from '@/hooks/useVoting';
import Image from '@/lib/image';
import type { Participant } from '@/lib/types';
import { voteSchema, type VoteFormData } from '@/lib/validations';

interface VoteFormProps {
  onSuccess?: () => void;
  initialSearchId?: string;
}

export function VoteForm({ onSuccess, initialSearchId }: VoteFormProps) {
  const { isLoading, searchParticipants, vote, clearError } = useVoting();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchKeyword, setSearchKeyword] = useState(initialSearchId || '');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [otherLocation, setOtherLocation] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const form = useForm<VoteFormData>({
    resolver: zodResolver(voteSchema),
    defaultValues: {
      voterName: '',
      voterPhone: '',
      hasFuturesAccount: undefined,
      location: undefined,
      hasSecuritiesAccount: false,
    },
  });

  // 載入初始參賽者列表
  useEffect(() => {
    const loadParticipants = async () => {
      // 如果有提供初始搜尋 ID，直接搜尋該 ID
      if (initialSearchId) {
        const response = await searchParticipants(initialSearchId);
        if (response.success && response.data) {
          setParticipants(response.data.data);
        }
      } else {
        // 否則載入預設列表
        const response = await searchParticipants();
        if (response.success && response.data) {
          setParticipants(response.data.data);
        }
      }
    };
    loadParticipants();
  }, [searchParticipants, initialSearchId]);

  const handleSearch = async () => {
    // 重新搜尋時清除目前選擇的 participantId
    form.unregister('participantId');
    form.clearErrors('participantId');

    if (searchKeyword.trim()) {
      const response = await searchParticipants(searchKeyword.trim());
      if (response.success && response.data) {
        setParticipants(response.data.data);
      }
    } else {
      // 空搜尋則載入預設列表
      const response = await searchParticipants();
      if (response.success && response.data) {
        setParticipants(response.data.data);
      }
    }
  };

  const onSubmit = async (values: VoteFormData) => {
    clearError();
    setSubmitError(null);

    try {
      const response = await vote(values);

      if (response.success) {
        setShowSuccessDialog(true);
        form.reset();
        onSuccess?.();
      } else {
        setSubmitError(response.message);
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '投票失敗');
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 py-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <FormField
            control={form.control}
            name="voterName"
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
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="voterPhone"
            render={({ field }) => (
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
                  <Input
                    className="w-full max-w-52 rounded-none border-2 border-black bg-white"
                    placeholder="0900000000"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  若中獎，屆時會以此手機號碼聯繫得獎者。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasFuturesAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="items-base -ml-1 flex gap-2 font-cubic text-lg font-bold">
                  <Image
                    src={gold}
                    alt="gold"
                    className="gold-rotate-3d h-5 w-auto"
                  />
                  <span>
                    是否為期貨戶{' '}
                    <span className="text-sm font-normal text-gray-400">
                      必填
                    </span>
                  </span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === 'true')}
                    value={field.value?.toString() ?? ''}
                    className="flex flex-row space-x-6"
                    disabled={isLoading}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="true"
                        id="futures-yes"
                        className="rounded-none border-2 border-black bg-white data-[state=checked]:bg-black"
                      />
                      <label
                        htmlFor="futures-yes"
                        className="cursor-pointer select-none text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        是
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="false"
                        id="futures-no"
                        className="rounded-none border-2 border-black bg-white data-[state=checked]:bg-black"
                      />
                      <label
                        htmlFor="futures-no"
                        className="cursor-pointer select-none text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        否
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="-ml-1 flex items-center gap-2 font-cubic text-lg font-bold">
                  <Image
                    src={gold}
                    alt="gold"
                    className="gold-rotate-3d h-5 w-auto"
                  />
                  想了解更多期貨內容，請問居住地區？
                </FormLabel>
                <FormDescription>
                  (※勾選此項，我們將由專人致電聯繫，提供期貨相關資訊。)
                </FormDescription>
                <FormControl>
                  <div className="space-y-3">
                    <RadioGroup
                      onValueChange={(value) => {
                        if (value !== '其他') {
                          setOtherLocation('');
                          field.onChange(value);
                        } else {
                          field.onChange(otherLocation || '其他');
                        }
                      }}
                      value={
                        field.value === otherLocation && otherLocation
                          ? '其他'
                          : (field.value ?? '')
                      }
                      className="grid grid-cols-3 gap-3"
                      disabled={isLoading}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="台北"
                          id="location-taipei"
                          className="rounded-none border-2 border-black bg-white data-[state=checked]:bg-black"
                        />
                        <label
                          htmlFor="location-taipei"
                          className="cursor-pointer select-none text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          台北
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="新竹"
                          id="location-hsinchu"
                          className="rounded-none border-2 border-black bg-white data-[state=checked]:bg-black"
                        />
                        <label
                          htmlFor="location-hsinchu"
                          className="cursor-pointer select-none text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          新竹
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="台中"
                          id="location-taichung"
                          className="rounded-none border-2 border-black bg-white data-[state=checked]:bg-black"
                        />
                        <label
                          htmlFor="location-taichung"
                          className="cursor-pointer select-none text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          台中
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="台南"
                          id="location-tainan"
                          className="rounded-none border-2 border-black bg-white data-[state=checked]:bg-black"
                        />
                        <label
                          htmlFor="location-tainan"
                          className="cursor-pointer select-none text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          台南
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="高雄"
                          id="location-kaohsiung"
                          className="rounded-none border-2 border-black bg-white data-[state=checked]:bg-black"
                        />
                        <label
                          htmlFor="location-kaohsiung"
                          className="cursor-pointer select-none text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          高雄
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="其他"
                          id="location-other"
                          className="rounded-none border-2 border-black bg-white data-[state=checked]:bg-black"
                        />
                        <label
                          htmlFor="location-other"
                          className="cursor-pointer select-none text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          其他
                        </label>
                      </div>
                    </RadioGroup>

                    {/* 當選擇「其他」時顯示輸入框 */}
                    {(field.value === '其他' ||
                      field.value === otherLocation) && (
                      <Input
                        placeholder="請輸入您的居住地區"
                        value={otherLocation}
                        onChange={(e) => {
                          const value = e.target.value;
                          setOtherLocation(value);
                          field.onChange(value || '其他');
                        }}
                        disabled={isLoading}
                        className="mt-2 w-full max-w-xs rounded-none border-2 border-black bg-white"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasSecuritiesAccount"
            render={({ field }) => (
              <FormItem className="!mt-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="has-securities-account"
                    className="rounded-none border-2 border-black bg-white data-[state=checked]:bg-black"
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="has-securities-account"
                    className="cursor-pointer select-none text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    本身就有元大證券帳戶，想加開期貨戶
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 參賽者搜尋和選擇 */}
          <div className="space-y-3">
            <FormLabel className="-ml-1 flex items-center gap-2 font-cubic text-lg font-bold">
              <Image
                src={gold}
                alt="gold"
                className="gold-rotate-3d h-5 w-auto"
              />
              <span>
                我要為參賽者人氣投票{' '}
                <span className="text-sm font-normal text-gray-400">必填</span>
              </span>
            </FormLabel>
            <div className="flex gap-2">
              <Input
                placeholder="搜尋參賽者姓名或ID"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                disabled={isLoading}
                className="flex-1 bg-white"
              />
            </div>

            <FormField
              control={form.control}
              name="participantId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {participants && participants.length > 0 ? (
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value?.toString() ?? ''}
                        className="grid max-h-60 grid-cols-1 gap-2 overflow-y-auto md:grid-cols-2"
                        disabled={isLoading}
                      >
                        {participants.map((participant) => (
                          <div
                            key={participant.id}
                            className="nes-sm-corners flex items-center space-x-2 bg-white p-2 hover:bg-blue-200 data-[state=checked]:bg-sts-blue-300"
                          >
                            <RadioGroupItem
                              value={participant.id.toString()}
                              id={`participant-${participant.id}`}
                              className="rounded-none border-2 border-black data-[state=checked]:bg-black"
                            />
                            <label
                              htmlFor={`participant-${participant.id}`}
                              className="w-full cursor-pointer select-none truncate text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {`#${participant.id}  ${participant.nickname}`}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="">找不到參賽者</p>
                        <p className="text-sm">
                          請嘗試其他關鍵字或檢查輸入內容
                        </p>
                      </div>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {submitError && (
            <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {submitError}
            </div>
          )}

          <NesButton
            variant="secondary"
            type="submit"
            className="mt-3 pb-4 pt-3 text-base"
            disabled={isLoading}
          >
            {isLoading ? '投票中...' : '確認投票'}
          </NesButton>
        </form>
      </Form>

      {/* 成功投票彈窗 */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent className="nes-sm-corners max-w-md border-2 bg-sts-orange-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center font-cubic text-xl font-bold">
              投票成功！
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex justify-center pt-4">
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
