import React from 'react';
import RegisterDialog from '../dialogs/register-dialog';

export const ButtonSideButtons: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 w-screen md:hidden">
      <div className="grid grid-cols-3 gap-1 py-1 font-cubic text-xl text-white">
        <button
          className="w-full transition-all duration-300 hover:shadow-xl"
          // onClick={button.onClick}
        >
          <div className="nes-sm-corners cursor-pointer bg-sts-blue-300 p-1">
            <span className="block h-full w-full bg-sts-blue-400">
              成績查詢
            </span>
          </div>
        </button>
        <button
          className="w-full transition-all duration-300 hover:shadow-xl"
          // onClick={button.onClick}
        >
          <div className="nes-sm-corners cursor-pointer bg-sts-red-100 p-1">
            <span className="block h-full w-full bg-sts-red-200">
              人氣王投票
            </span>
          </div>
        </button>
        <RegisterDialog>
          <button
            className="w-full transition-all duration-300 hover:shadow-xl"
            // onClick={button.onClick}
          >
            <div className="nes-sm-corners cursor-pointer bg-sts-orange-300 p-1">
              <span className="block h-full w-full bg-sts-orange-400">
                競賽報名
              </span>
            </div>
          </button>
        </RegisterDialog>
      </div>
    </div>
  );
};
