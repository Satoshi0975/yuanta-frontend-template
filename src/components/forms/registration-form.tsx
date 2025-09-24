// import Captcha from '@/components/captcha';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { RegistrationRequest } from '@/lib/types';
import { registrationSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Tag, UserCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface RegistrationFormProps {
  onSubmit: (values: RegistrationRequest) => Promise<void>;
  accountList?: string[];
}

const RegistrationForm = ({
  onSubmit,
  accountList = [],
}: RegistrationFormProps) => {
  console.log(accountList);

  const form = useForm<RegistrationRequest>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullAccount: accountList[0] || '',
      nickname: '',
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values: RegistrationRequest) => {
    try {
      await onSubmit(values);
    } catch (error: unknown) {
      // 處理欄位錯誤
      if (error && typeof error === 'object' && 'fieldErrors' in error) {
        const fieldErrors = (error as { fieldErrors: Record<string, string> })
          .fieldErrors;
        Object.entries(fieldErrors).forEach(([field, message]) => {
          form.setError(field as keyof RegistrationRequest, {
            type: 'server',
            message: message,
          });
        });
      } else {
        // 處理一般錯誤
        form.setError('root', {
          type: 'server',
          message: error instanceof Error ? error.message : '報名失敗',
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-8 rounded-xl bg-white p-6 text-left">
          <div className="mb-4 text-center">
            <p className="mt-2 text-sm">請填寫以下資料完成活動報名</p>
          </div>
          <FormField
            control={form.control}
            name="fullAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full !text-left">交易帳號</FormLabel>
                <div className="flex items-center space-x-3">
                  <div className="relative w-full">
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={field.disabled}
                        name={field.name}
                      >
                        <SelectTrigger className="w-full pl-10">
                          <SelectValue placeholder="請選擇完整帳號" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountList.map((account) => (
                            <SelectItem key={account} value={account}>
                              {account}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <UserCircle2 className="absolute left-2 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-full !text-left">報名暱稱</FormLabel>
                <div className="flex items-center space-x-3">
                  <div className="relative w-full">
                    <FormControl>
                      <Input
                        className="peer w-full rounded-none border-2 pl-10"
                        type="text"
                        placeholder="請輸入報名暱稱"
                        {...field}
                      />
                    </FormControl>
                    <Tag className="absolute left-2 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
                <FormDescription>
                  * 僅能用數字或英文，上限為40個字元
                </FormDescription>
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

          {/* <div className="text-center text-sm text-gray-600">
            <p>
              報名後將可參與活動競賽，
              <br />
              並有機會獲得豐富獎品！
            </p>
          </div> */}
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;
