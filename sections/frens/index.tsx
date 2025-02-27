'use client';

import LazyImage from '@/components/img';
import { useTelegram } from '@/hooks/useTelegram';
import type { UserData } from '@/hooks/useLogin';
import React, { useEffect, useMemo, useState } from 'react';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';
import Empty from '@components/Empty';
import Skeleton from 'react-loading-skeleton';
import ResourceItem from '@components/ResourceItem/ResourceItem';
import { isAndroid } from 'react-device-detect';
import AppHeader from '@components/header';
import PaperclipCard from '@components/paperclip-card';
import HeaderAvatar from '@components/header/avatar';
import LightingButton, { LightingButtonType } from '@components/Button/lighting-button';

// FIXME
const testData = {
  allows_write_to_pm: true,
  first_name: 'gu',
  id: 7150006688,
  language_code: 'zh-hans',
  last_name: 'jimmy',
  photo_url: 'https://t.me/i/userpic/320/i2-BRTWcSQoXawvpUSVv78kuH2IMkVBXItH61uWUjHYGATen0Zf2m-qRI1i7HXIr.svg',
  username: 'jimmyguu',
};

const SingleEarn = 100;

const FrensView = (props: any) => {
  const {} = props;

  const { WebApp, isInitialized } = useTelegram();
  const userData: UserData = WebApp?.initDataUnsafe?.user || testData;

  const [list, setList] = useState<GameUser[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 15;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const totalEarned = useMemo(() => {
    return numberFormatter(Big(total || 0).times(SingleEarn), 2, true, { isShort: true });
  }, [total]);

  const { run: getList } = useDebounceFn(async (_pageIndex?: number) => {
    setLoading(true);
    _pageIndex = _pageIndex || pageIndex;
    const res = await get('/api/user/invitations', {
      tg_user_id: userData.id,
      page: _pageIndex,
      page_size: pageSize,
    });
    if (res.code !== 200) {
      setLoading(false);
      return;
    }
    let _list: GameUser[] = res.data.list || [];
    setList(_list);
    setTotal(res.data.total);
    setLoading(false);
  }, { wait: 50 });

  const { run: handleNext } = useDebounceFn(
    (ev) => {
      const el = ev.target;
      if (el.scrollHeight - el.scrollTop < el.clientHeight * 2 && Big(total).gt(Big(pageIndex).times(pageSize))) {
        setPageIndex(pageIndex + 1);
        getList(pageIndex + 1);
      }
    },
    { wait: 500 }
  );

  const onShare = () => {
    if (!isInitialized) return;
    if (!process.env.NEXT_PUBLIC_APP_LINK) return console.error('APP_LINK is not set');
    const appLink = new URL(process.env.NEXT_PUBLIC_APP_LINK);
    const shareLink = new URL('https://t.me/share/url');
    appLink.searchParams.set('startapp', `inviterId=${userData?.id}`);
    shareLink.searchParams.set('url', appLink.toString());
    shareLink.searchParams.set('text', 'Look at this, it is so amazing');
    WebApp?.openTelegramLink?.(shareLink.toString());
    if (isAndroid) {
      // 安卓下，分享后返回 app 不能继续分享，所以关闭页面
      WebApp?.close();
    }
  };

  useEffect(() => {
    if (!userData) return;
    getList();
  }, [userData]);

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
                  @Mency123
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
                    list.length > 0 ? list.map((user, i: number) => (
                      <div key={i} className="odd:bg-[rgba(0,_0,_0,_0.10)] flex justify-between items-center gap-[10px] p-[9px] rounded-[10px] whitespace-nowrap text-[#F7F9EA] text-stroke-2 font-cherryBomb text-[16px] font-normal">
                        <div className="flex-1 w-0 flex items-center gap-[10px]">
                          <LazyImage src={user.avatar} width="30px" height="30px" className="rounded-full shrink-0" />
                          <div className="flex-1 w-0 overflow-hidden overflow-ellipsis">
                            @{user.username}
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-[6px]">
                          <div className="text-[14px]">
                            +{SingleEarn}
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

export interface GameUser {
  avatar: string;
  id: number;
  tg_user_id: string;
  username: string;
}
