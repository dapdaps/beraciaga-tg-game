'use client';

import LazyImage from '@/components/img';
import { useTelegram } from '@/hooks/useTelegram';
import type { UserData } from '@/hooks/useLogin';
import { useEffect, useMemo, useState } from 'react';
import { get } from '@/utils/http';
import { useDebounceFn } from 'ahooks';
import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';
import Empty from '@components/Empty';
import Skeleton from 'react-loading-skeleton';
import ResourceItem from '@components/ResourceItem/ResourceItem';
import { isAndroid } from 'react-device-detect';

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
    appLink.searchParams.set('startapp', `inviterId=${userData?.id}&inviterSource=okx_invite`);
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
    <div className="px-[0.75rem] w-full h-full overflow-y-auto bg-[url('/images/bg-frens.svg')] bg-no-repeat bg-cover bg-center">
      <div className="w-full pt-[0.8rem] pb-[2.4rem]">
        <ResourceItem title="Frens" level={2} coins={13400} total={23450} />
      </div>
      <div className="relative p-[1.6875rem_0.625rem_0.625rem] bg-[rgba(247,249,234,0.80)] border border-[#4B371F] backdrop-blur-[0.625rem] rounded-[1rem]">
        <div className="flex justify-center items-end absolute left-0 top-[-2rem]">
          <LazyImage src="/images/bears/brown.svg" width="4.4375rem" height="2.375rem" />
          <LazyImage src="/images/bears/white.svg" width="4.4375rem" height="2.375rem" />
          <LazyImage src="/images/bears/panda.svg" width="4.4375rem" height="2.375rem" />
          <LazyImage src="/images/bears/orange.svg" width="4.4375rem" height="2.375rem" />
          <LazyImage src="/images/bears/gray.svg" width="4.4375rem" height="2.375rem" />
        </div>
        <div className="px-[1.875rem] flex justify-between items-center gap-[1rem]">
          <div className="flex flex-col items-center gap-[0.4375rem]">
            <div className="text-[#4B371F] text-[1.625rem] font-[700]">
              {
                loading ? (
                  <Skeleton width="3rem" height="2rem" borderRadius="0.2rem" />
                ) : numberFormatter(total, 2, true, { isShort: true })
              }
            </div>
            <div className="text-[#4B371F] text-[1rem] font-[600]">
              Frens invited
            </div>
          </div>
          <div className="flex flex-col items-center gap-[0.4375rem]">
            <div className="text-[#4B371F] text-[1.625rem] font-[700] flex gap-[4px] items-center">
              {
                loading ? (
                  <Skeleton width="3rem" height="2rem" borderRadius="0.2rem" />
                ) : (
                  <>
                    <LazyImage src="/images/icon-bera-coin.svg" width="1.25rem" height="1.25rem" />
                    <span>{totalEarned}</span>
                  </>
                )
              }
            </div>
            <div className="text-[#4B371F] text-[1rem] font-[600]">
              BP earned
            </div>
          </div>
        </div>
        <div className="pt-[1.375rem] pb-[1rem] px-[0.375rem]">
          <div className="w-full h-[1px] bg-[url('/images/dash-line.svg')]"></div>
        </div>
        <div
          className="flex flex-col px-[1rem] items-stretch gap-[1.25rem] h-[calc(100vh_-_24rem)] overflow-y-auto"
          onScroll={handleNext}
        >
          {
            loading ? (
              <>
                <Loading />
                <Loading />
                <Loading />
                <Loading />
                <Loading />
              </>
            ) : (
              list.length > 0 ? list.map((user, i: number) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-[0.625rem] text-[#4B371F] text-[1rem] font-[600]">
                    <LazyImage src={user.avatar} width="1.875rem" height="1.875rem" />
                    <div className="max-w-[9.3750rem] whitespace-nowrap overflow-hidden overflow-ellipsis">
                      @{user.username}
                    </div>
                  </div>
                  <div className="flex items-center gap-[0.3125rem] text-black text-[0.875rem] font-[600]">
                    <LazyImage src="/images/icon-bera-coin.svg" width="1.25rem" height="1.25rem" />
                    <span>+{SingleEarn}</span>
                  </div>
                </div>
              )) : (
                <Empty desc="No frens invited anymore" mt="3rem" />
              )
            )
          }
        </div>
        <div className="flex justify-between items-center gap-[0.5625rem]">
          <button
            type="button"
            className="flex-1 whitespace-nowrap text-[#4B371F] text-[1.25rem] font-[700] h-[3.75rem] rounded-[3.75rem] border-[2px] border-[#4B371F] bg-[#FFF5A9] flex justify-center items-center gap-[0.4375rem]"
            onClick={onShare}
          >
            <span>Invite a fren</span>
            <LazyImage src="/images/icon-bera-coin.svg" width="1.25rem" height="1.25rem" />
            <span>+{SingleEarn}</span>
          </button>
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

function Loading() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-[0.625rem]">
        <Skeleton width="1.875rem" height="1.875rem" borderRadius="2rem" />
        <Skeleton width="9.3750rem" height="1.5rem" borderRadius="0.2rem" />
      </div>
      <div className="flex items-center gap-[0.3125rem]">
        <Skeleton width="1.25rem" height="1.25rem" borderRadius="2rem" />
        <Skeleton width="2rem" height="1.25rem" borderRadius="0.2rem" />
      </div>
    </div>
  );
}
