// app/api/submit-winner/route.ts (App Router)
import { sheetsService } from '@/lib/google-sheets';
import { winnerSchema } from '@/lib/validations';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 驗證表單資料
    const validatedData = winnerSchema.parse(body);

    // 準備寫入 Sheets 的資料
    const sheetData = {
      timestamp: new Date().toLocaleString('zh-TW', {
        timeZone: 'Asia/Taipei',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      fullName: validatedData.fullName,
      citizenId: validatedData.citizenId,
      mobilePhone: validatedData.mobilePhone,
      address: validatedData.address,
    };

    // 寫入 Google Sheets
    const result = await sheetsService.appendRow(sheetData);

    console.log(result);

    if (result.success) {
      return NextResponse.json(
        { message: '資料提交成功', success: true },
        { status: 200 }
      );
    } else {
      throw new Error('Google Sheets 寫入失敗');
    }
  } catch (error) {
    console.error('API 錯誤:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: '資料驗證失敗',
          errors: error.message,
          success: false,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: '伺服器錯誤，請稍後再試',
        success: false,
      },
      { status: 500 }
    );
  }
}
