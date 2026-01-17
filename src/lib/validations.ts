import { z } from 'zod';

// 身分證驗證函數
const validateTaiwanID = (id: string): boolean => {
  // 基本格式檢查
  if (!/^[A-Z][1-2]\d{8}$/.test(id)) {
    return false;
  }

  // 英文字母對應數字表
  const letterToNumber: { [key: string]: number } = {
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    G: 16,
    H: 17,
    I: 34,
    J: 18,
    K: 19,
    L: 20,
    M: 21,
    N: 22,
    O: 35,
    P: 23,
    Q: 24,
    R: 25,
    S: 26,
    T: 27,
    U: 28,
    V: 29,
    W: 32,
    X: 30,
    Y: 31,
    Z: 33,
  };

  const firstLetter = id[0];
  const letterNum = letterToNumber[firstLetter];

  // 計算檢查碼
  let sum = Math.floor(letterNum / 10) + (letterNum % 10) * 9;

  // 第2到第9位數字的權重
  const weights = [8, 7, 6, 5, 4, 3, 2, 1];

  for (let i = 1; i <= 8; i++) {
    sum += parseInt(id[i]) * weights[i - 1];
  }

  const checkDigit = (10 - (sum % 10)) % 10;

  return checkDigit === parseInt(id[9]);
};

// 登入表單驗證
export const loginSchema = z.object({
  username: z.string().min(1, '請輸入帳號').max(50, '帳號長度不可超過 50 字元'),
  password: z
    .string()
    .min(1, '請輸入密碼')
    .max(100, '密碼長度不可超過 100 字元'),
  captcha: z
    .string()
    .min(1, '請輸入驗證碼')
    .max(10, '驗證碼長度不可超過 10 字元'),
});

// 報名表單驗證
export const registrationSchema = z.object({
  fullAccount: z
    .string()
    .min(1, '請輸入完整期貨帳號')
    .regex(/^F\d{6}-\d{7}$/, '帳號格式錯誤，正確格式：F021000-1234567'),
  nickname: z
    .string()
    .min(1, '請輸入暱稱')
    .max(40, '暱稱長度不可超過 40 字元')
    .regex(/^[a-zA-Z0-9]+$/, '暱稱僅限英文字母和數字'),
});

// 暱稱檢查驗證
export const nicknameCheckSchema = z.object({
  nickname: z
    .string()
    .min(1, '請輸入暱稱')
    .max(40, '暱稱長度不可超過 40 字元')
    .regex(/^[a-zA-Z0-9]+$/, '暱稱僅限英文字母和數字'),
});

// 投票表單驗證
export const voteSchema = z.object({
  voterName: z
    .string()
    .min(1, '請輸入投票者姓名')
    .max(10, '姓名長度不可超過 10 字元'),
  voterPhone: z
    .string()
    .min(1, '請輸入手機號碼')
    .regex(/^09\d{8}$/, '手機號碼格式錯誤'),
  hasFuturesAccount: z.boolean({
    error: '請選擇是否為期貨戶',
  }),
  location: z.string().optional(),
  hasSecuritiesAccount: z.boolean().optional(),
  participantId: z
    .number({
      error: '請選擇參賽者',
    })
    .int()
    .positive('請選擇參賽者'),
  sessionId: z.string(),
  otpCode: z.string().min(1, '請輸入手機驗證碼'),
});

// 成績查詢驗證
export const recordQuerySchema = z.object({
  fullAccount: z
    .string()
    .min(1, '請輸入完整期貨帳號')
    .regex(/^F\d{6}-\d{7}$/, '帳號格式錯誤，正確格式：F021000-1234567'),
  captcha: z
    .string()
    .min(1, '請輸入驗證碼')
    .max(10, '驗證碼長度不可超過 10 字元'),
});

// 得獎者表單驗證
export const winnerSchema = z.object({
  fullName: z
    .string()
    .min(1, '請輸入完整姓名')
    .max(10, '姓名長度不可超過 10 字元'),
  citizenId: z
    .string()
    .min(1, '請輸入身分證字號')
    .max(10, '身分證字號長度不可超過 10 字元')
    .refine(validateTaiwanID, {
      message: '身分證格式錯誤',
    }),
  mobilePhone: z
    .string()
    .min(1, '請輸入手機號碼')
    .regex(/^09\d{8}$/, '手機號碼格式錯誤'),
  address: z.string().min(1, '請輸入完整戶籍地址'),
});

// 參賽者搜尋驗證
export const participantSearchSchema = z.object({
  keyword: z.string().max(100, '搜尋關鍵字不可超過 100 字元').optional(),
});

// 類型導出
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type NicknameCheckFormData = z.infer<typeof nicknameCheckSchema>;
export type VoteFormData = z.infer<typeof voteSchema>;
export type WinnerFormData = z.infer<typeof winnerSchema>;
export type RecordQueryFormData = z.infer<typeof recordQuerySchema>;
export type ParticipantSearchFormData = z.infer<typeof participantSearchSchema>;
