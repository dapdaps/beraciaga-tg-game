'use client';

import LazyImage from '@/components/img';
import React from 'react';
import { numberFormatter } from '@/utils/number-formatter';
import Empty from '@components/Empty';
import Skeleton from 'react-loading-skeleton';
import AppHeader from '@components/header';
import PaperclipCard from '@components/paperclip-card';
import HeaderAvatar from '@components/header/avatar';
import LightingButton, { LightingButtonType } from '@components/Button/lighting-button';
import { REWARD_PER_INVITE, useFrens } from '@/sections/frens/hooks';

const FrensView = (props: any) => {
  const {} = props;

  const {
    loading,
    list,
    total,
    totalEarned,
    onShare,
    userData,
  } = useFrens();

  return (
    <div className="relative w-full h-full bg-[radial-gradient(38.94%_84.3%_at_49.99%_49.99%,_#BFD645_0%,_#93B452_100%)]">
      <div className="w-full h-full bg-[url('/images/frenz/bg.png')] bg-no-repeat bg-top bg-contain">
        <AppHeader className="absolute z-20 w-full left-0 top-0" />
        <div className="p-[120px_10px_94px] w-full h-full overflow-y-auto">
          <PaperclipCard
            className="relative"
            contentClassName="!grid-cols-1 !gap-y-0 !gap-x-0 !p-[15px_10px_7px]"
          >
            <img src="/images/frenz/bears.svg" alt="" className="w-[366px] h-[68px] absolute top-[-58px] left-1/2 -translate-x-1/2" />
            <div className="flex items-center gap-[14px] w-full">
              <HeaderAvatar size={74} isLevel={false} className="shrink-0" />
              <div className="flex-1 w-0 flex flex-col justify-center gap-[11px]">
                <div className="text-[#F7F9EA] text-stroke-2 font-cherryBomb text-[16px] leading-[100%] font-normal whitespace-nowrap overflow-ellipsis">
                  @{userData.username}
                </div>
                <div className="flex items-center gap-[10px]">
                  <LightingButton
                    type={LightingButtonType.Green}
                    className="gap-[6px] !normal-case !pr-[10px] !pl-[10px]"
                    onClick={onShare}
                  >
                    <div className="">
                      Invite +10,000
                    </div>
                    <img src="/images/coin.png" alt="" className="w-[20px] h-[20px] rounded-full" />
                  </LightingButton>
                  <button
                    type="button"
                    className="w-[32px] h-[32px] rounded-[10px] bg-[url('/images/frenz/copy-button.svg')] bg-no-repeat bg-center bg-contain"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-[1px] border-t border-t-[#4B371F] border-dashed mt-[12px]"></div>
            <div className="w-full mt-[15px]">
              <div className="w-full pl-[26px] pr-[12px] flex justify-between items-center text-[#F7F9EA] text-stroke-2 text-stroke-[#4B371F] font-cherryBomb text-[16px] leading-[100%] font-normal normal-case">
                <div className="">
                  <div className="">
                    Invited
                  </div>
                  <div className="text-[32px] mt-[4px]">
                    {
                      loading ? (
                        <Skeleton width="39px" height="32px" borderRadius="10px" />
                      ) : numberFormatter(total, 2, true, { isShort: true })
                    }
                  </div>
                </div>
                <div className="">
                  <div className="">
                    Earned
                  </div>
                  <div className="text-[26px] mt-[4px] flex items-center gap-[9px]">
                    {
                      loading ? (
                        <Skeleton width="132px" height="32px" borderRadius="10px" />
                      ) : (
                        <>
                          <div className="">
                            {totalEarned}
                          </div>
                          <img src="/images/coin.png" alt="" className="w-[24px] h-[24px] rounded-full translate-y-[3px]" />
                        </>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="w-full mt-[9px] bg-[#FFFAEA] border-[2px] border-[#D7C69D] rounded-[16px] p-[11px_10px_10px] flex flex-col items-stretch gap-[4px]">
                {
                  loading ? (
                    <>
                      <Skeleton width="100%" height="47px" borderRadius="10px" />
                      <Skeleton width="100%" height="47px" borderRadius="10px" />
                      <Skeleton width="100%" height="47px" borderRadius="10px" />
                      <Skeleton width="100%" height="47px" borderRadius="10px" />
                      <Skeleton width="100%" height="47px" borderRadius="10px" />
                    </>
                  ) : (
                    list?.length > 0 ? list.map((user, i: number) => (
                      <div key={i} className="odd:bg-[rgba(0,_0,_0,_0.10)] flex justify-between items-center gap-[10px] p-[9px] rounded-[10px] whitespace-nowrap text-[#F7F9EA] text-stroke-2 font-cherryBomb text-[16px] font-normal">
                        <div className="flex-1 w-0 flex items-center gap-[10px]">
                          <LazyImage src={user.avatar} width="30px" height="30px" className="rounded-full shrink-0" />
                          <div className="flex-1 w-0 overflow-hidden overflow-ellipsis">
                            @{user.username}
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-[6px]">
                          <div className="text-[14px]">
                            +{REWARD_PER_INVITE}
                          </div>
                          <LazyImage src="/images/coin.png" width="20px" height="20px" className="rounded-full shrink-0" />
                        </div>
                      </div>
                    )) : (
                      <Empty desc="No frenz invited anymore" mt="3rem" />
                    )
                  )
                }
              </div>
            </div>
          </PaperclipCard>
        </div>
      </div>
    </div>
  );
};

export default FrensView;
