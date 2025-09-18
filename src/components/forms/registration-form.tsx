// import Captcha from '@/components/captcha';
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
import type { RegistrationRequest } from '@/lib/types';
import { LoaderCircle, Tag, UserCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Captcha from '../captcha';

interface RegistrationFormProps {
  onSubmit: (values: RegistrationRequest) => Promise<void>;
  defaultAccount?: string;
}

const RegistrationForm = ({
  onSubmit,
  defaultAccount = '',
}: RegistrationFormProps) => {
  const [captchaKey, setCaptchaKey] = useState<number>(Date.now());

  const form = useForm<RegistrationRequest>({
    defaultValues: {
      fullAccount: defaultAccount,
      nickname: '',
      captcha: '',
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values: RegistrationRequest) => {
    try {
      await onSubmit(values);
    } catch (error) {
      form.setError('root', {
        type: 'server',
        message: error instanceof Error ? error.message : '報名失敗',
      });
      setCaptchaKey(Date.now()); // 重新產生驗證碼
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 text-left"
      >
        <div className="bg-y-card border-yt-blue-300 space-y-6 rounded-xl border-2 p-6">
          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800">活動報名</h3>
            <p className="mt-2 text-sm text-gray-600">
              請填寫以下資料完成活動報名
            </p>
          </div>

          <FormField
            control={form.control}
            name="fullAccount"
            rules={{ required: '請輸入完整帳號' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full !text-left">完整帳號</FormLabel>
                <div className="flex items-center space-x-3">
                  <div className="relative w-full">
                    <FormControl>
                      <Input
                        className="peer w-full pl-10"
                        type="text"
                        placeholder="請輸入完整帳號"
                        {...field}
                      />
                    </FormControl>
                    <UserCircle2 className="absolute left-2 top-2 peer-focus-visible:text-blue-600" />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nickname"
            rules={{
              required: '請輸入暱稱',
              minLength: { value: 2, message: '暱稱至少需要 2 個字元' },
              maxLength: { value: 20, message: '暱稱不能超過 20 個字元' },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full !text-left">參賽暱稱</FormLabel>
                <div className="flex items-center space-x-3">
                  <div className="relative w-full">
                    <FormControl>
                      <Input
                        className="peer w-full pl-10"
                        type="text"
                        placeholder="請輸入參賽暱稱"
                        {...field}
                      />
                    </FormControl>
                    <Tag className="absolute left-2 top-2 peer-focus-visible:text-blue-600" />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="captcha"
            rules={{ required: '請輸入驗證碼' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full !text-left">圖形驗證碼</FormLabel>
                <div className="flex items-center justify-start space-x-3">
                  <FormControl>
                    <Input
                      className="w-full max-w-52 bg-white"
                      placeholder="請輸入驗證碼"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <Captcha captchaKey={captchaKey} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4 text-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="hover:!bg-yt-blue-600/90 relative px-12 py-6 text-xl font-medium"
              size="default"
            >
              報名參加
              {isSubmitting && (
                <LoaderCircle className="absolute right-3 top-[calc(50%-12px)] animate-spin" />
              )}
            </Button>

            {form.formState.errors.root && (
              <p className="mt-2 text-red-600">
                {form.formState.errors.root.message}
              </p>
            )}
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>
              報名後將可參與活動競賽，
              <br />
              並有機會獲得豐富獎品！
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
