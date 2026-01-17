// lib/google-sheets.ts
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';

export interface SheetRow {
  timestamp: string;
  fullName: string;
  citizenId: string;
  mobilePhone: string;
  address: string;
}

class GoogleSheetsService {
  private sheets;
  private auth: JWT;

  constructor() {
    // 從環境變數讀取服務帳戶資訊
    const credentials = {
      type: process.env.GOOGLE_TYPE,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    };

    this.auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth: this.auth });
  }

  async appendRow(
    data: SheetRow
  ): Promise<{ success: boolean; error?: unknown }> {
    try {
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      if (!spreadsheetId) {
        throw new Error('Google Sheet ID 未設定');
      }

      const values = [
        [
          data.timestamp,
          data.fullName,
          data.citizenId,
          data.mobilePhone,
          data.address,
        ],
      ];

      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:E', // 可調整為你的工作表名稱和範圍
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values,
        },
      });

      console.log('成功寫入 Google Sheets:', response.data);
      return { success: true };
    } catch (error) {
      console.error('Google Sheets 寫入錯誤:', error);
      return { success: false, error };
    }
  }

  // 可選：讀取資料的方法
  async getRows(range: string = 'Sheet1!A:E') {
    try {
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;

      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      return { success: true, data: response.data.values };
    } catch (error) {
      console.error('讀取 Google Sheets 錯誤:', error);
      return { success: false, error };
    }
  }
}

// 匯出單例
export const sheetsService = new GoogleSheetsService();
