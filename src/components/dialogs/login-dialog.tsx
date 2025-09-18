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
import { cn } from '@/lib/utils';
import { useState } from 'react';
// import { TestController } from '../test-controller';
// import DataShow from './data-show';
import LoginInForm, { LoginInFormData } from './login-form';
// import { TData } from './type';

const API_HOST =
  process.env.NEXT_PUBLIC_API_HOST || process.env.NEXT_PUBLIC_BASE_PATH || '';

type Props = {
  children?: React.ReactNode;
};

//  public string CitizenId { get; set; }
// public string Name { get; set; }
// public decimal TotalLots { get; set; }
// public decimal StockOptionLots { get; set; }
// public decimal TMFLots { get; set; }
// public bool IsNewCustomerTrading { get; set; }
// public bool IsStaticCustomerTrading { get; set; }
// public bool IsNewOrStaticCustomerTradingOtherProducts { get; set; }
// public bool HasData { get; set; }

const LoginDialog = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<undefined | unknown>(undefined);

  // 登入API
  async function handleLogin(values: LoginInFormData) {
    const data = await fetch(`${API_HOST}/api/login/`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!data.ok) {
      const errorBody = await data.json();

      throw new Error(errorBody.message);
    }
    const body = await data.json();

    if (body.success == false) {
      throw new Error(body.message);
    }
    setData(body);
    return;
  }

  const handleOpenChange = (open: boolean) => {
    setData(undefined);
    setIsOpen(open);
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={cn('rounded-lg bg-white', data && 'md:h-auto')}>
        <DialogHeader>
          {!data ? (
            <DialogTitle
              className="mx-auto mb-5 w-fit text-center text-3xl"
              asChild
            >
              <div>
                <h1 className="font-title text-3xl font-semibold">帳號登入</h1>
              </div>
            </DialogTitle>
          ) : (
            <DialogTitle className="font-title mx-auto mb-5 w-fit text-center text-3xl font-semibold">
              我的打擊率
            </DialogTitle>
          )}
          <DialogDescription asChild>
            <div className="text-yuan-blue-800 space-y-6 text-base">
              {!data ? (
                <ScrollArea className="max-h-[calc(100vh-108px)] overflow-y-auto">
                  <div className="text-center md:px-4">
                    <LoginInForm onSubmit={handleLogin} />
                  </div>
                </ScrollArea>
              ) : (
                <>.... 等待建立</>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
