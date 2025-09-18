# API 整合指南

本專案已建立完整的 API 串接架構，支援元大證券 MVC 2025-4 的所有 API 功能。

## 架構概覽

```
src/
├── lib/
│   ├── api.ts           # HTTP 客戶端
│   ├── types.ts         # TypeScript 類型定義
│   ├── constants.ts     # API 端點和常數
│   └── validations.ts   # Zod 驗證 schemas
├── hooks/
│   ├── useAuth.ts       # 認證功能
│   ├── useCaptcha.ts    # 驗證碼管理
│   ├── useRegistration.ts # 報名功能
│   ├── useVoting.ts     # 投票功能
│   └── useRecords.ts    # 成績查詢
└── components/forms/
    ├── LoginForm.tsx    # 登入表單範例
    └── VoteForm.tsx     # 投票表單範例
```

## 主要功能

### 1. HTTP 客戶端 (`lib/api.ts`)
- 基於 Next.js 內建 fetch
- 自動處理 JSON 和錯誤回應
- 支援 cookie-based 認證
- 適合靜態打包

### 2. Custom Hooks
- **useAuth**: 處理期貨/槓桿登入
- **useCaptcha**: 驗證碼圖片管理
- **useRegistration**: 報名和暱稱檢查
- **useVoting**: 投票、搜尋參賽者、排行榜
- **useRecords**: 成績查詢和版本資訊

### 3. 表單驗證
- 使用 Zod + React Hook Form
- 完整的輸入驗證規則
- TypeScript 類型安全

## 使用範例

### 基本 API 呼叫
```typescript
import { useAuth } from '@/hooks/useAuth';

function LoginComponent() {
  const { loginFutures, isLoading, error } = useAuth();

  const handleLogin = async (credentials) => {
    const response = await loginFutures(credentials);
    if (response.success) {
      // 登入成功
    }
  };
}
```

### 驗證碼使用
```typescript
import { useCaptcha } from '@/hooks/useCaptcha';

function CaptchaComponent() {
  const { captchaUrl, refreshCaptcha } = useCaptcha();

  return (
    <img
      src={captchaUrl}
      alt="驗證碼"
      onClick={refreshCaptcha}
    />
  );
}
```

### 表單驗證
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validations';

function FormComponent() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      captcha: '',
    },
  });
}
```

## API 端點對應

| 功能 | Hook | 方法 | API 端點 |
|------|------|------|----------|
| 期貨登入 | useAuth | loginFutures | POST /futures |
| 槓桿登入 | useAuth | loginLeverage | POST /leverage |
| 取得驗證碼 | useCaptcha | captchaUrl | GET /api/captcha |
| 檢查暱稱 | useRegistration | checkNickname | GET /api/registration/check-nickname/{nickname} |
| 報名 | useRegistration | register | POST /api/registration/register |
| 搜尋參賽者 | useVoting | searchParticipants | GET /api/vote/participants |
| 投票 | useVoting | vote | POST /api/vote |
| 排行榜 | useVoting | getRanking | GET /api/vote/ranking |
| 成績查詢 | useRecords | getRecord | GET /api/record/{id} |
| 版本資訊 | useRecords | getVersion | GET /api/version |

## 重要注意事項

### 靜態打包相容性
- 所有 API 呼叫都在客戶端執行
- 使用 `credentials: 'include'` 確保 cookie 傳送
- 避免使用 Next.js API Routes

### 錯誤處理
- 統一的錯誤回應格式
- 自動處理網路錯誤
- 表單驗證錯誤顯示

### 安全性
- 所有表單都有輸入驗證
- 自動轉義 URL 參數
- Cookie-based 認證管理

## 擴展指南

如需新增其他 API 功能：

1. 在 `lib/types.ts` 新增類型定義
2. 在 `lib/constants.ts` 新增端點常數
3. 在 `lib/validations.ts` 新增驗證 schema
4. 建立對應的 custom hook
5. 建立表單元件

## 測試建議

建議在開發環境測試以下情境：
- 網路錯誤處理
- 驗證碼過期
- 表單驗證錯誤
- API 錯誤回應