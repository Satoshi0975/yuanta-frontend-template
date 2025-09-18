'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import Captcha from '../captcha';

interface LoginFormProps {
  type: 'futures' | 'leverage';
  onSuccess?: (data: unknown) => void;
}

export function LoginForm({ type, onSuccess }: LoginFormProps) {
  const { isLoading, error, loginFutures, loginLeverage, clearError } =
    useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState<number>(Date.now()); // 初始的驗證碼key值
  const refreshCaptcha = () => {
    setCaptchaKey(Date.now());
  };

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      captcha: '',
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    clearError();
    setSubmitError(null);

    try {
      const loginFunction = type === 'futures' ? loginFutures : loginLeverage;
      const response = await loginFunction(values);

      if (response.success) {
        onSuccess?.(response.data);
        form.reset();
      } else {
        setSubmitError(response.message);
        // 登入失敗時重新整理驗證碼
        refreshCaptcha();
        form.setValue('captcha', '');
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '登入失敗');
      refreshCaptcha();
      form.setValue('captcha', '');
    }
  };

  const handleCaptchaRefresh = () => {
    refreshCaptcha();
    form.setValue('captcha', '');
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">
          {type === 'futures' ? '期貨登入' : '槓桿登入'}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>帳號</FormLabel>
                <FormControl>
                  <Input
                    placeholder="請輸入帳號"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密碼</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="請輸入密碼"
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
            name="captcha"
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
                    <Captcha captchaKey={captchaKey} />
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
            <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error || submitError}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '登入中...' : '登入'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
