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
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Lock, UserCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Captcha from '../captcha';

interface LoginInFormProps {
  onSubmit: (values: {
    username: string;
    password: string;
    captcha: string;
  }) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  fieldErrors?: Record<string, string>;
}

const LoginInForm = ({
  onSubmit,
  isLoading = false,
  error,
  fieldErrors,
}: LoginInFormProps) => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      captcha: '',
    },
  });

  // 當 fieldErrors 改變時，設置表單錯誤
  useEffect(() => {
    // 先清除所有之前的 server 錯誤
    form.clearErrors();

    // 如果有新的 fieldErrors，設置它們
    if (fieldErrors) {
      Object.entries(fieldErrors).forEach(([field, message]) => {
        form.setError(field as keyof LoginFormData, {
          type: 'server',
          message,
        });
      });
    }
  }, [fieldErrors, form]);

  const handleSubmit = async (values: LoginFormData) => {
    try {
      await onSubmit(values);
    } catch {
      // 登入失敗時重新整理驗證碼
      form.setValue('captcha', '');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 text-left"
      >
        <div className="bg-y-card border-yt-blue-300 space-y-8 rounded-xl border-2 p-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full !text-left text-gray-700">
                  身分證字號
                </FormLabel>
                <div className="flex items-center space-x-3">
                  <div className="relative w-full">
                    <FormControl>
                      <Input
                        className="peer w-full pl-10"
                        type="text"
                        placeholder="請輸入身分證字號"
                        {...field}
                      />
                    </FormControl>
                    <UserCircle2 className="absolute left-2 top-2 peer-focus-visible:text-blue-600" />
                  </div>
                </div>
                {/* <FormDescription></FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full !text-left text-gray-700">
                  網路交易密碼
                </FormLabel>
                <div className="flex items-center space-x-3">
                  <div className="relative w-full">
                    <FormControl>
                      <Input
                        className="peer w-full bg-white pl-10"
                        placeholder="請輸入網路交易密碼"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <Lock className="absolute left-2 top-2 peer-focus-visible:text-blue-600" />
                  </div>
                </div>
                {/* <FormDescription>
                          This is your public display name.
                        </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="captcha"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full !text-left text-gray-700">
                  圖形驗證碼
                </FormLabel>
                <div className="flex items-center justify-start space-x-3">
                  <FormControl>
                    <Input
                      className="w-full max-w-52 bg-white"
                      placeholder="請輸入驗證碼"
                      {...field}
                      type="captcha"
                    />
                  </FormControl>

                  <Captcha />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pb-3 text-center">
            {error && (
              <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="hover:!bg-yt-blue-600/90 relative ml-2 px-12 py-6 text-2xl font-medium"
              size="default"
            >
              {isLoading ? '登入中...' : '登入'}
              {isLoading && (
                <LoaderCircle className="absolute right-3 top-[calc(50%-12px)] animate-spin" />
              )}
            </Button>
          </div>
          <p className="!mt-3 text-left text-sm md:!mt-8 md:text-base">
            非元大期貨客戶？立即
            <a
              className="text-yt-blue-400 underline"
              href="https://www.yuantafutures.com.tw/openaccount_01"
            >
              <strong className="">期貨線上開戶</strong>
            </a>
            <br />
            <span className="text-xs md:text-base">
              若已為【證券客戶】，欲加開期貨戶，請洽所屬營業員
            </span>
            <span className="text-xs md:text-base">
              或請洽元大期貨24小時客服專線0800-333-338
            </span>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LoginInForm;
