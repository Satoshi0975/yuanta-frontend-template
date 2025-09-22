import { z } from 'zod';
import { POTENTIAL_CUSTOMER_TYPES } from './constants';

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
  hasFuturesAccount: z.boolean(),
  potentialCustomerType: z.array(z.enum(POTENTIAL_CUSTOMER_TYPES)).optional(),
  participantId: z.number().int().positive('請選擇參賽者'),
  captchaCode: z.string().min(1, '請輸入驗證碼'),
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

// 參賽者搜尋驗證
export const participantSearchSchema = z.object({
  keyword: z.string().max(100, '搜尋關鍵字不可超過 100 字元').optional(),
});

// 類型導出
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type NicknameCheckFormData = z.infer<typeof nicknameCheckSchema>;
export type VoteFormData = z.infer<typeof voteSchema>;
export type RecordQueryFormData = z.infer<typeof recordQuerySchema>;
export type ParticipantSearchFormData = z.infer<typeof participantSearchSchema>;
