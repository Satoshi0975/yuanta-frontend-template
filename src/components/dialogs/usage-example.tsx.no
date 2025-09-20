// 使用範例檔案 - 展示如何使用 MultiStepDialog
import { Button } from '@/components/ui/button';
import MultiStepDialog from './multi-step-dialog';

const UsageExample = () => {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">多步驟對話框使用範例</h2>

      <div className="grid gap-4">
        {/* 預設從登入開始 */}
        <MultiStepDialog>
          <Button>開啟登入對話框</Button>
        </MultiStepDialog>

        {/* 直接從報名開始（如果已經登入過） */}
        <MultiStepDialog initialStep="registration">
          <Button variant="outline">直接報名</Button>
        </MultiStepDialog>

        {/* 直接查看成績（如果已經登入且已報名） */}
        <MultiStepDialog initialStep="results">
          <Button variant="secondary">查看成績</Button>
        </MultiStepDialog>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">新流程說明：</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li><strong>登入步驟</strong>：用戶輸入帳號密碼及驗證碼</li>
          <li><strong>帳號選擇</strong>：登入成功後顯示帳號清單，用戶選擇操作：
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>選擇帳號 + 點擊「立即報名」→ 前往報名頁面</li>
              <li>選擇帳號 + 點擊「查看成績」→ 前往成績頁面</li>
            </ul>
          </li>
          <li><strong>報名流程</strong>：
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>使用選擇的帳號作為預設值</li>
              <li>填寫參賽暱稱和驗證碼</li>
              <li>報名成功 → 顯示成功頁面</li>
            </ul>
          </li>
          <li><strong>查詢流程</strong>：
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>使用選擇的帳號查詢成績</li>
              <li>顯示交易成績、排名和報酬率</li>
              <li>可以刷新資料</li>
            </ul>
          </li>
          <li><strong>成功/錯誤處理</strong>：顯示對應的結果頁面，可返回重試</li>
        </ol>

        <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
          <p className="text-sm text-blue-800">
            <strong>改進重點：</strong>
            <br />• 統一對話框體驗，避免多個彈窗
            <br />• 明確的帳號選擇流程
            <br />• 流暢的狀態轉換與動畫
            <br />• 完整的錯誤處理和返回機制
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsageExample;