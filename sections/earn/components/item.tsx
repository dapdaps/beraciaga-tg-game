import React from 'react';
import clsx from 'clsx';
import { numberFormatter } from '@/utils/number-formatter';
import LightingButton from '@components/Button/lighting-button';

const Item: React.FC<any> = (props) => {
  const { className, quest, pending, onClick, onVerify, disabled } = props;

  return (
    <div className={clsx("w-full h-[68px] bg-[#FFFAEA] border-[2px] border-[#D7C69D] rounded-[16px] p-[8px_10px_8px] flex justify-between items-center gap-[10px]", className)}>
      <div className="flex items-center gap-[8px] flex-1">
        <div className="shrink-0">
          <div className="w-[52px] h-[52px] bg-[url('/images/earn/icon-daily-checkin.svg')] bg-no-repeat bg-center bg-[length:40px_auto] bg-[#FFCCED] border border-[rgba(75,_55,_31,_0.20)] backdrop-blur-[5px] rounded-[16px]">
          </div>
        </div>
        <div className="flex-1 w-0 flex flex-col gap-[8px] text-[16px] font-normal text-shadow-[0px_2px_0px_#4B371F] text-stroke-2 font-cherryBomb">
          <div className="w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
            {quest?.name}
          </div>
          <div className="flex items-center gap-[5px] w-full whitespace-nowrap overflow-hidden overflow-ellipsis">
            <img src="/images/coin.png" alt="" className="w-[20px] h-[20px] rounded-full" />
            <div className="flex items-center gap-[8px] text-[14px]">
              {numberFormatter(quest?.coins, 2, true, { prefix: '+' })}
            </div>
          </div>
        </div>
      </div>
      <div className="shrink-0">
        {
          quest?.finished ? (
            <img src="/images/icon-done.svg" alt="" className="w-[28px] h-[28px] rounded-full" />
          ) : (
            <LightingButton
              disabled={pending[quest.id] || disabled}
              onClick={() => onClick(quest)}
            >
              {quest?.visited ? 'Verify' : 'Check'}
            </LightingButton>
          )
        }
      </div>
    </div>
  );
};

export default Item;
