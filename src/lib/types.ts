// API 回應的基本結構
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errorCode?: string;
  timestamp?: string;
  fieldErrors?: Record<string, string>;
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

export type AccountInfo = string;

export interface LoginResponse {
  user: UserInfo;
  accounts: AccountInfo[];
}

// 報名相關
export interface RegistrationRequest {
  fullAccount: string;
  nickname: string;
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
  location?: string;
  hasSecuritiesAccount?: boolean;
  participantId: number;
}

export interface Participant {
  id: number;
  nickname: string;
}

export interface RankingItem {
  participantNumber: string;
  participantNickname: string;
  voteCount: number;
  ranking: number;
}

// 成績查詢相關
export interface RecordResponse {
  participantId: number; // 參賽者ID
  nickname: string; // 參賽者暱稱
  isNewCustomer: boolean; // 是否為新戶
  totalTradeCount: number; // 總交易口數(口數王)
  thisMonthTradeDays: number; // 本月交易天數(每日任務)
  totalRanking: number; // 總排名(主競賽)
  totalScore: number; // 總積分(主競賽)
  profitRateScore: number; // 報酬率積分(主競賽)
  tradeCountScore: number; // 交易口數積分(主競賽)
  absoluteProfitScore: number; // 絕對獲利積分(主競賽)
  profitRateRanking: number; // 報酬率排名(報酬王)
  profitRate: number; // 報酬率(報酬王)
  tradeCountRanking: number; // 交易口數排名(口數王)
  popularityRanking: number; // 人氣排名(人氣王)
  totalVoteCount: number; // 總票數(人氣王)
}

// 版本資訊
export interface VersionResponse {
  version: string;
}

// 排名查詢相關
export interface RankingData {
  ranking: number;
  participantNickname: string;
  score: number;
}

export interface RankingResponse {
  mainRankingList: RankingData[];
  profitRateRankingList: RankingData[];
  tradeCountRankingList: RankingData[];
}

// 對話框狀態管理
export type RegisterDialogStep = 'login' | 'registration' | 'success' | 'error';

export type RecordDialogStep = 'login' | 'record' | 'error';

export interface DialogState {
  step: RegisterDialogStep | RecordDialogStep;
  data?: {
    user?: UserInfo;
    accounts?: AccountInfo[];
    selectedAccountId?: string;
    registrationData?: RegistrationResponse;
    resultsData?: RecordResponse;
    errorMessage?: string;
    fieldErrors?: Record<string, string>;
  };
}
