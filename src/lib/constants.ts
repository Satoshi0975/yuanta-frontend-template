// API 端點常數
export const API_ENDPOINTS = {
  // 驗證碼
  CAPTCHA: '/api/captcha',

  // 登入
  FUTURES_LOGIN: '/api/login/futures',
  LEVERAGE_LOGIN: '/api/login/leverage',

  // 報名
  CHECK_NICKNAME: '/api/registration/check-nickname',
  REGISTER: '/api/registration/register',

  // 投票
  SEARCH_PARTICIPANTS: '/api/vote/participants',
  VOTE: '/api/vote',
  RANKING: '/api/vote/ranking',

  // 成績查詢
  RECORD: '/api/record',
} as const;

// 潛在客戶類型選項
export const POTENTIAL_CUSTOMER_TYPES = [
  'StockToFutures',
  'NotInterested',
  'Taipei',
  'taipei',
  'hsinchu',
  'taichung',
  'tainan',
  'kaohsiung',
] as const;

export const POTENTIAL_CUSTOMER_TYPES_MAP = {
  taipei: '台北',
  hsinchu: '新竹',
  taichung: '台中',
  tainan: '台南',
  kaohsiung: '高雄',
  StockToFutures: '本身就有元大證券戶，想加開期貨戶',
  NotInterested: '對期貨沒興趣',
} as const;

// 錯誤代碼
export const ERROR_CODES = {
  VOTE_FAILED: 'VOTE_FAILED',
  CAPTCHA_INVALID: 'CAPTCHA_INVALID',
  PHONE_LIMIT_EXCEEDED: 'PHONE_LIMIT_EXCEEDED',
} as const;
