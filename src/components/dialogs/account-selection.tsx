import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AccountInfo, UserInfo } from '@/lib/types';
import { Building2, User, FileText, BarChart3 } from 'lucide-react';
import { useState } from 'react';

interface AccountSelectionProps {
  user: UserInfo;
  accounts: AccountInfo[];
  onRegistration: (accountId: string) => void;
  onViewResults: (accountId: string) => void;
}

const AccountSelection = ({
  user,
  accounts,
  onRegistration,
  onViewResults,
}: AccountSelectionProps) => {
  const [selectedAccount, setSelectedAccount] = useState<string>(
    accounts[0]?.accountId || ''
  );

  const handleRegistration = () => {
    if (selectedAccount) {
      onRegistration(selectedAccount);
    }
  };

  const handleViewResults = () => {
    if (selectedAccount) {
      onViewResults(selectedAccount);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* 歡迎訊息 */}
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <User className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          歡迎回來！{user.name}
        </h3>
        <p className="text-sm text-gray-600">
          請選擇要操作的帳號，然後選擇您要進行的操作
        </p>
      </div>

      {/* 帳號選擇 */}
      <div className="bg-gray-50 rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          選擇帳號
        </label>
        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
          <SelectTrigger className="w-full">
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-gray-500" />
              <SelectValue placeholder="請選擇帳號" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account.accountId} value={account.accountId}>
                <div className="flex flex-col">
                  <span className="font-medium">{account.accountName}</span>
                  <span className="text-xs text-gray-500">
                    {account.accountId}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 操作選項 */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg border-2 border-blue-200 p-4 hover:border-blue-300 transition-colors">
          <div className="flex items-start space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">活動報名</h4>
              <p className="text-sm text-gray-600 mb-3">
                參與期貨競賽活動，有機會獲得豐富獎品
              </p>
              <Button
                onClick={handleRegistration}
                disabled={!selectedAccount}
                className="w-full"
              >
                立即報名
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-2 border-green-200 p-4 hover:border-green-300 transition-colors">
          <div className="flex items-start space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
              <BarChart3 className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">查看成績</h4>
              <p className="text-sm text-gray-600 mb-3">
                查看您的交易成績、排名和報酬率
              </p>
              <Button
                onClick={handleViewResults}
                disabled={!selectedAccount}
                variant="outline"
                className="w-full border-green-200 text-green-700 hover:bg-green-50"
              >
                查看成績
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 提示資訊 */}
      <div className="text-center text-xs text-gray-500 pt-4 border-t">
        <p>
          如有任何問題，請洽元大期貨客服專線
          <br />
          0800-333-338
        </p>
      </div>
    </div>
  );
};

export default AccountSelection;