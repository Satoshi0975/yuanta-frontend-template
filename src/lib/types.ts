// API 回應的基本結構
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string;
  timestamp?: string;
}

// 登入相關
export interface LoginRequest {
  username: string;
  password: string;
  captcha: string;
}

export interface UserInfo {
  username: string;
  name: string;
  userId: string;
}

export interface AccountInfo {
  accountId: string;
  accountName: string;
}

export interface LoginResponse {
  user: UserInfo;
  accounts: AccountInfo[];
}

// 報名相關
export interface RegistrationRequest {
  fullAccount: string;
  nickname: string;
  captcha: string;
}

export interface RegistrationResponse {
  id: number;
  nickname: string;
  fullAccount: string;
  registrationTime: string;
}

export interface NicknameCheckResponse {
  nickname: string;
  isAvailable: boolean;
  message: string;
}

// 投票相關
export interface VoteRequest {
  voterName: string;
  voterPhone: string;
  hasFuturesAccount: boolean;
  potentialCustomerType?: string;
  participantId: number;
  captchaCode: string;
}

export interface Participant {
  id: number;
  nickname: string;
}

export interface RankingItem {
  participantId: number;
  nickname: string;
  voteCount: number;
}

// 成績查詢相關
export interface RecordResponse {
  nickname: string;
  fullAccount: string;
  totalReturn: number;
  ranking: number;
  participantCount: number;
  lastUpdateTime: string;
}

// 版本資訊
export interface VersionResponse {
  version: string;
}

// 對話框狀態管理
export type DialogStep = 'login' | 'account-selection' | 'registration' | 'results' | 'success' | 'error';

export interface DialogState {
  step: DialogStep;
  data?: {
    user?: UserInfo;
    accounts?: AccountInfo[];
    selectedAccountId?: string;
    registrationData?: RegistrationResponse;
    resultsData?: RecordResponse;
    errorMessage?: string;
  };
}