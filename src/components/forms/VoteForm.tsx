'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RefreshCw, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useVoting } from '@/hooks/useVoting';
import { useCaptcha } from '@/hooks/useCaptcha';
import { voteSchema, type VoteFormData } from '@/lib/validations';
import { POTENTIAL_CUSTOMER_TYPES } from '@/lib/constants';
import type { Participant } from '@/lib/types';

interface VoteFormProps {
  onSuccess?: () => void;
}

export function VoteForm({ onSuccess }: VoteFormProps) {
  const { isLoading, error, searchParticipants, vote, clearError } = useVoting();
  const { captchaUrl, refreshCaptcha } = useCaptcha();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<VoteFormData>({
    resolver: zodResolver(voteSchema),
    defaultValues: {
      voterName: '',
      voterPhone: '',
      hasFuturesAccount: false,
      potentialCustomerType: undefined,
      participantId: 0,
      captchaCode: '',
    },
  });

  // 載入初始參賽者列表
  useEffect(() => {
    const loadParticipants = async () => {
      const response = await searchParticipants();
      if (response.success && response.data) {
        setParticipants(response.data);
      }
    };
    loadParticipants();
  }, [searchParticipants]);

  const handleSearch = async () => {
    if (searchKeyword.trim()) {
      const response = await searchParticipants(searchKeyword.trim());
      if (response.success && response.data) {
        setParticipants(response.data);
      }
    } else {
      // 空搜尋則載入預設列表
      const response = await searchParticipants();
      if (response.success && response.data) {
        setParticipants(response.data);
      }
    }
  };

  const onSubmit = async (values: VoteFormData) => {
    clearError();
    setSubmitError(null);

    try {
      const response = await vote(values);

      if (response.success) {
        onSuccess?.();
        form.reset();
        refreshCaptcha();
      } else {
        setSubmitError(response.message);
        refreshCaptcha();
        form.setValue('captchaCode', '');
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '投票失敗');
      refreshCaptcha();
      form.setValue('captchaCode', '');
    }
  };

  const handleCaptchaRefresh = () => {
    refreshCaptcha();
    form.setValue('captchaCode', '');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">參賽者投票</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="voterName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>投票者姓名</FormLabel>
                <FormControl>
                  <Input
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
                <FormLabel>手機號碼</FormLabel>
                <FormControl>
                  <Input
                    placeholder="09xxxxxxxx"
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
            name="hasFuturesAccount"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>我有期貨帳戶</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="potentialCustomerType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>潛在客戶類型（選填）</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={isLoading}>
                      <SelectValue placeholder="請選擇類型" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {POTENTIAL_CUSTOMER_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 參賽者搜尋和選擇 */}
          <div className="space-y-3">
            <FormLabel>選擇參賽者</FormLabel>
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
                      className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto"
                      disabled={isLoading}
                    >
                      {participants.map((participant) => (
                        <div key={participant.id} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={participant.id.toString()}
                            id={`participant-${participant.id}`}
                          />
                          <label
                            htmlFor={`participant-${participant.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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

          <FormField
            control={form.control}
            name="captchaCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>驗證碼</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="請輸入驗證碼"
                      {...field}
                      disabled={isLoading}
                      className="flex-1"
                    />
                  </FormControl>
                  <div className="flex items-center gap-2">
                    <img
                      src={captchaUrl}
                      alt="驗證碼"
                      className="h-10 border rounded"
                      onClick={handleCaptchaRefresh}
                      style={{ cursor: 'pointer' }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleCaptchaRefresh}
                      disabled={isLoading}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {(error || submitError) && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
              {error || submitError}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '投票中...' : '確認投票'}
          </Button>
        </form>
      </Form>
    </div>
  );
}