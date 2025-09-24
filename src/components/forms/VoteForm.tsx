'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button as NesButton } from '@/components/nes/button';
import { Button } from '@/components/ui/button';
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
import {
  POTENTIAL_CUSTOMER_TYPES,
  POTENTIAL_CUSTOMER_TYPES_MAP,
} from '@/lib/constants';
import Image from '@/lib/image';
import type { Participant } from '@/lib/types';
import { voteSchema, type VoteFormData } from '@/lib/validations';

interface VoteFormProps {
  onSuccess?: () => void;
}

export function VoteForm({ onSuccess }: VoteFormProps) {
  const { isLoading, searchParticipants, vote, clearError } = useVoting();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<VoteFormData>({
    resolver: zodResolver(voteSchema),
    defaultValues: {
      voterName: '',
      voterPhone: '',
      hasFuturesAccount: undefined,
      potentialCustomerType: [],
      participantId: undefined,
      captchaCode: '',
    },
  });

  // 載入初始參賽者列表
  useEffect(() => {
    const loadParticipants = async () => {
      const response = await searchParticipants();
      if (response.success && response.data) {
        setParticipants(response.data.data);
      }
    };
    loadParticipants();
  }, [searchParticipants]);

  const handleSearch = async () => {
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
      // 轉換 potentialCustomerType 陣列為字串
      const submitData = {
        ...values,
        potentialCustomerType: values.potentialCustomerType?.length
          ? values.potentialCustomerType.join(',')
          : undefined,
      };

      const response = await vote(submitData);

      if (response.success) {
        onSuccess?.();
        form.reset();
      } else {
        setSubmitError(response.message);
        form.setValue('captchaCode', '');
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '投票失敗');
      form.setValue('captchaCode', '');
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
                <FormLabel className="-ml-1 flex items-center gap-2 font-cubic text-xl font-bold">
                  <Image
                    src={gold}
                    alt="gold"
                    className="gold-rotate-3d h-6 w-auto"
                  />
                  姓名（真實姓名）
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
                <FormLabel className="-ml-1 flex items-center gap-2 font-cubic text-xl font-bold">
                  <Image
                    src={gold}
                    alt="gold"
                    className="gold-rotate-3d h-6 w-auto"
                  />
                  手機號碼
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
                <FormLabel className="items-base -ml-1 flex gap-2 font-cubic text-xl font-bold">
                  <Image
                    src={gold}
                    alt="gold"
                    className="gold-rotate-3d h-6 w-auto"
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
                    value={field.value?.toString()}
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
            name="potentialCustomerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="-ml-1 flex items-center gap-2 font-cubic text-xl font-bold">
                  <Image
                    src={gold}
                    alt="gold"
                    className="gold-rotate-3d h-6 w-auto"
                  />
                  想了解更多期貨內容，請問居住地區？
                </FormLabel>
                <div className="grid grid-cols-5 gap-3 [&>*:nth-child(n+6)]:col-span-5">
                  {Object.keys(POTENTIAL_CUSTOMER_TYPES_MAP).map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`customer-type-${type}`}
                        checked={
                          field.value?.includes(
                            type as (typeof POTENTIAL_CUSTOMER_TYPES)[number]
                          ) || false
                        }
                        onCheckedChange={(checked) => {
                          const currentValue = field.value || [];
                          if (checked) {
                            field.onChange([...currentValue, type]);
                          } else {
                            field.onChange(
                              currentValue.filter((item) => item !== type)
                            );
                          }
                        }}
                        disabled={isLoading}
                        className="rounded-none border-2 border-black bg-white data-[state=checked]:border-black data-[state=checked]:bg-black"
                      />
                      <label
                        htmlFor={`customer-type-${type}`}
                        className="cursor-pointer select-none text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {
                          POTENTIAL_CUSTOMER_TYPES_MAP[
                            type as keyof typeof POTENTIAL_CUSTOMER_TYPES_MAP
                          ]
                        }
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 參賽者搜尋和選擇 */}
          <div className="space-y-3">
            <FormLabel className="-ml-1 flex items-center gap-2 font-cubic text-xl font-bold">
              <Image
                src={gold}
                alt="gold"
                className="gold-rotate-3d h-6 w-auto"
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
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleSearch}
                disabled={isLoading}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <FormField
              control={form.control}
              name="participantId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                      className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto"
                      disabled={isLoading}
                    >
                      {participants?.map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center space-x-2 rounded-none border-2 border-black bg-white p-2 hover:bg-yellow-100 data-[state=checked]:bg-green-200"
                        >
                          <RadioGroupItem
                            value={participant.id.toString()}
                            id={`participant-${participant.id}`}
                            className="rounded-none border-2 border-black data-[state=checked]:bg-black"
                          />
                          <label
                            htmlFor={`participant-${participant.id}`}
                            className="cursor-pointer select-none text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {participant.nickname}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
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
    </div>
  );
}
