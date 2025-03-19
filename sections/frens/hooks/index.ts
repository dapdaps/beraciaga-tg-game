import { useTelegram } from '@/hooks/useTelegram';
import type { UserData } from '@/hooks/useLogin';
import { useEffect, useMemo, useState } from 'react';
import { numberFormatter } from '@/utils/number-formatter';
import Big from 'big.js';
import { useDebounceFn, useRequest } from 'ahooks';
import { get } from '@/utils/http';
import { isAndroid } from 'react-device-detect';

export const REWARD_PER_INVITE = 10000;

export function useFrens() {
  const { WebApp, isInitialized } = useTelegram();
  const userData: UserData = WebApp?.initDataUnsafe?.user;

  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 15;

  const { run: getList, loading, data: questData } = useRequest<{ total: number; list: GameUser[]; total_page: number; }, [pageIndex?: number]>(async (_pageIndex) => {
    _pageIndex = _pageIndex || pageIndex;
    const res = await get('/api/user/invite/list', {
      tg_user_id: userData.id,
      page: _pageIndex,
      page_size: pageSize,
    });
    if (res.code !== 200) {
      return { total: 0, list: [], total_page: 0 };
    }
    return res.data;
  }, {
    debounceWait: 60,
    manual: true,
  });

  const { list = [], total = 0 } = questData || {};

  const totalEarned = useMemo(() => {
    return numberFormatter(Big(total || 0).times(REWARD_PER_INVITE), 2, true, { isShort: true });
  }, [total]);

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
    appLink.searchParams.set('startapp', `inviterId=${userData?.id}&inviterSource=beraciaga`);
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

  return {
    list,
    loading,
    total,
    totalEarned,
    handleNext,
    onShare,
    userData,
  };
}

export interface GameUser {
  avatar: string;
  invite_timestamp: number;
  tg_user_id: string;
  username: string;
}
