'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import RecordDialog from '../dialogs/record-dialog';
import RegisterDialog from '../dialogs/register-dialog';

export const ButtonSideButtons: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 w-screen md:hidden">
      <div className="grid grid-cols-3 gap-1 py-1 font-cubic text-xl text-white">
        <RecordDialog>
          <button
            className="w-full transition-all duration-300 hover:shadow-xl"
            // onClick={button.onClick}
          >
            <div className="nes-sm-corners cursor-pointer bg-sts-blue-300 p-1">
              <span className="block h-full w-full text-nowrap bg-sts-blue-400">
                成績查詢
              </span>
            </div>
          </button>
        </RecordDialog>
        <Link
          href={pathname === '/vote' ? '/' : '/#vote'}
          className="block w-full text-center transition-all duration-300 hover:shadow-xl"
        >
          <div className="nes-sm-corners cursor-pointer bg-sts-red-100 p-1">
            <span className="block h-full w-full text-nowrap bg-sts-red-200">
              {pathname === '/vote' ? '回活動首頁' : '人氣王投票'}
            </span>
          </div>
        </Link>
        <RegisterDialog>
          <button
            className="w-full transition-all duration-300 hover:shadow-xl"
            // onClick={button.onClick}
          >
            <div className="nes-sm-corners cursor-pointer bg-sts-orange-300 p-1">
              <span className="block h-full w-full text-nowrap bg-sts-orange-400">
                競賽報名
              </span>
            </div>
          </button>
        </RegisterDialog>
      </div>
    </div>
  );
};
